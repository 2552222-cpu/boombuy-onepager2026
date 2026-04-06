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
    <section style={{ background: "#fff", padding: "80px 0", direction: "rtl" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center", padding: "0 20px" }}>
        <h2 style={{ fontSize: "38px", fontWeight: 900, marginBottom: "8px", color: "#1D1D1F", fontFamily: "var(--font-heebo)" }}>ככה אנחנו מגדילים לכם את הנטו</h2>
        <p style={{ color: "#86868B", marginBottom: "48px", fontSize: "18px", fontWeight: 500 }}>דוגמאות להטבות אמיתיות עם חיסכון חריג לעובדים</p>

        {/* גריד הכרטיסיות החיצוניות */}
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
          {OFFERS.map((offer) => (
            <motion.div
              key={offer.id}
              onClick={() => setSelectedId(offer.id)}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              style={{
                width: isMobile ? "100%" : "340px", 
                height: "480px", 
                background: "#F5F5F7", 
                borderRadius: "32px",
                cursor: "pointer", 
                overflow: "hidden", 
                position: "relative"
              }}
            >
              <img src={offer.img} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, left: 0, padding: "40px 24px 24px", background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)", textAlign: "right" }}>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px", fontWeight: 700, margin: 0 }}>{offer.cat}</p>
                <p style={{ color: "#fff", fontSize: "20px", fontWeight: 900, margin: "4px 0" }}>{offer.brand}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && selectedOffer && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", backdropFilter: "blur(20px)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={() => setSelectedId(null)}
          >
            <button 
              style={{ position: "fixed", top: "30px", left: "30px", background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }} 
              onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: isMobile ? "100%" : "1100px", 
                height: isMobile ? "100dvh" : "85vh", 
                background: "#fff", 
                borderRadius: isMobile ? "0" : "32px",
                overflow: "hidden", 
                display: "flex", 
                flexDirection: "column"
              }}
            >
              {/* Image Area - 65% height */}
              <div style={{ flex: "0 0 65%", background: "#F5F5F7", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
                <img src={selectedOffer.img} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
              </div>

              {/* Info Area - 35% height */}
              <div style={{ flex: "1 1 auto", padding: isMobile ? "30px 20px" : "40px 60px", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", direction: "rtl" }}>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "14px", fontWeight: 800, color: "#007AFF", marginBottom: "4px" }}>{selectedOffer.cat} | {selectedOffer.brand}</p>
                    <h3 style={{ fontSize: isMobile ? "24px" : "32px", fontWeight: 900, color: "#1D1D1F", margin: 0 }}>{selectedOffer.title}</h3>
                  </div>

                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: "11px", color: "#AEAEB2", fontWeight: 700 }}>מחיר שוק</p>
                      <p style={{ fontSize: "18px", color: "#AEAEB2", textDecoration: "line-through", fontWeight: 700 }}>{selectedOffer.priceOld}</p>
                    </div>
                    <div style={{ textAlign: "center", background: "#F5F5F7", padding: "10px 20px", borderRadius: "16px" }}>
                      <p style={{ fontSize: "11px", color: "#007AFF", fontWeight: 800 }}>מחיר לעובד</p>
                      <p style={{ fontSize: "24px", fontWeight: 900, color: "#1D1D1F" }}>{selectedOffer.priceNew}</p>
                    </div>
                    <div style={{ background: "#007AFF", color: "#fff", padding: "10px 20px", borderRadius: "16px", textAlign: "center" }}>
                      <p style={{ fontSize: "11px", fontWeight: 700 }}>החיסכון שלך</p>
                      <p style={{ fontSize: "24px", fontWeight: 900 }}>{selectedOffer.saving}</p>
                    </div>
                  </div>
                </div>

                <button 
                  style={{ 
                    width: isMobile ? "100%" : "400px", margin: "20px auto 0", background: "#007AFF", color: "#fff", 
                    border: "none", padding: "18px", borderRadius: "20px", fontSize: "18px", fontWeight: 900, cursor: "pointer",
                    boxShadow: "0 10px 30px rgba(0,122,255,0.3)"
                  }}
                  onClick={() => setSelectedId(null)}
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