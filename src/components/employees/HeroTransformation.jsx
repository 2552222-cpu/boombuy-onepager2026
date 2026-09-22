import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import ChaosWordsLayer from "./hero/ChaosWordsLayer";
import { scrollToId } from "./uiHelpers";
import {
  BEFORE_IMG,
  AFTER_IMG,
  VIDEO_SRC,
  CHARCOAL,
  WARM_WHITE,
  CHAOS_WORDS,
} from "./hero/heroShared";

const COVER = "#17191D"; // brand dark — the transition cover color
const CORAL = "#F47A5A";

const LOAD_TIMEOUT_MS = 8000;
const FRAME_TIMEOUT_MS = 3000;
const MIN_MEDIA_H = 180;

// Fixed reserves so the media size never changes when the button/heading swap.
const HEADING_RESERVE_MOBILE = 70; // two lines at the mobile clamp
const BUTTON_RESERVE_DESKTOP = 100;
const BUTTON_RESERVE_MOBILE = 116;

const START_HEADING = "כמה ידיים צריך כדי לנהל רווחה?";
const END_HEADING = "אותו תקציב עובד יותר. את פחות.";

export default function HeroTransformation() {
  // idle | chaos | opening | playing | ending | complete | failed
  const [stage, setStage] = useState("idle");
  const [coverPhase, setCoverPhase] = useState("none"); // none | open-rise | open-fall | end-rise | end-fall
  const [beforeHidden, setBeforeHidden] = useState(false);
  const [afterShown, setAfterShown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [enteredWords, setEnteredWords] = useState({});
  const [mediaSize, setMediaSize] = useState({ w: 800, h: 450 });
  const [firstPlay, setFirstPlay] = useState(true);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const mediaRowRef = useRef(null);

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
  const firstPlayRef = useRef(true);

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

  // ── Media sizing: stable across stages; recompute only on resize/breakpoint ─
  useLayoutEffect(() => {
    const compute = () => {
      const vh = window.innerHeight;
      const mob = window.innerWidth < 768;
      const headerEl = document.querySelector("header");
      const headerH = headerEl ? headerEl.getBoundingClientRect().height : mob ? 64 : 72;
      const headingH = mob ? HEADING_RESERVE_MOBILE : 0;
      const gapHeading = mob ? 14 : 0;
      const btnH = mob ? BUTTON_RESERVE_MOBILE : BUTTON_RESERVE_DESKTOP;
      const padTop = 10;
      const padBottom = mob ? 16 : 12;
      const gapButton = 18;
      const availH =
        vh - headerH - padTop - headingH - gapHeading - gapButton - btnH - padBottom;

      const availW = mediaRowRef.current
        ? mediaRowRef.current.getBoundingClientRect().width
        : Math.min(window.innerWidth - (mob ? 40 : 64), 1200);

      let w = Math.min(availW, 1200);
      let h = (w * 9) / 16;
      if (availH >= MIN_MEDIA_H && h > availH) {
        h = availH;
        w = (h * 16) / 9;
      }
      setMediaSize({ w: Math.round(w), h: Math.round(h) });
    };

    compute();
    const headerEl = document.querySelector("header");
    const roHeader = new ResizeObserver(compute);
    if (headerEl) roHeader.observe(headerEl);
    window.addEventListener("resize", compute);
    return () => {
      roHeader.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [isMobile]);

  // ── Preload + decode ending image (no asset editing) ────────────────────────
  useEffect(() => {
    const img = new Image();
    img.src = AFTER_IMG;
    const markReady = () => {
      if (img.complete && img.naturalWidth > 0) endImgReadyRef.current = true;
    };
    if (typeof img.decode === "function") {
      img.decode().then(markReady).catch(() => {});
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
    attemptRef.current++; // invalidate any in-flight attempt so a late promise can't resume playback
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
    setCoverPhase("none");
    setPhase("failed");
  };

  // ── Start playback under the top image; begin the cover once a frame is shown ─
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
    // A decoded + displayed frame exists under the top image → start the cover.
    setPhase("opening");
    setCoverPhase("open-rise");
  };

  const onStart = () => {
    if (phaseRef.current !== "idle" || startedRef.current) return;
    startedRef.current = true;
    const attempt = ++attemptRef.current;
    const isFirst = firstPlayRef.current;
    setPhase("chaos");
    if (isFirst && !reducedMotion) {
      CHAOS_WORDS.forEach((w) => {
        const t = setTimeout(() => {
          if (attemptRef.current !== attempt) return;
          setEnteredWords((s) => ({ ...s, [w.word]: true }));
        }, w.enterAt * 1000);
        timers.current.push(t);
      });
    }
    loadTimerRef.current = setTimeout(() => {
      if (phaseRef.current === "chaos") goFailed();
    }, LOAD_TIMEOUT_MS);
    beginPlayback(attempt);
  };

  // Replay from the end state — keep the ending image until the cover is opaque.
  const onReplay = () => {
    if (phaseRef.current !== "complete") return;
    attemptRef.current++;
    cancelFrameLoops();
    clearTimers();
    endedRef.current = false;
    startedRef.current = true;
    firstPlayRef.current = false;
    setFirstPlay(false);
    setVideoTime(0);
    setEnteredWords({});
    setCoverPhase("none");
    // Keep afterShown true (ending image stays as the top image until the cover hides it).
    setPhase("chaos");
    const attempt = ++attemptRef.current;
    loadTimerRef.current = setTimeout(() => {
      if (phaseRef.current === "chaos") goFailed();
    }, LOAD_TIMEOUT_MS);
    beginPlayback(attempt);
  };

  const onRetry = () => {
    if (phaseRef.current !== "failed") return;
    attemptRef.current++;
    cancelFrameLoops();
    clearTimers();
    startedRef.current = false;
    endedRef.current = false;
    firstPlayRef.current = true;
    setFirstPlay(true);
    setVideoTime(0);
    setEnteredWords({});
    setBeforeHidden(false);
    setAfterShown(false);
    setCoverPhase("none");
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
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setVideoTime(v.currentTime || 0);
  };

  // ── Ending: trigger from duration/currentTime, 480ms (or 180ms reduced) before end ─
  const END_EARLY = reducedMotion ? 0.18 : 0.48;

  const triggerEnding = () => {
    if (endedRef.current) return;
    endedRef.current = true;
    cancelFrameLoops();
    const attempt = attemptRef.current;
    if (attemptRef.current !== attempt) return;
    if (phaseRef.current !== "playing") return;
    if (endImgReadyRef.current) {
      setPhase("ending");
      setCoverPhase("end-rise");
    } else {
      // Ending image not ready: keep the last video frame, don't cover-and-wait.
      setPhase("complete");
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
    if (phaseRef.current === "playing") triggerEnding();
  };

  const onVideoError = () => {
    if (phaseRef.current === "chaos" || phaseRef.current === "opening" || phaseRef.current === "playing") {
      goFailed();
    }
  };

  // ── Cover animation completion → advance phases (no separate timers) ────────
  const onCoverComplete = () => {
    switch (coverPhase) {
      case "open-rise":
        // Cover is opaque: swap the underlying top image away, then reveal.
        setBeforeHidden(true);
        setAfterShown(false);
        setCoverPhase("open-fall");
        break;
      case "open-fall":
        setCoverPhase("none");
        setPhase("playing");
        startEndingWatch();
        break;
      case "end-rise":
        // Cover is opaque: swap in the decoded ending image, then reveal it.
        setAfterShown(true);
        setCoverPhase("end-fall");
        break;
      case "end-fall":
        setCoverPhase("none");
        setPhase("complete");
        break;
      default:
        break;
    }
  };

  // ── Derived ────────────────────────────────────────────────────────────────
  const coverTarget =
    coverPhase === "open-rise" || coverPhase === "end-rise" ? 1 : 0;
  const coverDur = reducedMotion
    ? 0.09
    : coverPhase === "open-fall"
    ? 0.24
    : coverPhase === "end-fall"
    ? 0.28
    : coverPhase === "end-rise"
    ? 0.2
    : 0.18;

  const wordsActive = stage === "chaos" && firstPlay && !reducedMotion;
  const showEndHeading = stage === "complete";

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
        .ht-replay:focus-visible{ outline:3px solid rgba(240,120,88,0.6); outline-offset:3px; }
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
        {/* Mobile-only heading — swaps from "overload" to "solution" at the end.
            Fixed reserve keeps the media size stable across the text change. */}
        {isMobile && (
          <div
            ref={headingRef}
            style={{ textAlign: "center", width: "100%", height: HEADING_RESERVE_MOBILE, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
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
              {showEndHeading ? END_HEADING : START_HEADING}
            </h2>
          </div>
        )}

        {/* Shared, stable media frame — 16:9, same size/crop/radius across all stages */}
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
            {/* Video (base) — stays opaque; covered by the top image / cover as needed */}
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              muted
              playsInline
              preload={isMobile ? "metadata" : "auto"}
              onTimeUpdate={onTimeUpdate}
              onEnded={onEnded}
              onError={onVideoError}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
                zIndex: 1,
              }}
            />

            {/* Ending image — shown after the ending cover swap */}
            <img
              src={AFTER_IMG}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
                zIndex: 3,
                opacity: afterShown ? 1 : 0,
              }}
            />

            {/* Opening (before) image — shown until the opening cover swap */}
            <img
              src={BEFORE_IMG}
              alt="מנהלת רווחה בעומס"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
                zIndex: 4,
                opacity: beforeHidden ? 0 : 1,
              }}
            />

            {/* Chaos words overlay (above images, below the cover) */}
            <ChaosWordsLayer
              enteredWords={enteredWords}
              videoTime={videoTime}
              isMobile={isMobile}
              reducedMotion={reducedMotion}
              active={wordsActive}
            />

            {/* Brand-color cover transition — above all content, inside the frame only */}
            <motion.div
              animate={{ opacity: coverTarget }}
              transition={{ duration: coverDur, ease: "easeInOut" }}
              onAnimationComplete={onCoverComplete}
              style={{
                position: "absolute",
                inset: 0,
                background: COVER,
                zIndex: 25,
                pointerEvents: "none",
                willChange: "opacity",
              }}
            />
          </div>
        </div>

        {/* Button area — fixed reserve so the layout never jumps when content swaps */}
        <div
          style={{
            marginTop: 18,
            minHeight: isMobile ? BUTTON_RESERVE_MOBILE : BUTTON_RESERVE_DESKTOP,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
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
                style={{ ...btnBase, opacity: stage === "chaos" ? 0.85 : 1, cursor: stage === "idle" ? "pointer" : "default" }}
              >
                {stage === "chaos" ? <Spinner /> : <Play size={18} color="#fff" strokeWidth={2.5} />}
                {stage === "chaos" ? "מכין את ההדגמה…" : "לראות את השדרוג"}
              </button>
              {stage === "idle" && (
                <p style={{ color: "#5A5C62", fontSize: 15, fontWeight: 500, margin: 0 }}>
                  10 שניות שממחישות את ההבדל
                </p>
              )}
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

          {stage === "complete" && (
            <>
              <button
                type="button"
                className="ht-btn"
                onClick={() => scrollToId("organization-fit")}
                aria-label="בדיקת התאמה"
                style={btnBase}
              >
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: CORAL, display: "inline-block", flexShrink: 0 }} />
                בדיקת התאמה
              </button>
              <button
                type="button"
                className="ht-replay"
                onClick={onReplay}
                aria-label="לצפייה חוזרת"
                style={{
                  background: "none",
                  border: "none",
                  color: "#5A5C62",
                  fontFamily: "inherit",
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: "pointer",
                  padding: "4px 8px",
                  textDecoration: "underline",
                }}
              >
                לצפייה חוזרת
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}