import React from "react";
import { motion } from "framer-motion";
import { CHARCOAL, CORAL, CoralDot } from "./heroShared";

export default function HeroIdle({ stage, isMobile, onStart }) {
  if (stage !== "idle" && stage !== "labels") return null;

  const fading = stage === "labels";
  const groupFade = { opacity: fading ? 0 : 1, transition: { duration: 0.35, delay: fading ? 0.3 : 0 } };
  const btnFade = { opacity: fading ? 0 : 1, transition: { duration: 0.2 } };

  const gradient = isMobile ?
  "linear-gradient(to top, rgba(29,29,31,0.78) 0%, rgba(29,29,31,0.4) 38%, rgba(29,29,31,0) 72%)" :
  "linear-gradient(to left, rgba(29,29,31,0.75) 0%, rgba(29,29,31,0.45) 32%, rgba(29,29,31,0) 66%)";

  const blockPos = isMobile ?
  { left: "6%", right: "6%", bottom: "5%", top: "auto", transform: "none", maxWidth: "88%" } :
  { left: "67%", right: "6%", top: "42%", transform: "translateY(-50%)", maxWidth: 500 };

  return (
    <>
      {/* right/bottom charcoal gradient only */}
      <motion.div
        animate={groupFade}
        style={{ position: "absolute", inset: 0, background: gradient, zIndex: 2, pointerEvents: "none" }} />
      

      <div
        style={{
          position: "absolute",
          ...blockPos,
          zIndex: 3,
          textAlign: "right",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          fontFamily: "var(--font-heebo)"
        }}>
        
        <motion.div animate={groupFade}>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: isMobile ? 18 : 22,
              fontWeight: 600,
              lineHeight: 1,
              marginBottom: 18,
              textShadow: "0 2px 10px rgba(0,0,0,0.35)",
              display: "flex",
              justifyContent: "flex-end"
            }}>
            
            <span>נראה מוכר?</span>
          </div>
          <h1
            style={{
              fontSize: isMobile ? "clamp(38px, 10vw, 48px)" : "clamp(48px, 4vw, 68px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              margin: 0,
              maxWidth: isMobile ? "100%" : 500,
              textShadow: "0 3px 16px rgba(0,0,0,0.26)",
              textAlign: "right"
            }}>
            
            כמה ידיים צריך
            <br />
            כדי לנהל רווחה<span style={{ color: CORAL, fontSize: "1.7em", fontWeight: 800, lineHeight: 0.82, verticalAlign: "baseline", marginLeft: 4, textShadow: "none" }}>?</span>
          </h1>
        </motion.div>

        <motion.button
          animate={btnFade}
          onClick={onStart}
          style={{
            marginTop: 32,
            background: CHARCOAL,
            color: "#fff",
            border: "none",
            cursor: "pointer",
            width: isMobile ? "88%" : 290,
            height: 68,
            borderRadius: 20,
            fontSize: 18,
            fontWeight: 700,
            fontFamily: "var(--font-heebo)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            boxShadow: "0 8px 22px rgba(0,0,0,0.22)",
            pointerEvents: fading ? "none" : "auto"
          }}>
          
          לראות את השדרוג
          <CoralDot />
        </motion.button>
      </div>
    </>);

}