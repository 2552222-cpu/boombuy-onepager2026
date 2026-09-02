import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

const BG = "#F7F7F4";
const CHARCOAL = "#17191D";
const CORAL = "#F47A5A";

const START_IMG =
  "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/5a1c76266_START-FRAME-2-MOMENTS.png";
const VIDEO_SRC =
  "https://media.base44.com/videos/public/69e48538aaee477b09fc7b49/af582b2ae_Approved_Generate_the_final_vonline-video-cuttercom.mp4";
const END_IMG =
  "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/7e5be3a0c_END-FRAME-365-VALUE-v3-FLOATING.png";

const OPEN_MS = 650;
const END_MS = 650;
const SWEEP_MS = 700;
const SCALE_MS = 400;
const PRE_DELAY = 250;
const END_BEFORE = 650; // start ending transition this many ms before the video ends

const baseMedia = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
};

const CORAL_SWEEP =
  "linear-gradient(90deg, rgba(244,122,90,0) 0%, rgba(244,122,90,0.22) 50%, rgba(244,122,90,0) 100%)";

export default function EmployeeExperience() {
  const [stage, setStage] = useState("idle"); // idle|starting|opening|playing|ending|complete
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const videoRef = useRef(null);
  const timers = useRef([]);
  const fired = useRef({ started: false, completed: false, platform: false });

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

  // Preload the end image so it is ready beneath the video
  useEffect(() => {
    const img = new Image();
    img.src = END_IMG;
  }, []);

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

  const beginOpening = async () => {
    const v = videoRef.current;
    if (v) {
      try { v.currentTime = 0; } catch (e) { /* ignore */ }
      // React's `muted` prop is unreliable on <video> — set imperatively so autoplay is allowed
      v.muted = true;
      try { await v.play(); } catch (e) { /* ignore */ }
      await waitForPlaying(v);
    }
    setStage("opening");
    const t = setTimeout(() => setStage("playing"), OPEN_MS);
    timers.current.push(t);
  };

  const onStart = () => {
    if (stage !== "idle") return;
    if (!fired.current.started) {
      fired.current.started = true;
      try { base44.analytics.track({ eventName: "employee_transformation_started" }); } catch (e) { /* ignore */ }
    }
    setStage("starting");
    const t = setTimeout(beginOpening, PRE_DELAY);
    timers.current.push(t);
  };

  const triggerEnding = () => {
    setStage("ending");
    const t = setTimeout(() => {
      setStage("complete");
      if (!fired.current.completed) {
        fired.current.completed = true;
        try { base44.analytics.track({ eventName: "employee_transformation_completed" }); } catch (e) { /* ignore */ }
      }
    }, END_MS);
    timers.current.push(t);
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration || !isFinite(v.duration)) return;
    if (stage === "playing" && v.currentTime >= v.duration - END_BEFORE / 1000) {
      triggerEnding();
    }
  };

  // Fallback: if timeupdate is missed, catch the natural end (still during playing)
  const onEnded = () => {
    if (stage === "playing") triggerEnding();
  };

  const onPlatformClick = () => {
    if (!fired.current.platform) {
      fired.current.platform = true;
      try { base44.analytics.track({ eventName: "platform_explanation_clicked" }); } catch (e) { /* ignore */ }
    }
    document.getElementById("platform-explanation")?.scrollIntoView({ behavior: "smooth" });
  };

  // --- Layer opacity targets (framer-motion animates between stages) ---
  const startTarget = stage === "idle" || stage === "starting" ? 1 : 0;
  const videoTarget = stage === "opening" || stage === "playing" ? 1 : 0;
  const endTarget = stage === "ending" || stage === "complete" ? 1 : 0;
  const crossfade = { duration: 0.65, ease: "easeInOut" };

  const frameScale = reducedMotion ? 1 : stage === "idle" ? 1 : 1.015;
  const showOpeningSweep = !reducedMotion && stage === "opening";
  const showEndingSweep = !reducedMotion && stage === "ending";

  const frameWidth = isMobile ? "calc(100vw - 40px)" : "min(1180px, calc(100vw - 80px))";
  const radius = isMobile ? 24 : 30;

  const btnTopText = stage === "idle" ? "לראות את השינוי" : "השדרוג מתחיל";
  const btnTopDisabled = stage !== "idle";

  return (
    <section
      id="employee-experience"
      dir="rtl"
      style={{
        background: BG,
        padding: isMobile ? "56px 20px 64px" : "88px 32px 96px",
        fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif",
      }}
    >
      <style>{`
        .ee-btn{
          cursor:pointer;
          border:none;
          font-family:inherit;
          font-weight:800;
          color:#fff;
          border-radius:16px;
          transition:transform .18s ease, box-shadow .18s ease, background .18s ease;
        }
        .ee-btn:focus-visible{
          outline:3px solid rgba(244,122,90,0.55);
          outline-offset:3px;
        }
        .ee-btn-top{ background:${CHARCOAL}; }
        .ee-btn-top:hover:not(:disabled){ transform:translateY(-2px); box-shadow:0 10px 24px rgba(23,25,29,0.22); }
        .ee-btn-top:disabled{ cursor:default; opacity:0.92; }
        .ee-btn-end{ background:${CORAL}; }
        .ee-btn-end:hover{ transform:translateY(-2px); box-shadow:0 10px 24px rgba(244,122,90,0.32); }
      `}</style>

      {/* Top titles + trigger button (above the media, not over the employee) */}
      <div style={{ maxWidth: 850, margin: "0 auto", textAlign: "center", direction: "rtl" }}>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            color: CORAL,
            fontSize: isMobile ? 18 : "clamp(20px, 1.6vw, 23px)",
            fontWeight: 600,
            margin: 0,
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
          }}
        >
          ומה העובדים מרגישים?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
          style={{
            color: CHARCOAL,
            fontSize: isMobile ? "clamp(36px, 9vw, 44px)" : "clamp(42px, 4vw, 68px)",
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
            margin: "14px 0 0",
          }}
        >
          מ-<span style={{ color: CHARCOAL }}>2 רגעים בשנה</span>
          <br />
          לערך שמורגש <span style={{ color: CORAL }}>בכל יום</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, delay: 0.16, ease: "easeOut" }}
          style={{
            color: "#3A3C42",
            fontSize: isMobile ? "clamp(17px, 4vw, 19px)" : "clamp(20px, 1.5vw, 24px)",
            fontWeight: 400,
            lineHeight: 1.6,
            margin: "22px auto 0",
            maxWidth: 720,
          }}
        >
          מתנה בחג היא רגע חשוב. מחוברות נוצרת כשהארגון נוכח גם ביום שאחריו.
        </motion.p>

        <div style={{ marginTop: 30, display: "flex", justifyContent: "center" }}>
          <button
            type="button"
            onClick={onStart}
            disabled={btnTopDisabled}
            className="ee-btn ee-btn-top"
            style={{
              width: isMobile ? "min(100%, 340px)" : "auto",
              minWidth: 200,
              padding: isMobile ? "16px 22px" : "18px 36px",
              fontSize: isMobile ? 17 : 19,
            }}
          >
            {btnTopText}
          </button>
        </div>
      </div>

      {/* Media frame — three overlapping layers in one container */}
      <div style={{ marginTop: isMobile ? 32 : 48, display: "flex", justifyContent: "center" }}>
        <motion.div
          animate={{ scale: frameScale }}
          transition={{ duration: SCALE_MS / 1000, ease: "easeOut" }}
          style={{ width: frameWidth, maxWidth: "100%" }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              borderRadius: radius,
              overflow: "hidden",
              boxShadow: "0 24px 80px rgba(19,21,25,0.10)",
              border: "1px solid rgba(25,27,31,0.08)",
              background: "#000",
            }}
          >
            {/* Layer 1 — end image (lowest, preloaded beneath the video) */}
            <motion.img
              src={END_IMG}
              alt="עובד נהנה ממגוון הטבות וחוויות לאורך כל השנה"
              initial={{ opacity: 0 }}
              animate={{ opacity: endTarget }}
              transition={crossfade}
              style={{ ...baseMedia, borderRadius: radius, zIndex: 1 }}
            />

            {/* Layer 2 — video (always mounted for preload; no controls, no loop, muted) */}
            <motion.video
              ref={videoRef}
              src={VIDEO_SRC}
              muted
              playsInline
              preload="auto"
              onTimeUpdate={onTimeUpdate}
              onEnded={onEnded}
              initial={{ opacity: 0 }}
              animate={{ opacity: videoTarget }}
              transition={crossfade}
              style={{ ...baseMedia, borderRadius: radius, zIndex: 2 }}
            />

            {/* Layer 3 — start image (top, crossfades out) */}
            <motion.img
              src={START_IMG}
              alt="עובד שחוויית הרווחה שלו מתרכזת ברגעים בודדים בשנה"
              initial={{ opacity: 1 }}
              animate={{ opacity: startTarget }}
              transition={crossfade}
              style={{ ...baseMedia, borderRadius: radius, zIndex: 3 }}
            />

            {/* Coral light sweep — opening (left → right) */}
            {showOpeningSweep && (
              <motion.div
                initial={{ x: "-90%", opacity: 0 }}
                animate={{ x: ["-90%", "190%"], opacity: [0, 1, 0] }}
                transition={{ duration: SWEEP_MS / 1000, ease: "easeInOut", times: [0, 0.5, 1] }}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: "55%",
                  background: CORAL_SWEEP,
                  mixBlendMode: "screen",
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              />
            )}

            {/* Coral light sweep — ending (right → left) */}
            {showEndingSweep && (
              <motion.div
                initial={{ x: "190%", opacity: 0 }}
                animate={{ x: ["190%", "-90%"], opacity: [0, 1, 0] }}
                transition={{ duration: SWEEP_MS / 1000, ease: "easeInOut", times: [0, 0.5, 1] }}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: "55%",
                  background: CORAL_SWEEP,
                  mixBlendMode: "screen",
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              />
            )}
          </div>
        </motion.div>
      </div>

      {/* End state — appears below the media only after the end image reaches opacity 1 */}
      {stage === "complete" && (
        <div style={{ maxWidth: 850, margin: "40px auto 0", textAlign: "center", direction: "rtl" }}>
          <motion.h3
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0 }}
            style={{
              color: CHARCOAL,
              fontSize: isMobile ? "clamp(24px, 6vw, 30px)" : "clamp(30px, 2.4vw, 40px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            יותר רגעים. יותר ערך. יותר מחוברות.
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            style={{
              color: "#3A3C42",
              fontSize: isMobile ? "clamp(17px, 4vw, 19px)" : "clamp(18px, 1.4vw, 22px)",
              fontWeight: 400,
              lineHeight: 1.6,
              margin: "18px auto 0",
              maxWidth: 720,
            }}
          >
            בום ביי עוטפת את העובדים לאורך כל השנה - בחיסכון יומיומי, מתנות, חופשות, תרבות, וולנס ורגעים אישיים.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
            style={{ marginTop: 28, display: "flex", justifyContent: "center" }}
          >
            <button
              type="button"
              onClick={onPlatformClick}
              className="ee-btn ee-btn-end"
              style={{
                width: isMobile ? "min(100%, 340px)" : "auto",
                minWidth: 220,
                padding: isMobile ? "16px 22px" : "18px 36px",
                fontSize: isMobile ? 17 : 19,
              }}
            >
              איך בום ביי עושה את זה?
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}