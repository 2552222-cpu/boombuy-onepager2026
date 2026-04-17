import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const TEAM_EMAILS = ["uriel@boombuy.co.il", "shiri@boombuy.co.il", "ari@boombuy.co.il"];
const APP_URL = "https://boom-perk-flow.base44.app";

async function sendToAll(base44, subject, body) {
  for (const email of TEAM_EMAILS) {
    await base44.asServiceRole.integrations.Core.SendEmail({ to: email, subject, body }).catch(() => {});
  }
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { event, orgKey, prevCount, newCount } = await req.json();

    const groups = await base44.asServiceRole.entities.GroupRequest.filter({ orgKey });
    if (groups.length === 0) return Response.json({ ok: false, reason: "org not found" });

    const group = groups[0];
    const orgName = group.orgName;
    const orgLink = `${APP_URL}/join/${orgKey}`;

    // ── org_created ────────────────────────────────────────────────────────
    if (event === "org_created") {
      await sendToAll(
        base44,
        `🔔 בקשה חדשה נפתחה — ${orgName}`,
        `בקשה חדשה נפתחה לארגון: ${orgName}
גודל ארגון: ${group.orgSize || "לא צוין"}
תקציב חג: ${group.holidayBudget || "לא צוין"}
כאב מרכזי: ${group.painPoint || "לא צוין"}
פותח הבקשה: ${group.initiatorName || "לא צוין"}
טלפון: ${group.initiatorPhone || "לא צוין"}
עמוד הבקשה: ${orgLink}`
      );
      return Response.json({ ok: true, event: "org_created" });
    }

    // ── member_joined — check milestones ──────────────────────────────────
    if (event === "member_joined") {
      if (prevCount < 10 && newCount >= 10 && !group.notified10) {
        await base44.asServiceRole.entities.GroupRequest.update(group.id, { notified10: true });
        await sendToAll(
          base44,
          `🔥 Hot Lead — ${orgName} הגיע ל-10 עובדים`,
          `ארגון: ${orgName}
עובדים שהצטרפו: 10
עמוד הבקשה: ${orgLink}
כדאי להתקשר עכשיו!`
        );
      }

      if (prevCount < 20 && newCount >= 20 && !group.notified20) {
        await base44.asServiceRole.entities.GroupRequest.update(group.id, { notified20: true });
        await sendToAll(
          base44,
          `🚀 Very Hot — ${orgName} הגיע ל-20 עובדים`,
          `ארגון: ${orgName}
עובדים שהצטרפו: 20
עמוד הבקשה: ${orgLink}
זה הזמן לסגור!`
        );
      }

      if (prevCount < 50 && newCount >= 50 && !group.notified50) {
        await base44.asServiceRole.entities.GroupRequest.update(group.id, { notified50: true });
        await sendToAll(
          base44,
          `🚀🚀 ${orgName} הגיע ל-50 עובדים!`,
          `ארגון: ${orgName}
עובדים שהצטרפו: 50
עמוד הבקשה: ${orgLink}`
        );
      }

      return Response.json({ ok: true, event: "member_joined", newCount });
    }

    return Response.json({ ok: false, reason: "unknown event" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});