import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const OFFERS = [
  {
    id: "morning",
    cat: "כל בוקר הטבה חדשה",
    brand: "Adidas",
    title: "Adidas Samba",
    priceOldLabel: "מחיר אדידס",
    priceOld: "₪620", priceNew: "₪299", saving: "₪321",
    desc: "אדידס, נייק, ניו-באלאנס ומותגי פרימיום ישירות לוואטסאפ שלך כל בוקר.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/b7485969d_-2026-02-18T150744909.png"
  },
  {
    id: "super",
    cat: "יוקר המחיה",
    brand: "TNX",
    title: "סופר ובית TNX",
    priceOldLabel: "מחיר CHP",
    priceOld: "₪239", priceNew: "₪149", saving: "₪90",
    desc: "הנחה קבועה של עד 8% בסופרים המוזלים ומוצרי צריכה בהוזלה אמיתית.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/e8b8ed0b8_-2026-02-18T145540109.png"
  },
  {
    id: "nespresso",
    cat: "חשמל ואלקטרוניקה",
    brand: "Nespresso",
    title: "מכונת נספרסו במחיר יבואן",
    priceOldLabel: "מחיר שוק",
    priceOld: "₪833", priceNew: "₪589", saving: "₪244",
    desc: "נספרסו, דייסון, נינג'ה ועוד מאות מותגי חשמל ואלקטרוניקה במחירי יבואן.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/39fcbe2f7_-2026-02-18T150129609.png"
  },
  {
    id: "fashion",
    cat: "אופנה",
    brand: "Alo Yoga",
    title: "Alo Yoga פרימיום",
    priceOldLabel: "מחיר שוק",
    priceOld: "₪499", priceNew: "₪224", saving: "₪275",
    desc: "אלו יוגה, אדידס, נייק ומותגי פרימיום במחירי יבואן בלעדיים לעובדי הארגון.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/359030b5f_87.png"
  },
  {
    id: "apple",
    cat: "מובייל",
    brand: "Apple",
    title: "iPhone 16 Pro במחיר יבואן",
    priceOldLabel: "מחיר זאפ",
    priceOld: "₪4,590", priceNew: "₪3,890", saving: "₪700",
    desc: "אייפון, סמסונג ומובייל במחירי יבואן.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/66514fe66_-2026-02-18T150849922.png"
  },
  {
    id: "culture",
    cat: "תרבות",
    brand: "הבימה",
    title: "הבימה הצגת השנה",
    priceOldLabel: "מחיר הבימה",
    priceOld: "₪350", priceNew: "₪77", saving: "₪273",
    desc: "הבימה, קזבלן, הצגות וקונצרטים במחירים נגישים בלעדיים לעובדי הארגון.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3c42d518b_-2026-03-22T140039783.png"
  },
  {
    id: "vacation",
    cat: "נופש וחופשות",
    brand: "מלונות בראון",
    title: "מלונות בראון פרימיום",
    priceOldLabel: "מחיר מחירון",
    priceOld: "₪1,790", priceNew: "₪899", saving: "₪891",
    desc: "מלונות בראון, נופש בחו\"ל וחבילות אטרקציות בהנחה בלעדית לעובדי הארגון.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7cc501b0f_-2026-03-22T133529822.png"
  },
  {
    id: "dior",
    cat: "בישום",
    brand: "Dior",
    title: "Dior Sauvage",
    priceOldLabel: "מחיר KSP",
    priceOld: "₪546", priceNew: "₪430", saving: "₪116",
    desc: "דיור, שאנל, בוס ועוד מאות מותגי בישום ויוקרה במחירי יבואן.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/823674aab_-2026-02-18T150114784.png"
  }
];

const DEFAULT_INDEX = 4; // iPhone in center

// Shared pill sizes
const PILL_LABEL_STYLE = { fontSize: "9px", fontWeight: 700, fontFamily: "var(--font-heebo)" };
const PILL_VALUE_STYLE = { fontSize: "16px", fontWeight: 900, fontFamily: "var(--font-heebo)" };

export default function FeaturedOffersSlider() {
  const [selectedId, setSelectedId] = useState(null);
  const [index, setIndex] = useState(DEFAULT_INDEX);
  const touchStart = useRef(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const go = (dir) => setIndex((p) => (p + dir + OFFERS.length) % OFFERS.length);
  const selectedOffer = OFFERS.find(o => o.id === selectedId);
  const currentOffer = OFFERS[index];

  const modalNext = () => {
    const i = OFFERS.findIndex(o => o.id === selectedId);
    setSelectedId(OFFERS[(i + 1) % OFFERS.length].id);
  };
  const modalPrev = () => {
    const i = OFFERS.findIndex(o => o.id === selectedId);
    setSelectedId(OFFERS[(i - 1 + OFFERS.length) % OFFERS.length].id);
  };

  return (
    <section style={{ background: "#FFFFFF", padding: "52px 0 56px", direction: "rtl", overflowX: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center", padding: "0 16px" }}>

        {/* Header */}
        <h2 style={{
          fontSize: "clamp(28px, 5vw, 38px)",
          fontWeight: 900,
          marginBottom: "6px",
          fontFamily: "var(--font-heebo)",
          color: "#1D1D1F",
          letterSpacing: "-0.025em",
          lineHeight: 1.1,
        }}>
          ככה אנחנו מגדילים לכם את הנטו
        </h2>
        <p style={{
          color: "#86868B",
          marginBottom: "10px",
          fontFamily: "var(--font-heebo)",
          fontSize: "clamp(14px, 2vw, 16px)",
          fontWeight: 500,
          lineHeight: 1.5,
        }}>
          דוגמאות להטבות אמיתיות עם חיסכון חריג לעובדים
        </p>
        <p style={{
          color: "#AEAEB2",
          marginBottom: "28px",
          fontFamily: "var(--font-heebo)",
          fontSize: "13px",
          fontWeight: 600,
        }}>
          לחצו על כרטיסייה לפרטים מלאים
        </p>

        {/* Category label on mobile — shown above carousel */}
        {isMobile && (
          <AnimatePresence mode="wait">
            <motion.div
              key={index + "-cat"}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
              style={{ marginBottom: "10px" }}
            >
              <span style={{
                background: "#1D1D1F",
                color: "#fff",
                borderRadius: "999px",
                padding: "4px 14px",
                fontSize: "12px",
                fontWeight: 700,
                fontFamily: "var(--font-heebo)",
                display: "inline-block",
              }}>
                {currentOffer.cat}
              </span>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Category pills above slider — desktop only */}
        {!isMobile && (
          <div style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "32px",
          }}>
            {OFFERS.map((o, i) => (
              <button
                key={o.id}
                onClick={() => setIndex(i)}
                style={{
                  background: i === index ? "#1D1D1F" : "#F5F5F7",
                  color: i === index ? "#fff" : "#86868B",
                  border: "none",
                  borderRadius: "999px",
                  padding: "5px 14px",
                  fontSize: "12px",
                  fontWeight: 700,
                  fontFamily: "var(--font-heebo)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {o.cat}
              </button>
            ))}
          </div>
        )}

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
            height: isMobile ? "86vw" : "540px",
            maxHeight: isMobile ? "480px" : "none",
            perspective: isMobile ? "none" : "1500px",
            position: "relative",
            width: "100%",
          }}
        >
          {OFFERS.map((offer, i) => {
            const offset = i - index;
            const absOffset = Math.abs(offset);
            if (isMobile && absOffset > 0) return null;
            if (!isMobile && absOffset > 3) return null;
            const isCenter = absOffset === 0;

            return (
              <motion.div
                key={offer.id}
                onClick={() => isCenter ? setSelectedId(offer.id) : setIndex(i)}
                animate={isMobile ? {
                  x: 0, scale: 1, rotateY: 0, z: 0, filter: "none",
                } : {
                  x: offset * 280,
                  scale: isCenter ? 1.08 : 0.8,
                  rotateY: offset * -22,
                  z: isCenter ? 100 : -100,
                  filter: isCenter ? "none" : `blur(2px) brightness(0.7)`,
                }}
                transition={{ type: "spring", damping: 25, stiffness: 150 }}
                style={{
                  position: isMobile ? "relative" : "absolute",
                  width: isMobile ? "min(94vw, 360px)" : "340px",
                  height: isMobile ? "min(86vw, 480px)" : "480px",
                  borderRadius: "24px",
                  cursor: "pointer",
                  zIndex: 10 - absOffset,
                  overflow: "hidden",
                  boxShadow: isCenter
                    ? "0 0 0 1px rgba(0,0,0,0.06), 0 40px 100px rgba(0,0,0,0.18)"
                    : "0 8px 24px rgba(0,0,0,0.06)",
                  background: "#F5F5F7",
                  flexShrink: 0,
                }}
              >
                <img
                  src={offer.img}
                  alt={offer.brand}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {isCenter && !isMobile && (
                  <div style={{
                    position: "absolute",
                    bottom: 0, left: 0, right: 0,
                    padding: "40px 20px 18px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
                    textAlign: "right",
                  }}>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-heebo)", letterSpacing: "0.06em", textTransform: "uppercase", margin: 0 }}>
                      {offer.cat}
                    </p>
                    <p style={{ fontSize: "16px", fontWeight: 900, color: "#fff", fontFamily: "var(--font-heebo)", margin: "2px 0 0", letterSpacing: "-0.01em" }}>
                      {offer.brand}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Description bubble */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index + "-desc"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            style={{
              marginTop: "12px",
              marginBottom: "8px",
              background: "#F5F5F7",
              border: "1px solid rgba(0,0,0,0.07)",
              borderRadius: "10px",
              padding: "6px 14px",
              display: "inline-block",
              maxWidth: "480px",
            }}
          >
            <p style={{
              fontSize: "11px",
              color: "#3A3A3C",
              fontFamily: "var(--font-heebo)",
              fontWeight: 500,
              lineHeight: 1.4,
              margin: 0,
            }}>
              {currentOffer.desc}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Price pills */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index + "-price"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            style={{
              display: "flex",
              gap: "6px",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {currentOffer.priceOld && (
              <div style={{
                background: "#F5F5F7",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "999px",
                padding: "4px 12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
                <span style={{ ...PILL_LABEL_STYLE, color: "#AEAEB2" }}>{currentOffer.priceOldLabel}</span>
                <span style={{ ...PILL_VALUE_STYLE, color: "#86868B", textDecoration: "line-through" }}>{currentOffer.priceOld}</span>
              </div>
            )}
            <div style={{
              background: "#fff",
              border: "1.5px solid rgba(0,102,204,0.2)",
              borderRadius: "999px",
              padding: "4px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0 2px 12px rgba(0,102,204,0.1)",
            }}>
              <span style={{ ...PILL_LABEL_STYLE, color: "#007AFF" }}>מחיר לעובד</span>
              <span style={{ ...PILL_VALUE_STYLE, color: "#1D1D1F" }}>{currentOffer.priceNew}</span>
            </div>
            {currentOffer.saving && (
              <div style={{
                background: "#007AFF",
                borderRadius: "999px",
                padding: "4px 14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 4px 16px rgba(0,122,255,0.35)",
              }}>
                <span style={{ ...PILL_LABEL_STYLE, color: "rgba(255,255,255,0.75)" }}>החיסכון שלך</span>
                <span style={{ ...PILL_VALUE_STYLE, color: "#fff" }}>{currentOffer.saving}</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "20px" }}>
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
            {/* Close button */}
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
              style={{
                position: "absolute",
                top: "16px",
                left: "16px",
                background: "rgba(0,0,0,0.35)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1.5px solid rgba(255,255,255,0.3)",
                width: "44px", height: "44px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 2010,
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              <X size={20} color="#fff" strokeWidth={2.5} />
            </button>

            {/* Prev arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); modalPrev(); }}
              style={{
                position: "absolute",
                right: "16px",
                top: "30%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.3)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1.5px solid rgba(255,255,255,0.3)",
                width: "44px", height: "44px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 2010,
                boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
              }}
            >
              <ChevronRight size={22} color="#fff" strokeWidth={2.5} />
            </button>

            {/* Next arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); modalNext(); }}
              style={{
                position: "absolute",
                left: "16px",
                top: "30%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.3)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1.5px solid rgba(255,255,255,0.3)",
                width: "44px", height: "44px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 2010,
                boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
              }}
            >
              <ChevronLeft size={22} color="#fff" strokeWidth={2.5} />
            </button>

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 150 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "520px",
                height: "100dvh",
                background: "#fff",
                borderRadius: "0",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Hero image */}
              <div style={{
                flex: "0 0 55%",
                minHeight: 0,
                background: "#F5F5F7",
                position: "relative",
                overflow: "hidden",
              }}>
                <img
                  src={selectedOffer.img}
                  alt={selectedOffer.brand}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  height: "80px",
                  background: "linear-gradient(to bottom, transparent, #fff)",
                  pointerEvents: "none",
                }} />
              </div>

              {/* Content */}
              <div style={{
                flex: 1,
                padding: "10px 20px 28px",
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                overflowY: "auto",
                background: "#fff",
              }}>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.04em", color: "#AEAEB2", textTransform: "uppercase", fontFamily: "var(--font-heebo)", margin: 0 }}>
                    {selectedOffer.cat} · {selectedOffer.brand}
                  </p>
                  <h3 style={{ fontSize: "17px", fontWeight: 900, color: "#1D1D1F", fontFamily: "var(--font-heebo)", lineHeight: 1.15, margin: "2px 0 0" }}>
                    {selectedOffer.title}
                  </h3>
                  {selectedOffer.desc && (
                    <p style={{ fontSize: "12px", color: "#86868B", fontFamily: "var(--font-heebo)", lineHeight: 1.4, margin: "3px 0 0" }}>
                      {selectedOffer.desc}
                    </p>
                  )}
                </div>

                {/* Price row */}
                <div style={{ display: "flex", gap: "6px", alignItems: "center", direction: "rtl" }}>
                  {selectedOffer.priceOld && (
                    <div style={{ background: "#F5F5F7", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "999px", padding: "4px 12px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <span style={{ ...PILL_LABEL_STYLE, color: "#AEAEB2" }}>{selectedOffer.priceOldLabel}</span>
                      <span style={{ ...PILL_VALUE_STYLE, color: "#86868B", textDecoration: "line-through" }}>{selectedOffer.priceOld}</span>
                    </div>
                  )}
                  <div style={{ background: "#fff", border: "1.5px solid rgba(0,102,204,0.2)", borderRadius: "999px", padding: "4px 14px", display: "flex", flexDirection: "column", alignItems: "center", boxShadow: "0 2px 10px rgba(0,102,204,0.1)" }}>
                    <span style={{ ...PILL_LABEL_STYLE, color: "#007AFF" }}>מחיר לעובד</span>
                    <span style={{ ...PILL_VALUE_STYLE, color: "#1D1D1F" }}>{selectedOffer.priceNew}</span>
                  </div>
                  {selectedOffer.saving && (
                    <div style={{ background: "#007AFF", borderRadius: "999px", padding: "4px 12px", display: "flex", flexDirection: "column", alignItems: "center", boxShadow: "0 4px 14px rgba(0,122,255,0.3)" }}>
                      <span style={{ ...PILL_LABEL_STYLE, color: "rgba(255,255,255,0.75)" }}>החיסכון שלך</span>
                      <span style={{ ...PILL_VALUE_STYLE, color: "#fff" }}>{selectedOffer.saving}</span>
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
                    padding: "14px",
                    borderRadius: "16px",
                    fontWeight: 800,
                    fontSize: "15px",
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(0,122,255,0.28)",
                    fontFamily: "var(--font-heebo)",
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