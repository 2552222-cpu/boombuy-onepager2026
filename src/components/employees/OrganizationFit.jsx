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

const TOTAL_STEPS = 4; // 3 questions + details form

function genSessionId() {
  try {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
  } catch (e) {
    /* ignore */
  }
  return "fit-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
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

const labelStyle = {
  display: "block",
  fontSize: 15,
  fontWeight: 600,
  color: "#3A3C42",
  marginBottom: 6,
  textAlign: "right",
};

export default function OrganizationFit() {
  const sectionRef = useRef(null);
  const firedView = useRef(false);
  const firedStarted = useRef(false);
  const [step, setStep] = useState(0); // 0..2 questions, 3 = details form
  const [answers, setAnswers] = useState({});
  const [form, setForm] = useState({ fullName: "", orgName: "", phone: "", email: "", consent: false });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const lockRef = useRef(false); // prevents skipping a question on double-click
  const submittedRef = useRef(false); // prevents double submission

  // organization_fit_started fires on the user's first real answer (exactly once)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !firedView.current) {
            firedView.current = true;
            try {
              base44.analytics.track({ eventName: "organization_fit_viewed" });
            } catch (err) {
              /* ignore */
            }
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const choose = (key, value) => {
    if (lockRef.current) return; // ignore rapid double-clicks
    lockRef.current = true;
    window.setTimeout(() => {
      lockRef.current = false;
    }, 300);
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

  const back = () => {
    if (lockRef.current) return;
    lockRef.current = true;
    window.setTimeout(() => {
      lockRef.current = false;
    }, 200);
    setError("");
    setStep((s) => Math.max(0, s - 1));
  };

  const submit = async () => {
    if (submitting || submittedRef.current) return;
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
    // Fresh id per submission — never overwrite a previous lead via a fixed browser id.
    const sessionId = genSessionId();
    const payload = {
      sessionId,
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
      await base44.entities.OrganizationFitLead.create(payload);
    } catch (err) {
      // Save failed: keep the details, surface a clear retry, do NOT report success or advance.
      setSubmitting(false);
      setError("שמירת הפרטים נכשלה. נא לנסות שוב בעוד רגע.");
      return;
    }
    // Only on a successful save: report events and advance.
    submittedRef.current = true;
    setSubmitting(false);
    setSubmitted(true);
    try {
      base44.analytics.track({
        eventName: "lead_submitted",
        properties: {
          org_size: payload.orgSize,
          welfare_state: payload.welfareState,
          upgrade_goal: payload.upgradeGoal,
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
    window.dispatchEvent(new CustomEvent("boom_fit_submitted"));
    window.setTimeout(() => {
      document.getElementById("book-demo")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  const isQuestion = step < 3;
  const isForm = step === 3;
  const progress = Math.min(step + 1, TOTAL_STEPS);

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
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{
            color: CHARCOAL,
            fontSize: "clamp(30px,4vw,52px)",
            fontWeight: 700,
            lineHeight: 1.06,
            letterSpacing: "-0.025em",
            margin: 0,
          }}
        >
          בדיקת <span style={{ color: CORAL }}>התאמה</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
          style={{ color: "#3A3C42", fontSize: "clamp(16px,1.4vw,20px)", fontWeight: 400, lineHeight: 1.6, margin: "16px auto 0", maxWidth: 600 }}
        >
          3 שאלות קצרות לקראת הדגמה של 15 דקות.
        </motion.p>

        <div style={{ marginTop: 30, maxWidth: 360, margin: "30px auto 0", height: 6, borderRadius: 999, background: "rgba(19,21,25,0.10)", overflow: "hidden" }}>
          <motion.div
            animate={{ width: `${(progress / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ height: "100%", background: CORAL, borderRadius: 999 }}
          />
        </div>

        <div style={{ marginTop: 34 }}>
          <AnimatePresence mode="wait">
            {isQuestion && (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <h3 style={{ color: CHARCOAL, fontSize: "clamp(22px,2.6vw,30px)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em", margin: "0 0 22px" }}>
                  {QUESTIONS[step].prompt}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480, margin: "0 auto" }}>
                  {QUESTIONS[step].options.map((opt) => {
                    const selected = answers[QUESTIONS[step].key] === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        className="of-option"
                        onClick={() => choose(QUESTIONS[step].key, opt)}
                        aria-pressed={selected}
                        style={{
                          background: WHITE,
                          border: selected ? "1.5px solid rgba(244,122,90,0.7)" : "1px solid rgba(19,21,25,0.12)",
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
                    );
                  })}
                </div>
                {step > 0 && (
                  <button type="button" onClick={back} style={{ marginTop: 18, background: "none", border: "none", color: "#6E7177", fontFamily: "inherit", fontSize: 15, cursor: "pointer", textDecoration: "underline" }}>
                    חזרה לשאלה הקודמת
                  </button>
                )}
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
                <h3 style={{ color: CHARCOAL, fontSize: "clamp(22px,2.6vw,30px)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em", margin: "0 0 6px", textAlign: "center" }}>
                  כמה פרטים ונתאם שיחה
                </h3>
                <p style={{ color: "#6E7177", fontSize: 16, margin: "0 0 22px", textAlign: "center" }}>
                  ניצור איתכם קשר לתיאום הדגמה של 15 דקות.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label htmlFor="of-fullname" style={labelStyle}>שם מלא</label>
                    <input id="of-fullname" name="fullName" autoComplete="name" className="of-input" style={inputStyle} placeholder="שם מלא" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="of-orgname" style={labelStyle}>שם הארגון</label>
                    <input id="of-orgname" name="organization" autoComplete="organization" className="of-input" style={inputStyle} placeholder="שם הארגון" value={form.orgName} onChange={(e) => setForm({ ...form, orgName: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="of-phone" style={labelStyle}>טלפון</label>
                    <input id="of-phone" name="phone" type="tel" autoComplete="tel" className="of-input" style={inputStyle} placeholder="טלפון" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="of-email" style={labelStyle}>אימייל</label>
                    <input id="of-email" name="email" type="email" autoComplete="email" className="of-input" style={inputStyle} placeholder="אימייל" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>

                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15, color: "#3A3C42", cursor: "pointer", lineHeight: 1.5, marginTop: 4 }}>
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      style={{ width: 20, height: 20, marginTop: 2, accentColor: CORAL, flex: "0 0 auto" }}
                    />
                    <span>אני מאשר/ת לבום ביי ליצור איתי קשר בנוגע להדגמת המערכת.</span>
                  </label>

                  {error && <p role="alert" style={{ color: "#C0392B", fontSize: 15, margin: "4px 0 0" }}>{error}</p>}

                  <button
                    type="button"
                    onClick={submit}
                    disabled={submitting}
                    style={{
                      background: submitting ? "rgba(19,21,25,0.6)" : CHARCOAL,
                      color: "#fff",
                      border: "none",
                      borderRadius: 999,
                      height: 56,
                      padding: "0 30px",
                      fontFamily: "inherit",
                      fontWeight: 700,
                      fontSize: "clamp(16px,1.1vw,18px)",
                      cursor: submitting ? "wait" : "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      boxShadow: "0 10px 28px rgba(23,25,29,0.18)",
                      marginTop: 6,
                    }}
                  >
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: CORAL, display: "inline-block", flexShrink: 0 }} />
                    {submitting ? "שומר…" : "שליחה ותיאום הדגמה"}
                  </button>

                  <button type="button" onClick={back} style={{ background: "none", border: "none", color: "#6E7177", fontFamily: "inherit", fontSize: 15, cursor: "pointer", textDecoration: "underline", marginTop: 4 }}>
                    חזרה לשאלה הקודמת
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