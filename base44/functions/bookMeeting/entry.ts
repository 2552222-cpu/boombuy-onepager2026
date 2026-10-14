import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { SALES_CALENDARS, SLOT_MINUTES, checkFree, createMeetingEvent } from '../../shared/calendarBooking.ts';
import { sendMeetingEmail } from '../../shared/leadEmails.ts';

function buildDesc(lead) {
  return [
    "פגישת הדגמה — boombuy × " + (lead.orgName || ""),
    "",
    "פרטי הליד:",
    "שם: " + (lead.fullName || "-"),
    "טלפון: " + (lead.phone || "-"),
    "אימייל: " + (lead.email || "-"),
    "גודל ארגון: " + (lead.orgSize || "-"),
    "מצב רווחה: " + (lead.welfareState || "-"),
    "מטרת שדרוג: " + (lead.upgradeGoal || "-"),
  ].join("\n");
}

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const { sessionId, start } = await req.json();
    if (!sessionId || !start) return Response.json({ error: "missing params" }, { status: 400 });

    const startMs = new Date(start).getTime();
    const endMs = startMs + SLOT_MINUTES * 60000;
    const startIso = new Date(startMs).toISOString();

    // filter() may return either a page ({ items, ... }) or a plain array
    // depending on the installed SDK; handle both so a booking never fails with
    // lead_not_found on a valid session.
    const res = await base44.asServiceRole.entities.OrganizationFitLead.filter({ sessionId });
    const items = Array.isArray(res) ? res : (res && res.items) || [];
    const lead = items[0];
    if (!lead) return Response.json({ error: "lead_not_found" }, { status: 404 });

    // Idempotent retry: if this lead already booked this exact slot, return the
    // existing booking instead of creating a second calendar event.
    if (lead.eventId && lead.status === "meeting_booked" && lead.meetingAt === startIso) {
      return Response.json({ ok: true, assignedTo: lead.assignedTo, meetingAt: lead.meetingAt, eventId: lead.eventId, reused: true });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('googlecalendar');

    // Re-check availability and assign to tal if free, else to shiri.
    let assignTo = null;
    for (const cal of SALES_CALENDARS) {
      try {
        const free = await checkFree(accessToken, cal, startMs, endMs);
        if (free) { assignTo = cal; break; }
      } catch (e) { /* try next */ }
    }
    if (!assignTo) return Response.json({ error: "slot_taken" }, { status: 409 });

    const attendees = [];
    if (lead.email) attendees.push({ email: lead.email });
    attendees.push({ email: assignTo });

    const ev = await createMeetingEvent(accessToken, assignTo, {
      title: `boombuy × ${lead.orgName || ""}`,
      startMs,
      endMs,
      attendees,
      description: buildDesc(lead),
    });

    await base44.asServiceRole.entities.OrganizationFitLead.update(lead.id, {
      status: "meeting_booked",
      meetingAt: startIso,
      assignedTo: assignTo,
      eventId: ev.id,
    });

    try { await sendMeetingEmail(base44, lead, assignTo, startIso, ev.hangoutLink); } catch (e) { /* email best-effort */ }

    return Response.json({ ok: true, assignedTo: assignTo, meetingAt: startIso, eventId: ev.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}