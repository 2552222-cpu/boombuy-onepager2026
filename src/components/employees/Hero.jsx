import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ILS from "./ILS";

const HERO_DATA = {
  intro: "איך להוציא יותר מהשכר בלי לבקש העלאה",
  headline: "הנטו שלך שווה יותר",
  headline2: "ממה שאתה חושב",
  subheadline: "גלו איך לקבל הרבה יותר מהתקציב הקיים של מקום העבודה שלכם, בלי שהמעסיק יצטרך לשלם שקל יותר.",
  primaryCTA: "אני רוצה לראות איך זה נראה ←",
  mobileCTA: "גלו את ההטבות ↓",
  iPhoneImg: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/66514fe66_-2026-02-18T150849922.png",
};

const BENEFIT_CARDS = [
  { title: "אייפון במחיר יבואן", text: "הטבות בלעדיות על אייפון, סמסונג ומוצרי מוביל."},
  { title: "8% הנחה קבועה בסופר", text: "עד 8% הנחה קבועה בסופרים ומוצרי צריכה יומיומיים."},
  { title: "חופשות והופעות", text: "חופשות בארץ ובחו״ל ובילויים במחירים בלעדיים."},
  { title: "הטבה חדשה כל בוקר", text: "הטבות מתחלפת על מותגים מובילים במחיר בלעדי."},
];

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollToOffers = () => {
    document.getElementById("offers-slider")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSurvey = () => {
    document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero-section" style={{ background: "#fff", direction: "rtl", overflow: "visible", padding: "0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "20px 20px 80px" : "80px 20px 100px" }}>

        <div style={{ display: "flex", flexDirection: isMobile ? "column-reverse" : "row-reverse", alignItems: "center", gap: isMobile ? "40px" : "60px", flexWrap: "wrap" }}>

          {/* iPhone Section */}
          <div style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", minWidth: "300px" }}>
          <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.05, 0.9] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", background: "radial-gradient(ellipse at center, rgba(120,80,255,0.25) 0%, rgba(37,99,235,0.2) 40%, transparent 70%)", filter: "blur(32px)", zIndex: 0 }}
            />
            <motion.img
              src={HERO_DATA.iPhoneImg}
              alt="iPhone 16 Pro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, 0, -14, 0] }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1], times: [0, 0.4, 0.7, 1], repeat: Infinity, repeatDelay: 2, repeatType: "loop" }}
              style={{ width: "100%", maxWidth: "416px", height: "auto", objectFit: "contain", display: "block", position: "relative", zIndex: 1 }}
            />
          </div>

          {/* Benefit Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "28px", width: "100%", maxWidth: "420px" }}>
            {BENEFIT_CARDS.map((card, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(0,102,204,0.12)", borderRadius: "18px", padding: "14px 12px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                <p style={{ fontSize: "12px", fontWeight: 800, color: "#0055CC", marginBottom: "4px", lineHeight: 1.3 }}>{card.title}</p>
                <p style={{ fontSize: "11px", color: "#555", lineHeight: 1.55, margin: 0 }}>{card.text}</p>
              </div>
            ))}
          </div>
          </div>

          {/* Text Section */}
          <div style={{ flex: "1.2", minWidth: "320px", textAlign: isMobile ? "center" : "right" }}>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: "clamp(14px, 1.5vw, 16px)", fontWeight: 600, color: "#0066CC", margin: "0 0 12px", letterSpacing: "-0.01em" }}
            >
              {HERO_DATA.intro}
            </motion.p>
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
              >{HERO_DATA.headline}</motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "block", color: "#0055CC" }}
              >{HERO_DATA.headline2}</motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: "clamp(18px, 2.5vw, 22px)", color: "#424245", margin: isMobile ? "24px auto 0" : "24px 0 0", maxWidth: isMobile ? "100%" : "580px", lineHeight: 1.5, fontWeight: 500 }}
            >
              {HERO_DATA.subheadline}
            </motion.p>

            {/* NetLift Teaser — inline in Hero */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{
                marginTop: "28px",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "linear-gradient(135deg, rgba(0,30,70,0.9) 0%, rgba(0,60,140,0.85) 100%)",
                border: "1px solid rgba(74,158,255,0.3)",
                borderRadius: "16px",
                padding: "12px 20px",
                boxShadow: "0 0 20px rgba(0,102,204,0.2)",
              }}
            >
              <span style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>
                עוד רגע נבדוק יחד
              </span>
              <span style={{
                fontSize: "14px",
                fontWeight: 900,
                color: "#4A9EFF",
                letterSpacing: "-0.01em",
                textShadow: "0 0 12px rgba(74,158,255,0.5)",
              }}>
                כמה הנטו שלך יכול לגדול ↓
              </span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.32, ease: [0.22, 1, 0.36, 1] }} style={{ marginTop: "44px" }}>
              {isMobile ? (
                <button
                  onClick={scrollToOffers}
                  style={{ background: "#F5F5F7", color: "#1D1D1F", border: "1px solid rgba(0,0,0,0.12)", padding: "16px 32px", borderRadius: "18px", fontSize: "16px", fontWeight: 700, cursor: "pointer", width: "100%" }}
                >
                  {HERO_DATA.mobileCTA}
                </button>
              ) : (
                <motion.button
                  onClick={() => document.getElementById("offers-slider")?.scrollIntoView({ behavior: "smooth" })}
                  animate={{ boxShadow: ["0 15px 35px rgba(45,99,208,0.25)", "0 15px 45px rgba(45,99,208,0.5)", "0 15px 35px rgba(45,99,208,0.25)"] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ background: "#2D63D0", color: "#fff", border: "none", padding: "20px 40px", borderRadius: "18px", fontSize: "18px", fontWeight: 800, cursor: "pointer" }}
                >
                  {HERO_DATA.primaryCTA}
                </motion.button>
              )}
            </motion.div>

            <p style={{ marginTop: "20px", fontSize: "14px", color: "#86868B", fontWeight: 600 }}>3 שאלות · 15 שניות · בלי הרשמה</p>
          </div>

        </div>
      </div>
    </section>
  );
}