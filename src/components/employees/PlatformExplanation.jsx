import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

const PANEL_BG = "#15171B";
const PANEL_GRADIENT =
  "radial-gradient(circle at 50% 20%, rgba(244,122,90,0.10), transparent 38%)";
const WHITE = "#FFFFFF";
const CORAL = "#F47A5A";
const TEXT_MUTED = "rgba(255,255,255,0.72)";
const MICRO = "rgba(255,255,255,0.48)";
const CARD_BG = "rgba(255,255,255,0.055)";
const CARD_BORDER = "rgba(255,255,255,0.10)";

const EASE = [0.22, 1, 0.36, 1];

const CARDS = [
  {
    kicker: "לרווחה",
    title: "פחות תפעול",
    text: "ספקים, תכנים, הקצאות, שירות ופניות עובדים - מנוהלים במקום אחד.",
  },
  {
    kicker: "לעובדים",
    title: "יותר ערך",
    text: "חיסכון, מתנות, חוויות, תרבות וולנס שנוכחים בחיי העובד לאורך כל השנה.",
  },
  {
    kicker: "לתקציב",
    title: "עובד הרבה יותר",
    text: "אותו תקציב קיים מייצר יותר רגעים, יותר שימוש ויותר מחוברות.",
  },
];

export default function PlatformExplanation() {
  const sectionRef = useRef(null);
  const firedView = useRef(false);
  const firedCta = useRef(false);
  const [reduced, setReduced] = React.useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onMq = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", onMq);
    return () => mq.removeEventListener?.("change", onMq);
  }, []);

  // platform_explanation_viewed — once, when 50% of the section is visible
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
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onCtaClick = () => {
    if (!firedCta.current) {
      firedCta.current = true;
      try {
        base44.analytics.track({ eventName: "comparison_cta_clicked" });
      } catch (err) {
        /* ignore */
      }
    }
    document
      .getElementById("welfare-comparison")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Entry variants — fade + gentle lift (fade only when reduced motion)
  const hiddenY = reduced ? 0 : 22;
  const visibleY = 0;
  const itemTransition = { duration: 0.6, ease: EASE };

  const cardVariants = {
    hidden: { opacity: 0, y: hiddenY },
    visible: { opacity: 1, y: visibleY, transition: itemTransition },
    hover: reduced
      ? { borderColor: "rgba(255,255,255,0.24)" }
      : { y: -4, borderColor: "rgba(255,255,255,0.24)" },
  };
  const glowVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0 },
    hover: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
  };
  const cardsContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.11 } },
  };

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
      <div
        className="pe-wrap"
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: 48,
          paddingRight: 48,
        }}
      >
        <div
          ref={sectionRef}
          className="pe-panel"
          style={{
            position: "relative",
            background: PANEL_BG,
            backgroundImage: PANEL_GRADIENT,
            borderRadius: 32,
            overflow: "hidden",
            paddingTop: 110,
            paddingBottom: 110,
            paddingRight: "clamp(28px, 4vw, 56px)",
            paddingLeft: "clamp(28px, 4vw, 56px)",
          }}
        >
          {/* Title area — centered */}
          <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
            <motion.p
              initial={{ opacity: 0, y: hiddenY }}
              whileInView={{ opacity: 1, y: visibleY }}
              viewport={{ once: true, amount: 0.35 }}
              transition={itemTransition}
              style={{
                color: CORAL,
                fontSize: "clamp(17px, 1.3vw, 20px)",
                fontWeight: 600,
                margin: 0,
                letterSpacing: "-0.01em",
                lineHeight: 1.4,
              }}
            >
              כך נראה השדרוג מאחורי הקלעים
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: hiddenY }}
              whileInView={{ opacity: 1, y: visibleY }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ ...itemTransition, delay: 0.1 }}
              style={{
                color: WHITE,
                fontSize: "clamp(40px, 4.6vw, 68px)",
                fontWeight: 700,
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
                margin: "16px 0 0",
              }}
            >
              מערכת אחת.
              <br />
              יותר מחוברות <span style={{ color: CORAL }}>בכל יום</span>.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: hiddenY }}
              whileInView={{ opacity: 1, y: visibleY }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ ...itemTransition, delay: 0.22 }}
              style={{
                color: TEXT_MUTED,
                fontSize: "clamp(18px, 1.4vw, 22px)",
                fontWeight: 400,
                lineHeight: 1.65,
                margin: "26px auto 0",
                maxWidth: 850,
              }}
            >
              בום ביי מרכזת ומפעילה את המתנות, ההטבות, החיסכון, החופשות, התרבות, הוולנס
              והשירות לעובדים - כדי להפוך את תקציב הרווחה הקיים לערך שמורגש לאורך כל השנה.
            </motion.p>
          </div>

          {/* Three value areas — single row, equal height (desktop) */}
          <motion.div
            variants={cardsContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delayChildren: 0.34 }}
            className="pe-cards"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 22,
              marginTop: 56,
              maxWidth: 1180,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {CARDS.map((c) => (
              <motion.div
                key={c.kicker}
                variants={cardVariants}
                whileHover="hover"
                className="pe-card"
                style={{
                  position: "relative",
                  flex: "1 1 0",
                  minWidth: 0,
                  background: CARD_BG,
                  border: `1px solid ${CARD_BORDER}`,
                  borderRadius: 24,
                  padding: "34px 32px",
                  boxSizing: "border-box",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  overflow: "hidden",
                }}
              >
                {/* Coral light dot — top */}
                <span
                  style={{
                    position: "absolute",
                    top: 22,
                    insetInlineEnd: 26,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: CORAL,
                    boxShadow: "0 0 12px rgba(244,122,90,0.55)",
                  }}
                />
                {/* Faint coral ambient glow on hover (desktop) */}
                <motion.div
                  variants={glowVariants}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 24,
                    pointerEvents: "none",
                    boxShadow:
                      "inset 0 0 0 1px rgba(244,122,90,0.22), 0 0 40px rgba(244,122,90,0.10)",
                  }}
                />
                <p
                  style={{
                    color: CORAL,
                    fontSize: 16,
                    fontWeight: 600,
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {c.kicker}
                </p>
                <h3
                  style={{
                    color: WHITE,
                    fontSize: "clamp(26px, 2.1vw, 34px)",
                    fontWeight: 700,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    margin: "10px 0 14px",
                  }}
                >
                  {c.title}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.70)",
                    fontSize: "clamp(16px, 1.1vw, 18px)",
                    fontWeight: 400,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {c.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Closing area */}
          <div style={{ maxWidth: 900, margin: "64px auto 0", textAlign: "center" }}>
            <motion.p
              initial={{ opacity: 0, y: hiddenY }}
              whileInView={{ opacity: 1, y: visibleY }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ ...itemTransition, delay: 0.1 }}
              style={{
                color: "rgba(255,255,255,0.78)",
                fontSize: "clamp(24px, 2.4vw, 36px)",
                fontWeight: 600,
                lineHeight: 1.18,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              אתם מקבלים את הקרדיט.{" "}
              <span style={{ color: WHITE, fontWeight: 700 }}>
                בום ביי מפעילה את הכול.
              </span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: hiddenY }}
              whileInView={{ opacity: 1, y: visibleY }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ ...itemTransition, delay: 0.2 }}
              style={{
                color: "rgba(255,255,255,0.62)",
                fontSize: "clamp(16px, 1.3vw, 19px)",
                fontWeight: 400,
                lineHeight: 1.5,
                margin: "16px auto 0",
                maxWidth: 760,
              }}
            >
              יותר ערך לעובדים. פחות עומס לרווחה. בלי להגדיל את תקציב הרווחה הקיים.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: hiddenY }}
              whileInView={{ opacity: 1, y: visibleY }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ ...itemTransition, delay: 0.3 }}
              style={{ marginTop: 34, display: "flex", justifyContent: "center" }}
            >
              <button
                type="button"
                onClick={onCtaClick}
                className="pe-cta"
                style={{
                  background: WHITE,
                  color: "#17191D",
                  border: "1px solid transparent",
                  borderRadius: 999,
                  height: 62,
                  width: "auto",
                  minWidth: 220,
                  maxWidth: 340,
                  padding: "0 34px",
                  fontFamily: "inherit",
                  fontWeight: 700,
                  fontSize: "clamp(18px, 1.2vw, 20px)",
                  cursor: "pointer",
                  boxShadow: "0 12px 36px rgba(255,255,255,0.10)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  transition:
                    "transform 250ms cubic-bezier(0.22,1,0.36,1), background-color 250ms ease, border-color 250ms ease",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: CORAL,
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                לראות את ההבדל
              </button>
            </motion.div>

            <p
              style={{
                color: MICRO,
                fontSize: 14,
                fontWeight: 400,
                margin: "12px 0 0",
                lineHeight: 1.4,
              }}
            >
              ראו מה משתנה לפני ואחרי בום ביי
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .pe-cta:hover{ transform: translateY(-2px); background:#F7F7F4; border-color:rgba(244,122,90,0.55); }
        .pe-cta:focus-visible{ outline:3px solid rgba(244,122,90,0.6); outline-offset:3px; }
        @media (hover:none){ .pe-cta:hover{ transform:none; } }

        @media (max-width:768px){
          .pe-wrap{ padding-left:12px !important; padding-right:12px !important; }
          .pe-panel{ border-radius:24px !important; padding-top:70px !important; padding-bottom:70px !important; padding-right:20px !important; padding-left:20px !important; }
          .pe-cards{ flex-direction:column !important; gap:14px !important; }
          .pe-card{ padding:24px !important; }
        }
      `}</style>
    </section>
  );
}