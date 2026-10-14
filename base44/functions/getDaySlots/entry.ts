import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { getDaySlotsForDate } from '../../shared/calendarBooking.ts';
import { validateBookingDate } from '../../shared/bookingValidation.ts';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const { date } = await req.json();
    const nowMs = Date.now();
    const { y, mo, d } = validateBookingDate(date, nowMs);
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('googlecalendar');
    const slots = await getDaySlotsForDate(accessToken, y, mo, d, nowMs);
    return Response.json({ slots });
  } catch (error) {
    if (error.status === 400) return Response.json({ error: error.message }, { status: 400 });
    return Response.json({ error: "calendar_unavailable", message: "חיבור היומן אינו זמין כרגע. נא לנסות שוב מאוחר יותר." }, { status: 503 });
  }
}