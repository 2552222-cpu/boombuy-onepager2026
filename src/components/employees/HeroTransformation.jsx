import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import HeroIdle from "./hero/HeroIdle";
import HeroLabels from "./hero/HeroLabels";
import { AfterContent } from "./hero/heroShared";
import {
  BEFORE_IMG,
  AFTER_IMG,
  VIDEO_SRC,
  CHARCOAL,
  WARM_WHITE,
  LAPTOP,
} from "./hero/heroShared";

const DARK_SCRIM =
  "linear-gradient(to left, rgba(29,29,31,0.8) 0%, rgba(29,29,31,0.55) 46%, rgba(29,29,31,0.14) 80%, rgba(29,29,31,0) 100%)";

const cardShadow =
  "0 24px 70px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.3)";

export default function HeroTransformation() {
  const [stage, setStage] = useState("idle"); // idle | labels | introTransition | playing | ending | complete
  const [isMobile, setIsMobile] = useState(false);
  const [crossfade, setCrossfade] = useState(false);
  const [localFlash, setLocalFlash] = useState(false);
  const [headlineStage, setHeadlineStage] = useState(0);
  const [outroCrossfade, setOutroCrossfade] = useState(false);
  const [outroFlash, setOutroFlash] = useState(false);
  const videoRef = useRef(null);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };
  const addTimer = (fn, ms) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  };

  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 768);
    c();
    window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = AFTER_IMG;
  }, []);

  // idle -> labels -> introTransition
  const startIntro = () => {
    clearTimers();
    setStage("labels");
    addTimer(() => setStage("introTransition"), 3800);
  };

  // introTransition -> playing (local flash + clean crossfade into video)
  useEffect(() => {
    if (stage !== "introTransition") return;
    addTimer(() => setLocalFlash(true), 500);
    addTimer(() => setLocalFlash(false), 1050);
    addTimer(() => setCrossfade(true), 650);
    addTimer(() => setStage("playing"), 1300);
  }, [stage]);

  // video time tracking -> ending at duration - 0.9
  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration || !isFinite(v.duration)) return;
    if (v.currentTime >= v.duration - 0.9 && stage === "playing") {
      setStage("ending");
    }
  };

  // ending -> approved outro effect
  useEffect(() => {
    if (stage !== "ending") return;
    setHeadlineStage(1);
    setOutroCrossfade(true);
    addTimer(() => setOutroFlash(true), 200);
    addTimer(() => setHeadlineStage(2), 350);
  }, [stage]);

  const handleEnded = () => {
    setHeadlineStage(2);
    setOutroCrossfade(true);
    setStage("complete");
  };

  const scrollToDemo = () =>
    document.getElementById("demo-form-section")?.scrollIntoView({ behavior: "smooth" });

  const baseMedia = { position: "absolute", inset: 0, width: "100%", height: "100%" };

  const showBefore = stage === "idle" || stage === "labels" || stage === "introTransition";
  const showVideo = crossfade && stage !== "complete";
  const showAfter = stage === "ending" || stage === "complete";
  const afterPhase = stage === "complete" ? "after" : "ending";

  const desktopSize = {
    width: "min(calc((100svh - 90px) * 16 / 9), calc(100vw - 64px), 1600px)",
    aspectRatio: "16 / 9",
    maxHeight: "calc(100svh - 90px)",
  };

  const objFit = isMobile ? "contain" : "cover";
  const objPos = isMobile ? "center" : "center bottom";

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
          {/* before image */}
          {showBefore && (
            <motion.img
              src={BEFORE_IMG}
              alt="מנהלת רווחה בעומס"
              style={{ ...baseMedia, objectFit: objFit, objectPosition: objPos, zIndex: 1 }}
            />
          )}

          {/* video — fades in over the before image during introTransition */}
          {showVideo && (
            <motion.video
              ref={videoRef}
              src={VIDEO_SRC}
              poster={BEFORE_IMG}
              autoPlay
              muted
              playsInline
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleEnded}
              initial={{ opacity: 0 }}
              animate={{ opacity: crossfade ? 1 : 0 }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
              style={{ ...baseMedia, objectFit: objFit, objectPosition: objPos, background: "#000", zIndex: 1 }}
            />
          )}

          {/* after image — ending/complete */}
          {showAfter && (
            <motion.img
              src={AFTER_IMG}
              alt="מנהלת רווחה רגועה מול מערכת boombuy"
              initial={{ opacity: 0 }}
              animate={{ opacity: outroCrossfade || stage === "complete" ? 1 : 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ ...baseMedia, objectFit: objFit, objectPosition: "center", zIndex: 2 }}
            />
          )}

          {/* idle overlay (gradient + headline + button) */}
          <HeroIdle stage={stage} isMobile={isMobile} onStart={startIntro} />

          {/* floating words */}
          <HeroLabels stage={stage} isMobile={isMobile} />

          {/* local flash at laptop (introTransition only) */}
          {localFlash && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.32, 0], scale: [0.6, 1, 1.12] }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: `${LAPTOP.x}%`,
                top: `${LAPTOP.y}%`,
                width: 440,
                height: 440,
                marginLeft: -220,
                marginTop: -220,
                background:
                  "radial-gradient(circle, rgba(255,250,245,0.95) 0%, rgba(242,104,71,0.5) 42%, transparent 70%)",
                zIndex: 5,
                pointerEvents: "none",
              }}
            />
          )}

          {/* end screen overlay (ending/complete) — approved design */}
          {(stage === "ending" || stage === "complete") &&
            (isMobile ? (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: CHARCOAL,
                  padding: "24px 20px 22px",
                  zIndex: 6,
                  borderTopLeftRadius: 22,
                  borderTopRightRadius: 22,
                }}
              >
                <AfterContent
                  stage={headlineStage}
                  phase={afterPhase}
                  onContinue={scrollToDemo}
                  isMobile={isMobile}
                />
              </div>
            ) : (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  height: "100%",
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "60px 56px 60px 24px",
                  zIndex: 6,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: DARK_SCRIM,
                    pointerEvents: "none",
                  }}
                />
                <div style={{ position: "relative" }}>
                  <AfterContent
                    stage={headlineStage}
                    phase={afterPhase}
                    onContinue={scrollToDemo}
                    isMobile={isMobile}
                  />
                </div>
              </div>
            ))}

          {/* outro coral flash (ending) — approved */}
          {outroFlash && (
            <motion.div
              initial={{ x: "130%" }}
              animate={{ x: "-130%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "55%",
                background:
                  "linear-gradient(to left, transparent 0%, rgba(242,104,71,0.28) 50%, transparent 100%)",
                zIndex: 7,
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}