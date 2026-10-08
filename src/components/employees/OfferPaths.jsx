import React from "react";
import { motion } from "framer-motion";
import { Building2, Users } from "lucide-react";

const BG = "#F7F7F4";
const CHARCOAL = "#17191D";
const BODY = "#3A3C42";
const CORAL = "#F47A5A";
const EASE = [0.22, 1, 0.36, 1];

// Two base offer paths. Capabilities are modules picked per path and need —
// not one mandatory bundle.
const PATHS = [
  {
    icon: Building2,
    title: "ארגונים",
    text: "חברות וארגונים שמעניקים לעובדים ערך והטבות לאורך השנה.",
  },
  {
    icon: Users,
    title: "איגודים, עמותות ומועדונים",
    text: "גופים עם חברים או עובדים שרוצים להעניק ערך ולהריץ הטבות לחברים.",
  },
];

const MODULES = ["מתנות חג", "הטבות יומיות", "וולנס", "תרבות", "חופשות ונסיעות", "מותגים וקניות"];

export default function OfferPaths() {
  return (
    <section
      id="offer-paths"
      dir="rtl"
      style={{
        background: BG,
        padding: "84px 20px 92px",
        fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif",
        scrollMarginTop: 90,
      }}
    >
      <style>{`@media (max-width:768px){ #offer-paths{ scroll-margin-top:72px; padding:48px 16px 56px !important; } }`}</style>

      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{
            color: CHARCOAL,
            fontSize: "clamp(28px,4vw,46px)",
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: "-0.025em",
            margin: 0,
          }}
        >
          שני מסלולים. <span style={{ color: CORAL }}>היקף שנבנה יחד.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
          style={{ color: BODY, fontSize: "clamp(16px,1.4vw,20px)", lineHeight: 1.6, margin: "16px auto 0", maxWidth: 660 }}
        >
          לא חבילה אחת קבועה. המודולים נבחרים לפי המסלול, הצורך וההיקף שסוכמו.
        </motion.p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 44, justifyContent: "center" }}>
          {PATHS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                style={{
                  flex: "1 1 320px",
                  maxWidth: 420,
                  background: "#fff",
                  borderRadius: 24,
                  border: "1px solid rgba(19,21,25,0.08)",
                  boxShadow: "0 10px 30px rgba(19,21,25,0.06)",
                  padding: "32px 28px",
                  textAlign: "right",
                  boxSizing: "border-box",
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: "rgba(244,122,90,0.12)",
                    color: CORAL,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={22} strokeWidth={2.2} />
                </span>
                <h3 style={{ color: CHARCOAL, fontSize: "clamp(20px,1.8vw,24px)", fontWeight: 700, margin: "16px 0 8px", letterSpacing: "-0.01em" }}>
                  {p.title}
                </h3>
                <p style={{ color: BODY, fontSize: "clamp(15px,1.2vw,17px)", lineHeight: 1.6, margin: 0 }}>{p.text}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.12 }}
          style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 32 }}
        >
          {MODULES.map((m) => (
            <span
              key={m}
              style={{
                background: "#fff",
                border: "1px solid rgba(19,21,25,0.10)",
                borderRadius: 999,
                padding: "10px 18px",
                color: CHARCOAL,
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              {m}
            </span>
          ))}
        </motion.div>

        <p style={{ color: "#6E7177", fontSize: 14, lineHeight: 1.6, margin: "18px auto 0", maxWidth: 620 }}>
          הזמינות והתנאים משתנים לפי המסלול וההיקף שסוכמו.
        </p>
      </div>
    </section>
  );
}