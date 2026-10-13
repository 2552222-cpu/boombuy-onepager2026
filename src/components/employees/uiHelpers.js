// Small shared UI helpers for the employees onepager.

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Scroll to a section id. Routes through Lenis when smooth scroll is active
// (with a -80px offset and 1.1s duration), and falls back to native scroll
// otherwise — always respecting the reduced-motion preference.
import { scrollToId as lenisScrollToId } from "@/lib/lenisScroll";
export const scrollToId = (id) => lenisScrollToId(id);