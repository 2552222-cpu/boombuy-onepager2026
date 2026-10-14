// Team notification emails for One Pager leads. Plain JS — runs in Deno functions.
export const SALES_EMAILS = ["talorsmile@gmail.com", "shiri@boombuy.co.il"];
export const CC_EMAILS = ["ari@boombuy.co.il"];

function lines(arr) {
  return arr.filter(Boolean).join("\n");
}

function jerTimeLabel(iso) {
  try {
    const p = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jerusalem", weekday: "long", day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date(iso));
    const get = (t) => p.find((x) => x.type === t)?.value || "";
    let h = get("hour");
    if (h === "24") h = "00";
    return `${get("weekday")} ${get("day")} ${get("month")} ${h}:${get("minute")}`;
  } catch (e) {
    return iso;
  }
}

async function sendToMany(base44, to, subject, body) {
  // Don't swallow send failures: collect results, and throw if any recipient
  // rejected, so callers can surface the failure instead of reporting success.
  const results = await Promise.allSettled(
    to.map((email) =>
      base44.asServiceRole.integrations.Core.SendEmail({ to: email, subject, body })
    )
  );
  const failed = results.filter((r) => r.status === "rejected");
  if (failed.length) {
    const reasons = failed.map((r) => (r.reason && r.reason.message) ? r.reason.message : String(r.reason)).join("; ");
    throw new Error("email_failed: " + reasons);
  }
}

export async function sendNewLeadEmail(base44, lead) {
  const subject = `ליד חדש מה־One Pager: ${lead.orgName || ""} · ${lead.orgSize || ""}`;
  const body = lines([
    "ליד חדש מה־One Pager",
    "",
    "ארגון: " + (lead.orgName || "-"),
    "שם: " + (lead.fullName || "-"),
    "טלפון: " + (lead.phone || "-"),
    "אימייל: " + (lead.email || "-"),
    "גודל ארגון: " + (lead.orgSize || "-"),
    "מצב רווחה: " + (lead.welfareState || "-"),
    "מטרת שדרוג: " + (lead.upgradeGoal || "-"),
    "",
    "מקור:",
    "utm_source: " + (lead.utm_source || "-"),
    "utm_medium: " + (lead.utm_medium || "-"),
    "utm_campaign: " + (lead.utm_campaign || "-"),
    "utm_content: " + (lead.utm_content || "-"),
    "li_fat_id: " + (lead.li_fat_id || "-"),
    "landing_url: " + (lead.landing_url || "-"),
  ]);
  await sendToMany(base44, [...SALES_EMAILS, ...CC_EMAILS], subject, body);
}

export async function sendMeetingEmail(base44, lead, assignTo, meetingAtIso, hangoutLink) {
  const subject = `פגישה נקבעה: ${lead.orgName || ""} · ${jerTimeLabel(meetingAtIso)}`;
  const body = lines([
    "פגישה נקבעה מה־One Pager",
    "",
    "ארגון: " + (lead.orgName || "-"),
    "שם: " + (lead.fullName || "-"),
    "טלפון: " + (lead.phone || "-"),
    "אימייל: " + (lead.email || "-"),
    "מועד: " + jerTimeLabel(meetingAtIso),
    "נציגה שקיבלה: " + assignTo,
    "קישור לשיחה: " + (hangoutLink || "-"),
  ]);
  await sendToMany(base44, [...SALES_EMAILS, ...CC_EMAILS], subject, body);
}