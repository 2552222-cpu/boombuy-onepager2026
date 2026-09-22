import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { base44 } from "@/api/base44Client";

// ─── OFFERS DATA (single source of truth — kept unchanged) ──────────────────
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
    desc: "נעלי SAMBA · אדידס דגם samba og · במחיר בלעדי לעובדים.",
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
    desc: "סט 3 מזוודות קשיחות Kate Hill עם חומר PC מתרחב, גלגלים 360°, מנעול קומבינציה. גדלים: 20״, 24״, 28״ · שנה אחריות יבואן רשמי.",
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
    desc: "המחזמר קזבלן בכיכובו של איתי לוי · הבימה · כרטיס בלעדי לעובדים במחיר מיוחד.",
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
    desc: "טייץ יוגה פרימיום של Alo Yoga · בד נושם, גמיש ומחמיא · במחיר בלעדי לעובדים.",
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
    desc: "לילה מפנק ב-BoBo תל אביב · כולל לינה, עיסוי זוגי וארוחת בוקר זוגית.",
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
    desc: "מכונת נספרסו Inissia כולל מקציף חלב, 60 קפסולות ומשלוח · הכל במחיר בלעדי לעובדים.",
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
    desc: "סמסונג גלאקסי S25+ · מסך 6.7 אינץ׳ · מצלמה משולשת · AI מובנה · במחיר יבואן בלעדי.",
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
    desc: "iPhone 16 Pro · מעבד A18 Pro · מצלמה 48MP · טיטניום · במחיר בלעדי לעובדים.",
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

const GAP = 16;

function perViewFor(width) {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

function cardWidthFor(containerWidth, pv) {
  if (pv === 1) return Math.round(containerWidth * 0.82);
  return Math.round((containerWidth - (pv - 1) * GAP) / pv);
}

function PriceTag({ label, amount, color = "#1D1D1F", bg = "#F5F5F7", strike = false }) {
  return (
    <div style={{ flex: 1, minWidth: 0, background: bg, borderRadius: 14, border: "1px solid rgba(0,0,0,0.06)", padding: "10px 6px", textAlign: "center", boxSizing: "border-box" }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: "#86868B", marginBottom: 5, letterSpacing: "0.02em", lineHeight: 1.2 }}>{label}</p>
      <span style={{ display: "inline-flex", flexDirection: "row", alignItems: "baseline", gap: 2, textDecoration: strike ? "line-through" : "none" }}>
        <span style={{ fontSize: 18, fontWeight: 900, color, lineHeight: 1 }}>{amount}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color }}>₪</span>
      </span>
    </div>
  );
}

// ─── MODAL (focus management, Escape, restore focus) ──────────────────────────
function OfferModal({ offer, isMobile, onClose, onPrev, onNext, onSelectIdx, openerEl }) {
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("offersModalChange", { detail: { open: true } }));
    closeBtnRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.dispatchEvent(new CustomEvent("offersModalChange", { detail: { open: false } }));
      document.removeEventListener("keydown", onKey);
      try {
        openerEl?.focus?.();
      } catch (e) {
        /* ignore */
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offer.id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.8)",
        zIndex: 2000,
        display: "flex",
        alignItems: isMobile ? "flex-end" : "center",
        justifyContent: "center",
        padding: isMobile ? 0 : 20,
      }}
    >
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, y: isMobile ? 60 : 0, scale: isMobile ? 1 : 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: isMobile ? 60 : 0, scale: isMobile ? 1 : 0.96 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
        role="dialog"
        aria-modal="true"
        aria-label={`פרטי הטבה: ${offer.productName}`}
        style={{
          width: isMobile ? "100%" : 900,
          maxHeight: isMobile ? "92dvh" : "88vh",
          background: "#fff",
          borderRadius: isMobile ? "28px 28px 0 0" : 36,
          overflow: "hidden",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          position: "relative",
          overflowY: "auto",
        }}
      >
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="סגירה"
          style={{ position: "absolute", top: 16, left: 16, background: "rgba(0,0,0,0.15)", border: "none", width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 10 }}
        >
          <X size={18} color="#fff" />
        </button>

        <div style={{ flex: isMobile ? "none" : "1.2", background: "#F5F5F7", display: "flex", flexDirection: "column", overflow: "hidden", minHeight: isMobile ? 280 : "auto" }}>
          <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <button onClick={onPrev} aria-label="הטבה הקודמת" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.06)", border: "none", width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 5 }}>
              <ChevronRight size={22} color="#1D1D1F" />
            </button>
            <button onClick={onNext} aria-label="הטבה הבאה" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.06)", border: "none", width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 5 }}>
              <ChevronLeft size={22} color="#1D1D1F" />
            </button>
            <img src={offer.img} alt={offer.productName} style={{ maxWidth: "82%", maxHeight: isMobile ? 220 : 360, objectFit: "contain" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "10px 12px", overflowX: "auto", flexWrap: "nowrap", scrollbarWidth: "none", background: "#F5F5F7", flexShrink: 0 }}>
            {OFFERS.map((o) => (
              <button key={o.id} onClick={() => onSelectIdx(OFFERS.indexOf(o))} aria-label={`עבור ל${o.productName}`} aria-current={o.id === offer.id} style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0, border: o.id === offer.id ? "2px solid #17191D" : "2px solid transparent", background: "#fff", padding: 2, cursor: "pointer", overflow: "hidden" }}>
                <img src={o.img} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} alt={o.productName} />
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, padding: isMobile ? "20px 20px 28px" : "48px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between", overflowY: "auto" }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#F47A5A", marginBottom: 6, letterSpacing: "0.05em" }}>{offer.brand}</p>
            <h3 style={{ fontSize: isMobile ? 22 : 32, fontWeight: 900, color: "#15172A", lineHeight: 1.2, marginBottom: 10 }}>{offer.productName}</h3>
            <p style={{ fontSize: 15, color: "#6E6E73", lineHeight: 1.6, marginBottom: 24 }}>{offer.desc}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            <PriceTag label={offer.labelOld} amount={offer.priceOld} color="#86868B" bg="rgba(0,0,0,0.04)" strike />
            <PriceTag label="מחיר לעובדים" amount={offer.priceNew} color="#17191D" bg="#FBFAF8" />
            <PriceTag label="חיסכון" amount={offer.saving} color="#1A7A43" bg="rgba(52,199,89,0.10)" />
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
  const [pv, setPv] = useState(3);
  const [cardW, setCardW] = useState(320);
  const [dragDelta, setDragDelta] = useState(0);
  const secRef = useRef(null);
  const viewportRef = useRef(null);
  const firedBenefitsView = useRef(false);
  const openerRef = useRef(null);

  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const lastDxRef = useRef(0);
  const pointerIdRef = useRef(null);
  const suppressClickRef = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Measure the actual viewport width → cards per view + card width (after mount + resize)
  useEffect(() => {
    const measure = () => {
      const el = viewportRef.current;
      if (!el) return;
      const w = el.clientWidth;
      if (w <= 0) return;
      const nextPv = perViewFor(w);
      setPv(nextPv);
      setCardW(cardWidthFor(w, nextPv));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !firedBenefitsView.current) {
            firedBenefitsView.current = true;
            try {
              base44.analytics.track({ eventName: "benefits_viewed" });
            } catch (err) {
              /* ignore */
            }
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const maxIndex = Math.max(0, OFFERS.length - pv);
  const step = cardW + GAP;
  const baseTranslate = Math.min(index, maxIndex) * step;
  const translate = draggingRef.current ? baseTranslate + lastDxRef.current : baseTranslate;

  // Keep index within bounds when the viewport (pv) changes
  useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(0, OFFERS.length - pv)));
  }, [pv]);

  const go = useCallback(
    (dir) => {
      setIndex((p) => Math.max(0, Math.min(OFFERS.length - pv, p + dir)));
    },
    [pv]
  );

  // ── Pointer drag (horizontal). touch-action: pan-y keeps vertical page scroll working.
  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    draggingRef.current = true;
    startXRef.current = e.clientX;
    lastDxRef.current = 0;
    pointerIdRef.current = e.pointerId;
    suppressClickRef.current = false;
    try {
      viewportRef.current?.setPointerCapture(e.pointerId);
    } catch (err) {
      /* ignore */
    }
  };
  const onPointerMove = (e) => {
    if (!draggingRef.current || e.pointerId !== pointerIdRef.current) return;
    const dx = e.clientX - startXRef.current;
    if (Math.abs(dx) > 6) suppressClickRef.current = true;
    // clamp translate within [0, maxIndex*step]
    const maxT = maxIndex * step;
    let t = baseTranslate + dx;
    if (t < 0) t = 0;
    if (t > maxT) t = maxT;
    lastDxRef.current = t - baseTranslate;
    setDragDelta(t - baseTranslate);
  };
  const endDrag = (e) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    try {
      viewportRef.current?.releasePointerCapture?.(e?.pointerId);
    } catch (err) {
      /* ignore */
    }
    const dx = lastDxRef.current;
    setDragDelta(0);
    if (Math.abs(dx) < step * 0.2) return; // snap back, no change
    setIndex((p) => {
      const next = dx > 0 ? p + 1 : p - 1; // drag right (dx>0) → next in RTL
      return Math.max(0, Math.min(maxIndex, next));
    });
  };
  const onPointerUp = (e) => endDrag(e);
  const onPointerCancel = (e) => {
    draggingRef.current = false;
    setDragDelta(0);
  };

  const openModal = (i, btnEl) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    try {
      base44.analytics.track({ eventName: "benefit_opened" });
    } catch (err) {
      /* ignore */
    }
    openerRef.current = btnEl;
    setSelectedIdx(i);
  };
  const closeModal = () => setSelectedIdx(null);
  const modalPrev = () => setSelectedIdx((p) => (p - 1 + OFFERS.length) % OFFERS.length);
  const modalNext = () => setSelectedIdx((p) => (p + 1) % OFFERS.length);

  return (
    <section id="benefits" ref={secRef} dir="rtl" style={{ background: "#FFFFFF", padding: "80px 0", fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 16px", textAlign: "center" }}>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: "clamp(28px,4.6vw,46px)", fontWeight: 800, color: "#17191D", letterSpacing: "-0.03em", lineHeight: 1.08, margin: "0 0 14px" }}
        >
          הטבות שמתחלפות. <span style={{ color: "#F47A5A" }}>ערך שמתחדש.</span>
        </motion.h2>
        <p style={{ fontSize: "clamp(16px,1.4vw,20px)", color: "#3A3C42", lineHeight: 1.5, maxWidth: 640, margin: "0 auto 10px" }}>
          דוגמאות אמיתיות להטבות לעובדים מהתקופה האחרונה.
        </p>
        <p style={{ fontSize: 15, color: "#6E6E73", lineHeight: 1.55, maxWidth: 600, margin: "0 auto 36px" }}>
          הפלטפורמה מתעדכנת בהזדמנויות חדשות לאורך השנה.
        </p>

        {/* Controls */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 18 }}>
          <button type="button" onClick={() => go(-1)} disabled={index <= 0} aria-label="הטבה הקודמת" style={navBtn(index <= 0)}>
            <ChevronRight size={22} color="#17191D" />
          </button>
          <div style={{ display: "flex", gap: 6 }}>
            {OFFERS.map((_, i) => (
              <button key={i} onClick={() => setIndex(Math.min(i, maxIndex))} aria-label={`עבור להטבה ${i + 1}`} style={{ width: i === index ? 22 : 8, height: 8, borderRadius: 999, background: i === index ? "#F47A5A" : "rgba(19,21,29,0.16)", border: "none", padding: 0, cursor: "pointer", transition: "all .25s ease" }} />
            ))}
          </div>
          <button type="button" onClick={() => go(1)} disabled={index >= maxIndex} aria-label="הטבה הבאה" style={navBtn(index >= maxIndex)}>
            <ChevronLeft size={22} color="#17191D" />
          </button>
        </div>

        {/* Viewport (overflow hidden; track translated) */}
        <div
          ref={viewportRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          style={{
            overflow: "hidden",
            touchAction: "pan-y",
            cursor: draggingRef.current ? "grabbing" : "grab",
            paddingBottom: 6,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: GAP,
              transform: `translateX(${translate}px)`,
              transition: draggingRef.current ? "none" : "transform .42s cubic-bezier(0.22,1,0.36,1)",
              willChange: "transform",
            }}
          >
            {OFFERS.map((offer, i) => (
              <div
                key={offer.id}
                style={{
                  flex: `0 0 ${cardW}px`,
                  background: "#FBFAF8",
                  borderRadius: 22,
                  border: "1px solid rgba(19,21,25,0.07)",
                  boxShadow: "0 8px 26px rgba(19,21,25,0.06)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ width: "100%", height: isMobile ? 190 : 210, background: "#F5F5F7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={offer.img} loading={i < 3 ? "eager" : "lazy"} alt={offer.productName} style={{ maxWidth: "86%", maxHeight: "92%", objectFit: "contain" }} draggable={false} />
                </div>
                <div style={{ padding: "16px 18px 18px", display: "flex", flexDirection: "column", gap: 10, textAlign: "right", flex: 1 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#F47A5A", margin: 0, letterSpacing: "0.04em" }}>{offer.brand}</p>
                  <h3 style={{ fontSize: isMobile ? 18 : 20, fontWeight: 800, color: "#17191D", lineHeight: 1.25, margin: 0, minHeight: 46 }}>{offer.productName}</h3>
                  <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                    <PriceTag label="שוק" amount={offer.priceOld} color="#86868B" bg="rgba(0,0,0,0.04)" strike />
                    <PriceTag label="לעובדים" amount={offer.priceNew} color="#17191D" bg="#fff" />
                    <PriceTag label="חיסכון" amount={offer.saving} color="#1A7A43" bg="rgba(52,199,89,0.10)" />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => openModal(i, e.currentTarget)}
                    aria-label={`פרטי ההטבה: ${offer.productName}`}
                    style={{
                      marginTop: "auto",
                      background: "#17191D",
                      color: "#fff",
                      border: "none",
                      borderRadius: 12,
                      height: 46,
                      fontFamily: "inherit",
                      fontWeight: 700,
                      fontSize: 15,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    פרטי ההטבה
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontSize: 13, color: "#9AA0A6", lineHeight: 1.5, maxWidth: 620, margin: "18px auto 0" }}>
          הדוגמאות ממחישות הטבות שהוצעו לאחרונה. הזמינות והתנאים משתנים.
        </p>

        <div style={{ marginTop: 36, display: "flex", justifyContent: "center" }}>
          <button
            type="button"
            onClick={() => document.getElementById("organization-fit")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            style={{
              background: "#17191D",
              color: "#fff",
              border: "none",
              borderRadius: 999,
              height: 56,
              minWidth: 240,
              maxWidth: 360,
              padding: "0 30px",
              fontFamily: "inherit",
              fontWeight: 700,
              fontSize: "clamp(16px,1.1vw,18px)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              boxShadow: "0 8px 24px rgba(23,25,29,0.18)",
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#F47A5A", display: "inline-block", flexShrink: 0 }} />
            בדיקת התאמה לארגון
          </button>
        </div>
      </div>

      <AnimatePresence>
        {selectedIdx !== null && (
          <OfferModal
            offer={OFFERS[selectedIdx]}
            isMobile={isMobile}
            onClose={closeModal}
            onPrev={modalPrev}
            onNext={modalNext}
            onSelectIdx={setSelectedIdx}
            openerEl={openerRef.current}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function navBtn(disabled) {
  return {
    width: 48,
    height: 48,
    borderRadius: "50%",
    background: "#fff",
    border: "1.5px solid rgba(0,0,0,0.10)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.4 : 1,
    boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
  };
}