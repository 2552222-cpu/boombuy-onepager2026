import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const OFFERS = [
  {
    id: "apple",
    cat: "מובייל",
    brand: "Apple",
    title: "iPhone 16 Pro — יבואן",
    priceOld: "₪4,590", priceNew: "₪3,890", saving: "₪700",
    desc: "אייפון, סמסונג ומובייל במחירי יבואן רשמיים לעובדי הארגון.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/66514fe66_-2026-02-18T150849922.png"
  },
  {
    id: "aloyoga",
    cat: "אופנה",
    brand: "Alo Yoga",
    title: "Alo Yoga — פרימיום",
    priceOld: "₪499", priceNew: "₪224", saving: "₪275",
    desc: "מותגי פרימיום במחירי יבואן בלעדיים לעובדי הארגון.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/359030b5f_87.png"
  },
  {
    id: "culture",
    cat: "תרבות",
    brand: "הבימה",
    title: "הבימה הצגת השנה",
    priceOld: "₪350", priceNew: "₪77", saving: "₪273",
    desc: "קזבלן והצגות מובילות במחירים נגישים בלעדיים.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3c42d518b_-2026-03-22T140039783.png"
  }
];

export default function FeaturedOffersSlider() {
  const [selectedId, setSelectedId] = useState(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const selectedOffer = OFFERS.find(o => o.id === selectedId);

  return (
    <section style={{ background: "#fff", padding: "80px 0", direction: "rtl", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center", padding: "0 20px" }}>
        <h2 style={{ fontSize: "clamp(28px, 5vw, 38px)", fontWeight: 900, marginBottom: "8px", color: "#1D1D1F", letterSpacing: "-0.025em" }}>ככה אנחנו מגדילים לכם את הנטו</h2>
        <p style={{ color: "#86868B", marginBottom: "48px", fontSize: "clamp(15px, 2vw, 18px)", fontWeight: 500 }}>דוגמאות להטבות אמיתיות עם חיסכון חריג לעובדים</p>

        {/* הסליידר החיצוני */}
        <div style={{ display: "flex", justifyContent: "center", gap: isMobile ? "12px" : "24px", flexWrap: "wrap" }}>
          {OFFERS.map((offer) => (
            <motion.div
              key={offer.id}
              onClick={() => setSelectedId(offer.id)}
              whileHover={!isMobile ? { y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" } : {}}
              style={{
                width: isMobile ? "calc(50% - 6px)" : "340px", 
                height: isMobile ? "220px" : "480px", 
                background: "#F5F5F7", 
                borderRadius: "32px",
                cursor: "pointer", 
                overflow: "hidden", 
                position: "relative", 
                border: "1px solid rgba(0,0,0,0.05)"
              }}
            >
              <img src={offer.img} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, left: 0, padding: isMobile ? "20px 14px 12px" : "40px 24px 24px", background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)", textAlign: "right" }}>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: isMobile ? "11px" : "12px", fontWeight: 700, margin: 0 }}>{offer.cat}</p>
                <p style={{ color: "#fff", fontSize: isMobile ? "16px" : "20px", fontWeight: 900, margin: "2px 0" }}>{offer.brand}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ה-Modal המורחב */}
      <AnimatePresence>
        {selectedId && selectedOffer && (
          <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? "0" : "20px" }}
            onClick={() => setSelectedId(null)}
          >
            {/* כפתור סגור */}
            <button 
              style={{ position: "fixed", top: isMobile ? "20px" : "30px", left: isMobile ? "20px" : "30px", background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", zIndex: 2010 }} 
              onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: isMobile ? "100%" : "92vw", 
                maxWidth: isMobile ? "480px" : "1100px", 
                height: isMobile ? "85dvh" : "85vh", 
                background: "#fff", 
                borderRadius: isMobile ? "28px 28px 0 0" : "24px",
                overflow: "hidden", 
                display: "flex", 
                flexDirection: "column", 
                boxShadow: "0 50px 100px rgba(0,0,0,0.5)"
              }}
            >
              {/* אזור התמונה */}
              <div style={{ flex: isMobile ? "0 0 60%" : "0 0 65%", background: "#F5F5F7", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: 0 }}>
                <img src={selectedOffer.img} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
              </div>

              {/* אזור התוכן */}
              <div style={{ flex: "1 1 auto", padding: isMobile ? "20px 16px" : "40px 60px", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between", direction: "rtl", overflowY: isMobile ? "auto" : "visible" }}>
                
                {/* טקסט ראשי */}
                <div style={{ textAlign: "right", marginBottom: isMobile ? "12px" : "0" }}>
                  <p style={{ fontSize: isMobile ? "12px" : "14px", fontWeight: 800, color: "#007AFF", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "var(--font-heebo)" }}>{selectedOffer.cat} | {selectedOffer.brand}</p>
                  <h3 style={{ fontSize: isMobile ? "20px" : "32px", fontWeight: 900, color: "#1D1D1F", margin: 0, fontFamily: "var(--font-heebo)", lineHeight: 1.2 }}>{selectedOffer.title}</h3>
                  <p style={{ fontSize: isMobile ? "13px" : "16px", color: "#86868B", marginTop: "8px", fontFamily: "var(--font-heebo)", lineHeight: 1.5 }}>{selectedOffer.desc}</p>
                </div>

                {/* בלוק המחירים */}
                <div style={{ display: "flex", gap: isMobile ? "8px" : "16px", alignItems: "center", justifyContent: isMobile ? "center" : "flex-end", flexWrap: isMobile ? "wrap" : "nowrap", marginBottom: isMobile ? "12px" : "0" }}>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: isMobile ? "10px" : "12px", color: "#AEAEB2", fontWeight: 700, margin: "0 0 2px 0", fontFamily: "var(--font-heebo)" }}>מחיר שוק</p>
                    <p style={{ fontSize: isMobile ? "14px" : "20px", color: "#AEAEB2", textDecoration: "line-through", fontWeight: 700, margin: 0, fontFamily: "var(--font-heebo)" }}>{selectedOffer.priceOld}</p>
                  </div>
                  <div style={{ textAlign: "center", background: "#F5F5F7", padding: isMobile ? "8px 14px" : "12px 24px", borderRadius: "20px" }}>
                    <p style={{ fontSize: isMobile ? "10px" : "12px", color: "#007AFF", fontWeight: 800, margin: "0 0 2px 0", fontFamily: "var(--font-heebo)" }}>מחיר לעובד</p>
                    <p style={{ fontSize: isMobile ? "18px" : "28px", fontWeight: 900, color: "#1D1D1F", margin: 0, fontFamily: "var(--font-heebo)" }}>{selectedOffer.priceNew}</p>
                  </div>
                  <div style={{ background: "#007AFF", color: "#fff", padding: isMobile ? "8px 14px" : "12px 24px", borderRadius: "20px", textAlign: "center", boxShadow: "0 10px 20px rgba(0,122,255,0.3)" }}>
                    <p style={{ fontSize: isMobile ? "10px" : "12px", fontWeight: 700, margin: "0 0 2px 0", fontFamily: "var(--font-heebo)" }}>החיסכון שלך</p>
                    <p style={{ fontSize: isMobile ? "18px" : "28px", fontWeight: 900, margin: 0, fontFamily: "var(--font-heebo)" }}>{selectedOffer.saving}</p>
                  </div>
                </div>

                {/* כפתור CTA */}
                <button 
                  style={{ 
                    width: isMobile ? "100%" : "400px", 
                    margin: isMobile ? "4px auto 0" : "20px auto 0", 
                    background: "#007AFF", 
                    color: "#fff", 
                    border: "none", 
                    padding: isMobile ? "12px" : "18px", 
                    borderRadius: "20px", 
                    fontSize: isMobile ? "14px" : "18px", 
                    fontWeight: 900, 
                    cursor: "pointer",
                    boxShadow: "0 15px 30px rgba(0,122,255,0.4)", 
                    transition: "0.2s",
                    fontFamily: "var(--font-heebo)",
                    letterSpacing: "-0.01em"
                  }}
                  onClick={() => {
                    setSelectedId(null);
                    setTimeout(() => document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" }), 200);
                  }}
                >
                  אני רוצה את זה בארגון שלי ←
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}