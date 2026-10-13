import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenisScroll";

// Initialise Lenis smooth scroll on the landing page.
// - lerp 0.1, smoothWheel true, syncTouch false (mobile stays native).
// - Skipped entirely when the user prefers reduced motion.
// - The raf loop pauses while the tab is hidden.
// - The offer modal broadcasts `offersModalChange`; we stop/start Lenis and tag
//   the dialog with data-lenis-prevent so its inner content scrolls natively.
export function useLenis() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setLenis(null, false);
      return;
    }

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });
    setLenis(lenis, true);

    let rafId;
    const raf = (time) => {
      if (!document.hidden) lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onModal = (e) => {
      const open = !!e?.detail?.open;
      if (open) {
        lenis.stop();
        // Defer to next frame so the dialog is in the DOM, then let it scroll.
        requestAnimationFrame(() => {
          document.querySelectorAll('[role="dialog"]').forEach((d) => {
            d.setAttribute("data-lenis-prevent", "");
          });
        });
      } else {
        lenis.start();
      }
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