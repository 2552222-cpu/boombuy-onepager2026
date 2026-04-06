import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const OFFERS = [
  {
    id: "fashion",
    cat: "אופנה",
    brand: "Alo Yoga",
    title: "Alo Yoga — פרימיום",
    priceOld: "₪499", priceNew: "₪224", saving: "₪275",
    desc: "אלו יוגה, אדידס, נייק ומותגי פרימיום במחירים סיטונאיים.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/359030b5f_87.png"
  },
  {
    id: "apple",
    cat: "מובייל",
    brand: "Apple",
    title: "iPhone 16 Pro — יבואן",
    priceOld: "₪4,590", priceNew: "₪3,890", saving: "₪700",
    desc: "הטבות בלעדיות על אייפון, סמסונג ומוצרי מובייל.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/66514fe66_-2026-02-18T150849922.png"
  },
  {
    id: "vacation",
    cat: "נופש וחופשות",
    brand: "מלונות בראון",
    title: "מלונות בראון — פרימיום",
    priceOld: "₪1,790", priceNew: "₪899", saving: "₪891",
    desc: "חופשות בארץ ובחו\"ל במחירים בלעדיים — עד 50% הנחה.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7cc501b0f_-2026-03-22T133529822.png"
  },
  {
    id: "luggage",
    cat: "נסיעות",
    brand: "Kate Hill",
    title: "Kate Hill — סט מזוודות",
    priceOld: "₪1,999", priceNew: "₪249", saving: "₪1,750",
    desc: "סט 3 מזוודות קשיחות, יבואן רשמי. ההטבה המבוקשת של השנה.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/28598db7e_-2026-03-15T180501791.png"
  },
  {
    id: "super",
    cat: "יוקר המחיה",
    brand: "TNX",
    title: "סופר ובית — TNX",
    priceOld: "₪350", priceNew: "₪149", saving: "₪201",
    desc: "הוזלה אמיתית על מוצרי צריכה ובנוסף עד 8% הנחה קבועה בסופרים המוזלים.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/e8b8ed0b8_-2026-02-18T145540109.png"
  },
  {
    id: "culture",
    cat: "תרבות",
    brand: "קזבלן",
    title: "קזבלן — הצגת השנה",
    priceOld: "₪350", priceNew: "₪77", saving: "₪273",
    desc: "תערוכות, הופעות והצגות בארץ ובחו\"ל במחירים נגישים.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3c42d518b_-2026-03-22T140039783.png"
  },
  {
    id: "nespresso",
    cat: "חשמל ואלקטרוניקה",
    brand: "Nespresso",
    title: "מכונת נספרסו — יבואן",
    priceOld: "₪833", priceNew: "₪589", saving: "₪244",
    desc: "מוצרי חשמל ואלקטרוניקה במחירי יבואן ובהנחות חריגות.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/39fcbe2f7_-2026-02-18T150129609.png"
  },
  {
    id: "morning",
    cat: "כל בוקר הטבה חדשה",
    brand: "260 הטבות",
    title: "260 הטבות — פרימיום",
    priceOld: "₪499", priceNew: "₪299", saving: "₪200",
    desc: "חוויות ומוצרי צריכה פרימיום שאתם צורכים בכל מקרה.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/b7485969d_-2026-02-18T150744909.png"
  },
  {
    id: "dior",
    cat: "בישום",
    brand: "Dior",
    title: "Dior Sauvage — יבואן",
    priceOld: "₪600", priceNew: "₪430", saving: "₪170",
    desc: "חנות בישום במחירי יבואן.",
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
    <section style={{ background: "#FFFFFF", padding: "72px 0 80px", direction: "rtl", overflowX: "hidden" }}>
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
          fontWeight: 700,
          lineHeight: 1.5,
        }}>
          לחצו על כרטיסייה לפרטים מלאים
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
            height: "540px",
            perspective: "1500px",
            position: "relative",
            width: "100%",
          }}
        >
          {OFFERS.map((offer, i) => {
            const offset = i - index;
            const absOffset = Math.abs(offset);
            if (absOffset > 3) return null;
            const isCenter = absOffset === 0;

            return (
              <motion.div
                key={offer.id}
                onClick={() => i === index ? setSelectedId(offer.id) : setIndex(i)}
                animate={{
                  x: offset * 280,
                  scale: isCenter ? 1.08 : 0.8,
                  rotateY: offset * -22,
                  z: isCenter ? 100 : -100,
                  filter: isCenter ? "none" : `blur(2px) brightness(0.7)`,
                }}
                transition={{ type: "spring", damping: 25, stiffness: 150 }}
                style={{
                  position: "absolute",
                  width: "340px",
                  height: "480px",
                  borderRadius: "24px",
                  cursor: "pointer",
                  zIndex: 10 - absOffset,
                  overflow: "hidden",
                  boxShadow: isCenter
                    ? "0 0 0 1px rgba(0,0,0,0.06), 0 40px 100px rgba(0,0,0,0.18)"
                    : "0 8px 24px rgba(0,0,0,0.06)",
                  background: "#F5F5F7",
                }}
              >
                <img
                  src={offer.img}
                  alt={offer.brand}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
                {/* Subtle brand label on center card */}
                {isCenter && (
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "32px 20px 20px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)",
                    textAlign: "right",
                  }}>
                    <p style={{
                      fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.7)",
                      fontFamily: "var(--font-heebo)", letterSpacing: "0.06em",
                      textTransform: "uppercase", margin: 0,
                    }}>
                      {offer.cat}
                    </p>
                    <p style={{
                      fontSize: "16px", fontWeight: 900, color: "#fff",
                      fontFamily: "var(--font-heebo)", margin: "2px 0 0",
                      letterSpacing: "-0.01em",
                    }}>
                      {offer.brand}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Price pills below carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            style={{
              marginTop: "28px",
              display: "flex",
              gap: "8px",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {OFFERS[index].priceOld && (
              <div style={{
                background: "#F5F5F7",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "999px",
                padding: "6px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
                <span style={{ fontSize: "9px", fontWeight: 700, color: "#AEAEB2", fontFamily: "var(--font-heebo)" }}>מחיר שוק</span>
                <span style={{ fontSize: "15px", color: "#86868B", textDecoration: "line-through", fontFamily: "var(--font-heebo)", fontWeight: 600 }}>{OFFERS[index].priceOld}</span>
              </div>
            )}
            <div style={{
              background: "#fff",
              border: "1.5px solid rgba(0,102,204,0.2)",
              borderRadius: "999px",
              padding: "6px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0 2px 12px rgba(0,102,204,0.1)",
            }}>
              <span style={{ fontSize: "9px", fontWeight: 700, color: "#007AFF", fontFamily: "var(--font-heebo)" }}>מחיר BoomBuy</span>
              <span style={{ fontSize: "22px", fontWeight: 900, color: "#1D1D1F", fontFamily: "var(--font-heebo)" }}>{OFFERS[index].priceNew}</span>
            </div>
            {OFFERS[index].saving && (
              <div style={{
                background: "#007AFF",
                borderRadius: "999px",
                padding: "6px 18px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 4px 16px rgba(0,122,255,0.35)",
              }}>
                <span style={{ fontSize: "9px", fontWeight: 600, color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-heebo)" }}>החיסכון שלך</span>
                <span style={{ fontSize: "18px", fontWeight: 900, color: "#fff", fontFamily: "var(--font-heebo)" }}>{OFFERS[index].saving}</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "24px" }}>
          {OFFERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              style={{
                width: i === index ? 28 : 7,
                height: 4,
                background: i === index ? "#007AFF" : "#E5E5E7",
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

      {/* Full-Screen Modal */}
      <AnimatePresence>
        {selectedId && selectedOffer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              zIndex: 2000,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 150 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "520px",
                height: "92vh",
                background: "#fff",
                borderRadius: "32px 32px 0 0",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Hero image — 65% */}
              <div style={{
                flex: "0 0 65%",
                background: "#F5F5F7",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <button
                  onClick={() => setSelectedId(null)}
                  style={{
                    position: "absolute", top: "16px", left: "16px",
                    background: "rgba(0,0,0,0.08)",
                    border: "none", width: "40px", height: "40px",
                    borderRadius: "50%", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 10,
                  }}
                >
                  <X size={20} color="#1D1D1F" />
                </button>
                <img
                  src={selectedOffer.img}
                  alt={selectedOffer.brand}
                  style={{
                    width: "80%",
                    height: "80%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>

              {/* Console — 35% */}
              <div style={{
                flex: "0 0 35%",
                padding: "20px 24px 32px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                overflowY: "auto",
                background: "#fff",
              }}>
                {/* Title */}
                <div style={{ textAlign: "right" }}>
                  <p style={{
                    fontSize: "11px", fontWeight: 700, letterSpacing: "0.07em",
                    color: "#AEAEB2", textTransform: "uppercase",
                    fontFamily: "var(--font-heebo)", margin: "0 0 3px",
                  }}>
                    {selectedOffer.cat} · {selectedOffer.brand}
                  </p>
                  <h3 style={{
                    fontSize: "20px", fontWeight: 900, color: "#1D1D1F",
                    fontFamily: "var(--font-heebo)", lineHeight: 1.15, margin: 0,
                    letterSpacing: "-0.02em",
                  }}>
                    {selectedOffer.title}
                  </h3>
                  {selectedOffer.desc && (
                    <p style={{ fontSize: "13px", color: "#86868B", fontFamily: "var(--font-heebo)", lineHeight: 1.5, margin: "4px 0 0" }}>
                      {selectedOffer.desc}
                    </p>
                  )}
                </div>

                {/* Price row */}
                <div style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  direction: "rtl",
                }}>
                  {selectedOffer.priceOld && (
                    <div style={{
                      background: "#F5F5F7",
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: "999px",
                      padding: "5px 14px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}>
                      <span style={{ fontSize: "9px", fontWeight: 700, color: "#AEAEB2", fontFamily: "var(--font-heebo)" }}>מחיר שוק</span>
                      <span style={{ fontSize: "14px", color: "#86868B", textDecoration: "line-through", fontFamily: "var(--font-heebo)", fontWeight: 600 }}>{selectedOffer.priceOld}</span>
                    </div>
                  )}
                  <div style={{
                    background: "#fff",
                    border: "1.5px solid rgba(0,102,204,0.2)",
                    borderRadius: "999px",
                    padding: "5px 18px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow: "0 2px 10px rgba(0,102,204,0.1)",
                  }}>
                    <span style={{ fontSize: "9px", fontWeight: 700, color: "#007AFF", fontFamily: "var(--font-heebo)" }}>מחיר לעובד</span>
                    <span style={{ fontSize: "22px", fontWeight: 900, color: "#1D1D1F", fontFamily: "var(--font-heebo)" }}>{selectedOffer.priceNew}</span>
                  </div>
                  {selectedOffer.saving && (
                    <div style={{
                      background: "#007AFF",
                      borderRadius: "999px",
                      padding: "5px 16px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      boxShadow: "0 4px 14px rgba(0,122,255,0.3)",
                    }}>
                      <span style={{ fontSize: "9px", fontWeight: 600, color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-heebo)" }}>החיסכון שלך</span>
                      <span style={{ fontSize: "18px", fontWeight: 900, color: "#fff", fontFamily: "var(--font-heebo)" }}>{selectedOffer.saving}</span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    setSelectedId(null);
                    setTimeout(() => document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" }), 200);
                  }}
                  style={{
                    width: "100%",
                    background: "#007AFF",
                    color: "#fff",
                    border: "none",
                    padding: "14px",
                    borderRadius: "16px",
                    fontWeight: 800,
                    fontSize: "15px",
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(0,122,255,0.28)",
                    fontFamily: "var(--font-heebo)",
                    letterSpacing: "-0.01em",
                    marginTop: "auto",
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