import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { getAvailableDays } from '../../shared/calendarBooking.ts';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('googlecalendar');
    const days = await getAvailableDays(accessToken);
    return Response.json({ days });
  } catch (error) {
    return Response.json({ error: "calendar_unavailable", message: "חיבור היומן אינו זמין כרגע. נא לנסות שוב מאוחר יותר." }, { status: 503 });
  }
}