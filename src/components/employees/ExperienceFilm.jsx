import React, { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { RevealHeading, RevealBlock } from "./motion";
import { SECTION } from "./layoutTokens";
import { scrollToId } from "./uiHelpers";

// Experience film — a short, muted clip that shows the wider world of the
// club (sport, shows, wellness, trips). Sits right below the offers slider.
// Captions are pending approval from Ari — the component ships WITHOUT any
// overlay text on the video for now; the heading and subtitle above carry the
// message so nothing depends on the video playing.
const VIDEO_SRC =
  "https://media.base44.com/videos/public/69e48538aaee477b09fc7b49/3dae91cde_gemini_generated_video_74de224c.mp4";

const CHARCOAL = SECTION.CHARCOAL;
const CORAL_TEXT = SECTION.CORAL_TEXT;
const CORAL_BTN = SECTION.BTN_CORAL;

export default function ExperienceFilm() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [saveData, setSaveData] = useState(false);
  // playing = the video is currently actively playing.
  // userPaused = the visitor explicitly hit pause; we never auto-restart then.
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 768);
    c();
    window.addEventListener("resize", c);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMq = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", onMq);
    const conn =
      navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn && conn.saveData) setSaveData(true);
    return () => {
      window.removeEventListener("resize", c);
      mq.removeEventListener?.("change", onMq);
    };
  }, []);

  // Autoplay when the frame scrolls into view — but only if the visitor has no
  // reduced-motion preference, isn't on save-data, and hasn't manually paused.
  // Pause again when it leaves the viewport or the tab is hidden.
  useEffect(() => {
    const v = videoRef.current;
    const el = sectionRef.current;
    if (!v || !el) return;
    const canAutoplay = !reducedMotion && !saveData;

    const tryPlay = async () => {
      if (userPaused || !canAutoplay) return;
      if (document.hidden) return;
      try {
        const p = v.play();
        if (p && typeof p.then === "function") {
          await p;
        }
      } catch (e) {
        // Autoplay rejected — leave the poster/first frame; the play button stays.
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
      } else {
        // Only resume if it was playing before and the user didn't pause.
        if (!userPaused && canAutoplay) tryPlay();
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reducedMotion, saveData, userPaused]);

  // Reflect the video's real playing state (so the button label is correct even
  // if the browser pauses it for its own reasons).
  const onPlayEvt = () => setPlaying(true);
  const onPauseEvt = () => setPlaying(false);

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
        <RevealBlock
          style={{
            color: CORAL_TEXT,
            fontWeight: SECTION.KICKER_WEIGHT,
            fontSize: SECTION.KICKER_SIZE,
            letterSpacing: "-0.01em",
            margin: "0 0 8px",
          }}
        >
          וזה רק חלק מהמועדון
        </RevealBlock>

        <RevealHeading
          as="h2"
          amount={0.2}
          style={{
            color: CHARCOAL,
            fontSize: `clamp(${SECTION.H2_MOBILE}px, ${isMobile ? "4vw" : "4vw"}, 48px)`,
            fontWeight: SECTION.H2_WEIGHT,
            lineHeight: SECTION.H2_LH,
            letterSpacing: "-0.025em",
            margin: 0,
            textWrap: "balance",
          }}
        >
          וזה רק חלק מהמועדון <span style={{ color: CORAL_TEXT }}>שלכם.</span>
        </RevealHeading>

        <p
          style={{
            color: SECTION.BODY_COLOR,
            fontSize: `clamp(${SECTION.BODY_MOBILE}px,1.6vw,${SECTION.BODY_DESKTOP}px)`,
            fontWeight: 500,
            lineHeight: SECTION.BODY_LH,
            margin: "14px auto 0",
            maxWidth: 680,
          }}
        >
          הופעות, ספורט, וולנס וחופשות. יותר אפשרויות לעובדים, כל השנה.
        </p>

        {/* Video frame — wide, rounded, same shadow language as the hero. */}
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
              onPlay={onPlayEvt}
              onPause={onPauseEvt}
              aria-label="סרטון קצר המציג חוויות במועדון: כדורגל, הופעה, בריכת ספא וחופשה משפחתית"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: isMobile ? "contain" : "cover",
                objectPosition: "50% 50%",
                display: "block",
              }}
            />

            {/* Accessible pause/play control — bottom-center, safe-area aware. */}
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
                boxShadow: isMobile
                  ? "0 4px 14px rgba(0,0,0,0.14)"
                  : "0 8px 24px rgba(0,0,0,0.18)",
              }}
            >
              {playing ? (
                <Pause size={isMobile ? 16 : 18} color={CHARCOAL} strokeWidth={2.5} />
              ) : (
                <Play size={isMobile ? 16 : 18} color={CHARCOAL} strokeWidth={2.5} />
              )}
            </button>
          </div>
        </RevealBlock>

        <div
          style={{
            marginTop: isMobile ? 18 : 22,
            display: "flex",
            justifyContent: "center",
          }}
        >
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