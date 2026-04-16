import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── QUESTIONS ────────────────────────────────────────────────────────────────
const QUESTIONS = [
  // A — סופר
  {
    id: "super_spend",
    section: "A",
    title: "כמה אתה מוציא בחודש על סופר?",
    sub: "סופר, פארם, מכולת",
    options: [
      { label: "עד 1,000 ₪", value: 1000 },
      { label: "1,000–2,000 ₪", value: 1500 },
      { label: "2,000–3,500 ₪", value: 2750 },
      { label: "3,500 ₪ ומעלה", value: 4000 },
    ],
  },
  {
    id: "super_freq",
    section: "A",
    title: "אם הייתה הנחה קבועה של 8% בסופר, כמה פעמים בשבוע היית מנצל?",
    sub: "הנחת עובד קבועה על כל קנייה",
    options: [
      { label: "פעם 2 בשבוע ויותר", value: 2 },
      { label: "1–2 בחודש", value: 0.5 },
      { label: "2–3 בשנה", value: 0.05 },
      { label: "לא משתמש", value: 0 },
    ],
  },
  // B — חשמל
  {
    id: "tech_purchases",
    section: "B",
    title: "אם היו מחירי יבואן על חשמל ואלקטרוניקה, כמה רכישות גדולות בשנה?",
    sub: "iPhone, Samsung, Dyson, מכשירי חשמל גדולים",
    options: [
      { label: "1 בשנה", value: 1 },
      { label: "2–3 בשנה", value: 2.5 },
      { label: "4 ומעלה", value: 5 },
      { label: "לא משתמש", value: 0 },
    ],
  },
  // C — הטבות כלליות
  {
    id: "general_usage",
    section: "C",
    title: "בהטבות כלליות (אופנה, כלי בית, מוצרים יומיומיים), כמה היית משתמש בשנה?",
    sub: "ביגוד, כלי בית, צעצועים, מוצרים יומיומיים",
    options: [
      { label: "פעם בחודש ויותר", value: 12 },
      { label: "כמה פעמים בשנה", value: 4 },
      { label: "פעם בשנה", value: 1 },
      { label: "לא משתמש", value: 0 },
    ],
  },
  // D — חופשות
  {
    id: "vacations",
    section: "D",
    title: "כמה חופשות בשנה?",
    sub: "חבילות טיסה, מלון, אירוח בארץ ובחו\"ל",
    options: [
      { label: "3 ומעלה", value: 3 },
      { label: "2 בשנה", value: 2 },
      { label: "אחת בשנה", value: 1 },
      { label: "לא נוסע", value: 0 },
    ],
  },
  {
    id: "shows",
    section: "D",
    title: "כמה הופעות / בילויים בשנה?",
    sub: "הצגות, קונצרטים, פארקי שעשועים, אטרקציות",
    options: [
      { label: "10 ומעלה", value: 10 },
      { label: "4–9 בשנה", value: 6 },
      { label: "1–3 בשנה", value: 2 },
      { label: "לא משתמש", value: 0 },
    ],
  },
  // E — ביטוח
  {
    id: "car_count",
    section: "E",
    title: "כמה ביטוחי רכב יש בבית?",
    sub: "BoomBuy מציעה הנחות על ביטוח רכב ודירה",
    options: [
      { label: "אין רכב", value: 0 },
      { label: "1 רכב", value: 1 },
      { label: "2 רכבים", value: 2 },
      { label: "3 רכבים", value: 3 },
      { label: "4+", value: 4 },
    ],
  },
  {
    id: "insurance_interest",
    section: "E",
    title: "אם הייתה לך הנחה קבועה על ביטוח רכב ודירה, היית משתמש?",
    sub: "הנחה של כ-10% דרך הסדר ארגוני",
    options: [
      { label: "כן, בוודאי", value: "yes" },
      { label: "אולי", value: "maybe" },
      { label: "לא בטוח", value: "unsure" },
      { label: "לא", value: "no" },
    ],
  },
];

// ─── CALCULATION — only actual answers, no defaults ──────────────────────────
export function calcNetLift(answers) {
  let monthly = 0;
  const breakdown = {};

  // A — סופר
  const superSpend = answers.super_spend ?? null;
  const superFreq = answers.super_freq ?? null;
  if (superSpend !== null && superFreq !== null && superFreq > 0) {
    // 8% discount, weighted by frequency (max 1 = full monthly)
    const freqFactor = Math.min(superFreq / 2, 1); // freq 2/week = 1.0 factor
    const saving = Math.round(superSpend * 0.08 * freqFactor);
    breakdown.super = saving;
    monthly += saving;
  }

  // B — חשמל
  const techPurchases = answers.tech_purchases ?? null;
  if (techPurchases !== null && techPurchases > 0) {
    // avg saving per big purchase ≈ 600₪
    const saving = Math.round((techPurchases * 600) / 12);
    breakdown.tech = saving;
    monthly += saving;
  }

  // C — הטבות כלליות
  const generalUsage = answers.general_usage ?? null;
  if (generalUsage !== null && generalUsage > 0) {
    // avg saving per use ≈ 80₪
    const saving = Math.round((generalUsage * 80) / 12);
    breakdown.general = saving;
    monthly += saving;
  }

  // D — חופשות
  const vacations = answers.vacations ?? null;
  if (vacations !== null && vacations > 0) {
    // avg saving per vacation ≈ 800₪
    const saving = Math.round((vacations * 800) / 12);
    breakdown.vacation = saving;
    monthly += saving;
  }

  const shows = answers.shows ?? null;
  if (shows !== null && shows > 0) {
    // avg saving per show ≈ 80₪
    const saving = Math.round((shows * 80) / 12);
    breakdown.culture = saving;
    monthly += saving;
  }

  // E — ביטוח — ONLY if both questions answered AND car_count > 0 AND interest is yes/maybe
  const carCount = answers.car_count ?? null;
  const insInterest = answers.insurance_interest ?? null;
  if (
    carCount !== null &&
    insInterest !== null &&
    carCount > 0 &&
    (insInterest === "yes" || insInterest === "maybe")
  ) {
    // avg saving per car ≈ 600₪/year
    const saving = Math.round((carCount * 600) / 12);
    breakdown.insurance = saving;
    monthly += saving;
  }

  if (monthly === 0) return null;

  return {
    monthly,
    annual: monthly * 12,
    breakdown,
  };
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function NetLiftSurvey({ onFinish, onComplete }) {
  const handleDone = onFinish || onComplete;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const current = QUESTIONS[step];
  const total = QUESTIONS.length;

  const handleAnswer = (value) => {
    const next = { ...answers, [current.id]: value };
    setAnswers(next);
    if (step < total - 1) {
      setTimeout(() => setStep((s) => s + 1), 180);
    } else {
      const result = calcNetLift(next);
      handleDone(result, next);
    }
  };

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const sectionColors = { A: "#0066CC", B: "#7C3AED", C: "#059669", D: "#D97706", E: "#DC2626" };
  const sectionLabels = { A: "סופר ומזון", B: "חשמל", C: "הטבות כלליות", D: "חופשות ובילויים", E: "ביטוח" };

  return (
    <div dir="rtl" style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "var(--font-heebo)", padding: "32px 20px 80px" }}>
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "inline-block", background: "rgba(0,102,204,0.08)", border: "1px solid rgba(0,102,204,0.2)", borderRadius: "999px", padding: "4px 14px", marginBottom: "14px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#0066CC" }}>NetLift Index · {sectionLabels[current.section]}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", color: "#86868B", fontWeight: 600 }}>שאלה {step + 1} מתוך {total}</span>
            <span style={{ fontSize: "12px", color: "#86868B" }}>{Math.round(((step + 1) / total) * 100)}%</span>
          </div>
          <div style={{ height: "4px", background: "rgba(0,0,0,0.08)", borderRadius: "999px", overflow: "hidden" }}>
            <motion.div
              animate={{ width: `${((step + 1) / total) * 100}%` }}
              transition={{ duration: 0.4 }}
              style={{ height: "100%", background: sectionColors[current.section] || "#0066CC", borderRadius: "999px" }}
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
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <span style={{ background: sectionColors[current.section] + "18", color: sectionColors[current.section], fontSize: "11px", fontWeight: 800, padding: "2px 10px", borderRadius: "999px" }}>
                  חלק {current.section}
                </span>
              </div>
              <h3 style={{ fontSize: "clamp(17px, 4vw, 21px)", fontWeight: 800, color: "#1D1D1F", marginBottom: "6px", lineHeight: 1.3 }}>
                {current.title}
              </h3>
              <p style={{ fontSize: "13px", color: "#86868B", marginBottom: "22px", lineHeight: 1.5 }}>
                {current.sub}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {current.options.map((opt) => (
                  <button
                    key={String(opt.value)}
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
            style={{ marginTop: "16px", background: "none", border: "none", color: "#AEAEB2", fontSize: "13px", cursor: "pointer", fontFamily: "var(--font-heebo)" }}
          >
            ← חזרה
          </button>
        )}
      </div>
    </div>
  );
}