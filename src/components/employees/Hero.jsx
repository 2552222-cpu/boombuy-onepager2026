import React from "react";
import { motion } from "framer-motion";

const chips = [
  { emoji: "🛒", label: "פארם, סופר ויוקר המחיה", badge: "עד 8% הנחה קבועה" },
  { emoji: "📱", label: "חשמל ואלקטרוניקה", badge: "מחיר יבואן" },
  { emoji: "✈️", label: "חופשות", badge: "מחירים בלעדיים" },
  { emoji: "⚡", label: "הטבה חדשה כל יום", badge: null },
  { emoji: "🎁", label: "הטבות בלעדיות", badge: null },
];

const HERO_IMAGE = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/de2fe051d_1.png";

export default function Hero() {
  const scrollToSurvey = () => {
    document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-secondary/30 py-10 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-8">

          {/* TEXT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex flex-col items-center md:items-start text-center md:text-right"
            style={{ maxWidth: 620 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: "clamp(3rem, 8vw, 6.2rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                fontWeight: 900,
                marginBottom: "0.9rem",
              }}
            >
              יש כסף שמחכה לך{" "}
              <span className="text-primary">בעבודה שלך</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{
                maxWidth: 380,
                fontSize: "1.05rem",
                lineHeight: 1.65,
                marginBottom: "1.25rem",
              }}
              className="text-muted-foreground"
            >
              עד 8% הנחה קבועה בסופר. מחיר יבואן על Apple. חופשות מסובסדות.
              הכל כבר כלול בתוך התקציב שהארגון <strong>ממילא</strong> משלם.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="flex flex-wrap justify-center md:justify-start gap-2"
              style={{ marginBottom: "1.25rem" }}
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
              className="flex flex-col items-center md:items-start gap-1.5"
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
            className="flex-1 flex items-center justify-center relative"
          >
            <div className="relative flex items-center justify-center">
              {/* Soft ambient glow */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 440,
                  height: 440,
                  background: "radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 68%)",
                  filter: "blur(32px)",
                }}
              />

              <div
                className="relative"
                style={{ width: "clamp(270px, 30vw, 440px)" }}
              >
                <img
                  src={HERO_IMAGE}
                  alt="הטבה יומית אמיתית"
                  className="w-full h-auto block drop-shadow-2xl"
                />
              </div>

              {/* Single micro label */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.75 }}
                className="absolute -top-3 -right-2 md:-right-5 bg-white border border-border shadow-md rounded-xl px-3 py-1.5 text-xs font-bold text-foreground whitespace-nowrap"
              >
                💰 הטבה יומית אמיתית
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}