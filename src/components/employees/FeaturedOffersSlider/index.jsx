import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { scrollToId } from "../uiHelpers";
import { fitImg } from "@/lib/img";

// ─── OFFERS DATA (9 items — preserved exactly, per-item labelOld) ────────────
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

const CHARCOAL = "#17191D";
const CORAL = "#F47A5A";
const STRIKE = "#6E7177";

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

// ─── MODAL — lifecycle split from offer content ───────────────────────────────
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
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
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
        aria-label={`פרטי ההטבה: ${offer.productName}`}
        style={{
          width: isMobile ? "100%" : 900,
          maxHeight: isMobile ? "92dvh" : "88vh",
          background: "#fff",
          borderRadius: isMobile ? "28px 28px 0 0" : 36,
          overflow: "hidden",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 12, left: 12, zIndex: 10 }}>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="סגירה"
            style={{
              background: "rgba(0,0,0,0.15)", border: "none",
              width: 44, height: 44, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={20} color="#fff" />
          </button>
        </div>

        <div style={{ flex: isMobile ? "none" : "1.2", background: "#F5F5F7", display: "flex", flexDirection: "column", overflow: "hidden", minHeight: isMobile ? 240 : "auto" }}>
          <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <button onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="הטבה הקודמת" style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.06)", border: "none", width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 5 }}>
              <ChevronRight size={22} color="#1D1D1F" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="הטבה הבאה" style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.06)", border: "none", width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 5 }}>
              <ChevronLeft size={22} color="#1D1D1F" />
            </button>
            <img src={fitImg(offer.img, 640, 780)} alt={offer.productName} width={640} height={780} decoding="async" loading="lazy" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = offer.img; }} style={{ maxWidth: "82%", maxHeight: isMobile ? 200 : 340, objectFit: "contain" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "10px 12px", overflowX: "auto", flexWrap: "nowrap", scrollbarWidth: "none", background: "#F5F5F7", flexShrink: 0 }}>
            {OFFERS.map((o) => (
              <button key={o.id} onClick={(e) => { e.stopPropagation(); onSelectIdx(OFFERS.indexOf(o)); }} aria-label={`עבור ל${o.productName}`} aria-current={o.id === offer.id} style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0, border: o.id === offer.id ? "2px solid #17191D" : "2px solid transparent", background: "#fff", padding: 2, cursor: "pointer", overflow: "hidden" }}>
                <img src={fitImg(o.img, 96, 96)} width={40} height={40} alt={o.productName} loading="lazy" decoding="async" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = o.img; }} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, padding: isMobile ? "20px 20px 28px" : "48px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between", overflowY: "auto" }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#C24A2C", marginBottom: 6, letterSpacing: "0.05em" }}>{offer.brand}</p>
            <h3 style={{ fontSize: isMobile ? 22 : 32, fontWeight: 900, color: "#15172A", lineHeight: 1.2, marginBottom: 10 }}>{offer.productName}</h3>
            <p style={{ fontSize: 15, color: "#6E7177", lineHeight: 1.6, marginBottom: 24 }}>{offer.desc}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            <PriceTag label={offer.labelOld} amount={offer.priceOld} color={STRIKE} bg="rgba(0,0,0,0.04)" strike />
            <PriceTag label="מחיר לעובדים" amount={offer.priceNew} color={CHARCOAL} bg="#FBFAF8" />
            <PriceTag label="חיסכון" amount={offer.saving} color="#1A7A43" bg="rgba(52,199,89,0.10)" />
          </div>

          <div style={{ marginTop: 22, textAlign: "right" }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#3A3C42", margin: "0 0 10px" }}>ככה זה הגיע לעובדים, בשם הארגון:</p>
            <div style={{ background: "#E7F6E3", borderRadius: "18px 18px 4px 18px", padding: "14px 16px", position: "relative", maxWidth: 460 }}>
              <p style={{ fontSize: 15, color: "#1A1A1A", lineHeight: 1.55, margin: 0 }}>
                ☀️ ההטבה של הבוקר ממועדון ההטבות של [שם הארגון]: {offer.productName} ב־₪{offer.priceNew} במקום ₪{offer.priceOld}. היום בלבד.
              </p>
              <span style={{ display: "block", fontSize: 11, color: "#5A7A4A", marginTop: 6, textAlign: "left" }}>07:30 ✓✓</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const SPRING = { type: "spring", stiffness: 260, damping: 32, mass: 0.9 };

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function FeaturedOffersSlider() {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [frameW, setFrameW] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const secRef = useRef(null);
  const viewportRef = useRef(null);
  const firedBenefitsView = useRef(false);
  const openerRef = useRef(null);

  // drag state
  const dragRef = useRef({ active: false, startX: 0, startY: 0, axis: null, lastDx: 0, lastT: 0 });
  // suppress the click that follows a real horizontal drag (don't open the modal)
  const suppressClickRef = useRef(false);
  const wheelLockRef = useRef(0);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
    };
    check();
    window.addEventListener("resize", check);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMq = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", onMq);
    return () => {
      window.removeEventListener("resize", check);
      mq.removeEventListener?.("change", onMq);
    };
  }, []);

  useEffect(() => {
    const measure = () => {
      const el = viewportRef.current;
      if (el) setFrameW(el.clientWidth);
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

  const go = useCallback((dir) => {
    setIndex((p) => (p + dir + OFFERS.length) % OFFERS.length);
  }, []);

  // ── Pointer drag: lock only when horizontal dominates; vertical page scroll works ─
  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragRef.current = { active: true, startX: e.clientX, startY: e.clientY, axis: null, lastDx: 0, lastT: e.timeStamp };
    setDragging(true);
    try {
      viewportRef.current?.setPointerCapture?.(e.pointerId);
    } catch (err) {
      /* ignore */
    }
  };
  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d.active) return;
    const dx = d.startX - e.clientX;
    const dy = d.startY - e.clientY;
    if (!d.axis && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      d.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }
    if (d.axis === "x") {
      if (Math.abs(dx) > 8) suppressClickRef.current = true;
      setDragOffset(dx);
      d.lastDx = dx;
      d.lastT = e.timeStamp;
    }
  };
  const endDrag = (e) => {
    const d = dragRef.current;
    if (!d.active) return;
    const dx = d.startX - (e?.clientX ?? d.startX);
    const dt = Math.max(1, e?.timeStamp - d.lastT || 0);
    const velocity = (dx - d.lastDx) / dt; // px/ms
    dragRef.current = { active: false, startX: 0, startY: 0, axis: null, lastDx: 0, lastT: 0 };
    setDragging(false);
    try {
      viewportRef.current?.releasePointerCapture?.(e?.pointerId);
    } catch (err) {
      /* ignore */
    }
    if (d.axis !== "x") {
      setDragOffset(0);
      return;
    }
    let shift = Math.round(dx / spacing);
    if (Math.abs(velocity) > 0.5 && shift === 0) shift = dx > 0 ? 1 : -1;
    if (shift !== 0) setIndex((p) => (p + shift + OFFERS.length) % OFFERS.length);
    setDragOffset(0);
    window.setTimeout(() => { suppressClickRef.current = false; }, 60);
  };
  const onPointerCancel = () => {
    dragRef.current = { active: false, startX: 0, startY: 0, axis: null, lastDx: 0, lastT: 0 };
    setDragging(false);
    setDragOffset(0);
  };

  // ── Wheel: horizontal wheel or shift+wheel moves one card, throttled 380ms. Vertical page scroll untouched.
  const onWheel = (e) => {
    const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
    if (!horizontal) return;
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const now = Date.now();
    if (now - wheelLockRef.current < 380) return;
    wheelLockRef.current = now;
    go(d > 0 ? 1 : -1);
  };

  const onCardClick = (i, btnEl) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return; // suppress the click that follows a drag
    }
    if (i === index) {
      try {
        base44.analytics.track({ eventName: "benefit_opened" });
      } catch (err) {
        /* ignore */
      }
      openerRef.current = btnEl;
      setSelectedIdx(i);
    } else {
      setIndex(i);
    }
  };

  const closeModal = () => setSelectedIdx(null);
  const modalPrev = () => setSelectedIdx((p) => (p - 1 + OFFERS.length) % OFFERS.length);
  const modalNext = () => setSelectedIdx((p) => (p + 1) % OFFERS.length);

  // ── Geometry ────────────────────────────────────────────────────────────────
  const cardW = isMobile ? Math.min(Math.max(frameW * 0.8, 240), 320) : 260;
  const imgH = isMobile ? Math.round(cardW * 1.22) : 340;
  const spacing = isMobile ? Math.round(cardW * 0.82) : 230;
  const sideScale = 0.86;
  const rotateYAmt = isMobile ? 16 : 24;
  const maxVisible = isMobile ? 3 : 4;

  const n = OFFERS.length;
  const cardTransition = (dragging || reducedMotion) ? { duration: 0 } : SPRING;

  return (
    <section
      id="benefits"
      ref={secRef}
      dir="rtl"
      style={{ background: "#FFFFFF", padding: "84px 20px 92px", fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif", overflowX: "hidden" }}
    >
      <style>{`
        @media (max-width:768px){ #benefits{ padding:48px 16px 56px !important; } }
        .fo-card-inner{ transition: transform .25s ease, box-shadow .25s ease; will-change: transform; }
        .fo-card-inner.fo-center:hover{ transform: translateY(-4px); }
        .fo-card-inner.fo-center:hover .fo-card-img{ box-shadow: 0 36px 90px rgba(0,0,0,0.20); }
        .fo-cta{ transition: transform .18s ease, box-shadow .18s ease; }
        .fo-cta:hover{ transform: translateY(-1px); box-shadow: 0 12px 30px rgba(23,25,29,0.24); }
        .fo-cta:active{ transform: scale(0.98); }
        .fo-nav{ transition: transform .18s ease, box-shadow .18s ease; }
        .fo-nav:hover{ transform: translateY(-1px); box-shadow: 0 8px 22px rgba(0,0,0,0.14); }
        .fo-nav:active{ transform: scale(0.98); }
        @media (prefers-reduced-motion: reduce){ .fo-card-inner{ transition:none; } .fo-cta,.fo-nav{ transition:none; } }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: "clamp(28px,4.6vw,46px)", fontWeight: 800, color: "#17191D", letterSpacing: "-0.03em", lineHeight: 1.08, margin: "0 0 14px" }}
        >
          כל בוקר משהו חדש. <span style={{ color: "#C24A2C" }}>ותמיד במחיר הכי נמוך בישראל.</span>
        </motion.h2>
        <p style={{ fontSize: "clamp(16px,1.4vw,20px)", color: "#3A3C42", lineHeight: 1.5, maxWidth: 680, margin: "0 auto 36px" }}>
          ככה נראו ההטבות היומיות של העובדים בשבועות האחרונים. לחצו על הטבה כדי לראות את הפרטים.
        </p>

        {/* Controls */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 18 }}>
          <button type="button" onClick={() => go(-1)} aria-label="הטבה הקודמת" style={navBtn()}>
            <ChevronRight size={22} color="#17191D" />
          </button>
          {isMobile ? (
            <span aria-live="polite" style={{ fontSize: 14, fontWeight: 600, color: "#17191D", minWidth: 64 }}>
              {index + 1} מתוך {n}
            </span>
          ) : (
            <div style={{ display: "flex", gap: 6 }}>
              {OFFERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`עבור להטבה ${i + 1}`}
                  aria-current={i === index}
                  style={{ width: 44, height: 44, border: "none", background: "transparent", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <span style={{ width: i === index ? 22 : 8, height: 8, borderRadius: 999, background: i === index ? CORAL : "rgba(19,21,29,0.16)", transition: "all .25s ease" }} />
                </button>
              ))}
            </div>
          )}
          <button type="button" onClick={() => go(1)} aria-label="הטבה הבאה" style={navBtn()}>
            <ChevronLeft size={22} color="#17191D" />
          </button>
        </div>

        {/* Carousel viewport */}
        <div
          ref={viewportRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={onPointerCancel}
          onWheel={onWheel}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") { e.preventDefault(); go(1); }
            else if (e.key === "ArrowRight") { e.preventDefault(); go(-1); }
          }}
          tabIndex={0}
          role="group"
          aria-label="קרוסלת הטבות"
          style={{ position: "relative", height: imgH + 40, perspective: "1500px", touchAction: "pan-y", outline: "none", cursor: dragging ? "grabbing" : "grab", userSelect: dragging ? "none" : "auto" }}
        >
          {reducedMotion ? (
            // Flat, no 3D / no blur — full content, all 9 reachable via controls.
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Card offer={OFFERS[index]} index={index} cardW={cardW} imgH={imgH} isCenter onCardClick={onCardClick} />
            </div>
          ) : (
            OFFERS.map((offer, i) => {
              const offset = i - index;
              const circOffset = offset > n / 2 ? offset - n : offset < -n / 2 ? offset + n : offset;
              const circAbs = Math.abs(circOffset);
              if (circAbs > maxVisible) return null;
              const isCenter = circOffset === 0;
              return (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.55,
                    x: circOffset * spacing - dragOffset,
                    y: 0,
                    scale: isCenter ? 1.0 : sideScale,
                    rotateY: circOffset * -rotateYAmt,
                    z: isCenter ? 150 : -80,
                  }}
                  transition={cardTransition}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginLeft: -cardW / 2,
                    marginTop: -(imgH + 40) / 2,
                    width: cardW,
                    zIndex: 10 - circAbs,
                    cursor: "pointer",
                  }}
                >
                  <Card offer={offer} index={i} cardW={cardW} imgH={imgH} isCenter={isCenter} onCardClick={onCardClick} />
                </motion.div>
              );
            })
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}>
          <div style={{ width: cardW, minHeight: 150, textAlign: "right", boxSizing: "border-box" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={OFFERS[index].id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <p style={{ fontSize: 12, fontWeight: 700, color: "#C24A2C", margin: "0 0 2px", letterSpacing: "0.02em" }}>{OFFERS[index].brand}</p>
                <p style={{ fontSize: 17, fontWeight: 700, color: "#15172A", margin: "0 0 8px", lineHeight: 1.25 }}>{OFFERS[index].productName}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 26, fontWeight: 900, color: "#15172A", lineHeight: 1 }}>₪{OFFERS[index].priceNew}</span>
                  <span style={{ fontSize: 15, color: STRIKE, textDecoration: "line-through" }}>₪{OFFERS[index].priceOld}</span>
                  <span style={{ marginRight: "auto", background: "#E6F4EC", color: "#1A7A43", fontWeight: 800, fontSize: 13, padding: "6px 10px", borderRadius: 999 }}>חוסכים ₪{OFFERS[index].saving}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p style={{ fontSize: 13, color: "#6E7177", lineHeight: 1.5, maxWidth: 660, margin: "16px auto 0" }}>
          דוגמאות מהתקופה האחרונה. ההבטחה למחיר הנמוך בישראל חלה על ההטבה היומית ביום שלה.
        </p>

        <div style={{ marginTop: 36, display: "flex", justifyContent: "center" }}>
          <button
            type="button"
            className="fo-cta"
            onClick={() => scrollToId("organization-fit")}
            style={{
              background: CHARCOAL,
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
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: CORAL, display: "inline-block", flexShrink: 0 }} />
            בדיקת התאמה
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

// ─── Card (visual carousel item) ──────────────────────────────────────────────
function Card({ offer, index, cardW, imgH, isCenter, onCardClick }) {
  return (
    <div className={`fo-card-inner${isCenter ? " fo-center" : ""}`} style={{ width: cardW, display: "flex", flexDirection: "column", alignItems: "center" }} onClick={(e) => onCardClick(index, e.currentTarget)}>
      <div className="fo-card-img" style={{ width: "100%", height: imgH, background: "#F5F5F7", borderRadius: 28, overflow: "hidden", boxShadow: isCenter ? "0 28px 70px rgba(0,0,0,0.14)" : "0 6px 20px rgba(0,0,0,0.06)", position: "relative" }}>
        <img src={fitImg(offer.img, 640, 780)} loading={index === 0 ? "eager" : "lazy"} decoding="async" width={640} height={780} alt={offer.productName} draggable={false} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = offer.img; }} style={{ width: "100%", height: "100%", objectFit: "contain", background: "#F5F5F7", display: "block" }} />
      </div>

    </div>
  );
}

function navBtn() {
  return {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "#fff",
    border: "1.5px solid rgba(0,0,0,0.10)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
  };
}