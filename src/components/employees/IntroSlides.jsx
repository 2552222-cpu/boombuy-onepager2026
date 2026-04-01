import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  { 
    text: "מה אם העבודה שלך\nהייתה נותנת לך יותר?", 
    size: "clamp(30px, 8vw, 52px)", 
    weight: 900 
  },
  { 
    text: "לא רק מתנה בחג\nמשהו שמרגישים ביומיום", 
    size: "clamp(26px, 7vw, 42px)", 
    weight: 700 
  },
  { 
    text: "8% הנחה קבועה בסופר\nומחירי יבואן על מוצרים\nשאתם בכל מקרה צורכים", 
    size: "clamp(22px, 6vw, 36px)", 
    weight: 800 
  },
  { 
    text: "עכשיו תראו איך זה נראה", 
    size: "clamp(28px, 7vw, 44px)", 
    weight: 900,
    color: "#0066CC" 
  },
];

export default function IntroSlides({ onComplete }) {
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
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
        cursor: "pointer",
        padding: "0 20px"
      }}
    >
      {/* לוגו עליון */}
      <div style={{ position: "absolute", top: "50px", fontWeight: 900, color: "#0066CC", letterSpacing: "2px", fontSize: "16px" }}>
        BOOMBUY
      </div>

      {/* אינדיקטור התקדמות */}
      <div style={{ position: "absolute", top: "90px", display: "flex", gap: "6px", width: "90%", maxWidth: "400px" }}>
        {SLIDES.map((_, i) => (
          <div 
            key={i} 
            style={{ 
              height: "3px", 
              flex: 1, 
              background: i <= index ? "#0066CC" : "rgba(0,0,0,0.1)",
              borderRadius: "10px",
              transition: "background 0.3s ease"
            }} 
          />
        ))}
      </div>

      {/* טקסט מרכזי */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            initial={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(15px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, y: -30, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: SLIDES[index].size,
              fontWeight: SLIDES[index].weight,
              color: SLIDES[index].color || "#1D1D1F",
              lineHeight: 1.1,
              margin: 0,
              whiteSpace: "pre-line",
              fontFamily: "var(--font-heebo)",
              pointerEvents: "none"
            }}
          >
            {SLIDES[index].text}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* פקדים תחתונים */}
      <div style={{ width: "100%", maxWidth: "340px", paddingBottom: "140px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleNext}
          style={{
            width: "100%",
            background: isLast ? "#0066CC" : "#1D1D1F",
            color: "#fff",
            padding: "18px",
            borderRadius: "16px",
            fontSize: "18px",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-heebo)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
          }}
        >
          {isLast ? "ראו איך זה נראה ←" : "המשך"}
        </motion.button>

        {!isLast && (
          <button 
            onClick={skipToOffers}
            style={{ background: "none", border: "none", color: "#86868B", fontSize: "15px", fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-heebo)" }}
          >
            דלג ישר להטבות
          </button>
        )}
      </div>

      {/* בר תחתון */}
      <div 
        onClick={(e) => { e.stopPropagation(); document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" }); }}
        style={{
          position: "absolute", bottom: "30px", width: "90%", maxWidth: "400px",
          background: "#0066CC", color: "#fff", padding: "16px",
          borderRadius: "14px", textAlign: "center", fontWeight: 700,
          fontFamily: "var(--font-heebo)", cursor: "pointer", zIndex: 50
        }}
      >
        רוצים לצרף את הארגון? תנו לנו לכוון אתכם
      </div>
    </section>
  );
}