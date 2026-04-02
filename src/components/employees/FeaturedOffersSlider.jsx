import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

// 9 הטבות מדויקות
const OFFERS = [
  { id: "alo", cat: "אופנה", title: "Alo Yoga & Adidas", priceOld: "₪499", priceNew: "₪224", accent: "#C8A96E", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/8ccf1ae84_87.png" },
  { id: "apple", cat: "מובייל", title: "Apple iPhone 16 Pro", priceOld: "₪4,590", priceNew: "₪3,890", accent: "#A0A0A0", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/67dbe888a_92.png" },
  { id: "vacation", cat: "חופשות", title: "מלונות בראון ונופש יוקרה", priceOld: "₪1,790", priceNew: "₪899", accent: "#FF9500", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/1b29c5bb8_-2026-03-22T162942110.png" },
  { id: "luggage", cat: "נסיעות", title: "Kate Hill — סט מזוודות", priceOld: "₪1,999", priceNew: "₪249", accent: "#F5C518", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/28598db7e_-2026-03-15T180501791.png" },
  { id: "super", cat: "יוקר המחיה", title: "סופר ובית (TNX)", priceOld: "₪350", priceNew: "₪149", accent: "#34C759", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/e8b8ed0b8_-2026-02-18T145540109.png" },
  { id: "culture", cat: "תרבות", title: "קזבלן — הצגת השנה", priceOld: "₪350", priceNew: "₪77", accent: "#AF52DE", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7271e7a2c_-2026-01-21T190449103.png" },
  { id: "nespresso", cat: "חשמל", title: "Nespresso Inissia", priceOld: "₪833", priceNew: "₪589", accent: "#5856D6", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/db8e935e8_-2026-03-22T162955489.png" },
  { id: "daily", cat: "כל בוקר", title: "260 הטבות בשנה", priceOld: "₪499", priceNew: "₪299", accent: "#FF2D55", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/82cf01fcc_87.png" },
  { id: "dior", cat: "בישום", title: "Christian Dior — Sauvage", priceOld: "₪600", priceNew: "₪430", accent: "#1D1D1F", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/823674aab_-2026-02-18T150114784.png" }
];

export default function FeaturedOffersSlider() {
  const [selectedId, setSelectedId] = useState(null);
  const [index, setIndex] = useState(3); // Kate Hill כמרכז
  const touchStart = useRef(0);

  const go = (dir) => setIndex((p) => (p + dir + OFFERS.length) % OFFERS.length);

  return (
    <section style={{ background: "#fff", padding: "80px 0", direction: "rtl", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "36px", fontWeight: 900, marginBottom: "12px", fontFamily: "var(--font-heebo)", color: "#1D1D1F" }}>ככה נראית הטבה אמיתית</h2>
        <p style={{ color: "#86868B", marginBottom: "48px", fontFamily: "var(--font-heebo)" }}>לחצו על כרטיסייה לפרטים מלאים</p>

        {/* 3D Container - Pokemon Logic */}
        <div 
          onTouchStart={(e) => touchStart.current = e.touches[0].clientX}
          onTouchEnd={(e) => {
            const diff = touchStart.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1);
          }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "480px", perspective: "1500px", position: "relative" }}
        >
          {OFFERS.map((offer, i) => {
            const offset = i - index;
            const absOffset = Math.abs(offset);
            if (absOffset > 4) return null;

            return (
              <motion.div
                key={offer.id}
                layoutId={offer.id}
                onClick={() => i === index ? setSelectedId(offer.id) : setIndex(i)}
                animate={{
                  x: offset * 250,
                  scale: absOffset === 0 ? 1.15 : 0.85,
                  rotateY: offset * -28,
                  z: absOffset === 0 ? 150 : -100,
                  filter: absOffset === 0 ? "none" : "blur(4px) brightness(0.8)",
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute", width: "270px", height: "400px", borderRadius: "32px",
                  backgroundImage: `url(${offer.img})`, backgroundSize: "cover", backgroundPosition: "center",
                  cursor: "pointer", 
                  boxShadow: absOffset === 0 ? `0 40px 100px ${offer.accent}33` : "0 10px 30px rgba(0,0,0,0.05)",
                  border: absOffset === 0 ? `2px solid ${offer.accent}` : "1px solid rgba(0,0,0,0.05)",
                  zIndex: 10 - absOffset, overflow: "hidden"
                }}
              >
                <div style={tagStyle}>{offer.cat}</div>
                <div style={titleInCardStyle}>{offer.title}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "40px" }}>
          {OFFERS.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} style={{ width: i === index ? 32 : 8, height: 4, background: i === index ? "#0066CC" : "#E5E5E7", borderRadius: 10, transition: "0.3s", border: "none", cursor: "pointer", padding: 0 }} />
          ))}
        </div>
      </div>

      {/* Expanded Modal - Zero Cutoff Architecture */}
      <AnimatePresence>
        {selectedId && (
          <div style={modalOverlayStyle}>
            <motion.div layoutId={selectedId} style={modalContainerStyle}>
              <button onClick={() => setSelectedId(null)} style={closeBtnStyle}><X size={22}/></button>
              
              <div style={modalContentStack}>
                <div style={imageWrapper}>
                  <img src={OFFERS.find(o => o.id === selectedId).img} style={imgStyle} alt="Product" />
                </div>

                <div style={modalTextPane}>
                  <div style={modalTagStyle}>{OFFERS.find(o => o.id === selectedId).cat}</div>
                  <h3 style={modalTitle}>{OFFERS.find(o => o.id === selectedId).title}</h3>
                  <p style={modalDesc}>
                    {selectedId === "super" 
                      ? "הוזלה אמיתית על מוצרי צריכה (ניקיון, קפה) ובנוסף עד 8% הנחה קבועה בסופרים המוזלים." 
                      : "מחירי יבואן ישירים ללא פערי תיווך, בלעדי לעובדי הארגון שלכם."}
                  </p>
                  
                  <div style={glassContainer}>
                    <div style={pricePill}>
                      <span style={oldPrice}>{OFFERS.find(o => o.id === selectedId).priceOld}</span>
                      <span style={newPrice}>{OFFERS.find(o => o.id === selectedId).priceNew}</span>
                    </div>
                  </div>

                  <button style={finalCta} onClick={() => document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" })}>
                    אני רוצה את זה בארגון שלי ←
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Visual Definitions
const tagStyle = { position: "absolute", top: "16px", right: "16px", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", color: "#fff", padding: "4px 12px", borderRadius: "100px", fontSize: "11px", fontWeight: 700, zIndex: 5 };
const titleInCardStyle = { position: "absolute", bottom: "20px", width: "100%", textAlign: "center", color: "#fff", fontWeight: 800, fontSize: "15px", textShadow: "0 2px 8px rgba(0,0,0,0.5)" };

const modalOverlayStyle = { position: "fixed", inset: 0, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(40px)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" };
const modalContainerStyle = { width: "100%", maxWidth: "450px", height: "85vh", background: "#fff", borderRadius: "40px", boxShadow: "0 50px 150px rgba(0,0,0,0.12)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" };
const closeBtnStyle = { position: "absolute", top: "20px", left: "20px", background: "#f2f2f7", border: "none", width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer", zIndex: 2010, display: "flex", alignItems: "center", justifyContent: "center" };

const modalContentStack = { flex: 1, display: "flex", flexDirection: "column" };
const imageWrapper = { flex: 2, padding: "40px", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" };
const imgStyle = { maxWidth: "100%", maxHeight: "100%", objectFit: "contain" };

const modalTextPane = { flex: 1.2, padding: "30px", background: "#fff", textAlign: "right", display: "flex", flexDirection: "column", justifyContent: "flex-end" };
const modalTagStyle = { color: "#86868B", fontWeight: 700, fontSize: "12px", marginBottom: "8px", textTransform: "uppercase" };
const modalTitle = { fontSize: "28px", fontWeight: 900, color: "#1D1D1F", marginBottom: "12px", fontFamily: "var(--font-heebo)" };
const modalDesc = { fontSize: "15px", color: "#6e6e73", lineHeight: 1.5, marginBottom: "20px", fontFamily: "var(--font-heebo)" };

const glassContainer = { marginBottom: "24px" };
const pricePill = { background: "#F5F5F7", borderRadius: "100px", padding: "12px 28px", display: "inline-flex", gap: "20px", alignItems: "center" };
const oldPrice = { fontSize: "15px", color: "#86868B", textDecoration: "line-through" };
const newPrice = { fontSize: "26px", fontWeight: 900, color: "#0066CC" };

const finalCta = { width: "100%", background: "#0066CC", color: "#fff", border: "none", padding: "20px", borderRadius: "18px", fontWeight: 800, fontSize: "18px", cursor: "pointer", boxShadow: "0 10px 30px rgba(0,102,204,0.3)", fontFamily: "var(--font-heebo)" };