import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
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

const CORAL = "#F47A5A";

const OPEN_DUR = 0.7; // opening transition (700ms)
const END_DUR = 0.9; // ending transition (900ms)
const RM_DUR = 0.18; // reduced-motion crossfade
const LINEAR = "linear";
const TIMES4 = [0, 0.2, 0.8, 1];

const END_EARLY = 0.9; // start ending transition this many seconds before the video ends
const LOAD_TIMEOUT_MS = 8000;
const PREP_DELAY_MS = 1150; // existing word-sequence lead before playback
const FRAME_TIMEOUT_MS = 3000;
const MIN_MEDIA_H = 180; // don't shrink media to zero on low screens — allow scroll instead

// Soft broad halo — warm white with a faint coral touch, transparent edges (no opaque rect, no blend mode).
const HALLO_BG =
  "radial-gradient(ellipse at center, rgba(255,247,238,0.9) 0%, rgba(244,122,90,0.06) 45%, transparent 72%)";

export default function HeroTransformation() {
  // idle | chaos | opening | playing | ending | complete | failed
  const [stage, setStage] = useState("idle");
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [enteredWords, setEnteredWords] = useState({});
  const [mediaSize, setMediaSize] = useState({ w: 800, h: 450 });
  const [buttonAreaH, setButtonAreaH] = useState(88);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const mediaRowRef = useRef(null);
  const contentRef = useRef(null);

  const timers = useRef([]);
  const loadTimerRef = useRef(null);
  const frameTimeoutRef = useRef(null);
  const rafRef = useRef(null);
  const rvfcIdRef = useRef(null);

  const startedRef = useRef(false);
  const endedRef = useRef(false);
  const endImgReadyRef = useRef(false);
  const attemptRef = useRef(0);
  const phaseRef = useRef("idle");
  const buttonAreaHRef = useRef(88);

  const setPhase = (s) => {
    phaseRef.current = s;
    setStage(s);
  };

  // ── Responsive + reduced motion ───────────────────────────────────────────
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

  // ── Frame-loop cancellation (rAF + rVFC kept separate) ──────────────────────
  const cancelFrameLoops = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const v = videoRef.current;
    if (rvfcIdRef.current != null && v && typeof v.cancelVideoFrameCallback === "function") {
      try {
        v.cancelVideoFrameCallback(rvfcIdRef.current);
      } catch (e) {
        /* ignore */
      }
    }
    rvfcIdRef.current = null;
  };

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
    if (loadTimerRef.current) {
      clearTimeout(loadTimerRef.current);
      loadTimerRef.current = null;
    }
    if (frameTimeoutRef.current) {
      clearTimeout(frameTimeoutRef.current);
      frameTimeoutRef.current = null;
    }
  };

  // ── Media sizing: measure actual areas via ResizeObserver ─────────────────
  useLayoutEffect(() => {
    const compute = () => {
      const vh = window.innerHeight;
      const mob = window.innerWidth < 768;
      const headerEl = document.querySelector("header");
      const headerH = headerEl ? headerEl.getBoundingClientRect().height : mob ? 64 : 72;
      const headingH = headingRef.current
        ? headingRef.current.getBoundingClientRect().height
        : 0;
      const btnH = buttonAreaHRef.current;
      const padTop = 10;
      const padBottom = mob ? 16 : 12;
      const gapHeading = headingH > 0 ? 18 : 0;
      const gapButton = 18;
      const availH =
        vh - headerH - padTop - headingH - gapHeading - gapButton - btnH - padBottom;

      const availW = mediaRowRef.current
        ? mediaRowRef.current.getBoundingClientRect().width
        : Math.min(window.innerWidth - 2 * (mob ? 20 : 32), 1200);

      let w = Math.min(availW, 1200);
      let h = w * 9 / 16;
      // height-constrain only when there is reasonable room; otherwise keep width-based and allow scroll
      if (availH >= MIN_MEDIA_H && h > availH) {
        h = availH;
        w = h * 16 / 9;
      }
      setMediaSize({ w: Math.round(w), h: Math.round(h) });
    };

    const measureButton = () => {
      if (contentRef.current) {
        const h = contentRef.current.getBoundingClientRect().height;
        if (h > 0 && h > buttonAreaHRef.current) {
          buttonAreaHRef.current = h;
          setButtonAreaH(h);
        }
      }
    };

    compute();
    measureButton();

    const ro = new ResizeObserver(() => {
      measureButton();
      compute();
    });
    if (mediaRowRef.current) ro.observe(mediaRowRef.current);
    if (headingRef.current) ro.observe(headingRef.current);
    if (contentRef.current) ro.observe(contentRef.current);

    const headerEl = document.querySelector("header");
    const roHeader = new ResizeObserver(compute);
    if (headerEl) roHeader.observe(headerEl);

    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      roHeader.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [stage, isMobile]);

  // ── Preload + decode ending image (failure is NOT success) ──────────────────
  useEffect(() => {
    const img = new Image();
    img.src = AFTER_IMG;
    const markReady = () => {
      if (img.complete && img.naturalWidth > 0) endImgReadyRef.current = true;
    };
    if (typeof img.decode === "function") {
      img.decode().then(markReady).catch(() => {
        /* decode failed — NOT ready; last frame will stay if needed */
      });
    } else {
      img.onload = markReady;
      img.onerror = () => {};
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

  // ── Cleanup on unmount ────────────────────────────────────────────────────
  useEffect(
    () => () => {
      clearTimers();
      cancelFrameLoops();
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

  // ── Wait for a displayable frame (rVFC preferred; verify frame data) ────────
  const waitForFrame = (v, attempt) =>
    new Promise((resolve, reject) => {
      let done = false;
      const cleanup = () => {
        if (frameTimeoutRef.current) {
          clearTimeout(frameTimeoutRef.current);
          frameTimeoutRef.current = null;
        }
        cancelFrameLoops();
      };
      const finish = () => {
        if (done) return;
        done = true;
        cleanup();
        resolve();
      };
      const fail = () => {
        if (done) return;
        done = true;
        cleanup();
        reject();
      };

      const onRvfc = () => {
        if (attemptRef.current !== attempt) {
          fail();
          return;
        }
        if (v.readyState >= 2 && (v.currentTime || 0) > 0) {
          finish();
        } else {
          try {
            rvfcIdRef.current = v.requestVideoFrameCallback(onRvfc);
          } catch (e) {
            startRaf();
          }
        }
      };

      const startRaf = () => {
        const tick = () => {
          if (attemptRef.current !== attempt) {
            fail();
            return;
          }
          if (v.readyState >= 2 && (v.currentTime || 0) > 0) {
            finish();
            return;
          }
          rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
      };

      if (typeof v.requestVideoFrameCallback === "function") {
        try {
          rvfcIdRef.current = v.requestVideoFrameCallback(onRvfc);
        } catch (e) {
          startRaf();
        }
      } else {
        startRaf();
      }

      frameTimeoutRef.current = setTimeout(() => {
        if (attemptRef.current !== attempt) {
          fail();
          return;
        }
        if (v.readyState >= 2 && (v.currentTime || 0) > 0) finish();
        else fail();
      }, FRAME_TIMEOUT_MS);
    });

  const goFailed = () => {
    cancelFrameLoops();
    clearTimers();
    const v = videoRef.current;
    if (v) {
      try {
        v.pause();
      } catch (e) {
        /* ignore */
      }
    }
    setPhase("failed");
  };

  // ── Opening transition ────────────────────────────────────────────────────
  const beginPlayback = async (attempt) => {
    if (attemptRef.current !== attempt) return;
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
      const p = v.play();
      if (p && typeof p.then === "function") await p;
    } catch (e) {
      if (attemptRef.current === attempt) goFailed();
      return;
    }
    if (attemptRef.current !== attempt) {
      try {
        v.pause();
      } catch (e) {
        /* ignore */
      }
      return;
    }
    try {
      await waitForFrame(v, attempt);
    } catch (e) {
      if (attemptRef.current === attempt) goFailed();
      return;
    }
    if (attemptRef.current !== attempt) {
      try {
        v.pause();
      } catch (e) {
        /* ignore */
      }
      return;
    }
    if (loadTimerRef.current) {
      clearTimeout(loadTimerRef.current);
      loadTimerRef.current = null;
    }
    setPhase("opening");
  };

  const onStart = () => {
    if (phaseRef.current !== "idle" || startedRef.current) return;
    startedRef.current = true;
    const attempt = ++attemptRef.current;
    setPhase("chaos");
    CHAOS_WORDS.forEach((w) => {
      const t = setTimeout(
        () => {
          if (attemptRef.current !== attempt) return;
          setEnteredWords((s) => ({ ...s, [w.word]: true }));
        },
        w.enterAt * 1000
      );
      timers.current.push(t);
    });
    loadTimerRef.current = setTimeout(() => {
      if (phaseRef.current === "chaos") goFailed();
    }, LOAD_TIMEOUT_MS);
    const t = setTimeout(() => beginPlayback(attempt), PREP_DELAY_MS);
    timers.current.push(t);
  };

  const onRetry = () => {
    cancelFrameLoops();
    clearTimers();
    startedRef.current = false;
    endedRef.current = false;
    setVideoTime(0);
    setEnteredWords({});
    attemptRef.current++; // invalidate any pending attempt
    setPhase("idle");
    const v = videoRef.current;
    if (v) {
      try {
        v.pause();
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

  // ── Ending transition (early, ~0.9s before end; ended as fallback) ─────────
  const triggerEnding = () => {
    if (endedRef.current) return;
    endedRef.current = true;
    cancelFrameLoops();
    const attempt = attemptRef.current;
    const start = () => {
      if (attemptRef.current !== attempt) return; // stale
      if (phaseRef.current !== "playing") return;
      setPhase("ending");
    };
    if (endImgReadyRef.current) {
      start();
    } else {
      // try to load + decode now; on failure keep the last frame shown (no overlay)
      const img = new Image();
      img.src = AFTER_IMG;
      const onOk = () => {
        if (img.complete && img.naturalWidth > 0) {
          endImgReadyRef.current = true;
          start();
        }
      };
      if (typeof img.decode === "function") {
        img.decode().then(onOk).catch(() => {});
      } else {
        img.onload = onOk;
        img.onerror = () => {};
      }
    }
  };

  const startEndingWatch = () => {
    const v = videoRef.current;
    if (!v) return;
    const tick = () => {
      if (endedRef.current) return;
      const cur = v.currentTime || 0;
      const dur = v.duration;
      if (isFinite(dur) && dur > 0 && cur >= dur - END_EARLY) {
        triggerEnding();
        return;
      }
      if (typeof v.requestVideoFrameCallback === "function") {
        try {
          rvfcIdRef.current = v.requestVideoFrameCallback(tick);
        } catch (e) {
          rafRef.current = requestAnimationFrame(tick);
        }
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    if (typeof v.requestVideoFrameCallback === "function") {
      try {
        rvfcIdRef.current = v.requestVideoFrameCallback(tick);
      } catch (e) {
        rafRef.current = requestAnimationFrame(tick);
      }
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const onEnded = () => {
    if (endedRef.current) return;
    triggerEnding();
  };

  const onVideoError = () => {
    if (phaseRef.current === "chaos" || phaseRef.current === "opening") goFailed();
  };

  // Finish opening/ending on animation completion (not a separate setTimeout)
  const onOpeningAnimComplete = () => {
    if (phaseRef.current !== "opening") return;
    setPhase("playing");
    startEndingWatch();
  };
  const onEndingAnimComplete = () => {
    if (phaseRef.current !== "ending") return;
    setPhase("complete");
  };

  // ── Derived layer targets ─────────────────────────────────────────────────
  const inTransition = stage === "opening" || stage === "ending";
  const mediaWill = inTransition ? "opacity, filter" : "auto";
  const lightOn = inTransition && !reducedMotion;
  const lightDur = stage === "ending" ? END_DUR : OPEN_DUR;

  // Opening image
  let openingImgAnimate;
  let openingImgTransition;
  if (reducedMotion) {
    if (stage === "opening") {
      openingImgAnimate = { opacity: [1, 0] };
      openingImgTransition = { duration: RM_DUR, ease: LINEAR };
    } else if (stage === "idle" || stage === "chaos" || stage === "failed") {
      openingImgAnimate = { opacity: 1 };
      openingImgTransition = { duration: 0.2 };
    } else {
      openingImgAnimate = { opacity: 0 };
      openingImgTransition = { duration: 0.2 };
    }
  } else {
    if (stage === "opening") {
      openingImgAnimate = {
        opacity: [1, 1, 0, 0],
        filter: ["blur(0px)", "blur(6px)", "blur(6px)", "blur(6px)"],
      };
      openingImgTransition = { duration: OPEN_DUR, times: TIMES4, ease: LINEAR };
    } else if (stage === "idle" || stage === "chaos" || stage === "failed") {
      openingImgAnimate = { opacity: 1, filter: "blur(0px)" };
      openingImgTransition = { duration: 0.2 };
    } else {
      openingImgAnimate = { opacity: 0, filter: "blur(0px)" };
      openingImgTransition = { duration: 0.2 };
    }
  }

  // Video (base layer — stays opaque once playback starts; no fade-in parallel to image fade-out)
  let videoAnimate;
  let videoTransition;
  if (reducedMotion) {
    if (stage === "opening" || stage === "playing" || stage === "ending" || stage === "complete") {
      videoAnimate = { opacity: 1 };
      videoTransition = { opacity: { duration: 0 } };
    } else {
      videoAnimate = { opacity: 0 };
      videoTransition = { opacity: { duration: 0 } };
    }
  } else {
    if (stage === "opening") {
      videoAnimate = { opacity: 1, filter: ["blur(0px)", "blur(6px)", "blur(6px)", "blur(0px)"] };
      videoTransition = {
        opacity: { duration: 0 },
        filter: { duration: OPEN_DUR, times: TIMES4, ease: LINEAR },
      };
    } else if (stage === "idle" || stage === "chaos" || stage === "failed") {
      videoAnimate = { opacity: 0, filter: "blur(0px)" };
      videoTransition = { duration: 0.2 };
    } else if (stage === "playing") {
      videoAnimate = { opacity: 1, filter: "blur(0px)" };
      videoTransition = { duration: 0.2 };
    } else if (stage === "ending") {
      videoAnimate = { opacity: 1, filter: ["blur(0px)", "blur(6px)", "blur(6px)"] };
      videoTransition = {
        opacity: { duration: 0 },
        filter: { duration: END_DUR, times: [0, 0.2, 1], ease: LINEAR },
      };
    } else {
      // complete — stays opaque + blurred under the sharp ending image
      videoAnimate = { opacity: 1, filter: "blur(6px)" };
      videoTransition = { duration: 0.2 };
    }
  }

  // Ending image
  let endImgAnimate;
  let endImgTransition;
  if (reducedMotion) {
    if (stage === "ending") {
      endImgAnimate = { opacity: [0, 1] };
      endImgTransition = { duration: RM_DUR, ease: LINEAR };
    } else if (stage === "complete") {
      endImgAnimate = { opacity: 1 };
      endImgTransition = { duration: 0.2 };
    } else {
      endImgAnimate = { opacity: 0 };
      endImgTransition = { duration: 0.2 };
    }
  } else {
    if (stage === "ending") {
      endImgAnimate = {
        opacity: [0, 0, 1, 1],
        filter: ["blur(6px)", "blur(6px)", "blur(6px)", "blur(0px)"],
      };
      endImgTransition = { duration: END_DUR, times: TIMES4, ease: LINEAR };
    } else if (stage === "complete") {
      endImgAnimate = { opacity: 1, filter: "blur(0px)" };
      endImgTransition = { duration: 0.2 };
    } else {
      endImgAnimate = { opacity: 0, filter: "blur(6px)" };
      endImgTransition = { duration: 0.2 };
    }
  }

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
    stage === "chaos" || stage === "opening" || stage === "playing" || stage === "ending";

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

      <div
        ref={containerRef}
        style={{
          margin: "0 auto",
          padding: isMobile ? "0 20px" : "0 32px",
          maxWidth: 1200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Mobile-only HTML heading for readability (existing message, no new copy) */}
        {isMobile && (
          <div ref={headingRef} style={{ textAlign: "center", width: "100%" }}>
            <h2
              style={{
                color: CHARCOAL,
                fontWeight: 700,
                fontSize: "clamp(22px, 6vw, 28px)",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              כמה ידיים צריך כדי לנהל רווחה?
            </h2>
          </div>
        )}

        {/* Shared, stable media frame — 16:9, same size across all stages, centered */}
        <div ref={mediaRowRef} style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <div
            style={{
              position: "relative",
              width: mediaSize.w,
              height: mediaSize.h,
              borderRadius: isMobile ? 18 : 34,
              overflow: "hidden",
              boxShadow:
                "0 24px 70px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.3)",
              background: "#000",
              transform: "translateZ(0)",
            }}
          >
            {/* Layer 1 — video (base, stays opaque once playing) */}
            <motion.video
              ref={videoRef}
              src={VIDEO_SRC}
              muted
              playsInline
              preload={isMobile ? "metadata" : "auto"}
              onTimeUpdate={onTimeUpdate}
              onEnded={onEnded}
              onError={onVideoError}
              initial={{ opacity: 0, filter: "blur(0px)" }}
              animate={videoAnimate}
              transition={videoTransition}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
                zIndex: 1,
                willChange: mediaWill,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            />

            {/* Layer 3 — ending image (above video, fades in at the end) */}
            <motion.img
              src={AFTER_IMG}
              alt=""
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={endImgAnimate}
              transition={endImgTransition}
              onAnimationComplete={onEndingAnimComplete}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
                zIndex: 3,
                willChange: mediaWill,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            />

            {/* Layer 4 — opening image (top, crossfades out at the start) */}
            <motion.img
              src={BEFORE_IMG}
              alt="מנהלת רווחה בעומס"
              initial={{ opacity: 1, filter: "blur(0px)" }}
              animate={openingImgAnimate}
              transition={openingImgTransition}
              onAnimationComplete={onOpeningAnimComplete}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
                zIndex: 4,
                willChange: mediaWill,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            />

            {/* Soft halo — only during transitions, no blend mode, no flash */}
            {lightOn && (
              <motion.div
                key={stage}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.18, 0] }}
                transition={{ duration: lightDur, times: [0, 0.5, 0.8], ease: LINEAR }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: HALLO_BG,
                  zIndex: 10,
                  pointerEvents: "none",
                  willChange: "opacity",
                }}
              />
            )}

            {/* Chaos words overlay (kept sequence) */}
            <ChaosWordsLayer
              enteredWords={enteredWords}
              videoTime={videoTime}
              isMobile={isMobile}
              reducedMotion={reducedMotion}
              active={wordsActive}
            />
          </div>
        </div>

        {/* Button area — fixed reserve (measured) so the layout never jumps when the button hides */}
        <div
          style={{
            marginTop: 18,
            minHeight: buttonAreaH,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {(stage === "idle" || stage === "chaos") && (
            <div
              ref={contentRef}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
            >
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
              <p style={{ color: "#5A5C62", fontSize: 15, fontWeight: 500, margin: 0 }}>
                10 שניות שממחישות את ההבדל
              </p>
            </div>
          )}

          {stage === "failed" && (
            <div ref={contentRef} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
}