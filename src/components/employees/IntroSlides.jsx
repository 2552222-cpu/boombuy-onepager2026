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

export default function IntroSlides() {
  const [index, setIndex] = useState(0);
  const isLast = index === SLIDES.length - 1;

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    if (!isLast) {
      setIndex((prev) => prev + 1);
    } else {
      document.getElementById("offers-slider")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const skipToOffers = (e) => {
    e.stopPropagation();
    document.getElementById("offers-slider")?.scrollIntoView({ behavior: "smooth" });
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
      {/* לוגו */}
      <div style={{ position: "absolute", top: "45px", zIndex: 20 }}>
        <span style={{ fontWeight: 900, color: "#1D1D1F", fontSize: "18px", letterSpacing: "-0.5px" }}>
          boom<span style={{ color: "#007AFF" }}>buy</span>
        </span>
      </div>

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
      <div style={{ width: "100%", maxWidth: "320px", paddingBottom: "120px", display: "flex", flexDirection: "column", gap: "12px", zIndex: 10 }}>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleNext}
          style={{
            width: "100%",
            background: isLast ? "#007AFF" : "#1D1D1F",
            color: "#fff",
            padding: "16px",
            borderRadius: "14px",
            fontSize: "17px",
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
            style={{ background: "none", border: "none", color: "#86868B", fontSize: "14px", fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-heebo)" }}
          >
            דלג ישר להטבות
          </button>
        )}
      </div>

      {/* בר תחתון */}
      <div 
        onClick={(e) => { e.stopPropagation(); document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" }); }}
        style={{
          position: "absolute", bottom: "30px", width: "88%", maxWidth: "380px",
          background: "#007AFF", color: "#fff", padding: "14px",
          borderRadius: "14px", textAlign: "center", fontWeight: 700, fontSize: "15px",
          boxShadow: "0 8px 20px rgba(0,122,255,0.15)", cursor: "pointer", zIndex: 50,
          fontFamily: "var(--font-heebo)",
        }}
      >
        רוצים לצרף את הארגון? בואו נתחיל
      </div>
    </section>
  );
}