import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";

const ORG_SIZE_OPTIONS = [
  { label: "עד 50 עובדים" },
  { label: "50–250 עובדים" },
  { label: "מעל 250 עובדים" },
];

const HOLIDAY_BUDGET_OPTIONS = [
  { label: "עד 200 ₪ לעובד" },
  { label: "200–500 ₪ לעובד" },
  { label: "מעל 500 ₪ לעובד" },
];

const ACTIVITIES_OPTIONS = ["ימי גיבוש", "מתנות חג", "ימי הולדת", "יום המשפחה"];

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
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultText, setResultText] = useState("");
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

  const handleFinish = async (skipActivities = false) => {
    setLoading(true);
    const finalActivities = skipActivities ? [] : activities;
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
        await base44.entities.GroupRequest.create({
          orgName: orgName.trim(),
          orgKey,
          orgNameNormalized: orgKey,
          source: "employees",
          lastJoinedAt: new Date().toISOString(),
        });
      }
      const framing = getResultFraming(holidayBudget, finalActivities);
      setResultText(framing);
      setStep(4);
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
            <span>שלב {Math.min(step + 1, 3)} מתוך 3</span>
            {step === 3 && <span style={{ color: "#0066CC" }}>אופציונלי</span>}
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
              animate={{ width: `${((Math.min(step, 2) + 1) / 3) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center py-16 gap-4"
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  border: "3px solid rgba(0,102,204,0.15)",
                  borderTopColor: "#0066CC",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              <p style={{ color: "#86868B", fontSize: "14px", fontFamily: "var(--font-heebo)" }}>
                מכין את התוצאה שלך...
              </p>
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
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28 }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  marginBottom: "6px",
                  textAlign: "center",
                  fontFamily: "var(--font-heebo)",
                }}
              >
                פעילויות רווחה קיימות
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "#86868B",
                  textAlign: "center",
                  marginBottom: "16px",
                  fontFamily: "var(--font-heebo)",
                }}
              >
                בחרו הכל שרלוונטי (אופציונלי)
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  marginBottom: "16px",
                }}
              >
                {ACTIVITIES_OPTIONS.map((a) => (
                  <button
                    key={a}
                    onClick={() => toggleActivity(a)}
                    style={{
                      background: activities.includes(a) ? "#EBF3FF" : "#fff",
                      border: activities.includes(a)
                        ? "1.5px solid #0066CC"
                        : "1px solid rgba(0,0,0,0.1)",
                      borderRadius: "12px",
                      padding: "12px 14px",
                      fontSize: "14px",
                      fontWeight: activities.includes(a) ? 700 : 500,
                      fontFamily: "var(--font-heebo)",
                      color: activities.includes(a) ? "#0066CC" : "#1D1D1F",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {a}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handleFinish(false)}
                style={{
                  width: "100%",
                  background: "#0066CC",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "15px",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-heebo)",
                  marginBottom: "10px",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#0055AA")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#0066CC")}
              >
                המשך
              </button>
              <button
                onClick={() => handleFinish(true)}
                style={{
                  width: "100%",
                  background: "transparent",
                  color: "#86868B",
                  fontWeight: 500,
                  fontSize: "14px",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid rgba(0,0,0,0.08)",
                  cursor: "pointer",
                  fontFamily: "var(--font-heebo)",
                  transition: "background 0.15s",
                }}
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
              <button
                onClick={() => navigate("/join/" + normalizeOrgKey(orgName))}
                style={{
                  width: "100%",
                  background: "#0066CC",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "15px",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-heebo)",
                  marginBottom: "10px",
                  transition: "background 0.15s",
                  boxShadow: "0 6px 20px rgba(0,102,204,0.24)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#0055AA")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#0066CC")}
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