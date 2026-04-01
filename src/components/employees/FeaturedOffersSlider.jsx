import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

const OFFERS = [
  {
    id: "alo-yoga",
    category: "אופנה",
    title: "Alo Yoga",
    desc: "טייץ אלו יוגה נשים ועוד אלפי מוצרים בהטבה של 55% הנחה! יבואן רשמי.",
    priceOld: "₪499",
    priceNew: "₪224",
    accent: "#8B6B3D",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/8ccf1ae84_87.png",
  },
  {
    id: "apple-samsung",
    category: "אלקטרוניקה ומובייל",
    title: "Apple iPhone 16 Pro",
    desc: "אייפון 16 פרו 256GB, אחריות רשמית DCS. מחיר שחוסך אלפי שקלים.",
    priceOld: "₪4,590",
    priceNew: "₪3,890",
    accent: "#555555",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/67dbe888a_92.png",
  },
  {
    id: "vacation",
    category: "נופש וחופשות",
    title: "Brown Hotels",
    desc: "לילה מפנק בBoBo תל אביב כולל לינה, עיסוי זוגי ואוחרת בוקר זוגית ב-899 ש' לזוג.",
    priceOld: "₪1,790",
    priceNew: "₪899",
    accent: "#FF9500",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/28596a618_-2026-03-22T133529822.png",
  },
  {
    id: "kate-hill",
    category: "נסיעות",
    title: "Kate Hill — סט מזוודות",
    desc: "סט 3 מזוודות קשיחות, יבואן רשמי. הדיל הכי חזק של השנה — מוגבל במלאי.",
    priceOld: "₪1,999",
    priceNew: "₪249",
    accent: "#F5C518",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/28598db7e_-2026-03-15T180501791.png",
  },
  {
    id: "living-cost",
    category: "יוקר המחיה",
    title: "TNX — מארז ניקיון",
    desc: "מארז מיני הכל כלול מבית ליאור קוקה. משלוח חינם.",
    priceOld: "₪350",
    priceNew: "₪149",
    accent: "#34C759",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/e8b8ed0b8_-2026-02-18T145540109.png",
  },
  {
    id: "culture",
    category: "תרבות",
    title: "מחזמר קזבלן",
    desc: "קזבלן בהבימה — מחיר לעובדים 77 ש' בלבד. כל הקודם קונה.",
    priceOld: "₪350",
    priceNew: "₪77",
    accent: "#AF52DE",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/5bc85c1ec_-2026-03-22T140039783.png",
  },
  {
    id: "appliances",
    category: "מוצרי חשמל",
    title: "Nespresso Inissia",
    desc: "מכונת קפה Inissia + מקציף + 60 קפסולות + משלוח. אחריות יבואן רשמי.",
    priceOld: "₪833",
    priceNew: "₪589",
    accent: "#5856D6",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7e803d677_-2026-02-18T150849922.png",
  },
  {
    id: "daily-benefit",
    category: "אופנה וספורט",
    title: "Adidas Samba OG",
    desc: "נעלי סמבה אדידס, יבואן רשמי, במגוון צבעים לגברים ונשים. משלוח חינם.",
    priceOld: "₪499",
    priceNew: "₪299",
    accent: "#FF2D55",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/8d94e0c71_-2026-02-18T150744909.png",
  },
  {
    id: "fragrance",
    category: "בישום",
    title: "Christian Dior Sauvage",
    desc: "סאוואז' 100 מ\"ל. מחיר k.s.p: 546 ₪, מחיר cosmetic club: 600 ₪. אצלנו: 430 ₪ כולל משלוח.",
    priceOld: "₪600",
    priceNew: "₪430",
    accent: "#1C1C1E",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/823674aab_-2026-02-18T150114784.png",
  },
];

// Kate Hill is index 3 — default center
const DEFAULT_INDEX = 3;

function OfferModal({ offer, onClose, onCTA }) {
  const savings = offer.priceOld && offer.priceNew
    ? parseInt(offer.priceOld.replace(/[^\d]/g, "")) - parseInt(offer.priceNew.replace(/[^\d]/g, ""))
    : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(0,0,0,0.55)", backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 24 }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "28px",
          maxWidth: "400px",
          width: "100%",
          overflow: "hidden",
          boxShadow: `0 32px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.08)`,
          direction: "rtl",
        }}
      >
        {/* Image area */}
        <div style={{
          background: `linear-gradient(135deg, ${offer.accent}15, ${offer.accent}08)`,
          padding: "32px 32px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          minHeight: "240px",
        }}>
          <button onClick={onClose} style={{
            position: "absolute", top: 14, left: 14,
            width: 32, height: 32, borderRadius: "50%",
            background: "rgba(0,0,0,0.08)", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <X size={16} color="#1D1D1F" />
          </button>
          <span style={{
            position: "absolute", top: 14, right: 14,
            background: offer.accent, color: "#fff",
            fontSize: "10px", fontWeight: 700,
            padding: "3px 10px", borderRadius: 999,
            fontFamily: "var(--font-heebo)",
          }}>
            {offer.category}
          </span>
          <img
            src={offer.image}
            alt={offer.title}
            style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "contain", filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.15))" }}
          />
        </div>

        {/* Content */}
        <div style={{ padding: "20px 24px 24px" }}>
          <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#1D1D1F", margin: "0 0 8px", fontFamily: "var(--font-heebo)", letterSpacing: "-0.02em" }}>
            {offer.title}
          </h3>
          <p style={{ fontSize: "14px", color: "#6E6E73", lineHeight: 1.55, margin: "0 0 20px", fontFamily: "var(--font-heebo)" }}>
            {offer.desc}
          </p>

          {/* Price chips — glassmorphism */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <div style={{
              flex: 1, padding: "12px", borderRadius: "16px", textAlign: "center",
              background: "rgba(200,200,200,0.15)",
              backdropFilter: "blur(15px)",
              border: "1px solid rgba(255,255,255,0.5)",
            }}>
              <p style={{ fontSize: "10px", color: "#86868B", margin: "0 0 2px", fontFamily: "var(--font-heebo)" }}>מחיר רגיל</p>
              <p style={{ fontSize: "16px", fontWeight: 800, color: "#86868B", textDecoration: "line-through", margin: 0, fontFamily: "var(--font-heebo)" }}>{offer.priceOld}</p>
            </div>
            <div style={{
              flex: 1, padding: "12px", borderRadius: "16px", textAlign: "center",
              background: `linear-gradient(135deg, ${offer.accent}22, ${offer.accent}10)`,
              backdropFilter: "blur(15px)",
              border: `1px solid ${offer.accent}44`,
            }}>
              <p style={{ fontSize: "10px", color: offer.accent, margin: "0 0 2px", fontWeight: 700, fontFamily: "var(--font-heebo)" }}>מחיר עובדים</p>
              <p style={{ fontSize: "20px", fontWeight: 900, color: offer.accent, margin: 0, fontFamily: "var(--font-heebo)" }}>{offer.priceNew}</p>
            </div>
            {savings > 0 && (
              <div style={{
                flex: 1, padding: "12px", borderRadius: "16px", textAlign: "center",
                background: "rgba(52,199,89,0.12)",
                backdropFilter: "blur(15px)",
                border: "1px solid rgba(52,199,89,0.3)",
              }}>
                <p style={{ fontSize: "10px", color: "#34C759", margin: "0 0 2px", fontWeight: 700, fontFamily: "var(--font-heebo)" }}>חיסכון</p>
                <p style={{ fontSize: "16px", fontWeight: 900, color: "#34C759", margin: 0, fontFamily: "var(--font-heebo)" }}>₪{savings.toLocaleString()}</p>
              </div>
            )}
          </div>

          <button
            onClick={() => onCTA(offer.id)}
            style={{
              width: "100%",
              background: offer.accent === "#1C1C1E" ? "#1D1D1F" : offer.accent,
              color: "#fff",
              fontWeight: 800, fontSize: "15px",
              padding: "14px", borderRadius: "14px",
              border: "none", cursor: "pointer",
              fontFamily: "var(--font-heebo)",
              boxShadow: `0 8px 24px ${offer.accent}44`,
            }}
          >
            אני רוצה את זה ←
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FeaturedOffersSlider() {
  const [active, setActive] = useState(DEFAULT_INDEX);
  const [modal, setModal] = useState(null);
  const touchStartX = useRef(null);

  const scrollToSurvey = useCallback((offerId) => {
    setModal(null);
    setTimeout(() => document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" }), 200);
  }, []);

  const go = (dir) => {
    setActive(prev => Math.min(Math.max(prev + dir, 0), OFFERS.length - 1));
  };

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const activeOffer = OFFERS[active];

  return (
    <section
      style={{
        background: "#F5F5F7",
        padding: "64px 0 72px",
        overflowX: "hidden",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        direction: "rtl",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "36px", padding: "0 20px" }}>
        <h2 style={{
          fontSize: "clamp(24px, 4vw, 36px)",
          fontWeight: 900, color: "#1D1D1F",
          letterSpacing: "-0.025em",
          marginBottom: 8,
          fontFamily: "var(--font-heebo)",
        }}>
          ככה נראית הטבה אמיתית
        </h2>
        <p style={{ fontSize: 15, color: "#86868B", fontFamily: "var(--font-heebo)" }}>
          דוגמאות חריגות לחיסכון מהשנה האחרונה.
        </p>
      </div>

      {/* 3D Carousel */}
      <div
        style={{ position: "relative", height: "320px", overflow: "hidden" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Glow behind active card */}
        <motion.div
          key={`glow-${active}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            left: "50%", top: "50%",
            transform: "translate(-50%, -50%)",
            width: 300, height: 300,
            borderRadius: "50%",
            background: activeOffer.accent,
            filter: "blur(80px)",
            opacity: 0.12,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Cards */}
        <div style={{ position: "relative", width: "100%", height: "100%", perspective: "1200px" }}>
          {OFFERS.map((offer, i) => {
            const offset = i - active;
            const absOffset = Math.abs(offset);
            if (absOffset > 2) return null;

            const translateX = offset * 220;
            const translateZ = absOffset === 0 ? 0 : -120 - absOffset * 40;
            const rotateY = offset * -18;
            const scale = absOffset === 0 ? 1 : 0.82 - absOffset * 0.06;
            const opacity = absOffset === 0 ? 1 : 0.6 - absOffset * 0.1;
            const zIndex = 10 - absOffset;
            const isActive = absOffset === 0;

            return (
              <motion.div
                key={offer.id}
                onClick={() => isActive ? setModal(offer) : setActive(i)}
                animate={{
                  x: `calc(-50% + ${translateX}px)`,
                  z: translateZ,
                  rotateY,
                  scale,
                  opacity,
                }}
                transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  translateY: "-50%",
                  width: 220,
                  borderRadius: 20,
                  overflow: "hidden",
                  cursor: "pointer",
                  zIndex,
                  background: "#fff",
                  boxShadow: isActive
                    ? `0 20px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.8), 0 0 40px ${offer.accent}30`
                    : "0 8px 24px rgba(0,0,0,0.1)",
                  userSelect: "none",
                }}
              >
                {/* Image */}
                <div style={{
                  height: 180,
                  background: `linear-gradient(135deg, ${offer.accent}18, ${offer.accent}06)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "16px",
                }}>
                  <img
                    src={offer.image}
                    alt={offer.title}
                    style={{ maxWidth: "90%", maxHeight: "150px", objectFit: "contain", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.12))" }}
                    draggable={false}
                  />
                </div>

                {/* Info */}
                <div style={{ padding: "12px 14px 14px" }}>
                  <span style={{
                    fontSize: "9px", fontWeight: 700,
                    color: offer.accent,
                    background: `${offer.accent}18`,
                    padding: "2px 8px", borderRadius: 999,
                    fontFamily: "var(--font-heebo)",
                  }}>
                    {offer.category}
                  </span>
                  <p style={{ fontSize: "13px", fontWeight: 800, color: "#1D1D1F", margin: "6px 0 4px", fontFamily: "var(--font-heebo)", lineHeight: 1.2 }}>
                    {offer.title}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "16px", fontWeight: 900, color: offer.accent, fontFamily: "var(--font-heebo)" }}>{offer.priceNew}</span>
                    <span style={{ fontSize: "11px", color: "#86868B", textDecoration: "line-through", fontFamily: "var(--font-heebo)" }}>{offer.priceOld}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation arrows */}
      <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "20px" }}>
        <button onClick={() => go(-1)} disabled={active === 0} style={{
          width: 40, height: 40, borderRadius: "50%",
          border: "1px solid rgba(0,0,0,0.1)",
          background: "#fff", cursor: active === 0 ? "default" : "pointer",
          opacity: active === 0 ? 0.3 : 1,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}>
          <ChevronRight size={18} />
        </button>

        {/* Dots */}
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          {OFFERS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              width: i === active ? 20 : 7, height: 7,
              borderRadius: 999,
              background: i === active ? activeOffer.accent : "rgba(0,0,0,0.15)",
              border: "none", cursor: "pointer",
              transition: "all 0.3s ease", padding: 0,
            }} />
          ))}
        </div>

        <button onClick={() => go(1)} disabled={active === OFFERS.length - 1} style={{
          width: 40, height: 40, borderRadius: "50%",
          border: "1px solid rgba(0,0,0,0.1)",
          background: "#fff", cursor: active === OFFERS.length - 1 ? "default" : "pointer",
          opacity: active === OFFERS.length - 1 ? 0.3 : 1,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}>
          <ChevronLeft size={18} />
        </button>
      </div>

      {/* Tap hint */}
      <p style={{ textAlign: "center", fontSize: "12px", color: "#AAAAAA", marginTop: "10px", fontFamily: "var(--font-heebo)" }}>
        לחצו על הכרטיס המרכזי לפרטים
      </p>

      {/* CTA */}
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <button
          onClick={() => scrollToSurvey()}
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

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <OfferModal
            offer={modal}
            onClose={() => setModal(null)}
            onCTA={scrollToSurvey}
          />
        )}
      </AnimatePresence>
    </section>
  );
}