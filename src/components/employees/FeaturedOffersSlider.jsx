import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

const OFFERS = [
  {
    id: "alo-yoga",
    cat: "אופנה",
    title: "Alo Yoga",
    priceOld: "₪499", priceNew: "₪224",
    accent: "#C8A96E",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/8ccf1ae84_87.png",
  },
  {
    id: "apple",
    cat: "אלקטרוניקה",
    title: "Apple iPhone 16 Pro",
    priceOld: "₪4,590", priceNew: "₪3,890",
    accent: "#A0A0A0",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/67dbe888a_92.png",
  },
  {
    id: "kate-hill",
    cat: "נסיעות",
    title: "Kate Hill — סט מזוודות",
    priceOld: "₪1,999", priceNew: "₪249",
    accent: "#F5C518",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/28598db7e_-2026-03-15T180501791.png",
  },
  {
    id: "tnx",
    cat: "יוקר המחיה",
    title: "TNX מארז ניקיון",
    priceOld: "₪350", priceNew: "₪149",
    accent: "#34C759",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/e8b8ed0b8_-2026-02-18T145540109.png",
  },
  {
    id: "sauvage",
    cat: "בישום",
    title: "Christian Dior Sauvage",
    priceOld: "₪600", priceNew: "₪430",
    accent: "#8888CC",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/823674aab_-2026-02-18T150114784.png",
  },
];

const DEFAULT_INDEX = 2; // Kate Hill במרכז

export default function FeaturedOffersSlider() {
  const [index, setIndex] = useState(DEFAULT_INDEX);
  const touchStartX = useRef(null);
  const active = OFFERS[index];

  const go = (dir) => setIndex((p) => Math.min(Math.max(p + dir, 0), OFFERS.length - 1));

  const scrollToSurvey = (offerId) => {
    setTimeout(() => document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" }), 150);
  };

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        direction: "rtl",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
        touchStartX.current = null;
      }}
    >
      {/* Animated dark bg with glow */}
      <motion.div
        key={`bg-${index}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 50% 40%, ${active.accent}22 0%, #07090d 70%)`,
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1, paddingTop: "52px", paddingBottom: "56px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "36px", padding: "0 20px" }}>
          <h2 style={{
            fontSize: "clamp(22px, 4vw, 34px)",
            fontWeight: 900, color: "#fff",
            letterSpacing: "-0.025em", marginBottom: 8,
            fontFamily: "var(--font-heebo)",
          }}>
            ככה נראית הטבה אמיתית
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-heebo)" }}>
            לחצו על הכרטיס לפרטים ולמחיר המלא
          </p>
        </div>

        {/* 3D Track */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          perspective: "1500px",
          minHeight: "440px",
          padding: "0 8px",
        }}>
          {OFFERS.map((offer, i) => {
            const offset = i - index;
            const abs = Math.abs(offset);
            if (abs > 2) return null;

            const isActive = abs === 0;

            return (
              <motion.div
                key={offer.id}
                onClick={() => isActive ? scrollToSurvey(offer.id) : setIndex(i)}
                animate={{
                  scale: isActive ? 1.08 : 0.82 - abs * 0.04,
                  rotateY: offset * -22,
                  z: isActive ? 80 : -60 * abs,
                  filter: isActive ? "blur(0px) brightness(1.05)" : `blur(${abs * 2}px) brightness(${0.55 - abs * 0.1})`,
                  opacity: abs > 1 ? 0.45 : 1,
                }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  flexShrink: 0,
                  width: "clamp(200px, 36vw, 280px)",
                  height: "clamp(300px, 52vw, 420px)",
                  borderRadius: "25px",
                  background: `linear-gradient(135deg, ${offer.accent}18, rgba(30,30,30,0.9))`,
                  border: isActive ? `1px solid ${offer.accent}66` : "1px solid rgba(255,255,255,0.07)",
                  boxShadow: isActive ? `0 0 70px ${offer.accent}44, 0 24px 60px rgba(0,0,0,0.6)` : "0 10px 30px rgba(0,0,0,0.4)",
                  position: "relative",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Category tag */}
                <div style={{
                  position: "absolute", top: 16, right: 16, zIndex: 3,
                  background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)",
                  padding: "4px 12px", borderRadius: "100px",
                  fontSize: "10px", color: "#fff", fontWeight: 700,
                  fontFamily: "var(--font-heebo)",
                }}>
                  {offer.cat}
                </div>

                {/* Product image */}
                <div style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "50px 20px 16px",
                }}>
                  <img
                    src={offer.img}
                    alt={offer.title}
                    draggable={false}
                    style={{
                      maxWidth: "82%", maxHeight: "220px",
                      objectFit: "contain",
                      filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))",
                    }}
                  />
                </div>

                {/* Bottom vignette */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: "55%",
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                  borderRadius: "0 0 25px 25px",
                  zIndex: 2,
                }} />

                {/* Title + active glass pill */}
                <div style={{ position: "relative", zIndex: 3, padding: "0 16px 18px" }}>
                  <p style={{
                    fontSize: "14px", fontWeight: 800, color: "#fff",
                    margin: "0 0 10px", fontFamily: "var(--font-heebo)",
                    textShadow: "0 1px 6px rgba(0,0,0,0.6)",
                  }}>
                    {offer.title}
                  </p>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.3 }}
                        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
                      >
                        {/* Price pill */}
                        <div style={{
                          display: "inline-flex", alignItems: "center", gap: "10px",
                          background: "rgba(255,255,255,0.1)",
                          backdropFilter: "blur(15px)",
                          border: "1px solid rgba(255,255,255,0.18)",
                          borderRadius: "100px", padding: "7px 16px",
                          alignSelf: "flex-start",
                        }}>
                          <span style={{ color: "rgba(255,255,255,0.45)", textDecoration: "line-through", fontSize: "13px", fontFamily: "var(--font-heebo)" }}>{offer.priceOld}</span>
                          <span style={{ color: offer.accent === "#F5C518" ? "#F5C518" : "#007AFF", fontWeight: 900, fontSize: "19px", fontFamily: "var(--font-heebo)" }}>{offer.priceNew}</span>
                        </div>

                        {/* CTA button */}
                        <button
                          style={{
                            background: "#007AFF", color: "#fff",
                            border: "none", borderRadius: "12px",
                            padding: "11px 20px", fontWeight: 700,
                            fontSize: "13px", width: "100%",
                            cursor: "pointer",
                            boxShadow: "0 4px 16px rgba(0,102,204,0.35)",
                            fontFamily: "var(--font-heebo)",
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

        {/* Arrows + dots */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", marginTop: "28px" }}>
          <button onClick={() => go(-1)} disabled={index === 0} style={{
            width: 38, height: 38, borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.06)", color: "#fff",
            cursor: index === 0 ? "default" : "pointer", opacity: index === 0 ? 0.3 : 1,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <ChevronRight size={17} />
          </button>

          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {OFFERS.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} style={{
                width: i === index ? 28 : 7, height: 7, borderRadius: 999,
                background: i === index ? active.accent : "rgba(255,255,255,0.2)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "all 0.3s ease",
              }} />
            ))}
          </div>

          <button onClick={() => go(1)} disabled={index === OFFERS.length - 1} style={{
            width: 38, height: 38, borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.06)", color: "#fff",
            cursor: index === OFFERS.length - 1 ? "default" : "pointer",
            opacity: index === OFFERS.length - 1 ? 0.3 : 1,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <ChevronLeft size={17} />
          </button>
        </div>

        {/* Global CTA */}
        <div style={{ textAlign: "center", marginTop: "28px" }}>
          <button
            onClick={() => scrollToSurvey()}
            style={{
              background: "#0066CC", color: "#fff",
              fontWeight: 800, fontSize: 15,
              padding: "13px 32px", borderRadius: 12,
              border: "none", cursor: "pointer",
              boxShadow: "0 6px 20px rgba(0,102,204,0.35)",
              fontFamily: "var(--font-heebo)",
            }}
          >
            אני רוצה שהארגון שלי יצטרף
          </button>
        </div>
      </div>
    </section>
  );
}