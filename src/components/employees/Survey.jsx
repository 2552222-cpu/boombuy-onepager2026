import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ResultScreen from "./ResultScreen";

const questions = [
  {
    q: "מה ההוצאה שהכי כואבת לך כרגע?",
    options: [
      { emoji: "🛒", label: "קניות בסופר ובפארם" },
      { emoji: "📱", label: "חשמל וגאדג'טים" },
      { emoji: "✈️", label: "חופשות ובילויים" },
      { emoji: "👗", label: "בגדים ומותגים" },
    ],
  },
  {
    q: "אם באותו תקציב היית מקבל גם מתנות לחג וגם הטבות ביומיום - כמה זה היה משנה לך?",
    options: [
      { emoji: "💚", label: "זה היה משנה לי את החודש" },
      { emoji: "🙏", label: "הייתי מרגיש שבאמת דואגים לי" },
      { emoji: "🎯", label: "זה בדיוק מה שחסר פה" },
    ],
  },
  {
    q: "כמה עובדים יש בארגון שלך?",
    options: [
      { emoji: "👤", label: "עד 50 עובדים" },
      { emoji: "👥", label: "50-250 עובדים" },
      { emoji: "🏢", label: "מעל 250 עובדים" },
    ],
  },
];

export default function Survey() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSelect = (option) => {
    const newAnswers = [...answers, option.label];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setDone(true);
      }, 1500);
    }
  };

  const progress = ((step + (done ? 1 : 0)) / questions.length) * 100;

  if (done) {
    return <ResultScreen answers={answers} />;
  }

  return (
    <section id="survey-section" className="py-16 md:py-20 px-4 bg-secondary/30">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-medium">
                שאלה {step + 1} מתוך {questions.length}
              </span>
              <span className="text-xs text-muted-foreground">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full h-2 bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-muted-foreground text-sm">מכין את התוצאה שלך...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">
                  {questions[step].q}
                </h3>
                <div className="space-y-3">
                  {questions[step].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(opt)}
                      className="w-full bg-white border border-border/60 rounded-xl px-5 py-4 text-right flex items-center gap-3 hover:border-primary/40 hover:bg-accent/30 transition-all duration-200 group"
                    >
                      <span className="text-xl">{opt.emoji}</span>
                      <span className="font-medium text-sm md:text-base group-hover:text-primary transition-colors">
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </section>
  );
}