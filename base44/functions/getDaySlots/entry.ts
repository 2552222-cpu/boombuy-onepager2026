import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { getDaySlotsForDate } from '../../shared/calendarBooking.ts';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const { date } = await req.json();
    if (!date) return Response.json({ error: "missing date", slots: [] }, { status: 400 });
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('googlecalendar');
    const parts = date.split("-").map(Number);
    const slots = await getDaySlotsForDate(accessToken, parts[0], parts[1], parts[2], Date.now());
    return Response.json({ slots });
  } catch (error) {
    return Response.json({ slots: [], error: error.message });
  }
}