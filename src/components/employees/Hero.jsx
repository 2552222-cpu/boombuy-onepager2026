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
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-secondary/30" style={{ minHeight: "100vh", paddingTop: "80px", overflowX: 'hidden', maxWidth: '100vw' }}>
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">

          {/* TEXT SIDE — only title on mobile */}
          <div className="w-full md:w-1/2 order-1 md:order-none">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col items-center md:items-start text-center md:text-right w-full"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  fontSize: "clamp(32px, 5vw, 72px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.025em",
                  fontWeight: 900,
                  marginBottom: "1.5rem",
                  maxWidth: "710px",
                  textWrap: "balance",
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
                  maxWidth: "540px",
                  fontSize: "clamp(14px, 1.6vw, 20px)",
                  lineHeight: 1.52,
                  marginBottom: "2rem",
                }}
                className="text-muted-foreground hidden md:block"
              >
                עד 8% הנחה קבועה בסופר. מחיר יבואן על Apple. חופשות מסובסדות. הכל כבר כלול בתוך התקציב שהארגון <strong>ממילא</strong> משלם.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 w-full hidden md:flex"
                style={{ marginBottom: "2.5rem" }}
              >
                {chips.map((chip, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 bg-white rounded-full shadow-sm border border-border/60 font-medium"
                    style={{ padding: "6px 12px", fontSize: "12px" }}
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
                transition={{ duration: 0.4, delay: 0.5 }}
                className="flex flex-col items-center md:items-start gap-1.5 w-full md:w-auto hidden md:flex"
              >
                <button
                 onClick={scrollToSurvey}
                 className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 w-full md:w-auto"
                 style={{ fontSize: "clamp(16px, 1.1vw, 18px)", padding: "16px 40px" }}
                >
                  בדוק מה מגיע לך
                </button>
                <span className="text-xs text-muted-foreground">
                  3 שאלות · 15 שניות · בלי הרשמה
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* IMAGE SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2 flex justify-center order-2 md:order-none"
          >
            <div className="relative flex items-center justify-center">
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 420,
                  height: 420,
                  background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
                  filter: "blur(40px)",
                }}
              />
              <div className="relative block" style={{ width: "clamp(280px, 35vw, 520px)" }}>
                <img
                  src={HERO_IMAGE}
                  alt="הטבה יומית אמיתית"
                  className="w-full h-auto block drop-shadow-2xl"
                />
              </div>
            </div>
          </motion.div>

          {/* MOBILE ONLY: Chips and Button below image */}
          <div className="w-full md:hidden order-3">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="flex flex-wrap justify-center gap-2 w-full mb-6"
            >
              {chips.map((chip, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 bg-white rounded-full shadow-sm border border-border/60 font-medium"
                  style={{ padding: "6px 12px", fontSize: "12px" }}
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
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex flex-col items-center gap-1.5 w-full"
            >
              <button
               onClick={scrollToSurvey}
               className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 w-full"
               style={{ fontSize: "clamp(16px, 1.1vw, 18px)", padding: "16px 40px" }}
              >
                בדוק מה מגיע לך
              </button>
              <span className="text-xs text-muted-foreground">
                3 שאלות · 15 שניות · בלי הרשמה
              </span>
            </motion.div>
          </div>
        </div>
          </div>
          </section>
  );
}