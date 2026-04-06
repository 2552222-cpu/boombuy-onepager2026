import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// --- HERO JSON DATA ---
const HERO_DATA = {
  trustBadge: "מעל 250,000 עובדים כבר מקבלים יותר",
  headline: "הנטו שלך שווה יותר ממה שאתה חושב",
  subheadline: "אייפון במחיר יבואן · תרבות · חופשות והטבות יומיומיות. הכל כבר כלול בתקציב שהארגון ממילא משלם. פשוט מקבלים יותר.",
  primaryCTA: "ענו על 3 שאלות קצרות ←",
  secondaryCTA: "שתפו עם החברים",
  microCopy: "15 שניות · בלי הרשמה · סייעו לנו לסייע לכם להגדיל את הנטו",
  tabletImg: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/f8c7af3f9_1.png",
};

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check(); 
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const shareToWhatsApp = () => {
    const msg = encodeURIComponent("חברים, גיליתי סטרטאפ שמסייע להגדיל את הנטו של העובדים בלי מאמץ! סייעו לנו לסייע לכם להגדיל את הנטו כבר מהחודש הבא...");
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  return (
    <section id="hero-section" style={{ background: "#fff", direction: "rtl", overflow: "visible", padding: "0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "20px 20px 80px" : "80px 20px 100px" }}>
        
        {/* Trust Badge */}
        <div id="trust-badge" style={{ display: "flex", justifyContent: "center", marginBottom: isMobile ? "40px" : "60px" }}>
          <div style={{ background: "#F5F5F7", padding: "10px 20px", borderRadius: "100px", fontSize: "14px", fontWeight: 700, color: "#1D1D1F", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
             👥 {HERO_DATA.trustBadge}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row-reverse", alignItems: "center", gap: "60px", flexWrap: "wrap", height: "auto" }}>
          
          {/* Tablet Section */}
          <div id="tablet-section" style={{ flex: "1", display: "flex", justifyContent: "center", minWidth: "300px", marginBottom: isMobile ? "50px" : "0" }}>
            <img 
              src={HERO_DATA.tabletImg} 
              alt="Tablet Offer" 
              style={{ width: "100%", maxWidth: "500px", height: "auto", objectFit: "contain", filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.12))" }} 
            />
          </div>

          {/* Text Section */}
          <div id="text-section" style={{ flex: "1.2", minWidth: "320px", textAlign: isMobile ? "center" : "right" }}>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              style={{ fontSize: "clamp(38px, 6vw, 76px)", fontWeight: 900, lineHeight: 1.05, color: "#1D1D1F", margin: 0, letterSpacing: "-0.04em", fontFamily: "var(--font-heebo)" }}
            >
              {HERO_DATA.headline}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              style={{ fontSize: "clamp(18px, 2.5vw, 22px)", color: "#424245", marginTop: "24px", maxWidth: isMobile ? "100%" : "580px", margin: isMobile ? "24px auto 0" : "24px 0 0", lineHeight: 1.5, fontWeight: 500 }}
            >
              {HERO_DATA.subheadline}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{ marginTop: "44px", display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: isMobile ? "center" : "flex-start" }}
            >
              <button
                onClick={shareToWhatsApp}
                style={{ background: "#2D63D0", color: "#fff", border: "none", padding: "20px 32px", borderRadius: "18px", fontSize: "18px", fontWeight: 800, cursor: "pointer", boxShadow: "0 15px 35px rgba(45,99,208,0.3)", flex: isMobile ? "1" : "none" }}>
                {HERO_DATA.primaryCTA}
              </button>
              <button style={{ background: "#fff", color: "#2D63D0", border: "2px solid #E5E5E7", padding: "20px 32px", borderRadius: "18px", fontSize: "18px", fontWeight: 800, cursor: "pointer", flex: isMobile ? "1" : "none" }}>
                {HERO_DATA.secondaryCTA}
              </button>
            </motion.div>
            
            <p style={{ marginTop: "20px", fontSize: "14px", color: "#86868B", fontWeight: 600 }}>3 שאלות · 15 שניות · בלי הרשמה</p>
          </div>
        </div>
      </div>
    </section>
  );
}