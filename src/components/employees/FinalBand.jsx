import React from "react";
import { motion } from "framer-motion";

export default function FinalBand() {
  const scrollToSurvey = () => {
    document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-10 md:py-20 bg-primary text-primary-foreground" style={{ overflowX: 'hidden', maxWidth: '100vw', padding: '60px 16px' }}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg md:text-3xl font-bold mb-2 md:mb-3 leading-tight">
            הגיע הזמן שגם הארגון שלך יצטרף.
          </h2>
          <p className="text-white/80 mb-6 md:mb-8 text-sm md:text-base">
            הגיע הזמן שגם הארגון שלך יצטרף.
          </p>
          <button
            onClick={scrollToSurvey}
            className="bg-white text-primary font-bold px-6 md:px-10 py-3 md:py-4 rounded-lg md:rounded-xl hover:bg-white/90 transition-all shadow-lg shadow-black/10 text-sm md:text-base w-full md:w-auto"
          >
            15 שניות לבדיקה
          </button>
        </motion.div>
      </div>
    </section>
  );
}