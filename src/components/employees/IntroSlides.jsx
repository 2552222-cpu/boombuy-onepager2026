import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  {
    headline: "מה אם העבודה שלך הייתה נותנת לך יותר?",
    sub: "לא רק מתנה בחג. משהו שמרגישים ביומיום.",
  },
  {
    headline: "לא עוד תו חד-פעמי",
    sub: "מחירי עובדים על דברים שאתם באמת קונים.",
  },
  {
    headline: "Apple, סופר, אופנה, חופשות",
    sub: "הטבות אמיתיות שמגדילות את הנטו.",
  },
  {
    headline: "הכל כבר כלול בתקציב שהארגון ממילא משלם.",
    sub: "פשוט מקבלים יותר.",
    isFinal: true,
  },
];

export default function IntroSlides() {
  const [current, setCurrent] = useState(0);

  const scrollToHero = () => {
    const el = document.getElementById("main-hero");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const advance = () => {
    if (current < SLIDES.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      scrollToHero();
    }
  };

  useEffect(() => {
    const t = setTimeout(advance, 4000);
    return () => clearTimeout(t);
  }, [current]);

  return (
    <section
      onClick={advance}
      style={{
        minHeight: "100svh",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        userSelect: "none",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {/* Slide content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.58, ease: "easeInOut" }}
          style={{
            textAlign: "center",
            padding: "0 28px",
            maxWidth: "740px",
            width: "100%",
          }}
        >
          <p
            style={{
              fontSize: "clamp(13px, 1.2vw, 15px)",
              fontWeight: 600,
              color: "#0066CC",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "20px",
              fontFamily: "var(--font-heebo)",
            }}
          >
            BoomBuy
          </p>
          <h2
            style={{
              fontSize: "clamp(34px, 5.5vw, 68px)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              color: "#1D1D1F",
              marginBottom: "22px",
              fontFamily: "var(--font-heebo)",
            }}
          >
            {SLIDES[current].headline}
          </h2>
          <p
            style={{
              fontSize: "clamp(18px, 2vw, 26px)",
              color: "#86868B",
              fontWeight: 400,
              lineHeight: 1.55,
              fontFamily: "var(--font-heebo)",
            }}
          >
            {SLIDES[current].sub}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: "52px",
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        {SLIDES.map((_, i) => (
          <div
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setCurrent(i);
            }}
            style={{
              width: i === current ? "28px" : "8px",
              height: "8px",
              borderRadius: "999px",
              background: i === current ? "#1D1D1F" : "rgba(0,0,0,0.15)",
              transition: "all 0.35s ease",
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      {/* Skip */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          scrollToHero();
        }}
        style={{
          position: "absolute",
          bottom: "48px",
          left: "28px",
          background: "none",
          border: "none",
          fontSize: "14px",
          color: "#AEAEB2",
          cursor: "pointer",
          fontFamily: "var(--font-heebo)",
          fontWeight: 500,
        }}
      >
        דלג
      </button>

      {/* Slide counter */}
      <p
        style={{
          position: "absolute",
          bottom: "54px",
          right: "28px",
          fontSize: "13px",
          color: "#AEAEB2",
          fontFamily: "var(--font-heebo)",
          fontWeight: 500,
        }}
      >
        {current + 1} / {SLIDES.length}
      </p>
    </section>
  );
}