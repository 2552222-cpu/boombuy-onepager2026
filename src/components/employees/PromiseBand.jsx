import React from "react";
import { motion } from "framer-motion";

const WARM_WHITE = "#FBFAF8";
const CHARCOAL = "#17191D";
const BODY = "#3A3C42";
const CORAL = "#F47A5A";
const EASE = [0.22, 1, 0.36, 1];

// Organizational promise — the first clear business message on the page.
// Copy is the approved hierarchy: promise, supporting line, operating model.
export default function PromiseBand() {
  return (
    <section
      id="promise"
      dir="rtl"
      style={{
        background: WARM_WHITE,
        padding: "68px 20px 76px",
        fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif",
      }}
    >
      <style>{`@media (max-width:768px){ #promise{ padding:44px 18px 52px !important; } }`}</style>

      <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            color: CHARCOAL,
            fontSize: "clamp(30px,4.8vw,58px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            margin: 0,
            maxWidth: 880,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          הופכים תקציב רווחה קיים לחוויית עובד שעובדת בכל יום.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
          style={{
            color: BODY,
            fontSize: "clamp(18px,1.7vw,24px)",
            fontWeight: 500,
            lineHeight: 1.5,
            margin: "22px auto 0",
            maxWidth: 620,
          }}
        >
          יותר ערך לעובדים. יותר שקט לרווחה.
        </motion.p>

        <div style={{ width: 56, height: 3, borderRadius: 999, background: CORAL, margin: "32px auto" }} />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.16 }}
          style={{
            color: CHARCOAL,
            fontSize: "clamp(20px,2.2vw,30px)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          אתם מחליטים. אנחנו מבצעים.
        </motion.p>
      </div>
    </section>
  );
}