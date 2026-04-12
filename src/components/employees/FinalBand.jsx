import React from "react";
import { motion } from "framer-motion";

export default function FinalBand() {
  const scrollToCalc = () => {
    document.getElementById("value-calculator")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToSurvey = () => {
    document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-primary text-primary-foreground" style={{ overflowX: "hidden", maxWidth: "100vw", padding: "56px 16px" }}>
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 8, fontWeight: 600 }}>
            רוצים לראות כמה זה יכול להיות שווה לכם אישית?
          </p>
          <h2 style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 900, color: "#fff", marginBottom: 20, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
            בדקו עכשיו כמה זה יכול להיות שווה לכם
          </h2>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={scrollToCalc}
              style={{ background: "#fff", color: "#0055CC", border: "none", padding: "14px 28px", borderRadius: 16, fontSize: 15, fontWeight: 800, cursor: "pointer" }}
            >
              בדקו עכשיו
            </button>
            <button
              onClick={scrollToSurvey}
              style={{ background: "transparent", color: "rgba(255,255,255,0.85)", border: "1.5px solid rgba(255,255,255,0.35)", padding: "14px 28px", borderRadius: 16, fontSize: 15, fontWeight: 700, cursor: "pointer" }}
            >
              לבדוק התאמה לארגון שלי
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}