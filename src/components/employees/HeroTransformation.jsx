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

// Soft warm radial light (warm white + coral touch) — opening image -> video
const LIGHT_OPENING =
  "radial-gradient(circle at 52% 58%, rgba(255,250,245,0.94) 0%, rgba(255,244,238,0.80) 22%, rgba(240,120,88,0.34) 46%, rgba(255,255,255,0) 74%)";

// Warm horizontal light sweep (warm white + coral touch) — video -> ending image
const LIGHT_ENDING =
  "linear-gradient(100deg, transparent 28%, rgba(255,248,240,0.92) 46%, rgba(240,120,88,0.42) 52%, rgba(255,248,240,0.92) 58%, transparent 72%)";

// Shared media layer geometry — identical for all three media layers (no jump on swap)
const baseMedia = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
};

const OPEN_MS = 820; // opening image -> video
const END_MS = 950; // video -> ending image
const END_BEFORE = 700; // start ending transition this many ms before the video ends

export default function HeroTransformation() {
  // idle | chaos | openingTransition | playing | endingTransition | complete
  const [stage, setStage] = useState("idle");
  const [isMobile, setIsMobile] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [enteredWords, setEnteredWords] = useState({});
  const [buttonGone, setButtonGone] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const videoRef = useRef(null);
  const timers = useRef([]);
  const endedRef = useRef(false);

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

  // Preload ending image
  useEffect(() => {
    const img = new Image();
    img.src = AFTER_IMG;
  }, []);

  // Kick off video preload as soon as it mounts
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

  const waitForPlaying = (v) =>
    new Promise((resolve) => {
      const done = () => {
        v.removeEventListener("playing", done);
        resolve();
      };
      v.addEventListener("playing", done);
    });

  const twoRaf = () =>
    new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(resolve));
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
      await waitForPlaying(v);
      await twoRaf();
    }
    setStage("openingTransition");
    const dur = reducedMotion ? 300 : OPEN_MS;
    const t = setTimeout(() => setStage("playing"), dur);
    timers.current.push(t);
  };

  const onStart = () => {
    if (stage !== "idle") return;
    setButtonGone(true);
    setStage("chaos");
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
      if (
        v.currentTime >= v.duration - END_BEFORE / 1000 &&
        stage === "playing" &&
        !endedRef.current
      ) {
        endedRef.current = true;
        setStage("endingTransition");
        const dur = reducedMotion ? 300 : END_MS;
        const t = setTimeout(() => setStage("complete"), dur);
        timers.current.push(t);
      }
    }
  };

  const scrollToDemo = () =>
    document.getElementById("demo-form-section")?.scrollIntoView({ behavior: "smooth" });

  const desktopSize = {
    width: "min(calc((100svh - 90px) * 16 / 9), calc(100vw - 64px), 1600px)",
    aspectRatio: "16 / 9",
    maxHeight: "calc(100svh - 90px)",
  };
  const mediaRadius = isMobile ? 18 : 34;

  // --- Opening image (layer 3, top of media) ---
  const openingAnimate = (() => {
    if (reducedMotion) {
      if (stage === "openingTransition") return { opacity: [1, 0] };
      if (stage === "idle" || stage === "chaos") return { opacity: 1 };
      return { opacity: 0 };
    }
    if (stage === "idle" || stage === "chaos")
      return { opacity: 1, filter: "blur(0px)", scale: 1 };
    if (stage === "openingTransition")
      return { opacity: [1, 0], filter: ["blur(0px)", "blur(8px)"], scale: [1, 1.018] };
    return { opacity: 0, filter: "blur(8px)", scale: 1.018 };
  })();
  const openingTransitionCfg = {
    duration: (reducedMotion ? 300 : OPEN_MS) / 1000,
    ease: "easeInOut",
  };

  // --- Video (layer 2) ---
  const videoAnimate = (() => {
    if (reducedMotion) {
      if (stage === "openingTransition") return { opacity: [0, 1] };
      if (stage === "idle" || stage === "chaos") return { opacity: 0 };
      if (stage === "playing") return { opacity: 1 };
      if (stage === "endingTransition") return { opacity: [1, 0] };
      return { opacity: 0 };
    }
    if (stage === "idle" || stage === "chaos")
      return { opacity: 0, filter: "blur(0px)", scale: 1 };
    if (stage === "openingTransition")
      return { opacity: [0, 1], filter: ["blur(7px)", "blur(0px)"], scale: [0.992, 1] };
    if (stage === "playing") return { opacity: 1, filter: "blur(0px)", scale: 1 };
    if (stage === "endingTransition")
      // keep last frame visible until the ending image reaches ~0.65, then fade out
      return {
        opacity: [1, 1, 0],
        filter: ["blur(0px)", "blur(0px)", "blur(7px)"],
        scale: [1, 1, 1.012],
      };
    return { opacity: 0, filter: "blur(7px)", scale: 1.012 };
  })();
  const videoTransitionCfg = {
    duration: (reducedMotion ? 300 : stage === "endingTransition" ? END_MS : OPEN_MS) / 1000,
    ease: "easeInOut",
    ...(stage === "endingTransition" && !reducedMotion ? { times: [0, 0.65, 1] } : {}),
  };

  // --- Ending image (layer 1, lowest) ---
  const endingAnimate = (() => {
    if (reducedMotion) {
      if (stage === "endingTransition") return { opacity: [0, 1] };
      if (stage === "complete") return { opacity: 1 };
      return { opacity: 0 };
    }
    if (stage === "endingTransition")
      return { opacity: [0, 1], filter: ["blur(8px)", "blur(0px)"], scale: [0.988, 1] };
    if (stage === "complete") return { opacity: 1, filter: "blur(0px)", scale: 1 };
    return { opacity: 0, filter: "blur(8px)", scale: 0.988 };
  })();
  const endingTransitionCfg = {
    duration: (reducedMotion ? 300 : END_MS) / 1000,
    ease: "easeInOut",
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

  const showOpeningLight = stage === "openingTransition" && !reducedMotion;
  const showEndingLight = stage === "endingTransition" && !reducedMotion;

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
            borderRadius: mediaRadius,
            overflow: "hidden",
            boxShadow: cardShadow,
            background: "#000",
            ...(isMobile ? { width: "100%", height: "82svh" } : desktopSize),
          }}
        >
          {/* Layer 1 — Ending image (lowest, preloaded beneath the video) */}
          <motion.img
            src={AFTER_IMG}
            alt=""
            initial={{ opacity: 0, filter: "blur(8px)", scale: 0.988 }}
            animate={endingAnimate}
            transition={endingTransitionCfg}
            style={{ ...baseMedia, borderRadius: mediaRadius, zIndex: 1 }}
          />

          {/* Layer 2 — Video (always mounted for preload) */}
          <motion.video
            ref={videoRef}
            src={VIDEO_SRC}
            poster={BEFORE_IMG}
            muted
            playsInline
            preload="auto"
            onTimeUpdate={onTimeUpdate}
            initial={{ opacity: 0, filter: "blur(0px)", scale: 1 }}
            animate={videoAnimate}
            transition={videoTransitionCfg}
            style={{ ...baseMedia, borderRadius: mediaRadius, zIndex: 2 }}
          />

          {/* Layer 3 — Opening image (above the video, crossfades out) */}
          <motion.img
            src={BEFORE_IMG}
            alt="מנהלת רווחה בעומס"
            initial={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            animate={openingAnimate}
            transition={openingTransitionCfg}
            style={{ ...baseMedia, borderRadius: mediaRadius, zIndex: 3 }}
          />

          {/* Light layer — opening image -> video (soft warm radial, max 0.58) */}
          {showOpeningLight && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.58, 0.58, 0] }}
              transition={{ duration: OPEN_MS / 1000, ease: "easeOut", times: [0, 0.22, 0.41, 1] }}
              style={{
                position: "absolute",
                inset: 0,
                background: LIGHT_OPENING,
                mixBlendMode: "screen",
                zIndex: 10,
                pointerEvents: "none",
              }}
            />
          )}

          {/* Light layer — video -> ending image (warm horizontal sweep, max 0.52) */}
          {showEndingLight && (
            <motion.div
              initial={{ opacity: 0, x: "-42%" }}
              animate={{ opacity: [0, 0.52, 0.52, 0], x: ["-42%", "42%"] }}
              transition={{ duration: END_MS / 1000, ease: "easeInOut", times: [0, 0.23, 0.44, 1] }}
              style={{
                position: "absolute",
                inset: 0,
                width: "140%",
                background: LIGHT_ENDING,
                mixBlendMode: "screen",
                zIndex: 10,
                pointerEvents: "none",
              }}
            />
          )}

          {/* Layer 4 — Chaos words overlay (always mounted, opacity-driven) */}
          <ChaosWordsLayer
            enteredWords={enteredWords}
            videoTime={videoTime}
            isMobile={isMobile}
            reducedMotion={reducedMotion}
            active={stage !== "idle"}
          />

          {/* Opening live button */}
          {(stage === "idle" || stage === "chaos") && (
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

          {/* Ending live button — only after the ending image has settled */}
          {stage === "complete" && (
            <motion.button
              onClick={scrollToDemo}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.18 }}
              whileHover={{ y: -2 }}
              style={{
                ...btnBase,
                right: "7%",
                top: "62%",
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