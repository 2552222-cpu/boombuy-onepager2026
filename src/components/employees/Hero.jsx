import React from "react";
import { motion } from "framer-motion";

const chips = [
  { emoji: "🛒", label: "סופר ופארם", badge: "8% תמיד" },
  { emoji: "📱", label: "חשמל", badge: "מחיר יבואן" },
  { emoji: "✈️", label: "חופשות", badge: "דילים בלעדיים" },
  { emoji: "⚡", label: "הטבה חדשה כל יום", badge: null },
];

export default function Hero() {
  const scrollToSurvey = () => {
    document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-secondary/40 py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-extrabold leading-tight mb-6"
        >
          יש כסף שמחכה לך{" "}
          <span className="text-primary">בעבודה שלך</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8"
        >
          8% הנחה קבועה בסופר. מחיר יבואן על Apple ו-Samsung. חופשות מסובסדות. הטבה חדשה כל יום.
          הכל כבר כלול בתקציב שמקום העבודה שלך כבר משלם.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10"
        >
          {chips.map((chip, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-border/60 text-sm font-medium"
            >
              <span>{chip.emoji}</span>
              <span>{chip.label}</span>
              {chip.badge && (
                <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                  {chip.badge}
                </span>
              )}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="flex flex-col items-center gap-3"
        >
          <button
            onClick={scrollToSurvey}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-4 rounded-xl shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            בדוק מה מגיע לך
          </button>
          <span className="text-xs text-muted-foreground">
            3 שאלות · 15 שניות · בלי הרשמה
          </span>
        </motion.div>
      </div>
    </section>
  );
}