import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BEFORE_IMG = "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/f2a441019_START-FRAME2.png";
const AFTER_IMG = "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/0a0298c58_END-FRAME-CORRECTED2.png";
const VIDEO_SRC = "https://media.base44.com/videos/public/69e48538aaee477b09fc7b49/fe014e428__23.mp4";

const HEADLINE_1 = "תקציב הרווחה שלך";
const HEADLINE_2 = "יכול לתת הרבה יותר.";
const SUB_1 = "הפלטפורמה החכמה למקסום תקציבי רווחה.";
const SUB_2 = 'חשמל ואלקטרוניקה במחירי יבואן, 8% הנחה קבועה בסופר, חופשות בארץ ובחו"ל במחירי סיטונאי. בלי תוספת תקציב.';
const CTA = "בואו נדבר 15 דקות ←";

export default function HeroTransformation() {
  const [phase, setPhase] = useState("before"); // "before" | "video"
  const [introDone, setIntroDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (phase === "video" && videoRef.current) {
      const p = videoRef.current.play?.();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  }, [phase]);

  const startShow = () => setPhase("video");
  const endShow = () => setIntroDone(true);
  const scrollToDemo = () =>
    document.getElementById("demo-form-section")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <AnimatePresence>
        {!introDone && (
          <motion.div
            key="hero-intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
            style={{
              position: "fixed", inset: 0, zIndex: 100, background: "#FFFFFF",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              direction: "rtl", userSelect: "none", touchAction: "manipulation",
              padding: "20px", boxSizing: "border-box", overflow: "hidden",
              fontFamily: "var(--font-heebo)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 640 }}>
              <AnimatePresence mode="wait">
                {phase === "before" && (
                  <motion.div
                    key="before"
                    initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
                    exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.4 } }}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}
                  >
                    <img
                      src={BEFORE_IMG}
                      alt="מנהלת רווחה בעומס"
                      style={{
                        width: "100%", maxWidth: 520, borderRadius: 18,
                        boxShadow: "0 18px 50px rgba(0,0,0,0.12)", objectFit: "cover",
                        aspectRatio: "4 / 3",
                      }}
                    />
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={startShow}
                      style={{
                        marginTop: 28, width: "100%", maxWidth: 360,
                        background: "#0055CC", color: "#fff", border: "none", cursor: "pointer",
                        padding: "16px 24px", borderRadius: 980, fontSize: 16, fontWeight: 800,
                        fontFamily: "var(--font-heebo)", boxShadow: "0 8px 24px rgba(0,85,204,0.3)",
                      }}
                    >
                      תנו לי להציץ דקה ←
                    </motion.button>
                  </motion.div>
                )}

                {phase === "video" && (
                  <motion.div
                    key="video"
                    initial={{ opacity: 0, filter: "blur(8px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)", transition: { duration: 0.4 } }}
                    style={{ width: "100%", display: "flex", justifyContent: "center" }}
                  >
                    <video
                      ref={videoRef}
                      src={VIDEO_SRC}
                      autoPlay
                      muted
                      playsInline
                      onEnded={endShow}
                      onClick={endShow}
                      style={{
                        width: "100%", maxWidth: 560, borderRadius: 18,
                        boxShadow: "0 18px 50px rgba(0,0,0,0.12)",
                        background: "#000",
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={endShow}
                style={{
                  marginTop: 18, background: "none", border: "none", cursor: "pointer",
                  color: "#6E6E73", fontSize: 13, fontWeight: 500, fontFamily: "var(--font-heebo)",
                }}
              >
                דלגו והמשיכו ↓
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero — after-frame */}
      <section id="hero-section" style={{ background: "#fff", direction: "rtl", overflow: "visible", padding: "0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "20px 20px 80px" : "80px 20px 100px" }}>
          <div style={{ display: "flex", flexDirection: isMobile ? "column-reverse" : "row-reverse", alignItems: "center", gap: isMobile ? "40px" : "60px", flexWrap: "wrap" }}>

            {/* After-frame image */}
            <div style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", minWidth: "300px" }}>
              <motion.img
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                src={AFTER_IMG}
                alt="מנהלת רווחה רגועה מול מערכת BoomBuy"
                style={{ width: "100%", maxWidth: "460px", height: "auto", objectFit: "contain", display: "block", borderRadius: 16 }}
              />
            </div>

            {/* Text */}
            <div style={{ flex: "1.2", minWidth: "320px", textAlign: isMobile ? "center" : "right" }}>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: "clamp(38px, 6vw, 76px)", fontWeight: 900, lineHeight: 1.05, color: "#1D1D1F", margin: 0, letterSpacing: "-0.04em", fontFamily: "var(--font-heebo)" }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "block", color: "#1D1D1F" }}
                >{HEADLINE_1}</motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "block", color: "#0055CC" }}
                >{HEADLINE_2}</motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: "clamp(18px, 2.5vw, 22px)", color: "#424245", margin: isMobile ? "24px auto 0" : "24px 0 0", maxWidth: isMobile ? "100%" : "580px", lineHeight: 1.6, fontWeight: 500 }}
              >
                <strong>הכירו את בומביי,</strong> {SUB_1}
                <br />
                {SUB_2}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }} style={{ marginTop: "36px" }}>
                <motion.button
                  onClick={scrollToDemo}
                  animate={{ boxShadow: ["0 15px 35px rgba(45,99,208,0.25)", "0 15px 45px rgba(45,99,208,0.5)", "0 15px 35px rgba(45,99,208,0.25)"] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ background: "#2D63D0", color: "#fff", border: "none", padding: "20px 40px", borderRadius: "18px", fontSize: "18px", fontWeight: 800, cursor: "pointer", width: isMobile ? "100%" : "auto" }}
                >
                  {CTA}
                </motion.button>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}