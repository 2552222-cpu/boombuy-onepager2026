import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SUPER_OPTIONS = [
  { label: "עד 1,000 ₪ בחודש", monthlySpend: 1000 },
  { label: "1,000–2,000 ₪ בחודש", monthlySpend: 1500 },
  { label: "2,000–3,500 ₪ בחודש", monthlySpend: 2750 },
  { label: "3,500 ₪ ומעלה", monthlySpend: 4000 },
];

const QUESTIONS = [
  {
    id: "q1",
    title: "כמה ההטבות שראית רלוונטיות עבורך?",
    sub: "הערכה כללית של מידת ההתאמה",
    options: [
      { label: "מאוד רלוונטיות", value: "very" },
      { label: "די רלוונטיות", value: "mostly" },
      { label: "קצת רלוונטיות", value: "some" },
      { label: "לא ממש", value: "not" },
    ],
  },
  {
    id: "q2",
    title: "כמה אתם מוציאים בחודש על סופר ומזון?",
    sub: "בסיס לחישוב NetLift Index שלך",
    type: "super",
    options: SUPER_OPTIONS.map((o, i) => ({ label: o.label, value: i })),
  },
  {
    id: "q3",
    title: "באילו תחומים תשתמש בהטבות?",
    sub: "בחרו את הרלוונטיים עבורכם",
    type: "multi",
    options: [
      { label: "סופר ויוקר מחיה", value: "super" },
      { label: "חופשות ונסיעות", value: "vacation" },
      { label: "חשמל ואלקטרוניקה", value: "tech" },
      { label: "תרבות והופעות", value: "culture" },
      { label: "אופנה ומותגים", value: "fashion" },
      { label: "ביטוח רכב", value: "car" },
    ],
  },
  {
    id: "q4",
    title: "מה דעתך על יישום מערכת כזו בארגון?",
    sub: "חשוב לנו להבין את הצורך הארגוני",
    options: [
      { label: "הארגון שלנו חייב פתרון כזה", value: "must" },
      { label: "זה יכול לעזור מאוד", value: "helpful" },
      { label: "מעניין, צריך לבדוק", value: "maybe" },
      { label: "לא בטוח שמתאים עכשיו", value: "notnow" },
    ],
  },
];

function calcNetLift(answers) {
  const superIdx = answers.q2 ?? null;
  if (superIdx === null) return null;
  const categories = answers.q3 || [];

  const superMonthly = Math.round((SUPER_OPTIONS[superIdx]?.monthlySpend ?? 1000) * 0.08);
  const vacationMonthly = categories.includes("vacation") ? Math.round(1200 / 12) : 0;
  const cultureMonthly = categories.includes("culture") ? Math.round(100 * 2 / 12) : 0;
  const techMonthly = categories.includes("tech") ? Math.round(500 / 12) : 0;
  const fashionMonthly = categories.includes("fashion") ? Math.round(250 / 12) : 0;
  const carMonthly = categories.includes("car") ? 80 : 0;

  const monthly = superMonthly + vacationMonthly + cultureMonthly + techMonthly + fashionMonthly + carMonthly;
  const annual = monthly * 12;

  return {
    monthly: Math.max(monthly, 400),
    annual: Math.max(annual, 4800),
    breakdown: {
      super: superMonthly,
      vacation: vacationMonthly,
      culture: cultureMonthly,
      tech: techMonthly,
      fashion: fashionMonthly,
      car: carMonthly,
    },
  };
}

export default function NetLiftSurvey({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [multiSelected, setMultiSelected] = useState([]);

  const current = QUESTIONS[step];

  const handleSingle = (value) => {
    const next = { ...answers, [current.id]: value };
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep(step + 1), 200);
    } else {
      finish(next);
    }
  };

  const toggleMulti = (value) => {
    setMultiSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const confirmMulti = () => {
    const next = { ...answers, [current.id]: multiSelected };
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
      setMultiSelected([]);
    } else {
      finish(next);
    }
  };

  const finish = (finalAnswers) => {
    const result = calcNetLift(finalAnswers);
    if (!result) {
      onComplete(null, finalAnswers);
      return;
    }
    onComplete(result, finalAnswers);
  };

  const progress = ((step) / QUESTIONS.length) * 100;

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
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{
            display: "inline-block",
            background: "rgba(0,102,204,0.08)",
            border: "1px solid rgba(0,102,204,0.2)",
            borderRadius: "999px",
            padding: "4px 14px",
            marginBottom: "14px",
          }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#0066CC" }}>
              NetLift Index Survey · EVI
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", color: "#86868B", fontWeight: 600 }}>שאלה {step + 1} מתוך {QUESTIONS.length}</span>
            <span style={{ fontSize: "12px", color: "#86868B" }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: "4px", background: "rgba(0,0,0,0.08)", borderRadius: "999px", overflow: "hidden" }}>
            <motion.div
              animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
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
            transition={{ duration: 0.28 }}
          >
            <div style={{
              background: "#fff",
              borderRadius: "24px",
              border: "1px solid rgba(0,0,0,0.07)",
              padding: "28px 24px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}>
              <h3 style={{
                fontSize: "clamp(17px, 4vw, 21px)",
                fontWeight: 800,
                color: "#1D1D1F",
                marginBottom: "6px",
                lineHeight: 1.3,
              }}>
                {current.title}
              </h3>
              <p style={{ fontSize: "13px", color: "#86868B", marginBottom: "22px", lineHeight: 1.5 }}>
                {current.sub}
              </p>

              {current.type === "multi" ? (
                <>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
                    {current.options.map((opt) => {
                      const sel = multiSelected.includes(opt.value);
                      return (
                        <button
                          key={opt.value}
                          onClick={() => toggleMulti(opt.value)}
                          style={{
                            background: sel ? "#0066CC" : "#F5F5F7",
                            color: sel ? "#fff" : "#1D1D1F",
                            border: `1.5px solid ${sel ? "#0066CC" : "transparent"}`,
                            borderRadius: "999px",
                            padding: "10px 18px",
                            fontSize: "14px",
                            fontWeight: 700,
                            cursor: "pointer",
                            fontFamily: "var(--font-heebo)",
                            transition: "all 0.15s",
                          }}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={confirmMulti}
                    disabled={multiSelected.length === 0}
                    style={{
                      width: "100%",
                      background: multiSelected.length > 0 ? "#0066CC" : "#C7C7CC",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "15px",
                      padding: "14px",
                      borderRadius: "14px",
                      border: "none",
                      cursor: multiSelected.length > 0 ? "pointer" : "default",
                      fontFamily: "var(--font-heebo)",
                    }}
                  >
                    המשך ←
                  </button>
                </>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {current.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSingle(opt.value)}
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
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Back */}
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            style={{ marginTop: "16px", background: "none", border: "none", color: "#AEAEB2", fontSize: "13px", cursor: "pointer", fontFamily: "var(--font-heebo)" }}
          >
            ← חזרה
          </button>
        )}
      </div>
    </div>
  );
}

export { calcNetLift, SUPER_OPTIONS };