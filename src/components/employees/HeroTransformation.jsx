import React, { useState, useRef, useEffect } from "react";
import { Play, Calendar } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { scrollToId } from "./uiHelpers";
import {
  BEFORE_IMG,
  AFTER_IMG,
  VIDEO_SRC,
  CHARCOAL,
  WARM_WHITE,
} from "./hero/heroShared";
import { photo } from "@/lib/img";
import InlineLogoRail from "@/components/employees/InlineLogoRail";
import MobileHeroMedia from "@/components/employees/hero/MobileHeroMedia";
import useHeroPlayback from "@/components/employees/hero/useMobileHeroPlayback";

const CORAL = "#F47A5A";
const EASE = [0.22, 1, 0.36, 1];

function CountUp({ to, suffix, reducedMotion }) {
  const ref = useRef(null);
  const [val, setVal] = useState(reducedMotion ? to : 0);
  const done = useRef(reducedMotion);
  useEffect(() => {
    if (reducedMotion) { setVal(to); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const start = performance.now();
          const dur = 1200;
          const tick = (now) => {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(Math.round(to * eased));
            if (t < 1) requestAnimationFrame(tick);
            else setVal(to);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, reducedMotion]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export default function HeroTransformation() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [isNarrow, setIsNarrow] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const headingY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  // Desktop shares the same play-once logic as mobile.
  const { videoRef: desktopVideoRef, phase: desktopPhase, start: desktopStart, onPlaying: desktopOnPlaying, onEnded: desktopOnEnded, onError: desktopOnError } = useHeroPlayback(reducedMotion);

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

  const showBeforeDesktop = ["idle", "loading", "failed"].includes(desktopPhase);
  const imageStyle = { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 50%" };
  const fade = reducedMotion ? "none" : "opacity 300ms ease";

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
                {isMobile ? (
                  <MobileHeroMedia reducedMotion={reducedMotion} buttonStyle={inImageBtn} />
                ) : (
                  <>
                    <video
                      ref={desktopVideoRef}
                      src={VIDEO_SRC}
                      muted
                      playsInline
                      preload={desktopPhase === "idle" ? "metadata" : "auto"}
                      onPlaying={desktopOnPlaying}
                      onEnded={desktopOnEnded}
                      onError={desktopOnError}
                      aria-label="סרטון השדרוג, עשר שניות ללא קול"
                      style={{ ...imageStyle, zIndex: 2 }}
                    >
                      <track kind="captions" srcLang="he" label="עברית" src="/hero-captions.vtt" />
                    </video>
                    <img
                      src={photo(BEFORE_IMG, 1280, 720, 76)}
                      srcSet={`${photo(BEFORE_IMG, 800, 450, 72)} 800w, ${photo(BEFORE_IMG, 1280, 720, 76)} 1280w, ${photo(BEFORE_IMG, 1600, 900, 78)} 1600w`}
                      sizes="(max-width:768px) 100vw, 1100px"
                      alt="מנהלת רווחה בעומס"
                      width={1600}
                      height={900}
                      fetchPriority="high"
                      loading="eager"
                      decoding="async"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = BEFORE_IMG; }}
                      style={{ ...imageStyle, zIndex: 3, opacity: showBeforeDesktop ? 1 : 0, transition: fade }}
                    />
                    <img
                      src={photo(AFTER_IMG, 1600, 900)}
                      srcSet={`${photo(AFTER_IMG, 960, 540)} 960w, ${photo(AFTER_IMG, 1600, 900)} 1600w`}
                      sizes="(max-width:768px) 100vw, 1100px"
                      alt="מנהלת רווחה רגועה עם קפה"
                      width={1600}
                      height={900}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = AFTER_IMG; }}
                      style={{ ...imageStyle, zIndex: 4, opacity: desktopPhase === "complete" ? 1 : 0, transition: fade }}
                    />
                    {desktopPhase === "failed" && (
                      <button type="button" onClick={() => desktopStart(false)} style={inImageBtn} aria-label="להפעיל את הסרטון">
                        <Play size={16} color={CHARCOAL} strokeWidth={2.5} />להפעיל
                      </button>
                    )}
                  </>
                )}
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
                <CountUp to={p.num} suffix={p.suffix} reducedMotion={reducedMotion} />
              </div>
              <div style={{ color: "#5A5C62", fontSize: isMobile ? 12 : "clamp(12px,1.1vw,14px)", fontWeight: 500, marginTop: 2, lineHeight: 1.3, display: isMobile ? "-webkit-box" : undefined, WebkitLineClamp: isMobile ? 2 : undefined, WebkitBoxOrient: isMobile ? "vertical" : undefined, overflow: isMobile ? "hidden" : undefined }}>
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