import React from "react";
import { motion } from "framer-motion";

const chips = [
  { emoji: "🛒", label: "סופר ופארם", badge: "8% תמיד" },
  { emoji: "📱", label: "חשמל ואלקטרוניקה", badge: "מחיר יבואן" },
  { emoji: "✈️", label: "חופשות", badge: "הטבות בלעדיות" },
  { emoji: "⚡", label: "הטבה חדשה כל יום", badge: null },
];

const HERO_IMAGE = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/971005d6b_.png";

export default function Hero() {
  const scrollToSurvey = () => {
    document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-secondary/30 py-12 md:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

          {/* TEXT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex flex-col items-center md:items-start text-center md:text-right"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[2.6rem] md:text-[3.4rem] lg:text-[4rem] font-black leading-[1.15] tracking-tight mb-4"
            >
              יש כסף שמחכה לך{" "}
              <span className="text-primary font-black">בעבודה שלך</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-sm mb-6"
            >
              8% הנחה קבועה בסופר. מחיר יבואן על Apple. חופשות מסובסדות.
              הכל כבר כלול בתקציב שמקום העבודה שלך משלם.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="flex flex-wrap justify-center md:justify-start gap-2 mb-7"
            >
              {chips.map((chip, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 shadow-sm border border-border/60 text-sm font-medium"
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
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-col items-center md:items-start gap-2"
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
          </motion.div>

          {/* VISUAL SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 flex flex-col items-center relative"
          >
            <div className="relative">
              {/* Phone mockup frame */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/25 border-4 border-slate-800 bg-slate-900 max-w-[240px] md:max-w-[260px] mx-auto">
                <img
                  src={HERO_IMAGE}
                  alt="הטבה יומית אמיתית"
                  className="w-full h-auto block"
                />
              </div>

              {/* Micro label - top right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="absolute -top-3 -right-4 md:-right-8 bg-white border border-border shadow-md rounded-xl px-3 py-1.5 text-xs font-bold text-foreground whitespace-nowrap"
              >
                💰 מחיר עובדים אמיתי
              </motion.div>

              {/* Micro label - bottom left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.85 }}
                className="absolute -bottom-3 -left-4 md:-left-8 bg-primary text-primary-foreground border border-primary shadow-md rounded-xl px-3 py-1.5 text-xs font-bold whitespace-nowrap"
              >
                ⚡ לא קופון חד פעמי
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}