import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

function getBrowserToken() {
  let t = localStorage.getItem("boomBuyBrowserToken");
  if (!t) {
    t = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("boomBuyBrowserToken", t);
  }
  return t;
}

// ALL categories always shown (even if zero)
const CATEGORY_LABELS = {
  super: "סופר ומזון",
  tech: "חשמל ואלקטרוניקה",
  general: "אופנה, בית וכלליות",
  insurance: "ביטוח",
};

const CATEGORY_ORDER = ["super", "tech", "general", "insurance"];

function ILS({ amount, size = 32, color = "#0055CC" }) {
  return (
    <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
      <span style={{ fontSize: size, fontWeight: 900, color, lineHeight: 1 }}>
        {Number(amount).toLocaleString("he-IL")}
      </span>
      <span style={{ fontSize: size * 0.6, fontWeight: 700, color }}> ₪</span>
    </span>
  );
}

// Silver sparkle dots — 2 second lifetime only
function SparkleEffect() {
  const [sparkles] = useState(() =>
    Array.from({ length: 16 }, (_, i) => ({
      id: i,
      delay: (i / 16) * 1.2,
      top: `${Math.random() * 95}%`,
      left: `${Math.random() * 95}%`,
      size: 6 + Math.random() * 6,
    }))
  );

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 99, overflow: "hidden" }}>
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
          transition={{ duration: 0.9, delay: s.delay, ease: "easeOut" }}
          style={{
            position: "absolute",
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "radial-gradient(circle, #E8E8E8 0%, #A0A0A0 100%)",
            boxShadow: "0 0 8px rgba(200,200,200,0.9)",
            top: s.top,
            left: s.left,
          }}
        />
      ))}
    </div>
  );
}

export default function NetLiftResult({ result, answers, onRestart }) {
  const [showSparkle, setShowSparkle] = useState(true);

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
    const timer = setTimeout(() => setShowSparkle(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Always render result (calcNetLift always returns an object now)
  const breakdown = result?.breakdown ?? { super: 0, tech: 0, general: 0, insurance: 0 };
  const monthly = result?.monthly ?? 0;
  const annual = result?.annual ?? 0;

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#F5F5F7",
        fontFamily: "var(--font-heebo)",
        padding: "32px 20px 80px",
        position: "relative",
      }}
    >
      {showSparkle && <SparkleEffect />}

      <div style={{ maxWidth: "480px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>

        {/* Badge + headline */}
        <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
          <div style={{
            display: "inline-block",
            background: "rgba(0,102,204,0.08)",
            border: "1px solid rgba(0,102,204,0.2)",
            borderRadius: "999px",
            padding: "5px 16px",
            marginBottom: "16px",
          }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#0066CC" }}>NetLift Index</span>
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            style={{
              width: 64, height: 64,
              background: "linear-gradient(145deg, #0A84FF, #0055CC)",
              borderRadius: "18px",
              boxShadow: "0 8px 24px rgba(0,102,204,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <circle cx="15" cy="15" r="11" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
              <circle cx="15" cy="15" r="6" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
              <circle cx="15" cy="15" r="3" fill="white"/>
              <line x1="15" y1="15" x2="23" y2="7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="23.5" cy="6.5" r="2" fill="rgba(255,255,255,0.85)"/>
            </svg>
          </motion.div>

          <h2 style={{
            fontSize: "clamp(20px, 5vw, 28px)",
            fontWeight: 900,
            color: "#1D1D1F",
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
            marginBottom: "8px",
          }}>
            הנטו שלך יכול לגדול
          </h2>
          <p style={{ fontSize: "14px", color: "#0066CC", fontWeight: 700 }}>
            דרך מערכת ההטבות של BoomBuy
          </p>
        </div>

        {/* Monthly / Annual cards */}
        <div style={{ display: "flex", gap: "12px" }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              flex: 1,
              background: "#F0F4FF",
              border: "1.5px solid rgba(0,85,204,0.15)",
              borderRadius: "20px",
              padding: "20px 14px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#86868B", marginBottom: "8px" }}>חיסכון חודשי</p>
            <ILS amount={monthly} size={30} color="#0055CC" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              flex: 1,
              background: "rgba(52,199,89,0.07)",
              border: "1.5px solid rgba(52,199,89,0.2)",
              borderRadius: "20px",
              padding: "20px 14px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#86868B", marginBottom: "8px" }}>חיסכון שנתי</p>
            <ILS amount={annual} size={30} color="#1A7A43" />
          </motion.div>
        </div>

        {/* Full category breakdown — ALL 4 categories always shown */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            background: "#fff",
            borderRadius: "20px",
            border: "1px solid rgba(0,0,0,0.07)",
            padding: "20px",
          }}
        >
          <p style={{ fontSize: "12px", fontWeight: 700, color: "#86868B", marginBottom: "14px" }}>
            פירוט לפי קטגוריות
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {CATEGORY_ORDER.map((k) => {
              const v = breakdown[k] ?? 0;
              return (
                <div
                  key={k}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 14px",
                    background: v > 0 ? "#F0F4FF" : "#F9FAFB",
                    borderRadius: "12px",
                    opacity: v > 0 ? 1 : 0.5,
                  }}
                >
                  <span style={{ fontSize: "14px", color: "#1D1D1F", fontWeight: 600 }}>
                    {CATEGORY_LABELS[k]}
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: v > 0 ? "#0055CC" : "#AEAEB2" }}>
                    {v > 0 ? `${Number(v).toLocaleString("he-IL")} ₪ לחודש` : "לא רלוונטי"}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Restart */}
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileTap={{ scale: 0.97 }}
          onClick={onRestart}
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
          חשב מחדש
        </motion.button>

        <p style={{ fontSize: "11px", color: "#C0C0C0", textAlign: "center", lineHeight: 1.6 }}>
          החישוב מבוסס על הערכות ממוצעות. הערך בפועל תלוי בהרגלי השימוש שלך.
        </p>
      </div>
    </div>
  );
}