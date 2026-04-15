import React from "react";
import { motion } from "framer-motion";

export default function NetLiftSurveyGate({ onContinue, onNext }) {
  const handleContinue = onNext || onContinue;
  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0a0e1a 0%, #0d1829 50%, #0a1220 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 20px",
        fontFamily: "var(--font-heebo)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div style={{
        position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)",
        width: "500px", height: "300px",
        background: "radial-gradient(ellipse, rgba(0,102,204,0.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "28px",
          padding: "40px 32px",
          backdropFilter: "blur(20px)",
          textAlign: "center",
          boxShadow: "0 0 60px rgba(0,102,204,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ fontSize: "44px", marginBottom: "20px" }}>✓</div>

        <h2 style={{
          fontSize: "clamp(22px, 5vw, 30px)",
          fontWeight: 900,
          color: "#fff",
          letterSpacing: "-0.03em",
          lineHeight: 1.2,
          marginBottom: "14px",
        }}>
          ראיתם את ההטבות?
        </h2>

        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, marginBottom: "10px" }}>
          עכשיו נחשב בכמה
        </p>
        <motion.p
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            fontSize: "20px",
            fontWeight: 900,
            color: "#4A9EFF",
            marginBottom: "10px",
            textShadow: "0 0 18px rgba(74,158,255,0.5)",
          }}
        >
          הנטו האפקטיבי שלך
        </motion.p>
        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", marginBottom: "32px" }}>
          עשוי לגדול דרך מערכת ההטבות
        </p>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleContinue}
          style={{
            width: "100%",
            background: "#0066CC",
            color: "#fff",
            fontWeight: 800,
            fontSize: "17px",
            padding: "18px 24px",
            borderRadius: "18px",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-heebo)",
            boxShadow: "0 0 32px rgba(0,102,204,0.45), 0 4px 16px rgba(0,0,0,0.3)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <motion.span
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          בדקו בכמה הנטו שלי עשוי לגדול ←
        </motion.button>
      </motion.div>
    </div>
  );
}