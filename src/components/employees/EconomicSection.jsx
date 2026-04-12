import React from "react";
import { motion } from "framer-motion";
import { Gift, Wallet, Layers } from "lucide-react";

const cards = [
  {
    icon: Gift,
    accent: "#FF3B30",
    title: "מה קיים היום בארגון",
    body: "מתנות חג ופעילויות רווחה הן חשובות, אבל לרוב לא נוגעות מספיק בהוצאות שחוזרות כל חודש.",
  },
  {
    icon: Wallet,
    accent: "#FF9500",
    title: "מה העובדים באמת צריכים",
    body: "יותר ערך בסופר, פארם, חשמל, חופשות, תרבות ומותגים - לא רק בחג, אלא לאורך השנה.",
  },
  {
    icon: Layers,
    accent: "#34C759",
    title: "מה בום ביי מוסיפה",
    body: "בנוסף למתנות החג ולפעילות הרווחה, בום ביי מוסיפה לעובדים הטבות וערך כלכלי מתמשך שיכול לעזור להם להגדיל את הנטו.",
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
          style={{ textAlign: "center", marginBottom: 44 }}
        >
          <h2 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: 900, color: "#1D1D1F", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 10 }}>
            יוקר המחיה לוחץ. העובדים צריכים ערך כלכלי שמורגש לאורך כל השנה.
          </h2>
          <p style={{ fontSize: "clamp(16px,2vw,19px)", fontWeight: 600, color: "#0066CC", maxWidth: 540, margin: "0 auto 8px", lineHeight: 1.5 }}>
            בום ביי מוסיפה שכבה נוספת של הטבות שיכולה לעזור לעובדים להגדיל את הנטו, בלי להחליף את מה שכבר קיים בארגון.
          </p>
          <p style={{ fontSize: 14, color: "#6E6E73", maxWidth: 480, margin: "0 auto", lineHeight: 1.55 }}>
            3 דברים שכדאי להבין לפני שמעבירים את זה לרווחה, לוועד או להנהלה.
          </p>
        </motion.div>

        {/* 3 Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 36 }}>
          {cards.map(({ icon: Icon, accent, title, body }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              style={{
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.07)",
                borderRadius: 20,
                padding: "22px 18px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ width: 32, height: 32, borderRadius: 10, background: `${accent}14`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <Icon size={17} color={accent} strokeWidth={1.8} />
              </div>
              <p style={{ fontSize: 13, fontWeight: 800, color: "#1D1D1F", marginBottom: 6 }}>{title}</p>
              <p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.6, margin: 0 }}>{body}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={scrollToSurvey}
            style={{
              background: "#0066CC",
              color: "#fff",
              border: "none",
              padding: "16px 36px",
              borderRadius: 44,
              fontSize: 16,
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
    </section>
  );
}