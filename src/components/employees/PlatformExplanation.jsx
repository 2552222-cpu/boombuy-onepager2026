import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

const PANEL_BG = "#15171B";
const PANEL_GRADIENT = "radial-gradient(circle at 50% 18%, rgba(244,122,90,0.10), transparent 40%)";
const WHITE = "#FFFFFF";
const CORAL = "#F47A5A";
const TEXT_MUTED = "rgba(255,255,255,0.74)";
const CARD_BG = "rgba(255,255,255,0.055)";
const CARD_BORDER = "rgba(255,255,255,0.10)";
const EASE = [0.22, 1, 0.36, 1];

const CARDS = [
  {
    kicker: "לעובדים",
    text: "הזדמנויות מתחדשות לחסוך וליהנות, מקניות ומתנות ועד וולנס, תרבות וחופשות.",
  },
  {
    kicker: "לארגון",
    text: "חוויית עובד שנושאת את השם שלכם לאורך השנה.",
  },
  {
    kicker: "לך",
    text: "אנחנו מטפלים בהקמה, במיתוג, בהטמעה ובשירות לעובדים. את מאשרת איתנו את התוכנית.",
  },
];

export default function PlatformExplanation() {
  const sectionRef = useRef(null);
  const firedView = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !firedView.current) {
            firedView.current = true;
            try {
              base44.analytics.track({ eventName: "platform_explanation_viewed" });
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

  const hiddenY = 22;
  const itemTransition = { duration: 0.6, ease: EASE };

  return (
    <section
      id="platform-explanation"
      dir="rtl"
      style={{
        background: "transparent",
        padding: "24px 0",
        fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif",
      }}
    >
      <div className="pe-wrap" style={{ maxWidth: 1240, margin: "0 auto", paddingLeft: 48, paddingRight: 48 }}>
        <div
          ref={sectionRef}
          className="pe-panel"
          style={{
            position: "relative",
            background: PANEL_BG,
            backgroundImage: PANEL_GRADIENT,
            borderRadius: 32,
            overflow: "hidden",
            paddingTop: "clamp(56px, 7vw, 96px)",
            paddingBottom: "clamp(56px, 7vw, 96px)",
            paddingRight: "clamp(24px, 4vw, 56px)",
            paddingLeft: "clamp(24px, 4vw, 56px)",
          }}
        >
          <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
            <motion.h2
              initial={{ opacity: 0, y: hiddenY }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={itemTransition}
              style={{
                color: WHITE,
                fontSize: "clamp(32px, 4.4vw, 60px)",
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
                margin: 0,
              }}
            >
              מועדון העובדים שלכם.
              <br />
              <span style={{ color: CORAL }}>אנחנו מפעילים אותו.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: hiddenY }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ ...itemTransition, delay: 0.12 }}
              style={{
                color: TEXT_MUTED,
                fontSize: "clamp(17px, 1.4vw, 21px)",
                fontWeight: 400,
                lineHeight: 1.65,
                margin: "24px auto 0",
                maxWidth: 820,
              }}
            >
              בום ביי מקימה ומפעילה עבורכם מועדון רווחה והטבות במותג הארגון. משדרגים את הערך של
              תקציב הרווחה והמתנות הקיים, ומעניקים לעובדים הטבות וחוויות לאורך כל השנה.
            </motion.p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="pe-cards"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 20,
              marginTop: 48,
              maxWidth: 1180,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {CARDS.map((c) => (
              <motion.div
                key={c.kicker}
                variants={{ hidden: { opacity: 0, y: hiddenY }, visible: { opacity: 1, y: 0, transition: itemTransition } }}
                className="pe-card"
                style={{
                  flex: "1 1 280px",
                  maxWidth: 360,
                  background: CARD_BG,
                  border: `1px solid ${CARD_BORDER}`,
                  borderRadius: 24,
                  padding: "30px 28px",
                  boxSizing: "border-box",
                  textAlign: "right",
                }}
              >
                <p style={{ color: CORAL, fontSize: 16, fontWeight: 600, margin: 0, letterSpacing: "-0.01em" }}>
                  {c.kicker}
                </p>
                <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "clamp(16px, 1.15vw, 18px)", fontWeight: 400, lineHeight: 1.6, margin: "12px 0 0" }}>
                  {c.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width:768px){
          .pe-wrap{ padding-left:12px !important; padding-right:12px !important; }
          .pe-panel{ border-radius:24px !important; padding-top:48px !important; padding-bottom:48px !important; padding-right:20px !important; padding-left:20px !important; }
          .pe-cards{ flex-direction:column !important; gap:14px !important; }
          .pe-card{ padding:22px !important; }
        }
      `}</style>
    </section>
  );
}