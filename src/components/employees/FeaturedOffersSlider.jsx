import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

const OFFERS = [
  { id: "alo", cat: "אופנה", title: "Alo Yoga", desc: "אלו יוגה, אדידס ונייק ומותגי פרימיום במחירים סיטונאיים.", priceOld: "₪499", priceNew: "₪224", accent: "#8B6B3D", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/8ccf1ae84_87.png" },
  { id: "apple", cat: "מובייל", title: "Apple iPhone 16 Pro", desc: "אייפון 16 פרו, סמסונג ומותגי פרימיום במחירי יבואן שמרגישים בנטו.", priceOld: "₪4,590", priceNew: "₪3,890", accent: "#555", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/67dbe888a_92.png" },
  { id: "kate-hill", cat: "נסיעות", title: "Kate Hill — סט מזוודות", desc: "סט 3 מזוודות קשיחות, יבואן רשמי. הדיל של השנה.", priceOld: "₪1,999", priceNew: "₪249", accent: "#F5C518", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/28598db7e_-2026-03-15T180501791.png" },
  { id: "cleaning", cat: "יוקר המחיה", title: "מארז TNX + 8% בסופר", desc: "הוזלה אמיתית על מוצרי צריכה + 8% הנחה קבועה בסופרים המוזלים.", priceOld: "₪350", priceNew: "₪149", accent: "#34C759", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/e8b8ed0b8_-2026-02-18T145540109.png" },
  { id: "sauvage", cat: "בישום", title: "Christian Dior — Sauvage", desc: "סאוואז' 100 מ\"ל ומוצרי טיפוח במחירי יבואן.", priceOld: "₪600", priceNew: "₪430", accent: "#4A4A8A", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/823674aab_-2026-02-18T150114784.png" },
  { id: "vacation", cat: "נופש וחופשות", title: "מלונות פתאל ובראון", desc: "חופשות בארץ ובחו\"ל במחירים בלעדיים (עד 50% הנחה).", priceOld: "₪1,790", priceNew: "₪899", accent: "#FF9500", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/1b29c5bb8_-2026-03-22T162942110.png" },
  { id: "nespresso", cat: "חשמל", title: "Nespresso Inissia", desc: "מכונות קפה Nespresso ומוצרי חשמל במחירי יבואן ישירים.", priceOld: "₪833", priceNew: "₪589", accent: "#5856D6", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/db8e935e8_-2026-03-22T162955489.png" },
  { id: "culture", cat: "תרבות", title: "קזבלן — הצגת השנה", desc: "קזבלן, תערוכות והצגות בארץ ובחו\"ל במחירים נגישים.", priceOld: "₪350", priceNew: "₪77", accent: "#AF52DE", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3d11c2184_-2026-03-22T165538542.png" },
  { id: "daily", cat: "כל בוקר", title: "260 הטבות בשנה", desc: "הטבה חדשה לוואטסאפ בכל יום עבודה — תמיד המחיר הנמוך בארץ.", priceOld: "₪499", priceNew: "₪299", accent: "#FF2D55", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/82cf01fcc_87.png" }
];

export default function FeaturedOffersSlider() {
  const [selectedId, setSelectedId] = useState(null);
  const [index, setIndex] = useState(2); // Kate Hill במרכז (index 2)
  const touchStart = useRef(0);

  const go = (dir) => setIndex((p) => Math.min(Math.max(p + dir, 0), OFFERS.length - 1));
  const selectedOffer = OFFERS.find((o) => o.id === selectedId);

  const scrollToSurvey = () => {
    setSelectedId(null);
    setTimeout(() => document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" }), 300);
  };

  return (
    <section
      style={{ background: "#fff", padding: "72px 0 80px", direction: "rtl", overflow: "hidden" }}
      onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const diff = touchStart.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1);
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center", padding: "0 16px" }}>
        {/* Header */}
        <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, marginBottom: "10px", fontFamily: "var(--font-heebo)", letterSpacing: "-0.025em" }}>
          ככה נראית הטבה אמיתית
        </h2>
        <p style={{ color: "#86868B", marginBottom: "44px", fontFamily: "var(--font-heebo)", fontSize: 15 }}>
          לחצו על כרטיסייה לפרטים מלאים
        </p>

        {/* Slider Row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center" }}>
          {/* Left arrow */}
          <button
            onClick={() => go(-1)} disabled={index === 0}
            style={{ flexShrink: 0, width: 44, height: 44, borderRadius: "50%", background: "#f5f5f7", border: "none", cursor: index === 0 ? "default" : "pointer", opacity: index === 0 ? 0.3 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <ChevronRight size={20} />
          </button>

          {/* 3D Track */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "clamp(340px, 52vw, 480px)", perspective: "1500px", position: "relative", overflow: "visible" }}>
            {OFFERS.map((offer, i) => {
              const offset = i - index;
              const abs = Math.abs(offset);
              if (abs > 2) return null;

              return (
                <motion.div
                  key={offer.id}
                  onClick={() => abs > 0 ? setIndex(i) : setSelectedId(offer.id)}
                  animate={{
                    x: offset * 220,
                    scale: abs === 0 ? 1.06 : abs === 1 ? 0.82 : 0.68,
                    rotateY: offset * -28,
                    z: abs === 0 ? 120 : -80,
                    filter: abs === 0 ? "blur(0px) brightness(1)" : `blur(${abs * 2}px) brightness(${0.65 - abs * 0.1})`,
                  }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: "absolute",
                    width: "clamp(190px, 26vw, 260px)",
                    height: "clamp(290px, 40vw, 380px)",
                    borderRadius: "24px",
                    backgroundImage: `url(${offer.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    cursor: "pointer",
                    boxShadow: abs === 0 ? `0 24px 70px ${offer.accent}44, 0 8px 20px rgba(0,0,0,0.1)` : "0 8px 24px rgba(0,0,0,0.08)",
                    border: abs === 0 ? `1.5px solid ${offer.accent}33` : "1px solid rgba(0,0,0,0.06)",
                    zIndex: 10 - abs,
                    overflow: "hidden",
                  }}
                >
                  {/* Category tag — only UI on card */}
                  <div style={{
                    position: "absolute", top: 14, right: 14,
                    background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)",
                    color: "#fff", padding: "4px 12px", borderRadius: "100px",
                    fontSize: "10px", fontWeight: 700, fontFamily: "var(--font-heebo)", zIndex: 2,
                  }}>
                    {offer.cat}
                  </div>

                  {/* Active indicator ring */}
                  {abs === 0 && (
                    <div style={{ position: "absolute", inset: 0, borderRadius: "24px", boxShadow: `inset 0 0 0 2px ${offer.accent}66`, zIndex: 3, pointerEvents: "none" }} />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => go(1)} disabled={index === OFFERS.length - 1}
            style={{ flexShrink: 0, width: 44, height: 44, borderRadius: "50%", background: "#f5f5f7", border: "none", cursor: index === OFFERS.length - 1 ? "default" : "pointer", opacity: index === OFFERS.length - 1 ? 0.3 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Title below slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            style={{ marginTop: 24, textAlign: "center" }}
          >
            <p style={{ fontSize: "clamp(16px, 2.5vw, 20px)", fontWeight: 800, color: "#1D1D1F", fontFamily: "var(--font-heebo)", margin: 0 }}>
              {OFFERS[index].title}
            </p>
            <p style={{ fontSize: 13, color: "#86868B", fontFamily: "var(--font-heebo)", marginTop: 4 }}>
              {OFFERS[index].desc}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: "7px", marginTop: 20 }}>
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

      {/* ── Expanded Modal ── */}
      <AnimatePresence>
        {selectedId && selectedOffer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(255,255,255,0.88)", backdropFilter: "blur(30px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%", maxWidth: 420,
                background: "#fff",
                borderRadius: 36,
                boxShadow: "0 40px 120px rgba(0,0,0,0.18)",
                overflow: "hidden",
                direction: "rtl",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Close */}
              <div style={{ display: "flex", justifyContent: "flex-end", padding: "16px 16px 0" }}>
                <button onClick={() => setSelectedId(null)} style={{ background: "#f5f5f7", border: "none", width: 40, height: 40, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <X size={18} />
                </button>
              </div>

              {/* Image — object-fit: contain, zero cutoff */}
              <div style={{ background: "#f9f9fb", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 24px", minHeight: 280 }}>
                <img
                  src={selectedOffer.img}
                  alt={selectedOffer.title}
                  style={{ maxWidth: "100%", maxHeight: 280, objectFit: "contain", display: "block" }}
                />
              </div>

              {/* Content — fully off-image */}
              <div style={{ padding: "20px 24px 28px", background: "#fff" }}>
                {/* Category + title */}
                <div style={{ marginBottom: 14 }}>
                  <span style={{ display: "inline-block", background: selectedOffer.accent, color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 999, marginBottom: 8, fontFamily: "var(--font-heebo)" }}>
                    {selectedOffer.cat}
                  </span>
                  <h3 style={{ fontSize: "clamp(20px, 5vw, 24px)", fontWeight: 900, color: "#1D1D1F", margin: 0, fontFamily: "var(--font-heebo)", letterSpacing: "-0.02em" }}>
                    {selectedOffer.title}
                  </h3>
                  <p style={{ fontSize: 13, color: "#86868B", marginTop: 6, lineHeight: 1.55, fontFamily: "var(--font-heebo)" }}>
                    {selectedOffer.desc}
                  </p>
                </div>

                {/* Glass Price Pill */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: 14, background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "100px", padding: "10px 20px", marginBottom: 16 }}>
                  <span style={{ fontSize: 14, color: "#86868B", textDecoration: "line-through", fontFamily: "var(--font-heebo)" }}>{selectedOffer.priceOld}</span>
                  <span style={{ fontSize: 24, fontWeight: 900, color: "#007AFF", fontFamily: "var(--font-heebo)" }}>{selectedOffer.priceNew}</span>
                </div>

                {/* CTA */}
                <button
                  onClick={scrollToSurvey}
                  style={{ width: "100%", background: "#0066CC", color: "#fff", border: "none", padding: "16px", borderRadius: 14, fontWeight: 800, fontSize: 16, cursor: "pointer", boxShadow: "0 8px 24px rgba(0,102,204,0.28)", fontFamily: "var(--font-heebo)", display: "block" }}
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