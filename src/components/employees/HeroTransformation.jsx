import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BEFORE_IMG = "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/f2a441019_START-FRAME2.png";
const AFTER_IMG = "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/0a0298c58_END-FRAME-CORRECTED2.png";
const VIDEO_SRC = "https://media.base44.com/videos/public/69e48538aaee477b09fc7b49/fe014e428__23.mp4";

const CHARCOAL = "#1D1D1F";
const CORAL = "#F26847";
const WARM_WHITE = "#FBFAF8";

const DARK_SCRIM =
  "linear-gradient(to left, rgba(29,29,31,0.8) 0%, rgba(29,29,31,0.55) 46%, rgba(29,29,31,0.14) 80%, rgba(29,29,31,0) 100%)";

const TAGS = [
  { word: "ספקים",  x: 12, y: 60, delay: 0.35, float: 2.8 },
  { word: "מתנות",  x: 30, y: 58, delay: 0.60, float: 3.2 },
  { word: "אירועים", x: 48, y: 61, delay: 0.85, float: 2.6 },
  { word: "הטבות",  x: 64, y: 59, delay: 1.10, float: 3.4 },
  { word: "עובדים", x: 20, y: 76, delay: 1.35, float: 2.9 },
  { word: "אקסלים", x: 40, y: 78, delay: 1.60, float: 3.1 },
  { word: "תקלות",  x: 60, y: 75, delay: 1.85, float: 2.7 },
];
const CONVERGE = { x: 42, y: 64 };

function CoralDot() {
  return (
    <span
      style={{
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: CORAL,
        display: "inline-block",
        flexShrink: 0,
      }}
    />
  );
}

const tagStyle = {
  background: "rgba(255,255,255,0.94)",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  color: CHARCOAL,
  borderRadius: 18,
  padding: "0 22px",
  height: 52,
  fontSize: 21,
  fontWeight: 650,
  fontFamily: "var(--font-heebo)",
  display: "inline-flex",
  alignItems: "center",
  gap: 9,
  boxShadow: "0 5px 16px rgba(0,0,0,0.14)",
  whiteSpace: "nowrap",
};

function IntroTags({ introPhase, isMobile }) {
  const list = isMobile ? TAGS.slice(0, 4) : TAGS;
  return (
    <>
      {list.map((tag, i) => {
        const midX = (tag.x + CONVERGE.x) / 2;
        const midY = (tag.y + CONVERGE.y) / 2 - 8;
        return (
          <motion.div
            key={tag.word}
            initial={{ left: `${tag.x}%`, top: `${tag.y}%` }}
            animate={
              introPhase === "converge"
                ? {
                    left: [`${tag.x}%`, `${midX}%`, `${CONVERGE.x}%`],
                    top: [`${tag.y}%`, `${midY}%`, `${CONVERGE.y}%`],
                  }
                : { left: `${tag.x}%`, top: `${tag.y}%` }
            }
            transition={
              introPhase === "converge"
                ? { duration: 0.6, delay: i * 0.085, ease: "easeInOut", times: [0, 0.5, 1] }
                : { duration: 0.4, ease: "easeOut" }
            }
            style={{ position: "absolute", zIndex: 7 }}
          >
            <motion.div
              animate={introPhase === "converge" ? { y: 0 } : { y: [0, -5, 0] }}
              transition={
                introPhase === "converge"
                  ? { duration: 0.3 }
                  : { duration: tag.float, repeat: Infinity, ease: "easeInOut", delay: tag.delay + 0.45 }
              }
            >
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                animate={
                  introPhase === "converge"
                    ? { opacity: 0, scale: 0.65, y: 0 }
                    : introPhase === "headline"
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 12, scale: 0.9 }
                }
                transition={
                  introPhase === "converge"
                    ? { duration: 0.6, delay: i * 0.085, ease: "easeIn" }
                    : { duration: 0.4, delay: tag.delay, ease: "easeOut" }
                }
                style={tagStyle}
              >
                {tag.word}
                <CoralDot />
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </>
  );
}

function IntroTextBlock({ introPhase, isMobile, onStart }) {
  if (isMobile) return null;
  return (
    <motion.div
      animate={introPhase === "converge" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: introPhase === "converge" ? 0.4 : 0.3 }}
      style={{
        position: "absolute",
        top: "40%",
        right: 80,
        transform: "translateY(-50%)",
        zIndex: 6,
        maxWidth: "30%",
        textAlign: "right",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 16,
      }}
    >
      {/* very subtle white gradient for readability — not a card */}
      <div
        style={{
          position: "absolute",
          inset: -24,
          background:
            "linear-gradient(to left, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.22) 55%, transparent 100%)",
          borderRadius: 24,
          zIndex: -1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          color: CORAL,
          fontSize: 19,
          fontWeight: 600,
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "var(--font-heebo)",
        }}
      >
        <CoralDot />
        <span>נראה מוכר?</span>
      </div>
      <h1
        style={{
          fontSize: "clamp(44px, 4vw, 50px)",
          fontWeight: 700,
          color: CHARCOAL,
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          margin: 0,
          maxWidth: 390,
          fontFamily: "var(--font-heebo)",
        }}
      >
        כמה ידיים צריך כדי לנהל רווחה?
      </h1>
      <motion.button
        animate={introPhase === "idle" ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onStart}
        style={{
          background: CHARCOAL,
          color: "#fff",
          border: "none",
          cursor: "pointer",
          height: 54,
          padding: "0 24px",
          borderRadius: 14,
          fontSize: 18,
          fontWeight: 700,
          fontFamily: "var(--font-heebo)",
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          boxShadow: "0 6px 16px rgba(0,0,0,0.18)",
          width: "fit-content",
          pointerEvents: introPhase === "idle" ? "auto" : "none",
        }}
      >
        לראות את השדרוג
        <CoralDot />
      </motion.button>
    </motion.div>
  );
}

function IntroTextBlockMobile({ introPhase, onStart }) {
  return (
    <motion.div
      animate={introPhase === "converge" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: introPhase === "converge" ? 0.4 : 0.3 }}
      style={{
        background: WARM_WHITE,
        borderRadius: 16,
        padding: "18px 18px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 12,
        textAlign: "right",
      }}
    >
      <div
        style={{
          color: CORAL,
          fontSize: 18,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "var(--font-heebo)",
        }}
      >
        <CoralDot />
        <span>נראה מוכר?</span>
      </div>
      <h1
        style={{
          fontSize: "clamp(34px, 8vw, 38px)",
          fontWeight: 700,
          color: CHARCOAL,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          margin: 0,
          fontFamily: "var(--font-heebo)",
        }}
      >
        כמה ידיים צריך כדי לנהל רווחה?
      </h1>
      <motion.button
        animate={introPhase === "idle" ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onStart}
        style={{
          background: CHARCOAL,
          color: "#fff",
          border: "none",
          cursor: "pointer",
          height: 52,
          padding: "0 22px",
          borderRadius: 14,
          fontSize: 17,
          fontWeight: 700,
          fontFamily: "var(--font-heebo)",
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          boxShadow: "0 6px 16px rgba(0,0,0,0.18)",
          width: "fit-content",
          pointerEvents: introPhase === "idle" ? "auto" : "none",
        }}
      >
        לראות את השדרוג
        <CoralDot />
      </motion.button>
    </motion.div>
  );
}

function AfterHeadline({ stage, isMobile }) {
  const underlineWidth = isMobile ? 120 : 180;
  return (
    <h1
      style={{
        fontSize: isMobile ? "clamp(40px, 11vw, 46px)" : "clamp(52px, 5.8vw, 72px)",
        fontWeight: 700,
        color: "#fff",
        lineHeight: 1.06,
        letterSpacing: "-0.02em",
        margin: "0 0 24px",
        maxWidth: isMobile ? "100%" : 620,
        fontFamily: "var(--font-heebo)",
        textAlign: "right",
      }}
    >
      <span style={{ display: "block", overflow: "hidden" }}>
        <motion.span
          initial={{ y: "110%", opacity: 0 }}
          animate={stage >= 1 ? { y: "0%", opacity: 1 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "block" }}
        >
          התקציב עובד יותר.
        </motion.span>
      </span>
      <span style={{ display: "block", overflow: "hidden", marginTop: 4 }}>
        <motion.span
          initial={{ y: "110%", opacity: 0 }}
          animate={stage >= 2 ? { y: "0%", opacity: 1 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "block", fontWeight: 800, position: "relative", paddingBottom: 8 }}
        >
          את פחות.
          <motion.span
            initial={{ scaleX: 0 }}
            animate={stage >= 2 ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              height: 2.5,
              width: underlineWidth,
              background: CORAL,
              borderRadius: 2,
              transformOrigin: "right center",
              opacity: 0.85,
            }}
          />
        </motion.span>
      </span>
    </h1>
  );
}

function AfterContent({ stage, phase, onContinue, isMobile }) {
  return (
    <div style={{ textAlign: "right" }}>
      <AfterHeadline stage={stage} isMobile={isMobile} />
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={phase === "after" ? { opacity: 0.85, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        style={{
          fontSize: "clamp(19px, 1.9vw, 22px)",
          color: "rgba(255,255,255,0.85)",
          lineHeight: 1.55,
          margin: "0 0 28px",
          maxWidth: 520,
          fontWeight: 400,
          fontFamily: "var(--font-heebo)",
        }}
      >
        בום ביי מרכזת את הרווחה, המתנות, ההטבות והשירות לעובדים במערכת אחת.
      </motion.p>
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={phase === "after" ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
        whileHover={{ y: -2, boxShadow: "0 14px 28px rgba(0,0,0,0.22)" }}
        onClick={onContinue}
        style={{
          background: "#FFFFFF",
          color: CHARCOAL,
          border: "none",
          cursor: "pointer",
          width: "fit-content",
          maxWidth: 330,
          height: 56,
          padding: "0 26px",
          borderRadius: 16,
          fontSize: 18,
          fontWeight: 800,
          fontFamily: "var(--font-heebo)",
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          boxShadow: "0 6px 18px rgba(0,0,0,0.16)",
          marginLeft: "auto",
        }}
      >
        ומה העובדים מרגישים?
        <CoralDot />
      </motion.button>
    </div>
  );
}

export default function HeroTransformation() {
  const [phase, setPhase] = useState("before");
  const [introPhase, setIntroPhase] = useState("idle");
  const [isMobile, setIsMobile] = useState(false);
  const [outro, setOutro] = useState(false);
  const [headlineStage, setHeadlineStage] = useState(0);
  const [crossfade, setCrossfade] = useState(false);
  const [flash, setFlash] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [lightExpand, setLightExpand] = useState(false);
  const [lightFade, setLightFade] = useState(false);
  const [videoStart, setVideoStart] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = AFTER_IMG;
  }, []);

  // Intro: headline -> converge (after reading time)
  useEffect(() => {
    if (introPhase !== "headline") return;
    const convergeStart = isMobile ? 3300 : 3700;
    const t1 = setTimeout(() => setIntroPhase("converge"), convergeStart);
    return () => clearTimeout(t1);
  }, [introPhase, isMobile]);

  // Intro: converge -> light transition -> video
  useEffect(() => {
    if (introPhase !== "converge") return;
    const tGlow = setTimeout(() => setLightOn(true), 600);
    const tExpand = setTimeout(() => setLightExpand(true), 850);
    const tVideo = setTimeout(() => {
      setVideoStart(true);
      setPhase("video");
      setIntroPhase("done");
    }, 1100);
    const tFade = setTimeout(() => setLightFade(true), 1350);
    const tOff = setTimeout(() => setLightOn(false), 1700);
    return () => {
      clearTimeout(tGlow);
      clearTimeout(tExpand);
      clearTimeout(tVideo);
      clearTimeout(tFade);
      clearTimeout(tOff);
    };
  }, [introPhase]);

  // Outro sequence (video -> after) — unchanged
  useEffect(() => {
    if (!outro) return;
    setHeadlineStage(1);
    const t2 = setTimeout(() => setHeadlineStage(2), 350);
    const t3 = setTimeout(() => setCrossfade(true), 400);
    const t4 = setTimeout(() => setFlash(true), 550);
    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [outro]);

  const startIntro = () => setIntroPhase("headline");

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration || !isFinite(v.duration)) return;
    const remaining = v.duration - v.currentTime;
    if (remaining <= 1.0 && !outro) setOutro(true);
  };

  const handleEnded = () => {
    setOutro(true);
    setHeadlineStage(2);
    setCrossfade(true);
    setPhase("after");
  };

  const scrollToDemo = () =>
    document.getElementById("demo-form-section")?.scrollIntoView({ behavior: "smooth" });

  const baseMedia = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectPosition: "center",
  };

  const cardShadow =
    "0 24px 70px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.3)";

  const glowBackground =
    "radial-gradient(ellipse at 56% 42%, rgba(255,238,228,0.6) 0%, rgba(251,250,248,0.18) 52%, rgba(251,250,248,0) 78%)";

  const renderMedia = () => (
    <>
      {/* Before image — clean until light expand, then blur/scale; removed when video starts */}
      {!videoStart && (
        <motion.img
          key="before-media"
          src={BEFORE_IMG}
          alt="מנהלת רווחה בעומס"
          animate={
            lightExpand
              ? { filter: "blur(10px)", scale: 1.015, opacity: 0.55 }
              : { filter: "blur(0px)", scale: 1, opacity: 1 }
          }
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ ...baseMedia, objectFit: isMobile ? "contain" : "cover", zIndex: 1 }}
        />
      )}

      {/* Video — starts behind the light, fades in as light recedes */}
      {phase === "video" && (
        <motion.video
          key="video-media"
          ref={videoRef}
          src={VIDEO_SRC}
          poster={BEFORE_IMG}
          autoPlay
          muted
          playsInline
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeInOut" } }}
          style={{ ...baseMedia, objectFit: isMobile ? "contain" : "cover", background: "#000", zIndex: 1 }}
        />
      )}

      {(outro || phase === "after") && (
        <motion.img
          key="after-media"
          src={AFTER_IMG}
          alt="מנהלת רווחה רגועה מול מערכת BoomBuy"
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={
            crossfade || phase === "after"
              ? { opacity: 1, filter: "blur(0px)" }
              : { opacity: 0, filter: "blur(4px)" }
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ ...baseMedia, objectFit: isMobile ? "contain" : "cover", zIndex: 2 }}
        />
      )}

      {/* Light transition — image -> video (expands from computer) */}
      {lightOn && (
        <motion.div
          animate={{
            opacity: lightFade ? 0 : lightExpand ? 0.82 : 0.5,
            scale: lightExpand ? 1 : 0.28,
          }}
          transition={{
            duration: lightFade ? 0.45 : lightExpand ? 0.6 : 0.25,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            left: `${CONVERGE.x}%`,
            top: `${CONVERGE.y}%`,
            width: "150%",
            height: "150%",
            marginLeft: "-75%",
            marginTop: "-75%",
            background:
              "radial-gradient(circle, rgba(255,246,238,0.95) 0%, rgba(242,104,71,0.55) 28%, rgba(255,238,228,0.18) 52%, transparent 72%)",
            zIndex: 8,
            pointerEvents: "none",
            transformOrigin: "center center",
          }}
        />
      )}

      {/* Coral flash — outro (video->after) */}
      {flash && (
        <motion.div
          initial={{ x: "130%" }}
          animate={{ x: "-130%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "55%",
            background:
              "linear-gradient(to left, transparent 0%, rgba(242,104,71,0.28) 50%, transparent 100%)",
            zIndex: 5,
            pointerEvents: "none",
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "26%",
          background: "linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 4,
        }}
      />
    </>
  );

  const introOverlays = (
    <>
      <IntroTextBlock introPhase={introPhase} isMobile={isMobile} onStart={startIntro} />
      {(introPhase === "headline" || introPhase === "converge") && (
        <IntroTags introPhase={introPhase} isMobile={isMobile} />
      )}
    </>
  );

  const desktopSize = {
    width: "min(calc((100svh - 90px) * 16 / 9), calc(100vw - 64px), 1600px)",
    aspectRatio: "16 / 9",
    maxHeight: "calc(100svh - 90px)",
  };

  return (
    <section
      id="hero-section"
      style={{
        background: WARM_WHITE,
        direction: "rtl",
        paddingTop: 10,
        paddingBottom: isMobile ? 24 : 12,
        fontFamily: "var(--font-heebo)",
      }}
    >
      <div style={{ margin: "0 auto", padding: isMobile ? "0 20px" : "0 32px", position: "relative" }}>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            margin: "0 auto",
            borderRadius: isMobile ? 22 : 34,
            overflow: "hidden",
            boxShadow: cardShadow,
            background: "#fff",
            ...(isMobile ? {} : desktopSize),
          }}
        >
          {/* glow */}
          <div
            style={{
              position: "absolute",
              inset: -30,
              background: glowBackground,
              filter: "blur(18px)",
              zIndex: 0,
              pointerEvents: "none",
              borderRadius: 60,
            }}
          />

          {isMobile ? (
            <div style={{ position: "relative", padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Mobile intro text (above image) */}
              <AnimatePresence>
                {(introPhase === "idle" || introPhase === "headline" || introPhase === "converge") &&
                  phase === "before" && (
                    <IntroTextBlockMobile key="intro-mobile" introPhase={introPhase} onStart={startIntro} />
                  )}
              </AnimatePresence>

              {/* Mobile after text block */}
              {phase === "after" && (
                <div
                  style={{
                    background: CHARCOAL,
                    borderRadius: 22,
                    padding: "28px 22px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.06)",
                  }}
                >
                  <AfterContent
                    stage={headlineStage}
                    phase={phase}
                    onContinue={scrollToDemo}
                    isMobile={isMobile}
                  />
                </div>
              )}

              {/* Media container */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 9",
                  borderRadius: 20,
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.3)",
                }}
              >
                {renderMedia()}
                {phase === "before" && introOverlays}
              </div>
            </div>
          ) : (
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              {renderMedia()}

              {/* Intro overlays (desktop) */}
              {phase === "before" && introOverlays}

              {/* After overlay (desktop) — unchanged */}
              <AnimatePresence>
                {(outro || phase === "after") && (
                  <motion.div
                    key="after-overlay"
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      height: "100%",
                      width: "50%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "60px 56px 60px 24px",
                      zIndex: 6,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: DARK_SCRIM,
                        borderRadius: 34,
                        pointerEvents: "none",
                      }}
                    />
                    <div style={{ position: "relative" }}>
                      <AfterContent
                        stage={headlineStage}
                        phase={phase}
                        onContinue={scrollToDemo}
                        isMobile={isMobile}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}