import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MESSAGES = [
  "מה אם העבודה שלך הייתה נותנת לך יותר?",
  "לא רק מתנה בחג. משהו שמרגישים ביומיום.",
  "מחירי עובדים על דברים שאתם באמת קונים.",
  "עכשיו תראו איך זה נראה בפועל.",
];

export default function IntroSlides() {
  const [revealed, setRevealed] = useState(1);

  const scrollToSlider = () => {
    document.getElementById("offers-slider")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSurvey = () => {
    document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNext = () => {
    if (revealed < MESSAGES.length) {
      setRevealed((r) => r + 1);
    } else {
      scrollToSlider();
    }
  };

  return (
    <section
      style={{
        background: "#fff",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        padding: "80px 20px 72px",
        overflowX: "hidden",
        maxWidth: "100vw",
      }}
    >
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "0",
        }}
      >
        {/* BoomBuy label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "#0066CC",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "40px",
            fontFamily: "var(--font-heebo)",
          }}
        >
          BoomBuy
        </motion.p>

        {/* Messages */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginBottom: "48px", width: "100%" }}>
          {MESSAGES.map((msg, i) => (
            <AnimatePresence key={i}>
              {revealed > i && (
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  style={{
                    fontSize: i === 0
                      ? "clamp(28px, 4.5vw, 52px)"
                      : i === MESSAGES.length - 1
                      ? "clamp(22px, 3.2vw, 38px)"
                      : "clamp(20px, 2.8vw, 32px)",
                    fontWeight: i === 0 ? 900 : i === MESSAGES.length - 1 ? 800 : 600,
                    lineHeight: 1.2,
                    letterSpacing: "-0.025em",
                    color: i === MESSAGES.length - 1 ? "#0066CC" : i === 0 ? "#1D1D1F" : "#444",
                    fontFamily: "var(--font-heebo)",
                    margin: 0,
                  }}
                >
                  {msg}
                </motion.p>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}
        >
          <button
            onClick={handleNext}
            style={{
              background: "#0066CC",
              color: "#fff",
              fontWeight: 800,
              fontSize: "15px",
              padding: "13px 36px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-heebo)",
              boxShadow: "0 6px 20px rgba(0,102,204,0.22)",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#0055AA"}
            onMouseLeave={e => e.currentTarget.style.background = "#0066CC"}
          >
            {revealed < MESSAGES.length ? "המשך" : "ראו איך זה נראה"}
          </button>

          <button
            onClick={scrollToSurvey}
            style={{
              background: "transparent",
              color: "#86868B",
              fontWeight: 500,
              fontSize: "13px",
              padding: "8px 20px",
              borderRadius: "10px",
              border: "1px solid rgba(0,0,0,0.08)",
              cursor: "pointer",
              fontFamily: "var(--font-heebo)",
              transition: "background 0.15s",
            }}
          >
            דלג ישר להטבות
          </button>
        </motion.div>
      </div>
    </section>
  );
}