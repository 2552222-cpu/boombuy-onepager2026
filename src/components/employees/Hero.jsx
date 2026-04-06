import React from "react";
import { motion } from "framer-motion";

// --- HERO JSON DATA: נעול לפי image_c57a86.jpg ---
const HERO_DATA = {
  trustBadge: "מעל 250,000 עובדים כבר מקבלים יותר",
  headline: "הנטו שלך שווה יותר ממה שאתה חושב",
  subheadline: "אייפון במחיר יבואן · תרבות · חופשות והטבות יומיומיות. הכל כבר כלול בתקציב שהארגון ממילא משלם. פשוט מקבלים יותר.",
  primaryCTA: "ענו על 3 שאלות קצרות ←",
  secondaryCTA: "שתפו עם החברים",
  microCopy: "15 שניות · בלי הרשמה · סייעו לנו לסייע לכם להגדיל את הנטו כבר מהחודש הבא",
  image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/adc2ee1bb_1.png" 
};

export default function Hero() {
  return (
    <section style={{ background: "#fff", direction: "rtl", overflow: "hidden", paddingTop: "40px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* Trust Badge */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "30px" }}>
          <div style={{ background: "#F5F5F7", padding: "8px 16px", borderRadius: "100px", fontSize: "14px", fontWeight: 700, color: "#1D1D1F" }}>
             👥 {HERO_DATA.trustBadge}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "center", gap: "60px", flexWrap: "wrap-reverse" }}>
          
          {/* CONTENT SIDE */}
          <div style={{ flex: "1.2", minWidth: "320px", textAlign: "right" }}>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              style={{ fontSize: "clamp(42px, 6vw, 76px)", fontWeight: 900, lineHeight: 1.05, color: "#1D1D1F", margin: 0, letterSpacing: "-0.04em" }}
            >
              {HERO_DATA.headline}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              style={{ fontSize: "clamp(18px, 2vw, 22px)", color: "#424245", marginTop: "24px", maxWidth: "580px", lineHeight: 1.5, fontWeight: 500 }}
            >
              {HERO_DATA.subheadline}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{ marginTop: "44px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <button style={{ background: "#2D63D0", color: "#fff", border: "none", padding: "20px 40px", borderRadius: "18px", fontSize: "19px", fontWeight: 800, cursor: "pointer", boxShadow: "0 15px 35px rgba(45,99,208,0.3)" }}>
                {HERO_DATA.primaryCTA}
              </button>
              <button style={{ background: "#fff", color: "#2D63D0", border: "2px solid #E5E5E7", padding: "20px 40px", borderRadius: "18px", fontSize: "19px", fontWeight: 800, cursor: "pointer" }}>
                {HERO_DATA.secondaryCTA}
              </button>
            </motion.div>
            
            <p style={{ marginTop: "20px", fontSize: "14px", color: "#86868B", fontWeight: 600 }}>{HERO_DATA.microCopy}</p>
          </div>

          {/* IMAGE SIDE - עם אנימציית ציפה */}
          <div style={{ flex: "1", display: "flex", justifyContent: "center", minWidth: "320px", padding: "0 16px" }}>
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: "100%", maxWidth: "clamp(280px, 90vw, 500px)" }}
            >
              <div style={{ 
                background: "#F5F5F7", borderRadius: "clamp(40px, 8vw, 60px)", padding: "clamp(24px, 6vw, 40px)", 
                boxShadow: "inset 0 0 40px rgba(0,0,0,0.02), 0 30px 60px rgba(0,0,0,0.05)" 
              }}>
                <img src={HERO_DATA.image} alt="Tablet offer" style={{ width: "100%", height: "auto", objectFit: "contain", filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.1))" }} />
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 968px) {
          div[style*="flexDirection: row-reverse"] { flex-direction: column !important; text-align: center !important; }
          div[style*="textAlign: right"] { text-align: center !important; }
          div[style*="gap: 16px"] { justify-content: center !important; }
          button { width: 100% !important; }
        }
      `}</style>
    </section>
  );
}