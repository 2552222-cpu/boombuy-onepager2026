import React from "react";

export const CHARCOAL = "#1D1D1F";
export const CORAL = "#F07858";
export const WARM_WHITE = "#FBFAF8";

export const BEFORE_IMG =
  "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/51841ddbd_1.png";
export const AFTER_IMG =
  "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/28e2e2a8a_.png";
export const VIDEO_SRC =
  "https://media.base44.com/videos/public/69e48538aaee477b09fc7b49/fe014e428__23.mp4";

// Convergence target — system / laptop center
export const LAPTOP = { x: 50, y: 69 };

// Entry order: ספקים, מתנות, עובדים, הקצאות, שירות, הטבות
// enterAt = seconds from click; convergeAt = seconds from video.currentTime
// ox/oy = entry direction offset (px)
export const CHAOS_WORDS = [
  { word: "עובדים",    left: 8,  top: 28, fontSize: 44, rotate: -3, opacity: 0.62, enterAt: 0.20, convergeAt: 1.60 },
  { word: "ספקים",     left: 22, top: 58, fontSize: 42, rotate: 2,  opacity: 0.56, enterAt: 0.34, convergeAt: 1.74 },
  { word: "מתנה",     left: 14, top: 80, fontSize: 40, rotate: -2, opacity: 0.50, enterAt: 0.48, convergeAt: 1.86 },
  { word: "יום הולדת", left: 32, top: 16, fontSize: 66, rotate: 1,  opacity: 0.92, enterAt: 0.62, convergeAt: 2.00 },
  { word: "הקצאות",    left: 60, top: 22, fontSize: 44, rotate: -3, opacity: 0.60, enterAt: 0.76, convergeAt: 2.12 },
  { word: "שירות",     left: 76, top: 50, fontSize: 42, rotate: 2,  opacity: 0.55, enterAt: 0.90, convergeAt: 2.24 },
  { word: "רווחה",     left: 82, top: 72, fontSize: 72, rotate: -2, opacity: 0.95, enterAt: 1.04, convergeAt: 2.36 },
  { word: "יום גיבוש",  left: 64, top: 84, fontSize: 58, rotate: 2,  opacity: 0.90, enterAt: 1.18, convergeAt: 2.48 },
];

export function CoralDot() {
  return (
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: CORAL,
        display: "inline-block",
        flexShrink: 0,
      }}
    />
  );
}