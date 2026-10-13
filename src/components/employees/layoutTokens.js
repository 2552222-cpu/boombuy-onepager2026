// Shared layout constants for the fixed bottom UI (logo rail + persistent CTA).
// Single source of truth — PersistentCTA / LogoRail / page padding all read from here
// so changing the rail height can't desync the page bottom reserve or the CTA stack.
export const LAYOUT = {
  RAIL_HEIGHT_DESKTOP: 100,
  RAIL_HEIGHT_MOBILE: 82,
  LOGO_H_DESKTOP: 64,
  LOGO_H_MOBILE: 50,
  LOGO_SLOT_DESKTOP: 210,
  LOGO_SLOT_MOBILE: 160,
  CTA_H_DESKTOP: 48,
  CTA_H_MOBILE: 54,
  CTA_BOTTOM_MARGIN: 12, // gap above the rail
  RAIL_SPEED_PX_PER_SEC: 16, // slow, calm
};

export const railHeight = (isMobile) =>
  isMobile ? LAYOUT.RAIL_HEIGHT_MOBILE : LAYOUT.RAIL_HEIGHT_DESKTOP;

export const ctaHeight = (isMobile) =>
  isMobile ? LAYOUT.CTA_H_MOBILE : LAYOUT.CTA_H_DESKTOP;

// Total reserved bottom space for the fixed stack (rail + CTA + safe area), used by the
// page paddingBottom so nothing permanent hides behind the rail.
export const pageBottomReserve = (isMobile) =>
  railHeight(isMobile) + ctaHeight(isMobile) + LAYOUT.CTA_BOTTOM_MARGIN;