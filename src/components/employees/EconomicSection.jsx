import React from "react";
import { motion } from "framer-motion";
import ILS from "./ILS";



const cards = [
  {
    dot: "#FF3B30",
    accent: "#FF3B30",
    title: "מה קיים היום בארגון",
    body: ["מתנות חג ופעילויות רווחה הן חשובות, אבל ברוב הארגונים הן לא מספיקות כדי לגעת באמת בהוצאות שמכבידות על העובד חודש אחרי חודש."],
  },
  {
    dot: "#FF9500",
    accent: "#FF9500",
    title: "מה העובדים באמת צריכים",
    body: ["יותר ערך כלכלי בהוצאות של היום יום - סופר, פארם, חשמל, חופשות ומותגים. לא רק ברגעים נקודתיים, אלא בצורה שמורגשת לאורך השנה ומשפיעה על הנטו."],
  },
  {
    dot: "#34C759",
    accent: "#34C759",
    title: "מה בום ביי מוסיפה",
    body: ["בום ביי מאפשרת למעסיק להעניק בנוסף למתנות החג ולפעילות הרווחה גם הטבות וערך כלכלי מתמשך, בלי להכביד על הארגון ובלי להחליף את מה שכבר קיים."],
  },
];

export default function EconomicSection() {
  const scrollToSurvey = () =>
    document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section style={{ background: "#F5F5F7", padding: "80px 20px", direction: "rtl" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 52 }}
        >
          <h2 style={{ fontSize: "clamp(24px,4.5vw,42px)", fontWeight: 900, color: "#1D1D1F", letterSpacing: "-0.035em", lineHeight: 1.15, marginBottom: 14 }}>
            השכר נשחק. יוקר המחיה לוחץ. הגיע הזמן להוסיף לעובדים ערך כלכלי מתמשך לאורך השנה.<br />
            <span style={{ color: "#0066CC" }}>שכבה נוספת של הטבות שיכולה לעזור לעובדים להגדיל את הנטו, בנוסף למה שכבר קיים בארגון.</span>
          </h2>
          <p style={{ fontSize: 17, color: "#6E6E73", maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
            3 דברים ששווה להבין לפני שמעבירים את זה לרווחה, לוועד או להנהלה.
          </p>
        </motion.div>

        {/* 3 Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 40 }}>
          {cards.map(({ dot, accent, title, body, bodyJsx }, i) => (
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
                border: `1.5px solid ${accent}22`,
                borderRadius: 28,
                padding: "28px 22px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.07)",
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: dot, marginBottom: 16 }} />
              <p style={{ fontSize: 13, fontWeight: 800, color: accent, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>{title}</p>
              <p style={{ fontSize: 14, color: "#444", lineHeight: 1.7 }}>
                {bodyJsx || (body && body[0])}
              </p>
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
            marginBottom: 28,
          }}
        >
          <p style={{ fontSize: "clamp(20px,3.5vw,28px)", fontWeight: 900, color: "#fff", marginBottom: 14, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            100% ערך לעובד.<br />
            <span style={{ color: "#34C759", fontWeight: 900 }}>
              עלות נוספת למעסיק: <ILS value="0" />
            </span>
          </p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", maxWidth: 480, margin: "0 auto", lineHeight: 1.65 }}>
            טכנולוגיית ה-<strong style={{ color: "#fff" }}>Nexus</strong> של בום ביי מייצרת{" "}
            <strong style={{ color: "#fff" }}>חיסכון</strong> אוטומטי מנפח הקנייה הקבוצתי.
            ללא צורך בתקציב ארגוני נוסף.
          </p>
        </motion.div>

        {/* CTA */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative" }}>
            <motion.div
              animate={{ boxShadow: ["0 0 0px rgba(37,99,235,0)", "0 0 24px rgba(37,99,235,0.45)", "0 0 0px rgba(37,99,235,0)"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", inset: 0, borderRadius: 44 }}
            />
            <button
              onClick={scrollToSurvey}
              style={{
                position: "relative",
                background: "#0066CC",
                color: "#fff",
                border: "none",
                padding: "18px 40px",
                borderRadius: 44,
                fontSize: 17,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: "var(--font-heebo)",
                letterSpacing: "-0.01em",
              }}
            >
              אני רוצה את זה בארגון שלי ←
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}