import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    const { event, data, old_data } = payload;

    // בדוק אם זה update ובדוק אם ה-currentCount השתנה
    if (!old_data || data.currentCount === old_data.currentCount) {
      return Response.json({ skipped: true });
    }

    const newCount = data.currentCount;
    const milestones = [3, 5, 10];

    // שלח מייל רק אם עברנו milestone
    if (!milestones.includes(newCount)) {
      return Response.json({ skipped: true });
    }

    const subject = `BoomBuy - הבקשה התחזקה בארגון ${data.orgName}`;

    const body = `
Organization: ${data.orgName}
orgKey: ${data.orgKey}
Current Count: ${newCount}
Event: milestone_${newCount}
Initiator Name: ${data.initiatorName}
Initiator Phone: ${data.initiatorPhone}
Initiator Email: ${data.initiatorEmail || 'N/A'}
Created At: ${data.created_date}
Last Joined At: ${data.lastJoinedAt}
HR Page: https://www.boombuyonepage.com
Employees Page: https://www.boombuyonepage.com/employees?orgKey=${data.orgKey}
    `;

    await base44.integrations.Core.SendEmail({
      to: 'ari@boombuy.co.il,uriel@boombuy.co.il',
      subject,
      body,
    });

    return Response.json({ sent: true, milestone: newCount });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
});