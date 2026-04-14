import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";

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

const CURRENT_CLUB_OPTIONS = [
  { label: "יש מועדון חזק" },
  { label: "יש משהו בסיסי" },
  { label: "אין כלום כרגע" },
];

const PAIN_POINTS_OPTIONS = [
  { label: "סופר ופארם" },
  { label: "חשמל וטקסטיל" },
  { label: "דלק" },
  { label: "חופשות" },
];

const WELFARE_BUDGET_OPTIONS = [
  { label: "כן, יש תקציבים (ימי הולדת, משפחה וכו׳)" },
  { label: "רק ימי גיבוש" },
  { label: "לא ממש" },
];

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
  const [step, setStep] = useState(0);
  const [orgName, setOrgName] = useState("");
  const [orgSize, setOrgSize] = useState("");
  const [holidayBudget, setHolidayBudget] = useState("");
  const [currentClub, setCurrentClub] = useState("");
  const [painPoint, setPainPoint] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultText, setResultText] = useState("");
  const [welfareBudget, setWelfareBudget] = useState("");
  const [initiatorName, setInitiatorName] = useState("");
  const [initiatorPhone, setInitiatorPhone] = useState("");
  const [myMemberId, setMyMemberId] = useState("");
  const [stepHistory, setStepHistory] = useState([]);
  const navigate = useNavigate();

  const goBack = () => {
    if (stepHistory.length === 0) return;
    const prev = stepHistory[stepHistory.length - 1];
    setStepHistory(stepHistory.slice(0, -1));
    setStep(prev);
  };

  const advance = (nextStep) => {
    setStepHistory((h) => [...h, step]);
    setStep(nextStep);
  };

  const handleOrgNameNext = () => {
    if (!orgName.trim()) return;
    advance(1);
  };

  const handleOrgSize = (label) => { setOrgSize(label); advance(2); };
  const handleBudget = (label) => { setHolidayBudget(label); advance(3); };
  const handleClub = (label) => { setCurrentClub(label); advance(4); };
  const handleWelfareBudget = (label) => { setWelfareBudget(label); advance(5); };
  const handlePainPoint = (label) => { setPainPoint(label); advance(6); };

  const getResultFraming = (painPoint, currentClub, welfareBudget) => {
    if (painPoint === "סופר ופארם")
      return "הנתונים מראים שיוקר המחיה היומיומי הוא הכאב המרכזי. הטבות הסופר והפארם של BoomBuy יהיו ההשפעה המיידית והמורגשת ביותר עבור העובדים שלכם.";
    if (painPoint === "חופשות")
      return "חופשות ונסיעות הן הכאב המרכזי. חבילות הנופש הבלעדיות של BoomBuy יהיו ההטבה הכי חזקה עבור הארגון שלכם.";
    if (painPoint === "חשמל וטקסטיל")
      return "מוצרי חשמל ומותגים הם הכאב המרכזי. מחירי היבואן של BoomBuy על Apple, Samsung ועוד יהיו ההבדל הכי גדול עבורכם.";
    if (currentClub === "אין כלום כרגע")
      return "ארגון שמתחיל מאפס יראה את השיפור המשמעותי ביותר. BoomBuy יכולה להפוך את הרווחה שלכם ממצב חלקי למערכת הטבות מלאה.";
    if (welfareBudget === "לא ממש")
      return "גם בלי תקציב נוסף, BoomBuy מייצרת ערך אמיתי לעובדים. זה בדיוק המודל שמתאים לכם.";
    return "נראה שהטבות יוקר המחיה — הנחות בסופר, פארם ומוצרי יומיום — יהיו המשמעותיות ביותר עבור העובדים בארגון שלכם.";
  };

  const handleFinish = async () => {
    setLoading(true);
    const finalActivities = [painPoint, currentClub, welfareBudget].filter(Boolean);
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
          initiatorName: initiatorName.trim() || "לא ידוע",
          initiatorPhone: initiatorPhone.trim() || undefined,
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
      const framing = getResultFraming(painPoint, currentClub, welfareBudget);
      setResultText(framing);
      setStep(7);
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
          {step > 0 && step < 7 && (
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
            <span>שלב {Math.min(step + 1, 6)} מתוך 6</span>
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
              animate={{ width: `${((Math.min(step, 5) + 1) / 6) * 100}%` }}
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
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28 }}
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
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28 }}
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
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28 }}
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
            <motion.div key="step3" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.28 }}>
              <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px", textAlign: "center", fontFamily: "var(--font-heebo)" }}>
                האם קיים כיום מועדון הטבות?
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {CURRENT_CLUB_OPTIONS.map((opt) => (
                  <button key={opt.label} onClick={() => handleClub(opt.label)}
                    style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "12px", padding: "14px 18px", fontSize: "15px", fontWeight: 500, fontFamily: "var(--font-heebo)", textAlign: "right", cursor: "pointer", transition: "border-color 0.15s, background 0.15s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#0066CC"; e.currentTarget.style.background = "#F0F6FF"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; e.currentTarget.style.background = "#fff"; }}
                  >{opt.label}</button>
                ))}
              </div>
            </motion.div>
          ) : step === 4 ? (
            <motion.div key="step4" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.28 }}>
              <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px", textAlign: "center", fontFamily: "var(--font-heebo)" }}>
                האם יש תקציבי רווחה נוספים?
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {WELFARE_BUDGET_OPTIONS.map((opt) => (
                  <button key={opt.label} onClick={() => handleWelfareBudget(opt.label)}
                    style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "12px", padding: "14px 18px", fontSize: "15px", fontWeight: 500, fontFamily: "var(--font-heebo)", textAlign: "right", cursor: "pointer" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#0066CC"; e.currentTarget.style.background = "#F0F6FF"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; e.currentTarget.style.background = "#fff"; }}
                  >{opt.label}</button>
                ))}
              </div>
            </motion.div>
          ) : step === 5 ? (
            <motion.div key="step5" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.28 }}>
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
          ) : step === 6 ? (
            <motion.div key="step6" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.28 }}>
              <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "6px", textAlign: "center", fontFamily: "var(--font-heebo)" }}>
                ספרו לנו קצת עליכם
              </h3>
              <p style={{ fontSize: "13px", color: "#86868B", textAlign: "center", marginBottom: "18px", fontFamily: "var(--font-heebo)" }}>
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
              <div style={{ textAlign: "center", padding: "8px 0 24px" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
                <h3 style={{ fontSize: "22px", fontWeight: 900, marginBottom: "14px", fontFamily: "var(--font-heebo)", letterSpacing: "-0.02em", color: "#1D1D1F" }}>
                  הבקשה נשלחה בהצלחה
                </h3>
                <p style={{ fontSize: "15px", color: "#6E6E73", lineHeight: 1.6, marginBottom: "28px", fontFamily: "var(--font-heebo)" }}>
                  {resultText}
                </p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  style={{ width: "100%", background: "#0066CC", color: "#fff", fontWeight: 700, fontSize: "15px", padding: "15px", borderRadius: "12px", border: "none", cursor: "pointer", fontFamily: "var(--font-heebo)", boxShadow: "0 6px 20px rgba(0,102,204,0.24)" }}
                >
                  חזרה לעמוד ההטבות
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}