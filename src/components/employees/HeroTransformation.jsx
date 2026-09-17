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
const EASE = [0.22, 1, 0.36, 1]; // cubic-bezier(0.22, 1, 0.36, 1)

const OPEN_MS = 650; // opening transition
const END_MS = 800; // ending transition
const RM_MS = 180; // reduced-motion crossfade
const END_EARLY = 0.8; // start ending transition this many seconds before the video ends
const LOAD_TIMEOUT_MS = 8000;
const PREP_DELAY_MS = 1150; // existing word-sequence lead before playback

// Soft light layer — warm white with a faint coral touch, transparent edges (no opaque rect).
const LIGHT_BG =
  "linear-gradient(100deg, transparent 16%, rgba(255,247,238,0.9) 47%, rgba(244,122,90,0.12) 52%, rgba(255,247,238,0.9) 57%, transparent 84%)";

const BUTTON_AREA_H = 88; // fixed reserve: button(56) + gap(8) + subtitle(~24) — stable, no layout jump

export default function HeroTransformation() {
  // idle | chaos | opening | playing | ending | complete | failed
  const [stage, setStage] = useState("idle");
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [enteredWords, setEnteredWords] = useState({});
  const [mediaSize, setMediaSize] = useState({ w: 800, h: 450 });

  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const timers = useRef([]);
  const loadTimerRef = useRef(null);
  const rafRef = useRef(null);
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
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
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
      const padTop = 10;
      const padBottom = mob ? 16 : 12;
      const gap1 = 18; // heading → media
      const gap2 = 18; // media → button area
      const availH =
        vh - headerH - padTop - headingH - gap1 - gap2 - BUTTON_AREA_H - padBottom;

      const padding = mob ? 20 : 32;
      const contentW = Math.min(window.innerWidth - 2 * padding, 1200);
      let w = contentW;
      let h = w * 9 / 16;
      const maxH = Math.max(availH, 0);
      if (h > maxH) {
        h = maxH;
        w = h * 16 / 9;
      }
      setMediaSize({ w: Math.round(w), h: Math.round(h) });
    };

    compute();
    const roHead = new ResizeObserver(compute);
    if (headingRef.current) roHead.observe(headingRef.current);
    const headerEl = document.querySelector("header");
    if (headerEl) {
      const roHeader = new ResizeObserver(compute);
      roHeader.observe(headerEl);
    }
    window.addEventListener("resize", compute);
    return () => {
      roHead.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  // ── Cleanup on unmount ────────────────────────────────────────────────────
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

  // ── Preload + decode ending image; also preload opening image ───────────────
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

  // ── Wait for a displayable frame using requestVideoFrameCallback, fallback ─
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
        const t = setTimeout(finish, 2000);
        timers.current.push(t);
      } else if (v.readyState >= 2) {
        resolve();
      } else {
        const onReady = () => {
          v.removeEventListener("loadeddata", onReady);
          v.removeEventListener("canplay", onReady);
          resolve();
        };
        v.addEventListener("loadeddata", onReady);
        v.addEventListener("canplay", onReady);
        const t = setTimeout(() => {
          v.removeEventListener("loadeddata", onReady);
          v.removeEventListener("canplay", onReady);
          resolve();
        }, 2000);
        timers.current.push(t);
      }
    });

  const goFailed = () => {
    clearTimers();
    setPhase("failed");
  };

  // ── Opening transition ────────────────────────────────────────────────────
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
      const p = v.play();
      if (p && typeof p.then === "function") await p;
    } catch (e) {
      goFailed();
      return;
    }
    // start the crossfade only once the video is playing and a frame is ready
    await waitForFrame(v);
    if (loadTimerRef.current) {
      clearTimeout(loadTimerRef.current);
      loadTimerRef.current = null;
    }
    setPhase("opening");
    const ms = reducedMotion ? RM_MS : OPEN_MS;
    const t = setTimeout(() => {
      setPhase("playing");
      startEndingWatch();
    }, ms);
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
    loadTimerRef.current = setTimeout(() => {
      if (phaseRef.current === "chaos") goFailed();
    }, LOAD_TIMEOUT_MS);
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

  // ── Ending transition (early, ~0.8s before the end; ended as fallback) ─────
  const triggerEnding = () => {
    if (endedRef.current) return;
    endedRef.current = true;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const start = () => {
      setPhase("ending");
      const ms = reducedMotion ? RM_MS : END_MS;
      const t = setTimeout(() => setPhase("complete"), ms);
      timers.current.push(t);
    };
    if (endImgReadyRef.current) {
      start();
    } else {
      // keep the video / last frame shown until the image is ready — no black screen
      const img = new Image();
      img.src = AFTER_IMG;
      if (typeof img.decode === "function") {
        img.decode().then(start).catch(start);
      } else {
        img.onload = start;
        img.onerror = start;
      }
    }
  };

  const startEndingWatch = () => {
    const v = videoRef.current;
    if (!v) return;
    const dur = v.duration;
    if (!dur || !isFinite(dur)) return; // rely on `ended` fallback
    const triggerAt = Math.max(dur - END_EARLY, 0);
    const tick = () => {
      if (endedRef.current) return;
      const t = v.currentTime || 0;
      if (t >= triggerAt) {
        triggerEnding();
        return;
      }
      if (typeof v.requestVideoFrameCallback === "function") {
        try {
          v.requestVideoFrameCallback(tick);
        } catch (e) {
          rafRef.current = requestAnimationFrame(tick);
        }
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    if (typeof v.requestVideoFrameCallback === "function") {
      try {
        v.requestVideoFrameCallback(tick);
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
    if (phaseRef.current === "chaos") goFailed();
  };

  // ── Derived layer targets ─────────────────────────────────────────────────
  const inTransition = stage === "opening" || stage === "ending";
  const mediaWill = inTransition ? "opacity, filter, transform" : "auto";
  const lightOn = inTransition && !reducedMotion;
  const lightDur = stage === "ending" ? END_MS : OPEN_MS;

  const openingImgAnim = (() => {
    if (reducedMotion) {
      if (stage === "opening") return { opacity: [1, 0] };
      if (stage === "idle" || stage === "chaos" || stage === "failed") return { opacity: 1 };
      return { opacity: 0 };
    }
    if (stage === "opening")
      return { opacity: [1, 0], filter: ["blur(0px)", "blur(5px)"], scale: [1, 1.008] };
    if (stage === "idle" || stage === "chaos" || stage === "failed")
      return { opacity: 1, filter: "blur(0px)", scale: 1 };
    return { opacity: 0, filter: "blur(5px)", scale: 1.008 };
  })();
  const openingImgTrans = stage === "opening"
    ? { duration: (reducedMotion ? RM_MS : OPEN_MS) / 1000, ease: EASE }
    : { duration: 0.25, ease: EASE };

  const videoAnim = (() => {
    if (reducedMotion) {
      if (stage === "opening") return { opacity: [0, 1] };
      if (stage === "playing" || stage === "ending" || stage === "complete") return { opacity: 1 };
      return { opacity: 0 };
    }
    if (stage === "opening")
      return { opacity: [0, 1], filter: ["blur(4px)", "blur(0px)"], scale: 1 };
    if (stage === "idle" || stage === "chaos" || stage === "failed")
      return { opacity: 0, filter: "blur(4px)", scale: 1 };
    if (stage === "playing") return { opacity: 1, filter: "blur(0px)", scale: 1 };
    if (stage === "ending") return { opacity: 1, filter: ["blur(0px)", "blur(5px)"], scale: 1 };
    return { opacity: 1, filter: "blur(5px)", scale: 1 }; // complete
  })();
  const videoTrans = inTransition
    ? { duration: (reducedMotion ? RM_MS : stage === "opening" ? OPEN_MS : END_MS) / 1000, ease: EASE }
    : { duration: 0.25, ease: EASE };

  const endImgAnim = (() => {
    if (reducedMotion) {
      if (stage === "ending") return { opacity: [0, 1] };
      if (stage === "complete") return { opacity: 1 };
      return { opacity: 0 };
    }
    if (stage === "ending")
      return { opacity: [0, 1], filter: ["blur(5px)", "blur(0px)"], scale: [1.008, 1] };
    if (stage === "complete") return { opacity: 1, filter: "blur(0px)", scale: 1 };
    return { opacity: 0, filter: "blur(5px)", scale: 1.008 };
  })();
  const endImgTrans = stage === "ending"
    ? { duration: (reducedMotion ? RM_MS : END_MS) / 1000, ease: EASE }
    : { duration: 0.25, ease: EASE };

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
      ref={sectionRef}
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

      <div style={{ margin: "0 auto", padding: isMobile ? "0 20px" : "0 32px", maxWidth: 1200 }}>
        {/* HTML fallback heading — readable on every breakpoint */}
        <div ref={headingRef} style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 18px" }}>
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

        {/* Shared, stable media frame — 16:9, same size across all stages, centered */}
        <div style={{ display: "flex", justifyContent: "center" }}>
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
              initial={{ opacity: 0, filter: "blur(4px)", scale: 1 }}
              animate={videoAnim}
              transition={videoTrans}
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
              initial={{ opacity: 0, filter: "blur(5px)", scale: 1.008 }}
              animate={endImgAnim}
              transition={endImgTrans}
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
              initial={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              animate={openingImgAnim}
              transition={openingImgTrans}
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

            {/* Soft light layer — only during transitions, no white flash */}
            {lightOn && (
              <motion.div
                key={stage}
                initial={{ opacity: 0, x: "-10%" }}
                animate={{ opacity: [0, 0.14, 0], x: ["-10%", "10%"] }}
                transition={{
                  duration: lightDur / 1000,
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: LIGHT_BG,
                  mixBlendMode: "screen",
                  zIndex: 10,
                  pointerEvents: "none",
                  willChange: "opacity, transform",
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

        {/* Button area — fixed reserve so the layout never jumps when the button hides */}
        <div
          style={{
            marginTop: 18,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            minHeight: BUTTON_AREA_H,
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