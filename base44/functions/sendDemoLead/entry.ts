import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { name, phone, org } = await req.json();

    await base44.asServiceRole.entities.DemoLead.create({ name, phone, org });

    await fetch("https://hook.us1.make.com/u5dkj97q6no2wqotkken98kra26j3oc3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, org }),
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});