import React from "react";
import { motion } from "framer-motion";

export default function SurveyGate({ onAdvance }) {
  return (
    <section
      id="survey-gate"
      dir="rtl"
      style={{
        background: "#F0F4FF",
        padding: "72px 16px",
        overflowX: "hidden",
        maxWidth: "100vw",
      }}
    >
      <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <p style={{ fontSize: 13, fontWeight: 700, color: "#0066CC", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 12 }}>
            לפני שממשיכים
          </p>
          <h2 style={{ fontSize: "clamp(22px, 4.5vw, 32px)", fontWeight: 900, color: "#1D1D1F", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 14 }}>
            הכירו את ההטבות שיכולות להגיע לארגון שלכם
          </h2>
          <p style={{ fontSize: 15, color: "#6E6E73", lineHeight: 1.65, marginBottom: 32 }}>
            עכשיו בואו נבדוק האם BoomBuy מתאימה לארגון שלכם
          </p>
          <button
            onClick={() => {
              if (onAdvance) onAdvance();
              setTimeout(() => document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" }), 50);
            }}
            style={{
              display: "inline-block",
              background: "#0066CC",
              color: "#fff",
              fontWeight: 800,
              fontSize: 17,
              padding: "18px 40px",
              borderRadius: 20,
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-heebo)",
              boxShadow: "0 8px 28px rgba(0,102,204,0.28)",
              width: "100%",
              maxWidth: 360,
            }}
          >
            אני מוכן — המשיכו לשאלון ←
          </button>
        </motion.div>
      </div>
    </section>
  );
}