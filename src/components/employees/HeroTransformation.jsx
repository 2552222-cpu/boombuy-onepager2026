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
  { word: "מתנות", x: "20%", y: "22%" },
  { word: "ספקים", x: "33%", y: "14%" },
  { word: "אירועים", x: "13%", y: "46%" },
  { word: "הטבות", x: "24%", y: "68%" },
  { word: "עובדים", x: "42%", y: "74%" },
  { word: "אקסלים", x: "47%", y: "28%" },
  { word: "תקלות", x: "36%", y: "56%" },
];
const CONVERGE = { x: "40%", y: "58%" };

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
  background: "rgba(255,255,255,0.93)",
  color: CHARCOAL,
  borderRadius: 999,
  padding: "7px 14px",
  fontSize: 16,
  fontWeight: 600,
  fontFamily: "var(--font-heebo)",
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
  whiteSpace: "nowrap",
};

function IntroTags({ introPhase, isMobile }) {
  const list = isMobile ? TAGS.slice(0, 4) : TAGS;
  const stagger = isMobile ? 0.09 : 0.1;
  return (
    <>
      {list.map((tag, i) => (
        <motion.div
          key={tag.word}
          initial={{ left: tag.x, top: tag.y }}
          animate={
            introPhase === "converge"
              ? { left: CONVERGE.x, top: CONVERGE.y }
              : { left: tag.x, top: tag.y }
          }
          transition={{ duration: introPhase === "converge" ? 0.45 : 0.4, ease: "easeInOut" }}
          style={{ position: "absolute", zIndex: 7 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={
              introPhase === "converge"
                ? { opacity: 0, scale: 0.5 }
                : introPhase === "headline"
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.85 }
            }
            transition={
              introPhase === "headline"
                ? { duration: 0.3, delay: i * stagger, ease: "easeOut" }
                : { duration: 0.45, ease: "easeIn" }
            }
            style={tagStyle}
          >
            {tag.word}
            <CoralDot />
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}

function IntroHeadlineDesktop({ introPhase }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        height: "100%",
        width: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "60px 48px 60px 24px",
        zIndex: 6,
      }}
    >
      <div style={{ overflow: "hidden", maxWidth: 560 }}>
        <motion.div
          initial={{ y: "110%" }}
          animate={
            introPhase === "converge"
              ? { y: "0%", opacity: 0 }
              : { y: "0%", opacity: 1 }
          }
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            style={{
              background: "rgba(29,29,31,0.45)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              borderRadius: 14,
              padding: "18px 22px",
              display: "inline-block",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(48px, 4.6vw, 56px)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: 0,
                fontFamily: "var(--font-heebo)",
                maxWidth: 520,
              }}
            >
              כמה ידיים צריך כדי לנהל רווחה?
            </h1>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function IntroHeadlineMobile({ introPhase }) {
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "110%" }}
        animate={
          introPhase === "converge" ? { y: "0%", opacity: 0 } : { y: "0%", opacity: 1 }
        }
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1
          style={{
            fontSize: "clamp(34px, 9vw, 40px)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            margin: 0,
            fontFamily: "var(--font-heebo)",
          }}
        >
          כמה ידיים צריך כדי לנהל רווחה?
        </h1>
      </motion.div>
    </div>
  );
}

function IntroButton({ onClick, isMobile }) {
  const style = {
    background: "rgba(29,29,31,0.5)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: 15,
    height: 54,
    padding: "0 26px",
    fontSize: 17,
    fontWeight: 700,
    fontFamily: "var(--font-heebo)",
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
  };
  if (isMobile) {
    return (
      <div
        style={{
          position: "absolute",
          bottom: 22,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 6,
          pointerEvents: "none",
        }}
      >
        <motion.button
          onClick={onClick}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          style={{ ...style, pointerEvents: "auto" }}
        >
          רוצה לשדרג?
          <CoralDot />
        </motion.button>
      </div>
    );
  }
  return (
    <motion.button
      onClick={onClick}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      style={{ ...style, position: "absolute", top: 40, right: 48, zIndex: 6 }}
    >
      רוצה לשדרג?
      <CoralDot />
    </motion.button>
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
  const [phase, setPhase] = useState("before"); // "before" | "video" | "after"
  const [introPhase, setIntroPhase] = useState("idle"); // "idle" | "headline" | "converge" | "done"
  const [isMobile, setIsMobile] = useState(false);
  const [outro, setOutro] = useState(false);
  const [headlineStage, setHeadlineStage] = useState(0);
  const [crossfade, setCrossfade] = useState(false);
  const [flash, setFlash] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Preload after-image
  useEffect(() => {
    const img = new Image();
    img.src = AFTER_IMG;
  }, []);

  // Intro: headline -> converge
  useEffect(() => {
    if (introPhase !== "headline") return;
    const tagCount = isMobile ? 4 : 7;
    const stagger = isMobile ? 0.09 : 0.1;
    const firstTagDelay = isMobile ? 0.25 : 0.35;
    const lastTagAppear = firstTagDelay + (tagCount - 1) * stagger;
    const convergeStart = lastTagAppear + (isMobile ? 0.1 : 0.13);
    const t1 = setTimeout(() => setIntroPhase("converge"), convergeStart * 1000);
    return () => clearTimeout(t1);
  }, [introPhase, isMobile]);

  // Intro: converge -> video
  useEffect(() => {
    if (introPhase !== "converge") return;
    const t2 = setTimeout(() => {
      setIntroPhase("done");
      setPhase("video");
    }, 470);
    return () => clearTimeout(t2);
  }, [introPhase]);

  // Outro sequence
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
      <AnimatePresence>
        {phase === "before" && (
          <motion.img
            key="before-media"
            src={BEFORE_IMG}
            alt="מנהלת רווחה בעומס"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            style={{ ...baseMedia, objectFit: isMobile ? "contain" : "cover", zIndex: 1 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            style={{ ...baseMedia, objectFit: isMobile ? "contain" : "cover", background: "#000", zIndex: 1 }}
          />
        )}
      </AnimatePresence>

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
      <AnimatePresence>
        {introPhase === "idle" && (
          <IntroButton key="intro-btn" onClick={startIntro} isMobile={isMobile} />
        )}
      </AnimatePresence>
      {(introPhase === "headline" || introPhase === "converge") && (
        <>
          {!isMobile && <IntroHeadlineDesktop introPhase={introPhase} />}
          <IntroTags introPhase={introPhase} isMobile={isMobile} />
        </>
      )}
    </>
  );

  return (
    <section
      id="hero-section"
      style={{
        background: WARM_WHITE,
        direction: "rtl",
        paddingTop: isMobile ? 4 : 12,
        paddingBottom: isMobile ? 24 : 28,
        fontFamily: "var(--font-heebo)",
      }}
    >
      <div
        style={{
          width: isMobile ? "100%" : "94vw",
          maxWidth: 1600,
          margin: "0 auto",
          position: "relative",
        }}
      >
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

        <div
          style={{
            position: "relative",
            zIndex: 1,
            borderRadius: isMobile ? 22 : 34,
            overflow: "hidden",
            boxShadow: cardShadow,
            background: "#fff",
          }}
        >
          {isMobile ? (
            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Mobile intro headline panel (above media) */}
              <AnimatePresence>
                {(introPhase === "headline" || introPhase === "converge") && phase === "before" && (
                  <motion.div
                    key="intro-headline-mobile"
                    exit={{ opacity: 0, transition: { duration: 0.4 } }}
                    style={{
                      background: CHARCOAL,
                      borderRadius: 18,
                      padding: "20px 18px",
                    }}
                  >
                    <IntroHeadlineMobile introPhase={introPhase} />
                  </motion.div>
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
            <>
              <div
                style={{
                  position: "relative",
                  height: "min(88vh, 820px)",
                }}
              >
                {renderMedia()}

                {/* Intro overlays (desktop) */}
                {phase === "before" && introOverlays}

                {/* After overlay (desktop) */}
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
            </>
          )}
        </div>
      </div>
    </section>
  );
}