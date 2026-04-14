import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── LOOKUP TABLES ────────────────────────────────────────────────────────────
const SUPER_ANNUAL    = { 1: 600,  2: 1200, 3: 2400, 4: 3600 };
const ELECTRONICS_ANNUAL = { 1: 200, 2: 600, 3: 1200, 4: 2000 };
const VACATION_ANNUAL = { 1: 1200, 2: 2400, 3: 3600, 4: 4800 };
const DAILY_ANNUAL    = { 1: 300,  2: 900,  3: 1800, 4: 3600 };

// ─── QUESTIONS ───────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: "q1",
    title: "באיזו תדירות אתם קונים בסופר?",
    sub: "סופרמרקט, פארם, מוצרי ניקיון ומוצרי יומיום",
    options: [
      { label: "1–5 פעמים בשנה", value: 1 },
      { label: "פעם בחודש", value: 2 },
      { label: "2–3 פעמים בחודש", value: 3 },
      { label: "שבועי ומעלה", value: 4 },
    ],
  },
  {
    id: "q2",
    title: "באיזו תדירות תממשו הטבות יומיומיות?",
    sub: "אופנה, כלי בית, קפסולות קפה, טבליות למדיח, בגדים והטבות שחוזרות לאורך השנה",
    options: [
      { label: "1–5 פעמים בשנה", value: 1 },
      { label: "פעם בחודש", value: 2 },
      { label: "2–3 פעמים בחודש", value: 3 },
      { label: "1–2 פעמים בשבוע", value: 4 },
    ],
  },
  {
    id: "q3",
    title: "כמה חופשות או נופש תנצלו בשנה?",
    sub: 'בארץ או בחו"ל — דרך ההטבות',
    options: [
      { label: "לא בדרך כלל", value: 0 },
      { label: "חופשה אחת", value: 1 },
      { label: "2 חופשות", value: 2 },
      { label: "3 חופשות ומעלה", value: 3 },
    ],
  },
  {
    id: "q4",
    title: "כמה מוצרי חשמל או אלקטרוניקה תקנו השנה?",
    sub: "אפל, דייסון, נינג'ה, טלפון, מחשב או מכשירי בית — דרך ההטבות",
    options: [
      { label: "לא מתכנן כרגע", value: 0 },
      { label: "מוצר אחד", value: 1 },
      { label: "2 מוצרים", value: 2 },
      { label: "3 מוצרים", value: 3 },
      { label: "4 מוצרים ומעלה", value: 4 },
    ],
  },
];

// ─── CALCULATION ──────────────────────────────────────────────────────────────
function calcResult(answers) {
  const q1 = answers[0] ?? 0; // supermarket tier 1-4
  const q2 = answers[1] ?? 0; // daily benefits tier 1-4
  const q3 = answers[2] ?? 0; // vacations 0-3
  const q4 = answers[3] ?? 0; // electronics 0-4

  const superAnnual    = SUPER_ANNUAL[q1] ?? 0;
  const dailyAnnual    = DAILY_ANNUAL[q2] ?? 0;
  const vacationAnnual = q3 > 0 ? (VACATION_ANNUAL[q3] ?? 0) : 0;
  const techAnnual     = q4 > 0 ? (ELECTRONICS_ANNUAL[q4] ?? 0) : 0;

  const annualTotal = superAnnual + dailyAnnual + vacationAnnual + techAnnual;
  const monthly = Math.round(annualTotal / 12);

  const breakdown = [
    { label: "סופר ופארם", monthly: Math.round(superAnnual / 12) },
    { label: "הטבות שוטפות ביומיום", monthly: Math.round(dailyAnnual / 12) },
    { label: "חופשות ונופש", monthly: Math.round(vacationAnnual / 12) },
    { label: "חשמל ואלקטרוניקה", monthly: Math.round(techAnnual / 12) },
  ].filter((b) => b.monthly > 0);

  return { monthly, yearly: annualTotal, breakdown };
}

// ─── SHEKEL DISPLAY (approved flexbox pattern) ─────────────────────────────
function ShekelDisplay({ value, style = {}, color = "#0055CC" }) {
  const num = Math.round(Number(value ?? 0));
  const formatted = num.toLocaleString("he-IL");
  return (
    <span style={{ display: "inline-flex", flexDirection: "row", alignItems: "baseline", gap: "3px", ...style }}>
      <span style={{ color }}>{formatted}</span>
      <span style={{ color }}>₪</span>
    </span>
  );
}

// ─── LIVE TOTAL ───────────────────────────────────────────────────────────────
function LiveTotal({ answers }) {
  const { monthly } = calcResult(answers);
  if (monthly === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ marginTop: 20, background: "#F0F4FF", borderRadius: 14, padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, direction: "rtl" }}
    >
      <span style={{ fontSize: 13, color: "#555", fontWeight: 500 }}>חיסכון משוער עד כה:</span>
      <ShekelDisplay value={monthly} style={{ fontSize: 15, fontWeight: 800 }} />
      <span style={{ fontSize: 12, color: "#888" }}>בחודש</span>
    </motion.div>
  );
}

// ─── GLASS CARD ───────────────────────────────────────────────────────────────
function GlassCard({ title, helper, value, accent = "#0055CC", bg = "#F0F4FF", border = "rgba(0,85,204,0.15)" }) {
  return (
    <div style={{
      flex: 1,
      background: bg,
      border: `1.5px solid ${border}`,
      borderRadius: 24,
      padding: "20px 16px",
      textAlign: "center",
      boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
    }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: "#86868B", marginBottom: 8, letterSpacing: "0.02em" }}>{title}</p>
      <ShekelDisplay
        value={value}
        color={accent}
        style={{ fontSize: "clamp(36px, 10vw, 52px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 }}
      />
      <p style={{ fontSize: 11, color: "#AEAEB2", marginTop: 6 }}>{helper}</p>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const INTRO_CHIPS = ["סופר ופארם", "חופשות והופעות", "חשמל ואלקטרוניקה", "ביטוח רכב"];

export default function ValueCalculator() {
  const [stage, setStage] = useState("intro");
  const [step, setStep] = useState(0);
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

  const scrollToSurvey = () => {
    document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="value-calculator"
      dir="rtl"
      style={{ background: "#F9F9FB", padding: "72px 16px", overflowX: "hidden", maxWidth: "100vw" }}
    >
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

            {/* ── INTRO ── */}
            {stage === "intro" && (
              <motion.div key="intro" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#1D1D1F", marginBottom: 20, textAlign: "center" }}>
                  בודקים כמה הטבות אלה יכולות להיות שוות לכם
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 24 }}>
                  {INTRO_CHIPS.map((c) => (
                    <span key={c} style={{ background: "#F5F5F7", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 100, padding: "6px 16px", fontSize: 13, fontWeight: 600, color: "#444" }}>
                      {c}
                    </span>
                  ))}
                </div>
                <p style={{ textAlign: "center", fontSize: 12, color: "#AEAEB2", marginBottom: 28 }}>
                  עוד לא ראיתם את ההטבות? אפשר לגלול למעלה ולחזור
                </p>
                <button
                  onClick={() => setStage("quiz")}
                  style={{ width: "100%", background: "#0055CC", color: "#fff", border: "none", padding: "16px 0", borderRadius: 18, fontSize: 16, fontWeight: 800, cursor: "pointer" }}
                >
                  בואו נבדוק
                </button>
              </motion.div>
            )}

            {/* ── QUIZ ── */}
            {stage === "quiz" && (
              <motion.div key={"q-" + step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.28 }}>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: "#AEAEB2", fontWeight: 600 }}>שאלה {step + 1} מתוך {QUESTIONS.length}</span>
                    <span style={{ fontSize: 12, color: "#AEAEB2" }}>{Math.round((step / QUESTIONS.length) * 100)}%</span>
                  </div>
                  <div style={{ background: "#F0F0F0", borderRadius: 100, height: 4, overflow: "hidden" }}>
                    <motion.div
                      animate={{ width: ((step / QUESTIONS.length) * 100) + "%" }}
                      transition={{ duration: 0.35 }}
                      style={{ height: "100%", background: "#0055CC", borderRadius: 100 }}
                    />
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
                    <button
                      key={opt.label}
                      onClick={() => choose(opt.value)}
                      style={{ background: "#F5F5F7", border: "1.5px solid transparent", borderRadius: 14, padding: "14px 18px", textAlign: "right", fontSize: 15, fontWeight: 600, color: "#1D1D1F", cursor: "pointer", transition: "all 0.15s ease" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#EEF3FF"; e.currentTarget.style.borderColor = "#0055CC"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F5F7"; e.currentTarget.style.borderColor = "transparent"; }}
                    >
                      <bdi dir="ltr">{opt.label}</bdi>
                    </button>
                  ))}
                </div>

                <LiveTotal answers={answers} />

                {step > 0 && (
                  <button onClick={() => setStep(step - 1)} style={{ marginTop: 18, background: "none", border: "none", color: "#AEAEB2", fontSize: 13, cursor: "pointer", padding: 0 }}>
                    חזרה
                  </button>
                )}
              </motion.div>
            )}

            {/* ── RESULT ── */}
            {stage === "result" && (
              <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

                {/* 2 glass cards — side by side on desktop, stacked on mobile */}
                <div style={{ display: "flex", flexDirection: "row", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                  <GlassCard
                    title="חיסכון חודשי משוער"
                    value={result.monthly}
                    helper="לפי התשובות שלך"
                    accent="#0055CC"
                    bg="#F0F4FF"
                    border="rgba(0,85,204,0.15)"
                  />
                  <GlassCard
                    title="חיסכון שנתי משוער"
                    value={result.yearly}
                    helper="אם משתמשים בהטבות לאורך השנה"
                    accent="#1A7A43"
                    bg="rgba(52,199,89,0.07)"
                    border="rgba(52,199,89,0.2)"
                  />
                </div>

                {/* Breakdown card */}
                {result.breakdown.length > 0 && (
                  <div style={{ background: "#F5F5F7", borderRadius: 18, padding: "18px 20px", marginBottom: 20 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#86868B", marginBottom: 12, letterSpacing: "0.02em" }}>פירוט החיסכון החודשי המשוער</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {result.breakdown.map((b) => (
                        <div key={b.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: 13, color: "#555", fontWeight: 500 }}>{b.label}</span>
                          <span style={{ display: "inline-flex", flexDirection: "row", alignItems: "baseline", gap: 3 }}>
                            <span style={{ fontSize: 14, fontWeight: 800, color: "#1D1D1F" }}>{Math.round(b.monthly).toLocaleString("he-IL")}</span>
                            <span style={{ fontSize: 14, fontWeight: 800, color: "#1D1D1F" }}>₪</span>
                            <span style={{ fontSize: 12, color: "#86868B", marginRight: 2 }}>בחודש</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button onClick={scrollToSurvey} style={{ width: "100%", background: "#0055CC", color: "#fff", border: "none", padding: "16px 0", borderRadius: 18, fontSize: 16, fontWeight: 800, cursor: "pointer", marginBottom: 12 }}>
                  אני רוצה לבדוק התאמה לארגון שלי ←
                </button>
                <button onClick={reset} style={{ width: "100%", background: "none", border: "1.5px solid #E0E0E0", borderRadius: 18, padding: "12px 0", fontSize: 14, fontWeight: 700, color: "#555", cursor: "pointer" }}>
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