import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * SurveyGate — mandatory interstitial before the survey.
 * User must tap "תראו לי את ההטבות" first, which scrolls to benefits.
 * After they've seen the benefits (state persisted in sessionStorage),
 * a second CTA "אני מוכן להמשיך לסקר" scrolls them to the survey.
 */
export default function SurveyGate() {
  // One-way state: false → true only, never resets
  const [seen, setSeen] = useState(false);

  const handleSeeBenefits = () => {
    setSeen(true);
    document.getElementById("benefits-showcase")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGoSurvey = () => {
    document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="survey-gate"
      dir="rtl"
      style={{
        background: "#F0F4FF",
        padding: "72px 16px",
        overflowX: "hidden",
        maxWidth: "100vw",
      }}
    >
      <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
        <AnimatePresence mode="wait">
          {!seen ? (
            <motion.div
              key="gate"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <p style={{ fontSize: 13, fontWeight: 700, color: "#0066CC", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 12 }}>
                לפני שממשיכים
              </p>
              <h2 style={{ fontSize: "clamp(22px, 4.5vw, 32px)", fontWeight: 900, color: "#1D1D1F", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 14 }}>
                הכירו את ההטבות שיכולות להגיע לארגון שלכם
              </h2>
              <p style={{ fontSize: 15, color: "#6E6E73", lineHeight: 1.65, marginBottom: 8 }}>
                הטבות אמיתיות לעובדים שמגדילות את הערך הכלכלי לאורך השנה
              </p>
              <p style={{ fontSize: 14, color: "#86868B", lineHeight: 1.55, marginBottom: 32 }}>
                לפני שממשיכים — זה מה שהארגון יכול להציע לכם בפועל
              </p>
              <button
                onClick={handleSeeBenefits}
                style={{
                  display: "inline-block",
                  background: "#0066CC",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 17,
                  padding: "18px 40px",
                  borderRadius: 20,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-heebo)",
                  boxShadow: "0 8px 28px rgba(0,102,204,0.28)",
                  width: "100%",
                  maxWidth: 360,
                }}
              >
                תראו לי את ההטבות ←
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="ready"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>✓</div>
              <h2 style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 900, color: "#1D1D1F", letterSpacing: "-0.03em", marginBottom: 10 }}>
                ראיתם את ההטבות?
              </h2>
              <p style={{ fontSize: 15, color: "#6E6E73", marginBottom: 28, lineHeight: 1.6 }}>
                עכשיו בואו נבדוק האם BoomBuy מתאימה לארגון שלכם
              </p>
              <button
                onClick={handleGoSurvey}
                style={{
                  display: "inline-block",
                  background: "#0066CC",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 17,
                  padding: "18px 40px",
                  borderRadius: 20,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-heebo)",
                  boxShadow: "0 8px 28px rgba(0,102,204,0.28)",
                  width: "100%",
                  maxWidth: 360,
                }}
              >
                אני מוכן — המשיכו לשאלון ←
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}