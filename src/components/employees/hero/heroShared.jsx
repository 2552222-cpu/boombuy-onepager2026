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
  { word: "עובדים",   left: 7,  top: 55, fontSize: 54, rotate: -4, enterAt: 0.15, convergeAt: 0.55, ox: -72, oy: 0 },
  { word: "ספקים",    left: 15, top: 25, fontSize: 48, rotate: 3,  enterAt: 0.27, convergeAt: 0.70, ox: -60, oy: -55 },
  { word: "מתנה",    left: 29, top: 81, fontSize: 50, rotate: -2, enterAt: 0.39, convergeAt: 0.85, ox: 0, oy: 78 },
  { word: "יום הולדת", left: 48, top: 77, fontSize: 38, rotate: 3,  enterAt: 0.51, convergeAt: 1.00, ox: 0, oy: 78 },
  { word: "הקצאות",   left: 61, top: 57, fontSize: 48, rotate: -3, enterAt: 0.63, convergeAt: 1.15, ox: 72, oy: 0 },
  { word: "שירות",    left: 70, top: 76, fontSize: 54, rotate: 2,  enterAt: 0.75, convergeAt: 1.30, ox: 65, oy: 55 },
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