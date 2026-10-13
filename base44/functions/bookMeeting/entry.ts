import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { SALES_CALENDARS, checkFree, createMeetingEvent } from '../../shared/calendarBooking.ts';
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
    const endMs = startMs + 30 * 60000;
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

    const page = await base44.asServiceRole.entities.OrganizationFitLead.filter({ sessionId });
    const lead = page.items && page.items[0];
    if (!lead) return Response.json({ error: "lead_not_found" }, { status: 404 });

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
      meetingAt: new Date(startMs).toISOString(),
      assignedTo,
    });

    try { await sendMeetingEmail(base44, lead, assignTo, new Date(startMs).toISOString(), ev.hangoutLink); } catch (e) { /* email best-effort */ }

    return Response.json({ ok: true, assignedTo, meetingAt: new Date(startMs).toISOString() });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}