import React from "react";
import { motion } from "framer-motion";
import { CHAOS_WORDS, LAPTOP, CoralDot } from "./heroShared";

export default function ChaosWordsLayer({ enteredWords, videoStarted, videoTime, isMobile }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {CHAOS_WORDS.map((w, i) => {
        const entered = !!enteredWords[w.word];
        const exiting = videoStarted && videoTime >= w.convergeAt;
        const floating = entered && !exiting;
        const fontSize = isMobile ? Math.round(w.fontSize * 0.62) : w.fontSize;
        const maxOpacity = w.opacity ?? 0.85;

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
              left: exiting ? `${w.left + (LAPTOP.x - w.left) * 0.16}%` : `${w.left}%`,
              top: exiting ? `${w.top + (LAPTOP.y - w.top) * 0.16}%` : `${w.top}%`,
            }}
            transition={{ duration: exiting ? 0.7 : 0, ease: [0.45, 0, 0.55, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9, y: 30, rotate: w.rotate }}
              animate={
                exiting
                  ? { opacity: 0, filter: "blur(8px)", scale: 1.12, y: -26, rotate: w.rotate }
                  : entered
                  ? { opacity: maxOpacity, filter: "blur(0px)", scale: 1, y: 0, rotate: w.rotate }
                  : { opacity: 0, filter: "blur(10px)", scale: 0.9, y: 30, rotate: w.rotate }
              }
              transition={
                exiting
                  ? { duration: 0.7, ease: [0.42, 0, 0.58, 1] }
                  : { duration: 0.95, ease: [0.16, 1, 0.3, 1] }
              }
              style={{
                direction: "rtl",
                color: "#FFFFFF",
                fontFamily: "Heebo, Arial, sans-serif",
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
                fontSize,
                textShadow: "0 2px 12px rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.3)",
                willChange: "transform, opacity, filter",
              }}
            >
              <motion.div
                animate={floating ? { y: [0, -6, 2, 0], x: [0, 3, -2, 0] } : { x: 0, y: 0 }}
                transition={
                  floating
                    ? { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }
                    : { duration: 0.3 }
                }
                style={{ display: "inline-flex", alignItems: "center", gap: 10 }}
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