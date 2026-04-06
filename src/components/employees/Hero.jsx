import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- HERO JSON DATA: מילה במילה מהתמונות שלך, כולל אדידס ---
const HERO_DATA = {
  trustBadge: "מעל 250,000 עובדים כבר מקבלים יותר",
  headline: "הנטו שלך שווה יותר ממה שאתה חושב",
  subheadline: "אייפון במחיר יבואן · תרבות · חופשות והטבות יומיומיות. הכל כבר כלול בתקציב שהארגון ממילא משלם. פשוט מקבלים יותר.",
  primaryCTA: "ענו על 3 שאלות קצרות ←",
  secondaryCTA: "שתפו עם החברים",
  microCopy: "15 שניות · בלי הרשמה · סייעו לנו לסייע לכם להגדיל את הנטו",
  bottomBar: "רוצים לצרף את הארגון? בואו נתחיל",
  tabletImg: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/66514fe66_-2026-02-18T150849922.png", // Tablet Original from user
};

// Sub-components to animate INSIDE the tablet screen
const DATA_STREAM = [
  { id: 1, label: "תרבות ופנאי", brand: "קזבלן", priceOld: "₪350", priceNew: "₪77" },
  { id: 2, label: "אופנה ומותגים", brand: "Alo Yoga", priceOld: "₪499", priceNew: "₪224" },
  { id: 3, label: "כל בוקר הטבה, אטרקציה או חוויה חדשה", brand: "Adidas Samba", priceOld: "₪499", priceNew: "₪299" }, // Adidas special text
  { id: 4, label: "מובייל", brand: "Apple", priceOld: "₪4,590", priceNew: "₪3,890" }
];

export default function Hero() {
  const [streamIndex, setStreamIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Index to cycle data inside tablet
  useEffect(() => {
    const interval = setInterval(() => {
      setStreamIndex((prevIndex) => (prevIndex + 1) % DATA_STREAM.length);
    }, 4000); // cycle data every 4 seconds
    return () => clearInterval(interval);
  }, []);

  // Mobile check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const shareToWhatsApp = () => {
    const msg = encodeURIComponent("חברים, גיליתי סטרטאפ שמסייע להגדיל את הנטו של העובדים בלי מאמץ! סייעו לנו לסייע לכם להגדיל את הנטו כבר מהחודש הבא...");
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  return (
    <section id="hero-section" style={{ background: "#fff", direction: "rtl", overflow: "visible", padding: "0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "20px 20px 80px" : "80px 20px 100px" }}>
        
        {/* Logical Item 1: Trust Badge */}
        <div id="trust-badge" style={{ display: "flex", justifyContent: "center", marginBottom: isMobile ? "40px" : "60px" }}>
          <div style={{ background: "#F5F5F7", padding: "10px 20px", borderRadius: "100px", fontSize: "14px", fontWeight: 700, color: "#1D1D1F", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
             👥 {HERO_DATA.trustBadge}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row-reverse", alignItems: "center", gap: "60px", flexWrap: "wrap", height: "auto" }}>
          
          {/* Logical Item 2: Tablet Side - With Data Stream Animation */}
          <div id="tablet-section" style={{ flex: "1", display: "flex", justifyContent: "center", minWidth: "300px", position: "relative", marginBottom: isMobile ? "50px" : "0" }}>
            <div style={{ width: "100%", maxWidth: "550px", position: "relative" }}>
              {/* Tablet Image from original assets */}
              <img src={HERO_DATA.tabletImg} alt="Device Preview" style={{ width: "100%", height: "auto", objectFit: "contain", filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.12))", position: "relative", zIndex: 1 }} />
              
              {/* DATA STREAM ANIMATION INSIDE TABLET SCREEN AREA */}
              <div style={{ position: "absolute", inset: "7% 5.5%", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", pointerEvents: "none" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={streamIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{
                      width: "85%",
                      height: "85%",
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(20px)",
                      borderRadius: "20px",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                      padding: "15px",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around"
                    }}>
                    <p style={{ fontSize: "12px", fontWeight: 700, color: "#86868B" }}>הנטו שלך שווה יותר:</p>
                    <p style={{ fontSize: "18px", fontWeight: 900, color: "#1D1D1F" }}>{DATA_STREAM[streamIndex].brand}</p>
                    <p style={{ fontSize: "11px", fontWeight: 600, color: "#2D63D0", background: "rgba(45,99,208,0.1)", padding: "2px 8px", borderRadius: "100px", alignSelf: "center" }}>
                      {DATA_STREAM[streamIndex].label}
                    </p>
                    <p style={{ fontSize: "18px", fontWeight: 900, color: "#1D1D1F" }}>
                      <span style={{ textDecoration: "line-through", color: "#AEAEB2", marginRight: "8px" }}>{DATA_STREAM[streamIndex].priceOld}</span>
                      <span style={{ color: "#2D63D0" }}>{DATA_STREAM[streamIndex].priceNew}</span>
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Logical Item 3: Main Content Side */}
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
              className="hero-btns"
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