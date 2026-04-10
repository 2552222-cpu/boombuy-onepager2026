import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

const TEAM_EMAIL = Deno.env.get("TEAM_EMAIL");
const EXTRA_EMAILS = ["ari@boombuy.co.il", "uriel@boombuy.co.il"];
const APP_URL = "https://boom-perk-flow.base44.app";

const MILESTONES = [
  {
    threshold: 10,
    flag: "notified10",
    teamSubject: (orgName, count) => `🔥 בום ביי: ${orgName} הגיע ל-10 עובדים!`,
    initiatorMsg: (orgName) => `הגעתם ל-10 עובדים ב-${orgName}. יש כאן כבר מסה ראשונית.`,
  },
  {
    threshold: 20,
    flag: "notified20",
    teamSubject: (orgName, count) => `🔥🔥 בום ביי: ${orgName} הגיע ל-20 עובדים!`,
    initiatorMsg: (orgName) => `הגעתם ל-20 עובדים ב-${orgName}. זה כבר כוח שאי אפשר להתעלם ממנו.`,
  },
  {
    threshold: 50,
    flag: "notified50",
    teamSubject: (orgName, count) => `🚀 בום ביי: ${orgName} הגיע ל-50 עובדים!`,
    initiatorMsg: (orgName) => `הגעתם ל-50 עובדים ב-${orgName}. זה כבר מהלך ארגוני משמעותי מאוד.`,
  },
];

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { event, orgKey, prevCount, newCount } = await req.json();

    const groups = await base44.asServiceRole.entities.GroupRequest.filter({ orgKey });
    if (groups.length === 0) return Response.json({ ok: false, reason: "org not found" });

    const group = groups[0];
    const orgName = group.orgName;
    const orgLink = `${APP_URL}/join/${orgKey}`;

    const teamBody = (subject, extra = "") =>
      `ארגון: ${orgName}
orgKey: ${orgKey}
עובדים: ${newCount}
גודל ארגון: ${group.orgSize || "לא צוין"}
תקציב חג: ${group.holidayBudget || "לא צוין"}
פעילויות: ${(group.activities || []).join(", ") || "לא צוין"}
מנהל/ת רווחה HR: ${group.initiatorName || "לא צוין"}
טלפון איש קשר: ${group.initiatorPhone || "לא צוין"}

לינק לעמוד: ${orgLink}
${extra}`;

    // Org created
    if (event === "org_created") {
      const allEmails = [...(TEAM_EMAIL ? [TEAM_EMAIL] : []), ...EXTRA_EMAILS];
      for (const email of allEmails) {
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: email,
          subject: `✅ ארגון חדש ב-בום ביי: ${orgName}`,
          body: teamBody(""),
        }).catch(() => {});
      }
      return Response.json({ ok: true, event: "org_created" });
    }

    // Member joined — check milestones
    if (event === "member_joined") {
      for (const m of MILESTONES) {
        if (prevCount < m.threshold && newCount >= m.threshold && !group[m.flag]) {
          await base44.asServiceRole.entities.GroupRequest.update(group.id, { [m.flag]: true });

          const milestoneEmails = [...(TEAM_EMAIL ? [TEAM_EMAIL] : []), ...EXTRA_EMAILS];
          for (const email of milestoneEmails) {
            await base44.asServiceRole.integrations.Core.SendEmail({
              to: email,
              subject: m.teamSubject(orgName, newCount),
              body: teamBody(""),
            }).catch(() => {});
          }

          if (group.initiatorEmail) {
            await base44.asServiceRole.integrations.Core.SendEmail({
              to: group.initiatorEmail,
              subject: `עדכון על הבקשה של ${orgName}`,
              body: m.initiatorMsg(orgName),
            });
          }
        }
      }

      // After milestone 20 — notify team on every new member
      if (prevCount >= 20) {
        const postMilestoneEmails = [...(TEAM_EMAIL ? [TEAM_EMAIL] : []), ...EXTRA_EMAILS];
        for (const email of postMilestoneEmails) {
          await base44.asServiceRole.integrations.Core.SendEmail({
            to: email,
            subject: `עובד נוסף הצטרף ל-${orgName} (${newCount} סה"כ) - בום ביי`,
            body: teamBody(""),
          }).catch(() => {});
        }
      }

      return Response.json({ ok: true, event: "member_joined", newCount });
    }

    return Response.json({ ok: false, reason: "unknown event" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});