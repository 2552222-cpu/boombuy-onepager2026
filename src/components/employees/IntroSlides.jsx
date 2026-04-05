import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  {
    lines: ["מה אם העבודה שלך", "הייתה נותנת לך יותר?"],
    size: "clamp(32px, 8.5vw, 54px)",
    weight: 900,
    color: "#1D1D1F",
    highlights: [],
  },
  {
    lines: ["לא רק מתנה בחג", "משהו שמרגישים בכיס", "בכל יום מחדש"],
    size: "clamp(26px, 7vw, 44px)",
    weight: 800,
    color: "#1D1D1F",
    highlights: [],
  },
  {
    lines: ["8% הנחה קבועה בסופר", "ועוד מאות מוצרים והטבות", "על המותגים שאתם בכל מקרה צורכים"],
    size: "clamp(22px, 6vw, 36px)",
    weight: 700,
    color: "#1D1D1F",
    highlights: [],
  },
  {
    lines: ["וכל זה בלי שהמעסיק שלך", "יוסיף עוד שקל אחד לתקציב", "שהוא ממילא מוציא"],
    size: "clamp(22px, 6vw, 36px)",
    weight: 700,
    color: "#1D1D1F",
    highlights: ["ממילא"],
  },
  {
    lines: ["עכשיו תראו", "איך זה נראה"],
    size: "clamp(32px, 8.5vw, 54px)",
    weight: 900,
    color: "#007AFF",
    highlights: [],
  },
];

const DURATION = 6000; // ms per slide

function renderLine(line, highlights, color, size, weight) {
  if (!highlights || highlights.length === 0) {
    return <span>{line}</span>;
  }
  let result = line;
  const parts = [];
  let remaining = line;
  highlights.forEach((word) => {
    const idx = remaining.indexOf(word);
    if (idx === -1) {
      parts.push(<span key={remaining}>{remaining}</span>);
      return;
    }
    if (idx > 0) parts.push(<span key={`pre-${word}`}>{remaining.slice(0, idx)}</span>);
    parts.push(
      <span key={word} style={{ color: "#007AFF" }}>{word}</span>
    );
    remaining = remaining.slice(idx + word.length);
  });
  if (remaining) parts.push(<span key="tail">{remaining}</span>);
  return <>{parts}</>;
}

export default function IntroSlides({ onDone }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const isLast = index === SLIDES.length - 1;

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

  const finish = () => {
    if (onDone) onDone();
    document.getElementById("offers-slider")?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-advance timer
  useEffect(() => {
    setProgress(0);
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (elapsed >= DURATION) {
        clearInterval(intervalRef.current);
        if (index < SLIDES.length - 1) {
          setIndex((p) => p + 1);
        } else {
          finish();
        }
      }
    }, 50);

    return () => clearInterval(intervalRef.current);
  }, [index]);

  // Swipe support
  const touchStartX = useRef(0);
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
        background: "#FBFBFD",
        // Subtle mesh gradient corners
        backgroundImage: `
          radial-gradient(ellipse at 0% 0%, rgba(0,122,255,0.055) 0%, transparent 50%),
          radial-gradient(ellipse at 100% 100%, rgba(0,122,255,0.04) 0%, transparent 50%)
        `,
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
          <div
            key={i}
            style={{
              height: "2.5px",
              flex: 1,
              background: "rgba(0,0,0,0.08)",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                background: "#007AFF",
                borderRadius: "10px",
                width: i < index ? "100%" : i === index ? `${progress}%` : "0%",
              }}
              transition={{ ease: "linear" }}
            />
          </div>
        ))}
      </div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          position: "absolute",
          top: "52px",
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
          background: "rgba(240,246,255,0.92)",
          border: "1px solid rgba(0,102,204,0.18)",
          borderRadius: "999px",
          padding: "6px 16px",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "0 2px 14px rgba(0,102,204,0.09)",
          zIndex: 10,
        }}
      >
        {/* Pulsing green dot */}
        <span style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
          <motion.span
            animate={{ scale: [1, 1.7, 1], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "#34C759",
              display: "block",
            }}
          />
          <span style={{
            position: "absolute",
            inset: "1.5px",
            borderRadius: "50%",
            background: "#34C759",
            display: "block",
          }} />
        </span>
        <span style={{
          fontSize: "12px",
          fontWeight: 600,
          color: "#1D3A6B",
          fontFamily: "var(--font-heebo)",
          whiteSpace: "nowrap",
        }}>
          250,000+ עובדים כבר נהנים מנטו גבוה יותר
        </span>
      </motion.div>

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
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ textAlign: "center" }}
          >
            {slide.lines.map((line, li) => (
              <motion.div
                key={li}
                initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.55,
                  delay: li * 0.18,
                  ease: [0.23, 1, 0.32, 1],
                }}
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
                {renderLine(line, slide.highlights, slide.color, slide.size, slide.weight)}
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
          onClick={(e) => { e.stopPropagation(); goNext(); }}
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
            transition: "background 0.25s",
            letterSpacing: "-0.01em",
          }}
        >
          {isLast ? "ראו איך זה נראה ←" : "המשך"}
        </motion.button>

        {!isLast && (
          <button
            onClick={(e) => { e.stopPropagation(); finish(); }}
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