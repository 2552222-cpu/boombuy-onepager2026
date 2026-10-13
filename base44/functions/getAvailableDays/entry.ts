import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { getAvailableDays } from '../../shared/calendarBooking.ts';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('googlecalendar');
    const days = await getAvailableDays(accessToken);
    return Response.json({ days });
  } catch (error) {
    // On any failure (connector not connected, API error), return empty days so the
    // UI can fall back to the WhatsApp button.
    return Response.json({ days: [], error: error.message });
  }
}