import React from "react";
import { motion } from "framer-motion";

export default function SavingsInfographic() {
  return (
    <section style={{ background: "#F5F5F7", padding: "72px 20px", direction: "rtl" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Main numbers */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#0066CC", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
            החיסכון האמיתי
          </p>
          <h2 style={{ fontSize: "clamp(28px,5vw,46px)", fontWeight: 900, color: "#1D1D1F", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 12 }}>
            כ־<bdi dir="ltr">700₪</bdi> בחודש = <span style={{ color: "#0066CC" }}>כ־<bdi dir="ltr">8,400₪</bdi> נטו בשנה</span>
          </h2>
          <p style={{ fontSize: 17, color: "#6E6E73", maxWidth: 560, margin: "0 auto", lineHeight: 1.55 }}>
            חיסכון ממוצע לעובד על קניות יומיומיות — בלי לשנות הרגלים, בלי מאמץ.
          </p>
        </div>

        {/* 3 tiles */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 48 }}>
          {[
            { emoji: "🛒", label: "חיסכון בסופר", value: "8%", sub: "הנחה קבועה ברשתות הדיסקאונט" },
            { emoji: "📱", label: "חשמל ומובייל", value: null, subBold: "אלפי שקלים בשנה", sub: "על מוצרי חשמל, אלקטרוניקה ומובייל" },
            { emoji: "✈️", label: "נופש וחופשות", value: "עד 50%", sub: "הנחה על חבילות נסיעה" },
          ].map((tile, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              style={{ background: "#fff", borderRadius: 24, padding: "28px 20px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
            >
              <div style={{ fontSize: 36, marginBottom: 8 }}>{tile.emoji}</div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#86868B", marginBottom: 4 }}>{tile.label}</p>
              {tile.value ? (
                <p style={{ fontSize: 34, fontWeight: 900, color: "#0066CC", letterSpacing: "-0.03em" }}>{tile.value}</p>
              ) : (
                <p style={{ fontSize: 20, fontWeight: 900, color: "#0066CC", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{tile.subBold}</p>
              )}
              <p style={{ fontSize: 12, color: "#AEAEB2", marginTop: 4 }}>{tile.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Zero cost banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ background: "#1D1D1F", borderRadius: 28, padding: "36px 32px", textAlign: "center" }}
        >
          <p style={{ fontSize: "clamp(22px,4vw,32px)", fontWeight: 900, color: "#fff", marginBottom: 12, letterSpacing: "-0.02em" }}>
            100% ערך לעובד.<br /><span style={{ color: "#34C759" }}><bdi dir="ltr">0₪</bdi> עלות נוספת למעסיק.</span>
          </p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>
            טכנולוגיית ה-<strong style={{ color: "#fff" }}>Nexus</strong> של בום ביי מייצרת סבסוד אוטומטי מתוך נפח הקנייה הקבוצתי — ללא צורך בתקציב ארגוני נוסף.
          </p>
        </motion.div>

      </div>
    </section>
  );
}