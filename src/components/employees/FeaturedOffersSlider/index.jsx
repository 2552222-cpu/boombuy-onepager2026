import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import ILS from "../ILS";

// ─── OFFERS DATA ──────────────────────────────────────────────────────────────
const OFFERS = [
  {
    id: "kitan",
    num: 1,
    cat: "כל בוקר הטבה חדשה",
    brand: "Kitan",
    productName: "שמיכת מזגן קיצית מפנקת",
    labelOld: "מחיר כיתן",
    priceOld: "449",
    priceNew: "139",
    saving: "310",
    desc: "שמיכת מזגן קיצית מפנקת של כיתן במחיר בלעדי לעובדים.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/8fb586f26_-2026-03-15T180501791.png",
  },
  {
    id: "samba",
    num: 2,
    cat: "כל בוקר הטבה חדשה",
    brand: "Adidas",
    productName: "נעלי SAMBA (אדידס דגם samba og)",
    labelOld: "מחיר אדידס",
    priceOld: "519",
    priceNew: "299",
    saving: "220",
    desc: "נעלי סמבה אדידס — הדגם המבוקש בעולם במחיר בלעדי לעובדים.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/b7485969d_-2026-02-18T150744909.png",
  },
  {
    id: "swiss",
    num: 3,
    cat: "כל בוקר הטבה חדשה",
    brand: "Swiss",
    productName: "סט 3 מזוודות קשיחות",
    labelOld: "מחיר שוק",
    priceOld: "699",
    priceNew: "199",
    saving: "500",
    desc: "סט 3 מזוודות קשיחות Swiss — ישירות מהיבואן.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/28598db7e_-2026-03-15T180501791.png",
  },
  {
    id: "gaming",
    num: 4,
    cat: "כל בוקר הטבה חדשה",
    brand: "Yoko",
    productName: "כסא גיימינג מקצועי יוקו",
    labelOld: "מחיר שוק",
    priceOld: "1,090",
    priceNew: "120",
    saving: "970",
    desc: "כסא גיימינג מקצועי יוקו בהנחה חריגה לעובדים.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3f27a30a4_.png",
  },
  {
    id: "bedding",
    num: 5,
    cat: "כל בוקר הטבה חדשה",
    brand: "Golf & Co",
    productName: "סט מצעי ג'רסי 100% כותנה סרוקה",
    labelOld: "מחיר ברשת",
    priceOld: "749",
    priceNew: "269",
    saving: "480",
    desc: "סט מצעי ג'רסי 100% כותנה סרוקה Golf & Co במחיר מיוחד לעובדים.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/ccb0d029b_-2026-02-18T145838528.png",
  },
  {
    id: "concert",
    num: 6,
    cat: "כל בוקר הטבה חדשה",
    brand: "כרטיס הופעה",
    productName: "כרטיס הופעה",
    labelOld: "מחיר שוק",
    priceOld: "290",
    priceNew: "99",
    saving: "191",
    desc: "הופעות חיות, מופעים ואירועי תרבות — במחיר בלעדי לעובדים.",
    img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/a4b03713f_-2026-03-22T142532392.png",
  },
];

const CLEAN_OFFERS = OFFERS;
const DEFAULT_INDEX = 0;

// ─── PRICE TAG ────────────────────────────────────────────────────────────────
function PriceTag({ label, amount, color = "#1D1D1F", bg = "#F5F5F7", strike = false }) {
  const num = String(amount ?? "").replace(/[^\d,]/g, "");
  return (
    <div style={{
      flex: 1,
      minWidth: 0,
      background: bg,
      borderRadius: 16,
      border: "1px solid rgba(0,0,0,0.06)",
      padding: "10px 6px",
      textAlign: "center",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: "#86868B", marginBottom: 5, letterSpacing: "0.02em", lineHeight: 1.2 }}>{label}</p>
      <span style={{ display: "inline-flex", flexDirection: "row", alignItems: "baseline", gap: 2, textDecoration: strike ? "line-through" : "none" }}>
        <span style={{ fontSize: 18, fontWeight: 900, color, lineHeight: 1 }}>{num}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color }}>₪</span>
      </span>
    </div>
  );
}

// ─── DOT INDICATOR ────────────────────────────────────────────────────────────
function Dots({ items, active, onSelect }) {
  if (!items || items.length === 0) return null;
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20 }}>
      {items.map((item, i) => (
        <button
          key={item.id}
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

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function FeaturedOffersSlider() {
  const [selectedId, setSelectedId] = useState(null);
  const [index, setIndex] = useState(DEFAULT_INDEX);
  const [isMobile, setIsMobile] = useState(false);
  const touchStart = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const selectedOffer = CLEAN_OFFERS.find((o) => o.id === selectedId);
  const go = (dir) => setIndex((p) => (p + dir + CLEAN_OFFERS.length) % CLEAN_OFFERS.length);

  const openModal = (id) => {
    setSelectedId(id);
    window.dispatchEvent(new CustomEvent("offersModalChange", { detail: { open: true } }));
  };
  const closeModal = () => {
    setSelectedId(null);
    window.dispatchEvent(new CustomEvent("offersModalChange", { detail: { open: false } }));
  };

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
          {/* Nav arrows — always visible */}
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

          {CLEAN_OFFERS.map((offer, i) => {
            const offset = i - index;
            const circOffset = offset > CLEAN_OFFERS.length / 2 ? offset - CLEAN_OFFERS.length : offset < -CLEAN_OFFERS.length / 2 ? offset + CLEAN_OFFERS.length : offset;
            const circAbs = Math.abs(circOffset);
            if (circAbs > 4) return null;
            const isCenter = circOffset === 0;

            return (
              <motion.div
                key={offer.id}
                onClick={() => isCenter ? openModal(offer.id) : setIndex(i)}
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
                {/* Card image */}
                <div style={{ width: "100%", height: 340, background: "#F5F5F7", borderRadius: 28, overflow: "hidden", boxShadow: isCenter ? "0 28px 70px rgba(0,0,0,0.14)" : "0 6px 20px rgba(0,0,0,0.06)", position: "relative" }}>
                  <div style={{ position: "absolute", top: 12, right: 12, zIndex: 5, background: "#0055CC", color: "#fff", fontWeight: 900, fontSize: 14, width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {offer.num}
                  </div>
                  <img src={offer.img} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} alt={offer.productName} />
                </div>

                {/* Tap hint — only on center */}
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

        {/* Dot indicators */}
        <Dots items={CLEAN_OFFERS} active={index} onSelect={setIndex} />

        {/* Current offer name hint */}
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            style={{ marginTop: 14, fontSize: 14, fontWeight: 700, color: "#1D1D1F" }}
          >
            {CLEAN_OFFERS[index].productName}
          </motion.p>
        </AnimatePresence>
        <p style={{ fontSize: 12, color: "#AEAEB2", marginTop: 4 }}>החליקו ימינה/שמאלה או לחצו על החיצים</p>
      </div>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selectedId && selectedOffer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(20px)", zIndex: 2000, display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center", padding: isMobile ? 0 : 20 }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 60 : 0, scale: isMobile ? 1 : 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: isMobile ? 60 : 0, scale: isMobile ? 1 : 0.95 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: isMobile ? "100%" : 900,
                maxHeight: isMobile ? "92dvh" : "88vh",
                background: "#fff",
                borderRadius: isMobile ? "28px 28px 0 0" : 36,
                overflow: "hidden",
                display: "flex",
                flexDirection: isMobile ? "column" : "row-reverse",
              }}
              dir="rtl"
            >
              {/* Close */}
              <button
                onClick={closeModal}
                style={{ position: "absolute", top: 16, left: 16, background: "rgba(0,0,0,0.15)", border: "none", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 10 }}
              >
                <X size={18} color="#fff" />
              </button>

              {/* IMAGE AREA */}
              <div style={{ flex: isMobile ? "0 0 44%" : "1.2", background: "#F5F5F7", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", minHeight: isMobile ? 240 : "auto" }}>
                <button
                  onClick={(e) => { e.stopPropagation(); const prevIdx = (CLEAN_OFFERS.findIndex(o=>o.id===selectedId) - 1 + CLEAN_OFFERS.length) % CLEAN_OFFERS.length; go(-1); setSelectedId(CLEAN_OFFERS[prevIdx].id); }}
                  style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.9)", border: "none", width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 5, boxShadow: "0 2px 10px rgba(0,0,0,0.12)" }}
                >
                  <ChevronRight size={18} color="#1D1D1F" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); const nextIdx = (CLEAN_OFFERS.findIndex(o=>o.id===selectedId) + 1) % CLEAN_OFFERS.length; go(1); setSelectedId(CLEAN_OFFERS[nextIdx].id); }}
                  style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.9)", border: "none", width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 5, boxShadow: "0 2px 10px rgba(0,0,0,0.12)" }}
                >
                  <ChevronLeft size={18} color="#1D1D1F" />
                </button>
                <img src={selectedOffer.img} style={{ maxWidth: "80%", maxHeight: isMobile ? 220 : "70%", objectFit: "contain" }} alt={selectedOffer.productName} />
              </div>

              {/* CONTENT AREA */}
              <div style={{ flex: 1, padding: isMobile ? "20px 20px 28px" : "48px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between", overflowY: "auto" }}>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#0055CC", marginBottom: 6, letterSpacing: "0.05em" }}>
                    {selectedOffer.cat} · {selectedOffer.brand}
                  </p>
                  <h3 style={{ fontSize: isMobile ? 22 : 32, fontWeight: 900, color: "#15172A", lineHeight: 1.2, marginBottom: 10 }}>
                    {selectedOffer.productName}
                  </h3>
                  <p style={{ fontSize: 14, color: "#6E6E73", lineHeight: 1.55, marginBottom: 24 }}>
                    {selectedOffer.desc}
                  </p>
                </div>

                {/* 3 glass price cards */}
                <div>
                  <div style={{ display: "flex", flexDirection: "row", gap: 8, marginBottom: 28 }}>
                    <PriceTag
                      label={selectedOffer.labelOld}
                      amount={selectedOffer.priceOld}
                      color="#86868B"
                      bg="rgba(0,0,0,0.04)"
                      strike
                    />
                    <PriceTag
                      label="מחיר לעובדים"
                      amount={selectedOffer.priceNew}
                      color="#0055CC"
                      bg="#EEF4FF"
                    />
                    <PriceTag
                      label="חיסכון"
                      amount={selectedOffer.saving}
                      color="#1A7A43"
                      bg="rgba(52,199,89,0.09)"
                    />
                  </div>

                  <button
                    onClick={() => {
                      closeModal();
                      setTimeout(() => {
                        const el = document.getElementById("survey-section");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                        else window.location.href = "/#survey-section";
                      }, 120);
                    }}
                    style={{ width: "100%", background: "#0055CC", color: "#fff", border: "none", padding: "18px", borderRadius: 22, fontSize: 16, fontWeight: 900, cursor: "pointer", boxShadow: "0 12px 32px rgba(0,85,204,0.3)" }}
                  >
                    אני רוצה לבדוק התאמה לארגון שלי ←
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