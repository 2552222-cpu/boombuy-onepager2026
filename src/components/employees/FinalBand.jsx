import React from "react";
import { motion } from "framer-motion";

export default function FinalBand() {
  const scrollToSurvey = () => {
    document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-20 px-4 bg-primary text-primary-foreground">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            מעל 250,000 עובדים כבר מקבלים יותר.
          </h2>
          <p className="text-white/80 mb-8 text-base">
            הגיע הזמן שגם הארגון שלך יצטרף.
          </p>
          <button
            onClick={scrollToSurvey}
            className="bg-white text-primary font-bold text-lg px-10 py-4 rounded-xl hover:bg-white/90 transition-all shadow-lg shadow-black/10"
          >
            15 שניות לבדיקה
          </button>
        </motion.div>
      </div>
    </section>
  );
}