import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { groupRequestId, count } = body;

    const base44Service = base44.asServiceRole;

    const requests = await base44Service.entities.GroupRequest.filter({ id: groupRequestId });
    if (!requests || requests.length === 0) {
      return Response.json({ error: 'Group request not found' }, { status: 404 });
    }
    const gr = requests[0];

    const employeesLink = `https://www.boombuyonepage.com/employees?sign=1&org=${gr.orgKey}&orgName=${encodeURIComponent(gr.orgName)}`;
    const hrMessage = `היי, ${count} עובדים אצלנו כבר הצטרפו לבקשה לבדוק את BoomBuy.\n\nמדובר בפתרון שיכול לתת לעובדים יותר ערך דרך התקציב שכבר קיים, עם הטבות יומיומיות ויותר בחירה במתנות לחג - בלי שהחברה תצטרך להוסיף תקציב.\n\nנשמח אם תבדקו אם זה יכול להתאים גם אצלנו:\nhttps://www.boombuyonepage.com`;

    const emailBody = `A group request reached threshold ${count}.\n\nOrganization: ${gr.orgName}\nOrg Key: ${gr.orgKey}\nCurrent Count: ${count}\nThreshold Reached At: ${new Date().toISOString()}\nInitiator Name: ${gr.initiatorName || 'לא צוין'}\nInitiator Phone: ${gr.initiatorPhone || 'לא צוין'}\nInitiator Email: ${gr.initiatorEmail || 'לא צוין'}\n\nHR Page:\nhttps://www.boombuyonepage.com\n\nEmployees Page:\n${employeesLink}\n\nSuggested HR Message:\n${hrMessage}`;

    const subject = `BoomBuy – בקשת עובדים הגיעה ל-${count} מצטרפים – ${gr.orgName}`;

    const recipients = ['ari@boombuy.co.il', 'uriel@boombuy.co.il'];

    for (const to of recipients) {
      await base44Service.integrations.Core.SendEmail({
        to,
        subject,
        body: emailBody,
      });
    }

    // Update notified flags
    const updateData = { currentCount: count, thresholdReachedAt: new Date().toISOString() };
    if (count >= 10) {
      updateData.notifiedAt10 = true;
      updateData.status = 'notified_owner';
    } else if (count >= 5) {
      updateData.notifiedAt5 = true;
      updateData.status = 'ready_to_send';
    }
    await base44Service.entities.GroupRequest.update(groupRequestId, updateData);

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});