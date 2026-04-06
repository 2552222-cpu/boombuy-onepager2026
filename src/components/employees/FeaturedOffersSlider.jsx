import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const OFFERS = [
  { id: "culture", cat: "תרבות ופנאי", brand: "קזבלן", title: "קזבלן · הצגת השנה", priceOld: "₪350", priceNew: "₪77", saving: "₪273", labelOld: "מחיר שוק", desc: "תערוכות, הופעות והצגות בארץ ובחו\"ל במחירים נגישים.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3c42d518b_-2026-03-22T140039783.png" },
  { id: "fashion", cat: "אופנה ומותגים", brand: "Alo Yoga", title: "Alo Yoga · פרימיום", priceOld: "₪499", priceNew: "₪224", saving: "₪275", labelOld: "מחיר שוק", desc: "אלו יוגה, אדידס, נייק ומותגי פרימיום במחירים סיטונאיים.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/359030b5f_87.png" },
  { id: "luggage", cat: "נסיעות", brand: "Kate Hill", title: "Kate Hill · סט מזוודות", priceOld: "₪1,999", priceNew: "₪249", saving: "₪1,750", labelOld: "מחיר שוק", desc: "סט 3 מזוודות קשיחות, יבואן רשמי. ההטבה המבוקשת של השנה.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/28598db7e_-2026-03-15T180501791.png" },
  { id: "apple", cat: "מובייל", brand: "Apple", title: "Apple iPhone 16 Pro · יבואן", priceOld: "₪4,590", priceNew: "₪3,890", saving: "₪700", labelOld: "מחיר שוק", desc: "הטבות בלעדיות על אייפון, סמסונג ומוצרי מובייל.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/66514fe66_-2026-02-18T150849922.png" },
  { id: "vacation", cat: "נופש וחופשות", brand: "מלונות בראון", title: "מלונות בראון · פרימיום", priceOld: "₪1,790", priceNew: "₪899", saving: "₪891", labelOld: "מחיר שוק", desc: "חופשות בארץ ובחו\"ל במחירים בלעדיים · עד 50% הנחה.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7cc501b0f_-2026-03-22T133529822.png" },
  { id: "super", cat: "יוקר המחיה", brand: "TNX", title: "סופר ובית · TNX", priceOld: "₪350", priceNew: "₪149", saving: "₪201", labelOld: "מחיר שוק", desc: "הוזלה אמיתית על מוצרי צריכה ובנוסף עד 8% הנחה קבועה בסופרים.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/e8b8ed0b8_-2026-02-18T145540109.png" },
  { id: "nespresso", cat: "חשמל ואלקטרוניקה", brand: "Nespresso", title: "Nespresso · אלקטרוניקה", priceOld: "₪833", priceNew: "₪589", saving: "₪244", labelOld: "מחיר שוק", desc: "מוצרי חשמל ואלקטרוניקה במחירי יבואן ובהנחות חריגות.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/39fcbe2f7_-2026-02-18T150129609.png" },
  { id: "dior", cat: "בישום", brand: "Dior Sauvage", title: "Dior Sauvage · יבואן", priceOld: "₪600", priceNew: "₪430", saving: "₪170", labelOld: "מחיר שוק", desc: "מותגי בישום פרימיום במחירי יבואן.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/823674aab_-2026-02-18T150114784.png" },
  { 
    id: "samba", 
    cat: "כל בוקר הטבה חדשה", 
    brand: "Adidas Samba", 
    title: "כל בוקר הטבה, אטרקציה או חוויה חדשה", 
    priceOld: "₪499", priceNew: "₪299", saving: "₪200", 
    labelOld: "מחיר באדידס", 
    desc: "הדגם המבוקש בעולם במחיר בלעדי לעובדים לבוקר זה בלבד.", 
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/b7485969d_-2026-02-18T150744909.png" 
  },
];

export default function FeaturedOffersSlider() {
  const [selectedId, setSelectedId] = useState(null);
  const [index, setIndex] = useState(3);
  const touchStart = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); 
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const selectedOffer = OFFERS.find(o => o.id === selectedId);
  const go = dir => setIndex(p => (p + dir + OFFERS.length) % OFFERS.length);

  return (
    <section id="offers-slider" style={{ background: "#FFFFFF", padding: "80px 0", direction: "rtl", overflowX: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center", padding: "0 16px" }}>
        
        <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, marginBottom: "10px", color: "#15172A", letterSpacing: "-0.03em", fontFamily: "var(--font-heebo)" }}>
          ככה אנחנו מגדילים לכם את הנטו
        </h2>
        <p style={{ color: "#86868B", marginBottom: "52px", fontSize: "clamp(15px, 2vw, 18px)", fontWeight: 400, fontFamily: "var(--font-heebo)" }}>
          דוגמאות להטבות אמיתיות עם חיסכון חריג לעובדים
        </p>

        {/* Carousel Engine */}
        <div onTouchStart={e => { touchStart.current = e.touches[0].clientX; }} onTouchEnd={e => { const diff = touchStart.current - e.changedTouches[0].clientX; if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1); }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "480px", perspective: "1500px", position: "relative", width: "100%" }}>
          {OFFERS.map((offer, i) => {
            const offset = i - index;
            const abs = Math.abs(offset);
            if (abs > 4) return null;
            const isCenter = abs === 0;

            return (
              <motion.div key={offer.id} layoutId={offer.id} onClick={() => i === index ? setSelectedId(offer.id) : setIndex(i)}
                animate={{ x: offset * (isMobile ? 210 : 230), scale: isCenter ? 1.1 : 0.82, rotateY: offset * -26, z: isCenter ? 150 : -80, filter: isCenter ? "none" : `blur(${Math.min(abs * 1.5, 4)}px) brightness(${0.85 - abs * 0.1})` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: "absolute", width: "260px", height: "420px", background: "#F5F5F7", borderRadius: "32px", overflow: "hidden", cursor: "pointer", zIndex: 10 - abs, boxShadow: isCenter ? "0 32px 80px rgba(0,0,0,0.12)" : "0 6px 20px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column" }}>
                <img src={offer.img} alt={offer.brand} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && selectedOffer && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? "0" : "20px" }}
            onClick={() => setSelectedId(null)}>
            <motion.div layoutId={selectedId} onClick={e => e.stopPropagation()}
              style={{ width: isMobile ? "100%" : "1100px", height: isMobile ? "100dvh" : "85vh", background: "#fff", borderRadius: isMobile ? "0" : "40px", overflow: "hidden", display: "flex", flexDirection: isMobile ? "column" : "row-reverse", maxHeight: isMobile ? "100dvh" : "85dvh" }}>
              
              {/* IMAGE AREA - Edge-to-Edge look without clipping */}
              <div style={{ flex: isMobile ? "0 0 55%" : "1.3", background: "#F5F5F7", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, overflow: "hidden" }}>
                <button onClick={() => setSelectedId(null)} style={{ position: "absolute", top: 20, left: 20, background: "rgba(0,0,0,0.2)", border: "none", width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
                  <X size={20} color="#fff" />
                </button>
                {/* Critical fix: object-fit contain to prevent clipping */}
                <img src={selectedOffer.img} alt={selectedOffer.brand} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
              </div>

              {/* CONTENT AREA */}
              <div style={{ flex: "1", padding: isMobile ? "24px 20px" : "60px", textAlign: "right", display: "flex", flexDirection: "column", justifyContent: "flex-start", direction: "rtl", overflowY: "auto", background: "#fff", fontFamily: "var(--font-heebo)" }}>
                <div style={{ marginBottom: "30px" }}>
                  <p style={{ fontSize: "14px", fontWeight: 800, color: "#0055CC", marginBottom: "8px", fontFamily: "var(--font-heebo)" }}>{selectedOffer.cat} · {selectedOffer.brand}</p>
                  <h3 style={{ fontSize: isMobile ? "24px" : "42px", fontWeight: 900, color: "#15172A", lineHeight: 1.1, marginBottom: "20px", fontFamily: "var(--font-heebo)" }}>{selectedOffer.title}</h3>
                  <p style={{ fontSize: isMobile ? "16px" : "17px", color: "#6E6E73", lineHeight: 1.6, fontFamily: "var(--font-heebo)" }}>{selectedOffer.desc}</p>
                </div>
                
                <div style={{ marginTop: "auto" }}>
                  <div style={{ display: "flex", gap: "10px", marginBottom: "32px" }}>
                    {[
                      { lbl: selectedOffer.labelOld, val: selectedOffer.priceOld, strike: true, color: "#86868B" },
                      { lbl: "מחיר לעובד", val: selectedOffer.priceNew, color: "#0055CC" },
                      { lbl: "החיסכון שלך", val: selectedOffer.saving, color: "#1A7A43", bg: "rgba(52,199,89,0.1)" }
                    ].map((c, i) => (
                      <div key={i} style={{ flex: 1, background: c.bg || "#F5F5F7", borderRadius: "20px", padding: isMobile ? "12px 6px" : "16px 10px", textAlign: "center" }}>
                        <p style={{ fontSize: "10px", fontWeight: 700, color: "#86868B", marginBottom: "4px", fontFamily: "var(--font-heebo)" }}>{c.lbl}</p>
                        <p style={{ fontSize: isMobile ? "17px" : "24px", fontWeight: 900, color: c.color, textDecoration: c.strike ? "line-through" : "none", fontFamily: "var(--font-heebo)" }}>{c.val}</p>
                      </div>
                    ))}
                  </div>

                  <button style={{ width: "100%", background: "#0055CC", color: "#fff", border: "none", padding: "22px", borderRadius: "24px", fontSize: "19px", fontWeight: 900, cursor: "pointer", boxShadow: "0 15px 40px rgba(0,85,204,0.35)", fontFamily: "var(--font-heebo)" }}>
                    אני רוצה את זה בארגון שלי ←
                  </button>
                  {isMobile && <div style={{ height: "40px" }} />}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}