import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";

const ORG_SIZE_OPTIONS = [
  { label: "עד 50 עובדים" },
  { label: "50-250 עובדים" },
  { label: "250-1000 עובדים" },
  { label: "1000+ עובדים" },
];

const HOLIDAY_BUDGET_OPTIONS = [
  { label: "200-400 ₪" },
  { label: "400-600 ₪" },
  { label: "600+ ₪" },
  { label: "לא מקבלים מתנות" },
];

const PAIN_POINTS_OPTIONS = [
  { label: "סופר ופארם" },
  { label: "חשמל וטקסטיל" },
  { label: "דלק" },
  { label: "חופשות" },
];



function SurveyLetterCopy({ orgName, orgKey }) {
  const [copied, setCopied] = React.useState(false);
  const letter = `שלום,\n\nאנחנו קבוצה של עובדים מ-${orgName} שמעוניינת לבחון צירוף של BoomBuy לארגון שלנו.\n\nמדובר בשכבה נוספת של הטבות וערך כלכלי מתמשך לאורך השנה — בהוצאות כמו סופר, פארם, חשמל, חופשות ומותגים.\n\nBoomBuy לא באה במקום מתנות חג או פעילות רווחה קיימת, אלא בנוסף. המטרה היא לאפשר לעובדים ליהנות מיותר ערך כלכלי בלי להכביד על המעסיק.\n\nנשמח לבדוק התאמה קצרה.\n\nלינק לעמוד הבקשה:\n${window.location.origin}/join/${orgKey}`;
  const handleCopy = () => {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{ background: "#fff", borderRadius: "18px", border: "1px solid rgba(0,0,0,0.07)", padding: "20px" }}>
      <p style={{ fontSize: "13px", fontWeight: 700, marginBottom: "10px", fontFamily: "var(--font-heebo)", color: "#1D1D1F" }}>מכתב מוכן ל-HR / הנהלה</p>
      <div style={{ background: "#F5F5F7", borderRadius: "10px", padding: "12px 14px", fontSize: "12px", color: "#444", lineHeight: 1.65, fontFamily: "var(--font-heebo)", marginBottom: "10px", whiteSpace: "pre-line", maxHeight: "120px", overflowY: "auto" }}>
        {letter}
      </div>
      <button
        onClick={handleCopy}
        style={{ background: copied ? "#34C759" : "#0066CC", color: "#fff", fontWeight: 700, fontSize: "13px", padding: "10px 18px", borderRadius: "10px", border: "none", cursor: "pointer", fontFamily: "var(--font-heebo)", transition: "background 0.15s" }}
      >
        {copied ? "הועתק!" : "העתק מכתב ל-HR"}
      </button>
    </div>
  );
}

const normalizeOrgKey = (name) =>
  name
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/[^\u0590-\u05FF\u200F\u200Ea-z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "_");

function getBrowserToken() {
  let token = localStorage.getItem("boomBuyBrowserToken");
  if (!token) {
    token = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("boomBuyBrowserToken", token);
  }
  return token;
}

export default function Survey() {
  // ALL hooks must come before any conditional return
  const [step, setStep] = useState(0);
  const [orgName, setOrgName] = useState("");
  const [orgSize, setOrgSize] = useState("");
  const [holidayBudget, setHolidayBudget] = useState("");
  const [painPoint, setPainPoint] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultText, setResultText] = useState("");
  const [initiatorName, setInitiatorName] = useState("");
  const [initiatorPhone, setInitiatorPhone] = useState("");
  const [initiatorEmail, setInitiatorEmail] = useState("");
  const [hasUnion, setHasUnion] = useState("");
  const [myMemberId, setMyMemberId] = useState("");
  const [stepHistory, setStepHistory] = useState([]);



  const isLocked = step === "result";

  const goBack = () => {
    if (isLocked || stepHistory.length === 0) return;
    const prev = stepHistory[stepHistory.length - 1];
    setStepHistory(stepHistory.slice(0, -1));
    setStep(prev);
  };

  const advance = (nextStep) => {
    if (isLocked) return;
    setStepHistory((h) => [...h, step]);
    setStep(nextStep);
  };

  const handleOrgNameNext = () => {
    if (!orgName.trim()) return;
    advance(1);
  };

  const handleOrgSize = (label) => { setOrgSize(label); advance(2); };
  const handleBudget = (label) => { setHolidayBudget(label); advance(3); };
  const handlePainPoint = (label) => { setPainPoint(label); advance(4); };

  const getResultFraming = (painPoint) => {
    if (painPoint === "סופר ופארם")
      return "הנתונים מראים שיוקר המחיה היומיומי הוא הכאב המרכזי. הטבות הסופר והפארם של BoomBuy יהיו ההשפעה המיידית והמורגשת ביותר עבור העובדים שלכם.";
    if (painPoint === "חופשות")
      return "חופשות ונסיעות הן הכאב המרכזי. חבילות הנופש הבלעדיות של BoomBuy יהיו ההטבה הכי חזקה עבור הארגון שלכם.";
    if (painPoint === "חשמל וטקסטיל")
      return "מוצרי חשמל ומותגים הם הכאב המרכזי. מחירי היבואן של BoomBuy על Apple, Samsung ועוד יהיו ההבדל הכי גדול עבורכם.";
    return "נראה שהטבות יוקר המחיה — הנחות בסופר, פארם ומוצרי יומיום — יהיו המשמעותיות ביותר עבור העובדים בארגון שלכם.";
  };

  const handleFinish = async () => {
    setLoading(true);
    const finalActivities = [painPoint].filter(Boolean);
    const orgKey = normalizeOrgKey(orgName);
    const browserToken = getBrowserToken();
    try {
      const existing = await base44.entities.GroupRequest.filter({ orgKey });
      if (existing.length > 0) {
        await base44.entities.GroupRequest.update(existing[0].id, {
          orgSize,
          holidayBudget,
          painPoint,
          activities: finalActivities,
          lastJoinedAt: new Date().toISOString(),
        });
        const joinedOrgs = JSON.parse(localStorage.getItem("boomBuyJoinedOrgs") || "{}");
        joinedOrgs[orgKey] = true;
        localStorage.setItem("boomBuyJoinedOrgs", JSON.stringify(joinedOrgs));
      } else {
        const newGroup = await base44.entities.GroupRequest.create({
          orgName: orgName.trim(),
          orgKey,
          orgNameNormalized: orgKey,
          source: "employees",
          currentCount: 1,
          lastJoinedAt: new Date().toISOString(),
          orgSize,
          holidayBudget,
          painPoint,
          activities: finalActivities,
          hasUnion,
          initiatorName: initiatorName.trim() || "לא ידוע",
          initiatorPhone: initiatorPhone.trim() || undefined,
          initiatorEmail: initiatorEmail.trim() || undefined,
        });
        const firstMember = await base44.entities.GroupMember.create({
          groupRequestId: newGroup.id,
          orgKey,
          orgName: orgName.trim(),
          memberName: initiatorName.trim() || "לא ידוע",
          memberPhone: initiatorPhone.trim() || undefined,
          browserToken,
          source: "initiator",
          isInitiator: true,
        });
        await base44.entities.GroupRequest.update(newGroup.id, {
          initiatorMemberId: firstMember.id,
          rewardEligibleMemberId: firstMember.id,
        });
        localStorage.setItem(`groupmember_${orgKey}`, firstMember.id);
        const joinedOrgs = JSON.parse(localStorage.getItem("boomBuyJoinedOrgs") || "{}");
        joinedOrgs[orgKey] = true;
        localStorage.setItem("boomBuyJoinedOrgs", JSON.stringify(joinedOrgs));
        setMyMemberId(firstMember.id);
        base44.functions.invoke("notifyGroupMilestones", { event: "org_created", orgKey, prevCount: 0, newCount: 1 }).catch(() => {});
      }
      const framing = getResultFraming(painPoint);
      setResultText(framing);
      setStep("result");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="survey-section"
      style={{
        background: "#F5F5F7",
        overflowX: "hidden",
        maxWidth: "100vw",
        padding: "60px 16px",
      }}
    >
      <div className="max-w-xl mx-auto">


        {/* Header */}
        <div className="text-center mb-10">
          <h2
            style={{
              fontSize: "clamp(28px, 5vw, 36px)",
              fontWeight: 900,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              marginBottom: "10px",
              fontFamily: "var(--font-heebo)",
            }}
          >
            אני רוצה שהארגון שלי יצטרף ל-BoomBuy
          </h2>
          <p style={{ fontSize: "15px", color: "#86868B", fontFamily: "var(--font-heebo)" }}>
            כמה שאלות קצרות לפני שנפתח בקשה לארגון
          </p>

          {step > 0 && step !== "result" && typeof step === "number" && (
            <button onClick={goBack} style={{ marginTop: 8, background: "none", border: "none", color: "#AEAEB2", fontSize: 13, cursor: "pointer", fontFamily: "var(--font-heebo)" }}>
              ← חזרה
            </button>
          )}
          <div style={{ display: "inline-block", background: "rgba(0,102,204,0.08)", border: "1px solid rgba(0,102,204,0.15)", borderRadius: "999px", padding: "5px 16px", marginTop: "10px" }}>
            <span style={{ fontSize: "12.5px", fontWeight: 600, color: "#0066CC", fontFamily: "var(--font-heebo)" }}>מתאים בעיקר לארגונים עם 100+ עובדים</span>
          </div>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: "28px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
              color: "#86868B",
              marginBottom: "6px",
              fontFamily: "var(--font-heebo)",
            }}
          >
            <span>{step === "result" ? "הושלם" : `שלב ${Math.min(step + 1, 4)} מתוך 4`}</span>
          </div>
          <div
            style={{
              height: "3px",
              background: "rgba(0,0,0,0.1)",
              borderRadius: "9999px",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                background: "#0066CC",
                borderRadius: "9999px",
              }}
              initial={{ width: 0 }}
              animate={{ width: step === "result" ? "100%" : `${((Math.min(step, 3) + 1) / 4) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-16 gap-4">
              <div style={{ width: 48, height: 48, border: "3px solid rgba(0,102,204,0.12)", borderTopColor: "#0066CC", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              <p style={{ color: "#0066CC", fontSize: "15px", fontWeight: 700, fontFamily: "var(--font-heebo)" }}>מנתח נתוני ארגון...</p>
            </motion.div>
          ) : step === 0 ? (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 24, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -24, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  marginBottom: "16px",
                  textAlign: "center",
                  fontFamily: "var(--font-heebo)",
                }}
              >
                מה שם הארגון שלך?
              </h3>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleOrgNameNext()}
                placeholder="לדוגמה: לאומי, טבע, מכבי..."
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: "16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: "#fff",
                  fontFamily: "var(--font-heebo)",
                  outline: "none",
                  marginBottom: "12px",
                  textAlign: "right",
                  boxSizing: "border-box",
                }}
                autoFocus
              />
              <button
                onClick={handleOrgNameNext}
                disabled={!orgName.trim()}
                style={{
                  width: "100%",
                  background: orgName.trim() ? "#0066CC" : "#C7C7CC",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "15px",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  cursor: orgName.trim() ? "pointer" : "default",
                  fontFamily: "var(--font-heebo)",
                  transition: "background 0.16s",
                }}
              >
                המשך
              </button>
            </motion.div>
          ) : step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 24, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -24, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  marginBottom: "16px",
                  textAlign: "center",
                  fontFamily: "var(--font-heebo)",
                }}
              >
                כמה עובדים יש ב{orgName}?
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {ORG_SIZE_OPTIONS.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleOrgSize(opt.label)}
                    style={{
                      background: "#fff",
                      border: "1px solid rgba(0,0,0,0.1)",
                      borderRadius: "12px",
                      padding: "14px 18px",
                      fontSize: "15px",
                      fontWeight: 500,
                      fontFamily: "var(--font-heebo)",
                      textAlign: "right",
                      cursor: "pointer",
                      transition: "border-color 0.15s, background 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#0066CC";
                      e.currentTarget.style.background = "#F0F6FF";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)";
                      e.currentTarget.style.background = "#fff";
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : step === 2 ? (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 24, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -24, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  marginBottom: "16px",
                  textAlign: "center",
                  fontFamily: "var(--font-heebo)",
                }}
              >
                מה התקציב המשוער למתנת חג לעובד?
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {HOLIDAY_BUDGET_OPTIONS.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleBudget(opt.label)}
                    style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "12px", padding: "14px 18px", fontSize: "15px", fontWeight: 500, fontFamily: "var(--font-heebo)", textAlign: "right", cursor: "pointer", transition: "border-color 0.15s, background 0.15s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#0066CC"; e.currentTarget.style.background = "#F0F6FF"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; e.currentTarget.style.background = "#fff"; }}
                  >
                    <bdi dir="ltr">{opt.label}</bdi>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : step === 3 ? (
            <motion.div key="step3" initial={{ opacity: 0, x: 24, filter: "blur(4px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: -24, filter: "blur(4px)" }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px", textAlign: "center", fontFamily: "var(--font-heebo)" }}>
                איפה העובדים הכי מרגישים את יוקר המחיה?
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {PAIN_POINTS_OPTIONS.map((opt) => (
                  <button key={opt.label} onClick={() => handlePainPoint(opt.label)}
                    style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "12px", padding: "14px 18px", fontSize: "15px", fontWeight: 500, fontFamily: "var(--font-heebo)", textAlign: "right", cursor: "pointer" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#0066CC"; e.currentTarget.style.background = "#F0F6FF"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; e.currentTarget.style.background = "#fff"; }}
                  >{opt.label}</button>
                ))}
              </div>
            </motion.div>
          ) : step === 4 ? (
            <motion.div key="step4" initial={{ opacity: 0, x: 24, filter: "blur(4px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: -24, filter: "blur(4px)" }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "6px", textAlign: "center", fontFamily: "var(--font-heebo)" }}>
                ועוד שאלה אחרונה
              </h3>
              <p style={{ fontSize: "13px", color: "#86868B", textAlign: "center", marginBottom: "16px", fontFamily: "var(--font-heebo)" }}>
                האם יש בארגון שלך ועד עובדים או התאגדות?
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                {["כן, יש ועד פעיל", "יש משהו לא רשמי", "אין ועד"].map(opt => (
                  <button key={opt} onClick={() => setHasUnion(opt)}
                    style={{ background: hasUnion === opt ? "#EBF3FF" : "#fff", border: `1px solid ${hasUnion === opt ? "#0066CC" : "rgba(0,0,0,0.1)"}`, borderRadius: "12px", padding: "13px 18px", fontSize: "15px", fontWeight: 500, fontFamily: "var(--font-heebo)", textAlign: "right", cursor: "pointer" }}>
                    {opt}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: "13px", color: "#86868B", textAlign: "center", marginBottom: "12px", fontFamily: "var(--font-heebo)" }}>
                השם והטלפון שלכם עוזרים לנו להתאים את ההצעה ולחזור אליכם בצורה האישית ביותר.
              </p>
              <input
                type="text"
                value={initiatorName}
                onChange={(e) => setInitiatorName(e.target.value)}
                placeholder="השם שלך (שם + משפחה)"
                style={{ width: "100%", padding: "13px 15px", fontSize: "15px", borderRadius: "11px", border: "1px solid rgba(0,0,0,0.12)", background: "#fff", fontFamily: "var(--font-heebo)", marginBottom: "10px", textAlign: "right", boxSizing: "border-box" }}
              />
              <input
                type="tel"
                value={initiatorPhone}
                onChange={(e) => setInitiatorPhone(e.target.value)}
                placeholder="מספר הטלפון שלך"
                style={{ width: "100%", padding: "13px 15px", fontSize: "15px", borderRadius: "11px", border: "1px solid rgba(0,0,0,0.12)", background: "#fff", fontFamily: "var(--font-heebo)", marginBottom: "10px", textAlign: "right", boxSizing: "border-box" }}
              />
              <input
                type="email"
                value={initiatorEmail}
                onChange={(e) => setInitiatorEmail(e.target.value)}
                placeholder="כתובת מייל (אופציונלי)"
                style={{ width: "100%", padding: "13px 15px", fontSize: "15px", borderRadius: "11px", border: "1px solid rgba(0,0,0,0.12)", background: "#fff", fontFamily: "var(--font-heebo)", marginBottom: "14px", textAlign: "right", boxSizing: "border-box" }}
              />
              <button
                onClick={handleFinish}
                disabled={loading}
                style={{ width: "100%", background: "#0066CC", color: "#fff", fontWeight: 700, fontSize: "15px", padding: "14px", borderRadius: "12px", border: "none", cursor: "pointer", fontFamily: "var(--font-heebo)", marginBottom: "10px" }}
              >
                סיימו וקבלו לינק לשיתוף ←
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28 }}
            >
              <div style={{ textAlign: "center", marginBottom: "14px" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✅</div>
                <h3 style={{ fontSize: "22px", fontWeight: 900, marginBottom: "14px", letterSpacing: "-0.02em", fontFamily: "var(--font-heebo)", color: "#1D1D1F" }}>
                  תוצאה מותאמת לארגון שלכם
                </h3>
              </div>
              <div style={{ background: "rgba(0,102,204,0.06)", border: "1px solid rgba(0,102,204,0.18)", borderRadius: 14, padding: "18px 20px", marginBottom: 20 }}>
                <p style={{ fontSize: 16, fontWeight: 600, color: "#0066CC", lineHeight: 1.55, margin: 0, fontFamily: "var(--font-heebo)" }}>{resultText}</p>
              </div>

              <div style={{ background: "rgba(0,102,204,0.06)", border: "1px solid rgba(0,102,204,0.18)", borderRadius: 20, padding: "18px 20px", textAlign: "center" }}>
                <p style={{ fontSize: 28, fontWeight: 900, color: "#0066CC", marginBottom: 4, fontFamily: "var(--font-heebo)" }}>80%</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#1D1D1F", marginBottom: 10, lineHeight: 1.45, fontFamily: "var(--font-heebo)" }}>
                  ככל שיותר עובדים יצטרפו לבקשה — כך גדל הסיכוי שהארגון יאמץ את הפלטפורמה
                </p>
                <p style={{ fontSize: 12, color: "#86868B", marginBottom: 14, fontFamily: "var(--font-heebo)" }}>מומלץ — מגדיל ב-80% את הסיכוי לקדם</p>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `היי 👋\n\nהצטרפתי לבקשה להכניס את BoomBuy לארגון שלנו.\n\nזה אומר הטבות אמיתיות לאורך השנה — סופר, חשמל, חופשות ועוד — בלי שהארגון משלם שקל נוסף.\n\nרוצה לדעת כמה הנטו שלך יכול לגדול? לחץ כאן:\n${window.location.origin}/join/${normalizeOrgKey(orgName)}${myMemberId ? "?ref=" + myMemberId : ""}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "block", background: "#25D366", color: "#fff", textDecoration: "none", padding: "14px", borderRadius: 14, fontSize: 15, fontWeight: 800, marginBottom: 10, fontFamily: "var(--font-heebo)" }}
                >
                  שתפו עמיתים בוואטסאפ ← (מומלץ)
                </a>

                <button
                  onClick={() => { window.location.href = "/join/" + normalizeOrgKey(orgName); }}
                  style={{ width: "100%", background: "#0066CC", color: "#fff", fontWeight: 700, fontSize: 14, padding: "13px", borderRadius: 13, border: "none", cursor: "pointer", fontFamily: "var(--font-heebo)" }}
                >
                  עבור לעמוד הבקשה שלכם
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}