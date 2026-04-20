import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { name, phone, org } = await req.json();

    const subject = `בקשת דמו חדשה – ${org}`;
    const body = `שם: ${name}\nטלפון: ${phone}\nארגון: ${org}`;

    await Promise.all([
      base44.asServiceRole.integrations.Core.SendEmail({ to: "uriel@boombuy.co.il", subject, body }),
      base44.asServiceRole.integrations.Core.SendEmail({ to: "ari@boombuy.co.il", subject, body }),
    ]);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});