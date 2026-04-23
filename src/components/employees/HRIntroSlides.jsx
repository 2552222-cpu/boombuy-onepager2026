import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  {
    id: 1,
    size: "clamp(30px, 7vw, 52px)",
    weight: 900,
    lines: [
      { text: "200 המעסיקים הגדולים בישראל", color: "#1D1D1F" },
      { text: "כבר נותנים לעובדים שלהם", color: "#1D1D1F" },
      { text: "הרבה יותר ממתנה בחג.", color: "#0055CC" },
    ],
  },
  {
    id: 2,
    size: "clamp(26px, 6.5vw, 48px)",
    weight: 800,
    lines: [
      { text: "הטבות יומיומיות אמיתיות.", color: "#1D1D1F" },
      { text: "שמרגישים בכל חודש.", color: "#0055CC" },
      { text: "לא רק בחגים.", color: "#1D1D1F" },
    ],
  },
  {
    id: 3,
    size: "clamp(26px, 6.5vw, 48px)",
    weight: 800,
    lines: [
      { text: "עכשיו גם הארגון שלך", color: "#1D1D1F" },
      { text: "יכול לתת את זה", color: "#1D1D1F" },
      { text: "בלי תוספת תקציב.", color: "#0055CC" },
    ],
  },
  {
    id: 4,
    size: "clamp(22px, 5.5vw, 40px)",
    weight: 700,
    lines: [
      { text: "בלי לבקש שקל מה-CFO.", color: "#1D1D1F" },
      { text: "בלי תפעול ולוגיסטיקה.", color: "#1D1D1F" },
      { text: "הקרדיט שלך. העבודה שלנו.", color: "#0055CC" },
    ],
  },
  {
    id: 5,
    size: "clamp(32px, 8vw, 58px)",
    weight: 900,
    lines: [
      { text: "רוצה לראות איך?", color: "#0055CC" },
      { text: "15 דקות להדגמת הקסם.", color: "#1D1D1F" },
    ],
  },
];

export default function HRIntroSlides({ onDone }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);
  const pointerStartX = useRef(null);
  const isDragging = useRef(false);

  const isLast = index === SLIDES.length - 1;
  const slide = SLIDES[index];

  const finish = () => {
    if (onDone) onDone();
    setTimeout(() => {
      document.getElementById("demo-form-section")?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  const goNext = () => {
    if (index < SLIDES.length - 1) setIndex(p => p + 1);
    else finish();
  };
  const goPrev = () => { if (index > 0) setIndex(p => p - 1); };

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (Math.abs(diff) > 40) { diff > 0 ? goNext() : goPrev(); }
  };
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
    if (wasDrag && Math.abs(diff) > 40) { diff > 0 ? goNext() : goPrev(); }
  };

  return (
    <section
      onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
      onPointerDown={handlePointerDown} onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        height: "100dvh", width: "100%", position: "relative",
        display: "flex", flexDirection: "column", alignItems: "center",
        overflow: "hidden", touchAction: "manipulation",
        fontFamily: "var(--font-heebo, 'Heebo', 'Assistant', sans-serif)",
        background: "#FFFFFF", userSelect: "none",
        direction: "rtl",
      }}
    >
      {/* Progress bars */}
      <div style={{
        position: "absolute", top: 20,
        display: "flex", gap: 5,
        width: "88%", maxWidth: 520, zIndex: 20,
      }}>
        {SLIDES.map((_, i) => (
          <div key={i} style={{
            height: "2.5px", flex: 1,
            background: i <= index ? "#0055CC" : "rgba(0,0,0,0.08)",
            borderRadius: 10, transition: "background 0.2s",
          }} />
        ))}
      </div>

      {/* Content */}
      <div
        onClick={() => { if (!isDragging.current) goNext(); }}
        style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          width: "100%", padding: "0 28px",
          paddingTop: "80px", paddingBottom: "20px",
          boxSizing: "border-box", cursor: "pointer",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 0.993 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.006 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{ textAlign: "center", width: "100%", maxWidth: 640 }}
          >
            {slide.lines.map((line, li) => (
              <motion.span
                key={`${slide.id}-${li}`}
                initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.24, delay: li * 0.07, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  fontSize: slide.size,
                  fontWeight: slide.weight,
                  color: line.color,
                  lineHeight: 1.25,
                  letterSpacing: "-0.026em",
                  display: "block",
                }}
              >
                {line.text}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Buttons */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 300,
          paddingBottom: 44, paddingTop: 8,
          display: "flex", flexDirection: "column",
          gap: 10, zIndex: 10, alignItems: "center",
        }}
      >
        {isLast ? (
          <>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={e => {
                e.stopPropagation();
                finish();
                setTimeout(() => {
                  document.getElementById("demo-form-section")?.scrollIntoView({ behavior: "smooth" });
                }, 350);
              }}
              style={{
                width: "100%", background: "#0055CC", color: "#fff",
                padding: "14px 24px", borderRadius: 980, fontSize: 16, fontWeight: 800,
                border: "none", cursor: "pointer", fontFamily: "inherit",
                boxShadow: "0 8px 24px rgba(0,85,204,0.3)",
              }}
            >
              בואי נדבר 15 דקות ←
            </motion.button>

            <button
              onClick={e => { e.stopPropagation(); finish(); }}
              style={{
                background: "none", border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: 980, color: "#1D1D1F", fontSize: 14, fontWeight: 600,
                padding: "11px 24px", cursor: "pointer", fontFamily: "inherit", width: "100%",
              }}
            >
              קודם תראי לי איך זה עובד
            </button>
          </>
        ) : (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={e => { e.stopPropagation(); goNext(); }}
            style={{
              width: "100%", background: "#1D1D1F", color: "#fff", padding: "13px 24px",
              borderRadius: 980, fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer",
              fontFamily: "inherit", boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
            }}
          >
            המשך
          </motion.button>
        )}
      </div>
    </section>
  );
}