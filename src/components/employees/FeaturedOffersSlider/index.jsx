import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { scrollToId } from "../uiHelpers";
import { fitImg } from "@/lib/img";
import WhatsAppMoment from "../WhatsAppMoment";

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

const SPRING = { type: "spring", stiffness: 240, damping: 30, mass: 0.9 };
const EASE = [0.22, 1, 0.36, 1];

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function FeaturedOffersSlider() {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [frameW, setFrameW] = useState(0);
  // Drag offset lives in a motion value on a shared track, so dragging never re-renders the cards
  const dragX = useMotionValue(0);
  const [dragging, setDragging] = useState(false);
  const secRef = useRef(null);
  const viewportRef = useRef(null);
  const firedBenefitsView = useRef(false);
  const openerRef = useRef(null);
  const suppressClickRef = useRef(false);
  const wheelLockRef = useRef(0);
  const inView = useInView(viewportRef, { amount: 0.25 });
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
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
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (inView && !entered) setEntered(true);
    if (inView && !firedBenefitsView.current) {
      firedBenefitsView.current = true;
      try { base44.analytics.track({ eventName: "benefits_viewed" }); } catch (err) { /* ignore */ }
    }
  }, [inView, entered]);

  const n = OFFERS.length;
  const go = useCallback((dir) => setIndex((p) => (p + dir + n) % n), [n]);

  // ── Geometry ────────────────────────────────────────────────────────────────
  const cardW = isMobile ? Math.round(Math.min(Math.max(frameW * 0.72, 230), 300)) : 280;
  const imgH = Math.round(cardW * 1.22);
  const spacing = isMobile ? Math.round(cardW * 0.78) : 250;
  const maxVisible = isMobile ? 2 : 3;
  const stageH = imgH + (isMobile ? 50 : 70); // room for float + hover lift, so nothing is clipped top/bottom

  // ── Drag (mouse + touch) via framer pan: works with a finger and a mouse, vertical page scroll stays native
  const dragStartRef = useRef(0);
  const onPanStart = () => {
    dragX.stop();
    dragStartRef.current = dragX.get();
    setDragging(true);
    suppressClickRef.current = false;
  };
  const onPan = (e, info) => {
    if (Math.abs(info.offset.x) > 6) suppressClickRef.current = true;
    // light resistance so it feels physical, not loose
    dragX.set(dragStartRef.current + info.offset.x * 0.9);
  };
  const onPanEnd = (e, info) => {
    const dx = info.offset.x;
    const vx = info.velocity.x;
    // finger moves left (dx < 0) → next card, matching the "next" arrow
    let shift = Math.round(-dx / spacing);
    if (shift === 0 && Math.abs(vx) > 350) shift = vx < 0 ? 1 : -1;
    shift = Math.max(-3, Math.min(3, shift));
    // Cards spring to their new slots while the track springs back to 0: the sum is continuous, no jump
    if (shift !== 0) setIndex((p) => (p + shift + n) % n);
    animate(dragX, 0, SPRING);
    setDragging(false);
    window.setTimeout(() => { suppressClickRef.current = false; }, 80);
  };

  // ── Trackpad / horizontal wheel: one card per gesture, vertical page scroll untouched
  const onWheel = (e) => {
    const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.2 || e.shiftKey;
    if (!horizontal) return;
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(d) < 8) return;
    const now = Date.now();
    if (now - wheelLockRef.current < 420) return;
    wheelLockRef.current = now;
    go(d > 0 ? 1 : -1);
  };

  const onCardClick = (i, el) => {
    if (suppressClickRef.current) return;
    if (i === index) {
      try { base44.analytics.track({ eventName: "benefit_opened" }); } catch (err) { /* ignore */ }
      openerRef.current = el;
      setSelectedIdx(i);
    } else {
      setIndex(i);
    }
  };

  const closeModal = () => setSelectedIdx(null);
  const modalPrev = () => setSelectedIdx((p) => (p - 1 + n) % n);
  const modalNext = () => setSelectedIdx((p) => (p + 1) % n);

  const offer = OFFERS[index];

  return (
    <section
      id="benefits"
      ref={secRef}
      dir="rtl"
      className="bb-section"
      style={{ background: "#FFFFFF", fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif", overflow: "hidden" }}
    >
      <style>{`
        .fo-stage{ -webkit-mask-image:linear-gradient(to right, transparent 0, #000 9%, #000 91%, transparent 100%); mask-image:linear-gradient(to right, transparent 0, #000 9%, #000 91%, transparent 100%); }
        @media (max-width:768px){ .fo-stage{ -webkit-mask-image:linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%); mask-image:linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%); } }
        .fo-cta{ transition: transform .18s ease, box-shadow .18s ease; }
        .fo-cta:hover{ transform: translateY(-1px); box-shadow: 0 12px 30px rgba(23,25,29,0.24); }
        .fo-cta:active{ transform: scale(0.98); }
        .fo-nav{ transition: transform .18s ease, box-shadow .18s ease; }
        .fo-nav:hover{ transform: translateY(-1px); box-shadow: 0 8px 22px rgba(0,0,0,0.14); }
        .fo-nav:active{ transform: scale(0.96); }
        .fo-stage:focus-visible{ outline:3px solid rgba(244,122,90,0.55); outline-offset:4px; border-radius:24px; }
        @keyframes fo-sheen{ from{ transform:translateX(-120%) skewX(-18deg); } to{ transform:translateX(220%) skewX(-18deg); } }
        @media (prefers-reduced-motion: reduce){ .fo-cta,.fo-nav{ transition:none; } }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center", padding: "0 20px" }}>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ color: "#C24A2C", fontWeight: 700, fontSize: 13, letterSpacing: "-0.01em", margin: "0 0 10px" }}
        >
          הטבה יומית
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ fontSize: "clamp(28px,4.6vw,46px)", fontWeight: 800, color: "#17191D", letterSpacing: "-0.03em", lineHeight: 1.08, margin: "0 0 14px", textWrap: "balance" }}
        >
          כל בוקר משהו חדש. <span style={{ color: "#C24A2C" }}>ותמיד במחיר הכי נמוך בישראל.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
          style={{ fontSize: "clamp(16px,1.4vw,20px)", color: "#3A3C42", lineHeight: 1.5, maxWidth: 680, margin: "0 auto 26px", textWrap: "pretty" }}
        >
          ככה נראו ההטבות היומיות של העובדים בשבועות האחרונים. גוללים, ולוחצים על הטבה כדי לראות את הפרטים.
        </motion.p>
      </div>

      <WhatsAppMoment offer={offer} isMobile={isMobile} />

      {/* Stage wrapper: side arrows live outside the edge-fade mask so they stay crisp */}
      <div style={{ position: "relative" }}>
      {!isMobile && (
        <>
          <button type="button" className="fo-nav" onClick={() => go(-1)} aria-label="הטבה הקודמת" style={{ ...navBtn(), position: "absolute", top: "50%", right: "max(20px, calc(50% - 560px))", marginTop: -26, zIndex: 40, width: 52, height: 52 }}>
            <ChevronRight size={24} color="#17191D" />
          </button>
          <button type="button" className="fo-nav" onClick={() => go(1)} aria-label="הטבה הבאה" style={{ ...navBtn(), position: "absolute", top: "50%", left: "max(20px, calc(50% - 560px))", marginTop: -26, zIndex: 40, width: 52, height: 52 }}>
            <ChevronLeft size={24} color="#17191D" />
          </button>
        </>
      )}
      <motion.div
        ref={viewportRef}
        className="fo-stage"
        onPanStart={onPanStart}
        onPan={onPan}
        onPanEnd={onPanEnd}
        onWheel={onWheel}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") { e.preventDefault(); go(1); }
          else if (e.key === "ArrowRight") { e.preventDefault(); go(-1); }
        }}
        tabIndex={0}
        role="group"
        aria-roledescription="קרוסלה"
        aria-label="קרוסלת הטבות"
        style={{ position: "relative", height: stageH, perspective: 1400, touchAction: "pan-y", cursor: dragging ? "grabbing" : "grab", userSelect: "none", WebkitUserSelect: "none" }}
      >
        <motion.div style={{ position: "absolute", inset: 0, x: dragX, transformStyle: "preserve-3d" }}>
        {OFFERS.map((o, i) => {
          const offset = i - index;
          const circ = offset > n / 2 ? offset - n : offset < -n / 2 ? offset + n : offset;
          const abs = Math.abs(circ);
          if (abs > maxVisible) return null;
          const isCenter = circ === 0;
          // RTL reading order: the next card sits to the left
          const x = -circ * spacing;
          const show = entered || reducedMotion;
          return (
            <motion.div
              key={o.id}
              initial={false}
              animate={{
                x: show ? x : x + (circ <= 0 ? 90 : -90),
                opacity: show ? 1 : 0,
                scale: isCenter ? 1 : abs === 1 ? 0.86 : 0.74,
                rotateY: reducedMotion ? 0 : circ * 22,
              }}
              transition={
                reducedMotion
                  ? { duration: 0.15 }
                  : { ...SPRING, opacity: { duration: 0.5, delay: entered ? 0 : abs * 0.08 } }
              }
              style={{
                position: "absolute",
                top: 30,
                left: "50%",
                marginLeft: -cardW / 2,
                width: cardW,
                zIndex: 20 - abs,
                transformStyle: "preserve-3d",
              }}
            >
              <Card
                offer={o}
                index={i}
                cardW={cardW}
                imgH={imgH}
                isCenter={isCenter}
                depth={abs}
                floating={!reducedMotion && inView && !dragging}
                tilt={!isMobile && !reducedMotion && isCenter && !dragging}
                onCardClick={onCardClick}
              />
            </motion.div>
          );
        })}
        </motion.div>
      </motion.div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center", padding: "0 20px" }}>
        {/* Details of the centered offer */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
          <div style={{ width: Math.max(cardW, 280), minHeight: 104, textAlign: "right", boxSizing: "border-box" }} aria-live="polite">
            {/* Keyed re-mount: the new offer fades in immediately (no exit wait, never gets stuck) */}
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <p style={{ fontSize: 12, fontWeight: 700, color: "#C24A2C", margin: "0 0 2px", letterSpacing: "0.02em" }}>{offer.brand}</p>
                <p style={{ fontSize: 17, fontWeight: 700, color: "#15172A", margin: "0 0 8px", lineHeight: 1.25 }}>{offer.productName}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "nowrap" }}>
                  <span style={{ fontSize: 26, fontWeight: 900, color: "#15172A", lineHeight: 1, whiteSpace: "nowrap" }}>₪{offer.priceNew}</span>
                  <span style={{ fontSize: 15, color: STRIKE, textDecoration: "line-through", whiteSpace: "nowrap" }}>₪{offer.priceOld}</span>
                  <span style={{ marginRight: "auto", background: "#E6F4EC", color: "#1A7A43", fontWeight: 800, fontSize: 13, padding: "6px 10px", borderRadius: 999, whiteSpace: "nowrap" }}>חוסכים ₪{offer.saving}</span>
                </div>
              </motion.div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginTop: 18 }}>
          {isMobile && (
            <button type="button" className="fo-nav" onClick={() => go(-1)} aria-label="הטבה הקודמת" style={navBtn()}>
              <ChevronRight size={22} color="#17191D" />
            </button>
          )}
          <div style={{ display: "flex", gap: 2 }}>
            {OFFERS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`עבור להטבה ${i + 1}`}
                aria-current={i === index}
                style={{ width: isMobile ? 26 : 32, height: 44, border: "none", background: "transparent", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <motion.span
                  animate={{ width: i === index ? 22 : 8, backgroundColor: i === index ? CORAL : "rgba(19,21,29,0.18)" }}
                  transition={{ duration: 0.25 }}
                  style={{ height: 8, borderRadius: 999, display: "block" }}
                />
              </button>
            ))}
          </div>
          {isMobile && (
            <button type="button" className="fo-nav" onClick={() => go(1)} aria-label="הטבה הבאה" style={navBtn()}>
              <ChevronLeft size={22} color="#17191D" />
            </button>
          )}
        </div>

        <p style={{ fontSize: 13, color: "#6E7177", lineHeight: 1.5, maxWidth: 660, margin: "16px auto 0" }}>
          דוגמאות מהתקופה האחרונה. ההבטחה למחיר הנמוך בישראל חלה על ההטבה היומית ביום שלה.
        </p>

        {!isMobile && (
        <div style={{ marginTop: 30, display: "flex", justifyContent: "center" }}>
          <button
            type="button"
            className="fo-cta"
            onClick={() => scrollToId("organization-fit")}
            style={{ background: CHARCOAL, color: "#fff", border: "none", borderRadius: 999, height: 56, minWidth: 240, maxWidth: 360, padding: "0 30px", fontFamily: "inherit", fontWeight: 700, fontSize: "clamp(16px,1.1vw,18px)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 8px 24px rgba(23,25,29,0.18)" }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: CORAL, display: "inline-block", flexShrink: 0 }} />
            בדיקת התאמה
          </button>
        </div>
        )}
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

// ─── Card: full-colour image, depth shading instead of fading, gentle float, light sheen on the centre card
function Card({ offer, index, cardW, imgH, isCenter, depth, floating, tilt, onCardClick }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  const onMove = (e) => {
    if (!tilt) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 8);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  const floatDur = 5.2 + (index % 3) * 0.7;

  return (
    <motion.div
      animate={floating ? { y: [0, -8, 0] } : { y: 0 }}
      transition={floating ? { duration: floatDur, repeat: Infinity, ease: "easeInOut", delay: index * 0.35 } : { duration: 0.4 }}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={(e) => onCardClick(index, e.currentTarget)}
        whileHover={isCenter ? { y: -6 } : undefined}
        style={{
          width: cardW,
          height: imgH,
          borderRadius: 28,
          overflow: "hidden",
          position: "relative",
          cursor: "pointer",
          rotateX: srx,
          rotateY: sry,
          background: "#DCE9F7",
          boxShadow: isCenter
            ? "0 30px 70px rgba(14,42,79,0.28), 0 10px 24px rgba(0,0,0,0.10)"
            : "0 14px 34px rgba(14,42,79,0.16)",
          transition: "box-shadow .35s ease",
        }}
      >
        <img
          src={fitImg(offer.img, 640, 780)}
          loading={index < 3 ? "eager" : "lazy"}
          decoding="async"
          width={640}
          height={780}
          alt={offer.productName}
          draggable={false}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = offer.img; }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
        />
        {/* Depth shading: side cards get darker (keeps the blue, no washed-out look) */}
        <motion.div
          aria-hidden="true"
          animate={{ opacity: isCenter ? 0 : depth === 1 ? 0.42 : 0.62 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,18,40,0.35) 0%, rgba(6,18,40,0.75) 100%)", pointerEvents: "none" }}
        />
        {/* Soft top light on the centre card */}
        <motion.div
          aria-hidden="true"
          animate={{ opacity: isCenter ? 1 : 0 }}
          transition={{ duration: 0.45 }}
          style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 60% at 50% 0%, rgba(255,255,255,0.22), rgba(255,255,255,0) 60%)", pointerEvents: "none" }}
        />
        {/* One light sweep each time a card becomes the centre */}
        {isCenter && (
          <span
            key={`sheen-${index}`}
            aria-hidden="true"
            style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "40%", background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0) 100%)", animation: "fo-sheen 1.1s cubic-bezier(.22,1,.36,1) 0.15s both", pointerEvents: "none" }}
          />
        )}
      </motion.div>
    </motion.div>
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