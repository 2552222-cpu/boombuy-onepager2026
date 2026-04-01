import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const OFFERS = [
  { id: "alo", cat: "אופנה", title: "Alo Yoga & Adidas", priceOld: "₪499", priceNew: "₪224", accent: "#C8A96E", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/8ccf1ae84_87.png" },
  { id: "apple", cat: "מובייל", title: "Apple iPhone 16 Pro", priceOld: "₪4,590", priceNew: "₪3,890", accent: "#A0A0A0", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/f7db7cb4b_-2026-02-18T150849922.png" },
  { id: "vacation", cat: "חופשות", title: "מלונות בראון — נופש יוקרה", priceOld: "₪1,790", priceNew: "₪899", accent: "#FF9500", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/2c9f901f1_-2026-03-22T133529822.png" },
  { id: "luggage", cat: "נסיעות", title: "Kate Hill — סט מזוודות", priceOld: "₪1,999", priceNew: "₪249", accent: "#F5C518", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/28598db7e_-2026-03-15T180501791.png" },
  { id: "super", cat: "יוקר המחיה", title: "סופר ובית (TNX)", priceOld: "₪350", priceNew: "₪149", accent: "#34C759", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/e8b8ed0b8_-2026-02-18T145540109.png" },
  { id: "culture", cat: "תרבות", title: "קזבלן — הצגת השנה", priceOld: "₪350", priceNew: "₪77", accent: "#AF52DE", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/444a89b69_-2026-03-22T140039783.png" },
  { id: "nespresso", cat: "חשמל", title: "Nespresso Inissia", priceOld: "₪833", priceNew: "₪589", accent: "#5856D6", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/909033315_-2026-02-18T150129609.png" },
  { id: "daily", cat: "כל בוקר", title: "נעלי Adidas Samba", priceOld: "₪499", priceNew: "₪299", accent: "#FF2D55", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7a5527555_-2026-02-18T150744909.png" },
  { id: "dior", cat: "בישום", title: "Christian Dior — Sauvage", priceOld: "₪600", priceNew: "₪430", accent: "#1D1D1F", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/823674aab_-2026-02-18T150114784.png" }
];

const DESCS = {
  alo: "אלו יוגה, אדידס ונייק ומותגי פרימיום במחירים סיטונאיים בלעדי לעובדים.",
  apple: "אייפון 16 פרו 256GB, אחריות רשמית DCS. מחיר יבואן ישיר לעובדי הארגון.",
  vacation: "לילה מפנק ב-Brown BoBo תל אביב — לינה, עיסוי זוגי וארוחת בוקר ב-₪899 לזוג.",
  luggage: "סט 3 מזוודות קשיחות Kate Hill, יבואן רשמי. הדיל של השנה.",
  super: "הוזלה אמיתית על מוצרי צריכה (ניקיון, קפה) + עד 8% הנחה קבועה בסופרים המוזלים.",
  culture: "קזבלן — הצגת השנה. כרטיסים בתיאטרון הלאומי הבימה במחיר עובד.",
  nespresso: "מכונת קפה Inissia + מקציף + 60 קפסולות. אחריות יבואן רשמי + משלוח חינם.",
  daily: "נעלי Adidas Samba OG. יבואן רשמי, שנת אחריות, משלוח חינם לכל הארץ.",
  dior: "סאוואז' 100 מ\"ל ומוצרי טיפוח פרימיום במחירי יבואן.",
};

export default function FeaturedOffersSlider() {
  const [selectedId, setSelectedId] = useState(null);
  const [index, setIndex] = useState(3);
  const touchStart = useRef(0);

  const go = (dir) => setIndex((p) => (p + dir + OFFERS.length) % OFFERS.length);
  const selectedOffer = OFFERS.find((o) => o.id === selectedId);

  return (
    <section
      style={{ background: "#fff", padding: "80px 0", direction: "rtl", overflow: "hidden" }}
      onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const diff = touchStart.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1);
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center", padding: "0 16px" }}>
        <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, marginBottom: "12px", fontFamily: "var(--font-heebo)", color: "#1D1D1F", letterSpacing: "-0.025em" }}>
          ככה נראית הטבה אמיתית
        </h2>
        <p style={{ color: "#86868B", marginBottom: "48px", fontFamily: "var(--font-heebo)" }}>
          לחצו על כרטיסייה לפרטים מלאים
        </p>

        {/* 3D Track */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "clamp(360px, 52vw, 480px)", perspective: "1500px", position: "relative" }}>
          {OFFERS.map((offer, i) => {
            const offset = i - index;
            const abs = Math.abs(offset);
            if (abs > 2) return null;
            return (
              <motion.div
                key={offer.id}
                onClick={() => i === index ? setSelectedId(offer.id) : setIndex(i)}
                animate={{
                  x: offset * 250,
                  scale: abs === 0 ? 1.15 : 0.85,
                  rotateY: offset * -28,
                  z: abs === 0 ? 150 : -100,
                  filter: abs === 0 ? "none" : "blur(4px) brightness(0.8)",
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute",
                  width: "clamp(200px, 28vw, 270px)",
                  height: "clamp(300px, 42vw, 400px)",
                  borderRadius: 32,
                  backgroundImage: `url(${offer.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  cursor: "pointer",
                  boxShadow: abs === 0 ? `0 40px 100px ${offer.accent}33` : "0 10px 30px rgba(0,0,0,0.05)",
                  border: abs === 0 ? `2px solid ${offer.accent}` : "1px solid rgba(0,0,0,0.05)",
                  zIndex: 10 - abs,
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", color: "#fff", padding: "4px 12px", borderRadius: 100, fontSize: 11, fontWeight: 700, zIndex: 5, fontFamily: "var(--font-heebo)" }}>
                  {offer.cat}
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)", padding: "32px 16px 18px", zIndex: 3 }}>
                  <div style={{ color: "#fff", fontWeight: 800, fontSize: 15, textAlign: "center", textShadow: "0 2px 8px rgba(0,0,0,0.5)", fontFamily: "var(--font-heebo)" }}>
                    {offer.title}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dot Indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 40 }}>
          {OFFERS.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} style={{ width: i === index ? 32 : 8, height: 4, background: i === index ? "#0066CC" : "#E5E5E7", borderRadius: 10, border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease" }} />
          ))}
        </div>
      </div>

      {/* Expanded Modal — Zero Cutoff */}
      <AnimatePresence>
        {selectedId && selectedOffer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(40px)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{ width: "100%", maxWidth: 450, maxHeight: "90vh", background: "#fff", borderRadius: 40, boxShadow: "0 50px 150px rgba(0,0,0,0.12)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}
            >
              <button
                onClick={() => setSelectedId(null)}
                style={{ position: "absolute", top: 20, left: 20, background: "#f2f2f7", border: "none", width: 40, height: 40, borderRadius: "50%", cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <X size={20} />
              </button>

              {/* Image — contain, zero cutoff */}
              <div style={{ flex: 2, padding: 40, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", minHeight: 200 }}>
                <img src={selectedOffer.img} alt={selectedOffer.title} style={{ maxWidth: "100%", maxHeight: 260, objectFit: "contain" }} />
              </div>

              {/* Info — fully off-image */}
              <div style={{ flex: 1.2, padding: "24px 28px 32px", background: "#fff", textAlign: "right", direction: "rtl", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <div style={{ color: "#86868B", fontWeight: 700, fontSize: 12, marginBottom: 8, textTransform: "uppercase", fontFamily: "var(--font-heebo)" }}>
                  {selectedOffer.cat}
                </div>
                <h3 style={{ fontSize: "clamp(20px, 5vw, 26px)", fontWeight: 900, color: "#1D1D1F", marginBottom: 10, fontFamily: "var(--font-heebo)", letterSpacing: "-0.02em" }}>
                  {selectedOffer.title}
                </h3>
                <p style={{ fontSize: 14, color: "#6e6e73", lineHeight: 1.55, marginBottom: 18, fontFamily: "var(--font-heebo)" }}>
                  {DESCS[selectedOffer.id]}
                </p>

                {/* Price Pill */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ background: "#F5F5F7", borderRadius: 100, padding: "10px 24px", display: "inline-flex", gap: 18, alignItems: "center" }}>
                    <span style={{ fontSize: 14, color: "#86868B", textDecoration: "line-through", fontFamily: "var(--font-heebo)" }}>{selectedOffer.priceOld}</span>
                    <span style={{ fontSize: 24, fontWeight: 900, color: "#0066CC", fontFamily: "var(--font-heebo)" }}>{selectedOffer.priceNew}</span>
                  </div>
                </div>

                <button
                  onClick={() => { setSelectedId(null); setTimeout(() => document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" }), 300); }}
                  style={{ width: "100%", background: "#0066CC", color: "#fff", border: "none", padding: 18, borderRadius: 18, fontWeight: 800, fontSize: 17, cursor: "pointer", boxShadow: "0 10px 30px rgba(0,102,204,0.28)", fontFamily: "var(--font-heebo)" }}
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