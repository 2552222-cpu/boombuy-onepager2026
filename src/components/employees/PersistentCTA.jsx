import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHARCOAL = "#17191D";
const CORAL = "#F47A5A";

// Persistent CTA: a small fixed button on desktop (after platform-explanation)
// and a sticky bottom bar on mobile (after the employee video ends).
// Hidden during videos, over organization-fit/book-demo, after a meeting is booked,
// and never alongside the floating WhatsApp button.
export default function PersistentCTA() {
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const [booked, setBooked] = useState(false);
  const [employeeCompleted, setEmployeeCompleted] = useState(false);

  const videoMap = useRef({});
  const fitMap = useRef({});
  // re-render triggers derived from refs
  const [, force] = useState(0);
  const tick = () => force((n) => n + 1);

  const computeVisible = () => {
    if (booked) return false;
    const overVideo = Object.values(videoMap.current).some(Boolean);
    const overFitOrBook = Object.values(fitMap.current).some(Boolean);
    if (overVideo || overFitOrBook) return false;
    if (isMobile) return employeeCompleted;
    return passedPlatformRef.current;
  };

  const passedPlatformRef = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Track whether we've scrolled past the platform-explanation section
  useEffect(() => {
    const el = document.getElementById("platform-explanation");
    if (!el) return;
    let seen = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) seen = true;
        if (seen && !entry.isIntersecting && entry.boundingClientRect.top < 0) {
          passedPlatformRef.current = true;
          tick();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Hide while a video section is on screen
  useEffect(() => {
    const ids = ["hero-transformation", "employee-experience"];
    const observers = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          videoMap.current[id] = entry.isIntersecting && entry.intersectionRatio > 0.15;
          tick();
        },
        { threshold: [0, 0.15, 0.3] }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Hide while organization-fit / book-demo are on screen
  useEffect(() => {
    const ids = ["organization-fit", "book-demo"];
    const observers = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          fitMap.current[id] = entry.isIntersecting && entry.intersectionRatio > 0.1;
          tick();
        },
        { threshold: [0, 0.1, 0.3] }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Mobile: only after the employee video has completed
  useEffect(() => {
    const onDone = () => {
      setEmployeeCompleted(true);
    };
    window.addEventListener("boom_employee_completed", onDone);
    return () => window.removeEventListener("boom_employee_completed", onDone);
  }, []);

  // Hide permanently after a meeting is booked
  useEffect(() => {
    const onBooked = () => setBooked(true);
    window.addEventListener("boom_meeting_booked", onBooked);
    return () => window.removeEventListener("boom_meeting_booked", onBooked);
  }, []);

  const visibleNow = computeVisible();

  // Coordinate with the floating WhatsApp button — hide it while this CTA is visible
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("boom_persistent_cta", { detail: { visible: visibleNow } }));
  }, [visibleNow]);

  const scrollToFit = () =>
    document.getElementById("organization-fit")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <AnimatePresence>
      {visibleNow && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            position: "fixed",
            zIndex: 90,
            ...(isMobile
              ? { left: 12, right: 12, bottom: 18 }
              : { bottom: 90, left: 24 }),
          }}
        >
          <button
            type="button"
            onClick={scrollToFit}
            aria-label="לבדוק התאמה לארגון"
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
            לבדוק התאמה לארגון
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}