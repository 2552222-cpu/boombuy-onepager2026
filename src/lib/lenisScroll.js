// Lenis singleton holder + a scrollToId that routes through it when smooth
// scroll is active, and falls back to native scroll otherwise (and always when
// the user prefers reduced motion).

let lenis = null;
let enabled = false;

export function setLenis(instance, isOn) {
  lenis = instance;
  enabled = !!isOn;
}

export function getLenis() {
  return lenis;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (enabled && lenis && !prefersReducedMotion()) {
    lenis.scrollTo(el, { offset: -80, duration: 1.1 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
}