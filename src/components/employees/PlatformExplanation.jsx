import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Gift, Building2, Coffee } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { RevealHeading, RevealBlock, EASE } from "./motion";
import { SECTION } from "./layoutTokens";

const PANEL_BG = "#15171B";
const PANEL_GRADIENT = "radial-gradient(circle at 50% 18%, rgba(244,122,90,0.10), transparent 40%)";
const WHITE = "#FFFFFF";
const CORAL = "#F47A5A";
const TEXT_MUTED = "rgba(255,255,255,0.74)";
const CARD_BG = "rgba(255,255,255,0.055)";
const CARD_BORDER = "rgba(255,255,255,0.10)";

const CARDS = [
  { icon: Gift, kicker: "לעובדים", text: "הטבה חדשה כל בוקר, וולנס, תרבות וחופשות. כל השנה." },
  { icon: Building2, kicker: "לארגון", text: "מועדון בשם שלכם, שמרגישים בו את הארגון בכל יום." },
  { icon: Coffee, kicker: "לרווחה", text: "בלי ספקים, בלי טלפונים. אנחנו מטפלים בהכול." },
];

function Card({ c, active, i }) {
  const Icon = c.icon;
  return (
    <div
      className="pe-card"
      style={{
        scrollSnapAlign: "center",
        flex: "0 0 78%",
        maxWidth: 360,
        background: CARD_BG,
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: 24,
        padding: "26px 24px",
        boxSizing: "border-box",
        textAlign: "right",
        transform: active ? "scale(1)" : "scale(0.96)",
        opacity: active ? 1 : 0.8,
        transition: "transform .25s ease, opacity .25s ease",
      }}
    >
      <span style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(244,122,90,0.14)", color: CORAL, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={24} strokeWidth={2.2} />
      </span>
      <p style={{ color: CORAL, fontSize: 16, fontWeight: 600, margin: "14px 0 0", letterSpacing: "-0.01em" }}>{c.kicker}</p>
      <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "clamp(16px,1.1vw,18px)", fontWeight: 400, lineHeight: 1.6, margin: "10px 0 0" }}>{c.text}</p>
    </div>
  );
}

export default function PlatformExplanation() {
  const sectionRef = useRef(null);
  const firedView = useRef(false);
  const scrollerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState(0);
  const reduce = typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start 0.35"] });
  const panelScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const panelRadius = useTransform(scrollYProgress, [0, 1], [48, 32]);

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 768);
    c();
    window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !firedView.current) {
            firedView.current = true;
            try { base44.analytics.track({ eventName: "platform_explanation_viewed" }); } catch (err) { /* ignore */ }
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const center = el.getBoundingClientRect().left + el.clientWidth / 2;
    let best = 0, bestD = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const cc = child.getBoundingClientRect().left + child.clientWidth / 2;
      const d = Math.abs(cc - center);
      if (d < bestD) { bestD = d; best = i; }
    });
    setActive(best);
  };

  return (
    <section
      id="platform-explanation"
      className="bb-section"
      dir="rtl"
      style={{ background: "transparent", padding: "24px 0", fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif" }}
    >
      <div className="pe-wrap" style={{ maxWidth: 1240, margin: "0 auto", paddingLeft: 48, paddingRight: 48 }}>
        <motion.div
          ref={sectionRef}
          className="pe-panel"
          style={{
            position: "relative",
            background: PANEL_BG,
            backgroundImage: PANEL_GRADIENT,
            borderRadius: reduce ? 32 : panelRadius,
            scale: reduce ? 1 : panelScale,
            overflow: "hidden",
            paddingTop: "clamp(56px, 7vw, 96px)",
            paddingBottom: "clamp(56px, 7vw, 96px)",
            paddingRight: "clamp(24px, 4vw, 56px)",
            paddingLeft: "clamp(24px, 4vw, 56px)",
          }}
        >
          <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
            <RevealBlock style={{ color: CORAL, fontWeight: SECTION.KICKER_WEIGHT, fontSize: SECTION.KICKER_SIZE, letterSpacing: "-0.01em", margin: "0 0 10px" }}>מה אנחנו עושים</RevealBlock>
            <RevealHeading
              as="h2"
              style={{ color: WHITE, fontSize: `clamp(28px,4.4vw,60px)`, fontWeight: SECTION.H2_WEIGHT, lineHeight: 1.06, letterSpacing: "-0.025em", margin: 0 }}
            >
              הופכים תקציב רווחה קיים<br />לחוויית עובד שעובדת בכל יום.
            </RevealHeading>

            <RevealBlock
              delay={0.12}
              style={{ color: TEXT_MUTED, fontSize: `clamp(${SECTION.BODY_MOBILE}px,1.4vw,21px)`, fontWeight: 400, lineHeight: 1.65, margin: "22px auto 0", maxWidth: 820 }}
            >
              אנחנו מקימים, ממתגים, מפעילים ונותנים שירות לעובדים. אתם רק מאשרים.
            </RevealBlock>
          </div>

          {isMobile ? (
            <>
              <div
                ref={scrollerRef}
                onScroll={onScroll}
                style={{
                  display: "flex",
                  gap: 14,
                  marginTop: 34,
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                  padding: "0 4px",
                }}
              >
                {CARDS.map((c, i) => (
                  <Card key={c.kicker} c={c} active={i === active} i={i} />
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 18 }}>
                {CARDS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      const el = scrollerRef.current;
                      if (el) el.scrollTo({ left: i * (el.clientWidth * 0.78 + 14), behavior: "smooth" });
                    }}
                    aria-label={`עבור ל${CARDS[i].kicker}`}
                    style={{ width: i === active ? 22 : 8, height: 8, borderRadius: 999, border: "none", background: i === active ? CORAL : "rgba(255,255,255,0.25)", padding: 0, cursor: "pointer", transition: "width .25s ease, background .25s ease" }}
                  />
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
              className="pe-cards"
              style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20, marginTop: 48, maxWidth: 1180, marginLeft: "auto", marginRight: "auto" }}
            >
              {CARDS.map((c) => (
                <motion.div
                  key={c.kicker}
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                  className="pe-card"
                  style={{ flex: "1 1 280px", maxWidth: 360, background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderRadius: 24, padding: "30px 28px", boxSizing: "border-box", textAlign: "right" }}
                >
                  <span style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(244,122,90,0.14)", color: CORAL, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <c.icon size={24} strokeWidth={2.2} />
                  </span>
                  <p style={{ color: CORAL, fontSize: 16, fontWeight: 600, margin: "14px 0 0", letterSpacing: "-0.01em" }}>{c.kicker}</p>
                  <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "clamp(16px,1.15vw,18px)", fontWeight: 400, lineHeight: 1.6, margin: "10px 0 0" }}>{c.text}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      <style>{`
        @media (max-width:768px){
          .pe-wrap{ padding-left:12px !important; padding-right:12px !important; }
          .pe-panel{ border-radius:24px !important; padding-top:32px !important; padding-bottom:32px !important; padding-right:20px !important; padding-left:20px !important; }
          #platform-explanation{ padding:40px 0 !important; }
        }
      `}</style>
    </section>
  );
}