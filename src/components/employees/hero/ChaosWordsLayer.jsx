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
        const converging = videoStarted && videoTime >= w.convergeAt;
        const floating = entered && !converging;
        const fontSize = isMobile ? 28 : w.fontSize;

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
              duration: converging ? 0.4 : 0,
              ease: [0.65, 0, 0.35, 1],
            }}
          >
            <motion.div
              initial={{ opacity: 0, filter: "blur(8px)", scale: 0.72, x: w.ox, y: w.oy, rotate: w.rotate }}
              animate={
                converging
                  ? { opacity: 0, filter: "blur(7px)", scale: 0.14, x: 0, y: 0, rotate: w.rotate }
                  : entered
                  ? { opacity: 1, filter: "blur(0px)", scale: [0.72, 1.06, 1], x: 0, y: 0, rotate: w.rotate }
                  : { opacity: 0, filter: "blur(8px)", scale: 0.72, x: w.ox, y: w.oy, rotate: w.rotate }
              }
              transition={
                converging
                  ? { duration: 0.4, ease: [0.65, 0, 0.35, 1] }
                  : { duration: 0.46, ease: [0.16, 1, 0.3, 1] }
              }
              style={{
                direction: "rtl",
                color: "#FFFFFF",
                fontFamily: "Heebo, Arial, sans-serif",
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.035em",
                whiteSpace: "nowrap",
                fontSize,
                textShadow: "0 4px 18px rgba(0,0,0,0.62), 0 1px 3px rgba(0,0,0,0.42)",
                willChange: "transform, opacity, filter",
              }}
            >
              <motion.div
                animate={floating ? { x: [0, 3, -2, 0], y: [0, -7, 2, 0] } : { x: 0, y: 0 }}
                transition={
                  floating
                    ? { duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }
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