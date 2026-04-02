import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const OFFERS = [
  {
    id: "fashion",
    cat: "אופנה",
    brand: "Alo Yoga",
    title: "אלו יוגה, אדידס ונייק במחירי סיטונאי",
    priceOld: "₪499", priceNew: "₪224",
    accent: "#C8A96E",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/39d140209_-2026-02-18T150744909.png"
  },
  {
    id: "apple",
    cat: "אלקטרוניקה",
    brand: "Apple & Samsung",
    title: "מוצרי חשמל ואלקטרוניקה במחירי יבואן ובהנחות חריגות",
    priceOld: null, priceNew: "₪3,890 ליחידה",
    accent: "#A0A0A0",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/66514fe66_-2026-02-18T150849922.png"
  },
  {
    id: "vacation",
    cat: "נופש",
    brand: "מלונות בראון",
    title: "חופשות בארץ ובחו\"ל במחירים בלעדיים — עד 50% הנחה",
    priceOld: "₪1,790", priceNew: "₪899",
    accent: "#FF9500",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7cc501b0f_-2026-03-22T133529822.png"
  },
  {
    id: "luggage",
    cat: "נסיעות",
    brand: "Kate Hill",
    title: "סט 3 מזוודות קשיחות, יבואן רשמי. הדיל הכי חזק של השנה",
    priceOld: "₪1,999", priceNew: "₪249",
    accent: "#F5C518",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/28598db7e_-2026-03-15T180501791.png"
  },
  {
    id: "super",
    cat: "יוקר המחיה",
    brand: "סופר ובית",
    title: "הוזלה אמיתית על מוצרי צריכה (ניקיון, קפה) ובנוסף עד 8% הנחה קבועה בסופרים המוזלים",
    priceOld: "₪350", priceNew: "₪149",
    accent: "#34C759",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/e8b8ed0b8_-2026-02-18T145540109.png"
  },
  {
    id: "culture",
    cat: "תרבות",
    brand: "הופעות והצגות",
    title: "קזבלן, תערוכות והצגות בארץ ובחו\"ל במחירים נגישים",
    priceOld: "₪350", priceNew: "₪77",
    accent: "#AF52DE",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3c42d518b_-2026-03-22T140039783.png"
  },
  {
    id: "nespresso",
    cat: "חשמל",
    brand: "Nespresso",
    title: "מכונות קפה ומוצרי חשמל במחירי יבואן",
    priceOld: "₪833", priceNew: "₪589",
    accent: "#5856D6",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/39fcbe2f7_-2026-02-18T150129609.png"
  },
  {
    id: "morning",
    cat: "כל בוקר",
    brand: "260 הטבות בשנה",
    title: "חוויות ומוצרי צריכה פרימיום שאתם צורכים בכל מקרה",
    priceOld: "₪499", priceNew: "₪299",
    accent: "#FF2D55",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/82cf01fcc_87.png"
  },
  {
    id: "dior",
    cat: "בישום",
    brand: "Dior Sauvage",
    title: "חנות בישום במחירי יבואן",
    priceOld: "₪600", priceNew: "₪430",
    accent: "#1D1D1F",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/823674aab_-2026-02-18T150114784.png"
  }
];

export default function FeaturedOffersSlider() {
  const [selectedId, setSelectedId] = useState(null);
  const [index, setIndex] = useState(3);
  const touchStart = useRef(0);

  const go = (dir) => setIndex((p) => (p + dir + OFFERS.length) % OFFERS.length);
  const selectedOffer = OFFERS.find(o => o.id === selectedId);

  return (
    <section style={{ background: "#FFFFFF", padding: "72px 0 80px", direction: "rtl", overflow: "hidden" }}>
      <style>{`
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 2px var(--glow-color, #A0A0A055), 0 0 28px 6px var(--glow-color, #A0A0A033), 0 32px 80px rgba(0,0,0,0.14); }
          50% { box-shadow: 0 0 0 3px var(--glow-color, #A0A0A088), 0 0 48px 14px var(--glow-color, #A0A0A055), 0 32px 80px rgba(0,0,0,0.18); }
        }
      `}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center", padding: "0 16px" }}>
        {/* Header */}
        <h2 style={{
          fontSize: "clamp(28px, 5vw, 38px)",
          fontWeight: 900,
          marginBottom: "8px",
          fontFamily: "var(--font-heebo)",
          color: "#1D1D1F",
          letterSpacing: "-0.025em",
          lineHeight: 1.1,
        }}>
          ככה נראית הטבה אמיתית
        </h2>
        <p style={{
          color: "#86868B",
          marginBottom: "52px",
          fontFamily: "var(--font-heebo)",
          fontSize: "clamp(14px, 2vw, 16px)",
          fontWeight: 400,
          lineHeight: 1.5,
        }}>
          ככה אנחנו מגדילים את נטו העובד — דוגמאות לחיסכון חריג
        </p>

        {/* Carousel */}
        <div
          onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const diff = touchStart.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "460px",
            perspective: "1400px",
            position: "relative",
          }}
        >
          {OFFERS.map((offer, i) => {
            const offset = i - index;
            const absOffset = Math.abs(offset);
            if (absOffset > 4) return null;
            const isCenter = absOffset === 0;
            return (
              <motion.div
                key={offer.id}
                layoutId={offer.id}
                onClick={() => i === index ? setSelectedId(offer.id) : setIndex(i)}
                animate={{
                  x: offset * 240,
                  scale: isCenter ? 1.12 : 0.84,
                  rotateY: offset * -28,
                  z: isCenter ? 150 : -80,
                  filter: isCenter ? "none" : "blur(3px) brightness(0.75)",
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute",
                  width: "260px",
                  height: "390px",
                  "--glow-color": offer.accent + "88",
                  background: "#f5f5f7",
                  boxShadow: isCenter
                    ? `0 0 0 2px ${offer.accent}55, 0 0 32px 8px ${offer.accent}33, 0 32px 80px rgba(0,0,0,0.14)`
                    : "0 8px 24px rgba(0,0,0,0.06)",
                  borderRadius: "28px",
                  cursor: "pointer",
                  zIndex: 10 - absOffset,
                  animation: isCenter ? "glowPulse 2.4s ease-in-out infinite" : "none",
                }}
              >
                <img
                  src={offer.img}
                  alt={offer.brand}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Card title below */}
        <div style={{ marginTop: "24px", minHeight: "44px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <p style={{
                fontSize: "13px",
                fontWeight: 700,
                color: OFFERS[index].accent,
                fontFamily: "var(--font-heebo)",
                marginBottom: "2px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}>
                {OFFERS[index].cat} · {OFFERS[index].brand}
              </p>
              <p style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#1D1D1F",
                fontFamily: "var(--font-heebo)",
                maxWidth: "340px",
                margin: "0 auto",
                lineHeight: 1.4,
              }}>
                {OFFERS[index].title}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "24px" }}>
          {OFFERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              style={{
                width: i === index ? 28 : 7,
                height: 4,
                background: i === index ? "#0066CC" : "#E5E5E7",
                borderRadius: 10,
                transition: "all 0.3s",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedId && selectedOffer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              zIndex: 2000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={selectedId}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "420px",
                background: "#fff",
                borderRadius: "36px",
                boxShadow: "0 40px 120px rgba(0,0,0,0.18)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                maxHeight: "90vh",
              }}
            >
              {/* Image area — 75% */}
              <div style={{
                flex: "0 0 62%",
                background: "#F5F5F7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "32px 32px 20px",
                position: "relative",
              }}>
                <button
                  onClick={() => setSelectedId(null)}
                  style={{
                    position: "absolute", top: "16px", left: "16px",
                    background: "rgba(0,0,0,0.07)",
                    border: "none", width: "36px", height: "36px",
                    borderRadius: "50%", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 10,
                  }}
                >
                  <X size={18} color="#1D1D1F" />
                </button>
                <img
                  src={selectedOffer.img}
                  alt={selectedOffer.brand}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>

              {/* Content area — 25% */}
              <div style={{
                flex: 1,
                padding: "20px 24px 28px",
                textAlign: "right",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                overflowY: "auto",
              }}>
                <div>
                  <p style={{
                    fontSize: "11px", fontWeight: 700, letterSpacing: "0.07em",
                    color: selectedOffer.accent, textTransform: "uppercase",
                    fontFamily: "var(--font-heebo)", marginBottom: "4px",
                  }}>
                    {selectedOffer.cat} · {selectedOffer.brand}
                  </p>
                  <h3 style={{
                    fontSize: "18px", fontWeight: 900, color: "#1D1D1F",
                    fontFamily: "var(--font-heebo)", lineHeight: 1.3, margin: 0,
                  }}>
                    {selectedOffer.title}
                  </h3>
                </div>

                {/* Glass price pill */}
                <div style={{
                  background: "rgba(245,245,247,0.85)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(0,0,0,0.07)",
                  borderRadius: "16px",
                  padding: "10px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  alignSelf: "flex-start",
                }}>
                  {selectedOffer.priceOld && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1px" }}>
                      <span style={{ fontSize: "9px", fontWeight: 700, color: "#AEAEB2", fontFamily: "var(--font-heebo)", letterSpacing: "0.04em" }}>מחיר ZAP</span>
                      <span style={{ fontSize: "14px", color: "#86868B", textDecoration: "line-through", fontFamily: "var(--font-heebo)" }}>{selectedOffer.priceOld}</span>
                    </div>
                  )}
                  {selectedOffer.priceOld && <div style={{ width: "1px", height: "32px", background: "rgba(0,0,0,0.1)" }} />}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1px" }}>
                    <span style={{ fontSize: "9px", fontWeight: 700, color: "#0066CC", fontFamily: "var(--font-heebo)", letterSpacing: "0.04em" }}>מחיר BoomBuy</span>
                    <span style={{ fontSize: "22px", fontWeight: 900, color: "#0066CC", fontFamily: "var(--font-heebo)" }}>
                      {selectedOffer.priceNew}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedId(null);
                    setTimeout(() => document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" }), 200);
                  }}
                  style={{
                    width: "100%",
                    background: "#0066CC",
                    color: "#fff",
                    border: "none",
                    padding: "15px",
                    borderRadius: "16px",
                    fontWeight: 800,
                    fontSize: "15px",
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(0,102,204,0.28)",
                    fontFamily: "var(--font-heebo)",
                    marginTop: "4px",
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