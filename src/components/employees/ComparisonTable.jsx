import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

const BG = "#F7F7F4";
const CHARCOAL = "#17191D";
const CORAL = "#F47A5A";
const TODAY_BG = "rgba(19,21,25,0.045)";
const TODAY_DOT = "#9AA0A6";
const BOOM_BG = "#FFFFFF";
const BOOM_BORDER = "rgba(244,122,90,0.45)";

const ROWS = [
  ["רגעים בודדים לאורך השנה", "ערך שמורגש בכל יום"],
  ["ספקים ופתרונות שונים", "מערכת אחת שמרכזת הכול"],
  ["אקסלים, הקצאות ופניות עובדים", "ניהול, תפעול ושירות במקום אחד"],
  ["מתנה אחת או אפשרות בחירה מוגבלת", "מגוון רחב וגמישות לעובד"],
  ["הטבות שלא תמיד פוגשות את היום יום", "חיסכון, חוויות וערך לאורך השנה"],
  ["תקציב רווחה כהוצאה תקופתית", "תקציב רווחה כמנוע מחוברות"],
  ["הפעילות מפוזרת בין גורמים שונים", "הארגון מקבל את הקרדיט ובום ביי מפעילה הכול"],
];

const EASE = [0.22, 1, 0.36, 1];

function Arrow() {
  return (
    <span
      aria-hidden="true"
      style={{
        flex: "0 0 auto",
        width: 38,
        height: 38,
        borderRadius: "50%",
        background: "#fff",
        border: "1px solid rgba(244,122,90,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 14px rgba(244,122,90,0.12)",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M15 6l-6 6 6 6"
          stroke={CORAL}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function ComparisonTable() {
  const sectionRef = useRef(null);
  const firedView = useRef(false);
  const firedCta = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !firedView.current) {
            firedView.current = true;
            try {
              base44.analytics.track({ eventName: "comparison_viewed" });
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

  const onCta = () => {
    if (!firedCta.current) {
      firedCta.current = true;
      try {
        base44.analytics.track({ eventName: "comparison_cta_clicked" });
      } catch (err) {
        /* ignore */
      }
    }
    document
      .getElementById("benefits")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="welfare-comparison"
      ref={sectionRef}
      dir="rtl"
      style={{
        background: BG,
        padding: "88px 20px 96px",
        fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif",
        scrollMarginTop: 90,
      }}
    >
      <style>{`
        @media (max-width:768px){ #welfare-comparison{ scroll-margin-top:72px; padding:64px 16px 72px; } }
        .ct-row{ display:flex; align-items:stretch; gap:10px; }
        .ct-side{ flex:1 1 0; min-width:0; display:flex; align-items:center; gap:12px; padding:18px 22px; box-sizing:border-box; }
        .ct-arrow-wrap{ display:flex; align-items:center; }
        @media (max-width:768px){
          .ct-side{ padding:15px 16px; gap:10px; }
          .ct-arrow-wrap{ width:30px; }
          .ct-arrow{ width:30px !important; height:30px !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ color: CORAL, fontWeight: 600, fontSize: "clamp(16px,1.3vw,19px)", margin: 0, letterSpacing: "-0.01em" }}
        >
          לפני ואחרי בום ביי
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.06 }}
          style={{
            color: CHARCOAL,
            fontSize: "clamp(32px,4vw,56px)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            margin: "12px 0 0",
          }}
        >
          אותו תקציב.
          <br />
          חוויית עובד <span style={{ color: CORAL }}>אחרת לגמרי</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.14 }}
          style={{
            color: "#3A3C42",
            fontSize: "clamp(17px,1.4vw,21px)",
            fontWeight: 400,
            lineHeight: 1.6,
            margin: "22px auto 0",
            maxWidth: 760,
          }}
        >
          במקום רווחה שמורגשת ברגעים בודדים, בום ביי הופכת את התקציב הקיים למעטפת שפועלת לאורך כל השנה.
        </motion.p>

        {/* Table — wide bars, two sides + arrow */}
        <div style={{ marginTop: 44, display: "flex", flexDirection: "column", gap: 11 }}>
          {ROWS.map((row, i) => (
            <motion.div
              key={i}
              className="ct-row"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
            >
              {/* Right side — "today" (first in RTL DOM = right) */}
              <div
                className="ct-side"
                style={{ background: TODAY_BG, borderRadius: 20, color: "#5A5F66" }}
              >
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: TODAY_DOT, flex: "0 0 auto" }} />
                <span style={{ fontSize: "clamp(16px,1.3vw,19px)", fontWeight: 500, lineHeight: 1.45, textAlign: "right" }}>
                  {row[0]}
                </span>
              </div>

              <div className="ct-arrow-wrap">
                <Arrow />
              </div>

              {/* Left side — "with boombuy" */}
              <div
                className="ct-side"
                style={{
                  background: BOOM_BG,
                  border: `1px solid ${BOOM_BORDER}`,
                  borderRadius: 20,
                  color: CHARCOAL,
                  boxShadow: "0 8px 26px rgba(244,122,90,0.10)",
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: CORAL, flex: "0 0 auto", boxShadow: "0 0 10px rgba(244,122,90,0.5)" }} />
                <span style={{ fontSize: "clamp(16px,1.3vw,19px)", fontWeight: 600, lineHeight: 1.45, textAlign: "right" }}>
                  {row[1]}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            color: CHARCOAL,
            fontSize: "clamp(20px,2vw,28px)",
            fontWeight: 600,
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
            margin: "44px auto 0",
            maxWidth: 760,
          }}
        >
          אותו תקציב יכול לעבוד הרבה יותר קשה עבור העובדים.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
          style={{ marginTop: 28, display: "flex", justifyContent: "center" }}
        >
          <button
            type="button"
            onClick={onCta}
            style={{
              background: CHARCOAL,
              color: "#fff",
              border: "none",
              borderRadius: 999,
              height: 56,
              minWidth: 240,
              maxWidth: 360,
              padding: "0 30px",
              fontFamily: "inherit",
              fontWeight: 700,
              fontSize: "clamp(16px,1.1vw,18px)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              boxShadow: "0 10px 28px rgba(23,25,29,0.18)",
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: CORAL, display: "inline-block", flexShrink: 0 }} />
            לראות את הערך בפועל
          </button>
        </motion.div>
      </div>
    </section>
  );
}