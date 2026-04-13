import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Smartphone, ShoppingCart, Gift, Plane, Music, Shirt, Store, ChevronLeft, ChevronRight } from "lucide-react";
import ILS from "./ILS";

// ─── DATA — each offer has its own image + pricing ───────────────────────────
const categories = [
  {
    id: "daily",
    title: "כל בוקר הטבה חדשה",
    description: "כל יום מתחיל בהטבה חדשה שנשלחת לעובד בוואטסאפ, על מוצרי צריכה, מותגי פרימיום, חוויות ואטרקציות. תמיד במחיר הנמוך ביותר בישראל.",
    sub: "260 הטבות בשנה - ישירות לוואטסאפ שלך",
    tag: "המחיר הנמוך בישראל. תמיד.",
    previewImage: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7e52326a0_-2026-03-22T160414836.png",
    offers: [
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/9ddb536b7_-2026-03-22T123739070.png", productName: "Adidas Samba", priceOld: "499", priceNew: "299", saving: "200", labelOld: "מחיר באדידס" },
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/46e419525_-2026-02-18T150744909.png", productName: "נעלי ריצה Nike", priceOld: "450", priceNew: "249", saving: "201", labelOld: "מחיר שוק" },
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/ccb0d029b_-2026-02-18T145838528.png", productName: "טי-שירט Tommy", priceOld: "280", priceNew: "129", saving: "151", labelOld: "מחיר שוק" },
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3f27a30a4_.png", productName: "אוזניות JBL", priceOld: "399", priceNew: "199", saving: "200", labelOld: "מחיר שוק" },
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/a4b03713f_-2026-03-22T142532392.png", productName: "כרטיס הופעה", priceOld: "290", priceNew: "99", saving: "191", labelOld: "מחיר שוק" },
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/8fb586f26_-2026-03-15T180501791.png", productName: "סט מזוודות", priceOld: "1,999", priceNew: "249", saving: "1,750", labelOld: "מחיר שוק" },
    ],
  },
  {
    id: "tech",
    title: "חשמל ואלקטרוניקה",
    description: "חנות קבועה של מוצרי חשמל, אלקטרוניקה, מחשבים וסלולר במחירי יבואן - מהמותגים שעובדים באמת רוצים.",
    sub: "Apple, Samsung, Dyson, Ninja ועוד",
    tag: "מחיר יבואן",
    previewImage: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/db8e935e8_-2026-03-22T162955489.png",
    offers: [
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/92d8c129a_-2026-02-18T150849922.png", productName: "iPhone 16 Pro", priceOld: "4,590", priceNew: "3,890", saving: "700", labelOld: "מחיר שוק" },
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/477510a11_-2026-02-18T150203869.png", productName: "Nespresso", priceOld: "833", priceNew: "589", saving: "244", labelOld: "מחיר שוק" },
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/ca6b2de24_-2026-02-18T145345395.png", productName: "Dyson V15", priceOld: "2,499", priceNew: "1,699", saving: "800", labelOld: "מחיר שוק" },
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/c7ef06ffc_-2026-02-18T141936848.png", productName: "Samsung Galaxy", priceOld: "3,999", priceNew: "3,199", saving: "800", labelOld: "מחיר שוק" },
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/96816d966_92.png", productName: "Ninja Blender", priceOld: "649", priceNew: "399", saving: "250", labelOld: "מחיר שוק" },
    ],
  },
  {
    id: "super",
    title: "פארם, סופר ויוקר המחיה",
    description: "שוברי קניות לסופרמרקט והנחות קבועות על מוצרי יומיום - ערך מוחשי שמרגישים שוב ושוב בסל הקניות.",
    sub: "הנחה קבועה של עד 8% ברשתות הסופרים המוזלים",
    tag: "הנחה קבועה של 8% בסופר!",
    previewImage: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/d53a51271_-2026-03-22T163009970.png",
    offers: [
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/ea0c9f5da_-2026-02-18T145540109.png", productName: "TNX · שובר סופר", priceOld: "350", priceNew: "149", saving: "201", labelOld: "מחיר שוק" },
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3784ac419_-2026-03-22T130058307.png", productName: "שמפו Kerastase", priceOld: "189", priceNew: "99", saving: "90", labelOld: "מחיר שוק" },
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/52e06185a_-2026-03-22T115442800.png", productName: "פרפום לבית", priceOld: "240", priceNew: "129", saving: "111", labelOld: "מחיר שוק" },
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6e4f9f168_-2026-03-22T130017988.png", productName: "מוצרי ניקיון", priceOld: "160", priceNew: "89", saving: "71", labelOld: "מחיר שוק" },
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6b98c8aed_72.png", productName: "קפסולות קפה", priceOld: "120", priceNew: "69", saving: "51", labelOld: "מחיר שוק" },
    ],
  },
  {
    id: "gift",
    title: "מתנות לחגים",
    description: "הצטרפות לפלטפורמה תאפשר לעובדים ליהנות גם ממתנות חג משודרגות.",
    sub: "מתנה אחת, כמה מתנות, או שילוב ביניהן - לפי מה שנכון לארגון ולעובדים.",
    detail: "הארגון יכול לבחור בין תו לסופר, אתר בחירה למתנות או ארנק אלקטרוני שיאפשר לעובדים לבחור כמה מתנות לחג.",
    tag: "בחירה חופשית",
    previewImage: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/28d0b6e89_-2026-03-22T163901041.png",
    offers: [
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/28d0b6e89_-2026-03-22T163901041.png", productName: "מתנות לחג", priceOld: null, priceNew: null, saving: null, labelOld: null },
    ],
  },
  {
    id: "vacation",
    title: "נופש וחופשות",
    description: "חבילות טיסה, מלון, הופעות ומשחקי ספורט בארץ ובחו\"ל - במחירים שסגורים רק לעובדי הארגון.",
    sub: "בארץ ובחו\"ל · מחירים בלעדיים",
    tag: "מחירים בלעדיים",
    previewImage: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/1b29c5bb8_-2026-03-22T162942110.png",
    offers: [
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/cf3b11fa5_-2026-03-22T133529822.png", productName: "מלונות בראון", priceOld: "1,790", priceNew: "899", saving: "891", labelOld: "מחיר שוק" },
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/d11fc0b42_-2026-03-22T125322010.png", productName: "חופשה בחו\"ל", priceOld: "3,200", priceNew: "1,800", saving: "1,400", labelOld: "מחיר שוק" },
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/78ac452a3_-2026-03-22T130846774.png", productName: "חופשה בארץ", priceOld: "980", priceNew: "549", saving: "431", labelOld: "מחיר שוק" },
    ],
  },
  {
    id: "culture",
    title: "תרבות ופנאי",
    description: "הופעות, הצגות, פארקי שעשועים ואטרקציות - כי חוויית עובד טובה לא נגמרת בסוף יום העבודה.",
    sub: "כרטיסים · הנחות כניסה · אירועים",
    tag: "הנחת עובד",
    previewImage: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3d11c2184_-2026-03-22T165538542.png",
    offers: [
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/bb4b910ed_-2026-03-22T140039783.png", productName: "קזבלן", priceOld: "350", priceNew: "77", saving: "273", labelOld: "מחיר שוק" },
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7271e7a2c_-2026-01-21T190449103.png", productName: "הופעה חיה", priceOld: "290", priceNew: "120", saving: "170", labelOld: "מחיר שוק" },
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/af45cadc7_3.jpg", productName: "פארק שעשועים", priceOld: "180", priceNew: "79", saving: "101", labelOld: "מחיר שוק" },
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3c918e2dd_-2026-03-22T124329449.png", productName: "תערוכה", priceOld: "120", priceNew: "45", saving: "75", labelOld: "מחיר שוק" },
    ],
  },
  {
    id: "fashion",
    title: "אופנה, מותגים ולייף סטייל",
    description: "ביגוד, הנעלה, אקססוריז ומותגים מובילים - במחירים מיוחדים לעובדי הארגון, על דברים שעובדים באמת קונים.",
    sub: "מותגי פרימיום · מחירים בלעדיים · קנייה חכמה",
    tag: "מחירים בלעדיים",
    previewImage: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/9349388b9_-2026-03-22T163505767.png",
    offers: [
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/82cf01fcc_87.png", productName: "Alo Yoga", priceOld: "499", priceNew: "224", saving: "275", labelOld: "מחיר שוק" },
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6a4f8399a_90.png", productName: "Dior Sauvage", priceOld: "600", priceNew: "430", saving: "170", labelOld: "מחיר שוק" },
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/69b6386a9_-2026-03-22T132245384.png", productName: "נעלי אדידס", priceOld: "550", priceNew: "299", saving: "251", labelOld: "מחיר שוק" },
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3715ded54_-2026-03-22T131700657.png", productName: "מותג פרימיום", priceOld: "380", priceNew: "189", saving: "191", labelOld: "מחיר שוק" },
    ],
  },
  {
    id: "fairs",
    title: "ירידים ואירועי פופ-אפ",
    description: "ירידי צרכנות, רכב, דירות, חזרה לבית הספר ואירועי מכירה מיוחדים - חוויות קנייה מרוכזות עם ערך אמיתי.",
    sub: "אירועים תקופתיים · מחירים מיוחדים · חוויית קנייה",
    tag: "אירועים מיוחדים",
    previewImage: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/a551368ec_-2026-03-22T163623874.png",
    offers: [
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/695e0f051_-2026-02-18T142715149.png", productName: "יריד צרכנות", priceOld: "150", priceNew: "49", saving: "101", labelOld: "מחיר שוק" },
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/53f2308b8_-2026-02-18T142941224.png", productName: "יריד חזרה לספר", priceOld: "200", priceNew: "89", saving: "111", labelOld: "מחיר שוק" },
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/8cd871928_-2026-02-18T142743437.png", productName: "פופ-אפ מותג", priceOld: "350", priceNew: "149", saving: "201", labelOld: "מחיר שוק" },
      { img: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/252939dda_-2026-01-21T194558315.png", productName: "יריד רכב", priceOld: "500", priceNew: "220", saving: "280", labelOld: "מחיר שוק" },
    ],
  },
];

const CATEGORY_ICONS = {
  daily: Zap, tech: Smartphone, super: ShoppingCart, gift: Gift,
  vacation: Plane, culture: Music, fashion: Shirt, fairs: Store,
};

// ─── PRICE CARDS ──────────────────────────────────────────────────────────────
function PriceCards({ offer, mobile }) {
  if (!offer?.priceOld) return null;
  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: mobile ? "16px" : "20px" }}>
      {[
        { lbl: offer.labelOld, val: offer.priceOld, strike: true, color: "#86868B", bg: "#F5F5F7" },
        { lbl: "מחיר לעובד", val: offer.priceNew, color: "#0055CC", bg: "#F0F4FF" },
        { lbl: "החיסכון שלך", val: offer.saving, color: "#1A7A43", bg: "rgba(52,199,89,0.1)" },
      ].map((c, i) => (
        <div key={i} style={{ flex: 1, background: c.bg, borderRadius: "16px", padding: mobile ? "10px 6px" : "14px 8px", textAlign: "center" }}>
          <p style={{ fontSize: "10px", fontWeight: 700, color: "#86868B", marginBottom: "4px" }}>{c.lbl}</p>
          <ILS value={c.val} style={{ fontSize: mobile ? "16px" : "22px", fontWeight: 900, color: c.color, textDecoration: c.strike ? "line-through" : "none" }} />
        </div>
      ))}
    </div>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function CategoryModal({ category, onClose, onCTA }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const offers = category.offers || [];
  const currentOffer = offers[activeIdx];

  const goPrev = (e) => { e.stopPropagation(); setActiveIdx((i) => (i - 1 + offers.length) % offers.length); };
  const goNext = (e) => { e.stopPropagation(); setActiveIdx((i) => (i + 1) % offers.length); };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("offersModalChange", { detail: { open: true } }));
    return () => {
      document.body.style.overflow = "unset";
      window.dispatchEvent(new CustomEvent("offersModalChange", { detail: { open: false } }));
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-md flex items-end md:items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%", opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl h-[92vh] md:h-auto md:max-h-[88vh] bg-white rounded-t-[40px] md:rounded-[40px] overflow-hidden flex flex-col"
        dir="rtl"
      >
        <button onClick={onClose} className="absolute top-4 left-4 z-[1010] w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors">
          <X className="w-5 h-5 text-slate-700" />
        </button>

        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col lg:flex-row-reverse">

            {/* Image side */}
            <div className="w-full lg:w-3/5 bg-[#F5F7FA] p-6 flex flex-col items-center justify-center min-h-[280px] lg:min-h-[480px]">
              <div className="relative w-full flex items-center justify-center">
                {offers.length > 1 && (
                  <button onClick={goPrev} className="absolute right-0 z-10 w-9 h-9 rounded-full bg-white/80 shadow-md flex items-center justify-center hover:bg-white transition-all">
                    <ChevronRight className="w-5 h-5 text-slate-600" />
                  </button>
                )}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentOffer?.img}
                    src={currentOffer?.img}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    className="max-w-[80%] max-h-[38vh] lg:max-h-[46vh] object-contain drop-shadow-2xl"
                  />
                </AnimatePresence>
                {offers.length > 1 && (
                  <button onClick={goNext} className="absolute left-0 z-10 w-9 h-9 rounded-full bg-white/80 shadow-md flex items-center justify-center hover:bg-white transition-all">
                    <ChevronLeft className="w-5 h-5 text-slate-600" />
                  </button>
                )}
              </div>

              {/* Thumbnails */}
              {offers.length > 1 && (
                <div className="mt-4 w-full">
                  <div className="flex gap-2 overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none", paddingRight: "16px", paddingLeft: "48px" }}>
                    {offers.map((o, i) => (
                      <button key={i} onClick={() => setActiveIdx(i)}
                        className={`flex-shrink-0 w-[64px] h-[64px] rounded-2xl border-2 bg-white shadow-sm transition-all ${i === activeIdx ? "border-blue-500 scale-105 shadow-md" : "border-slate-100 hover:border-blue-300"}`}>
                        <img src={o.img} className="w-full h-full object-contain p-2 rounded-2xl" alt="" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Content side */}
            <div className="w-full lg:w-2/5 p-8 md:p-10 flex flex-col gap-4">
              <div>
                <span className="bg-blue-50 text-blue-600 text-[11px] font-bold px-3 py-1.5 rounded-full inline-block mb-3 border border-blue-100">
                  {category.tag}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 leading-tight">
                  {category.title}
                </h2>
                {/* Product name updates with navigation */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentOffer?.productName}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-blue-600 font-bold text-sm mb-3"
                  >
                    {currentOffer?.productName}
                  </motion.p>
                </AnimatePresence>
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  {category.description}
                </p>
              </div>

              {/* Price cards — update per image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  <PriceCards offer={currentOffer} mobile={false} />
                </motion.div>
              </AnimatePresence>

              {/* Sub info */}
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                <p className="text-blue-700 font-bold text-sm">{category.sub}</p>
              </div>

              {category.detail && (
                <p className="text-slate-500 text-xs leading-relaxed" style={{ borderRight: "3px solid #E5E7EB", paddingRight: "10px" }}>
                  {category.detail}
                </p>
              )}

              <div className="relative mt-auto pt-2">
                <motion.div
                  animate={{ boxShadow: ["0 0 0px rgba(37,99,235,0)", "0 0 16px rgba(37,99,235,0.4)", "0 0 0px rgba(37,99,235,0)"] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-[28px]"
                />
                <button onClick={onCTA} className="relative w-full bg-[#0066CC] text-white font-bold py-4 rounded-[28px] shadow-lg hover:bg-blue-700 transition-all active:scale-[0.97] text-base">
                  אני רוצה לבדוק התאמה לארגון שלי ←
                </button>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function BenefitsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <section className="py-16 md:py-24 px-4 bg-white" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-bold text-xs tracking-widest uppercase mb-3">דוגמאות נוספות להטבות שכדאי להכיר</p>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900">מה עוד מחכה לך בפנים?</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              onClick={() => setSelectedCategory(cat)}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.10)" }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="cursor-pointer bg-white rounded-[40px] border border-slate-100 shadow-sm flex flex-col overflow-hidden"
            >
              <div className="aspect-square bg-white flex items-center justify-center overflow-hidden rounded-t-[40px]">
                <img src={cat.previewImage} alt={cat.title} className="max-w-full max-h-full object-contain p-3" />
              </div>
              <div className="px-3 pt-1 pb-2 flex items-center gap-2">
                {(() => { const Icon = CATEGORY_ICONS[cat.id]; return Icon ? <Icon className="w-4 h-4 text-blue-600 flex-shrink-0" strokeWidth={1} /> : null; })()}
                <h3 className="text-xs md:text-sm font-bold text-slate-800 leading-tight line-clamp-2">{cat.title}</h3>
              </div>
              <div className="px-2 pb-3 mt-auto">
                <div className="relative">
                  <motion.div
                    animate={{ boxShadow: ["0 0 0px rgba(37,99,235,0)", "0 0 8px rgba(37,99,235,0.35)", "0 0 0px rgba(37,99,235,0)"] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-2xl"
                  />
                  <div className="relative bg-white/60 backdrop-blur-md border border-blue-200/70 rounded-2xl px-3 py-2 text-center">
                    <p className="text-[11px] md:text-[13px] font-bold text-blue-600 leading-tight">
                      לחצו לראות את פרטי ההטבה
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCategory && (
          <CategoryModal
            category={selectedCategory}
            onClose={() => setSelectedCategory(null)}
            onCTA={() => {
              setSelectedCategory(null);
              document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}