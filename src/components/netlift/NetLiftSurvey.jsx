import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Fixed question schema ────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: "super_spend",
    title: "כמה אתה מוציא על סופר בחודש?",
    sub: null,
    options: [
      { label: "2,000–3,000 ₪", value: 160 },
      { label: "3,000–5,000 ₪", value: 280 },
      { label: "5,000–8,000 ₪", value: 440 },
      { label: "8,000+ ₪", value: 620 },
    ],
  },
  {
    id: "super_discount",
    title: "אם הייתה הנחה קבועה של 8% ברשתות דיסקאונט מוזלות, היית משתמש בה?",
    sub: null,
    options: [
      { label: "כן כל שבוע", value: 1.0 },
      { label: "פעם בשבועיים", value: 0.6 },
      { label: "פעם בחודש", value: 0.3 },
      { label: "לא רלוונטי לי", value: 0 },
    ],
  },
  {
    id: "tech",
    title: "כמה רכישות גדולות של חשמל ואלקטרוניקה בשנה?",
    sub: null,
    options: [
      { label: "0", value: 0 },
      { label: "1", value: 1 },
      { label: "2–3", value: 2.5 },
      { label: "4+", value: 4 },
    ],
  },
  {
    id: "general",
    title: "באיזו תדירות היית משתמש בהטבות כלליות (אופנה, בית, צעצועים וכו׳)?",
    sub: null,
    options: [
      { label: "כל שבוע", value: 1.0 },
      { label: "2–3 פעמים בחודש", value: 0.65 },
      { label: "פעם בחודש", value: 0.3 },
      { label: "כמעט לא", value: 0.05 },
    ],
  },
  {
    id: "insurance_count",
    title: "כמה ביטוחים יש בבית (רכב + דירה)?",
    sub: null,
    options: [
      { label: "0", value: 0 },
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3+", value: 3 },
    ],
  },
  {
    id: "insurance_use",
    title: "אם הייתה הנחה קבועה על ביטוח רכב ודירה - היית משתמש?",
    sub: null,
    options: [
      { label: "כן", value: 1.0 },
      { label: "אולי", value: 0.5 },
      { label: "לא", value: 0 },
    ],
  },
];

// ── Scoring: fixed numeric weights per answer ────────────────────────────────
export function calcNetLift(answers) {
  // Super: spend * discount multiplier * 8%
  const spendBase = answers.super_spend ?? 0;
  const discountMult = answers.super_discount ?? 0;
  const superSaving = Math.round(spendBase * discountMult * 0.08);

  // Tech: count * avg saving per purchase (350 ₪ avg)
  const techCount = answers.tech ?? 0;
  const techSaving = Math.round((techCount * 350) / 12);

  // General benefits: base 180 * usage multiplier
  const generalMult = answers.general ?? 0;
  const generalSaving = Math.round(180 * generalMult);

  // Insurance: count * usage * 80 ₪/month avg saving per policy
  const insCount = answers.insurance_count ?? 0;
  const insUse = answers.insurance_use ?? 0;
  const insuranceSaving = Math.round(insCount * insUse * 80);

  const breakdown = {
    super: superSaving,
    tech: techSaving,
    general: generalSaving,
    insurance: insuranceSaving,
  };

  const monthly = superSaving + techSaving + generalSaving + insuranceSaving;

  // Always return a result - show all categories even if zero
  return { monthly, annual: monthly * 12, breakdown };
}

// ── Survey component ─────────────────────────────────────────────────────────
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
      setTimeout(() => setStep(step + 1), 120);
    }
  };

  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const current = QUESTIONS[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#F5F5F7",
        fontFamily: "var(--font-heebo)",
        padding: "32px 20px 80px",
      }}
    >
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>

        {/* Header + progress */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{
            display: "inline-block",
            background: "rgba(0,102,204,0.08)",
            border: "1px solid rgba(0,102,204,0.2)",
            borderRadius: "999px",
            padding: "4px 14px",
            marginBottom: "14px",
          }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#0066CC" }}>NetLift Index</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", color: "#86868B", fontWeight: 600 }}>
              שאלה {step + 1} מתוך {QUESTIONS.length}
            </span>
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

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22 }}
          >
            <div style={{
              background: "#fff",
              borderRadius: "24px",
              border: "1px solid rgba(0,0,0,0.07)",
              padding: "28px 24px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}>
              <h3 style={{
                fontSize: "clamp(16px, 4vw, 20px)",
                fontWeight: 800,
                color: "#1D1D1F",
                marginBottom: current.sub ? "6px" : "22px",
                lineHeight: 1.35,
              }}>
                {current.title}
              </h3>
              {current.sub && (
                <p style={{ fontSize: "13px", color: "#86868B", marginBottom: "20px", lineHeight: 1.5 }}>
                  {current.sub}
                </p>
              )}
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
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#EEF3FF";
                      e.currentTarget.style.borderColor = "#0066CC";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#F5F5F7";
                      e.currentTarget.style.borderColor = "transparent";
                    }}
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
            style={{
              marginTop: "14px",
              background: "none",
              border: "none",
              color: "#AEAEB2",
              fontSize: "13px",
              cursor: "pointer",
              fontFamily: "var(--font-heebo)",
            }}
          >
            חזרה
          </button>
        )}
      </div>
    </div>
  );
}