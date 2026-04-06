import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const OFFERS = [
  {
    id: "fashion",
    cat: "אופנה",
    brand: "Alo Yoga",
    title: "Alo Yoga — פרימיום",
    priceOld: "₪499", priceNew: "₪224",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/359030b5f_87.png"
  },
  {
    id: "apple",
    cat: "מובייל",
    brand: "Apple",
    title: "iPhone 16 Pro — יבואן",
    priceOld: "₪4,590", priceNew: "₪3,890",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/66514fe66_-2026-02-18T150849922.png"
  },
  {
    id: "vacation",
    cat: "נופש וחופשות",
    brand: "מלונות בראון",
    title: "מלונות בראון — פרימיום",
    priceOld: "₪1,790", priceNew: "₪899",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7cc501b0f_-2026-03-22T133529822.png"
  },
  {
    id: "luggage",
    cat: "נסיעות",
    brand: "Kate Hill",
    title: "Kate Hill — סט מזוודות",
    priceOld: "₪1,999", priceNew: "₪249",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/28598db7e_-2026-03-15T180501791.png"
  },
  {
    id: "super",
    cat: "יוקר המחיה",
    brand: "TNX",
    title: "סופר ובית — TNX",
    priceOld: "₪350", priceNew: "₪149",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/e8b8ed0b8_-2026-02-18T145540109.png"
  },
  {
    id: "culture",
    cat: "תרבות",
    brand: "קזבלן",
    title: "קזבלן — הצגת השנה",
    priceOld: "₪350", priceNew: "₪77",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3c42d518b_-2026-03-22T140039783.png"
  },
  {
    id: "nespresso",
    cat: "חשמל ואלקטרוניקה",
    brand: "Nespresso",
    title: "מכונת נספרסו — יבואן",
    priceOld: "₪833", priceNew: "₪589",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/39fcbe2f7_-2026-02-18T150129609.png"
  },
  {
    id: "morning",
    cat: "כל בוקר הטבה חדשה",
    brand: "260 הטבות",
    title: "260 הטבות — פרימיום",
    priceOld: "₪499", priceNew: "₪299",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/b7485969d_-2026-02-18T150744909.png"
  },
  {
    id: "dior",
    cat: "בישום",
    brand: "Dior",
    title: "Dior Sauvage — יבואן",
    priceOld: "₪600", priceNew: "₪430",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/823674aab_-2026-02-18T150114784.png"
  }
];

function calcSaving(priceOld, priceNew) {
  if (!priceOld) return null;
  const old = parseInt(priceOld.replace(/[^\d]/g, ""));
  const nw = parseInt(priceNew.replace(/[^\d]/g, ""));
  return `₪${old - nw}`;
}

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
            minHeight: "480px",
            perspective: "1500px",
            position: "relative",
            width: "100%",
          }}
        >
          {OFFERS.map((offer, i) => {
            const offset = i - index;
            const absOffset = Math.abs(offset);
            if (absOffset > 4) return null;
            const isCenter = absOffset === 0;
            const saving = calcSaving(offer.priceOld, offer.priceNew);

            return (
              <motion.div
                key={offer.id}
                layoutId={offer.id}
                onClick={() => i === index ? setSelectedId(offer.id) : setIndex(i)}
                animate={{
                  x: offset * 240,
                  scale: isCenter ? 1.12 : 0.84,
                  rotateY: offset * -25,
                  z: isCenter ? 150 : -80,
                  filter: isCenter ? "none" : `blur(3px) brightness(0.75)`,
                }}
                transition={{ type: "spring", damping: 20, stiffness: 180 }}
                style={{
                  position: "absolute",
                  width: "260px",
                  height: "400px",
                  background: "#F5F5F7",
                  overflow: "visible",
                  borderRadius: "28px",
                  cursor: "pointer",
                  zIndex: 10 - absOffset,
                  boxShadow: isCenter
                    ? "0 0 0 1px rgba(0,0,0,0.06), 0 32px 80px rgba(0,0,0,0.14)"
                    : "0 8px 24px rgba(0,0,0,0.06)",
                }}
              >
                {/* Image container */}
                <div style={{
                  width: "100%",
                  height: "100%",
                  background: "#F5F5F7",
                  borderRadius: "28px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "15%",
                  boxSizing: "border-box",
                }}>
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
                </div>

                {/* Glass Pills — only on center card */}
                {isCenter && (
                  <div style={{
                    position: "absolute",
                    bottom: "-22px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: "6px",
                    alignItems: "center",
                    zIndex: 20,
                    whiteSpace: "nowrap",
                  }}>
                    {/* Old price pill */}
                    {offer.priceOld && (
                      <div style={{
                        background: "rgba(255,255,255,0.72)",
                        backdropFilter: "blur(25px)",
                        WebkitBackdropFilter: "blur(25px)",
                        border: "1px solid rgba(255,255,255,0.6)",
                        borderRadius: "999px",
                        padding: "5px 12px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                      }}>
                        <span style={{ fontSize: "9px", fontWeight: 600, color: "#AEAEB2", fontFamily: "var(--font-heebo)" }}>מחיר ZAP</span>
                        <span style={{ fontSize: "13px", color: "#86868B", textDecoration: "line-through", fontFamily: "var(--font-heebo)", fontWeight: 500 }}>{offer.priceOld}</span>
                      </div>
                    )}

                    {/* New price pill */}
                    <div style={{
                      background: "rgba(255,255,255,0.72)",
                      backdropFilter: "blur(25px)",
                      WebkitBackdropFilter: "blur(25px)",
                      border: "1px solid rgba(255,255,255,0.6)",
                      borderRadius: "999px",
                      padding: "5px 14px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                    }}>
                      <span style={{ fontSize: "9px", fontWeight: 600, color: "#007AFF", fontFamily: "var(--font-heebo)" }}>מחיר BoomBuy</span>
                      <span style={{ fontSize: "18px", fontWeight: 900, color: "#1D1D1F", fontFamily: "var(--font-heebo)" }}>{offer.priceNew}</span>
                    </div>

                    {/* Saving pill */}
                    {saving && (
                      <div style={{
                        background: "#007AFF",
                        borderRadius: "999px",
                        padding: "5px 14px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        boxShadow: "0 4px 14px rgba(0,122,255,0.3)",
                      }}>
                        <span style={{ fontSize: "9px", fontWeight: 600, color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-heebo)" }}>החיסכון שלך</span>
                        <span style={{ fontSize: "15px", fontWeight: 900, color: "#fff", fontFamily: "var(--font-heebo)" }}>{saving}</span>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Card title below */}
        <div style={{ marginTop: "56px", minHeight: "44px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <p style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#AEAEB2",
                fontFamily: "var(--font-heebo)",
                marginBottom: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}>
                {OFFERS[index].cat} · {OFFERS[index].brand}
              </p>
              <p style={{
                fontSize: "17px",
                fontWeight: 900,
                color: "#1D1D1F",
                fontFamily: "var(--font-heebo)",
                maxWidth: "340px",
                margin: "0 auto",
                lineHeight: 1.3,
                letterSpacing: "-0.02em",
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
              {/* Image area */}
              <div style={{
                background: "#F5F5F7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "50px 40px 40px",
                position: "relative",
                minHeight: "280px",
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
                    maxHeight: "220px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>

              {/* Content area */}
              <div style={{
                padding: "20px 24px 28px",
                textAlign: "right",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                overflowY: "auto",
              }}>
                <div>
                  <p style={{
                    fontSize: "11px", fontWeight: 700, letterSpacing: "0.07em",
                    color: "#AEAEB2", textTransform: "uppercase",
                    fontFamily: "var(--font-heebo)", marginBottom: "4px",
                  }}>
                    {selectedOffer.cat} · {selectedOffer.brand}
                  </p>
                  <h3 style={{
                    fontSize: "20px", fontWeight: 900, color: "#1D1D1F",
                    fontFamily: "var(--font-heebo)", lineHeight: 1.2, margin: 0,
                    letterSpacing: "-0.02em",
                  }}>
                    {selectedOffer.title}
                  </h3>
                </div>

                {/* Price pills */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {selectedOffer.priceOld && (
                    <div style={{
                      background: "#F5F5F7",
                      borderRadius: "12px",
                      padding: "8px 14px",
                      display: "flex", flexDirection: "column", alignItems: "flex-end",
                    }}>
                      <span style={{ fontSize: "9px", fontWeight: 700, color: "#AEAEB2", fontFamily: "var(--font-heebo)" }}>מחיר ZAP</span>
                      <span style={{ fontSize: "15px", color: "#86868B", textDecoration: "line-through", fontFamily: "var(--font-heebo)" }}>{selectedOffer.priceOld}</span>
                    </div>
                  )}
                  <div style={{
                    background: "#EBF3FF",
                    borderRadius: "12px",
                    padding: "8px 14px",
                    display: "flex", flexDirection: "column", alignItems: "flex-end",
                  }}>
                    <span style={{ fontSize: "9px", fontWeight: 700, color: "#007AFF", fontFamily: "var(--font-heebo)" }}>מחיר BoomBuy</span>
                    <span style={{ fontSize: "22px", fontWeight: 900, color: "#007AFF", fontFamily: "var(--font-heebo)" }}>{selectedOffer.priceNew}</span>
                  </div>
                  {calcSaving(selectedOffer.priceOld, selectedOffer.priceNew) && (
                    <div style={{
                      background: "#007AFF",
                      borderRadius: "12px",
                      padding: "8px 14px",
                      display: "flex", flexDirection: "column", alignItems: "flex-end",
                    }}>
                      <span style={{ fontSize: "9px", fontWeight: 700, color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-heebo)" }}>החיסכון שלך</span>
                      <span style={{ fontSize: "20px", fontWeight: 900, color: "#fff", fontFamily: "var(--font-heebo)" }}>{calcSaving(selectedOffer.priceOld, selectedOffer.priceNew)}</span>
                    </div>
                  )}
                </div>

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
                    padding: "15px",
                    borderRadius: "16px",
                    fontWeight: 800,
                    fontSize: "15px",
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(0,122,255,0.28)",
                    fontFamily: "var(--font-heebo)",
                    marginTop: "4px",
                    letterSpacing: "-0.01em",
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