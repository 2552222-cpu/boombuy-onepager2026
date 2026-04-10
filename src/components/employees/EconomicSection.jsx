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
          <h2 style={{ fontSize: "clamp(24px,4.5vw,42px)", fontWeight: 900, color: "#1D1D1F", letterSpacing: "-0.035em", lineHeight: 1.15, marginBottom: 14 }}>
            השכר נשחק. יוקר המחיה לוחץ.<br />
            <span style={{ color: "#0066CC" }}>הגיע הזמן שהרווחה תעבוד חכם יותר.</span>
          </h2>
          <p style={{ fontSize: 17, color: "#6E6E73", maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
            3 עובדות שכל מנהל רווחה צריך לדעת
          </p>
        </motion.div>

        {/* 3 Glassmorphism cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 40 }}>
          {[
            {
              emoji: "🕰️",
              title: "המודל הישן",
              body: "מתנה פעמיים בשנה. תקציב שמתאדה תוך ימים. עובדים שיוצאים מאוכזבים ולא מרגישים ערך ביומיום.",
              accent: "#FF3B30",
            },
            {
              emoji: "💡",
              title: "מה שהעובד באמת צריך",
              body: "תמיכה בסופר, בחשמל ובחופשות — כל יום, לא רק בחג. 700₪ חיסכון חודשי = 8,400₪ ריאליים בשנה.",
              accent: "#FF9500",
            },
            {
              emoji: "🚀",
              title: "הבשורה",
              body: "0₪ עלות למעסיק. 100% ערך לעובד. טכנולוגיית Nexus של BoomBuy מייצרת את החיסכון מתוך נפח הקנייה הקבוצתי — אוטומטית.",
              accent: "#34C759",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: `1.5px solid ${card.accent}22`,
                borderRadius: 28,
                padding: "28px 22px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.07)",
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>{card.emoji}</div>
              <p style={{ fontSize: 13, fontWeight: 800, color: card.accent, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>{card.title}</p>
              <p style={{ fontSize: 14, color: "#444", lineHeight: 1.7 }}>{card.body}</p>
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
            <span style={{ color: "#34C759" }}>0₪ עלות נוספת למעסיק.</span>
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