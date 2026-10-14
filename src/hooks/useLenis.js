import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenisScroll";

// Initialise Lenis smooth scroll on the landing page (desktop only).
// - Mobile uses native scroll exclusively: syncTouch:false means Lenis never
//   smooths touch anyway, and skipping it there removes the rAF loop + wheel
//   listener overhead that would otherwise run every frame for no benefit.
// - lerp 0.12, smoothWheel true on desktop.
// - `prevent` keeps wheel/pan native inside any [role="dialog"] (the offer modal),
//   so no manual data-lenis-prevent tagging is needed.
// - Skipped entirely when the user prefers reduced motion.
// - The raf loop pauses while the tab is hidden.
export function useLenis() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || window.innerWidth < 768) {
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