import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BEFORE_IMG = "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/f2a441019_START-FRAME2.png";
const AFTER_IMG = "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/0a0298c58_END-FRAME-CORRECTED2.png";
const VIDEO_SRC = "https://media.base44.com/videos/public/69e48538aaee477b09fc7b49/fe014e428__23.mp4";

const CHARCOAL = "#1D1D1F";
const CHARCOAL_SOFT = "#424245";
const CORAL = "#F26847";
const WARM_WHITE = "#FBFAF8";

const SCRIM =
  "linear-gradient(to left, rgba(251,250,248,0.94) 0%, rgba(251,250,248,0.88) 44%, rgba(251,250,248,0.45) 78%, rgba(251,250,248,0) 100%)";

const buttonStyle = {
  background: CHARCOAL,
  color: "#fff",
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
  boxShadow: "0 6px 18px rgba(29,29,31,0.14)",
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

function BeforeContent({ onStart }) {
  return (
    <div style={{ textAlign: "right" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
          justifyContent: "flex-end",
        }}
      >
        <span
          style={{
            color: CORAL,
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "0.02em",
            fontFamily: "var(--font-heebo)",
          }}
        >
          מערכת ההפעלה לרווחה ולחוויית העובד
        </span>
        <span
          style={{
            width: 28,
            height: 2,
            background: CORAL,
            borderRadius: 2,
            display: "inline-block",
            flexShrink: 0,
          }}
        />
      </div>

      <h1
        style={{
          fontSize: "clamp(42px, 5.1vw, 72px)",
          fontWeight: 800,
          color: CHARCOAL,
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          margin: "0 0 22px",
          maxWidth: 600,
          fontFamily: "var(--font-heebo)",
        }}
      >
        כמה ידיים צריך כדי לנהל את כל הרווחה בארגון?
      </h1>

      <p
        style={{
          fontSize: "clamp(19px, 1.7vw, 23px)",
          color: CHARCOAL_SOFT,
          lineHeight: 1.55,
          margin: "0 0 30px",
          maxWidth: 520,
          fontWeight: 500,
          fontFamily: "var(--font-heebo)",
        }}
      >
        מתנות, ספקים, אירועים, הטבות, עובדים, אקסלים ותקלות. בסוף, הכל מגיע אלייך.
      </p>

      <motion.button
        whileHover={{ y: -2, boxShadow: "0 14px 30px rgba(29,29,31,0.22)" }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
        style={buttonStyle}
      >
        הראו לי איך נראה השדרוג
        <CoralDot />
      </motion.button>

      <p
        style={{
          fontSize: 14,
          color: "#6E6E73",
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

function AfterContent({ onContinue }) {
  return (
    <div style={{ textAlign: "right" }}>
      <h1
        style={{
          fontSize: "clamp(42px, 5.1vw, 72px)",
          fontWeight: 800,
          color: CHARCOAL,
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          margin: "0 0 22px",
          maxWidth: 600,
          fontFamily: "var(--font-heebo)",
        }}
      >
        התקציב עובד יותר. את פחות.
      </h1>

      <p
        style={{
          fontSize: "clamp(19px, 1.7vw, 23px)",
          color: CHARCOAL_SOFT,
          lineHeight: 1.55,
          margin: "0 0 30px",
          maxWidth: 520,
          fontWeight: 500,
          fontFamily: "var(--font-heebo)",
        }}
      >
        BoomBuy מרכזת את הרווחה, המתנות, ההטבות והשירות לעובדים במערכת אחת.
      </p>

      <motion.button
        whileHover={{ y: -2, boxShadow: "0 14px 30px rgba(29,29,31,0.22)" }}
        whileTap={{ scale: 0.98 }}
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
  const videoRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (phase === "video" && videoRef.current) {
      const p = videoRef.current.play?.();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  }, [phase]);

  const startVideo = () => setPhase("video");
  const handleEnded = () => setPhase("after");
  const scrollToDemo = () =>
    document.getElementById("demo-form-section")?.scrollIntoView({ behavior: "smooth" });

  const mediaStyle = (extra) => ({
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: isMobile ? "contain" : "cover",
    objectPosition: "center",
    ...extra,
  });

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
          height: isMobile ? "auto" : "min(88vh, 820px)",
          position: "relative",
          borderRadius: isMobile ? 20 : 32,
          overflow: "hidden",
          background: WARM_WHITE,
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
        }}
      >
        {isMobile ? (
          // ===== Mobile: text above, media below =====
          <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 20 }}>
            <AnimatePresence>
              {phase === "before" && (
                <motion.div
                  key="before-mobile"
                  exit={{ opacity: 0, transition: { duration: 0.4 } }}
                >
                  <BeforeContent onStart={startVideo} />
                </motion.div>
              )}
              {phase === "after" && (
                <motion.div
                  key="after-mobile"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.6, delay: 0.2 } }}
                >
                  <AfterContent onContinue={scrollToDemo} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Media 16:9 */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 9",
                borderRadius: 18,
                overflow: "hidden",
                background: "#fff",
                boxShadow: "0 8px 28px rgba(0,0,0,0.08)",
              }}
            >
              <AnimatePresence mode="sync">
                {phase === "before" && (
                  <motion.img
                    key="before-media"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.4 } }}
                    src={BEFORE_IMG}
                    alt="מנהלת רווחה בעומס"
                    style={mediaStyle()}
                  />
                )}
                {phase === "video" && (
                  <motion.video
                    key="video-media"
                    ref={videoRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.4 } }}
                    exit={{ opacity: 0, transition: { duration: 0.4 } }}
                    src={VIDEO_SRC}
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    onEnded={handleEnded}
                    style={mediaStyle({ background: "#000" })}
                  />
                )}
                {phase === "after" && (
                  <motion.img
                    key="after-media"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.6 } }}
                    src={AFTER_IMG}
                    alt="מנהלת רווחה רגועה מול מערכת BoomBuy"
                    style={mediaStyle()}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          // ===== Desktop: media as background, text overlay on right =====
          <>
            <AnimatePresence mode="sync">
              {phase === "before" && (
                <motion.img
                  key="before-media"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.4 } }}
                  src={BEFORE_IMG}
                  alt="מנהלת רווחה בעומס"
                  style={mediaStyle()}
                />
              )}
              {phase === "video" && (
                <motion.video
                  key="video-media"
                  ref={videoRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.4 } }}
                  exit={{ opacity: 0, transition: { duration: 0.4 } }}
                  src={VIDEO_SRC}
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  onEnded={handleEnded}
                  style={mediaStyle({ background: "#000" })}
                />
              )}
              {phase === "after" && (
                <motion.img
                  key="after-media"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.6 } }}
                  src={AFTER_IMG}
                  alt="מנהלת רווחה רגועה מול מערכת BoomBuy"
                  style={mediaStyle()}
                />
              )}
            </AnimatePresence>

            {/* Text overlay (right side) */}
            <AnimatePresence>
              {phase === "before" && (
                <motion.div
                  key="before-overlay"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.4 } }}
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
                    zIndex: 3,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: SCRIM,
                      borderRadius: 32,
                      pointerEvents: "none",
                    }}
                  />
                  <div style={{ position: "relative" }}>
                    <BeforeContent onStart={startVideo} />
                  </div>
                </motion.div>
              )}
              {phase === "after" && (
                <motion.div
                  key="after-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.6, delay: 0.2 } }}
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
                    zIndex: 3,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: SCRIM,
                      borderRadius: 32,
                      pointerEvents: "none",
                    }}
                  />
                  <div style={{ position: "relative" }}>
                    <AfterContent onContinue={scrollToDemo} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </section>
  );
}