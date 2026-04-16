import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

function getBrowserToken() {
  let t = localStorage.getItem("boomBuyBrowserToken");
  if (!t) { t = Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem("boomBuyBrowserToken", t); }
  return t;
}

const CATEGORY_LABELS = {
  super: "סופר ומזון",
  tech: "חשמל ואלקטרוניקה",
  general: "הטבות כלליות",
  leisure: "חופשות ובילויים",
  insurance: "ביטוח רכב ודירה",
};

function ILS({ amount, size = 32, color = "#0055CC" }) {
  return (
    <bdi dir="ltr" style={{ display: "inline-block", whiteSpace: "nowrap", unicodeBidi: "isolate" }}>
      <span style={{ fontSize: size, fontWeight: 900, color, lineHeight: 1 }}>{Number(amount).toLocaleString("he-IL")}</span>
      <span style={{ fontSize: size * 0.62, fontWeight: 700, color }}> ₪</span>
    </bdi>
  );
}

export default function NetLiftResult({ result, answers, onRestart }) {
  useEffect(() => {
    if (result) {
      const workerId = getBrowserToken();
      base44.entities.WorkerNetLiftRecord.create({
        workerId,
        surveyAnswers: answers,
        monthlySavingsEstimate: result.monthly,
        annualSavingsEstimate: result.annual,
        categoryUsage: result.breakdown,
        isComplete: true,
      }).catch(() => {});
    }
  }, []);

  if (!result) {
    return (
      <div dir="rtl" style={{ minHeight: "100vh", background: "#F5F5F7", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heebo)", padding: "24px" }}>
        <div style={{ background: "#fff", borderRadius: "24px", padding: "40px 28px", textAlign: "center", maxWidth: "400px" }}>
          <div style={{ fontSize: "40px", marginBottom: "16px" }}>⚠️</div>
          <h3 style={{ fontSize: "20px", fontWeight: 900, color: "#1D1D1F", marginBottom: "10px" }}>
            לא ניתן לחשב NetLift Index
          </h3>
          <p style={{ fontSize: "14px", color: "#86868B", marginBottom: "24px", lineHeight: 1.6 }}>
            לפי התשובות שלך אין חיסכון צפוי — נסה שוב עם פרטים נוספים
          </p>
          <button onClick={onRestart} style={{ background: "#0066CC", color: "#fff", fontWeight: 700, fontSize: "15px", padding: "14px 28px", borderRadius: "14px", border: "none", cursor: "pointer", fontFamily: "var(--font-heebo)" }}>
            חזרה לשאלון
          </button>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "var(--font-heebo)", padding: "32px 20px 80px" }}>
      <div style={{ maxWidth: "480px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
          <div style={{ display: "inline-block", background: "rgba(0,102,204,0.08)", border: "1px solid rgba(0,102,204,0.2)", borderRadius: "999px", padding: "5px 16px", marginBottom: "14px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#0066CC" }}>NetLift Index Summary</span>
          </div>
          <div style={{ marginBottom: "16px", display: "flex", justifyContent: "center" }}>
            <div style={{
              width: 64, height: 64,
              background: "linear-gradient(145deg, #0A84FF, #0055CC)",
              borderRadius: "18px",
              boxShadow: "0 8px 24px rgba(0,102,204,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 4C9.373 4 4 9.373 4 16C4 22.627 9.373 28 16 28C22.627 28 28 22.627 28 16C28 9.373 22.627 4 16 4Z" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none"/>
                <path d="M16 9C12.134 9 9 12.134 9 16C9 19.866 12.134 23 16 23C19.866 23 23 19.866 23 16C23 12.134 19.866 9 16 9Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
                <circle cx="16" cy="16" r="3.5" fill="white"/>
                <path d="M16 16L24 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="24.5" cy="7.5" r="2" fill="rgba(255,255,255,0.85)"/>
              </svg>
            </div>
          </div>
          <h2 style={{ fontSize: "clamp(20px, 5vw, 28px)", fontWeight: 900, color: "#1D1D1F", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "8px" }}>
            הנטו האפקטיבי שלך עשוי לגדול
          </h2>
          <motion.p
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ fontSize: "14px", color: "#0066CC", fontWeight: 700 }}
          >
            בצורה משמעותית דרך מערכת ההטבות
          </motion.p>
        </div>

        {/* Main numbers */}
        <div style={{ display: "flex", gap: "12px" }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ flex: 1, background: "#F0F4FF", border: "1.5px solid rgba(0,85,204,0.15)", borderRadius: "20px", padding: "20px 14px", textAlign: "center" }}
          >
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#86868B", marginBottom: "8px" }}>חיסכון חודשי משוער</p>
            <ILS amount={result.monthly} size={32} color="#0055CC" />
            <p style={{ fontSize: "11px", color: "#AEAEB2", marginTop: "6px" }}>לפי התשובות שלך</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ flex: 1, background: "rgba(52,199,89,0.07)", border: "1.5px solid rgba(52,199,89,0.2)", borderRadius: "20px", padding: "20px 14px", textAlign: "center" }}
          >
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#86868B", marginBottom: "8px" }}>חיסכון שנתי משוער</p>
            <ILS amount={result.annual} size={32} color="#1A7A43" />
            <p style={{ fontSize: "11px", color: "#AEAEB2", marginTop: "6px" }}>לאורך השנה</p>
          </motion.div>
        </div>

        {/* Breakdown */}
        {result.breakdown && Object.keys(result.breakdown).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ background: "#fff", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.07)", padding: "20px" }}
          >
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#86868B", marginBottom: "14px", letterSpacing: "0.02em" }}>פירוט לפי קטגוריות</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {Object.entries(result.breakdown).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]).map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", color: "#555", fontWeight: 500 }}>{CATEGORY_LABELS[k] || k}</span>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "#1D1D1F" }}>
                    <ILS amount={v} size={14} color="#1D1D1F" /> /חודש
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => {
            document.getElementById("value-calculator")?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            width: "100%",
            background: "#0066CC",
            color: "#fff",
            fontWeight: 800,
            fontSize: "16px",
            padding: "17px",
            borderRadius: "16px",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-heebo)",
            boxShadow: "0 6px 24px rgba(0,102,204,0.3)",
          }}
        >
          אני רוצה להביא את זה לארגון שלי ←
        </motion.button>

        <button
          onClick={onRestart}
          style={{ background: "none", border: "none", color: "#AEAEB2", fontSize: "13px", cursor: "pointer", fontFamily: "var(--font-heebo)", textAlign: "center" }}
        >
          חשב מחדש
        </button>

        <p style={{ fontSize: "11px", color: "#C0C0C0", textAlign: "center", lineHeight: 1.6 }}>
          * החישוב מבוסס על ממוצעי שימוש והערכות שמרניות. הערך בפועל תלוי בהרגלי השימוש.
        </p>
      </div>
    </div>
  );
}