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

// Coral light sweep — opening image -> video (subtle, blurred, left -> right)
const OPEN_SWEEP_BG =
  "linear-gradient(90deg, rgba(244,122,90,0) 0%, rgba(244,122,90,0.18) 50%, rgba(244,122,90,0) 100%)";

// Warm horizontal light sweep — video -> ending image (kept as-is)
const LIGHT_ENDING =
  "linear-gradient(100deg, transparent 28%, rgba(255,248,240,0.92) 46%, rgba(240,120,88,0.42) 52%, rgba(255,248,240,0.92) 58%, transparent 72%)";

// Shared media layer geometry — identical for all three media layers (no jump on swap)
const baseMedia = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center center",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
};

const EASE_OPEN = [0.22, 1, 0.36, 1];
const OPEN_CROSSFADE_MS = 700; // crossfade duration (after the 150ms hold)
const OPEN_HOLD_MS = 150; // opening image stays full before crossfade
const OPEN_SWEEP_MS = 750; // light sweep duration
const OPEN_SWEEP_LEAD_MS = 80; // sweep starts this long before crossfade
const END_MS = 950; // video -> ending image (design kept)
const END_BEFORE = 650; // start ending transition this many ms before the video ends

export default function HeroTransformation() {
  // idle | chaos | opening | playing | endingTransition | complete
  const [stage, setStage] = useState("idle");
  const [isMobile, setIsMobile] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [enteredWords, setEnteredWords] = useState({});
  const [buttonGone, setButtonGone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openingSweep, setOpeningSweep] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const videoRef = useRef(null);
  const timers = useRef([]);
  const endedRef = useRef(false);
  const startedRef = useRef(false);

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

  // Preload both opening and ending images on mount
  useEffect(() => {
    [BEFORE_IMG, AFTER_IMG].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
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
      const onPlay = () => {
        v.removeEventListener("playing", onPlay);
        clearTimeout(fb);
        resolve();
      };
      const fb = setTimeout(() => {
        v.removeEventListener("playing", onPlay);
        resolve();
      }, 600);
      v.addEventListener("playing", onPlay);
    });

  // Wait until the video has advanced past the very first frame (avoids the jump
  // from the static opening image to the video's first frame)
  const waitCurrentTime = (v, threshold) =>
    new Promise((resolve) => {
      if (v.currentTime > threshold) return resolve();
      let raf;
      const fb = setTimeout(() => {
        cancelAnimationFrame(raf);
        resolve();
      }, 2000);
      const tick = () => {
        if (v.currentTime > threshold) {
          cancelAnimationFrame(raf);
          clearTimeout(fb);
          resolve();
          return;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });

  const startOpeningTransition = async () => {
    const v = videoRef.current;
    if (v) {
      await waitForVideoReady(v);
      try { v.currentTime = 0; } catch (e) { /* ignore */ }
      // React's `muted` prop is unreliable on <video> — set imperatively so autoplay is allowed
      v.muted = true;
      try { await v.play(); } catch (e) { /* ignore */ }
      await waitForPlaying(v);
      // hold the opening image at opacity 1 while the video plays behind it, past its first frame
      await waitCurrentTime(v, 0.12);
    }
    // sweep starts OPEN_SWEEP_LEAD_MS before the crossfade
    if (!reducedMotion) {
      const tSweep = setTimeout(() => setOpeningSweep(true), OPEN_HOLD_MS - OPEN_SWEEP_LEAD_MS);
      timers.current.push(tSweep);
    }
    const hold = reducedMotion ? 0 : OPEN_HOLD_MS;
    const cross = reducedMotion ? 300 : OPEN_CROSSFADE_MS;
    const tOpen = setTimeout(() => {
      setLoading(false);
      setButtonGone(true);
      setStage("opening");
    }, hold);
    timers.current.push(tOpen);
    const tPlay = setTimeout(() => setStage("playing"), hold + cross);
    timers.current.push(tPlay);
    // remove the sweep layer fully after the transition
    const tSweepOff = setTimeout(() => setOpeningSweep(false), hold + cross + 100);
    timers.current.push(tSweepOff);
  };

  const onStart = () => {
    if (stage !== "idle" || startedRef.current) return;
    startedRef.current = true;
    setLoading(true);
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

  const scrollToLogos = () =>
    document
      .getElementById("trust-logos-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  const desktopSize = {
    width: "min(calc((100svh - 90px) * 16 / 9), calc(100vw - 64px), 1600px)",
    aspectRatio: "16 / 9",
    maxHeight: "calc(100svh - 90px)",
  };
  const mediaRadius = isMobile ? 18 : 34;

  const inTransition = stage === "opening" || stage === "endingTransition";
  const mediaWill = inTransition ? "opacity, transform" : "auto";

  // --- Opening image (layer 3, top of media) ---
  const openingAnimate = (() => {
    if (reducedMotion) {
      if (stage === "opening") return { opacity: [1, 0] };
      if (stage === "idle" || stage === "chaos") return { opacity: 1 };
      return { opacity: 0 };
    }
    if (stage === "idle" || stage === "chaos") return { opacity: 1, scale: 1 };
    if (stage === "opening")
      // no blur on the manager's face — clean crossfade with a tiny scale-up
      return { opacity: [1, 0], scale: [1, 1.008] };
    return { opacity: 0, scale: 1.008 };
  })();
  const openingTransitionCfg = {
    duration: (reducedMotion ? 300 : OPEN_CROSSFADE_MS) / 1000,
    ease: EASE_OPEN,
  };

  // --- Video (layer 2) ---
  const videoAnimate = (() => {
    if (reducedMotion) {
      if (stage === "opening") return { opacity: [0, 1] };
      if (stage === "idle" || stage === "chaos") return { opacity: 0 };
      if (stage === "playing") return { opacity: 1 };
      if (stage === "endingTransition") return { opacity: [1, 0] };
      return { opacity: 0 };
    }
    if (stage === "idle" || stage === "chaos") return { opacity: 0, scale: 1 };
    if (stage === "opening") return { opacity: [0, 1], scale: 1 };
    if (stage === "playing") return { opacity: 1, scale: 1 };
    if (stage === "endingTransition")
      // keep last frame visible until the ending image reaches ~0.65, then fade out (design kept)
      return {
        opacity: [1, 1, 0],
        filter: ["blur(0px)", "blur(0px)", "blur(7px)"],
        scale: [1, 1, 1.012],
      };
    return { opacity: 0, filter: "blur(7px)", scale: 1.012 };
  })();
  const videoTransitionCfg = {
    duration: (reducedMotion ? 300 : stage === "endingTransition" ? END_MS : OPEN_CROSSFADE_MS) / 1000,
    ease: stage === "opening" ? EASE_OPEN : "easeInOut",
    ...(stage === "endingTransition" && !reducedMotion ? { times: [0, 0.65, 1] } : {}),
  };

  // --- Ending image (layer 1, lowest) — design kept as-is ---
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
    boxShadow: "0 8px 22px rgba(0,0,0,0.22)",
  };

  const showEndingLight = stage === "endingTransition" && !reducedMotion;

  const Spinner = () => (
    <span
      style={{
        width: 14,
        height: 14,
        borderRadius: "50%",
        border: "2px solid rgba(255,255,255,0.35)",
        borderTopColor: "#fff",
        animation: "ee-spin 0.8s linear infinite",
        display: "inline-block",
        flexShrink: 0,
      }}
    />
  );

  return (
    <section
      id="hero-transformation"
      style={{
        background: WARM_WHITE,
        direction: "rtl",
        paddingTop: 10,
        paddingBottom: isMobile ? 16 : 12,
        fontFamily: "var(--font-heebo)",
      }}
    >
      <style>{`@keyframes ee-spin{to{transform:rotate(360deg)}}`}</style>
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
            transform: "translateZ(0)",
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
            style={{ ...baseMedia, borderRadius: mediaRadius, zIndex: 1, willChange: mediaWill }}
          />

          {/* Layer 2 — Video (always mounted for preload) */}
          <motion.video
            ref={videoRef}
            src={VIDEO_SRC}
            poster={BEFORE_IMG}
            muted
            playsInline
            preload={isMobile ? "metadata" : "auto"}
            onTimeUpdate={onTimeUpdate}
            initial={{ opacity: 0, scale: 1 }}
            animate={videoAnimate}
            transition={videoTransitionCfg}
            style={{ ...baseMedia, borderRadius: mediaRadius, zIndex: 2, willChange: mediaWill }}
          />

          {/* Layer 3 — Opening image (above the video, crossfades out) */}
          <motion.img
            src={BEFORE_IMG}
            alt="מנהלת רווחה בעומס"
            initial={{ opacity: 1, scale: 1 }}
            animate={openingAnimate}
            transition={openingTransitionCfg}
            style={{ ...baseMedia, borderRadius: mediaRadius, zIndex: 3, willChange: mediaWill }}
          />

          {/* Light layer — opening image -> video (subtle coral sweep, blurred, left -> right) */}
          {openingSweep && !reducedMotion && (
            <motion.div
              initial={{ x: "-90%", opacity: 0 }}
              animate={{ x: ["-90%", "190%"], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: OPEN_SWEEP_MS / 1000,
                ease: "easeInOut",
                times: [0, 0.12, 0.85, 1],
              }}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                width: "60%",
                background: OPEN_SWEEP_BG,
                filter: "blur(28px)",
                mixBlendMode: "screen",
                zIndex: 10,
                pointerEvents: "none",
                willChange: "transform, opacity",
              }}
            />
          )}

          {/* Light layer — video -> ending image (warm horizontal sweep, design kept) */}
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

          {/* Opening live button — stays visible (with a subtle loader) until the crossfade begins */}
          {(stage === "idle" || stage === "chaos" || stage === "opening") && (
            <motion.button
              onClick={onStart}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: buttonGone ? 0 : 1, y: buttonGone ? 10 : 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              whileHover={{ y: buttonGone ? 10 : -2 }}
              disabled={stage !== "idle"}
              style={{
                ...btnBase,
                position: "absolute",
                right: "7%",
                bottom: "10%",
                width: 230,
                height: 56,
                zIndex: 30,
                pointerEvents: buttonGone ? "none" : "auto",
                opacity: stage !== "idle" && !loading ? 0.85 : 1,
              }}
            >
              {loading ? <Spinner /> : <CoralDot />}
              לראות את השדרוג
            </motion.button>
          )}

        </div>

        {/* Ending live button — below the frame, clear of all image content (all viewports) */}
        {stage === "complete" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.18 }}
            style={{ display: "flex", justifyContent: "center", marginTop: 16 }}
          >
            <button
              onClick={scrollToLogos}
              style={{
                ...btnBase,
                width: "auto",
                minWidth: 190,
                maxWidth: 230,
                height: 50,
                borderRadius: 14,
                fontSize: 16,
                padding: "0 22px",
              }}
            >
              ומה העובדים מרגישים?
              <CoralDot />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}