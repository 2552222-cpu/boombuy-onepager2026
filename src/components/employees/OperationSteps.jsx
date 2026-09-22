import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

const BG = "#F7F7F4";
const CHARCOAL = "#17191D";
const CORAL = "#F47A5A";
const EASE = [0.22, 1, 0.36, 1];

const STEPS = [
  { n: "1", title: "מתאימים", text: "בונים איתך תוכנית שמתאימה לארגון ולעובדים." },
  { n: "2", title: "מקימים ומשיקים", text: "מטפלים במיתוג, בהקמה ובהטמעה." },
  { n: "3", title: "מפעילים לאורך השנה", text: "מטפלים בהטבות, בתוכן ובשירות לעובדים." },
];

export default function OperationSteps() {
  const ref = useRef(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !fired.current) {
            fired.current = true;
            try {
              base44.analytics.track({ eventName: "operation_steps_viewed" });
            } catch (err) {
              /* analytics must never break the UI */
            }
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="operation-steps"
      ref={ref}
      dir="rtl"
      style={{
        background: BG,
        padding: "84px 20px 92px",
        fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif",
        scrollMarginTop: 90,
      }}
    >
      <style>{`@media (max-width:768px){ #operation-steps{ scroll-margin-top:72px; padding:48px 16px 56px !important; } }`}</style>

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
          את מאשרת את התוכנית. <span style={{ color: CORAL }}>אנחנו דואגים לביצוע.</span>
        </motion.h2>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, marginTop: 44, justifyContent: "center" }}>
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
              style={{
                flex: "1 1 260px",
                maxWidth: 300,
                background: "#fff",
                borderRadius: 22,
                border: "1px solid rgba(19,21,25,0.07)",
                boxShadow: "0 10px 30px rgba(19,21,25,0.06)",
                padding: "28px 24px",
                textAlign: "right",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: CORAL,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 18,
                  marginBottom: 16,
                }}
              >
                {s.n}
              </div>
              <h3 style={{ color: CHARCOAL, fontSize: "clamp(19px,1.6vw,22px)", fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
                {s.title}
              </h3>
              <p style={{ color: "#3A3C42", fontSize: "clamp(15px,1.2vw,17px)", lineHeight: 1.6, margin: 0 }}>{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}