import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import {
  GOOGLE_CALENDAR_BOOKING_URL,
  GOOGLE_CALENDAR_EMBED,
  isCalendarConfigured,
} from "@/lib/siteConfig";

const BG = "#F7F7F4";
const CHARCOAL = "#17191D";
const CORAL = "#F47A5A";
const WHITE = "#FFFFFF";
const EASE = [0.22, 1, 0.36, 1];

export default function BookDemo() {
  const [revealed, setRevealed] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  const configured = isCalendarConfigured();
  const embed = GOOGLE_CALENDAR_EMBED;

  // Reveal only after the fit details have been saved successfully.
  useEffect(() => {
    const onFit = () => setRevealed(true);
    window.addEventListener("boom_fit_submitted", onFit);
    return () => window.removeEventListener("boom_fit_submitted", onFit);
  }, []);

  // calendar_opened only when a real calendar is actually presented.
  useEffect(() => {
    if (!revealed || !configured) return;
    try {
      base44.analytics.track({ eventName: "calendar_opened" });
    } catch (err) {
      /* ignore */
    }
  }, [revealed, configured]);

  if (!revealed) return null;

  return (
    <section
      id="book-demo"
      dir="rtl"
      style={{
        background: BG,
        padding: "84px 20px 96px",
        fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif",
        scrollMarginTop: 90,
      }}
    >
      <style>{`@media (max-width:768px){ #book-demo{ scroll-margin-top:72px; padding:64px 16px 72px; } }`}</style>

      <div style={{ maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{
            color: CHARCOAL,
            fontSize: "clamp(30px,4vw,54px)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            margin: 0,
          }}
        >
          15 דקות.
          <br />
          ותראו איך זה <span style={{ color: CORAL }}>נראה אצלכם</span>.
        </motion.h2>

        <AnimatePresence mode="wait">
          {configured && embed ? (
            <motion.div
              key="iframe"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: EASE }}
              style={{ marginTop: 36 }}
            >
              {iframeLoading && (
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                  <span style={{ width: 28, height: 28, borderRadius: "50%", border: "3px solid rgba(19,21,25,0.12)", borderTopColor: CORAL, animation: "bd-spin 0.8s linear infinite", display: "inline-block" }} />
                </div>
              )}
              <iframe
                src={GOOGLE_CALENDAR_BOOKING_URL}
                title="קביעת הדגמה"
                onLoad={() => setIframeLoading(false)}
                style={{
                  width: "100%",
                  minWidth: "100%",
                  height: "min(78vh, 760px)",
                  border: "1px solid rgba(19,21,25,0.10)",
                  borderRadius: 24,
                  background: WHITE,
                  boxSizing: "border-box",
                }}
              />
            </motion.div>
          ) : configured ? (
            <motion.div
              key="button"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: EASE }}
              style={{ marginTop: 40, display: "flex", justifyContent: "center" }}
            >
              <button
                type="button"
                onClick={() => window.open(GOOGLE_CALENDAR_BOOKING_URL, "_blank", "noopener,noreferrer")}
                style={{
                  background: CHARCOAL,
                  color: "#fff",
                  border: "none",
                  borderRadius: 999,
                  height: 60,
                  minWidth: 260,
                  maxWidth: 380,
                  padding: "0 32px",
                  fontFamily: "inherit",
                  fontWeight: 700,
                  fontSize: "clamp(17px,1.2vw,19px)",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  boxShadow: "0 12px 32px rgba(23,25,29,0.20)",
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: CORAL, display: "inline-block", flexShrink: 0 }} />
                לבחירת שעה ביומן
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: EASE }}
              style={{ maxWidth: 560, margin: "40px auto 0", padding: "44px 32px", background: WHITE, borderRadius: 24, border: "1px solid rgba(244,122,90,0.30)", boxShadow: "0 18px 50px rgba(244,122,90,0.10)" }}
            >
              <h3 style={{ color: CHARCOAL, fontSize: "clamp(24px,3vw,32px)", fontWeight: 700, margin: "0 0 12px", letterSpacing: "-0.02em" }}>
                הפרטים התקבלו לצורך תיאום הדגמה.
              </h3>
              <p style={{ color: "#3A3C42", fontSize: "clamp(16px,1.3vw,19px)", lineHeight: 1.6, margin: 0 }}>
                ניצור איתכם קשר בהקדם לתיאום שיחת הדגמה של 15 דקות.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`@keyframes bd-spin{to{transform:rotate(360deg)}}`}</style>
    </section>
  );
}