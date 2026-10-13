import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { sendNewLeadEmail } from '../../shared/leadEmails.ts';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const { sessionId } = await req.json();
    if (!sessionId) return Response.json({ error: "missing sessionId" }, { status: 400 });

    const page = await base44.asServiceRole.entities.OrganizationFitLead.filter({ sessionId });
    const lead = page.items && page.items[0];
    if (!lead) return Response.json({ error: "lead_not_found" }, { status: 404 });

    try { await sendNewLeadEmail(base44, lead); } catch (e) { /* email best-effort */ }
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}