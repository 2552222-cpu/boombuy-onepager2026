import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";

const BG = "#F7F7F4";
const CHARCOAL = "#17191D";
const CORAL = "#F47A5A";
const WHITE = "#FFFFFF";
const EASE = [0.22, 1, 0.36, 1];

const QUESTIONS = [
  {
    key: "orgSize",
    prompt: "כמה עובדים יש בארגון?",
    options: ["עד 100", "101 עד 500", "501 עד 1,000", "יותר מ-1,000"],
  },
  {
    key: "welfareState",
    prompt: "איך נראית הרווחה אצלכם היום?",
    options: [
      "בעיקר מתנות בחגים",
      "מתנות ואתר בחירה",
      "הטבות ופעילויות לאורך השנה",
      "מספר פתרונות וספקים שונים",
    ],
  },
  {
    key: "upgradeGoal",
    prompt: "מה הכי חשוב לכם לשדרג?",
    options: [
      "להפחית עומס תפעולי",
      "לתת לעובדים יותר באותו תקציב",
      "להגדיל מחוברות לאורך השנה",
      "לשדרג את חוויית מתנות החג",
      "הכול יחד",
    ],
  },
];

function genSessionId() {
  try {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
  } catch (e) {
    /* ignore */
  }
  return "fit-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
}

function resultText(welfareState) {
  if (welfareState === "בעיקר מתנות בחגים" || welfareState === "מתנות ואתר בחירה") {
    return "הארגון שלכם יכול לעבור מרגעים בודדים לחוויית עובד שפועלת לאורך כל השנה.";
  }
  if (welfareState === "מספר פתרונות וספקים שונים") {
    return "בום ביי יכולה לרכז את הפעילות, להפחית תפעול ולייצר לעובדים חוויה אחת רציפה.";
  }
  if (welfareState === "הטבות ופעילויות לאורך השנה") {
    return "בום ביי יכולה לחבר את מה שכבר קיים למערכת אחת ולהגדיל את הערך שהעובדים מרגישים.";
  }
  return "יש לארגון שלכם פוטנציאל אמיתי להפוך את תקציב הרווחה לערך שמורגש לאורך כל השנה.";
}

const inputStyle = {
  width: "100%",
  height: 52,
  borderRadius: 14,
  border: "1px solid rgba(19,21,25,0.14)",
  padding: "0 16px",
  fontSize: 16,
  fontFamily: "inherit",
  color: CHARCOAL,
  background: WHITE,
  boxSizing: "border-box",
  outline: "none",
};

export default function OrganizationFit() {
  const sectionRef = useRef(null);
  const firedView = useRef(false);
  const firedStarted = useRef(false);
  const [step, setStep] = useState(0); // 0..2 questions, 3 = result, 4 = form
  const [answers, setAnswers] = useState({});
  const [form, setForm] = useState({ fullName: "", orgName: "", phone: "", email: "", consent: false });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const sessionIdRef = useRef("");

  useEffect(() => {
    // stable session id per browser (prevents duplicate leads on repeated clicks)
    let id = "";
    try {
      id = window.localStorage.getItem("boom_fit_session");
      if (!id) {
        id = genSessionId();
        window.localStorage.setItem("boom_fit_session", id);
      }
    } catch (e) {
      id = genSessionId();
    }
    sessionIdRef.current = id;
  }, []);

  // organization_fit_started is fired on the user's first answer (real engagement),
  // not on section view, to send it exactly once per real session.

  const choose = (key, value) => {
    if (!firedStarted.current) {
      firedStarted.current = true;
      try {
        base44.analytics.track({ eventName: "organization_fit_started" });
      } catch (err) {
        /* ignore */
      }
    }
    setAnswers((a) => ({ ...a, [key]: value }));
    try {
      base44.analytics.track({ eventName: "organization_fit_step_completed", properties: { step: key } });
    } catch (err) {
      /* ignore */
    }
    setStep((s) => s + 1);
  };

  const reset = () => {
    setAnswers({});
    setForm({ fullName: "", orgName: "", phone: "", email: "", consent: false });
    setError("");
    setStep(0);
  };

  const submit = async () => {
    setError("");
    if (!form.fullName.trim() || !form.orgName.trim() || !form.phone.trim() || !form.email.trim()) {
      setError("נא למלא את כל השדות.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("כתובת האימייל אינה תקינה.");
      return;
    }
    if (!form.consent) {
      setError("נא לאשר את תיבת ההסכמה.");
      return;
    }
    setSubmitting(true);
    const payload = {
      sessionId: sessionIdRef.current,
      orgSize: answers.orgSize,
      welfareState: answers.welfareState,
      upgradeGoal: answers.upgradeGoal,
      fullName: form.fullName.trim(),
      orgName: form.orgName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      consent: true,
      status: "fit_completed",
    };
    try {
      // de-dupe by sessionId — update if a record already exists
      const existing = await base44.entities.OrganizationFitLead.filter({ sessionId: payload.sessionId });
      if (existing && existing.length > 0) {
        await base44.entities.OrganizationFitLead.update(existing[0].id, payload);
      } else {
        await base44.entities.OrganizationFitLead.create(payload);
      }
    } catch (err) {
      // persist failure must not block the funnel — surface a soft message
      setError("שמירת הפרטים נכשלה כרגע. ניתן להמשיך לקביעת הפגישה.");
    }
    try {
      base44.analytics.track({
        eventName: "lead_submitted",
        properties: {
          org_size: payload.orgSize,
          welfare_state: payload.welfareState,
          upgrade_goal: payload.upgradeGoal,
          session_id: payload.sessionId,
        },
      });
    } catch (err) {
      /* ignore */
    }
    try {
      base44.analytics.track({ eventName: "organization_fit_completed" });
    } catch (err) {
      /* ignore */
    }
    setSubmitting(false);
    // reveal the calendar area and scroll to it
    window.dispatchEvent(new CustomEvent("boom_fit_submitted"));
    document.getElementById("book-demo")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const progress = Math.min(step, 3); // 0..3
  const isQuestion = step < 3;
  const isResult = step === 3;
  const isForm = step === 4;

  return (
    <section
      id="organization-fit"
      ref={sectionRef}
      dir="rtl"
      style={{
        background: BG,
        padding: "84px 20px 88px",
        fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif",
        scrollMarginTop: 90,
      }}
    >
      <style>{`
        @media (max-width:768px){ #organization-fit{ scroll-margin-top:72px; padding:64px 16px 72px; } }
        .of-option:hover{ border-color:rgba(244,122,90,0.6) !important; transform:translateY(-2px); box-shadow:0 10px 26px rgba(244,122,90,0.12); }
        .of-option:focus-visible{ outline:3px solid rgba(244,122,90,0.55); outline-offset:2px; }
        .of-input:focus{ border-color:rgba(244,122,90,0.6); box-shadow:0 0 0 3px rgba(244,122,90,0.12); }
      `}</style>

      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ color: CORAL, fontWeight: 600, fontSize: "clamp(15px,1.2vw,18px)", margin: 0, letterSpacing: "-0.01em" }}
        >
          ועכשיו לארגון שלכם
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.06 }}
          style={{
            color: CHARCOAL,
            fontSize: "clamp(30px,4vw,52px)",
            fontWeight: 700,
            lineHeight: 1.06,
            letterSpacing: "-0.025em",
            margin: "12px 0 0",
          }}
        >
          איך בום ביי יכולה <span style={{ color: CORAL }}>לעבוד אצלכם</span>?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.14 }}
          style={{ color: "#3A3C42", fontSize: "clamp(17px,1.4vw,21px)", fontWeight: 400, lineHeight: 1.6, margin: "20px auto 0", maxWidth: 600 }}
        >
          שלוש שאלות קצרות ותקבלו תמונת התאמה ראשונית לארגון.
        </motion.p>

        {/* progress bar — no percentages */}
        <div style={{ marginTop: 34, maxWidth: 360, margin: "34px auto 0", height: 6, borderRadius: 999, background: "rgba(19,21,25,0.10)", overflow: "hidden" }}>
          <motion.div
            animate={{ width: `${((progress + (isForm ? 1 : 0)) / 4) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ height: "100%", background: CORAL, borderRadius: 999 }}
          />
        </div>

        <div style={{ marginTop: 36 }}>
          <AnimatePresence mode="wait">
            {isQuestion && (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <h3 style={{ color: CHARCOAL, fontSize: "clamp(22px,2.6vw,30px)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em", margin: "0 0 24px" }}>
                  {QUESTIONS[step].prompt}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480, margin: "0 auto" }}>
                  {QUESTIONS[step].options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className="of-option"
                      onClick={() => choose(QUESTIONS[step].key, opt)}
                      style={{
                        background: WHITE,
                        border: "1px solid rgba(19,21,25,0.12)",
                        borderRadius: 16,
                        padding: "18px 20px",
                        fontFamily: "inherit",
                        fontSize: "clamp(17px,1.3vw,19px)",
                        fontWeight: 600,
                        color: CHARCOAL,
                        cursor: "pointer",
                        minHeight: 56,
                        textAlign: "right",
                        transition: "transform .18s ease, border-color .18s ease, box-shadow .18s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: 12,
                      }}
                    >
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: CORAL, flex: "0 0 auto" }} />
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {isResult && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <h3 style={{ color: CHARCOAL, fontSize: "clamp(24px,3vw,34px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", margin: "0 0 16px" }}>
                  יש כאן פוטנציאל <span style={{ color: CORAL }}>לשדרוג משמעותי</span>.
                </h3>
                <p style={{ color: "#3A3C42", fontSize: "clamp(17px,1.4vw,21px)", lineHeight: 1.6, margin: "0 auto 28px", maxWidth: 560 }}>
                  {resultText(answers.welfareState)}
                </p>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  style={{
                    background: CHARCOAL, color: "#fff", border: "none", borderRadius: 999, height: 56,
                    minWidth: 240, maxWidth: 360, padding: "0 30px", fontFamily: "inherit",
                    fontWeight: 700, fontSize: "clamp(16px,1.1vw,18px)", cursor: "pointer",
                    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                    boxShadow: "0 10px 28px rgba(23,25,29,0.18)",
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: CORAL, display: "inline-block", flexShrink: 0 }} />
                  המשך
                </button>
                <div style={{ marginTop: 14 }}>
                  <button type="button" onClick={reset} style={{ background: "none", border: "none", color: "#6E7177", fontFamily: "inherit", fontSize: 15, cursor: "pointer", textDecoration: "underline" }}>
                    להתחיל מחדש
                  </button>
                </div>
              </motion.div>
            )}

            {isForm && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: EASE }}
                style={{ maxWidth: 480, margin: "0 auto", textAlign: "right" }}
              >
                <h3 style={{ color: CHARCOAL, fontSize: "clamp(22px,2.6vw,30px)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em", margin: "0 0 8px", textAlign: "center" }}>
                  בואו נראה איך זה יכול להיראות אצלכם.
                </h3>
                <p style={{ color: "#6E7177", fontSize: 16, margin: "0 0 22px", textAlign: "center" }}>
                  מלאו פרטים קצרים ונציג בפניכם התאמה בשיחת 15 דקות.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input className="of-input" style={inputStyle} placeholder="שם מלא" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                  <input className="of-input" style={inputStyle} placeholder="שם הארגון" value={form.orgName} onChange={(e) => setForm({ ...form, orgName: e.target.value })} />
                  <input className="of-input" style={inputStyle} placeholder="טלפון" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  <input className="of-input" style={inputStyle} placeholder="אימייל" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15, color: "#3A3C42", cursor: "pointer", lineHeight: 1.5, marginTop: 4 }}>
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      style={{ width: 20, height: 20, marginTop: 2, accentColor: CORAL, flex: "0 0 auto" }}
                    />
                    <span>אני מאשר/ת לבום ביי ליצור איתי קשר בנוגע להדגמת המערכת.</span>
                  </label>

                  {error && <p style={{ color: "#C0392B", fontSize: 15, margin: "4px 0 0" }}>{error}</p>}

                  <button
                    type="button"
                    onClick={submit}
                    disabled={submitting}
                    style={{
                      background: submitting ? "rgba(19,21,25,0.6)" : CHARCOAL,
                      color: "#fff", border: "none", borderRadius: 999, height: 56,
                      padding: "0 30px", fontFamily: "inherit", fontWeight: 700,
                      fontSize: "clamp(16px,1.1vw,18px)", cursor: submitting ? "wait" : "pointer",
                      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                      boxShadow: "0 10px 28px rgba(23,25,29,0.18)", marginTop: 6,
                    }}
                  >
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: CORAL, display: "inline-block", flexShrink: 0 }} />
                    להציג לי התאמה ב-15 דקות
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}