import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  { 
    text: "מה אם העבודה שלך\nהייתה נותנת לך יותר?", 
    size: "clamp(28px, 7vw, 48px)", 
    weight: 800 
  },
  { 
    text: "לא רק מתנה בחג\nמשהו שמרגישים ביומיום", 
    size: "clamp(24px, 6vw, 38px)", 
    weight: 700 
  },
  { 
    text: "8% הנחה קבועה בסופר\nומחירי יבואן על מוצרים\nשאתם בכל מקרה צורכים", 
    size: "clamp(20px, 5.5vw, 32px)", 
    weight: 700 
  },
  { 
    text: "עכשיו תראו איך זה נראה", 
    size: "clamp(26px, 6.5vw, 40px)", 
    weight: 800,
    color: "#007AFF" 
  },
];

export default function IntroSlides({ onDone }) {
  const [index, setIndex] = useState(0);
  const isLast = index === SLIDES.length - 1;

  const finishIntro = () => {
    if (onDone) onDone();
    document.getElementById("offers-slider")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    if (!isLast) {
      setIndex((prev) => prev + 1);
    } else {
      finishIntro();
    }
  };

  const skipToOffers = (e) => {
    e.stopPropagation();
    finishIntro();
  };

  return (
    <section 
      onClick={handleNext}
      style={{
        height: "100dvh",
        width: "100%",
        background: "#fff",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        touchAction: "manipulation",
        fontFamily: "var(--font-heebo)",
      }}
    >
      {/* אינדיקטורים */}
      <div style={{ 
        position: "absolute", top: "25px", display: "flex", gap: "4px", 
        width: "92%", maxWidth: "500px", zIndex: 20 
      }}>
        {SLIDES.map((_, i) => (
          <div key={i} style={{ height: "2px", flex: 1, background: "rgba(0,0,0,0.05)", borderRadius: "10px", overflow: "hidden" }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: i <= index ? "100%" : "0%" }}
              transition={{ duration: 0.4 }}
              style={{ height: "100%", background: i <= index ? "#007AFF" : "transparent" }}
            />
          </div>
        ))}
      </div>

      {/* תוכן מרכזי */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", padding: "0 30px" }}>
        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            style={{
              fontSize: SLIDES[index].size,
              fontWeight: SLIDES[index].weight,
              color: SLIDES[index].color || "#1D1D1F",
              lineHeight: 1.15,
              textAlign: "center",
              margin: 0,
              whiteSpace: "pre-line",
              pointerEvents: "none"
            }}
          >
            {SLIDES[index].text}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* פקדים תחתונים */}
      <div style={{ width: "100%", maxWidth: "260px", paddingBottom: "110px", display: "flex", flexDirection: "column", gap: "10px", zIndex: 10 }}>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleNext}
          style={{
            width: "100%",
            background: isLast ? "#007AFF" : "#1D1D1F",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "980px",
            fontSize: "15px",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-heebo)",
          }}
        >
          {isLast ? "ראו איך זה נראה ←" : "המשך"}
        </motion.button>

        {!isLast && (
          <button 
            onClick={skipToOffers}
            style={{ background: "none", border: "none", color: "#86868B", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-heebo)" }}
          >
            דלג ישר להטבות
          </button>
        )}
      </div>

    </section>
  );
}