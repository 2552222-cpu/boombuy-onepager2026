import React from "react";
import { motion } from "framer-motion";
import { LAPTOP, WORDS, CoralDot } from "./heroShared";

const wordStyle = (isMobile) => ({
  color: "#fff",
  fontSize: isMobile ? "clamp(22px, 6vw, 26px)" : "clamp(30px, 2.6vw, 36px)",
  fontWeight: 600,
  fontFamily: "var(--font-heebo)",
  textShadow: "0 2px 10px rgba(29,29,31,0.55)",
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  whiteSpace: "nowrap",
});

export default function HeroLabels({ stage, isMobile }) {
  if (stage !== "labels" && stage !== "introTransition") return null;
  const converging = stage === "introTransition";

  return (
    <>
      {WORDS.map((w, i) => (
        <motion.div
          key={w.word}
          initial={{ left: `${w.left}%`, top: `${w.top}%` }}
          animate={
            converging
              ? { left: `${LAPTOP.x}%`, top: `${LAPTOP.y}%` }
              : { left: `${w.left}%`, top: `${w.top}%` }
          }
          transition={
            converging
              ? { duration: 0.45, delay: i * 0.07, ease: "easeIn" }
              : { duration: 0.4, ease: "easeOut" }
          }
          style={{ position: "absolute", zIndex: 4, transform: "translate(-50%, -50%)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={
              converging
                ? { opacity: 0, scale: 0.25, y: 0 }
                : stage === "labels"
                ? { opacity: 1, y: 0, scale: 1 }
                : {}
            }
            transition={
              converging
                ? { duration: 0.45, delay: i * 0.07, ease: "easeIn" }
                : { duration: 0.4, delay: w.delay, ease: [0.22, 1, 0.36, 1] }
            }
            style={wordStyle(isMobile)}
          >
            <CoralDot />
            <span>{w.word}</span>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}