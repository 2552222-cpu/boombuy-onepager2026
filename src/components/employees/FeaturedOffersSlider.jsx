import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

const OFFERS = [
  { id: "alo", cat: "אופנה", title: "Alo Yoga & Adidas", priceOld: "₪499", priceNew: "₪224", accent: "#C8A96E", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/8ccf1ae84_87.png" },
  { id: "apple", cat: "אלקטרוניקה", title: "Apple iPhone 16 Pro", priceOld: "₪4,590", priceNew: "₪3,890", accent: "#A0A0A0", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/67dbe888a_92.png" },
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

  const go = (dir) => setIndex((p) => (p + dir + OFFERS.length) % OFFERS.length);
  const selectedOffer = OFFERS.find((o) => o.id === selectedId);

  const scrollToSurvey = () => {
    setSelectedId(null);
    setTimeout(() => document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" }), 300);
  };

  return (
    <section
      style={{ background: "#fff", padding: "100px 0", direction: "rtl", overflow: "hidden" }}
      onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const diff = touchStart.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1);
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center", padding: "0 16px" }}>
        <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, marginBottom: "12px", color: "#1D1D1F", fontFamily: "var(--font-heebo)", letterSpacing: "-0.025em" }}>
          ככה נראית הטבה אמיתית
        </h2>
        <p style={{ color: "#86868B", marginBottom: "60px", fontFamily: "var(--font-heebo)" }}>
          לחצו על כרטיסייה לפרטים ולמחיר המלא
        </p>

        {/* 3D Track */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "clamp(380px, 55vw, 480px)", perspective: "1500px", position: "relative" }}>
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
                  scale: abs === 0 ? 1.12 : 0.85,
                  rotateY: offset * -28,
                  z: abs === 0 ? 150 : -100,
                  filter: abs === 0 ? "none" : "blur(5px) brightness(0.8)",
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute",
                  width: "clamp(200px, 28vw, 270px)",
                  height: "clamp(300px, 42vw, 400px)",
                  borderRadius: "32px",
                  backgroundImage: `url(${offer.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  cursor: "pointer",
                  boxShadow: abs === 0 ? `0 40px 100px ${offer.accent}44` : "0 10px 30px rgba(0,0,0,0.05)",
                  border: abs === 0 ? `2px solid ${offer.accent}` : "1px solid rgba(0,0,0,0.05)",
                  zIndex: 10 - abs,
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", color: "#fff", padding: "4px 14px", borderRadius: "100px", fontSize: "11px", fontWeight: 700, zIndex: 5, fontFamily: "var(--font-heebo)" }}>
                  {offer.cat}
                </div>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)", zIndex: 2 }} />
                <div style={{ position: "absolute", bottom: 20, width: "100%", textAlign: "center", color: "#fff", fontWeight: 800, fontSize: "16px", zIndex: 3, fontFamily: "var(--font-heebo)", padding: "0 16px" }}>
                  {offer.title}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "50px" }}>
          {OFFERS.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} style={{ width: i === index ? 32 : 8, height: 4, background: i === index ? "#0066CC" : "#E5E5E7", borderRadius: 10, border: "none", cursor: "pointer", padding: 0, transition: "all 0.4s ease" }} />
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
            style={{ position: "fixed", inset: 0, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(40px)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{ width: "100%", maxWidth: 440, maxHeight: "90vh", background: "#fff", borderRadius: 40, boxShadow: "0 60px 180px rgba(0,0,0,0.12)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}
            >
              <button onClick={() => setSelectedId(null)} style={{ position: "absolute", top: 20, left: 20, background: "#f2f2f7", border: "none", width: 40, height: 40, borderRadius: "50%", cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={20} />
              </button>

              {/* Image — fully contained, zero cutoff */}
              <div style={{ flex: "1 1 auto", padding: 40, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", minHeight: 200 }}>
                <img src={selectedOffer.img} alt={selectedOffer.title} style={{ maxWidth: "100%", maxHeight: 280, objectFit: "contain" }} />
              </div>

              {/* Info — fully off-image */}
              <div style={{ padding: "24px 28px 32px", background: "#fff", textAlign: "right", direction: "rtl", flexShrink: 0 }}>
                <div style={{ color: "#86868B", fontWeight: 700, fontSize: 12, marginBottom: 8, textTransform: "uppercase", fontFamily: "var(--font-heebo)" }}>
                  {selectedOffer.cat}
                </div>
                <h3 style={{ fontSize: "clamp(22px, 5vw, 28px)", fontWeight: 900, color: "#1D1D1F", marginBottom: 20, fontFamily: "var(--font-heebo)", letterSpacing: "-0.02em" }}>
                  {selectedOffer.title}
                </h3>

                <div style={{ background: "#F5F5F7", borderRadius: "100px", padding: "12px 28px", display: "inline-flex", gap: 18, alignItems: "center", marginBottom: 24 }}>
                  <span style={{ fontSize: 15, color: "#86868B", textDecoration: "line-through", fontFamily: "var(--font-heebo)" }}>{selectedOffer.priceOld}</span>
                  <span style={{ fontSize: 26, fontWeight: 900, color: "#0066CC", fontFamily: "var(--font-heebo)" }}>{selectedOffer.priceNew}</span>
                </div>

                <button
                  onClick={scrollToSurvey}
                  style={{ width: "100%", background: "#0066CC", color: "#fff", border: "none", padding: 20, borderRadius: 20, fontWeight: 800, fontSize: 18, cursor: "pointer", boxShadow: "0 10px 30px rgba(0,102,204,0.3)", fontFamily: "var(--font-heebo)", display: "block" }}
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