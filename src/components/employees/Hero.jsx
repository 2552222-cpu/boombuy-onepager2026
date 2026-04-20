import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ILS from "./ILS";

const HERO_DATA = {
  headline: "ממקסמים תקציב רווחה קיים",
  headline2: "והופכים אותו לערך יומיומי לעובדים",
  subheadline: "בומביי: הפלטפורמה החכמה למקסום תקציבי רווחה קיימים. גלו איך ניתן לתת לעובדים שלכם הרבה יותר - גם ללא הגדלת התקציב הקיים.",
  primaryCTA: "לקביעת 15 דקות דמו ←",
  mobileCTA: "לקביעת 15 דקות דמו ←",
  iPhoneImg: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/66514fe66_-2026-02-18T150849922.png",
};


export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);


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


          </div>

          {/* Text Section */}
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

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }} style={{ marginTop: "36px" }}>
              <motion.button
                onClick={() => document.getElementById("demo-form-section")?.scrollIntoView({ behavior: "smooth" })}
                animate={{ boxShadow: ["0 15px 35px rgba(45,99,208,0.25)", "0 15px 45px rgba(45,99,208,0.5)", "0 15px 35px rgba(45,99,208,0.25)"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: "#2D63D0", color: "#fff", border: "none", padding: "20px 40px", borderRadius: "18px", fontSize: "18px", fontWeight: 800, cursor: "pointer", width: isMobile ? "100%" : "auto" }}
              >
                {HERO_DATA.primaryCTA}
              </motion.button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}