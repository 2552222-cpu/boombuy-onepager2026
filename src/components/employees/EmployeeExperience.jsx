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

const EASE_OPEN = [0.22, 1, 0.36, 1];
const OPEN_CROSSFADE_MS = 700;
const OPEN_HOLD_MS = 150;
const OPEN_SWEEP_MS = 750;
const OPEN_SWEEP_LEAD_MS = 80;
const END_MS = 950; // ending crossfade duration (effect kept)
const END_BEFORE = 650; // start ending transition this many ms before the video ends

// Coral light sweep — opening image -> video (subtle, blurred, left -> right)
const OPEN_SWEEP_BG =
  "linear-gradient(90deg, rgba(244,122,90,0) 0%, rgba(244,122,90,0.18) 50%, rgba(244,122,90,0) 100%)";

// Coral light sweep — video -> ending image (existing effect, kept)
const END_SWEEP_BG =
  "linear-gradient(90deg, rgba(244,122,90,0) 0%, rgba(244,122,90,0.22) 50%, rgba(244,122,90,0) 100%)";

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

export default function EmployeeExperience() {
  // idle | starting | opening | playing | ending | complete
  const [stage, setStage] = useState("idle");
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openingSweep, setOpeningSweep] = useState(false);
  const videoRef = useRef(null);
  const timers = useRef([]);
  const endedRef = useRef(false);
  const startedRef = useRef(false);
  const fired = useRef({ started: false, completed: false, platform: false });

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => () => clearTimers(), []);

  // Notify the persistent CTA that the employee video has ended (mobile bar eligibility)
  useEffect(() => {
    if (stage === "complete") {
      window.dispatchEvent(new CustomEvent("boom_employee_completed"));
    }
  }, [stage]);

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
    [START_IMG, END_IMG].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
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

  // Wait until the video has advanced past its first frame
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

  const beginOpening = async () => {
    const v = videoRef.current;
    if (v) {
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
      setStage("opening");
    }, hold);
    timers.current.push(tOpen);
    const tPlay = setTimeout(() => setStage("playing"), hold + cross);
    timers.current.push(tPlay);
    const tSweepOff = setTimeout(() => setOpeningSweep(false), hold + cross + 100);
    timers.current.push(tSweepOff);
  };

  const onStart = () => {
    if (stage !== "idle" || startedRef.current) return;
    startedRef.current = true;
    if (!fired.current.started) {
      fired.current.started = true;
      try { base44.analytics.track({ eventName: "employee_transformation_started" }); } catch (e) { /* ignore */ }
    }
    setLoading(true);
    setStage("starting");
    const t = setTimeout(beginOpening, 60);
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
    }, reducedMotion ? 300 : END_MS);
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
  const imageFull = stage === "idle" || stage === "starting";
  const startTarget = imageFull ? 1 : 0;
  const videoTarget = stage === "opening" || stage === "playing" ? 1 : 0;
  const endTarget = stage === "ending" || stage === "complete" ? 1 : 0;

  const openingIsCross = stage === "opening";
  const openingOpacity = openingIsCross ? [1, 0] : startTarget;
  const openingScale = openingIsCross ? [1, 1.008] : 1;
  const videoOpacity = openingIsCross ? [0, 1] : videoTarget;
  const openingCfg = {
    duration: (reducedMotion ? 300 : OPEN_CROSSFADE_MS) / 1000,
    ease: EASE_OPEN,
  };
  const staticCfg = { duration: 0.65, ease: "easeInOut" };

  const inTransition = stage === "opening" || stage === "ending";
  const mediaWill = inTransition ? "opacity, transform" : "auto";
  const frameScale = reducedMotion ? 1 : imageFull ? 1 : 1.015;

  const frameWidth = isMobile ? "calc(100vw - 40px)" : "min(1180px, calc(100vw - 80px))";
  const radius = isMobile ? 24 : 30;

  const btnTopText = stage === "idle" ? "לראות את השינוי" : "השדרוג מתחיל";
  const btnTopDisabled = stage !== "idle";

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
      id="employee-experience"
      dir="rtl"
      style={{
        background: BG,
        padding: isMobile ? "56px 20px 64px" : "88px 32px 96px",
        fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif",
      }}
    >
      <style>{`
        @keyframes ee-spin{to{transform:rotate(360deg)}}
        #ee-title{ scroll-margin-top:90px; }
        @media (max-width:768px){ #ee-title{ scroll-margin-top:72px; } }
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
        .ee-btn-top:disabled{ cursor:default; }
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
          id="ee-title"
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
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            {loading ? <Spinner /> : null}
            {btnTopText}
          </button>
        </div>
      </div>

      {/* Media frame — three overlapping layers in one container (no conditional render, shared alignment) */}
      <div style={{ marginTop: isMobile ? 32 : 48, display: "flex", justifyContent: "center" }}>
        <motion.div
          animate={{ scale: frameScale }}
          transition={{ duration: 0.4, ease: "easeOut" }}
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
              transform: "translateZ(0)",
            }}
          >
            {/* Layer 1 — end image (lowest, preloaded beneath the video) */}
            <motion.img
              src={END_IMG}
              alt="עובד נהנה ממגוון הטבות וחוויות לאורך כל השנה"
              initial={{ opacity: 0 }}
              animate={{ opacity: endTarget }}
              transition={staticCfg}
              style={{ ...baseMedia, borderRadius: radius, zIndex: 1, willChange: mediaWill }}
            />

            {/* Layer 2 — video (always mounted for preload; no controls, no loop, muted) */}
            <motion.video
              ref={videoRef}
              src={VIDEO_SRC}
              muted
              playsInline
              preload={isMobile ? "metadata" : "auto"}
              onTimeUpdate={onTimeUpdate}
              onEnded={onEnded}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: videoOpacity, scale: 1 }}
              transition={openingIsCross ? openingCfg : staticCfg}
              style={{ ...baseMedia, borderRadius: radius, zIndex: 2, willChange: mediaWill }}
            />

            {/* Layer 3 — start image (top, crossfades out) */}
            <motion.img
              src={START_IMG}
              alt="עובד שחוויית הרווחה שלו מתרכזת ברגעים בודדים בשנה"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: openingOpacity, scale: openingScale }}
              transition={openingIsCross ? openingCfg : staticCfg}
              style={{ ...baseMedia, borderRadius: radius, zIndex: 3, willChange: mediaWill }}
            />

            {/* Coral light sweep — opening (left -> right, blurred) */}
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

            {/* Coral light sweep — ending (right -> left, existing effect kept) */}
            {stage === "ending" && !reducedMotion && (
              <motion.div
                initial={{ x: "190%", opacity: 0 }}
                animate={{ x: ["190%", "-90%"], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 0.7, ease: "easeInOut", times: [0, 0.12, 0.85, 1] }}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: "55%",
                  background: END_SWEEP_BG,
                  mixBlendMode: "screen",
                  zIndex: 10,
                  pointerEvents: "none",
                  willChange: "transform, opacity",
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