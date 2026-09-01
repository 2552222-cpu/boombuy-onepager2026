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

// Convergence target — laptop center (desktop)
export const LAPTOP = { x: 50, y: 69 };

// The six chaos words. First two enter on hero-load; the rest enter by video.currentTime.
// All converge toward LAPTOP by video.currentTime.
export const CHAOS_WORDS = [
  { word: "ספקים",  left: 9,  top: 58, fontSize: 38, rotate: -3, enterAt: 0.45, convergeAt: 1.68 },
  { word: "הקצאות", left: 55, top: 76, fontSize: 34, rotate: 2,  enterAt: 1.05, convergeAt: 1.74 },
  { word: "שירות",  left: 74, top: 58, fontSize: 32, rotate: -2, enterAt: 0.22, convergeAt: 1.80 },
  { word: "מתנות",  left: 25, top: 74, fontSize: 40, rotate: 3,  enterAt: 0.48, convergeAt: 1.86 },
  { word: "עובדים", left: 45, top: 82, fontSize: 36, rotate: -2, enterAt: 0.74, convergeAt: 1.92 },
  { word: "הטבות",  left: 62, top: 20, fontSize: 38, rotate: 2,  enterAt: 1.00, convergeAt: 1.98 },
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