import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const OFFERS = [
  { id: "apple", cat: "מובייל", brand: "Apple", title: "Apple iPhone 16 Pro · יבואן", priceOld: "4,590₪", priceNew: "3,890₪", saving: "700₪", labelOld: "מחיר שוק", desc: "הטבות בלעדיות על אייפון, סמסונג ומוצרי מובייל.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/66514fe66_-2026-02-18T150849922.png" },
  { id: "vacation", cat: "נופש וחופשות", brand: "מלונות בראון", title: "מלונות בראון · פרימיום", priceOld: "1,790₪", priceNew: "899₪", saving: "891₪", labelOld: "מחיר שוק", desc: "חופשות בארץ ובחו\"ל במחירים בלעדיים · עד 50% הנחה.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7cc501b0f_-2026-03-22T133529822.png" },
  { id: "super", cat: "יוקר המחיה", brand: "TNX", title: "סופר ובית · TNX", priceOld: "350₪", priceNew: "149₪", saving: "201₪", labelOld: "מחיר שוק", desc: "הוזלה אמיתית על מוצרי צריכה ובנוסף עד 8% הנחה קבועה בסופרים.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/e8b8ed0b8_-2026-02-18T145540109.png" },
  { id: "samba", cat: "כל בוקר הטבה חדשה", brand: "Adidas Samba", title: "Adidas Samba · הדגם המבוקש", priceOld: "499₪", priceNew: "299₪", saving: "200₪", labelOld: "מחיר באדידס", desc: "הדגם המבוקש בעולם במחיר בלעדי לעובדים לבוקר זה בלבד.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/b7485969d_-2026-02-18T150744909.png" },
  { id: "fashion", cat: "אופנה ומותגים", brand: "Alo Yoga", title: "Alo Yoga · פרימיום", priceOld: "499₪", priceNew: "224₪", saving: "275₪", labelOld: "מחיר שוק", desc: "אלו יוגה, אדידס, נייק ומותגי פרימיום במחירים סיטונאיים.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/359030b5f_87.png" },
  { id: "culture", cat: "תרבות ופנאי", brand: "קזבלן", title: "קזבלן · הצגת השנה", priceOld: "350₪", priceNew: "77₪", saving: "273₪", labelOld: "מחיר שוק", desc: "תערוכות, הופעות והצגות בארץ ובחו\"ל במחירים נגישים.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3c42d518b_-2026-03-22T140039783.png" },
  { id: "nespresso", cat: "חשמל ואלקטרוניקה", brand: "Nespresso", title: "Nespresso · אלקטרוניקה", priceOld: "833₪", priceNew: "589₪", saving: "244₪", labelOld: "מחיר שוק", desc: "מוצרי חשמל ואלקטרוניקה במחירי יבואן ובהנחות חריגות.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/39fcbe2f7_-2026-02-18T150129609.png" },
  { id: "dior", cat: "בישום", brand: "Dior Sauvage", title: "Dior Sauvage · יבואן", priceOld: "600₪", priceNew: "430₪", saving: "170₪", labelOld: "מחיר שוק", desc: "מותגי בישום פרימיום במחירי יבואן.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/823674aab_-2026-02-18T150114784.png" },
  { id: "luggage", cat: "נסיעות", brand: "Kate Hill", title: "Kate Hill · סט מזוודות", priceOld: "1,999₪", priceNew: "249₪", saving: "1,750₪", labelOld: "מחיר שוק", desc: "סט 3 מזוודות קשיחות, יבואן רשמי. ההטבה המבוקשת של השנה.", img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/28598db7e_-2026-03-15T180501791.png" },
];

export default function FeaturedOffersSlider() {
  const [selectedId, setSelectedId] = useState(null);
  const [index, setIndex] = useState(5);
  const [hovered, setHovered] = useState(false);
  const touchStart = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const selectedOffer = OFFERS.find(o => o.id === selectedId);
  const go = dir => setIndex(p => (p + dir + OFFERS.length) % OFFERS.length);

  return (
    <section id="offers-slider" style={{ background: "#FFFFFF", padding: "80px 0", direction: "rtl", overflowX: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center", padding: "0 16px" }}>
        <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, marginBottom: "10px", color: "#15172A", letterSpacing: "-0.03em" }}>ככה אנחנו מגדילים לכם את הנטו</h2>
        <p style={{ color: "#86868B", marginBottom: "52px", fontSize: "clamp(15px, 2vw, 18px)", fontWeight: 400 }}>דוגמאות להטבות אמיתיות עם חיסכון חריג לעובדים</p>

        {/* Carousel */}
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTouchStart={e => { touchStart.current = e.touches[0].clientX; }}
          onTouchEnd={e => { const diff = touchStart.current - e.changedTouches[0].clientX; if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1); }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "480px", perspective: "1500px", position: "relative" }}
        >
          {/* Nav arrows */}
          <AnimatePresence>
            {(hovered || isMobile) && (
              <>
                <motion.button key="left" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => go(1)}
                  style={{ position: "absolute", left: isMobile ? 4 : -10, zIndex: 50, width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.08)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.1)", outline: "none" }}
                >
                  <ChevronLeft size={22} color="#1D1D1F" />
                </motion.button>
                <motion.button key="right" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => go(-1)}
                  style={{ position: "absolute", right: isMobile ? 4 : -10, zIndex: 50, width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.08)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.1)", outline: "none" }}
                >
                  <ChevronRight size={22} color="#1D1D1F" />
                </motion.button>
              </>
            )}
          </AnimatePresence>

          {OFFERS.map((offer, i) => {
            const offset = i - index;
            const abs = Math.abs(offset);
            if (abs > 4) return null;
            // wrap-around: also check the circular distance
            const circOffset = offset > OFFERS.length / 2 ? offset - OFFERS.length : offset < -OFFERS.length / 2 ? offset + OFFERS.length : offset;
            const circAbs = Math.abs(circOffset);
            if (circAbs > 4) return null;
            const isCenter = abs === 0;

            return (
              <motion.div key={offer.id}
                onClick={() => i === index ? setSelectedId(offer.id) : setIndex(i)}
                animate={{ x: circOffset * (isMobile ? 210 : 230), scale: isCenter ? 1.1 : 0.82, rotateY: circOffset * -26, z: isCenter ? 150 : -80, filter: isCenter ? "none" : `blur(${Math.min(abs * 1.5, 4)}px) brightness(${0.85 - abs * 0.1})` }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: "absolute", width: "260px", cursor: "pointer", zIndex: 10 - circAbs, display: "flex", flexDirection: isMobile ? "column-reverse" : "column", alignItems: "center", gap: 12 }}
              >
                {/* Card image */}
                <div style={{ width: "100%", height: "420px", background: "#F5F5F7", borderRadius: "32px", overflow: "hidden", boxShadow: isCenter ? "0 32px 80px rgba(0,0,0,0.12)" : "0 6px 20px rgba(0,0,0,0.06)", flexShrink: 0 }}>
                  <img src={offer.img} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                {/* Glassmorphism CTA */}
                <div style={{ width: "90%", flexShrink: 0 }}>
                  <motion.div
                    animate={{ boxShadow: ["0 0 0px rgba(37,99,235,0)", "0 0 12px rgba(37,99,235,0.5)", "0 0 0px rgba(37,99,235,0)"] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ background: "rgba(255,255,255,0.5)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(37,99,235,0.25)", borderRadius: 14, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#0055CC", margin: 0, fontFamily: "var(--font-heebo)" }}>לחצו לגלות את פרטי ההטבה</p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "40px" }}>
          {[{ dir: -1, d: "m15 18-6-6 6-6" }, { dir: 1, d: "m9 18 6-6-6-6" }].map(({ dir, d }) => (
            <button key={dir} onClick={() => go(dir)} style={{ width: 44, height: 44, borderRadius: "50%", background: "#F5F5F7", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#1D1D1F" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d={d} /></svg>
            </button>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedId && selectedOffer && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? "0" : "20px" }}
            onClick={() => setSelectedId(null)}>
            <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={e => e.stopPropagation()}
              style={{ width: isMobile ? "100%" : "1100px", height: isMobile ? "100dvh" : "85vh", background: "#fff", borderRadius: isMobile ? "0" : "40px", overflow: "hidden", display: "flex", flexDirection: isMobile ? "column" : "row-reverse", maxHeight: isMobile ? "100dvh" : "85dvh" }}>

              {/* IMAGE AREA */}
              <div style={{ flex: isMobile ? "0 0 50%" : "1.3", background: "#fff", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                {/* Modal nav arrows */}
                <button onClick={(e) => { e.stopPropagation(); go(-1); setSelectedId(OFFERS[(index - 1 + OFFERS.length) % OFFERS.length].id); }}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.85)", border: "none", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 10, boxShadow: "0 2px 10px rgba(0,0,0,0.12)" }}>
                  <ChevronRight size={18} color="#1D1D1F" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); go(1); setSelectedId(OFFERS[(index + 1) % OFFERS.length].id); }}
                  style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.85)", border: "none", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 10, boxShadow: "0 2px 10px rgba(0,0,0,0.12)" }}>
                  <ChevronLeft size={18} color="#1D1D1F" />
                </button>
                <button onClick={() => setSelectedId(null)} style={{ position: "absolute", top: 20, left: 20, background: "rgba(0,0,0,0.2)", border: "none", width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20 }}>
                  <X size={20} color="#fff" />
                </button>
                <img src={selectedOffer.img} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
              </div>

              {/* CONTENT AREA */}
              <div style={{ flex: "1", padding: isMobile ? "24px 20px" : "60px", textAlign: "right", display: "flex", flexDirection: "column", justifyContent: "space-between", direction: "rtl", overflowY: "auto", background: "#fff" }}>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 800, color: "#0055CC", marginBottom: "8px" }}>{selectedOffer.cat} · {selectedOffer.brand}</p>
                  <h3 style={{ fontSize: isMobile ? "24px" : "42px", fontWeight: 900, color: "#15172A", lineHeight: 1.1, marginBottom: "16px" }}>{selectedOffer.title}</h3>
                  <p style={{ fontSize: isMobile ? "16px" : "17px", color: "#6E6E73", lineHeight: 1.5, marginBottom: "16px" }}>{selectedOffer.desc}</p>
                  {/* Nexus */}
                  <p style={{ fontSize: "12px", color: "#6E6E73", lineHeight: 1.65, marginBottom: "24px", borderRight: "3px solid #E5E7EB", paddingRight: "10px" }}>
                    הטבה זו וכלל ההטבות במערכת נוצרות ומסובסדות אוטומטית הודות לטכנולוגיית ה-<strong style={{ color: "#15172A" }}>Nexus</strong> של בום ביי. המערכת מייצרת את ערך החיסכון באופן עצמאי, ללא צורך בסבסוד נוסף מצד המעסיק.
                  </p>
                </div>

                <div>
                  <div style={{ display: "flex", gap: "10px", marginBottom: "32px" }}>
                    {[
                      { lbl: selectedOffer.labelOld, val: selectedOffer.priceOld, strike: true, color: "#86868B" },
                      { lbl: "מחיר לעובד", val: selectedOffer.priceNew, color: "#0055CC" },
                      { lbl: "החיסכון שלך", val: selectedOffer.saving, color: "#1A7A43", bg: "rgba(52,199,89,0.1)" }
                    ].map((c, i) => (
                      <div key={i} style={{ flex: 1, background: c.bg || "#F5F5F7", borderRadius: "20px", padding: isMobile ? "12px 6px" : "16px 10px", textAlign: "center" }}>
                        <p style={{ fontSize: "11px", fontWeight: 700, color: "#86868B", marginBottom: "4px" }}>{c.lbl}</p>
                        <p style={{ fontSize: isMobile ? "17px" : "24px", fontWeight: 900, color: c.color, textDecoration: c.strike ? "line-through" : "none" }}>{c.val}</p>
                      </div>
                    ))}
                  </div>

                  <button style={{ width: "100%", background: "#0055CC", color: "#fff", border: "none", padding: "22px", borderRadius: "24px", fontSize: "19px", fontWeight: 900, cursor: "pointer", boxShadow: "0 15px 40px rgba(0,85,204,0.35)" }}>
                    אני רוצה את זה בארגון שלי ←
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}