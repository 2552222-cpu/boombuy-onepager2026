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
} from "./hero/heroShared";

const cardShadow =
  "0 24px 70px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.3)";

export default function HeroTransformation() {
  // idle | playing | ending | complete
  const [stage, setStage] = useState("idle");
  const [isMobile, setIsMobile] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [videoStarted, setVideoStarted] = useState(false);
  const [wordsActive, setWordsActive] = useState(true);
  const [w0In, setW0In] = useState(false);
  const [w1In, setW1In] = useState(false);
  const [forceIn, setForceIn] = useState(false);
  const [buttonGone, setButtonGone] = useState(false);
  const videoRef = useRef(null);

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

  // Auto entry of the first two words on hero load
  useEffect(() => {
    if (forceIn) return; // early click forces them in immediately
    const t0 = setTimeout(() => setW0In(true), 450);
    const t1 = setTimeout(() => setW1In(true), 1050);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
    };
  }, [forceIn]);

  const startVideo = () => {
    setVideoStarted(true);
    setStage("playing");
  };

  // Handle early click: force the two words in, wait 220ms, then play
  const onStart = () => {
    if (buttonGone) return;
    setButtonGone(true);
    if (!w0In || !w1In) {
      setForceIn(true);
      setW0In(true);
      setW1In(true);
      setTimeout(startVideo, 220);
    } else {
      startVideo();
    }
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setVideoTime(v.currentTime || 0);
    if (v.duration && isFinite(v.duration)) {
      if (v.currentTime >= 2.3 && wordsActive) setWordsActive(false);
      if (v.currentTime >= v.duration - 0.75 && stage === "playing") setStage("ending");
    }
  };

  const onEnded = () => setStage("complete");

  const scrollToDemo = () =>
    document.getElementById("demo-form-section")?.scrollIntoView({ behavior: "smooth" });

  const baseMedia = { position: "absolute", inset: 0, width: "100%", height: "100%" };

  const showOpening = stage === "idle" || stage === "playing";
  const showVideo = stage === "playing" || stage === "ending";
  const showEnding = stage === "ending" || stage === "complete";

  const desktopSize = {
    width: "min(calc((100svh - 90px) * 16 / 9), calc(100vw - 64px), 1600px)",
    aspectRatio: "16 / 9",
    maxHeight: "calc(100svh - 90px)",
  };

  const imgFit = isMobile ? "contain" : "cover";
  const vidFit = isMobile ? "contain" : "cover";
  const vidPos = isMobile ? "center" : "center bottom";

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
          {/* Opening image — headline is built into the PNG */}
          {showOpening && (
            <img
              src={BEFORE_IMG}
              alt="מנהלת רווחה בעומס"
              style={{ ...baseMedia, objectFit: imgFit, objectPosition: "center", zIndex: 1 }}
            />
          )}

          {/* Video — crossfades over the opening image (320ms) */}
          {showVideo && (
            <motion.video
              ref={videoRef}
              src={VIDEO_SRC}
              poster={BEFORE_IMG}
              autoPlay
              muted
              playsInline
              preload="auto"
              onTimeUpdate={onTimeUpdate}
              onEnded={onEnded}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.32, ease: "easeInOut" }}
              style={{ ...baseMedia, objectFit: vidFit, objectPosition: vidPos, background: "#000", zIndex: 1 }}
            />
          )}

          {/* Ending image — crossfades in over the last 0.75s of the video */}
          {showEnding && (
            <motion.img
              src={AFTER_IMG}
              alt="מנהלת רווחה רגועה מול מערכת boombuy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              style={{ ...baseMedia, objectFit: imgFit, objectPosition: "center", zIndex: 2 }}
            />
          )}

          {/* Chaos words layer — persistent across opening→video, unmounts at video.currentTime 2.30 */}
          {wordsActive && (
            <ChaosWordsLayer
              w0In={w0In}
              w1In={w1In}
              forceIn={forceIn}
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
              transition={{ duration: 0.18, ease: "easeOut" }}
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