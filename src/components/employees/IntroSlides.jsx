import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const POWER_WORDS = ["נטו", "חיסכון", "כסף"];

const SLIDES = [
  {
    id: 1,
    lines: ["מה אם העבודה שלך", "הייתה נותנת לך יותר?"],
    size: "clamp(32px, 8.5vw, 54px)",
    weight: 900,
    color: "#1D1D1F",
    highlight: null,
  },
  {
    id: 2,
    lines: ["לא רק מתנה בחג", "משהו שמרגישים ביומיום", "בכל יום מחדש"],
    size: "clamp(26px, 7vw, 44px)",
    weight: 800,
    color: "#1D1D1F",
    highlight: null,
  },
  {
    id: 3,
    lines: ["8% הנחה קבועה בסופר", "אייפון במחיר יבואן", "חופשות והופעות לאורך השנה"],
    size: "clamp(22px, 6vw, 36px)",
    weight: 700,
    color: "#1D1D1F",
    highlight: null,
  },
  {
    id: 4,
    lines: ["וכל זה בלי שהמעסיק שלך", "יוסיף עוד שקל אחד לתקציב", "שהוא ממילא מוציא"],
    size: "clamp(22px, 6vw, 36px)",
    weight: 700,
    color: "#1D1D1F",
    highlight: "ממילא",
    highlightColor: "#007AFF",
  },
  {
    id: 5,
    lines: ["עכשיו תראו", "איך זה נראה"],
    size: "clamp(32px, 8.5vw, 54px)",
    weight: 900,
    color: "#007AFF",
    highlight: null,
  },
];

function highlightPowerWords(text) {
  const regex = new RegExp(`(${POWER_WORDS.join("|")})`, "g");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    POWER_WORDS.includes(part)
      ? <span key={i} style={{ color: "#0066CC", fontWeight: 900 }}>{part}</span>
      : part
  );
}

function LineText({ line, highlight, highlightColor, color, size, weight }) {
  if (highlight && line.includes(highlight)) {
    const parts = line.split(highlight);
    return (
      <>
        {parts[0]}
        <span style={{ color: highlightColor, fontWeight: weight }}>{highlight}</span>
        {parts[1]}
      </>
    );
  }
  return <span>{highlightPowerWords(line)}</span>;
}

export default function IntroSlides({ onDone }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const touchStartX = useRef(0);

  const isLast = index === SLIDES.length - 1;

  const finish = () => {
    if (onDone) onDone();
    requestAnimationFrame(() => {
      document.getElementById("hero-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const goNext = () => {
    if (index < SLIDES.length - 1) {
      setIndex((p) => p + 1);
    } else {
      finish();
    }
  };

  const goPrev = () => {
    if (index > 0) setIndex((p) => p - 1);
  };

  useEffect(() => {
    setProgress(0);
    return () => {};
  }, [index]);

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goNext(); else goPrev();
    }
  };

  const slide = SLIDES[index];

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        height: "100dvh",
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        touchAction: "manipulation",
        fontFamily: "var(--font-heebo)",
        background: "#FFFFFF",
      }}
    >
      {/* Progress bars */}
      <div style={{
        position: "absolute",
        top: "22px",
        display: "flex",
        gap: "5px",
        width: "92%",
        maxWidth: "520px",
        zIndex: 20,
      }}>
        {SLIDES.map((_, i) => (
          <div key={i} style={{
            height: "2.5px",
            flex: 1,
            background: "rgba(0,0,0,0.08)",
            borderRadius: "10px",
            overflow: "hidden",
          }}>
            <div style={{
              height: "100%",
              background: "#007AFF",
              borderRadius: "10px",
              width: i < index ? "100%" : i === index ? `${progress}%` : "0%",
              transition: i === index ? "none" : "none",
            }} />
          </div>
        ))}
      </div>

      {/* Slide content */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "0 28px",
        paddingTop: "100px",
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ textAlign: "center" }}
          >
            {slide.lines.map((line, li) => (
              <motion.div
                key={li}
                initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.55, delay: li * 0.18, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  fontSize: slide.size,
                  fontWeight: slide.weight,
                  color: slide.color,
                  lineHeight: 1.18,
                  fontFamily: "var(--font-heebo)",
                  display: "block",
                  letterSpacing: "-0.025em",
                }}
              >
                <LineText
                  line={line}
                  highlight={slide.highlight}
                  highlightColor={slide.highlightColor}
                  color={slide.color}
                  size={slide.size}
                  weight={slide.weight}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom buttons */}
      <div style={{
        width: "100%",
        maxWidth: "280px",
        paddingBottom: "52px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: 10,
        alignItems: "center",
      }}>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={goNext}
          style={{
            width: "100%",
            background: isLast ? "#007AFF" : "#1D1D1F",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "980px",
            fontSize: "14px",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-heebo)",
            boxShadow: isLast ? "0 8px 24px rgba(0,122,255,0.28)" : "0 4px 14px rgba(0,0,0,0.18)",
            letterSpacing: "-0.01em",
          }}
        >
          {isLast ? "ראו איך זה נראה ←" : "המשך"}
        </motion.button>

        {!isLast && (
          <button
            onClick={finish}
            style={{
              background: "none",
              border: "none",
              color: "#AEAEB2",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "var(--font-heebo)",
            }}
          >
            דלג ישר להטבות
          </button>
        )}
      </div>
    </section>
  );
}