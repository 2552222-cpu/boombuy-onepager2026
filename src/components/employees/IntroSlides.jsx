import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MESSAGES = [
  { text: "מה אם העבודה שלך\nהייתה נותנת לך יותר", weight: 900, size: "clamp(32px, 5.5vw, 60px)", color: "#1D1D1F" },
  { text: "לא רק מתנה בחג\nמשהו שמרגישים ביומיום", weight: 700, size: "clamp(22px, 3.4vw, 38px)", color: "#3a3a3c" },
  { text: "מחירי יבואן על דברים\nשאתם באמת קונים", weight: 400, size: "clamp(18px, 2.6vw, 28px)", color: "#6e6e73" },
  { text: "עכשיו תראו איך זה נראה", weight: 700, size: "clamp(20px, 3vw, 32px)", color: "#0066CC" },
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
        <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginBottom: "52px", width: "100%" }}>
          {MESSAGES.map((msg, i) => (
            <AnimatePresence key={i}>
              {revealed > i && (
                <motion.p
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.15 }}
                  style={{
                    fontSize: msg.size,
                    fontWeight: msg.weight,
                    lineHeight: 1.18,
                    letterSpacing: "-0.025em",
                    color: msg.color,
                    fontFamily: "var(--font-heebo)",
                    margin: 0,
                    whiteSpace: "pre-line",
                    textShadow: "0 10px 30px rgba(0,0,0,0.04)",
                  }}
                >
                  {msg.text}
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
            onClick={scrollToSlider}
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
          <p style={{ fontSize: "12px", color: "#AAAAAA", fontFamily: "var(--font-heebo)", marginTop: 8 }}>
            250,000+ עובדים כבר נהנים מנטו גבוה יותר
          </p>
        </motion.div>
      </div>
    </section>
  );
}