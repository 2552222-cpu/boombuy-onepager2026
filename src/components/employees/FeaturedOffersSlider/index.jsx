import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// ─── OFFERS DATA (9 items, single source of truth) ───────────────────────────
const OFFERS = [
  {
    id: "samba",
    num: 1,
    cat: "כל בוקר הטבה חדשה",
    brand: "Adidas",
    productName: "נעלי סמבה",
    labelOld: "מחיר שוק",
    priceOld: "519",
    priceNew: "299",
    saving: "220",
    desc: "נעלי SAMBA (אדידס דגם samba og) במחיר בלעדי לעובדים.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/b7485969d_-2026-02-18T150744909.png",
  },
  {
    id: "kate_hill",
    num: 2,
    cat: "כל בוקר הטבה חדשה",
    brand: "Kate Hill",
    productName: "מזוודות קייט היל",
    labelOld: "מחיר שוק",
    priceOld: "1,999",
    priceNew: "249",
    saving: "1,750",
    desc: "סט 3 מזוודות קשיחות Kate Hill עם חומר PC מתרחב, גלגלים 360°, מנעול קומבינציה. גדלים: 20״, 24״, 28״ — שנה אחריות יבואן רשמי.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/8fb586f26_-2026-03-15T180501791.png",
  },
  {
    id: "kazablan",
    num: 3,
    cat: "תרבות ופנאי",
    brand: "הבימה",
    productName: "קזבלן בהבימה",
    labelOld: "מחיר שוק",
    priceOld: "350",
    priceNew: "77",
    saving: "273",
    desc: "המחזמר קזבלן בכיכובו של איתי לוי — הבימה. כרטיס בלעדי לעובדים במחיר מיוחד.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/bb4b910ed_-2026-03-22T140039783.png",
  },
  {
    id: "alo_yoga",
    num: 4,
    cat: "אופנה ומותגים",
    brand: "Alo Yoga",
    productName: "טייץ אלו יוגה",
    labelOld: "מחיר שוק",
    priceOld: "499",
    priceNew: "224",
    saving: "275",
    desc: "טייץ יוגה פרימיום של Alo Yoga — בד נושם, גמיש ומחמיא, במחיר בלעדי לעובדים.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/82cf01fcc_87.png",
  },
  {
    id: "bobo_tlv",
    num: 5,
    cat: "נופש וחופשות",
    brand: "BoBo TLV",
    productName: "לילה מפנק ב-BoBo תל אביב",
    labelOld: "מחיר שוק",
    priceOld: "1,790",
    priceNew: "899",
    saving: "891",
    desc: "לילה מפנק ב-BoBo תל אביב — כולל לינה, עיסוי זוגי וארוחת בוקר זוגית.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/cf3b11fa5_-2026-03-22T133529822.png",
  },
  {
    id: "nespresso",
    num: 6,
    cat: "חשמל ואלקטרוניקה",
    brand: "Nespresso",
    productName: "נספרסו Inissia + מקציף + 60 קפסולות",
    labelOld: "מחיר שוק",
    priceOld: "833",
    priceNew: "589",
    saving: "244",
    desc: "מכונת נספרסו Inissia כולל מקציף חלב, 60 קפסולות ומשלוח — הכל במחיר בלעדי לעובדים.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/96816d966_92.png",
  },
  {
    id: "samsung",
    num: 7,
    cat: "חשמל ואלקטרוניקה",
    brand: "Samsung",
    productName: "סמסונג גלאקסי S25+",
    labelOld: "מחיר KSP",
    priceOld: "3,388",
    priceNew: "2,499",
    saving: "889",
    desc: "סמסונג גלאקסי S25+ — מסך 6.7 אינץ׳, מצלמה משולשת, AI מובנה, במחיר יבואן בלעדי.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/c7ef06ffc_-2026-02-18T141936848.png",
  },
  {
    id: "iphone",
    num: 8,
    cat: "חשמל ואלקטרוניקה",
    brand: "Apple",
    productName: "iPhone 16 Pro",
    labelOld: "מחיר שוק",
    priceOld: "4,590",
    priceNew: "3,890",
    saving: "700",
    desc: "iPhone 16 Pro — מעבד A18 Pro, מצלמה 48MP, טיטניום, במחיר בלעדי לעובדים.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/92d8c129a_-2026-02-18T150849922.png",
  },
  {
    id: "kitan",
    num: 9,
    cat: "בית וצריכה",
    brand: "Kitan",
    productName: "שמיכת כיתן",
    labelOld: "מחיר כיתן",
    priceOld: "449",
    priceNew: "139",
    saving: "310",
    desc: "שמיכת מזגן קיצית מפנקת של כיתן — כולל משלוח, במחיר בלעדי לעובדים.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6186b6abc_-2026-03-22T123739070.png",
  },
];

// ─── PRICE TAG ────────────────────────────────────────────────────────────────
function PriceTag({ label, amount, color = "#1D1D1F", bg = "#F5F5F7", strike = false }) {
  return (
    <div style={{
      flex: 1,
      minWidth: 0,
      background: bg,
      borderRadius: 16,
      border: "1px solid rgba(0,0,0,0.06)",
      padding: "10px 6px",
      textAlign: "center",
    }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: "#86868B", marginBottom: 5, letterSpacing: "0.02em", lineHeight: 1.2 }}>{label}</p>
      <span style={{ display: "inline-flex", flexDirection: "row", alignItems: "baseline", gap: 2, textDecoration: strike ? "line-through" : "none" }}>
        <span style={{ fontSize: 18, fontWeight: 900, color, lineHeight: 1 }}>{amount}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color }}>₪</span>
      </span>
    </div>
  );
}

// ─── DOT INDICATOR ────────────────────────────────────────────────────────────
function Dots({ active, onSelect }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20 }}>
      {OFFERS.map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          style={{
            width: i === active ? 20 : 7,
            height: 7,
            borderRadius: 100,
            background: i === active ? "#0055CC" : "rgba(0,0,0,0.15)",
            border: "none",
            padding: 0,
            cursor: "pointer",
            transition: "all 0.25s ease",
          }}
        />
      ))}
    </div>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function OfferModal({ offer, isMobile, onClose, onPrev, onNext }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("offersModalChange", { detail: { open: true } }));
    return () => {
      document.body.style.overflow = "";
      window.dispatchEvent(new CustomEvent("offersModalChange", { detail: { open: false } }));
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(20px)",
        zIndex: 2000,
        display: "flex",
        alignItems: isMobile ? "flex-end" : "center",
        justifyContent: "center",
        padding: isMobile ? 0 : 20,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: isMobile ? 60 : 0, scale: isMobile ? 1 : 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: isMobile ? 60 : 0, scale: isMobile ? 1 : 0.95 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
        style={{
          width: isMobile ? "100%" : 900,
          maxHeight: isMobile ? "92dvh" : "88vh",
          background: "#fff",
          borderRadius: isMobile ? "28px 28px 0 0" : 36,
          overflow: "hidden",
          display: "flex",
          flexDirection: isMobile ? "column" : "row-reverse",
          position: "relative",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, left: 16,
            background: "rgba(0,0,0,0.15)", border: "none",
            width: 36, height: 36, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", zIndex: 10,
          }}
        >
          <X size={18} color="#fff" />
        </button>

        {/* IMAGE AREA */}
        <div style={{
          flex: isMobile ? "0 0 44%" : "1.2",
          background: "#F5F5F7",
          position: "relative",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
          minHeight: isMobile ? 240 : "auto",
        }}>
          <button onClick={(e) => { e.stopPropagation(); onPrev(); }}
            style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.9)", border: "none", width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 5, boxShadow: "0 2px 10px rgba(0,0,0,0.12)" }}>
            <ChevronRight size={18} color="#1D1D1F" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onNext(); }}
            style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.9)", border: "none", width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 5, boxShadow: "0 2px 10px rgba(0,0,0,0.12)" }}>
            <ChevronLeft size={18} color="#1D1D1F" />
          </button>

          <AnimatePresence mode="wait">
            <motion.img
              key={offer.id}
              src={offer.img}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.22 }}
              style={{ maxWidth: "80%", maxHeight: isMobile ? 220 : "70%", objectFit: "contain" }}
              alt={offer.productName}
            />
          </AnimatePresence>

          {/* Thumbnail strip */}
          <div style={{
            position: "absolute", bottom: 10, left: 0, right: 0,
            display: "flex", justifyContent: "center", gap: 6, padding: "0 10px",
          }}>
            {OFFERS.map((o, i) => (
              <button key={o.id} onClick={(e) => { e.stopPropagation(); const idx = OFFERS.indexOf(o); /* handled via onPrev/onNext from parent */ }}
                style={{
                  width: 44, height: 44, borderRadius: 10,
                  border: o.id === offer.id ? "2px solid #0055CC" : "2px solid transparent",
                  background: "#fff",
                  padding: 2, cursor: "pointer",
                  boxShadow: o.id === offer.id ? "0 2px 8px rgba(0,85,204,0.3)" : "0 1px 4px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  flexShrink: 0,
                  position: "relative",
                }}
              >

                <img src={o.img} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} alt={o.productName} />
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT AREA */}
        <div style={{
          flex: 1,
          padding: isMobile ? "20px 20px 28px" : "48px 40px",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          overflowY: "auto",
        }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#0055CC", marginBottom: 6, letterSpacing: "0.05em" }}>
              הטבה {offer.num} · {offer.brand}
            </p>
            <AnimatePresence mode="wait">
              <motion.h3
                key={offer.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                style={{ fontSize: isMobile ? 22 : 32, fontWeight: 900, color: "#15172A", lineHeight: 1.2, marginBottom: 10 }}
              >
                {offer.productName}
              </motion.h3>
            </AnimatePresence>
            <p style={{ fontSize: 14, color: "#6E6E73", lineHeight: 1.55, marginBottom: 24 }}>
              {offer.desc}
            </p>
          </div>

          <div>
            <div style={{ display: "flex", flexDirection: "row", gap: 8, marginBottom: 28 }}>
              <PriceTag label={offer.labelOld} amount={offer.priceOld} color="#86868B" bg="rgba(0,0,0,0.04)" strike />
              <PriceTag label="מחיר לעובדים" amount={offer.priceNew} color="#0055CC" bg="#EEF4FF" />
              <PriceTag label="חיסכון" amount={offer.saving} color="#1A7A43" bg="rgba(52,199,89,0.09)" />
            </div>


          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function FeaturedOffersSlider() {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStart = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const go = (dir) => setIndex((p) => (p + dir + OFFERS.length) % OFFERS.length);

  const openModal = (i) => setSelectedIdx(i);
  const closeModal = () => setSelectedIdx(null);

  const modalPrev = () => setSelectedIdx((p) => (p - 1 + OFFERS.length) % OFFERS.length);
  const modalNext = () => setSelectedIdx((p) => (p + 1) % OFFERS.length);

  return (
    <section id="offers-slider" style={{ background: "#FFFFFF", padding: "80px 0", direction: "rtl", overflowX: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center", padding: "0 16px" }}>
        <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, marginBottom: "10px", color: "#15172A", letterSpacing: "-0.03em" }}>
          ככה אנחנו מגדילים לכם את הנטו
        </h2>
        <p style={{ color: "#86868B", marginBottom: "52px", fontSize: "clamp(15px, 2vw, 18px)", fontWeight: 400 }}>
          דוגמאות להטבות אמיתיות עם חיסכון חריג לעובדים
        </p>

        {/* ── CAROUSEL ── */}
        <div
          onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const diff = touchStart.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
          }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 440, perspective: "1500px", position: "relative" }}
        >
          <button
            onClick={() => go(-1)}
            style={{ position: "absolute", right: isMobile ? 2 : -16, zIndex: 50, width: 44, height: 44, borderRadius: "50%", background: "#fff", border: "1.5px solid rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", outline: "none" }}
          >
            <ChevronRight size={22} color="#1D1D1F" />
          </button>
          <button
            onClick={() => go(1)}
            style={{ position: "absolute", left: isMobile ? 2 : -16, zIndex: 50, width: 44, height: 44, borderRadius: "50%", background: "#fff", border: "1.5px solid rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", outline: "none" }}
          >
            <ChevronLeft size={22} color="#1D1D1F" />
          </button>

          {OFFERS.map((offer, i) => {
            const offset = i - index;
            const n = OFFERS.length;
            const circOffset = offset > n / 2 ? offset - n : offset < -n / 2 ? offset + n : offset;
            const circAbs = Math.abs(circOffset);
            if (circAbs > 4) return null;
            const isCenter = circOffset === 0;

            return (
              <motion.div
                key={offer.id}
                onClick={() => isCenter ? openModal(i) : setIndex(i)}
                animate={{
                  x: circOffset * (isMobile ? 200 : 230),
                  scale: isCenter ? 1.1 : 0.8,
                  rotateY: circOffset * -24,
                  z: isCenter ? 150 : -80,
                  filter: isCenter ? "none" : `blur(${Math.min(circAbs * 1.5, 4)}px) brightness(${0.8 - circAbs * 0.1})`,
                }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: "absolute", width: 260, cursor: "pointer", zIndex: 10 - circAbs, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
              >
                <div style={{ width: "100%", height: 340, background: "#F5F5F7", borderRadius: 28, overflow: "hidden", boxShadow: isCenter ? "0 28px 70px rgba(0,0,0,0.14)" : "0 6px 20px rgba(0,0,0,0.06)", position: "relative" }}>
  
                  <img src={offer.img} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} alt={offer.productName} />
                </div>

                {isCenter && (
                  <motion.div
                    animate={{ boxShadow: ["0 0 0px rgba(37,99,235,0)", "0 0 12px rgba(37,99,235,0.5)", "0 0 0px rgba(37,99,235,0)"] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: "90%", background: "rgba(255,255,255,0.55)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(37,99,235,0.25)", borderRadius: 14, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#0055CC", margin: 0 }}>לחצו לגלות את פרטי ההטבה</p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        <Dots active={index} onSelect={setIndex} />
        <p style={{ fontSize: 12, color: "#AEAEB2", marginTop: 16 }}>החליקו ימינה/שמאלה או לחצו על החיצים</p>
      </div>

      <AnimatePresence>
        {selectedIdx !== null && (
          <OfferModal
            offer={OFFERS[selectedIdx]}
            isMobile={isMobile}
            onClose={closeModal}
            onPrev={modalPrev}
            onNext={modalNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}