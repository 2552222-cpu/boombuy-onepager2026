import React from "react";
import { motion } from "framer-motion";

export const CHARCOAL = "#1D1D1F";
export const CORAL = "#F26847";
export const WARM_WHITE = "#FBFAF8";

export const BEFORE_IMG =
  "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/f2a441019_START-FRAME2.png";
export const AFTER_IMG =
  "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/0a0298c58_END-FRAME-CORRECTED2.png";
export const VIDEO_SRC =
  "https://media.base44.com/videos/public/69e48538aaee477b09fc7b49/fe014e428__23.mp4";

export const LAPTOP = { x: 42, y: 64 };

export const WORDS = [
  { word: "ספקים",  left: 20, top: 68, delay: 0.35 },
  { word: "מתנות",  left: 34, top: 61, delay: 0.65 },
  { word: "אירועים", left: 47, top: 70, delay: 0.95 },
  { word: "הטבות",  left: 62, top: 62, delay: 1.25 },
  { word: "עובדים", left: 27, top: 82, delay: 1.55 },
  { word: "אקסלים", left: 44, top: 85, delay: 1.85 },
  { word: "תקלות",  left: 61, top: 81, delay: 2.15 },
];

export function CoralDot() {
  return (
    <span
      style={{
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: CORAL,
        display: "inline-block",
        flexShrink: 0,
      }}
    />
  );
}

// ---- Approved end screen (unchanged) ----

export function AfterHeadline({ stage, isMobile }) {
  const underlineWidth = isMobile ? 120 : 180;
  return (
    <h1
      style={{
        fontSize: isMobile ? "clamp(40px, 11vw, 46px)" : "clamp(52px, 5.8vw, 72px)",
        fontWeight: 700,
        color: "#fff",
        lineHeight: 1.06,
        letterSpacing: "-0.02em",
        margin: "0 0 24px",
        maxWidth: isMobile ? "100%" : 620,
        fontFamily: "var(--font-heebo)",
        textAlign: "right",
      }}
    >
      <span style={{ display: "block", overflow: "hidden" }}>
        <motion.span
          initial={{ y: "110%", opacity: 0 }}
          animate={stage >= 1 ? { y: "0%", opacity: 1 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "block" }}
        >
          התקציב עובד יותר.
        </motion.span>
      </span>
      <span style={{ display: "block", overflow: "hidden", marginTop: 4 }}>
        <motion.span
          initial={{ y: "110%", opacity: 0 }}
          animate={stage >= 2 ? { y: "0%", opacity: 1 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "block", fontWeight: 800, position: "relative", paddingBottom: 8 }}
        >
          את פחות.
          <motion.span
            initial={{ scaleX: 0 }}
            animate={stage >= 2 ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              height: 2.5,
              width: underlineWidth,
              background: CORAL,
              borderRadius: 2,
              transformOrigin: "right center",
              opacity: 0.85,
            }}
          />
        </motion.span>
      </span>
    </h1>
  );
}

export function AfterContent({ stage, phase, onContinue, isMobile }) {
  return (
    <div style={{ textAlign: "right" }}>
      <AfterHeadline stage={stage} isMobile={isMobile} />
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={phase === "after" ? { opacity: 0.85, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        style={{
          fontSize: "clamp(19px, 1.9vw, 22px)",
          color: "rgba(255,255,255,0.85)",
          lineHeight: 1.55,
          margin: "0 0 28px",
          maxWidth: 520,
          fontWeight: 400,
          fontFamily: "var(--font-heebo)",
        }}
      >
        בום ביי מרכזת את הרווחה, המתנות, ההטבות והשירות לעובדים במערכת אחת.
      </motion.p>
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={phase === "after" ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
        whileHover={{ y: -2, boxShadow: "0 14px 28px rgba(0,0,0,0.22)" }}
        onClick={onContinue}
        style={{
          background: "#FFFFFF",
          color: CHARCOAL,
          border: "none",
          cursor: "pointer",
          width: "fit-content",
          maxWidth: 330,
          height: 56,
          padding: "0 26px",
          borderRadius: 16,
          fontSize: 18,
          fontWeight: 800,
          fontFamily: "var(--font-heebo)",
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          boxShadow: "0 6px 18px rgba(0,0,0,0.16)",
          marginLeft: "auto",
        }}
      >
        ומה העובדים מרגישים?
        <CoralDot />
      </motion.button>
    </div>
  );
}