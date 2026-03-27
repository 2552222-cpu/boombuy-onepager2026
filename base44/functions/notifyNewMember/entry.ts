import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

const TEAM_EMAIL = Deno.env.get("TEAM_EMAIL") || "info@boombuy.co.il";

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    const { event, data } = payload;
    if (!data || !data.groupRequestId) return Response.json({ ok: true });

    const { groupRequestId, orgName, memberName, orgKey, memberEmail } = data;

    // Count all members for this group
    const members = await base44.asServiceRole.entities.GroupMember.filter({ groupRequestId });
    const count = members.length;

    // Update GroupRequest count
    await base44.asServiceRole.entities.GroupRequest.update(groupRequestId, {
      currentCount: count,
      lastJoinedAt: new Date().toISOString(),
    });

    const orgLink = `https://boom-perk-flow.base44.app/join/${orgKey}`;

    // --- Notify BoomBuy team ---
    let teamSubject = `עובד חדש הצטרף - ${orgName} (${count} עובדים)`;
    let teamBody = `שם עובד: ${memberName}\nארגון: ${orgName}\nסה"כ עובדים: ${count}\nלינק: ${orgLink}`;

    if (count === 1) {
      teamSubject = `בקשה חדשה נפתחה - ${orgName}`;
      teamBody = `עובד ראשון פתח בקשה עבור ${orgName}.\nשם: ${memberName}\nלינק: ${orgLink}`;
    } else if (count === 10) {
      teamSubject = `מיילסטון - הגיעו ל-10 עובדים - ${orgName}`;
      teamBody = `${orgName} הגיעו ל-10 עובדים!\nלינק: ${orgLink}`;
    } else if (count === 20) {
      teamSubject = `מיילסטון - הגיעו ל-20 עובדים - ${orgName}`;
      teamBody = `${orgName} הגיעו ל-20 עובדים!\nלינק: ${orgLink}`;
    }

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: TEAM_EMAIL,
      subject: teamSubject,
      body: teamBody,
      from_name: "BoomBuy System",
    });

    // --- Notify initiator (first member) ---
    const groups = await base44.asServiceRole.entities.GroupRequest.filter({ id: groupRequestId });
    const group = groups[0];
    const initiatorEmail = group?.initiatorEmail;

    if (initiatorEmail && count > 1) {
      let initiatorSubject = `עוד עובד הצטרף לארגון שלכם`;
      let initiatorBody = `היי,\n\nעוד עובד הצטרף לבקשה של ${orgName}. כרגע ${count} עובדים הצטרפו.\n\nלינק לעמוד: ${orgLink}\n\nצוות BoomBuy`;

      if (count === 10) {
        initiatorSubject = `הגעתם ל-10 - ${orgName}`;
        initiatorBody = `היי,\n\nמזל טוב! ${orgName} הגיעו ל-10 עובדים. זו מסה ראשונית שאפשר לעבוד איתה.\n\nלינק לעמוד: ${orgLink}\n\nצוות BoomBuy`;
      } else if (count === 20) {
        initiatorSubject = `הגעתם ל-20 - ${orgName}`;
        initiatorBody = `היי,\n\nמדהים! ${orgName} הגיעו ל-20 עובדים. זה כוח שאי אפשר להתעלם ממנו.\n\nלינק לעמוד: ${orgLink}\n\nצוות BoomBuy`;
      }

      await base44.asServiceRole.integrations.Core.SendEmail({
        to: initiatorEmail,
        subject: initiatorSubject,
        body: initiatorBody,
        from_name: "BoomBuy",
      });
    }

    return Response.json({ ok: true, count });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});