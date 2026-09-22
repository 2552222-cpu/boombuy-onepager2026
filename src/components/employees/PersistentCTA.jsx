import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBottomUIVisibility } from "./useBottomUIVisibility";
import { scrollToId } from "./uiHelpers";
import { railHeight, ctaHeight, LAYOUT } from "./layoutTokens";

const CHARCOAL = "#17191D";
const CORAL = "#F47A5A";

// Persistent CTA → "בדיקת התאמה".
// Available as soon as the opening has scrolled out of view (no dependency on
// scrolling past the whole explanation section). Removed from the tab order and
// the DOM entirely when hidden, so there is never a focusable invisible button.
// Stacked directly above the logo rail using shared layout tokens.
export default function PersistentCTA() {
  const [isMobile, setIsMobile] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { hidden } = useBottomUIVisibility();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Hide permanently after the fit details were saved (confirmation follows).
  useEffect(() => {
    const onSubmitted = () => setSubmitted(true);
    window.addEventListener("boom_fit_submitted", onSubmitted);
    return () => window.removeEventListener("boom_fit_submitted", onSubmitted);
  }, []);

  const railH = railHeight(isMobile);
  const ctaH = ctaHeight(isMobile);
  const bottom = `calc(${railH}px + ${LAYOUT.CTA_BOTTOM_MARGIN}px + env(safe-area-inset-bottom))`;
  const visible = !hidden && !submitted;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            position: "fixed",
            zIndex: 90,
            bottom,
            ...(isMobile
              ? { left: 12, right: 12 }
              : { left: 24 }),
          }}
        >
          <button
            type="button"
            onClick={() => scrollToId("organization-fit")}
            aria-label="בדיקת התאמה לארגון"
            style={{
              width: isMobile ? "100%" : "auto",
              background: CHARCOAL,
              color: "#fff",
              border: "none",
              borderRadius: isMobile ? 16 : 999,
              height: ctaH,
              padding: isMobile ? "0 18px" : "0 22px",
              fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif",
              fontWeight: 700,
              fontSize: isMobile ? 16 : 15,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              boxShadow: "0 10px 28px rgba(19,21,25,0.22)",
              maxWidth: isMobile ? "100%" : 260,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: CORAL, display: "inline-block", flexShrink: 0 }} />
            בדיקת התאמה
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}