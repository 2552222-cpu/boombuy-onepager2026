// Shared layout constants for the fixed bottom UI (logo rail + persistent CTA)
// and unified section typography/spacing tokens (SECTION).
// Single source of truth — PersistentCTA / LogoRail / page padding / all
// sections read from here so values can't desync.
export const SECTION = {
  // Section padding (desktop / mobile)
  PAD_TOP: 88,
  PAD_BOTTOM: 92,
  PAD_TOP_MOBILE: 40,
  PAD_BOTTOM_MOBILE: 44,
  // H2
  H2_MOBILE: 28,
  H2_DESKTOP: "clamp(32px,4vw,48px)",
  H2_LH: 1.12,
  H2_WEIGHT: 800,
  CHARCOAL: "#17191D",
  CORAL_TEXT: "#C24A2C",
  // Kicker above h2
  KICKER_SIZE: 13,
  KICKER_WEIGHT: 700,
  // Body running text
  BODY_MOBILE: 16,
  BODY_DESKTOP: 18,
  BODY_COLOR: "#3A3C42",
  BODY_LH: 1.6,
  // Primary button
  BTN_H: 52,
  BTN_RADIUS: 999,
  BTN_BG: "#17191D",
  BTN_CORAL: "#F47A5A",
  // Alternating section backgrounds (no two adjacent the same)
  BG_WARM: "#FBFAF8",
  BG_WHITE: "#FFFFFF",
  BG_MIST: "#F7F7F4",
};

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
  isMobile ? 0 : LAYOUT.RAIL_HEIGHT_DESKTOP; // mobile hides the fixed rail (logos live in the hero)

export const ctaHeight = (isMobile) =>
  isMobile ? LAYOUT.CTA_H_MOBILE : LAYOUT.CTA_H_DESKTOP;

// Total reserved bottom space for the fixed stack (rail + CTA + safe area), used by the
// page paddingBottom so nothing permanent hides behind the rail.
// Mobile: CTA only (rail is inline in the hero), so no rail height.
export const pageBottomReserve = (isMobile) =>
  railHeight(isMobile) + ctaHeight(isMobile) + LAYOUT.CTA_BOTTOM_MARGIN;