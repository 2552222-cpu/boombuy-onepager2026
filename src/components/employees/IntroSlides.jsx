import React from "react";
import { motion } from "framer-motion";

const MESSAGES = [
  "מה אם העבודה שלך הייתה נותנת לך יותר?",
  "לא רק מתנה בחג. משהו שמרגישים ביומיום.",
  "מחירי עובדים על דברים שאתם באמת קונים.",
  "Apple, סופר, אופנה, חופשות — הטבות אמיתיות שמגדילות את הנטו.",
];

export default function IntroSlides() {
  const scrollDown = () => {
    document.getElementById("main-hero")?.scrollIntoView({ behavior: "smooth" });
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
            marginBottom: "36px",
            fontFamily: "var(--font-heebo)",
          }}
        >
          BoomBuy
        </motion.p>

        {/* Messages */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginBottom: "48px" }}>
          {MESSAGES.map((msg, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
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
          ))}
        </div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          onClick={scrollDown}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            padding: "0",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#86868B",
              fontFamily: "var(--font-heebo)",
            }}
          >
            גללו ותראו איך זה נראה בפועל
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontSize: "20px", lineHeight: 1 }}
          >
            ↓
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}