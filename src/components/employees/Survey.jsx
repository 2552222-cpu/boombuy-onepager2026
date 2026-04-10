import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";

const ORG_SIZE_OPTIONS = [
  { label: "עד 50 עובדים" },
  { label: "50–250 עובדים" },
  { label: "250–1000 עובדים" },
  { label: "1000+ עובדים" },
];

const HOLIDAY_BUDGET_OPTIONS = [
  { label: "200₪–400₪" },
  { label: "400₪–600₪" },
  { label: "600₪+" },
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

const ACTIVITIES_OPTIONS = ["ימי גיבוש", "מתנות חג", "ימי הולדת", "יום המשפחה"];

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

export default function Survey() {
  const [step, setStep] = useState(0);
  const [orgName, setOrgName] = useState("");
  const [orgSize, setOrgSize] = useState("");
  const [holidayBudget, setHolidayBudget] = useState("");
  const [currentClub, setCurrentClub] = useState("");
  const [painPoint, setPainPoint] = useState("");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultText, setResultText] = useState("");
  const [welfareBudget, setWelfareBudget] = useState("");
  const [hrName, setHrName] = useState("");
  const [hrPhone, setHrPhone] = useState("");
  const navigate = useNavigate();

  const handleOrgNameNext = () => {
    if (!orgName.trim()) return;
    setStep(1);
  };

  const handleOrgSize = (label) => {
    setOrgSize(label);
    setStep(2);
  };

  const handleBudget = (label) => {
    setHolidayBudget(label);
    setStep(3);
  };

  const handleClub = (label) => {
    setCurrentClub(label);
    setStep(4);
  };

  const handleWelfareBudget = (label) => {
    setWelfareBudget(label);
    setStep(5);
  };

  const handlePainPoint = (label) => {
    setPainPoint(label);
    setStep(6);
  };

  const toggleActivity = (a) => {
    setActivities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  };

  const getResultFraming = (budget, acts) => {
    if (acts.includes("מתנות חג")) {
      return "נראה שמתנת חג גמישה עם בחירה חופשית תהיה ההטבה המשמעותית ביותר בארגון שלכם.";
    }
    if (budget === "עד 200 ₪ לעובד") {
      return "נראה שהטבות יוקר המחיה — הנחות בסופר, פארם ומוצרי יומיום — יהיו המשמעותיות ביותר עבור העובדים בארגון שלכם.";
    }
    if (budget === "מעל 500 ₪ לעובד") {
      return "נראה שהטבות על מוצרי פרימיום וחשמל יהיו מנוע העניין המרכזי בארגון שלכם.";
    }
    if (acts.includes("ימי גיבוש")) {
      return "נראה שהטבות נופש, תרבות ופנאי יהיו הכי חזקות אצלכם.";
    }
    return "נראה שהטבות יוקר המחיה — הנחות בסופר, פארם ומוצרי יומיום — יהיו המשמעותיות ביותר עבור העובדים בארגון שלכם.";
  };

  const handleFinish = async () => {
    setLoading(true);
    const finalActivities = [];
    const orgKey = normalizeOrgKey(orgName);
    try {
      const existing = await base44.entities.GroupRequest.filter({ orgKey });
      if (existing.length > 0) {
        await base44.entities.GroupRequest.update(existing[0].id, {
          orgSize,
          holidayBudget,
          activities: finalActivities,
          lastJoinedAt: new Date().toISOString(),
        });
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
          activities: [painPoint, currentClub, welfareBudget].filter(Boolean),
          initiatorName: hrName.trim() || undefined,
          initiatorPhone: hrPhone.trim() || undefined,
        });
        const browserToken = `browser_${Date.now()}_${Math.random()}`;
        const firstMember = await base44.entities.GroupMember.create({
          groupRequestId: newGroup.id,
          orgKey,
          orgName: orgName.trim(),
          memberName: hrName.trim() || "עובד מייסד",
          memberPhone: hrPhone.trim() || "לא צוין",
          source: "employees",
        });
        await base44.entities.GroupRequest.update(newGroup.id, {
          initiatorMemberId: firstMember.id,
        });
        localStorage.setItem(`groupmember_${orgKey}`, browserToken);
        base44.functions.invoke("notifyGroupMilestones", { event: "org_created", orgKey, prevCount: 0, newCount: 1 }).catch(() => {});
      }
      const framing = getResultFraming(holidayBudget, finalActivities);
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
        {/* Ambassador nudge */}
        <div style={{ background: "rgba(0,102,204,0.06)", border: "1px solid rgba(0,102,204,0.15)", borderRadius: 16, padding: "14px 18px", marginBottom: 24, textAlign: "center" }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#0066CC", lineHeight: 1.55, fontFamily: "var(--font-heebo)", margin: 0 }}>
            💡 ידעת? תוכל להגדיל ב-80% את הסיכוי להכניס את בום ביי לארגון שלך אם עוד 20 עובדים יענו על השאלון הקצר.
          </p>
        </div>

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
            אני רוצה שהארגון שלי יצטרף
          </h2>
          <p style={{ fontSize: "15px", color: "#86868B", fontFamily: "var(--font-heebo)" }}>
            בואו נגדיל לכם את הנטו ב-15 שניות.
          </p>
          <div style={{ display: "inline-block", background: "rgba(0,102,204,0.08)", border: "1px solid rgba(0,102,204,0.15)", borderRadius: "999px", padding: "5px 16px", marginTop: "10px" }}>
            <span style={{ fontSize: "12.5px", fontWeight: 600, color: "#0066CC", fontFamily: "var(--font-heebo)" }}>מתאים בעיקר לארגונים עם 100 עובדים ומעלה</span>
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
              <p style={{ color: "#AEAEB2", fontSize: "12px", fontFamily: "var(--font-heebo)" }}>AI · Nexus Engine · 0₪ Optimization</p>
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
                מידע מודיעיני (אופציונלי)
              </h3>
              <p style={{ fontSize: "13px", color: "#86868B", textAlign: "center", marginBottom: "18px", fontFamily: "var(--font-heebo)" }}>
                שם וטלפון של מנהלת רווחה / HR או איש קשר בוועד העובדים — יעזור לנו להגיע לאנשים הנכונים.
              </p>
              <input
                type="text"
                value={hrName}
                onChange={(e) => setHrName(e.target.value)}
                placeholder="שם מנהלת הרווחה / HR"
                style={{ width: "100%", padding: "13px 15px", fontSize: "15px", borderRadius: "11px", border: "1px solid rgba(0,0,0,0.12)", background: "#fff", fontFamily: "var(--font-heebo)", marginBottom: "10px", textAlign: "right", boxSizing: "border-box" }}
              />
              <input
                type="tel"
                value={hrPhone}
                onChange={(e) => setHrPhone(e.target.value)}
                placeholder="טלפון נייד / משרד"
                style={{ width: "100%", padding: "13px 15px", fontSize: "15px", borderRadius: "11px", border: "1px solid rgba(0,0,0,0.12)", background: "#fff", fontFamily: "var(--font-heebo)", marginBottom: "14px", textAlign: "right", boxSizing: "border-box" }}
              />
              <button
                onClick={handleFinish}
                style={{ width: "100%", background: "#0066CC", color: "#fff", fontWeight: 700, fontSize: "15px", padding: "14px", borderRadius: "12px", border: "none", cursor: "pointer", fontFamily: "var(--font-heebo)", marginBottom: "10px" }}
              >
                סיום ←
              </button>
              <button
                onClick={handleFinish}
                style={{ width: "100%", background: "none", border: "none", color: "#AEAEB2", fontSize: "13px", cursor: "pointer", fontFamily: "var(--font-heebo)" }}
              >
                דלג
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28 }}
            >
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>✅</div>
                <h3 style={{ fontSize: "22px", fontWeight: 900, marginBottom: "14px", fontFamily: "var(--font-heebo)", letterSpacing: "-0.02em" }}>
                  תוצאה מותאמת לארגון שלכם
                </h3>
                <div
                  style={{
                    background: "rgba(0,102,204,0.06)",
                    border: "1px solid rgba(0,102,204,0.18)",
                    borderRadius: "14px",
                    padding: "18px 20px",
                    marginBottom: "20px",
                  }}
                >
                  <p style={{ fontSize: "16px", fontWeight: 600, color: "#0066CC", lineHeight: 1.55, fontFamily: "var(--font-heebo)", margin: 0 }}>
                    {resultText}
                  </p>
                </div>
              </div>
              {/* 80% Ambassador bubble */}
              <div style={{ background: "rgba(0,102,204,0.06)", border: "1px solid rgba(0,102,204,0.18)", borderRadius: 20, padding: "18px 20px", marginBottom: 20, textAlign: "center" }}>
                <p style={{ fontSize: 28, fontWeight: 900, color: "#0066CC", marginBottom: 4, fontFamily: "var(--font-heebo)" }}>80%</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#1D1D1F", marginBottom: 6, lineHeight: 1.45, fontFamily: "var(--font-heebo)" }}>
                  אם עוד 20 עמיתים יצטרפו — נגדיל ב-80% את הסיכוי להכניס את בום ביי לארגון!
                </p>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent("היי! הצטרפתי לבקשה קבוצתית להכנסת הטבות בום ביי לארגון שלנו. שווה לכם גם — " + window.location.origin + "/join/" + normalizeOrgKey(orgName))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "block", background: "#25D366", color: "#fff", textDecoration: "none", padding: "11px", borderRadius: 14, fontSize: 14, fontWeight: 700, fontFamily: "var(--font-heebo)", marginTop: 10 }}
                >
                  שתפו עמיתים בוואטסאפ ←
                </a>
              </div>
              <button
                onClick={() => navigate("/join/" + normalizeOrgKey(orgName))}
                style={{ width: "100%", background: "#0066CC", color: "#fff", fontWeight: 700, fontSize: "15px", padding: "14px", borderRadius: "12px", border: "none", cursor: "pointer", fontFamily: "var(--font-heebo)", boxShadow: "0 6px 20px rgba(0,102,204,0.24)" }}
              >
                המשך לפתוח בקשה לארגון
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}