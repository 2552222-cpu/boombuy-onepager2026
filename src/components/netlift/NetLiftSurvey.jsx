import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── STANDARDIZED OPTIONS ────────────────────────────────────────────────────
// All frequency/usage questions use unified 4-option UX format
const FREQ_OPTIONS = [
  { label: "משתמש באופן קבוע", value: 1.0 },
  { label: "משתמש לעיתים", value: 0.4 },
  { label: "משתמש לעיתים רחוקות", value: 0.1 },
  { label: "לא רלוונטי לי", value: 0 },
];

const QUESTIONS = [
  {
    id: "super_spend",
    section: "A",
    title: "כמה אתה מוציא בחודש על סופר?",
    sub: "סופר, פארם, מכולת",
    options: [
      { label: "1,000–1,500 ₪", value: 1250 },
      { label: "1,500–2,500 ₪", value: 2000 },
      { label: "2,500–3,500 ₪", value: 3000 },
      { label: "3,500 ₪ ויותר", value: 4000 },
    ],
  },
  {
    id: "super_freq",
    section: "A",
    title: "אם הייתה הנחה קבועה של 8% ברשתות המזון — כמה היית משתמש?",
    sub: "הנחת עובד קבועה על כל קנייה",
    options: FREQ_OPTIONS,
  },
  {
    id: "tech_purchases",
    section: "B",
    title: "אם היו לך מחירי יבואן על מוצרי חשמל — כמה רכישות גדולות בשנה?",
    sub: "iPhone, Samsung, Dyson, מכשירי חשמל גדולים",
    options: [
      { label: "1 בשנה", value: 1 },
      { label: "2–3 בשנה", value: 2.5 },
      { label: "4+ בשנה", value: 5 },
      { label: "לא רלוונטי לי", value: 0 },
    ],
  },
  {
    id: "general_usage",
    section: "C",
    title: "בהטבות כלליות (אופנה, כלי בית, מוצרים יומיומיים) — כמה היית משתמש?",
    sub: "ביגוד, כלי בית, צעצועים, מוצרים יומיומיים",
    options: FREQ_OPTIONS.map((o, i) => ({
      ...o,
      value: [18, 12, 4, 0][i],
    })),
  },
  {
    id: "leisure",
    section: "D",
    title: "הטבות חופשה ובילויים — כמה פעמים בשנה היית מנצל?",
    sub: "חבילות טיסה, מלון, הצגות, קונצרטים, אטרקציות",
    options: [
      { label: "משתמש באופן קבוע (4+)", value: 5 },
      { label: "משתמש לעיתים (2–3)", value: 2.5 },
      { label: "משתמש לעיתים רחוקות (1)", value: 1 },
      { label: "לא רלוונטי לי", value: 0 },
    ],
  },
  {
    id: "car_count",
    section: "E",
    title: "כמה ביטוחי רכב יש בבית?",
    sub: "BoomBuy מציעה הנחות על ביטוח רכב ודירה",
    options: [
      { label: "אין רכב", value: 0 },
      { label: "1 רכב", value: 1 },
      { label: "2 רכבים", value: 2 },
      { label: "3 רכבים ויותר", value: 3 },
    ],
  },
  {
    id: "insurance_interest",
    section: "E",
    title: "האם היית משתמש בהנחה קבועה בביטוח רכב ודירה?",
    sub: "הנחה של כ-10% דרך הסדר ארגוני",
    options: [
      { label: "משתמש באופן קבוע", value: "yes" },
      { label: "משתמש לעיתים", value: "maybe" },
      { label: "משתמש לעיתים רחוקות", value: "unsure" },
      { label: "לא רלוונטי לי", value: "no" },
    ],
  },
];

// ─── CALCULATION ──────────────────────────────────────────────────────────────
export function calcNetLift(answers) {
  let monthly = 0;
  const breakdown = {};

  const superSpend = answers.super_spend ?? null;
  const superFreq = answers.super_freq ?? null;
  if (superSpend !== null && superFreq !== null && superFreq > 0) {
    const saving = Math.round(superSpend * 0.08 * superFreq);
    breakdown.super = saving;
    monthly += saving;
  }

  const tech = answers.tech_purchases ?? null;
  if (tech !== null && tech > 0) {
    const saving = Math.round((tech * 700) / 12);
    breakdown.tech = saving;
    monthly += saving;
  }

  const general = answers.general_usage ?? null;
  if (general !== null && general > 0) {
    const saving = Math.round((general * 90) / 12);
    breakdown.general = saving;
    monthly += saving;
  }

  const leisure = answers.leisure ?? null;
  if (leisure !== null && leisure > 0) {
    const saving = Math.round((leisure * 700) / 12);
    breakdown.leisure = saving;
    monthly += saving;
  }

  const carCount = answers.car_count ?? null;
  const insInterest = answers.insurance_interest ?? null;
  if (carCount !== null && insInterest !== null && carCount > 0 && (insInterest === "yes" || insInterest === "maybe")) {
    const saving = Math.round((carCount * 650) / 12);
    breakdown.insurance = saving;
    monthly += saving;
  }

  if (monthly === 0) return null;
  return { monthly, annual: monthly * 12, breakdown };
}

// ─── ILS (number then ₪) ─────────────────────────────────────────────────────
function ILS({ amount, size = 20 }) {
  return (
    <bdi dir="ltr" style={{ display: "inline-block", whiteSpace: "nowrap", unicodeBidi: "isolate" }}>
      <span style={{ fontSize: size, fontWeight: 900, lineHeight: 1 }}>{Number(amount).toLocaleString("he-IL")}</span>
      <span style={{ fontSize: size * 0.7, fontWeight: 700 }}> ₪</span>
    </bdi>
  );
}

// ─── LIVE PREVIEW BAR ─────────────────────────────────────────────────────────
function LivePreview({ answers }) {
  const partial = calcNetLift(answers);
  if (!partial) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        marginTop: "20px",
        background: "linear-gradient(135deg, #EEF4FF, #F0FFF4)",
        border: "1.5px solid rgba(0,102,204,0.2)",
        borderRadius: "16px",
        padding: "14px 18px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span style={{ fontSize: "12px", color: "#86868B", fontWeight: 600 }}>הערכת חיסכון נוכחית</span>
      <motion.span
        key={partial.monthly}
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{ fontSize: "18px", fontWeight: 900, color: "#0055CC" }}
      >
        <ILS amount={partial.monthly} size={18} /> לחודש
      </motion.span>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function NetLiftSurvey({ onFinish }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const getNextStep = (currentStep, updatedAnswers) => {
    const nextStep = currentStep + 1;
    if (nextStep < QUESTIONS.length) {
      if (QUESTIONS[nextStep].id === "insurance_interest" && updatedAnswers.car_count === 0) {
        return nextStep + 1;
      }
    }
    return nextStep;
  };

  const handleAnswer = (value) => {
    const current = QUESTIONS[step];
    const next = { ...answers, [current.id]: value };
    setAnswers(next);
    const nextStep = getNextStep(step, next);
    if (nextStep >= QUESTIONS.length) {
      onFinish(calcNetLift(next), next);
    } else {
      setTimeout(() => setStep(nextStep), 180);
    }
  };

  const goBack = () => {
    if (step === 0) return;
    let prev = step - 1;
    if (QUESTIONS[prev]?.id === "insurance_interest" && answers.car_count === 0) prev--;
    if (prev >= 0) setStep(prev);
  };

  const current = QUESTIONS[step];
  const sectionColors = { A: "#0066CC", B: "#7C3AED", C: "#059669", D: "#D97706", E: "#DC2626" };
  const sectionLabels = { A: "סופר ומזון", B: "חשמל", C: "הטבות כלליות", D: "חופשות ובילויים", E: "ביטוח" };
  const progress = ((step + 1) / QUESTIONS.length) * 100;
  const color = sectionColors[current.section] || "#0066CC";

  return (
    <div dir="rtl" style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "var(--font-heebo)", padding: "32px 20px 80px" }}>
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>

        {/* Progress header */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <div style={{ display: "inline-block", background: "rgba(0,102,204,0.08)", border: "1px solid rgba(0,102,204,0.2)", borderRadius: "999px", padding: "4px 14px" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#0066CC" }}>NetLift Index · {sectionLabels[current.section]}</span>
            </div>
            <span style={{ fontSize: "12px", color: "#86868B" }}>שאלה {step + 1} / {QUESTIONS.length}</span>
          </div>
          <div style={{ height: "4px", background: "rgba(0,0,0,0.08)", borderRadius: "999px", overflow: "hidden" }}>
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
              style={{ height: "100%", background: color, borderRadius: "999px" }}
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
            transition={{ duration: 0.25 }}
          >
            <div style={{ background: "#fff", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.07)", padding: "28px 24px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <span style={{ background: color + "18", color, fontSize: "11px", fontWeight: 800, padding: "2px 10px", borderRadius: "999px", display: "inline-block", marginBottom: "12px" }}>
                חלק {current.section}
              </span>
              <h3 style={{ fontSize: "clamp(16px, 4vw, 20px)", fontWeight: 800, color: "#1D1D1F", marginBottom: "6px", lineHeight: 1.3 }}>
                {current.title}
              </h3>
              <p style={{ fontSize: "13px", color: "#86868B", marginBottom: "20px", lineHeight: 1.5 }}>
                {current.sub}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {current.options.map((opt) => (
                  <button
                    key={String(opt.value)}
                    onClick={() => handleAnswer(opt.value)}
                    style={{
                      background: "#F5F5F7",
                      border: "1.5px solid transparent",
                      borderRadius: "14px",
                      padding: "15px 18px",
                      textAlign: "right",
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#1D1D1F",
                      cursor: "pointer",
                      fontFamily: "var(--font-heebo)",
                      transition: "all 0.15s",
                      minHeight: "52px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#EEF3FF"; e.currentTarget.style.borderColor = color; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F5F7"; e.currentTarget.style.borderColor = "transparent"; }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Live preview */}
        <LivePreview answers={answers} />

        {/* Back button — always visible, disabled on step 0 */}
        <button
          onClick={goBack}
          disabled={step === 0}
          style={{
            marginTop: "14px",
            background: "none",
            border: "none",
            color: step === 0 ? "#D1D1D6" : "#AEAEB2",
            fontSize: "13px",
            cursor: step === 0 ? "default" : "pointer",
            fontFamily: "var(--font-heebo)",
          }}
        >
          ← חזרה
        </button>
      </div>
    </div>
  );
}