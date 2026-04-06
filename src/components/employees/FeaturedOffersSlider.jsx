import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const OFFERS = [
  { id: "apple", cat: "מובייל", brand: "Apple", title: "iPhone 16 Pro — יבואן", priceOld: "₪4,590", priceNew: "₪3,890", saving: "₪700", desc: "אייפון, סמסונג ומובייל במחירי יבואן רשמיים לעובדי הארגון.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/66514fe66_-2026-02-18T150849922.png" },
  { id: "aloyoga", cat: "אופנה", brand: "Alo Yoga", title: "Alo Yoga — פרימיום", priceOld: "₪499", priceNew: "₪224", saving: "₪275", desc: "מותגי פרימיום במחירי יבואן בלעדיים לעובדי הארגון.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/359030b5f_87.png" },
  { id: "culture", cat: "תרבות", brand: "הבימה", title: "הבימה הצגת השנה", priceOld: "₪350", priceNew: "₪77", saving: "₪273", desc: "קזבלן והצגות מובילות במחירים נגישים בלעדיים.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3c42d518b_-2026-03-22T140039783.png" },
  { id: "vacation", cat: "נופש", brand: "מלונות בראון", title: "בראון — חופשת פרימיום", priceOld: "₪1,790", priceNew: "₪899", saving: "₪891", desc: "מלונות בראון ונופש בארץ ובחו״ל במחיר בלעדי.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7cc501b0f_-2026-03-22T133529822.png" },
  { id: "travel", cat: "נסיעות", brand: "Kate Hill", title: "סט 3 מזוודות קשיחות", priceOld: "₪1,999", priceNew: "₪249", saving: "₪1,750", desc: "מזוודות פרימיום Kate Hill במחיר חסר תקדים.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/a70910476_-2026-02-18T150035815.png" },
  { id: "super", cat: "יוקר המחיה", brand: "TNX", title: "סופר ובית — TNX", priceOld: "₪350", priceNew: "₪149", saving: "₪201", desc: "מוצרי צריכה וטואלטיקה בהוזלה אמיתית לעובדים.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/e8b8ed0b8_-2026-02-18T145540109.png" },
  { id: "electric", cat: "חשמל", brand: "Nespresso", title: "מכונת נספרסו — יבואן", priceOld: "₪833", priceNew: "₪589", saving: "₪244", desc: "נספרסו, דייסון ומוצרי חשמל במחירי יבואן.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/39fcbe2f7_-2026-02-18T150129609.png" },
  { id: "morning", cat: "כל בוקר", brand: "BoomBuy", title: "260 הטבות חדשות", priceOld: "₪499", priceNew: "₪299", saving: "₪200", desc: "הטבות משתנות ישירות לוואטסאפ בכל בוקר.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/b7485969d_-2026-02-18T150744909.png" },
  { id: "perfume", cat: "בישום", brand: "Dior", title: "Dior Sauvage — יבואן", priceOld: "₪600", priceNew: "₪430", saving: "₪110", desc: "בשמי יוקרה של המותגים המובילים במחירי יבואן.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/823674aab_-2026-02-18T150114784.png" }
];

export default function FeaturedOffersSlider() {
  const [selectedId, setSelectedId] = useState(null);
  const [index, setIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const selectedOffer = OFFERS.find(o => o.id === selectedId);
  const next = () => setIndex((i) => (i + 1) % OFFERS.length);
  const prev = () => setIndex((i) => (i - 1 + OFFERS.length) % OFFERS.length);

  return (
    <section style={{ background: "#fff", padding: "60px 0", direction: "rtl", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center", padding: "0 20px" }}>
        <h2 style={{ fontSize: "38px", fontWeight: 900, marginBottom: "8px", color: "#1D1D1F" }}>ככה אנחנו מגדילים לכם את הנטו</h2>
        <p style={{ color: "#86868B", marginBottom: "48px", fontSize: "18px" }}>דוגמאות להטבות אמיתיות עם חיסכון חריג לעובדים</p>

        {/* מנוע הסליידר המקורי */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", height: "520px" }}>
          <button onClick={prev} style={{ position: "absolute", right: "10px", zIndex: 10, background: "#fff", border: "1px solid #ddd", borderRadius: "50%", padding: "10px", cursor: "pointer", display: isMobile ? "none" : "flex" }}>
            <ChevronRight size={24} />
          </button>

          <div style={{ display: "flex", gap: "24px", transition: "0.5s ease" }}>
            {OFFERS.map((offer, i) => {
              const offset = i - index;
              const isVisible = isMobile ? (i === index) : (Math.abs(offset) <= 1);
              if (!isVisible) return null;

              return (
                <motion.div
                  key={offer.id}
                  onClick={() => setSelectedId(offer.id)}
                  whileHover={{ y: -10 }}
                  style={{
                    width: isMobile ? "85vw" : "340px", height: "480px", background: "#F5F5F7", borderRadius: "32px",
                    cursor: "pointer", overflow: "hidden", position: "relative", boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
                  }}
                >
                  <img src={offer.img} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", bottom: 0, right: 0, left: 0, padding: "40px 24px 24px", background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", textAlign: "right" }}>
                    <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "12px", fontWeight: 700, margin: 0 }}>{offer.cat}</p>
                    <p style={{ color: "#fff", fontSize: "20px", fontWeight: 900, margin: "4px 0" }}>{offer.brand}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button onClick={next} style={{ position: "absolute", left: "10px", zIndex: 10, background: "#fff", border: "1px solid #ddd", borderRadius: "50%", padding: "10px", cursor: "pointer", display: isMobile ? "none" : "flex" }}>
            <ChevronLeft size={24} />
          </button>
        </div>
      </div>

      {/* ה-Modal המורחב - פתרון ה-1100px והכפתורים */}
      <AnimatePresence>
        {selectedId && selectedOffer && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", backdropFilter: "blur(20px)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={() => setSelectedId(null)}
          >
            <button style={{ position: "fixed", top: "30px", left: "30px", background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }} onClick={() => setSelectedId(null)}>
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: isMobile ? "100%" : "1100px", height: isMobile ? "100dvh" : "85vh", background: "#fff", 
                borderRadius: isMobile ? "0" : "32px", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 50px 100px rgba(0,0,0,0.5)"
              }}
            >
              {/* Image Area - Zero Clipping */}
              <div style={{ flex: "0 0 65%", background: "#F5F5F7", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
                <img src={selectedOffer.img} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
              </div>

              {/* Info Console - Precise RTL */}
              <div style={{ flex: "1 1 auto", padding: isMobile ? "30px 20px" : "40px 60px", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", direction: "rtl", textAlign: "right" }}>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 800, color: "#007AFF", marginBottom: "4px" }}>{selectedOffer.cat} | {selectedOffer.brand}</p>
                    <h3 style={{ fontSize: isMobile ? "24px" : "32px", fontWeight: 900, color: "#1D1D1F", margin: 0 }}>{selectedOffer.title}</h3>
                    <p style={{ fontSize: "16px", color: "#86868B", marginTop: "8px" }}>{selectedOffer.desc}</p>
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
                    <div style={{ background: "#007AFF", color: "#fff", padding: "10px 20px", borderRadius: "16px", textAlign: "center", boxShadow: "0 10px 30px rgba(0,122,255,0.3)" }}>
                      <p style={{ fontSize: "11px", fontWeight: 700 }}>החיסכון שלך</p>
                      <p style={{ fontSize: "24px", fontWeight: 900 }}>{selectedOffer.saving}</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button - Centered & Fixed */}
                <button style={{ 
                  width: "380px", maxWidth: "100%", margin: "20px auto 0", background: "#007AFF", color: "#fff", 
                  border: "none", padding: "18px", borderRadius: "20px", fontSize: "18px", fontWeight: 900, cursor: "pointer",
                  boxShadow: "0 10px 30px rgba(0,122,255,0.4)"
                }}>
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