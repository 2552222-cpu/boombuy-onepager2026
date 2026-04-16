import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const USAGE_OPTIONS = [
  { label: "משתמש באופן קבוע", value: 1.0 },
  { label: "משתמש לעיתים", value: 0.5 },
  { label: "משתמש לעיתים רחוקות", value: 0.2 },
  { label: "לא משתמש בכלל", value: 0 },
];

const QUESTIONS = [
  {
    id: "super",
    title: "האם אתה קונה בסופרמרקט או בפארם?",
    sub: "מזון, מוצרי ניקיון, פארם",
    options: USAGE_OPTIONS,
  },
  {
    id: "tech",
    title: "האם אתה רוכש מוצרי חשמל ואלקטרוניקה?",
    sub: "טלפונים, מחשבים, מכשירי חשמל",
    options: USAGE_OPTIONS,
  },
  {
    id: "general",
    title: "האם אתה קונה ביגוד, הנעלה או מוצרים לבית?",
    sub: "אופנה, כלי בית, צעצועים",
    options: USAGE_OPTIONS,
  },
  {
    id: "leisure",
    title: "האם אתה יוצא לחופשות או בילויים?",
    sub: "טיסות, מלונות, הצגות, קונצרטים",
    options: USAGE_OPTIONS,
  },
  {
    id: "insurance",
    title: "האם יש לך ביטוח רכב או דירה?",
    sub: "ביטוחים שניתן לקבל עליהם הנחה ארגונית",
    options: USAGE_OPTIONS,
  },
];

const CATEGORY_SAVINGS = {
  super: { base: 280, label: "סופר ומזון" },
  tech: { base: 420, label: "חשמל ואלקטרוניקה" },
  general: { base: 180, label: "אופנה וכלי בית" },
  leisure: { base: 350, label: "חופשות ובילויים" },
  insurance: { base: 200, label: "ביטוח" },
};

export function calcNetLift(answers) {
  let monthly = 0;
  const breakdown = {};

  Object.entries(answers).forEach(([key, value]) => {
    if (value > 0 && CATEGORY_SAVINGS[key]) {
      const saving = Math.round(CATEGORY_SAVINGS[key].base * value);
      breakdown[key] = saving;
      monthly += saving;
    }
  });

  if (monthly === 0) return null;
  return { monthly, annual: monthly * 12, breakdown };
}

export default function NetLiftSurvey({ onFinish }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (value) => {
    const current = QUESTIONS[step];
    const next = { ...answers, [current.id]: value };
    setAnswers(next);

    if (step + 1 >= QUESTIONS.length) {
      const result = calcNetLift(next);
      onFinish(result, next);
    } else {
      setTimeout(() => setStep(step + 1), 150);
    }
  };

  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const current = QUESTIONS[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <div dir="rtl" style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "var(--font-heebo)", padding: "32px 20px 80px" }}>
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>

        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "inline-block", background: "rgba(0,102,204,0.08)", border: "1px solid rgba(0,102,204,0.2)", borderRadius: "999px", padding: "4px 14px", marginBottom: "14px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#0066CC" }}>NetLift Index</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", color: "#86868B", fontWeight: 600 }}>שאלה {step + 1} מתוך {QUESTIONS.length}</span>
            <span style={{ fontSize: "12px", color: "#86868B" }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: "4px", background: "rgba(0,0,0,0.08)", borderRadius: "999px", overflow: "hidden" }}>
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
              style={{ height: "100%", background: "#0066CC", borderRadius: "999px" }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div style={{ background: "#fff", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.07)", padding: "28px 24px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontSize: "clamp(17px, 4vw, 21px)", fontWeight: 800, color: "#1D1D1F", marginBottom: "6px", lineHeight: 1.3 }}>
                {current.title}
              </h3>
              <p style={{ fontSize: "13px", color: "#86868B", marginBottom: "22px", lineHeight: 1.5 }}>
                {current.sub}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {current.options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleAnswer(opt.value)}
                    style={{
                      background: "#F5F5F7",
                      border: "1.5px solid transparent",
                      borderRadius: "14px",
                      padding: "14px 18px",
                      textAlign: "right",
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#1D1D1F",
                      cursor: "pointer",
                      fontFamily: "var(--font-heebo)",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#EEF3FF"; e.currentTarget.style.borderColor = "#0066CC"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F5F7"; e.currentTarget.style.borderColor = "transparent"; }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {step > 0 && (
          <button
            onClick={goBack}
            style={{ marginTop: "14px", background: "none", border: "none", color: "#AEAEB2", fontSize: "13px", cursor: "pointer", fontFamily: "var(--font-heebo)" }}
          >
            חזרה
          </button>
        )}
      </div>
    </div>
  );
}