import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BEFORE_IMG = "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/f2a441019_START-FRAME2.png";
const AFTER_IMG = "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/0a0298c58_END-FRAME-CORRECTED2.png";
const VIDEO_SRC = "https://media.base44.com/videos/public/69e48538aaee477b09fc7b49/fe014e428__23.mp4";

const CHARCOAL = "#1D1D1F";
const CORAL = "#F26847";
const WARM_WHITE = "#FBFAF8";

const DARK_SCRIM =
  "linear-gradient(to left, rgba(29,29,31,0.78) 0%, rgba(29,29,31,0.54) 46%, rgba(29,29,31,0.14) 80%, rgba(29,29,31,0) 100%)";

const buttonStyle = {
  background: "#FFFFFF",
  color: CHARCOAL,
  border: "none",
  cursor: "pointer",
  padding: "0 34px",
  height: 60,
  borderRadius: 16,
  fontSize: 19,
  fontWeight: 800,
  fontFamily: "var(--font-heebo)",
  display: "inline-flex",
  alignItems: "center",
  gap: 12,
  boxShadow: "0 6px 18px rgba(0,0,0,0.16)",
};

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

function BeforeContent({ onStart, isMobile }) {
  return (
    <div style={{ textAlign: "right" }}>
      <h1
        style={{
          fontSize: isMobile ? "clamp(40px, 11vw, 46px)" : "clamp(52px, 5.8vw, 70px)",
          fontWeight: 700,
          color: "#fff",
          lineHeight: 1.06,
          letterSpacing: "-0.02em",
          margin: "0 0 22px",
          maxWidth: isMobile ? "100%" : 620,
          fontFamily: "var(--font-heebo)",
        }}
      >
        כמה ידיים צריך כדי לנהל את כל הרווחה בארגון?
      </h1>
      <p
        style={{
          fontSize: "clamp(19px, 1.9vw, 22px)",
          color: "rgba(255,255,255,0.85)",
          lineHeight: 1.55,
          margin: "0 0 30px",
          maxWidth: 520,
          fontWeight: 400,
          fontFamily: "var(--font-heebo)",
        }}
      >
        מתנות, ספקים, אירועים, הטבות, עובדים, אקסלים ותקלות. בסוף, הכל מגיע אלייך.
      </p>
      <motion.button
        whileHover={{ y: -2, boxShadow: "0 14px 28px rgba(0,0,0,0.22)" }}
        onClick={onStart}
        style={buttonStyle}
      >
        הראו לי איך נראה השדרוג
        <CoralDot />
      </motion.button>
      <p
        style={{
          fontSize: 14,
          color: "rgba(255,255,255,0.65)",
          margin: "16px 0 0",
          fontWeight: 500,
          fontFamily: "var(--font-heebo)",
        }}
      >
        לחיצה אחת. פחות עומס. יותר ערך לעובדים.
      </p>
    </div>
  );
}

function AfterHeadline({ stage, isMobile }) {
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
              height: 3,
              width: "100%",
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
        BoomBuy מרכזת את הרווחה, המתנות, ההטבות והשירות לעובדים במערכת אחת.
      </motion.p>
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={phase === "after" ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
        whileHover={{ y: -2, boxShadow: "0 14px 28px rgba(0,0,0,0.22)" }}
        onClick={onContinue}
        style={buttonStyle}
      >
        ומה העובדים מרגישים?
        <CoralDot />
      </motion.button>
    </div>
  );
}

export default function HeroTransformation() {
  const [phase, setPhase] = useState("before"); // "before" | "video" | "after"
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

  // Outro sequence: headline stage 1 immediately, stage 2 at 350ms, crossfade at 400ms, flash at 550ms
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

  const startVideo = () => setPhase("video");

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration || !isFinite(v.duration)) return;
    const remaining = v.duration - v.currentTime;
    if (remaining <= 1.0 && !outro) setOutro(true);
  };

  const handleEnded = () => {
    // Ensure final state regardless of whether outro triggered
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

  const renderMedia = (zShift) => (
    <>
      {/* Before-image */}
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

      {/* Video */}
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

      {/* After-image (crossfade during outro) */}
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

      {/* Coral flash sweep */}
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

      {/* Soft top light on "glass" */}
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
        {/* Background glow */}
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

        {/* Card */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            height: isMobile ? "auto" : "min(88vh, 820px)",
            borderRadius: isMobile ? 22 : 34,
            overflow: "hidden",
            boxShadow: cardShadow,
          }}
        >
          {isMobile ? (
            // ===== Mobile: charcoal text block above, media below =====
            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 18 }}>
              <AnimatePresence>
                {phase === "before" && (
                  <motion.div
                    key="before-mobile"
                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    style={{
                      background: CHARCOAL,
                      borderRadius: 22,
                      padding: "28px 22px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.06)",
                    }}
                  >
                    <BeforeContent onStart={startVideo} isMobile={isMobile} />
                  </motion.div>
                )}
                {(outro || phase === "after") && (
                  <motion.div
                    key="after-mobile"
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
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Media 16:9 */}
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
              </div>
            </div>
          ) : (
            // ===== Desktop: media as background, text overlay on right =====
            <>
              {renderMedia()}

              {/* Text overlays */}
              <AnimatePresence>
                {phase === "before" && (
                  <motion.div
                    key="before-overlay"
                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
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
                      <BeforeContent onStart={startVideo} isMobile={isMobile} />
                    </div>
                  </motion.div>
                )}
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
            </>
          )}
        </div>
      </div>
    </section>
  );
}