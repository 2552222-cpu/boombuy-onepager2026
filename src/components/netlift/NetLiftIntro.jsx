import React from "react";
import { motion } from "framer-motion";

export default function NetLiftIntro({ onNext }) {
  const handleStart = onNext;
  return (
    <div
      dir="rtl"
      style={{
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
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)",
        width: "600px", height: "400px",
        background: "radial-gradient(ellipse, rgba(0,102,204,0.18) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: "48px", textAlign: "center" }}
      >
        <span style={{ fontSize: "20px", fontWeight: 900, color: "#4A9EFF", letterSpacing: "-0.02em" }}>BoomBuy</span>
      </motion.div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "28px",
          padding: "40px 32px",
          backdropFilter: "blur(20px)",
          textAlign: "center",
          boxShadow: "0 0 60px rgba(0,102,204,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Badge */}
        <div style={{
          display: "inline-block",
          background: "rgba(0,102,204,0.2)",
          border: "1px solid rgba(0,102,204,0.4)",
          borderRadius: "999px",
          padding: "5px 16px",
          marginBottom: "20px",
        }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#4A9EFF", letterSpacing: "0.06em" }}>
            EVI CHECK · Employee Value Index
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: "clamp(28px, 7vw, 40px)",
          fontWeight: 900,
          color: "#fff",
          letterSpacing: "-0.04em",
          lineHeight: 1.1,
          marginBottom: "16px",
        }}>
          NetLift Index
        </h1>

        {/* Subtitle with glow on key words */}
        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, marginBottom: "10px" }}>
          בדיקה מהירה בכמה יגדל
        </p>
        <motion.p
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            fontSize: "clamp(18px, 4.5vw, 22px)",
            fontWeight: 900,
            color: "#4A9EFF",
            marginBottom: "10px",
            letterSpacing: "-0.02em",
            textShadow: "0 0 20px rgba(74,158,255,0.5)",
          }}
        >
          הנטו האפקטיבי שלך
        </motion.p>
        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, marginBottom: "36px" }}>
          מהטבות הרווחה הקיימות
        </p>

        {/* CTA */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleStart}
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
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 0 32px rgba(0,102,204,0.45), 0 4px 16px rgba(0,0,0,0.3)",
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
          תראו לי את זה לפני שאני נרשם ←
        </motion.button>
      </motion.div>
    </div>
  );
}