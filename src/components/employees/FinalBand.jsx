import React from "react";
import { motion } from "framer-motion";

export default function FinalBand() {
  const scrollToSurvey = () => {
    document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-primary text-primary-foreground" style={{ overflowX: "hidden", maxWidth: "100vw", padding: "48px 16px" }}>
      <div className="max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <h2 style={{ fontSize: "clamp(18px, 3.5vw, 24px)", fontWeight: 900, color: "#fff", marginBottom: 20, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
            רוצים להכניס את בום ביי לארגון שלכם?
          </h2>
          <button
            onClick={scrollToSurvey}
            style={{ background: "#fff", color: "#0055CC", border: "none", padding: "14px 32px", borderRadius: 16, fontSize: 15, fontWeight: 800, cursor: "pointer" }}
          >
            לבדוק התאמה לארגון שלי
          </button>
        </motion.div>
      </div>
    </section>
  );
}