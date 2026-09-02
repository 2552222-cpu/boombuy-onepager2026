import React from "react";

export const CHARCOAL = "#1D1D1F";
export const CORAL = "#F07858";
export const WARM_WHITE = "#FBFAF8";

export const BEFORE_IMG =
  "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/51841ddbd_1.png";
export const AFTER_IMG =
  "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/28e2e2a8a_.png";
export const VIDEO_SRC =
  "https://media.base44.com/videos/public/69e48538aaee477b09fc7b49/11cdcb0be_boombuy-hero-transformation-CORRECTED.mp4?v=corrected-2";

// Convergence target — laptop / system center
export const LAPTOP = { x: 50, y: 69 };

// enterAt  = seconds from click (word entry)
// convergeAt = seconds of video.currentTime (word suction exit)
// Positions avoid the face, the right-side title, the button and body center.
export const CHAOS_WORDS = [
  { word: "ספקים",  left: 20, top: 60, rotate: -2, enterAt: 0.15, convergeAt: 0.55 },
  { word: "מתנות",  left: 14, top: 80, rotate: 2,  enterAt: 0.27, convergeAt: 0.70 },
  { word: "עובדים",  left: 30, top: 40, rotate: -3, enterAt: 0.39, convergeAt: 0.85 },
  { word: "הקצאות", left: 58, top: 44, rotate: 2,  enterAt: 0.51, convergeAt: 1.00 },
  { word: "שירות",  left: 72, top: 62, rotate: -2, enterAt: 0.63, convergeAt: 1.15 },
  { word: "הטבות",  left: 40, top: 84, rotate: 2,  enterAt: 0.75, convergeAt: 1.30 },
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