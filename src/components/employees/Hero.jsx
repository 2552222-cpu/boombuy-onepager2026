import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const HERO_DATA = {
  trustBadge: "מעל 250,000 עובדים כבר מקבלים יותר",
  headline: "הנטו שלך שווה יותר ממה שאתה חושב",
  subheadline: "אייפון במחיר יבואן · תרבות · חופשות והטבות יומיומיות. הכל כבר כלול בתקציב שהארגון ממילא משלם. פשוט מקבלים יותר.",
  primaryCTA: "אני רוצה לראות איך זה נראה ←",
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

  const scrollToSurvey = () => {
    document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero-section" style={{ background: "#fff", direction: "rtl", overflow: "visible", padding: "0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "20px 20px 80px" : "80px 20px 100px" }}>

        {/* Trust Badge */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: isMobile ? "40px" : "60px" }}>
          <div style={{ background: "#F5F5F7", padding: "10px 20px", borderRadius: "100px", fontSize: "14px", fontWeight: 700, color: "#1D1D1F", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
            👥 {HERO_DATA.trustBadge}
          </div>
        </div>

        {/* On mobile: column (text first, iPhone second). On desktop: row-reverse */}
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row-reverse", alignItems: "center", gap: isMobile ? "40px" : "60px", flexWrap: "wrap" }}>

          {/* Text Section — first in DOM → shows first on mobile */}
          <div style={{ flex: "1.2", minWidth: "320px", textAlign: isMobile ? "center" : "right" }}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontSize: "clamp(38px, 6vw, 76px)", fontWeight: 900, lineHeight: 1.05, color: "#1D1D1F", margin: 0, letterSpacing: "-0.04em", fontFamily: "var(--font-heebo)" }}
            >
              {HERO_DATA.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ fontSize: "clamp(18px, 2.5vw, 22px)", color: "#424245", margin: isMobile ? "24px auto 0" : "24px 0 0", maxWidth: isMobile ? "100%" : "580px", lineHeight: 1.5, fontWeight: 500 }}
            >
              {HERO_DATA.subheadline}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ marginTop: "44px" }}>
              <motion.button
                onClick={scrollToSurvey}
                animate={{ boxShadow: ["0 15px 35px rgba(45,99,208,0.25)", "0 15px 45px rgba(45,99,208,0.5)", "0 15px 35px rgba(45,99,208,0.25)"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: "#2D63D0", color: "#fff", border: "none", padding: "20px 40px", borderRadius: "18px", fontSize: "18px", fontWeight: 800, cursor: "pointer", width: isMobile ? "100%" : "auto" }}
              >
                {HERO_DATA.primaryCTA}
              </motion.button>
            </motion.div>

            <p style={{ marginTop: "20px", fontSize: "14px", color: "#86868B", fontWeight: 600 }}>3 שאלות · 15 שניות · בלי הרשמה</p>
          </div>

          {/* iPhone Section — second in DOM → shows below text on mobile */}
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
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: "100%", maxWidth: "416px", height: "auto", objectFit: "contain", display: "block", position: "relative", zIndex: 1 }}
              />
            </div>

            {/* Price Cubes */}
            <div style={{ display: "flex", gap: "10px", marginTop: "28px", width: "100%", maxWidth: "380px" }}>
              {/* Market Price */}
              <div style={{ flex: 1, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: "20px", padding: "14px 8px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#86868B", marginBottom: "4px" }}>מחיר שוק</p>
                <p dir="ltr" style={{ fontSize: "18px", fontWeight: 900, color: "#86868B", textDecoration: "line-through" }}>4,590₪</p>
              </div>
              {/* Employee Price */}
              <div style={{ flex: 1, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: "20px", padding: "14px 8px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#0055CC", marginBottom: "4px" }}>מחיר לעובד</p>
                <p dir="ltr" style={{ fontSize: "22px", fontWeight: 900, color: "#0055CC" }}>3,890₪</p>
              </div>
              {/* Savings */}
              <motion.div
                animate={{ boxShadow: ["0 4px 20px rgba(52,199,89,0)", "0 4px 24px rgba(52,199,89,0.35)", "0 4px 20px rgba(52,199,89,0)"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                style={{ flex: 1, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: "20px", padding: "14px 8px", textAlign: "center" }}
              >
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#86868B", marginBottom: "4px" }}>החיסכון שלך</p>
                <div style={{ background: "rgba(52,199,89,0.15)", borderRadius: "12px", padding: "2px 6px", display: "inline-block" }}>
                  <p dir="ltr" style={{ fontSize: "18px", fontWeight: 900, color: "#1A7A43" }}>700₪</p>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}