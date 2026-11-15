import { readLeadSource } from './leadSource.js';
export const OPENAI_PIXEL_ID = 'B6c4GVvJmCRjhzj1QR6tD3';
// No advertising SDK or automatic matching. Only a confirmed, consented save.
export function leadMeasurementUrl({ consent, eventId, isTest = false, oppref = '' }) {
  if (!consent || !/^[a-f0-9-]{36}$/i.test(eventId || '')) return '';
  const url = new URL('https://bzr.openai.com/v1/sdk/events');
  url.searchParams.set('pid', OPENAI_PIXEL_ID);
  url.searchParams.set('event', isTest ? 'custom' : 'lead_created');
  url.searchParams.set('data[type]', isTest ? 'custom' : 'customer_action');
  url.searchParams.set('event_id', eventId);
  if (isTest) url.searchParams.set('custom_event_name', 'boombuy_qa_lead_saved');
  if (!isTest && oppref && oppref.length <= 2048 && /^[A-Za-z0-9_=-]+$/.test(oppref)) url.searchParams.set('oppref', oppref);
  return url.href;
}
export function getOpenAIClickReference() { return readLeadSource().oppref || ''; }
