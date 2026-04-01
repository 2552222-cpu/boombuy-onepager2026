import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

const OFFERS = [
  { id: "alo", cat: "אופנה", title: "Alo Yoga & Adidas", priceOld: "₪499", priceNew: "₪224", accent: "#8B6B3D", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/8ccf1ae84_87.png" },
  { id: "apple", cat: "אלקטרוניקה", title: "Apple iPhone 16 Pro", priceOld: "₪4,590", priceNew: "₪3,890", accent: "#555", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/67dbe888a_92.png" },
  { id: "vacation", cat: "חופשות", title: "מלונות פתאל ובראון", priceOld: "₪1,790", priceNew: "₪899", accent: "#FF9500", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/28596a618_-2026-03-22T133529822.png" },
  { id: "luggage", cat: "נסיעות", title: "Kate Hill - סט מזוודות", priceOld: "₪1,999", priceNew: "₪249", accent: "#F5C518", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/28598db7e_-2026-03-15T180501791.png" },
  { id: "cleaning", cat: "יוקר המחיה", title: "מארז ניקיון TNX + 8% בסופר", priceOld: "₪350", priceNew: "₪149", accent: "#34C759", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/e8b8ed0b8_-2026-02-18T145540109.png" },
  { id: "culture", cat: "תרבות", title: "קזבלן - הצגת השנה", priceOld: "₪350", priceNew: "₪77", accent: "#AF52DE", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/5bc85c1ec_-2026-03-22T140039783.png" },
  { id: "nespresso", cat: "חשמל", title: "Nespresso Inissia", priceOld: "₪833", priceNew: "₪589", accent: "#5856D6", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7e803d677_-2026-02-18T150849922.png" },
  { id: "daily", cat: "כל בוקר", title: "260 הטבות בשנה", priceOld: "₪499", priceNew: "₪299", accent: "#FF2D55", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/8d94e0c71_-2026-02-18T150744909.png" },
  { id: "dior", cat: "בישום", title: "Christian Dior - Sauvage", priceOld: "₪600", priceNew: "₪430", accent: "#4A4A8A", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/823674aab_-2026-02-18T150114784.png" }
];

export default function FeaturedOffersSlider() {
  const [selectedId, setSelectedId] = useState(null);
  const [index, setIndex] = useState(3); // Kate Hill כברירת מחדל
  const touchStartX = useRef(null);

  const next = () => setIndex((p) => (p + 1) % OFFERS.length);
  const prev = () => setIndex((p) => (p - 1 + OFFERS.length) % OFFERS.length);

  const selectedOffer = OFFERS.find((o) => o.id === selectedId);

  const scrollToSurvey = () => {
    setSelectedId(null);
    setTimeout(() => document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" }), 200);
  };

  return (
    <section
      style={{ background: "#fff", padding: "80px 0", direction: "rtl", overflow: "hidden", position: "relative" }}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
        touchStartX.current = null;
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center", padding: "0 16px" }}>
        <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 900, marginBottom: "12px", fontFamily: "var(--font-heebo)", letterSpacing: "-0.025em" }}>
          ככה נראית הטבה אמיתית
        </h2>
        <p style={{ color: "#86868B", marginBottom: "48px", fontFamily: "var(--font-heebo)" }}>
          דוגמאות חריגות לחיסכון מהשנה האחרונה
        </p>

        {/* Slider Track */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(8px, 2vw, 20px)" }}>
          <button onClick={prev} style={navBtnStyle}><ChevronRight /></button>

          <div style={{ display: "flex", gap: "clamp(8px, 2vw, 15px)", alignItems: "center", perspective: "1200px" }}>
            {[-1, 0, 1].map((offset) => {
              const offer = OFFERS[(index + offset + OFFERS.length) % OFFERS.length];
              const isActive = offset === 0;
              return (
                <motion.div
                  key={`${offer.id}-${offset}`}
                  onClick={() => isActive ? setSelectedId(offer.id) : setIndex((index + offset + OFFERS.length) % OFFERS.length)}
                  animate={{
                    scale: isActive ? 1 : 0.82,
                    rotateY: offset * -18,
                    z: isActive ? 40 : -40,
                  }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    width: isActive ? "clamp(220px, 30vw, 280px)" : "clamp(150px, 22vw, 220px)",
                    height: isActive ? "clamp(300px, 45vw, 400px)" : "clamp(220px, 32vw, 320px)",
                    borderRadius: "24px",
                    backgroundImage: `url(${offer.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    cursor: "pointer",
                    position: "relative",
                    boxShadow: isActive ? `0 20px 60px ${offer.accent}44` : "0 10px 30px rgba(0,0,0,0.08)",
                    zIndex: isActive ? 10 : 1,
                    filter: isActive ? "none" : "blur(1.5px) brightness(0.7)",
                    flexShrink: 0,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)", borderRadius: "24px" }} />
                  <div style={tagStyle}>{offer.cat}</div>
                  {isActive && (
                    <div style={{ position: "absolute", bottom: "14px", left: "14px", right: "14px" }}>
                      <p style={{ color: "#fff", fontSize: "13px", fontWeight: 800, margin: "0 0 6px", fontFamily: "var(--font-heebo)", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{offer.title}</p>
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <span style={{ fontSize: "18px", fontWeight: 900, color: "#fff", fontFamily: "var(--font-heebo)" }}>{offer.priceNew}</span>
                        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", textDecoration: "line-through", fontFamily: "var(--font-heebo)" }}>{offer.priceOld}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <button onClick={next} style={navBtnStyle}><ChevronLeft /></button>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "24px" }}>
          {OFFERS.map((o, i) => (
            <button key={i} onClick={() => setIndex(i)} style={{
              width: i === index ? 24 : 7, height: 7, borderRadius: 999,
              background: i === index ? OFFERS[index].accent : "rgba(0,0,0,0.15)",
              border: "none", cursor: "pointer", padding: 0,
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: "28px" }}>
          <button
            onClick={scrollToSurvey}
            style={{
              background: "#0066CC", color: "#fff",
              fontWeight: 800, fontSize: 15,
              padding: "13px 32px", borderRadius: 12,
              border: "none", cursor: "pointer",
              boxShadow: "0 6px 20px rgba(0,102,204,0.24)",
              fontFamily: "var(--font-heebo)",
            }}
          >
            אני רוצה שהארגון שלי יצטרף
          </button>
        </div>
      </div>

      {/* Pop-out Modal */}
      <AnimatePresence>
        {selectedId && selectedOffer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(255,255,255,0.75)", backdropFilter: "blur(20px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 24 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{ width: "100%", maxWidth: "460px", height: "580px", background: "#fff", borderRadius: "32px", boxShadow: "0 30px 100px rgba(0,0,0,0.22)", position: "relative", overflow: "hidden" }}
            >
              <button onClick={() => setSelectedId(null)} style={{ position: "absolute", top: 16, left: 16, zIndex: 10, background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)", border: "none", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={17} color="#fff" />
              </button>

              {/* Full image bg */}
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: `url(${selectedOffer.img})`,
                backgroundSize: "cover", backgroundPosition: "center",
              }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }} />

              {/* Content */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px", textAlign: "right", direction: "rtl" }}>
                <span style={{ display: "inline-block", background: selectedOffer.accent, color: "#fff", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: 999, marginBottom: "10px", fontFamily: "var(--font-heebo)" }}>
                  {selectedOffer.cat}
                </span>
                <h3 style={{ fontSize: "24px", fontWeight: 900, color: "#fff", margin: "0 0 16px", fontFamily: "var(--font-heebo)", letterSpacing: "-0.02em" }}>
                  {selectedOffer.title}
                </h3>

                {/* Glass price pill */}
                <div style={{ display: "inline-flex", gap: "14px", alignItems: "center", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "100px", padding: "10px 22px", marginBottom: "20px" }}>
                  <span style={{ color: "rgba(255,255,255,0.5)", textDecoration: "line-through", fontSize: "14px", fontFamily: "var(--font-heebo)" }}>{selectedOffer.priceOld}</span>
                  <span style={{ color: "#007AFF", fontWeight: 900, fontSize: "22px", fontFamily: "var(--font-heebo)" }}>{selectedOffer.priceNew}</span>
                </div>

                <button
                  onClick={scrollToSurvey}
                  style={{ width: "100%", background: "#007AFF", color: "#fff", border: "none", padding: "16px", borderRadius: "16px", fontWeight: 800, fontSize: "16px", cursor: "pointer", boxShadow: "0 10px 30px rgba(0,102,204,0.35)", fontFamily: "var(--font-heebo)" }}
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

const navBtnStyle = { background: "#f5f5f7", border: "none", width: "46px", height: "46px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 };
const tagStyle = { position: "absolute", top: "14px", right: "14px", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", color: "#fff", padding: "4px 12px", borderRadius: "100px", fontSize: "10px", fontWeight: 700, fontFamily: "var(--font-heebo)" };