// Central configuration for external links used across the onepager.
// These are PUBLIC booking/demo URLs (not secrets). An empty string means the
// link is not configured yet — the related UI must render a disabled state and
// (in preview) a small "missing link" notice. Never invent a URL here.

// Link to the employee demo / join-kit experience (opened in a new tab).
export const EMPLOYEE_DEMO_URL = "";

// Google Calendar (or other scheduler) booking URL for the 15-minute demo.
export const GOOGLE_CALENDAR_BOOKING_URL = "";

// Whether the booking URL can be embedded inside an <iframe>.
// Google Calendar "appointment schedule" pages usually BLOCK framing — so the
// default is false (button that opens the scheduler in a new tab). Set to true
// only after verifying the URL is actually embeddable.
export const GOOGLE_CALENDAR_EMBED = false;

export const isEmployeeDemoConfigured = () =>
  Boolean(EMPLOYEE_DEMO_URL && EMPLOYEE_DEMO_URL.trim());

export const isCalendarConfigured = () =>
  Boolean(GOOGLE_CALENDAR_BOOKING_URL && GOOGLE_CALENDAR_BOOKING_URL.trim());