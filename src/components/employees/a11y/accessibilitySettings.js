// Accessibility widget settings: defaults, persistence, and DOM application.
// Settings are stored in localStorage so a visitor keeps their adjustments
// between visits, and applied as classes on <html> so they cover the whole site.
export const FONT_STEPS = [1, 1.12, 1.25, 1.4];
export const FONT_LABELS = ["רגיל", "בינוני", "גדול", "גדול מאוד"];

export const DEFAULT_SETTINGS = {
  fontScale: 0, // index into FONT_STEPS
  contrast: "none", // none | high | dark | gray (mutually exclusive — each maps to one root filter)
  links: false, // highlight links and buttons
  readable: false, // high-legibility font
  noMotion: false, // stop animations
  bigCursor: false, // large cursor
};

const STORAGE_KEY = "bb-a11y-settings";

export function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (err) {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(s) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch (err) {
    /* storage unavailable — settings simply won't persist */
  }
}

export function applySettings(s) {
  const root = document.documentElement;
  // zoom reflows the page at a narrower effective width, so the px-based layout
  // scales like real page zoom instead of overflowing.
  root.style.zoom = s.fontScale > 0 ? String(FONT_STEPS[s.fontScale]) : "";
  root.classList.toggle("bb-a11y-contrast", s.contrast === "high");
  root.classList.toggle("bb-a11y-dark", s.contrast === "dark");
  root.classList.toggle("bb-a11y-grayscale", s.contrast === "gray");
  root.classList.toggle("bb-a11y-links", s.links);
  root.classList.toggle("bb-a11y-readable", s.readable);
  root.classList.toggle("bb-a11y-nomotion", s.noMotion);
  root.classList.toggle("bb-a11y-bigcursor", s.bigCursor);
}