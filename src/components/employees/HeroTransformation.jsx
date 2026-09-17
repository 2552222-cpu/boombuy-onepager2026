import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import ChaosWordsLayer from "./hero/ChaosWordsLayer";
import {
  BEFORE_IMG,
  AFTER_IMG,
  VIDEO_SRC,
  CHARCOAL,
  WARM_WHITE,
  CHAOS_WORDS,
} from "./hero/heroShared";

const CORAL = "#F07858";

const EASE = [0.22, 1, 0.36, 1];
const OPEN_MS = 400; // opening crossfade
const OPEN_MS_RM = 180; // reduced-motion opening crossfade
const END_MS = 450; // ending crossfade
const END_MS_RM = 180;
const LOAD_TIMEOUT_MS = 8000;
const PREP_DELAY_MS = 1150; // existing word-sequence lead before playback (unchanged)

const cardShadow =
  "0 24px 70px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.3)";

// Shared media geometry — identical for all three layers (no jump on swap)
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

export default function HeroTransformation() {
  // idle | chaos | opening | playing | ending | complete | failed
  const [stage, setStage] = useState("idle");
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [enteredWords, setEnteredWords] = useState({});

  const videoRef = useRef(null);
  const timers = useRef([]);
  const loadTimerRef = useRef(null);
  const startedRef = useRef(false);
  const endedRef = useRef(false);
  const endImgReadyRef = useRef(false);
  const phaseRef = useRef("idle");

  const setPhase = (s) => {
    phaseRef.current = s;
    setStage(s);
  };

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
    if (loadTimerRef.current) {
      clearTimeout(loadTimerRef.current);
      loadTimerRef.current = null;
    }
  };

  useEffect(
    () => () => {
      clearTimers();
      const v = videoRef.current;
      if (v) {
        try {
          v.pause();
        } catch (e) {
          /* ignore */
        }
      }
    },
    []
  );

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

  // Preload + decode ending image; also preload opening image
  useEffect(() => {
    const endImg = new Image();
    endImg.src = AFTER_IMG;
    if (typeof endImg.decode === "function") {
      endImg
        .decode()
        .then(() => {
          endImgReadyRef.current = true;
        })
        .catch(() => {
          endImgReadyRef.current = true;
        });
    } else {
      endImg.onload = () => {
        endImgReadyRef.current = true;
      };
    }
    const startImg = new Image();
    startImg.src = BEFORE_IMG;
  }, []);

  // Kick video preload on mount (no autoplay)
  useEffect(() => {
    if (videoRef.current) {
      try {
        videoRef.current.load();
      } catch (e) {
        /* ignore */
      }
    }
  }, []);

  // Wait for a displayable frame using requestVideoFrameCallback, with fallback
  const waitForFrame = (v) =>
    new Promise((resolve) => {
      if (typeof v.requestVideoFrameCallback === "function") {
        let done = false;
        const finish = () => {
          if (done) return;
          done = true;
          resolve();
        };
        try {
          v.requestVideoFrameCallback(finish);
        } catch (e) {
          finish();
        }
        // safety fallback in case rVFC never fires
        const t = setTimeout(finish, 2000);
        timers.current.push(t);
      } else {
        if (v.currentTime > 0 && v.readyState >= 2) return resolve();
        const onTick = () => {
          if (v.currentTime > 0 || v.readyState >= 2) {
            v.removeEventListener("timeupdate", onTick);
            resolve();
          }
        };
        v.addEventListener("timeupdate", onTick);
        const t = setTimeout(() => {
          v.removeEventListener("timeupdate", onTick);
          resolve();
        }, 2000);
        timers.current.push(t);
      }
    });

  const goFailed = () => {
    clearTimers();
    setPhase("failed");
  };

  const beginPlayback = async () => {
    const v = videoRef.current;
    if (!v) {
      goFailed();
      return;
    }
    try {
      v.muted = true;
      try {
        v.currentTime = 0;
      } catch (e) {
        /* ignore */
      }
      const playPromise = v.play();
      if (playPromise && typeof playPromise.then === "function") {
        await playPromise;
      }
    } catch (e) {
      goFailed();
      return;
    }
    // only begin crossfade once a real frame is ready and playback has started
    await waitForFrame(v);
    if (loadTimerRef.current) {
      clearTimeout(loadTimerRef.current);
      loadTimerRef.current = null;
    }
    const ms = reducedMotion ? OPEN_MS_RM : OPEN_MS;
    setPhase("opening");
    const t = setTimeout(() => setPhase("playing"), ms);
    timers.current.push(t);
  };

  const onStart = () => {
    if (phaseRef.current !== "idle" || startedRef.current) return;
    startedRef.current = true;
    setPhase("chaos");
    // existing word sequence — no new delay
    CHAOS_WORDS.forEach((w) => {
      const t = setTimeout(
        () => setEnteredWords((s) => ({ ...s, [w.word]: true })),
        w.enterAt * 1000
      );
      timers.current.push(t);
    });
    // load timeout — if we never reach "opening" within 8s, fail gracefully
    loadTimerRef.current = setTimeout(() => {
      if (phaseRef.current === "chaos") goFailed();
    }, LOAD_TIMEOUT_MS);
    // after the existing prep delay, begin playback
    const t = setTimeout(beginPlayback, PREP_DELAY_MS);
    timers.current.push(t);
  };

  const onRetry = () => {
    clearTimers();
    startedRef.current = false;
    endedRef.current = false;
    setEnteredWords({});
    setPhase("idle");
    const v = videoRef.current;
    if (v) {
      try {
        v.load();
      } catch (e) {
        /* ignore */
      }
    }
    onStart();
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setVideoTime(v.currentTime || 0);
  };

  const onEnded = () => {
    if (endedRef.current) return;
    endedRef.current = true;
    // keep last frame; do NOT reset currentTime
    const startEnding = () => {
      const ms = reducedMotion ? END_MS_RM : END_MS;
      setPhase("ending");
      const t = setTimeout(() => setPhase("complete"), ms);
      timers.current.push(t);
    };
    if (endImgReadyRef.current) {
      startEnding();
    } else {
      const img = new Image();
      img.src = AFTER_IMG;
      if (typeof img.decode === "function") {
        img.decode().then(startEnding).catch(startEnding);
      } else {
        img.onload = startEnding;
        img.onerror = startEnding;
      }
    }
  };

  const onVideoError = () => {
    if (phaseRef.current === "chaos") goFailed();
  };

  const desktopSize = {
    width: "min(calc((100svh - 90px) * 16 / 9), calc(100vw - 64px), 1600px)",
    aspectRatio: "16 / 9",
    maxHeight: "calc(100svh - 90px)",
  };
  const mediaRadius = isMobile ? 18 : 34;

  const inTransition = stage === "opening" || stage === "ending";
  const mediaWill = inTransition ? "opacity" : "auto";

  // --- Layer opacity targets ---
  const openImgOpacity =
    stage === "opening"
      ? [1, 0]
      : stage === "idle" || stage === "chaos" || stage === "failed"
      ? 1
      : 0;
  const openImgTransition = {
    duration:
      stage === "opening" ? (reducedMotion ? OPEN_MS_RM : OPEN_MS) / 1000 : 0.2,
    ease: EASE,
  };

  const videoOpacity =
    stage === "opening"
      ? [0, 1]
      : stage === "playing" || stage === "ending" || stage === "complete"
      ? 1
      : 0;
  const videoTransition = {
    duration:
      stage === "opening" ? (reducedMotion ? OPEN_MS_RM : OPEN_MS) / 1000 : 0.2,
    ease: EASE,
  };

  const endImgOpacity =
    stage === "ending" ? [0, 1] : stage === "complete" ? 1 : 0;
  const endImgTransition = {
    duration:
      stage === "ending" ? (reducedMotion ? END_MS_RM : END_MS) / 1000 : 0.2,
    ease: EASE,
  };

  const btnBase = {
    background: CHARCOAL,
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: 16,
    fontFamily: "var(--font-heebo)",
    fontWeight: 700,
    fontSize: 18,
    height: 56,
    minWidth: 240,
    padding: "0 32px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    boxShadow: "0 8px 22px rgba(0,0,0,0.18)",
  };

  const Spinner = () => (
    <span
      style={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        border: "2px solid rgba(255,255,255,0.35)",
        borderTopColor: "#fff",
        animation: "ee-spin 0.8s linear infinite",
        display: "inline-block",
        flexShrink: 0,
      }}
    />
  );

  const wordsActive =
    stage === "chaos" ||
    stage === "opening" ||
    stage === "playing" ||
    stage === "ending";

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
      <style>{`
        @keyframes ee-spin{to{transform:rotate(360deg)}}
        .ht-btn:focus-visible{ outline:3px solid rgba(240,120,88,0.6); outline-offset:3px; }
        #hero-transformation{ scroll-margin-top:90px; }
        @media (max-width:768px){ #hero-transformation{ scroll-margin-top:72px; } }
      `}</style>

      <div style={{ margin: "0 auto", padding: isMobile ? "0 16px" : "0 32px" }}>
        {/* HTML fallback heading — readable on every breakpoint, no reliance on baked image text */}
        <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 18px" }}>
          <p
            style={{
              color: CORAL,
              fontWeight: 600,
              fontSize: isMobile ? 14 : 16,
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            חוויית הרווחה, מודגמת
          </p>
          <h2
            style={{
              color: CHARCOAL,
              fontWeight: 700,
              fontSize: isMobile
                ? "clamp(26px, 7vw, 30px)"
                : "clamp(30px, 2.6vw, 40px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: "8px 0 0",
            }}
          >
            מכאוס לסדר.
          </h2>
        </div>

        {/* Shared, stable media frame — 16:9 on every breakpoint, same border-radius */}
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
            ...(isMobile
              ? { width: "100%", aspectRatio: "16 / 9" }
              : desktopSize),
          }}
        >
          {/* Layer 1 — video (lowest) */}
          <motion.video
            ref={videoRef}
            src={VIDEO_SRC}
            muted
            playsInline
            preload={isMobile ? "metadata" : "auto"}
            onTimeUpdate={onTimeUpdate}
            onEnded={onEnded}
            onError={onVideoError}
            initial={{ opacity: 0 }}
            animate={{ opacity: videoOpacity }}
            transition={videoTransition}
            style={{ ...baseMedia, borderRadius: mediaRadius, zIndex: 1, willChange: mediaWill }}
          />

          {/* Layer 3 — ending image (above video, fades in at the end) */}
          <motion.img
            src={AFTER_IMG}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: endImgOpacity }}
            transition={endImgTransition}
            style={{ ...baseMedia, borderRadius: mediaRadius, zIndex: 3, willChange: mediaWill }}
          />

          {/* Layer 4 — opening image (top, crossfades out at the start) */}
          <motion.img
            src={BEFORE_IMG}
            alt="מנהלת רווחה בעומס"
            initial={{ opacity: 1 }}
            animate={{ opacity: openImgOpacity }}
            transition={openImgTransition}
            style={{ ...baseMedia, borderRadius: mediaRadius, zIndex: 4, willChange: mediaWill }}
          />

          {/* Chaos words overlay (kept sequence) */}
          <ChaosWordsLayer
            enteredWords={enteredWords}
            videoTime={videoTime}
            isMobile={isMobile}
            reducedMotion={reducedMotion}
            active={wordsActive}
          />
        </div>

        {/* Button area — placed BELOW the media, never covers content; stable height to avoid layout shift */}
        <div
          style={{
            marginTop: 18,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            minHeight: 88,
          }}
        >
          {(stage === "idle" || stage === "chaos") && (
            <>
              <button
                type="button"
                className="ht-btn"
                onClick={onStart}
                disabled={stage !== "idle"}
                aria-label="לראות את השדרוג"
                style={{
                  ...btnBase,
                  opacity: stage === "chaos" ? 0.78 : 1,
                  cursor: stage === "idle" ? "pointer" : "default",
                }}
              >
                {stage === "chaos" ? <Spinner /> : <Play size={18} color="#fff" strokeWidth={2.5} />}
                לראות את השדרוג
              </button>
              <p
                style={{
                  color: "#5A5C62",
                  fontSize: 15,
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                10 שניות שממחישות את ההבדל
              </p>
            </>
          )}

          {stage === "failed" && (
            <button
              type="button"
              className="ht-btn"
              onClick={onRetry}
              aria-label="לנסות שוב"
              style={{ ...btnBase, background: CORAL }}
            >
              <RotateCcw size={18} color="#fff" strokeWidth={2.5} />
              לנסות שוב
            </button>
          )}
        </div>
      </div>
    </section>
  );
}