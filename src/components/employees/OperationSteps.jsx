import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { RevealBlock } from "./motion";
import { SECTION } from "./layoutTokens";

const BG = SECTION.BG_WHITE;
const CHARCOAL = SECTION.CHARCOAL;
const CORAL = SECTION.BTN_CORAL;

const STEPS = [
  { n: "1", title: "מסכמים תוכנית וכללים", text: "מגדירים יחד את התוכנית, הזכאות, התקציב והאישורים." },
  { n: "2", title: "מקימים ומשיקים", text: "אנחנו מטפלים במיתוג, בספקים ובהשקה." },
  { n: "3", title: "מפעילים ותומכים לאורך השנה", text: "מטפלים בהזמנות, בתקשורת ובשירות לעובדים, ומדווחים לכם." },
];

export default function OperationSteps() {
  const ref = useRef(null);
  const fired = useRef(false);
  const reduce = typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !fired.current) {
            fired.current = true;
            try { base44.analytics.track({ eventName: "operation_steps_viewed" }); } catch (err) { /* ignore */ }
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
      className="bb-section"
      ref={ref}
      dir="rtl"
      style={{ background: BG, fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif", scrollMarginTop: 90 }}
    >
      <style>{`
        @media (max-width:768px){ #operation-steps{ scroll-margin-top:72px; }
          .os-list{ position:relative; }
          .os-line{ position:absolute; right:15px; top:16px; bottom:16px; width:2px; background:rgba(244,122,90,0.25); }
        }
      `}</style>

      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center", padding: "0 16px" }}>
        <RevealBlock style={{ color: SECTION.CORAL_TEXT, fontWeight: SECTION.KICKER_WEIGHT, fontSize: SECTION.KICKER_SIZE, letterSpacing: "-0.01em", margin: "0 0 8px" }}>איך זה עובד</RevealBlock>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ color: CHARCOAL, fontSize: `clamp(${SECTION.H2_MOBILE}px,4vw,48px)`, fontWeight: SECTION.H2_WEIGHT, lineHeight: SECTION.H2_LH, letterSpacing: "-0.025em", margin: 0 }}
        >
          אתם מחליטים. <span style={{ color: SECTION.CORAL_TEXT }}>אנחנו מבצעים.</span>
        </motion.h2>

        <RevealBlock
          delay={0.08}
          style={{ color: SECTION.BODY_COLOR, fontSize: `clamp(${SECTION.BODY_MOBILE}px,1.4vw,${SECTION.BODY_DESKTOP}px)`, lineHeight: SECTION.BODY_LH, margin: "14px auto 0", maxWidth: 640 }}
        >
          מגדירים יחד את התוכנית, הזכאות, התקציב והאישורים. אנחנו מטפלים בהקמה, בתפעול ובשירות בהתאם למסלול.
        </RevealBlock>

        {/* Desktop progress line */}
        <div className="os-desktop-line">
          <div style={{ position: "relative", width: "70%", maxWidth: 600, height: 2, margin: "0 auto 30px", background: "rgba(244,122,90,0.15)", borderRadius: 999 }}>
            <motion.div style={{ position: "absolute", inset: 0, background: CORAL, transformOrigin: "right", scaleX: reduce ? 1 : lineScale, borderRadius: 999 }} />
          </div>
        </div>

        {/* Desktop: 3 cards */}
        <div className="os-desktop" style={{ display: "flex", flexWrap: "wrap", gap: 18, marginTop: 44, justifyContent: "center" }}>
          {STEPS.map((s, i) => (
            <RevealBlock
              key={s.n}
              delay={i * 0.08}
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
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: CORAL, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18, marginBottom: 16 }}>{s.n}</div>
              <h3 style={{ color: CHARCOAL, fontSize: "clamp(19px,1.6vw,22px)", fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.01em" }}>{s.title}</h3>
              <p style={{ color: "#3A3C42", fontSize: "clamp(15px,1.2vw,17px)", lineHeight: 1.6, margin: 0 }}>{s.text}</p>
            </RevealBlock>
          ))}
        </div>

        {/* Mobile: vertical compact list with connecting line */}
        <div className="os-list" style={{ position: "relative", marginTop: 28, textAlign: "right" }}>
          <div className="os-line" />
          {STEPS.map((s, i) => (
            <RevealBlock
              key={s.n}
              delay={i * 0.06}
              style={{ position: "relative", display: "flex", gap: 14, alignItems: "flex-start", padding: "12px 0", paddingRight: 0 }}
            >
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: CORAL, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 15, flex: "0 0 auto", zIndex: 1, marginTop: 2 }}>{s.n}</div>
              <div>
                <h3 style={{ color: CHARCOAL, fontSize: 17, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.01em" }}>{s.title}</h3>
                <p style={{ color: "#3A3C42", fontSize: 15, lineHeight: 1.55, margin: 0 }}>{s.text}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width:769px){ .os-list{ display:none !important; } }
        @media (max-width:768px){ .os-desktop, .os-desktop-line{ display:none !important; } }
      `}</style>
    </section>
  );
}