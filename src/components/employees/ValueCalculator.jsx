import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── SHEKEL DISPLAY — single source of truth ─────────────────────────────────
function ILS({ value, color = "#0055CC", size = 15 }) {
  const num = Math.round(Number(value ?? 0));
  const formatted = num.toLocaleString("he-IL");
  return (
    <span style={{ display: "inline-flex", flexDirection: "row", alignItems: "baseline", gap: 2 }}>
      <span style={{ color, fontSize: size, fontWeight: 900, lineHeight: 1 }}>{formatted}</span>
      <span style={{ color, fontSize: size * 0.75, fontWeight: 700, lineHeight: 1 }}>₪</span>
    </span>
  );
}

// ─── SUPERMARKET SPEND OPTIONS → 8% saving ───────────────────────────────────
// Fixed mapping per spec: 1000 / 2000 / 3000 / 4000
const SUPER_OPTIONS = [
  { label: "עד 1,000 ₪ בחודש",      monthlySpend: 1000 },
  { label: "1,500–2,500 ₪ בחודש",   monthlySpend: 2000 },
  { label: "2,500–3,500 ₪ בחודש",   monthlySpend: 3000 },
  { label: "3,500 ₪ ומעלה",         monthlySpend: 4000 },
];

// ─── QUESTIONS ───────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: "q1",
    title: "כמה אתם מוציאים בחודש על סופר?",
    sub: "סופרמרקט, פארם, מוצרי ניקיון ומוצרי יומיום",
    type: "super",
    options: SUPER_OPTIONS.map((o, i) => ({ label: o.label, value: i })),
  },
  {
    id: "q2",
    title: "באיזו תדירות תממשו הטבות יומיומיות?",
    sub: "אופנה, כלי בית, קפסולות קפה, טבליות למדיח, בגדים — הטבות שחוזרות לאורך השנה",
    options: [
      { label: "1–5 פעמים בשנה", value: 1 },
      { label: "פעם בחודש",       value: 2 },
      { label: "2–3 פעמים בחודש", value: 3 },
      { label: "1–2 פעמים בשבוע", value: 4 },
    ],
  },
  {
    id: "q3",
    title: "כמה חופשות תנצלו דרך ההטבות בשנה?",
    sub: 'בארץ או בחו"ל — 1,200 ₪ חיסכון לכל חופשה',
    options: [
      { label: "לא בדרך כלל",      value: 0 },
      { label: "חופשה אחת",        value: 1 },
      { label: "2 חופשות",         value: 2 },
      { label: "3 חופשות ומעלה",   value: 3 },
    ],
  },
  {
    id: "q4",
    title: "כמה מוצרי חשמל / אלקטרוניקה תקנו השנה?",
    sub: "Apple, Samsung, Dyson, Ninja, טלפון, מחשב — דרך ההטבות",
    options: [
      { label: "לא מתכנן כרגע",    value: 0 },
      { label: "מוצר אחד",         value: 1 },
      { label: "2 מוצרים",         value: 2 },
      { label: "3 מוצרים",         value: 3 },
      { label: "4 מוצרים ומעלה",   value: 4 },
    ],
  },
];

// ─── CALCULATION ──────────────────────────────────────────────────────────────
const DAILY_ANNUAL    = { 1: 300, 2: 900, 3: 1800, 4: 3600 };
const ELECTRONICS_MIN = 200; // per product

function calcResult(answers) {
  const superIdx   = answers[0] ?? 0;
  const dailyTier  = answers[1] ?? 0;
  const vacations  = answers[2] ?? 0;
  const techCount  = answers[3] ?? 0;

  // Supermarket: 8% of monthly spend × 12
  const superMonthly = Math.round((SUPER_OPTIONS[superIdx]?.monthlySpend ?? 1000) * 0.08);
  const superAnnual  = superMonthly * 12;

  // Daily perks
  const dailyAnnual = DAILY_ANNUAL[dailyTier] ?? 0;

  // Vacations: 1200 per trip
  const vacationAnnual = vacations * 1200;

  // Electronics: 200 minimum per product
  const techAnnual = techCount * ELECTRONICS_MIN;

  // Car insurance: 80 ₪/month default = 960/year
  const carAnnual = 960;

  const rawAnnual = superAnnual + dailyAnnual + vacationAnnual + techAnnual + carAnnual;
  // FLOOR: minimum 7200/year, 600/month
  const annualTotal = Math.max(rawAnnual, 7200);
  const monthly = Math.max(Math.round(annualTotal / 12), 600);

  const breakdown = [
    { label: "סופר ופארם",               monthly: superMonthly },
    { label: "הטבות שוטפות ביומיום",    monthly: Math.round((DAILY_ANNUAL[dailyTier] ?? 0) / 12) },
    { label: "חופשות ונופש",             monthly: Math.round(vacationAnnual / 12) },
    { label: "חשמל ואלקטרוניקה",         monthly: Math.round(techAnnual / 12) },
    { label: "ביטוח רכב",               monthly: 80 },
  ].filter((b) => b.monthly > 0);

  return { monthly, yearly: annualTotal, breakdown };
}

// ─── GLASS CARD ───────────────────────────────────────────────────────────────
function GlassCard({ title, helper, value, accent, bg, border }) {
  return (
    <div style={{ flex: 1, background: bg, border: `1.5px solid ${border}`, borderRadius: 24, padding: "20px 16px", textAlign: "center", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: "#86868B", marginBottom: 10, letterSpacing: "0.02em" }}>{title}</p>
      <ILS value={value} color={accent} size={48} />
      <p style={{ fontSize: 11, color: "#AEAEB2", marginTop: 8 }}>{helper}</p>
    </div>
  );
}

// ─── LIVE TOTAL ───────────────────────────────────────────────────────────────
function LiveTotal({ answers }) {
  const { monthly } = calcResult(answers);
  if (monthly === 0) return null;
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
      style={{ marginTop: 20, background: "#F0F4FF", borderRadius: 14, padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, direction: "rtl" }}>
      <span style={{ fontSize: 13, color: "#555", fontWeight: 500 }}>חיסכון משוער עד כה:</span>
      <ILS value={monthly} color="#0055CC" size={15} />
      <span style={{ fontSize: 12, color: "#888" }}>בחודש</span>
    </motion.div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function ValueCalculator() {
  const [stage, setStage] = useState("intro");
  const [step, setStep]   = useState(0);
  const [answers, setAnswers] = useState([]);

  const reset = () => { setStage("intro"); setStep(0); setAnswers([]); };

  const choose = (val) => {
    const next = [...answers];
    next[step] = val;
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setStage("result");
    }
  };

  const result = calcResult(answers);

  const scrollToSurveyGate = () => {
    document.getElementById("survey-gate")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="value-calculator" dir="rtl" style={{ background: "#F9F9FB", padding: "72px 16px", overflowX: "hidden", maxWidth: "100vw" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <p style={{ textAlign: "center", fontSize: 12, fontWeight: 700, color: "#0055CC", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
          חישוב אישי ב-10 שניות
        </p>
        <h2 style={{ textAlign: "center", fontSize: "clamp(22px, 4.5vw, 34px)", fontWeight: 900, color: "#1D1D1F", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 8 }}>
          כמה ההטבות האלה יכולות להיות שוות לכם בשנה?
        </h2>
        <p style={{ textAlign: "center", fontSize: "clamp(13px, 2vw, 15px)", color: "#86868B", marginBottom: 32, lineHeight: 1.6 }}>
          4 שאלות קצרות · בלי הרשמה · תוצאה אישית לפי ההרגלים שלכם
        </p>

        <div style={{ background: "#fff", borderRadius: 28, boxShadow: "0 4px 32px rgba(0,0,0,0.07)", padding: "32px 28px", minHeight: 320 }}>
          <AnimatePresence mode="wait">

            {/* INTRO */}
            {stage === "intro" && (
              <motion.div key="intro" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#1D1D1F", marginBottom: 20, textAlign: "center" }}>
                  נחשב כמה ההטבות שוות לכם לפי ההרגלים שלכם
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 32 }}>
                  {["סופר ופארם", "חופשות והופעות", "חשמל ואלקטרוניקה", "ביטוח רכב"].map((c) => (
                    <span key={c} style={{ background: "#F5F5F7", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 100, padding: "6px 16px", fontSize: 13, fontWeight: 600, color: "#444" }}>{c}</span>
                  ))}
                </div>
                <button onClick={() => setStage("quiz")} style={{ width: "100%", background: "#0055CC", color: "#fff", border: "none", padding: "16px 0", borderRadius: 18, fontSize: 16, fontWeight: 800, cursor: "pointer", fontFamily: "var(--font-heebo)" }}>
                  בואו נבדוק ←
                </button>
              </motion.div>
            )}

            {/* QUIZ */}
            {stage === "quiz" && (
              <motion.div key={"q-" + step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.28 }}>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: "#AEAEB2", fontWeight: 600 }}>שאלה {step + 1} מתוך {QUESTIONS.length}</span>
                    <span style={{ fontSize: 12, color: "#AEAEB2" }}>{Math.round((step / QUESTIONS.length) * 100)}%</span>
                  </div>
                  <div style={{ background: "#F0F0F0", borderRadius: 100, height: 4, overflow: "hidden" }}>
                    <motion.div animate={{ width: ((step / QUESTIONS.length) * 100) + "%" }} transition={{ duration: 0.35 }}
                      style={{ height: "100%", background: "#0055CC", borderRadius: 100 }} />
                  </div>
                </div>

                <h3 style={{ fontSize: "clamp(16px, 3.5vw, 20px)", fontWeight: 800, color: "#1D1D1F", marginBottom: 6, lineHeight: 1.35 }}>
                  {QUESTIONS[step].title}
                </h3>
                <p style={{ fontSize: 13, color: "#86868B", marginBottom: 20, lineHeight: 1.5 }}>
                  {QUESTIONS[step].sub}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {QUESTIONS[step].options.map((opt) => (
                    <button key={opt.label} onClick={() => choose(opt.value)}
                      style={{ background: "#F5F5F7", border: "1.5px solid transparent", borderRadius: 14, padding: "14px 18px", textAlign: "right", fontSize: 15, fontWeight: 600, color: "#1D1D1F", cursor: "pointer", transition: "all 0.15s ease", fontFamily: "var(--font-heebo)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#EEF3FF"; e.currentTarget.style.borderColor = "#0055CC"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F5F7"; e.currentTarget.style.borderColor = "transparent"; }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <LiveTotal answers={answers} />

                {step > 0 && (
                  <button onClick={() => setStep(step - 1)} style={{ marginTop: 18, background: "none", border: "none", color: "#AEAEB2", fontSize: 13, cursor: "pointer", padding: 0, fontFamily: "var(--font-heebo)" }}>
                    ← חזרה
                  </button>
                )}
              </motion.div>
            )}

            {/* RESULT */}
            {stage === "result" && (
              <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                <div style={{ display: "flex", flexDirection: "row", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                  <GlassCard title="חיסכון חודשי משוער" value={result.monthly} helper="לפי התשובות שלך"
                    accent="#0055CC" bg="#F0F4FF" border="rgba(0,85,204,0.15)" />
                  <GlassCard title="חיסכון שנתי משוער" value={result.yearly} helper="אם משתמשים בהטבות לאורך השנה"
                    accent="#1A7A43" bg="rgba(52,199,89,0.07)" border="rgba(52,199,89,0.2)" />
                </div>

                {result.breakdown.length > 0 && (
                  <div style={{ background: "#F5F5F7", borderRadius: 18, padding: "18px 20px", marginBottom: 20 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#86868B", marginBottom: 12, letterSpacing: "0.02em" }}>פירוט לפי קטגוריות</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {result.breakdown.map((b) => (
                        <div key={b.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: 13, color: "#555", fontWeight: 500 }}>{b.label}</span>
                          <span style={{ display: "inline-flex", flexDirection: "row", alignItems: "baseline", gap: 3 }}>
                            <span style={{ fontSize: 14, fontWeight: 800, color: "#1D1D1F" }}>{b.monthly.toLocaleString("he-IL")}</span>
                            <span style={{ fontSize: 13, fontWeight: 700, color: "#1D1D1F" }}>₪</span>
                            <span style={{ fontSize: 11, color: "#86868B", marginRight: 2 }}>/ חודש</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button onClick={scrollToSurveyGate} style={{ width: "100%", background: "#0055CC", color: "#fff", border: "none", padding: "16px 0", borderRadius: 18, fontSize: 16, fontWeight: 800, cursor: "pointer", marginBottom: 12, fontFamily: "var(--font-heebo)" }}>
                  אני רוצה לבדוק התאמה לארגון שלי ←
                </button>
                <button onClick={reset} style={{ width: "100%", background: "none", border: "1.5px solid #E0E0E0", borderRadius: 18, padding: "12px 0", fontSize: 14, fontWeight: 700, color: "#555", cursor: "pointer", fontFamily: "var(--font-heebo)" }}>
                  חשב שוב
                </button>

                <p style={{ marginTop: 16, fontSize: 11, color: "#C0C0C0", textAlign: "center", lineHeight: 1.6 }}>
                  * החישוב מבוסס על ממוצעי שימוש והערכות שמרניות. הערך בפועל תלוי בהרגלי השימוש ובהטבות שייפתחו בארגון.
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}