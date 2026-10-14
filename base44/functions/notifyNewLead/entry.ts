import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { sendNewLeadEmail } from '../../shared/leadEmails.ts';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const { sessionId } = await req.json();
    if (!sessionId) return Response.json({ error: "missing sessionId" }, { status: 400 });

    // filter() may return either a page ({ items, ... }) or a plain array
    // depending on the installed SDK; handle both so a valid lead isn't missed.
    const res = await base44.asServiceRole.entities.OrganizationFitLead.filter({ sessionId });
    const items = Array.isArray(res) ? res : (res && res.items) || [];
    const lead = items[0];
    if (!lead) return Response.json({ error: "lead_not_found" }, { status: 404 });

    // Surface email failures honestly — sendNewLeadEmail throws on any rejected
    // recipient, so we never report success when the team wasn't notified.
    await sendNewLeadEmail(base44, lead);
    return Response.json({ ok: true, emailSent: true });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}