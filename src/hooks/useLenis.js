import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenisScroll";

// Initialise Lenis smooth scroll on the landing page.
// - lerp 0.12, smoothWheel true, syncTouch false (mobile stays native).
// - `prevent` keeps wheel/pan native inside any [role="dialog"] (the offer modal),
//   so no manual data-lenis-prevent tagging is needed.
// - Skipped entirely when the user prefers reduced motion.
// - The raf loop pauses while the tab is hidden.
export function useLenis() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setLenis(null, false);
      return;
    }

    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false,
      prevent: (node) => !!(node.closest && node.closest('[role="dialog"]')),
    });
    setLenis(lenis, true);

    let rafId;
    const raf = (time) => {
      if (!document.hidden) lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onModal = (e) => {
      const open = !!e?.detail?.open;
      if (open) lenis.stop();
      else lenis.start();
    };
    window.addEventListener("offersModalChange", onModal);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("offersModalChange", onModal);
      lenis.destroy();
      setLenis(null, false);
    };
  }, []);
}