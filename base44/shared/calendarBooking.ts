// Shared calendar booking logic for the One Pager meeting scheduler.
// Plain JS (no TS annotations) — runs in Deno backend functions.

export const SALES_CALENDARS = ["talorsmile@gmail.com", "shiri@boombuy.co.il"];
export const PRIMARY_CALENDAR = SALES_CALENDARS[0]; // tal or
export const SLOT_MINUTES = 15;
export const BOOKING_TZ = "Asia/Jerusalem";
export const BOOKING_HORIZON_DAYS = 21;
export const MIN_NOTICE_HOURS = 3;

// Working periods in Jerusalem wall-clock hours. One slot returned per period.
export const PERIODS = [
  { name: "morning", startHour: 9, endHour: 12 },
  { name: "midday", startHour: 12, endHour: 14.5 },
  { name: "evening", startHour: 14.5, endHour: 17 },
];

const pad = (n) => String(n).padStart(2, "0");

// Jerusalem UTC offset (hours) at a given UTC instant, via shortOffset timezone name.
function jerOffsetHours(utcInstant) {
  try {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: BOOKING_TZ, timeZoneName: "shortOffset" }).formatToParts(new Date(utcInstant));
    const tz = parts.find((p) => p.type === "timeZoneName")?.value || "GMT+0";
    const m = tz.match(/GMT([+-]?\d+)/);
    return m ? parseInt(m[1], 10) : 0;
  } catch (e) {
    return 2;
  }
}

// UTC instant of Jerusalem 00:00 for the given Jerusalem date.
export function jerMidnightUTC(y, mo, d) {
  const baseUTC = Date.UTC(y, mo - 1, d, 0, 0, 0);
  const off = jerOffsetHours(baseUTC);
  return baseUTC - off * 3600000;
}

function jerDateParts(utcInstant) {
  const p = new Intl.DateTimeFormat("en-US", { timeZone: BOOKING_TZ, year: "numeric", month: "2-digit", day: "2-digit", weekday: "short" }).formatToParts(new Date(utcInstant));
  return {
    y: parseInt(p.find((x) => x.type === "year").value, 10),
    mo: parseInt(p.find((x) => x.type === "month").value, 10),
    d: parseInt(p.find((x) => x.type === "day").value, 10),
  };
}

function jerTimeLabel(utcMs) {
  const p = new Intl.DateTimeFormat("en-GB", { timeZone: BOOKING_TZ, hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date(utcMs));
  let h = p.find((x) => x.type === "hour").value;
  const m = p.find((x) => x.type === "minute").value;
  if (h === "24") h = "00";
  return `${h}:${m}`;
}

export function jerDayLabel(y, mo, d) {
  const weekday = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"];
  const dow = new Date(Date.UTC(y, mo - 1, d)).getUTCDay();
  return `${weekday[dow]} ${pad(d)}/${pad(mo)}`;
}

// freebusy for a single calendar (best-effort).
export async function getBusyFor(accessToken, calendarId, timeMin, timeMax) {
  const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ timeMin, timeMax, items: [{ id: calendarId }] }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw Object.assign(new Error("calendar_unavailable"), { status: 503 });
  const data = await res.json();
  const cal = data.calendars?.[calendarId];
  if (!cal || cal.errors || !Array.isArray(cal.busy)) {
    // A missing calendar entry or a missing busy array is NOT "free all day" —
    // treat it as a clear failure so the caller never books on absent data.
    if (cal?.errors) console.error("calendar_not_accessible", calendarId, JSON.stringify(cal.errors));
    throw Object.assign(new Error("calendar_unavailable"), { status: 503 });
  }
  return cal.busy;
}

// Require a verified response for every configured calendar. Provider failures
// must propagate as failures, never as "busy" or silent cross-calendar fallback.
export async function getBusyMap(accessToken, calendarIds, timeMin, timeMax) {
  const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ timeMin, timeMax, items: calendarIds.map((id) => ({ id })) }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw Object.assign(new Error("calendar_unavailable"), { status: 503 });
  const data = await res.json();
  const out = {};
  for (const id of calendarIds) {
    const cal = data.calendars?.[id];
    if (!cal || cal.errors || !Array.isArray(cal.busy)) {
      throw Object.assign(new Error("calendar_unavailable"), { status: 503 });
    } else {
      out[id] = cal.busy;
    }
  }
  return out;
}

function isFree(busy, startMs, endMs) {
  for (const b of busy) {
    const bs = new Date(b.start).getTime();
    const be = new Date(b.end).getTime();
    if (startMs < be && endMs > bs) return false;
  }
  return true;
}

// First 15-min free window in [periodStartMs, periodEndMs] with start >= minStartMs (15-min steps).
function findWindow(busy, periodStartMs, periodEndMs, minStartMs) {
  const step = 15 * 60000;
  const dur = SLOT_MINUTES * 60000;
  for (let s = periodStartMs; s + dur <= periodEndMs; s += step) {
    if (s < minStartMs) continue;
    if (isFree(busy, s, s + dur)) return s;
  }
  return null;
}

// Up to 3 slots per day (one per period). In each period, prefer a window where the
// primary calendar (tal) is free; only if none, look for a window where the secondary (shiri) is free.
export async function getDaySlotsForDate(accessToken, y, mo, d, nowMs) {
  const midnight = jerMidnightUTC(y, mo, d);
  const dayEnd = midnight + 24 * 3600000;
  const timeMin = new Date(Math.min(nowMs, midnight)).toISOString();
  const timeMax = new Date(dayEnd).toISOString();
  const minStart = nowMs + MIN_NOTICE_HOURS * 3600000;
  const busyMap = await getBusyMap(accessToken, SALES_CALENDARS, timeMin, timeMax);
  const primaryBusy = busyMap[PRIMARY_CALENDAR];
  const secBusy = busyMap[SALES_CALENDARS[1]];
  const slots = [];
  for (const period of PERIODS) {
    const pStart = midnight + period.startHour * 3600000;
    const pEnd = midnight + period.endHour * 3600000;
    let startMs = findWindow(primaryBusy, pStart, pEnd, minStart);
    if (startMs == null) startMs = findWindow(secBusy, pStart, pEnd, minStart);
    if (startMs != null) {
      slots.push({ start: new Date(startMs).toISOString(), label: jerTimeLabel(startMs) });
    }
  }
  return slots;
}

// Next 5 working days (Sun–Thu) with at least one free window.
export async function getAvailableDays(accessToken) {
  const nowMs = Date.now();
  const rangeEnd = nowMs + BOOKING_HORIZON_DAYS * 86400000;
  const timeMin = new Date(nowMs).toISOString();
  const timeMax = new Date(rangeEnd).toISOString();
  const busyMap = await getBusyMap(accessToken, SALES_CALENDARS, timeMin, timeMax);
  const primaryBusy = busyMap[PRIMARY_CALENDAR];
  const secBusy = busyMap[SALES_CALENDARS[1]];
  const out = [];
  for (let i = 0; i < BOOKING_HORIZON_DAYS && out.length < 5; i++) {
    const t = nowMs + i * 86400000;
    const { y, mo, d } = jerDateParts(t);
    const dow = new Date(Date.UTC(y, mo - 1, d)).getUTCDay();
    if (dow > 4) continue; // Fri(5)/Sat(6)
    const midnight = jerMidnightUTC(y, mo, d);
    const minStart = nowMs + MIN_NOTICE_HOURS * 3600000;
    let hasWindow = false;
    for (const period of PERIODS) {
      const pStart = midnight + period.startHour * 3600000;
      const pEnd = midnight + period.endHour * 3600000;
      if (pEnd <= minStart) continue;
      let startMs = findWindow(primaryBusy, pStart, pEnd, minStart);
      if (startMs == null) startMs = findWindow(secBusy, pStart, pEnd, minStart);
      if (startMs != null) { hasWindow = true; break; }
    }
    if (hasWindow) out.push({ date: `${y}-${pad(mo)}-${pad(d)}`, label: jerDayLabel(y, mo, d) });
  }
  return out;
}

export async function checkFree(accessToken, calendarId, startMs, endMs) {
  const busy = await getBusyFor(accessToken, calendarId, new Date(startMs).toISOString(), new Date(endMs + 60000).toISOString());
  return isFree(busy, startMs, endMs);
}

// Creates a 15-min event with Google Meet on the given calendar.
export async function createMeetingEvent(accessToken, calendarId, opts) {
  const { title, startMs, endMs, attendees, description } = opts;
  const body = {
    summary: title,
    description,
    start: { dateTime: new Date(startMs).toISOString(), timeZone: BOOKING_TZ },
    end: { dateTime: new Date(endMs).toISOString(), timeZone: BOOKING_TZ },
    attendees,
    conferenceData: { createRequest: { requestId: "boom-" + Math.random().toString(36).slice(2), conferenceSolutionKey: { type: "hangoutsMeet" } } },
  };
  const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?conferenceDataVersion=1&sendUpdates=all`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error("create_event_failed");
  const ev = await res.json();
  return { hangoutLink: ev.hangoutLink, htmlLink: ev.htmlLink, id: ev.id };
}