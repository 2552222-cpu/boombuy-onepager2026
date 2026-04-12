import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  {
    id: 1,
    size: "clamp(32px, 8.5vw, 54px)",
    weight: 900,
    lines: [
      { text: "מה אם העבודה שלך", color: "#1D1D1F" },
      { text: "הייתה נותנת לך יותר?", color: "#1D1D1F" },
    ],
  },
  {
    id: 2,
    size: "clamp(26px, 7vw, 44px)",
    weight: 800,
    lines: [
      { text: "לא רק מתנה בחג", color: "#1D1D1F" },
      { text: "משהו שמרגישים ביומיום", color: "#1D1D1F" },
      { text: "בכל יום מחדש", color: "#0066CC" },
    ],
  },
  {
    id: 3,
    size: "clamp(22px, 6vw, 36px)",
    weight: 700,
    lines: [
      { text: "8% הנחה קבועה בסופר", color: "#0066CC" },
      { text: "אייפון במחיר יבואן", color: "#1D1D1F" },
      { text: "חופשות והופעות לאורך השנה", color: "#1D1D1F" },
    ],
  },
  {
    id: 4,
    size: "clamp(22px, 6vw, 36px)",
    weight: 700,
    lines: [
      { text: "וכל זה בלי שהמעסיק שלך", color: "#1D1D1F" },
      { text: "יוסיף עוד שקל אחד לתקציב", color: "#1D1D1F" },
      { text: "שהוא ממילא מוציא", color: "#1D1D1F", highlight: "ממילא" },
    ],
  },
  {
    id: 5,
    size: "clamp(32px, 8.5vw, 54px)",
    weight: 900,
    lines: [
      { text: "עכשיו תראו", color: "#007AFF" },
      { text: "איך זה נראה", color: "#007AFF" },
    ],
  },
];

export default function IntroSlides({ onDone }) {
  const [index, setIndex] = useState(0);

  // Touch / swipe
  const touchStartX = useRef(null);

  // Mouse / pointer drag (for desktop + preview)
  const pointerStartX = useRef(null);
  const isDragging = useRef(false);

  const isLast = index === SLIDES.length - 1;
  const slide = SLIDES[index];

  const finish = () => {
    if (onDone) onDone();
    requestAnimationFrame(() => {
      document.getElementById("hero-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const goNext = () => {
    if (index < SLIDES.length - 1) setIndex(p => p + 1);
    else finish();
  };

  const goPrev = () => {
    if (index > 0) setIndex(p => p - 1);
  };

  // Touch handlers (mobile swipe)
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goNext(); else goPrev();
    }
  };

  // Pointer/mouse handlers (desktop + preview)
  const handlePointerDown = (e) => {
    if (e.button !== 0) return;
    pointerStartX.current = e.clientX;
    isDragging.current = false;
  };
  const handlePointerMove = (e) => {
    if (pointerStartX.current === null) return;
    if (Math.abs(e.clientX - pointerStartX.current) > 8) isDragging.current = true;
  };
  const handlePointerUp = (e) => {
    if (pointerStartX.current === null) return;
    const diff = pointerStartX.current - e.clientX;
    const wasDrag = isDragging.current;
    pointerStartX.current = null;
    isDragging.current = false;
    if (wasDrag) {
      if (Math.abs(diff) > 40) {
        if (diff > 0) goNext(); else goPrev();
      }
    }
    // plain click on content area (not a drag) → go next
    // buttons handle their own clicks and stop propagation
  };

  const handleContentClick = () => {
    // only fire if it was not a drag
    if (!isDragging.current) goNext();
  };

  const renderLine = (line, li) => {
    let content;
    if (line.highlight) {
      const parts = line.text.split(line.highlight);
      content = (
        <>
          {parts[0]}
          <span style={{ color: "#007AFF", fontWeight: 900 }}>{line.highlight}</span>
          {parts[1]}
        </>
      );
    } else {
      content = line.text;
    }

    return (
      <motion.div
        key={`${slide.id}-${li}`}
        initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.22, delay: li * 0.06, ease: [0.23, 1, 0.32, 1] }}
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
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
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
        userSelect: "none",
        cursor: "default",
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
        {SLIDES.map((_, i) => (
          <div key={i} style={{
            height: "2.5px",
            flex: 1,
            background: i <= index ? "#007AFF" : "rgba(0,0,0,0.08)",
            borderRadius: "10px",
            transition: "background 0.15s",
          }} />
        ))}
      </div>

      {/* Clickable content area */}
      <div
        onClick={handleContentClick}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          padding: "0 24px",
          paddingTop: "88px",
          boxSizing: "border-box",
          cursor: "pointer",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 0.992 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.006 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{ textAlign: "center", width: "100%", maxWidth: "600px" }}
          >
            {slide.lines.map((line, li) => renderLine(line, li))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom buttons — stop propagation so clicks don't trigger content click */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "280px",
          paddingBottom: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          zIndex: 10,
          alignItems: "center",
        }}
      >
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