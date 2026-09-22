import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBottomUIVisibility } from "./useBottomUIVisibility";

const CHARCOAL = "#17191D";
const CORAL = "#F47A5A";
const RAIL_H_DESKTOP = 64;
const RAIL_H_MOBILE = 52;

// Persistent CTA → "בדיקת התאמה".
// Available after the opening section (no dependency on the employee video or
// boom_employee_completed). Hidden over the form/booking area, while a benefit
// modal is open, or while the mobile keyboard is up. Never covers the logo rail.
export default function PersistentCTA() {
  const [isMobile, setIsMobile] = useState(false);
  const [passedPlatform, setPassedPlatform] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { hidden } = useBottomUIVisibility();

  const passedPlatformRef = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Show after the platform explanation has scrolled past (covers "after the opening").
  useEffect(() => {
    const el = document.getElementById("platform-explanation");
    if (!el) return;
    let seen = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) seen = true;
        if (seen && !entry.isIntersecting && entry.boundingClientRect.top < 0) {
          passedPlatformRef.current = true;
          setPassedPlatform(true);
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Hide permanently after the fit details were saved.
  useEffect(() => {
    const onSubmitted = () => setSubmitted(true);
    window.addEventListener("boom_fit_submitted", onSubmitted);
    return () => window.removeEventListener("boom_fit_submitted", onSubmitted);
  }, []);

  const railH = isMobile ? RAIL_H_MOBILE : RAIL_H_DESKTOP;
  const visible = passedPlatform && !hidden && !submitted;

  const scrollToFit = () =>
    document.getElementById("organization-fit")?.scrollIntoView({ behavior: "smooth", block: "start" });

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
            ...(isMobile
              ? { left: 12, right: 12, bottom: `calc(${railH}px + env(safe-area-inset-bottom) + 10px)` }
              : { bottom: `calc(${railH}px + env(safe-area-inset-bottom) + 10px)`, left: 24 }),
          }}
        >
          <button
            type="button"
            onClick={scrollToFit}
            aria-label="בדיקת התאמה לארגון"
            style={{
              width: isMobile ? "100%" : "auto",
              background: CHARCOAL,
              color: "#fff",
              border: "none",
              borderRadius: isMobile ? 16 : 999,
              height: isMobile ? 54 : 48,
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