import React from "react";
import { motion } from "framer-motion";

export default function EconomicSection() {
  return (
    <section style={{ background: "#F5F5F7", padding: "80px 20px", direction: "rtl" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 52 }}
        >
          <h2 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, color: "#1D1D1F", letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: 14 }}>
            <span style={{ color: "#0066CC" }}>0₪</span> עלות למעסיק.{" "}
            <span style={{ color: "#1D1D1F" }}>100% ערך לעובד.</span>
          </h2>
          <p style={{ fontSize: 18, color: "#6E6E73", maxWidth: 540, margin: "0 auto", lineHeight: 1.6 }}>
            כ-₪700 בחודש = <strong style={{ color: "#0066CC" }}>כ-₪8,400 תוספת ריאלית לנטו השנתי</strong> — בלי לשנות הרגלים.
          </p>
        </motion.div>

        {/* 3 Glassmorphism tiles */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 40 }}>
          {[
            { emoji: "🛒", label: "סופר ופארם", value: "8%", sub: "הנחה קבועה ברשתות הדיסקאונט" },
            { emoji: "📱", label: "חשמל, אלקטרוניקה ומובייל", value: null, subBold: "אלפי שקלים בשנה", sub: "מחירי יבואן על המותגים הכי מבוקשים" },
            { emoji: "✈️", label: "נופש וחופשות", value: "עד 50%", sub: "הנחה על חבילות נסיעה בארץ ובחו\"ל" },
          ].map((tile, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              style={{
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.9)",
                borderRadius: 28,
                padding: "28px 20px",
                textAlign: "center",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 10 }}>{tile.emoji}</div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#AEAEB2", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{tile.label}</p>
              {tile.value ? (
                <p style={{ fontSize: 36, fontWeight: 900, color: "#0066CC", letterSpacing: "-0.03em", margin: 0 }}>{tile.value}</p>
              ) : (
                <p style={{ fontSize: 20, fontWeight: 900, color: "#0066CC", letterSpacing: "-0.02em", lineHeight: 1.2, margin: 0 }}>{tile.subBold}</p>
              )}
              <p style={{ fontSize: 12, color: "#AEAEB2", marginTop: 6 }}>{tile.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Dark Nexus banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            background: "#1D1D1F",
            borderRadius: 32,
            padding: "40px 36px",
            textAlign: "center",
            boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
          }}
        >
          <p style={{ fontSize: "clamp(20px,3.5vw,28px)", fontWeight: 900, color: "#fff", marginBottom: 14, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            100% ערך לעובד.<br />
            <span style={{ color: "#34C759" }}>0 ₪ עלות נוספת למעסיק.</span>
          </p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", maxWidth: 480, margin: "0 auto", lineHeight: 1.65 }}>
            טכנולוגיית ה-<strong style={{ color: "#fff" }}>Nexus</strong> של בום ביי מייצרת{" "}
            <strong style={{ color: "#fff" }}>חיסכון</strong> אוטומטי מנפח הקנייה הקבוצתי —
            ללא צורך בתקציב ארגוני נוסף.
          </p>
        </motion.div>

      </div>
    </section>
  );
}