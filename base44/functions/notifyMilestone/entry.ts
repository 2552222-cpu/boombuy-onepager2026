import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { groupRequestId, milestone } = await req.json();

    if (!groupRequestId || !milestone) {
      return Response.json(
        { error: 'Missing groupRequestId or milestone' },
        { status: 400 }
      );
    }

    const groupRequest = await base44.entities.GroupRequest.get(groupRequestId);

    if (!groupRequest) {
      return Response.json(
        { error: 'GroupRequest not found' },
        { status: 404 }
      );
    }

    const subject = `BoomBuy - הבקשה התחזקה בארגון ${groupRequest.orgName}`;

    const body = `
Organization: ${groupRequest.orgName}
orgKey: ${groupRequest.orgKey}
Current Count: ${groupRequest.currentCount}
Event: milestone_${milestone}
Initiator Name: ${groupRequest.initiatorName}
Initiator Phone: ${groupRequest.initiatorPhone}
Initiator Email: ${groupRequest.initiatorEmail || 'N/A'}
Created At: ${groupRequest.created_date}
Last Joined At: ${groupRequest.lastJoinedAt}
HR Page: https://www.boombuyonepage.com
Employees Page: https://www.boombuyonepage.com/employees?orgKey=${groupRequest.orgKey}
    `;

    await base44.integrations.Core.SendEmail({
      to: 'ari@boombuy.co.il,uriel@boombuy.co.il',
      subject,
      body,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
});