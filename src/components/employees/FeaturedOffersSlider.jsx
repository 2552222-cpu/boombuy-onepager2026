import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const OFFERS = [
  { id: "alo", cat: "אופנה", title: "Alo Yoga & Adidas", priceOld: "₪499", priceNew: "₪224", accent: "#8B6B3D", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/8ccf1ae84_87.png" },
  { id: "apple", cat: "מובייל", title: "Apple & Samsung", priceOld: "₪4,590", priceNew: "₪3,890", accent: "#555", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/67dbe888a_92.png" },
  { id: "vacation", cat: "חופשות", title: "מלונות פתאל ובראון", priceOld: "₪1,790", priceNew: "₪899", accent: "#FF9500", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/1b29c5bb8_-2026-03-22T162942110.png" },
  { id: "luggage", cat: "נסיעות", title: "Kate Hill - סט מזוודות", priceOld: "₪1,999", priceNew: "₪249", accent: "#F5C518", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/28598db7e_-2026-03-15T180501791.png" },
  { id: "cleaning", cat: "יוקר המחיה", title: "מארז TNX + 8% בסופר", priceOld: "₪350", priceNew: "₪149", accent: "#34C759", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/e8b8ed0b8_-2026-02-18T145540109.png" },
  { id: "culture", cat: "תרבות", title: "קזבלן - הצגת השנה", priceOld: "₪350", priceNew: "₪77", accent: "#AF52DE", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3d11c2184_-2026-03-22T165538542.png" },
  { id: "nespresso", cat: "חשמל", title: "Nespresso Inissia", priceOld: "₪833", priceNew: "₪589", accent: "#5856D6", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/db8e935e8_-2026-03-22T162955489.png" },
  { id: "daily", cat: "כל בוקר", title: "260 הטבות בשנה", priceOld: "₪499", priceNew: "₪299", accent: "#FF2D55", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/82cf01fcc_87.png" },
  { id: "dior", cat: "בישום", title: "Christian Dior - Sauvage", priceOld: "₪600", priceNew: "₪430", accent: "#1D1D1F", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/823674aab_-2026-02-18T150114784.png" }
];

export default function FeaturedOffersSlider() {
  const [selectedId, setSelectedId] = useState(null);
  const [index, setIndex] = useState(3);
  const touchStart = useRef(0);

  const go = (dir) => setIndex((p) => Math.min(Math.max(p + dir, 0), OFFERS.length - 1));

  const scrollToSurvey = () => {
    setSelectedId(null);
    setTimeout(() => document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" }), 300);
  };

  const selectedOffer = OFFERS.find((o) => o.id === selectedId);

  return (
    <section style={{ background: "#fff", padding: "80px 0", direction: "rtl", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center", padding: "0 16px" }}>
        <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 900, marginBottom: "12px", fontFamily: "var(--font-heebo)", letterSpacing: "-0.025em" }}>
          ככה נראית הטבה אמיתית
        </h2>
        <p style={{ color: "#86868B", marginBottom: "48px", fontFamily: "var(--font-heebo)" }}>
          דוגמאות חריגות לחיסכון מהשנה האחרונה
        </p>

        {/* 3D Track */}
        <div
          onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const diff = touchStart.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1);
          }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "500px", perspective: "1500px", position: "relative" }}
        >
          {OFFERS.map((offer, i) => {
            const offset = i - index;
            const abs = Math.abs(offset);
            if (abs > 2) return null;

            return (
              <motion.div
                key={offer.id}
                onClick={() => i === index ? setSelectedId(offer.id) : setIndex(i)}
                animate={{
                  x: offset * 260,
                  scale: abs === 0 ? 1.08 : 0.8,
                  rotateY: offset * -28,
                  z: abs === 0 ? 150 : -100,
                  filter: abs === 0 ? "blur(0px)" : `blur(${abs * 3}px) brightness(0.7)`,
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute",
                  width: "clamp(220px, 28vw, 280px)",
                  height: "clamp(340px, 44vw, 420px)",
                  borderRadius: "32px",
                  backgroundImage: `url(${offer.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  cursor: "pointer",
                  boxShadow: abs === 0 ? `0 30px 80px ${offer.accent}44` : "0 10px 30px rgba(0,0,0,0.05)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  zIndex: 10 - abs,
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: 20, right: 20, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(5px)", color: "#fff", padding: "4px 12px", borderRadius: "100px", fontSize: "11px", fontWeight: 700, zIndex: 5, fontFamily: "var(--font-heebo)" }}>
                  {offer.cat}
                </div>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%)", zIndex: 2 }} />
                <div style={{ position: "absolute", bottom: 25, width: "100%", textAlign: "center", color: "#fff", fontWeight: 800, fontSize: "17px", zIndex: 3, padding: "0 20px", fontFamily: "var(--font-heebo)" }}>
                  {offer.title}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: "7px", marginTop: "28px" }}>
          {OFFERS.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} style={{
              width: i === index ? 24 : 8, height: 8,
              background: i === index ? OFFERS[index].accent : "#E5E5E7",
              borderRadius: 4, border: "none", cursor: "pointer", padding: 0,
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {selectedId && selectedOffer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(30px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 24 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{ width: "100%", maxWidth: "480px", height: "680px", background: "#fff", borderRadius: "40px", boxShadow: "0 40px 120px rgba(0,0,0,0.2)", position: "relative", overflow: "hidden" }}
            >
              <button onClick={() => setSelectedId(null)} style={{ position: "absolute", top: 25, left: 25, background: "#fff", border: "none", width: 45, height: 45, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}>
                <X size={22} />
              </button>

              {/* Image area */}
              <div style={{ width: "100%", height: "100%", position: "relative", background: "#f9f9fb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={selectedOffer.img} alt={selectedOffer.title} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", zIndex: 1 }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)", zIndex: 2 }} />

                {/* Floating content */}
                <div style={{ position: "absolute", bottom: 40, left: 0, right: 0, padding: "0 30px", zIndex: 3, textAlign: "right", direction: "rtl" }}>
                  <h3 style={{ fontSize: "28px", fontWeight: 900, color: "#fff", marginBottom: "16px", fontFamily: "var(--font-heebo)" }}>
                    {selectedOffer.title}
                  </h3>

                  <div style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(25px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "100px", padding: "10px 24px", display: "inline-flex", gap: "15px", alignItems: "center", color: "#fff", marginBottom: "20px" }}>
                    <span style={{ fontSize: "14px", opacity: 0.6, textDecoration: "line-through", fontFamily: "var(--font-heebo)" }}>{selectedOffer.priceOld}</span>
                    <span style={{ fontSize: "24px", fontWeight: 900, color: "#007AFF", fontFamily: "var(--font-heebo)" }}>{selectedOffer.priceNew}</span>
                  </div>

                  <button onClick={scrollToSurvey} style={{ width: "100%", background: "#0066CC", color: "#fff", border: "none", padding: "18px", borderRadius: "16px", fontWeight: 800, fontSize: "18px", cursor: "pointer", boxShadow: "0 10px 30px rgba(0,102,204,0.3)", fontFamily: "var(--font-heebo)", display: "block" }}>
                    אני רוצה את זה בארגון שלי ←
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}