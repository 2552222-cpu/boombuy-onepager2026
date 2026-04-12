import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  {
    id: 1,
    duration: 2600,
    size: "clamp(32px, 8.5vw, 54px)",
    weight: 900,
    lines: [
      { text: "מה אם העבודה שלך", color: "#1D1D1F", emphasis: false },
      { text: "הייתה נותנת לך יותר?", color: "#1D1D1F", emphasis: false },
    ],
  },
  {
    id: 2,
    duration: 2600,
    size: "clamp(26px, 7vw, 44px)",
    weight: 800,
    lines: [
      { text: "לא רק מתנה בחג", color: "#1D1D1F", emphasis: false },
      { text: "משהו שמרגישים ביומיום", color: "#1D1D1F", emphasis: false },
      { text: "בכל יום מחדש", color: "#0066CC", emphasis: true },
    ],
  },
  {
    id: 3,
    duration: 2800,
    size: "clamp(22px, 6vw, 36px)",
    weight: 700,
    lines: [
      { text: "8% הנחה קבועה בסופר", color: "#0066CC", emphasis: true },
      { text: "אייפון במחיר יבואן", color: "#1D1D1F", emphasis: false },
      { text: "חופשות והופעות לאורך השנה", color: "#1D1D1F", emphasis: false },
    ],
  },
  {
    id: 4,
    duration: 2800,
    size: "clamp(22px, 6vw, 36px)",
    weight: 700,
    lines: [
      { text: "וכל זה בלי שהמעסיק שלך", color: "#1D1D1F", emphasis: false },
      { text: "יוסיף עוד שקל אחד לתקציב", color: "#1D1D1F", emphasis: false },
      { text: "שהוא ממילא מוציא", color: "#1D1D1F", emphasis: false, highlight: "ממילא" },
    ],
  },
  {
    id: 5,
    duration: null, // no auto-advance
    size: "clamp(32px, 8.5vw, 54px)",
    weight: 900,
    lines: [
      { text: "עכשיו תראו", color: "#0066CC", emphasis: true },
      { text: "איך זה נראה", color: "#0066CC", emphasis: true },
    ],
  },
];

export default function IntroSlides({ onDone }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef(0);
  const timerRef = useRef(null);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  const slide = SLIDES[index];
  const isLast = index === SLIDES.length - 1;

  const finish = useCallback(() => {
    if (onDone) onDone();
    requestAnimationFrame(() => {
      document.getElementById("hero-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [onDone]);

  const goNext = useCallback(() => {
    if (index < SLIDES.length - 1) {
      setIndex(p => p + 1);
    } else {
      finish();
    }
  }, [index, finish]);

  const goPrev = useCallback(() => {
    if (index > 0) setIndex(p => p - 1);
  }, [index]);

  // Auto-advance with animated progress bar
  useEffect(() => {
    setProgress(0);
    if (!slide.duration) return;

    cancelAnimationFrame(rafRef.current);
    startRef.current = performance.now();

    const tick = (now) => {
      const elapsed = now - startRef.current;
      const pct = Math.min((elapsed / slide.duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        goNext();
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [index, slide.duration, goNext]);

  // Reset progress on manual navigation
  const handleNext = () => {
    cancelAnimationFrame(rafRef.current);
    goNext();
  };

  const handlePrev = () => {
    cancelAnimationFrame(rafRef.current);
    goPrev();
  };

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext(); else handlePrev();
    }
  };

  const renderLine = (line, li) => {
    let content;
    if (line.highlight) {
      const parts = line.text.split(line.highlight);
      content = (
        <>
          {parts[0]}
          <span style={{ color: "#0066CC", fontWeight: 900 }}>{line.highlight}</span>
          {parts[1]}
        </>
      );
    } else {
      content = line.text;
    }

    return (
      <motion.div
        key={`${slide.id}-${li}`}
        initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, delay: li * 0.14, ease: [0.23, 1, 0.32, 1] }}
        style={{
          fontSize: slide.size,
          fontWeight: slide.weight,
          color: line.color,
          lineHeight: 1.18,
          letterSpacing: "-0.025em",
          fontFamily: "var(--font-heebo)",
          display: "block",
        }}
      >
        {content}
      </motion.div>
    );
  };

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
        top: "18px",
        display: "flex",
        gap: "5px",
        width: "92%",
        maxWidth: "520px",
        zIndex: 20,
      }}>
        {SLIDES.map((s, i) => (
          <div key={i} style={{
            height: "2.5px",
            flex: 1,
            background: "rgba(0,0,0,0.08)",
            borderRadius: "10px",
            overflow: "hidden",
          }}>
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

      {/* Slide content */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "0 24px",
        paddingTop: "88px",
        boxSizing: "border-box",
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            style={{ textAlign: "center", width: "100%", maxWidth: "600px" }}
          >
            {slide.lines.map((line, li) => renderLine(line, li))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom buttons */}
      <div style={{
        width: "100%",
        maxWidth: "280px",
        paddingBottom: "44px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: 10,
        alignItems: "center",
      }}>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleNext}
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