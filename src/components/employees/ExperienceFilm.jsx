import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { RevealHeading, RevealBlock, EASE } from "./motion";
import { SECTION } from "./layoutTokens";
import { scrollToId } from "./uiHelpers";

// Experience film — a short, muted clip that shows the wider world of the
// club (sport, shows, wellness, trips). Sits right below the offers slider.
// Captions are an HTML layer synced to currentTime (not burned in, not a timer).
const VIDEO_SRC =
  "https://media.base44.com/videos/public/69e48538aaee477b09fc7b49/3dae91cde_gemini_generated_video_74de224c.mp4";

const CHARCOAL = SECTION.CHARCOAL;
const CORAL_TEXT = SECTION.CORAL_TEXT;
const CORAL_BTN = SECTION.BTN_CORAL;

// Caption scenes — timing derived from currentTime.
// Scenes 0 & 1 share the same small line; only the title changes between them,
// so the small line does NOT re-animate across that boundary.
const SCENES = [
  { start: 0, end: 2.458, title: "משחקי כדורגל בחו״ל", small: "Secret Seats · עד 100 אירו לכרטיס" },
  { start: 2.458, end: 4.958, title: "הופעות בינלאומיות", small: "Secret Seats · עד 100 אירו לכרטיס" },
  { start: 4.958, end: 7.458, title: "עיסויים וטיפולים משלימים", small: "עד 150 ₪ לטיפול" },
  { start: 7.458, end: Infinity, title: "חופשות בארץ ובחו״ל", small: "ועוד חוויות לעובדים שלכם" },
];

function sceneAt(t) {
  for (let i = 0; i < SCENES.length; i++) {
    if (t >= SCENES[i].start && t < SCENES[i].end) return i;
  }
  return SCENES.length - 1;
}

const ARIA_DESC =
  "סרטון קצר ללא קול. מציג ארבע חוויות לעובדים: משחק כדורגל בחו״ל, הופעה בינלאומית, בריכת ספא וחופשה משפחתית.";

function CaptionContent({ scene, reducedMotion, strip }) {
  const initial = reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 };
  const enter = { opacity: 1, y: 0 };
  const enterTrans = reducedMotion
    ? { duration: 0.01 }
    : { duration: 0.6, ease: EASE };
  const exitState = reducedMotion
    ? { opacity: 1 }
    : { opacity: 0, transition: { duration: 0.18 } };

  return (
    <div dir="rtl" style={{ textAlign: "right" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.title}
          initial={initial}
          animate={enter}
          exit={exitState}
          transition={enterTrans}
          style={{
            fontWeight: 800,
            fontSize: strip ? "clamp(22px,6vw,26px)" : "clamp(28px,3vw,40px)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "#fff",
            textShadow: strip ? "none" : "0 2px 14px rgba(0,0,0,0.55)",
          }}
        >
          {scene.title}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.small}
          initial={initial}
          animate={enter}
          exit={exitState}
          transition={reducedMotion ? { duration: 0.01 } : { duration: 0.6, ease: EASE, delay: 0.1 }}
          style={{
            fontWeight: 500,
            fontSize: strip ? 16 : "clamp(16px,1.4vw,20px)",
            lineHeight: 1.4,
            color: "rgba(255,255,255,0.9)",
            textShadow: strip ? "none" : "0 1px 10px rgba(0,0,0,0.5)",
            marginTop: 4,
          }}
        >
          {scene.small}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function ExperienceFilm() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 768);
    c();
    window.addEventListener("resize", c);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMq = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", onMq);
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn && conn.saveData) setSaveData(true);
    return () => {
      window.removeEventListener("resize", c);
      mq.removeEventListener?.("change", onMq);
    };
  }, []);

  // Autoplay when in view — only if no reduced-motion, no save-data, no manual pause.
  useEffect(() => {
    const v = videoRef.current;
    const el = sectionRef.current;
    if (!v || !el) return;
    const canAutoplay = !reducedMotion && !saveData;
    const tryPlay = async () => {
      if (userPaused || !canAutoplay || document.hidden) return;
      try {
        const p = v.play();
        if (p && typeof p.then === "function") await p;
      } catch (e) {
        setPlaying(false);
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) tryPlay();
          else {
            try { v.pause(); } catch (err) { /* ignore */ }
            setPlaying(false);
          }
        });
      },
      { threshold: 0.45 }
    );
    io.observe(el);
    const onVis = () => {
      if (document.hidden) {
        try { v.pause(); } catch (err) { /* ignore */ }
        setPlaying(false);
      } else if (!userPaused && canAutoplay) tryPlay();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reducedMotion, saveData, userPaused]);

  // Sync captions to currentTime via rAF — handles play, pause, seek, replay.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let raf = null;
    const tick = () => {
      const idx = sceneAt(v.currentTime || 0);
      setActiveScene((prev) => (prev !== idx ? idx : prev));
      if (!v.paused && !v.ended) raf = requestAnimationFrame(tick);
      else raf = null;
    };
    const onPlay = () => {
      setPlaying(true);
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onPause = () => setPlaying(false);
    const onSeeked = () => setActiveScene(sceneAt(v.currentTime || 0));
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("seeked", onSeeked);
    v.addEventListener("timeupdate", onSeeked); // fallback for edge cases
    return () => {
      if (raf) cancelAnimationFrame(raf);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("seeked", onSeeked);
      v.removeEventListener("timeupdate", onSeeked);
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      setUserPaused(false);
      v.play().catch(() => setPlaying(false));
    } else {
      setUserPaused(true);
      v.pause();
    }
  };

  const scene = SCENES[activeScene];
  const strip = isMobile; // mobile: captions in a dark strip below the video

  const btnDark = {
    background: CHARCOAL,
    color: "#fff",
    border: "none",
    borderRadius: SECTION.BTN_RADIUS,
    height: SECTION.BTN_H,
    padding: "0 26px",
    fontFamily: "inherit",
    fontWeight: 700,
    fontSize: "clamp(15px,1.1vw,17px)",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    boxShadow: "0 8px 24px rgba(23,25,29,0.18)",
  };

  return (
    <section
      id="experience-film"
      className="bb-section"
      ref={sectionRef}
      dir="rtl"
      style={{
        background: SECTION.BG_WARM,
        fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif",
        scrollMarginTop: 90,
        overflow: "hidden",
      }}
    >
      <style>{`@media (max-width:768px){ #experience-film{ scroll-margin-top:72px; } }`}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px", textAlign: "center" }}>
        <RevealHeading
          as="h2"
          amount={0.2}
          style={{
            color: CHARCOAL,
            fontSize: `clamp(${SECTION.H2_MOBILE}px,4vw,48px)`,
            fontWeight: SECTION.H2_WEIGHT,
            lineHeight: SECTION.H2_LH,
            letterSpacing: "-0.025em",
            margin: 0,
            textWrap: "balance",
          }}
        >
          וזה רק חלק מהחוויות שהעובדים <span style={{ color: CORAL_TEXT }}>שלכם ייהנו מהן כל השנה.</span>
        </RevealHeading>

        <RevealBlock
          amount={0.1}
          delay={0.05}
          style={{ marginTop: 28, borderRadius: isMobile ? 20 : 34, overflow: "hidden" }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              borderRadius: isMobile ? 20 : 34,
              overflow: "hidden",
              background: "#0B0C0F",
              boxShadow:
                "0 24px 70px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.18)",
            }}
          >
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              muted
              playsInline
              preload="metadata"
              aria-label={ARIA_DESC}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "50% 50%",
                display: "block",
              }}
            />

            {/* Desktop: caption overlay in the bottom-right safe area. */}
            {!strip && (
              <div
                style={{
                  position: "absolute",
                  bottom: "10%",
                  right: "6%",
                  left: "6%",
                  pointerEvents: "none",
                  zIndex: 15,
                }}
              >
                <CaptionContent scene={scene} reducedMotion={reducedMotion} strip={false} />
              </div>
            )}

            {/* Accessible play/pause control. */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "השהה" : "נגן"}
              style={{
                position: "absolute",
                bottom: isMobile ? 12 : 16,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 20,
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(23,25,29,0.10)",
                borderRadius: 999,
                height: isMobile ? 40 : 48,
                width: isMobile ? 40 : 48,
                padding: 0,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: isMobile ? "0 4px 14px rgba(0,0,0,0.14)" : "0 8px 24px rgba(0,0,0,0.18)",
              }}
            >
              {playing ? (
                <Pause size={isMobile ? 16 : 18} color={CHARCOAL} strokeWidth={2.5} />
              ) : (
                <Play size={isMobile ? 16 : 18} color={CHARCOAL} strokeWidth={2.5} />
              )}
            </button>
          </div>

          {/* Mobile: caption strip below the video, same sync. */}
          {strip && (
            <div
              style={{
                background: "#0B0C0F",
                borderRadius: "0 0 16px 16px",
                padding: "14px 16px",
                marginTop: -6,
              }}
            >
              <CaptionContent scene={scene} reducedMotion={reducedMotion} strip={true} />
            </div>
          )}
        </RevealBlock>

        {/* Fixed line below the video. */}
        <p
          style={{
            color: SECTION.BODY_COLOR,
            fontSize: `clamp(${SECTION.BODY_MOBILE}px,1.6vw,${SECTION.BODY_DESKTOP}px)`,
            fontWeight: 500,
            lineHeight: SECTION.BODY_LH,
            margin: "18px auto 0",
            maxWidth: 680,
          }}
        >
          וגם הצגות, סטנדאפ ועוד. כל השנה, במועדון שלכם.
        </p>

        <div style={{ marginTop: isMobile ? 18 : 22, display: "flex", justifyContent: "center" }}>
          <button
            type="button"
            className="bb-btn bb-pulse-btn"
            onClick={() => scrollToId("organization-fit")}
            style={{
              ...btnDark,
              width: isMobile ? "100%" : undefined,
              height: isMobile ? 52 : SECTION.BTN_H,
              fontSize: isMobile ? 16 : "clamp(15px,1.1vw,17px)",
            }}
          >
            <span
              className="bb-pulse-dot"
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: CORAL_BTN,
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            בואי נדבר על המועדון שלכם
          </button>
        </div>
      </div>
    </section>
  );
}