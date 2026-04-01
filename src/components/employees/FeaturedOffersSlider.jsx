import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OFFERS = [
  { id: 1, cat: "אופנה", title: "Alo Yoga & Adidas", priceOld: "₪499", priceNew: "₪224", accent: "#8B6B3D", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/8ccf1ae84_87.png" },
  { id: 2, cat: "מובייל", title: "Apple iPhone 16 Pro", priceOld: "₪4,590", priceNew: "₪3,890", accent: "#555", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/67dbe888a_92.png" },
  { id: 3, cat: "חופשות", title: "מלונות פתאל ובראון", priceOld: "₪1,790", priceNew: "₪899", accent: "#FF9500", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/1b29c5bb8_-2026-03-22T162942110.png" },
  { id: 4, cat: "נסיעות", title: "Kate Hill - סט מזוודות", priceOld: "₪1,999", priceNew: "₪249", accent: "#F5C518", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/28598db7e_-2026-03-15T180501791.png" },
  { id: 5, cat: "יוקר המחיה", title: "מארז ניקיון TNX", priceOld: "₪350", priceNew: "₪149", accent: "#34C759", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/e8b8ed0b8_-2026-02-18T145540109.png" },
  { id: 6, cat: "תרבות", title: "קזבלן - הצגת השנה", priceOld: "₪350", priceNew: "₪77", accent: "#AF52DE", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3d11c2184_-2026-03-22T165538542.png" },
  { id: 7, cat: "חשמל", title: "Nespresso Inissia", priceOld: "₪833", priceNew: "₪589", accent: "#5856D6", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/db8e935e8_-2026-03-22T162955489.png" },
  { id: 8, cat: "כל בוקר", title: "260 הטבות בשנה", priceOld: "₪499", priceNew: "₪299", accent: "#FF2D55", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/82cf01fcc_87.png" },
  { id: 9, cat: "בישום", title: "Christian Dior - Sauvage", priceOld: "₪600", priceNew: "₪430", accent: "#1D1D1F", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/823674aab_-2026-02-18T150114784.png" }
];

export default function FeaturedOffersSlider() {
  const [index, setIndex] = useState(3);
  const touchStart = useRef(0);

  const go = (dir) => setIndex((p) => Math.min(Math.max(p + dir, 0), OFFERS.length - 1));

  const scrollToSurvey = () => {
    setTimeout(() => document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" }), 150);
  };

  return (
    <section
      style={{ background: "#fff", padding: "60px 0 70px", direction: "rtl", overflow: "hidden" }}
      onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const diff = touchStart.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1);
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center", padding: "0 16px" }}>
        <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 900, marginBottom: "8px", fontFamily: "var(--font-heebo)", letterSpacing: "-0.025em" }}>
          ככה נראית הטבה אמיתית
        </h2>
        <p style={{ color: "#86868B", marginBottom: "40px", fontFamily: "var(--font-heebo)" }}>
          דוגמאות חריגות לחיסכון מהשנה האחרונה
        </p>

        {/* 3D Container */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          minHeight: "clamp(360px, 55vw, 450px)", perspective: "1500px",
          position: "relative",
        }}>
          {OFFERS.map((offer, i) => {
            const offset = i - index;
            const abs = Math.abs(offset);
            if (abs > 2) return null;

            return (
              <motion.div
                key={offer.id}
                onClick={() => abs > 0 ? setIndex(i) : scrollToSurvey()}
                animate={{
                  x: offset * 210,
                  scale: abs === 0 ? 1 : 0.8,
                  rotateY: offset * -25,
                  z: abs === 0 ? 100 : -100,
                  opacity: abs === 0 ? 1 : 0.6,
                  filter: abs === 0 ? "blur(0px)" : "blur(3px)",
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute",
                  width: "clamp(200px, 28vw, 260px)",
                  height: "clamp(310px, 44vw, 400px)",
                  borderRadius: "24px",
                  backgroundImage: `url(${offer.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  cursor: "pointer",
                  boxShadow: abs === 0 ? `0 20px 60px ${offer.accent}44` : "0 10px 30px rgba(0,0,0,0.1)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  overflow: "hidden",
                }}
              >
                {/* Vignette */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)" }} />

                {/* Category tag */}
                <div style={{
                  position: "absolute", top: 14, right: 14,
                  background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)",
                  color: "#fff", padding: "4px 12px", borderRadius: "100px",
                  fontSize: "10px", fontWeight: 700, fontFamily: "var(--font-heebo)",
                }}>
                  {offer.cat}
                </div>

                {/* Bottom content */}
                <div style={{ position: "relative", zIndex: 2, padding: "18px", textAlign: "right" }}>
                  <p style={{ color: "#fff", fontWeight: 800, fontSize: "15px", marginBottom: "10px", fontFamily: "var(--font-heebo)", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
                    {offer.title}
                  </p>

                  <AnimatePresence>
                    {abs === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.3 }}
                        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                      >
                        <div style={{
                          background: "rgba(255,255,255,0.18)", backdropFilter: "blur(15px)",
                          border: "1px solid rgba(255,255,255,0.25)", borderRadius: "100px",
                          padding: "6px 16px", display: "inline-flex", gap: "10px",
                          alignSelf: "flex-start", alignItems: "center",
                        }}>
                          <span style={{ color: "rgba(255,255,255,0.5)", textDecoration: "line-through", fontSize: "12px", fontFamily: "var(--font-heebo)" }}>{offer.priceOld}</span>
                          <span style={{ color: "#007AFF", fontWeight: 900, fontSize: "18px", fontFamily: "var(--font-heebo)" }}>{offer.priceNew}</span>
                        </div>
                        <button
                          style={{
                            width: "100%", background: "#007AFF", color: "#fff",
                            border: "none", padding: "12px", borderRadius: "12px",
                            fontWeight: 700, fontSize: "14px", cursor: "pointer",
                            fontFamily: "var(--font-heebo)",
                            boxShadow: "0 4px 14px rgba(0,102,204,0.32)",
                          }}
                        >
                          אני רוצה את זה בארגון שלי ←
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: "7px", marginTop: "28px" }}>
          {OFFERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              style={{
                width: i === index ? 24 : 8, height: 8,
                background: i === index ? OFFERS[index].accent : "#E5E5E7",
                borderRadius: 4, border: "none", cursor: "pointer", padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}