import React from "react";
import { motion } from "framer-motion";
import { CHAOS_WORDS, LAPTOP, CoralDot } from "./heroShared";

const EASE_IN = [0.22, 1, 0.36, 1];
const EASE_OUT = [0.55, 0.02, 0.28, 1];

export default function ChaosWordsLayer({ enteredWords, videoTime, isMobile, reducedMotion, active }) {
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
        const entered = active && !!enteredWords[w.word];
        const exiting = entered && videoTime >= w.convergeAt;
        const fontSize = isMobile ? 20 : "clamp(24px, 2vw, 36px)";
        const rot = w.rotate || 0;
        // 80% of the way toward the laptop — short curved suction
        const tx = w.left + (LAPTOP.x - w.left) * 0.8;
        const ty = w.top + (LAPTOP.y - w.top) * 0.8;

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
              left: exiting && !reducedMotion ? `${tx}%` : `${w.left}%`,
              top: exiting && !reducedMotion ? `${ty}%` : `${w.top}%`,
            }}
            transition={{ duration: exiting && !reducedMotion ? 0.42 : 0, ease: EASE_OUT }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, filter: "blur(5px)", y: 10, rotate: rot }}
              animate={
                reducedMotion
                  ? exiting
                    ? { opacity: 0, rotate: rot }
                    : entered
                    ? { opacity: 1, rotate: rot }
                    : { opacity: 0, rotate: rot }
                  : exiting
                  ? {
                      opacity: 0,
                      scale: 0.18,
                      filter: "blur(5px)",
                      y: [0, -12, 4],
                      rotate: rot + (i % 2 ? 5 : -5),
                    }
                  : entered
                  ? { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, rotate: rot }
                  : { opacity: 0, scale: 0.88, filter: "blur(5px)", y: 10, rotate: rot }
              }
              transition={
                reducedMotion
                  ? { duration: 0.3, ease: "easeInOut" }
                  : exiting
                  ? { duration: 0.42, ease: EASE_OUT }
                  : { duration: 0.26, ease: EASE_IN }
              }
              style={{
                direction: "rtl",
                color: "#FFFFFF",
                fontFamily: "Heebo, Arial, sans-serif",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
                fontSize,
                textShadow: "0 2px 12px rgba(0,0,0,0.35)",
                willChange: "transform, opacity, filter",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                <CoralDot />
                <span>{w.word}</span>
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}