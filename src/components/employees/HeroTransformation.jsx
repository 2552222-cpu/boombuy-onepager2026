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

// Opening -> video transition light (hides the frame swap)
const LIGHT_GRADIENT_OPENING =
  "radial-gradient(circle at 52% 58%, rgba(255,255,255,0.96) 0%, rgba(255,244,239,0.84) 22%, rgba(240,120,88,0.32) 44%, rgba(255,255,255,0) 72%)";

// Ending transition light (unchanged)
const LIGHT_GRADIENT_ENDING =
  "radial-gradient(circle at 52% 58%, rgba(255,255,255,0.20), rgba(240,120,88,0.08) 32%, transparent 58%)";

// Shared container for all media layers — prevents any size/crop jump
const baseMedia = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
};

const TRANSITION_MS = 780;
const REDUCED_MS = 400;

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
  const [openingTransition, setOpeningTransition] = useState(false);
  const [openingDone, setOpeningDone] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
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
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMq = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", onMq);
    return () => {
      window.removeEventListener("resize", c);
      mq.removeEventListener?.("change", onMq);
    };
  }, []);

  // Preload ending image before the video starts
  useEffect(() => {
    const img = new Image();
    img.src = AFTER_IMG;
  }, []);

  // Kick off video preload as soon as the element mounts
  useEffect(() => {
    if (videoRef.current) {
      try {
        videoRef.current.load();
      } catch (e) {
        /* ignore */
      }
    }
  }, []);

  const waitForVideoReady = (v) =>
    new Promise((resolve) => {
      if (v.readyState >= 2) return resolve();
      const done = () => {
        v.removeEventListener("loadeddata", done);
        v.removeEventListener("canplay", done);
        resolve();
      };
      v.addEventListener("loadeddata", done);
      v.addEventListener("canplay", done);
    });

  const startOpeningTransition = async () => {
    const v = videoRef.current;
    if (v) {
      await waitForVideoReady(v);
      try {
        v.currentTime = 0;
        await v.play();
      } catch (e) {
        /* ignore */
      }
    }
    setVideoStarted(true);
    setStage("playing");
    // Let the first frame render behind the opening image
    await new Promise((r) => setTimeout(r, 80));
    setOpeningTransition(true);
    const dur = reducedMotion ? REDUCED_MS : TRANSITION_MS;
    const t = setTimeout(() => {
      setOpeningTransition(false);
      setOpeningDone(true);
    }, dur);
    timers.current.push(t);
  };

  const onStart = () => {
    if (buttonGone) return;
    setButtonGone(true);
    setWordsActive(true);
    CHAOS_WORDS.forEach((w) => {
      const t = setTimeout(
        () => setEnteredWords((s) => ({ ...s, [w.word]: true })),
        w.enterAt * 1000
      );
      timers.current.push(t);
    });
    const vt = setTimeout(startOpeningTransition, 1150);
    timers.current.push(vt);
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setVideoTime(v.currentTime || 0);
    if (v.duration && isFinite(v.duration)) {
      if (v.currentTime >= 3.2 && wordsActive) setWordsActive(false);
      if (v.currentTime >= v.duration - 1.0 && stage === "playing") {
        setStage("ending");
        setLightId((id) => id + 1);
      }
    }
  };

  const onEnded = () => setStage("complete");

  const scrollToDemo = () =>
    document.getElementById("demo-form-section")?.scrollIntoView({ behavior: "smooth" });

  const showOpening = (stage === "idle" || stage === "playing") && !openingDone;
  const showVideo = stage !== "complete";
  const showEnding = stage === "ending" || stage === "complete";

  const desktopSize = {
    width: "min(calc((100svh - 90px) * 16 / 9), calc(100vw - 64px), 1600px)",
    aspectRatio: "16 / 9",
    maxHeight: "calc(100svh - 90px)",
  };

  // Opening image animate
  const openingAnimate = openingTransition
    ? reducedMotion
      ? { opacity: [1, 0] }
      : {
          opacity: [1, 0.72, 0, 0],
          filter: ["blur(0px)", "blur(9px)", "blur(9px)", "blur(9px)"],
          scale: [1, 1.025, 1.025, 1.025],
        }
    : { opacity: 1, filter: "blur(0px)", scale: 1 };
  const openingTransitionCfg = openingTransition
    ? reducedMotion
      ? { duration: REDUCED_MS / 1000, ease: "easeInOut" }
      : { duration: TRANSITION_MS / 1000, ease: "easeInOut", times: [0, 0.359, 0.5, 1] }
    : { duration: 0 };

  // Video animate
  const videoVisible = videoStarted && openingDone;
  const videoAnimate = openingTransition
    ? reducedMotion
      ? { opacity: [0, 1] }
      : {
          opacity: [0, 0, 0.55, 1],
          filter: ["blur(8px)", "blur(8px)", "blur(8px)", "blur(0px)"],
          scale: [0.982, 0.982, 0.982, 1],
        }
    : stage === "ending"
    ? { opacity: 0, filter: "blur(4px)", scale: 1.012 }
    : { opacity: videoVisible ? 1 : 0, filter: "blur(0px)", scale: 1 };
  const videoTransitionCfg = openingTransition
    ? reducedMotion
      ? { duration: REDUCED_MS / 1000, ease: "easeInOut" }
      : { duration: TRANSITION_MS / 1000, ease: "easeInOut", times: [0, 0.359, 0.5, 1] }
    : { duration: stage === "ending" ? 0.7 : 0.3, ease: "easeInOut" };

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
          {/* Video — always mounted for preload; plays behind the opening image, then revealed */}
          {showVideo && (
            <motion.video
              ref={videoRef}
              src={VIDEO_SRC}
              poster={BEFORE_IMG}
              muted
              playsInline
              preload="auto"
              onTimeUpdate={onTimeUpdate}
              onEnded={onEnded}
              initial={{ opacity: 0, filter: "blur(0px)", scale: 1 }}
              animate={videoAnimate}
              transition={videoTransitionCfg}
              style={{ ...baseMedia, background: "#000", zIndex: 1 }}
            />
          )}

          {/* Opening image — covers the video, crossfades out during the 780ms transition */}
          {showOpening && (
            <motion.img
              src={BEFORE_IMG}
              alt="מנהלת רווחה בעומס"
              initial={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              animate={openingAnimate}
              transition={openingTransitionCfg}
              style={{ ...baseMedia, zIndex: 2 }}
            />
          )}

          {/* Ending image — crossfades in over the last 0.75s of the video (unchanged) */}
          {showEnding && (
            <motion.img
              src={AFTER_IMG}
              alt="מנהלת רווחה רגועה מול מערכת boombuy"
              initial={{ opacity: 0, filter: "blur(4px)", scale: 0.988 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              style={{ ...baseMedia, zIndex: 2 }}
            />
          )}

          {/* Opening -> video transition light (expands from table/laptop center, hides the frame swap) */}
          {openingTransition && !reducedMotion && (
            <motion.div
              initial={{ opacity: 0, scale: 0.65 }}
              animate={{
                opacity: [0, 0.72, 0.72, 0],
                scale: [0.65, 1.35, 1.35, 1.65],
              }}
              transition={{ duration: TRANSITION_MS / 1000, ease: "easeOut", times: [0, 0.359, 0.5, 1] }}
              style={{
                position: "absolute",
                inset: 0,
                background: LIGHT_GRADIENT_OPENING,
                mixBlendMode: "screen",
                transformOrigin: "52% 58%",
                zIndex: 15,
                pointerEvents: "none",
              }}
            />
          )}

          {/* Ending transition light (unchanged) */}
          {lightId > 0 && (
            <motion.div
              key={lightId}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.22, 0] }}
              transition={{ duration: 0.42, ease: "easeOut" }}
              style={{ position: "absolute", inset: 0, background: LIGHT_GRADIENT_ENDING, zIndex: 15, pointerEvents: "none" }}
            />
          )}

          {/* Chaos words layer — stays sharp above the transition, created on click, unmounts at 1.70 */}
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