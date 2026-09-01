import React from "react";
import { motion } from "framer-motion";
import { CHAOS_WORDS, LAPTOP, CoralDot } from "./heroShared";

// On mobile show at most 4 words simultaneously.
const MOBILE_WORDS = ["ספקים", "הקצאות", "שירות", "הטבות"];

export default function ChaosWordsLayer({
  w0In,
  w1In,
  forceIn,
  videoStarted,
  videoTime,
  isMobile,
}) {
  const words = isMobile
    ? CHAOS_WORDS.filter((w) => MOBILE_WORDS.includes(w.word))
    : CHAOS_WORDS;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {words.map((w) => {
        const idx = CHAOS_WORDS.findIndex((c) => c.word === w.word);
        const isFirstTwo = idx < 2;
        const entered = isFirstTwo
          ? (idx === 0 ? w0In : w1In) || forceIn
          : videoStarted && videoTime >= w.enterAt;
        const converging = videoStarted && videoTime >= w.convergeAt;
        const floating = entered && !converging;
        const fontSize = isMobile ? 24 : w.fontSize;
        const entryDur = forceIn && isFirstTwo ? 0.18 : 0.48;

        return (
          <motion.div
            key={w.word}
            style={{
              position: "absolute",
              transform: "translate(-50%, -50%)",
              zIndex: 20,
              pointerEvents: "none",
            }}
            initial={{ left: `${w.left}%`, top: `${w.top}%` }}
            animate={{
              left: converging ? `${LAPTOP.x}%` : `${w.left}%`,
              top: converging ? `${LAPTOP.y}%` : `${w.top}%`,
            }}
            transition={{
              duration: converging ? 0.32 : 0,
              ease: [0.65, 0, 0.35, 1],
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.92, filter: "blur(5px)", rotate: w.rotate }}
              animate={
                converging
                  ? { opacity: 0, scale: 0.16, filter: "blur(6px)", y: 0, rotate: w.rotate }
                  : entered
                  ? { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, rotate: w.rotate }
                  : { opacity: 0, y: 18, scale: 0.92, filter: "blur(5px)", rotate: w.rotate }
              }
              transition={
                converging
                  ? { duration: 0.32, ease: [0.65, 0, 0.35, 1] }
                  : { duration: entryDur, ease: [0.22, 1, 0.36, 1] }
              }
              style={{
                direction: "rtl",
                color: "#FFFFFF",
                fontFamily: "Heebo, Arial, sans-serif",
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.025em",
                whiteSpace: "nowrap",
                fontSize,
                textShadow:
                  "0 3px 12px rgba(0,0,0,0.58), 0 1px 2px rgba(0,0,0,0.38)",
                willChange: "transform, opacity, filter",
              }}
            >
              <motion.div
                animate={floating ? { y: [0, -4, 0] } : { y: 0 }}
                transition={
                  floating
                    ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.2 }
                }
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                <CoralDot />
                <span>{w.word}</span>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}