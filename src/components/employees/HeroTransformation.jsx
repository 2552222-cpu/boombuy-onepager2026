import React, { useState, useRef, useEffect } from "react";
import { Calendar } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { scrollToId } from "./uiHelpers";
import { CHARCOAL, WARM_WHITE } from "./hero/heroShared";
import InlineLogoRail from "@/components/employees/InlineLogoRail";
import MobileHeroMedia from "@/components/employees/hero/MobileHeroMedia";

const CORAL = "#F47A5A";
const EASE = [0.22, 1, 0.36, 1];

export default function HeroTransformation() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [isNarrow, setIsNarrow] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const headingY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  const headingWords = [
    { t: "מועדון", c: false },
    { t: "העובדים", c: false },
    { t: "שלכם.", c: false, br: true },
    { t: "אנחנו", c: true },
    { t: "מפעילים", c: true },
    { t: "אותו.", c: true },
  ];

  useEffect(() => {
    const c = () => {
      setIsMobile(window.innerWidth < 768);
      setIsNarrow(window.innerWidth <= 1024);
    };
    c();
    window.addEventListener("resize", c);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMq = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", onMq);
    return () => {
      window.removeEventListener("resize", c);
      mq.removeEventListener?.("change", onMq);
    };
  }, []);

  const inImageBtn = {
    position: "absolute",
    bottom: isMobile ? 12 : 16,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 20,
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(23,25,29,0.10)",
    borderRadius: 999,
    height: isMobile ? 38 : 48,
    padding: isMobile ? "0 14px" : "0 22px",
    fontFamily: "var(--font-heebo)",
    fontWeight: 700,
    fontSize: isMobile ? 13 : 16,
    color: CHARCOAL,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    whiteSpace: "nowrap",
    boxShadow: isMobile ? "0 4px 14px rgba(0,0,0,0.14)" : "0 8px 24px rgba(0,0,0,0.18)",
  };

  const btnDark = {
    background: CHARCOAL, color: "#fff", border: "none", borderRadius: 999, height: 56,
    padding: "0 26px", fontFamily: "inherit", fontWeight: 700, fontSize: "clamp(15px,1.1vw,17px)",
    cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
    boxShadow: "0 8px 24px rgba(23,25,29,0.18)",
  };

  const proof = [
    { num: 300, suffix: "+", small: "ארגונים כבר איתנו", ltr: true },
    { num: 8, suffix: " מתוך 10", small: "עובדים מצטרפים תוך שבועות" },
    { num: 0, suffix: "", small: "ארגונים עזבו" },
  ];

  return (
    <section
      id="hero-transformation"
      ref={sectionRef}
      style={{ background: WARM_WHITE, direction: "rtl", paddingTop: isMobile ? 0 : 8, paddingBottom: isMobile ? 16 : 12, fontFamily: "var(--font-heebo)" }}
    >
      <style>{`
        #hero-transformation{ scroll-margin-top:90px; }
        @media (max-width:768px){ #hero-transformation{ scroll-margin-top:72px; } }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "0 16px" : "0 32px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <motion.div style={{ marginTop: isMobile ? 20 : 18, marginBottom: 24, textAlign: "center", width: "100%", y: (reducedMotion || isMobile) ? 0 : headingY, opacity: (reducedMotion || isMobile) ? 1 : headingOpacity }}>
          <motion.h1
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: reducedMotion ? 0 : 0.06, delayChildren: 0.1 } } }}
            style={{ color: CHARCOAL, fontSize: isMobile ? 30 : "clamp(34px,5.4vw,68px)", fontWeight: 800, lineHeight: isMobile ? 1.12 : 1.04, letterSpacing: isMobile ? "-0.02em" : "-0.03em", margin: 0 }}
          >
            {headingWords.map((w, i) => (
              <React.Fragment key={i}>
                <motion.span
                  variants={{ hidden: { opacity: 1, y: reducedMotion ? 0 : 14 }, show: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0.15 : 0.5, ease: EASE } } }}
                  style={{ display: "inline-block", color: w.c ? "#C24A2C" : CHARCOAL, willChange: "transform" }}
                >
                  {w.t}
                </motion.span>
                {w.br && isMobile ? <br /> : " "}
              </React.Fragment>
            ))}
          </motion.h1>
          <p style={{ color: "#3A3C42", fontSize: isMobile ? 15 : "clamp(15px,1.8vw,20px)", fontWeight: 500, lineHeight: 1.5, margin: isMobile ? "8px auto 16px" : "12px auto 0", maxWidth: isMobile ? 320 : 640 }}>
            הטבה חדשה לעובדים כל בוקר, בשם הארגון. אתם מחליטים, אנחנו מבצעים.
          </p>
        </motion.div>

        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <motion.div style={{ width: "100%", y: (reducedMotion || isMobile) ? 0 : mediaY, scale: (reducedMotion || isMobile) ? 1 : mediaScale }}>
            <motion.div
              initial={(reducedMotion || isMobile) ? false : { scale: 0.985 }}
              animate={(reducedMotion || isMobile) ? {} : { scale: 1 }}
              transition={reducedMotion ? { duration: 0.15 } : { duration: 0.7, ease: EASE, delay: 0.45 }}
              style={{ width: "100%" }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: 1100,
                  margin: "0 auto",
                  aspectRatio: "16 / 9",
                  borderRadius: isMobile ? 20 : 34,
                  overflow: "hidden",
                  boxShadow: "0 24px 70px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.3)",
                  background: "#000",
                }}
              >
                <MobileHeroMedia reducedMotion={reducedMotion} buttonStyle={inImageBtn} />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Below-media CTA */}
        <div style={{ marginTop: isMobile ? 16 : 20, display: "flex", flexDirection: isMobile ? "column" : "row", flexWrap: "wrap", gap: isMobile ? 0 : 12, justifyContent: "center", alignItems: "center", width: "100%" }}>
          <button type="button" className="bb-btn bb-pulse-btn" onClick={() => scrollToId("organization-fit")} style={{ ...btnDark, width: isMobile ? "100%" : undefined, height: isMobile ? 52 : 56, fontSize: isMobile ? 16 : "clamp(15px,1.1vw,17px)" }}>
            <span className="bb-pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: CORAL, display: "inline-block", flexShrink: 0 }} />
            <Calendar size={18} color="#fff" strokeWidth={2.4} />
            לתיאום הדגמה של 15 דקות
          </button>
        </div>

        {/* Proof row */}
        <div style={{ marginTop: isMobile ? 18 : 22, display: "flex", flexWrap: isMobile ? "nowrap" : "wrap", justifyContent: "center", gap: isMobile ? 10 : 28, width: "100%" }}>
          {proof.map((p) => (
            <div key={p.small} style={{ textAlign: "center", flex: isMobile ? "1 1 0" : "1 1 90px", maxWidth: 260, minWidth: 0 }}>
              <div style={{ color: CHARCOAL, fontSize: isMobile ? 22 : "clamp(20px,2.4vw,28px)", fontWeight: 800, lineHeight: 1.1 }} dir={p.ltr ? "ltr" : undefined}>
                {p.num}{p.suffix}
              </div>
              <div style={{ color: "#5A5C62", fontSize: isMobile ? 12 : "clamp(12px,1.1vw,14px)", fontWeight: 500, marginTop: 2, lineHeight: 1.3 }}>
                {p.small}
              </div>
            </div>
          ))}
        </div>

        {isNarrow && <InlineLogoRail />}
      </div>
    </section>
  );
}