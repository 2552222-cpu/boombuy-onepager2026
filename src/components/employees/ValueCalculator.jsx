import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── ILS formatter ────────────────────────────────────────────────────────────
function ILS({ value, className = "", style = {} }) {
  const num = Math.round(Number(value));
  const formatted = num.toLocaleString("he-IL");
  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        direction: "ltr",
        unicodeBidi: "bidi-override",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {formatted} ₪
    </span>
  );
}

// ─── QUESTIONS ────────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: "q1",
    title: "כמה אתם מוציאים בחודש על סופר?",
    sub: "ממוצע משפחתי - כולל סופרמרקט, פארם ומוצרי ניקיון",
    options: [
      { label: "עד 1,500 ₪", value: 1500 },
      { label: "1,500–2,500 ₪", value: 2000 },
      { label: "2,500–4,000 ₪", value: 3200 },
      { label: "מעל 4,000 ₪", value: 4500 },
    ],
  },
  {
    id: "q2",
    title: "אם תהיה לכם 8% הנחה קבועה ברשתות הסופר המוזלות, האם תשתמשו בה?",
    sub: "למשל ויקטורי, יוחננוף, מחסני השוק ורשתות דיסקאונט דומות",
    options: [
      { label: "כן, כמעט כל שבוע", value: 1.0 },
      { label: "כן, לפעמים", value: 0.6 },
      { label: "רק מדי פעם", value: 0.3 },
      { label: "כנראה שלא", value: 0.0 },
    ],
  },
  {
    id: "q3",
    title: "באיזו תדירות סביר שתממשו הטבות שוטפות?",
    sub: "אופנה, כלי בית, קפסולות קפה, טבליות למדיח, בגדים והטבות יומיות שחוזרות לאורך השנה",
    options: [
      { label: "1–5 פעמים בשנה", value: 3 },
      { label: "פעם בחודש", value: 12 },
      { label: "2–3 פעמים בחודש", value: 30 },
      { label: "1–2 פעמים בשבוע", value: 78 },
    ],
  },
  {
    id: "q4",
    title: "כמה חופשות או נופש סביר שתנצלו בשנה?",
    sub: 'בארץ או בחו"ל',
    options: [
      { label: "לא בדרך כלל", value: 0 },
      { label: "חופשה אחת", value: 1 },
      { label: "2 חופשות", value: 2 },
      { label: "3 חופשות או יותר", value: 3 },
    ],
  },
  {
    id: "q5",
    title: "איזה סוג קנייה משמעותית יותר סביר שתעשו השנה?",
    sub: "אפל, דייסון, נינג'ה, טלפון, מחשב או מכשירי בית",
    options: [
      { label: "לא מתכנן כרגע", value: 0 },
      { label: "קנייה קטנה אחת", value: 250 },
      { label: "קנייה משמעותית אחת", value: 700 },
      { label: "כמה קניות משמעותיות", value: 1400 },
    ],
  },
  {
    id: "q6",
    title: "כמה ביטוחי רכב יש בבית?",
    sub: "אם תהיה הוזלה קבועה דרך הפלטפורמה",
    options: [
      { label: "אין", value: 0 },
      { label: "ביטוח אחד", value: 70 },
      { label: "שני ביטוחים", value: 130 },
      { label: "שלושה ומעלה", value: 190 },
    ],
  },
];

// ─── CALCULATION ──────────────────────────────────────────────────────────────
function calcResult(answers) {
  const q1 = answers[0] ?? 0;
  const q2 = answers[1] ?? 0;
  const q3 = answers[2] ?? 0;
  const q4 = answers[3] ?? 0;
  const q5 = answers[4] ?? 0;
  const q6 = answers[5] ?? 0;

  const super_ = q1 * 0.08 * q2;
  const daily = (q3 * 45) / 12;
  const vacation = (q4 * 800) / 12;
  const tech = q5 / 12;
  const insurance = q6;

  const monthly = super_ + daily + vacation + tech + insurance;

  const breakdown = [
    { label: "סופר ופארם", monthly: super_ },
    { label: "הטבות שוטפות ביומיום", monthly: daily },
    { label: "חופשות ונופש", monthly: vacation },
    { label: "חשמל ואלקטרוניקה", monthly: tech },
    { label: "ביטוח רכב", monthly: insurance },
  ].filter((b) => b.monthly > 0);

  return { monthly: Math.round(monthly), yearly: Math.round(monthly * 12), breakdown };
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
      <ILS value={monthly} style={{ fontSize: 15, fontWeight: 800, color: "#0055CC" }} />
      <span style={{ fontSize: 12, color: "#888" }}>בחודש</span>
    </motion.div>
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
          בדיקה אישית ב-20 שניות
        </p>
        <h2 style={{ textAlign: "center", fontSize: "clamp(22px, 4.5vw, 34px)", fontWeight: 900, color: "#1D1D1F", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 8 }}>
          בדקו כמה ההטבות האלה יכולות להיות שוות לכם בשנה
        </h2>
        <p style={{ textAlign: "center", fontSize: "clamp(13px, 2vw, 15px)", color: "#86868B", marginBottom: 32, lineHeight: 1.6 }}>
          6 שאלות קצרות · בלי הרשמה · תוצאה אישית לפי ההרגלים שלכם
        </p>

        <div style={{ background: "#fff", borderRadius: 28, boxShadow: "0 4px 32px rgba(0,0,0,0.07)", padding: "32px 28px", minHeight: 320 }}>
          <AnimatePresence mode="wait">

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
                      {opt.label}
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

            {stage === "result" && (
              <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                <p style={{ textAlign: "center", fontSize: 14, color: "#86868B", marginBottom: 8 }}>
                  לפי התשובות שלך, זה יכול להיות שווה לך
                </p>
                <div style={{ textAlign: "center", marginBottom: 4 }}>
                  <ILS value={result.monthly} style={{ fontSize: "clamp(52px, 12vw, 80px)", fontWeight: 900, color: "#0055CC", letterSpacing: "-0.04em", lineHeight: 1 }} />
                </div>
                <p style={{ textAlign: "center", fontSize: 14, color: "#AEAEB2", marginBottom: 6 }}>בחודש</p>
                <p style={{ textAlign: "center", fontSize: 16, fontWeight: 700, color: "#1D1D1F", marginBottom: 28 }}>
                  וזה בערך <ILS value={result.yearly} style={{ fontSize: 16, fontWeight: 900, color: "#0055CC" }} /> בשנה
                </p>

                {result.breakdown.length > 0 && (
                  <div style={{ background: "#F5F5F7", borderRadius: 18, padding: "18px 20px", marginBottom: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                    {result.breakdown.map((b) => (
                      <div key={b.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, color: "#555", fontWeight: 500 }}>{b.label}</span>
                        <ILS value={b.monthly} style={{ fontSize: 14, fontWeight: 800, color: "#1D1D1F" }} />
                      </div>
                    ))}
                  </div>
                )}

                <button onClick={scrollToSurvey} style={{ width: "100%", background: "#0055CC", color: "#fff", border: "none", padding: "16px 0", borderRadius: 18, fontSize: 16, fontWeight: 800, cursor: "pointer", marginBottom: 12 }}>
                  אני רוצה לבדוק התאמה לארגון שלי &larr;
                </button>
                <button onClick={reset} style={{ width: "100%", background: "none", border: "1.5px solid #E0E0E0", borderRadius: 18, padding: "12px 0", fontSize: 14, fontWeight: 700, color: "#555", cursor: "pointer" }}>
                  חשב שוב
                </button>

                <p style={{ marginTop: 20, fontSize: 11, color: "#C0C0C0", textAlign: "center", lineHeight: 1.6 }}>
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