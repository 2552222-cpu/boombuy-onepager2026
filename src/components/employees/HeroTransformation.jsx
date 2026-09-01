import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ChaosWordsLayer from "./hero/ChaosWordsLayer";
import {
  BEFORE_IMG,
  AFTER_IMG,
  VIDEO_SRC,
  CHARCOAL,
  WARM_WHITE,
  CoralDot,
  CHAOS_WORDS,
} from "./hero/heroShared";

const cardShadow =
  "0 24px 70px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.3)";

const LIGHT_GRADIENT =
  "radial-gradient(circle at 52% 58%, rgba(255,255,255,0.20), rgba(240,120,88,0.08) 32%, transparent 58%)";

// Shared container for all three media layers — prevents jump between video and ending image
const baseMedia = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
};

export default function HeroTransformation() {
  // idle | playing | ending | complete
  const [stage, setStage] = useState("idle");
  const [isMobile, setIsMobile] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [videoStarted, setVideoStarted] = useState(false);
  const [wordsActive, setWordsActive] = useState(false);
  const [enteredWords, setEnteredWords] = useState({});
  const [buttonGone, setButtonGone] = useState(false);
  const [lightId, setLightId] = useState(0);
  const videoRef = useRef(null);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 768);
    c();
    window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  // Preload ending image before the video starts
  useEffect(() => {
    const img = new Image();
    img.src = AFTER_IMG;
  }, []);

  const triggerLight = () => setLightId((id) => id + 1);

  const onStart = () => {
    if (buttonGone) return;
    setButtonGone(true);
    // Create the words layer now; words themselves enter on their stagger timers
    setWordsActive(true);
    CHAOS_WORDS.forEach((w) => {
      const t = setTimeout(
        () => setEnteredWords((s) => ({ ...s, [w.word]: true })),
        w.enterAt * 1000
      );
      timers.current.push(t);
    });
    // Start the video 1.15s after the click, with the crossfade + light flash
    const vt = setTimeout(() => {
      setVideoStarted(true);
      setStage("playing");
      triggerLight();
    }, 1150);
    timers.current.push(vt);
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setVideoTime(v.currentTime || 0);
    if (v.duration && isFinite(v.duration)) {
      if (v.currentTime >= 1.7 && wordsActive) setWordsActive(false);
      if (v.currentTime >= v.duration - 0.75 && stage === "playing") {
        setStage("ending");
        triggerLight();
      }
    }
  };

  const onEnded = () => setStage("complete");

  const scrollToDemo = () =>
    document.getElementById("demo-form-section")?.scrollIntoView({ behavior: "smooth" });

  const showOpening = stage === "idle" || stage === "playing";
  const showVideo = stage === "playing" || stage === "ending";
  const showEnding = stage === "ending" || stage === "complete";

  const desktopSize = {
    width: "min(calc((100svh - 90px) * 16 / 9), calc(100vw - 64px), 1600px)",
    aspectRatio: "16 / 9",
    maxHeight: "calc(100svh - 90px)",
  };

  const btnBase = {
    position: "absolute",
    background: CHARCOAL,
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: 16,
    fontFamily: "var(--font-heebo)",
    fontWeight: 800,
    fontSize: 18,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    zIndex: 30,
    boxShadow: "0 8px 22px rgba(0,0,0,0.22)",
  };

  return (
    <section
      id="hero-section"
      style={{
        background: WARM_WHITE,
        direction: "rtl",
        paddingTop: 10,
        paddingBottom: isMobile ? 16 : 12,
        fontFamily: "var(--font-heebo)",
      }}
    >
      <div style={{ margin: "0 auto", padding: isMobile ? "0 16px" : "0 32px", position: "relative" }}>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            margin: "0 auto",
            borderRadius: isMobile ? 18 : 34,
            overflow: "hidden",
            boxShadow: cardShadow,
            background: "#000",
            ...(isMobile ? { width: "100%", height: "82svh" } : desktopSize),
          }}
        >
          {/* Opening image — static until the click, then crossfades out */}
          {showOpening && (
            <motion.img
              src={BEFORE_IMG}
              alt="מנהלת רווחה בעומס"
              initial={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              animate={
                stage === "playing"
                  ? { opacity: 0, filter: "blur(4px)", scale: 1.012 }
                  : { opacity: 1, filter: "blur(0px)", scale: 1 }
              }
              transition={{ duration: stage === "playing" ? 0.65 : 0, ease: "easeInOut" }}
              style={{ ...baseMedia, zIndex: 1 }}
            />
          )}

          {/* Video — crossfades in over the opening image (650ms), then out to ending (700ms) */}
          {showVideo && (
            <motion.video
              ref={videoRef}
              src={VIDEO_SRC}
              poster={BEFORE_IMG}
              autoPlay
              muted
              playsInline
              preload="auto"
              onTimeUpdate={onTimeUpdate}
              onEnded={onEnded}
              initial={{ opacity: 0, filter: "blur(4px)", scale: 0.988 }}
              animate={
                stage === "ending"
                  ? { opacity: 0, filter: "blur(4px)", scale: 1.012 }
                  : { opacity: 1, filter: "blur(0px)", scale: 1 }
              }
              transition={{ duration: stage === "ending" ? 0.7 : 0.65, ease: "easeInOut" }}
              style={{ ...baseMedia, background: "#000", zIndex: 1 }}
            />
          )}

          {/* Ending image — crossfades in over the last 0.75s of the video (700ms) */}
          {showEnding && (
            <motion.img
              src={AFTER_IMG}
              alt="מנהלת רווחה רגועה מול מערכת boombuy"
              initial={{ opacity: 0, filter: "blur(4px)", scale: 0.988 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              style={{ ...baseMedia, zIndex: 2 }}
            />
          )}

          {/* Local light flash during transitions — opacity 0 -> 0.22 -> 0 over 420ms */}
          {lightId > 0 && (
            <motion.div
              key={lightId}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.22, 0] }}
              transition={{ duration: 0.42, ease: "easeOut" }}
              style={{ position: "absolute", inset: 0, background: LIGHT_GRADIENT, zIndex: 15, pointerEvents: "none" }}
            />
          )}

          {/* Chaos words layer — created on click, persists across opening->video, unmounts at video.currentTime 1.70 */}
          {wordsActive && (
            <ChaosWordsLayer
              enteredWords={enteredWords}
              videoStarted={videoStarted}
              videoTime={videoTime}
              isMobile={isMobile}
            />
          )}

          {/* Opening live button */}
          {(stage === "idle" || stage === "playing") && (
            <motion.button
              onClick={onStart}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: buttonGone ? 0 : 1, y: buttonGone ? 10 : 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              whileHover={{ y: buttonGone ? 10 : -2 }}
              style={{
                ...btnBase,
                right: "7%",
                bottom: "10%",
                width: 230,
                height: 56,
                pointerEvents: buttonGone ? "none" : "auto",
              }}
            >
              לראות את השדרוג
              <CoralDot />
            </motion.button>
          )}

          {/* Ending live button */}
          {stage === "complete" && (
            <motion.button
              onClick={scrollToDemo}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ y: -2 }}
              style={{
                ...btnBase,
                right: "7%",
                top: "65%",
                width: 240,
                height: 54,
              }}
            >
              ומה העובדים מרגישים?
              <CoralDot />
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}