import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft } from "lucide-react";

// ─── ASSETS ──────────────────────────────────────────────────────────────────
// כל בוקר הטבה חדשה
const DAILY_PREVIEW = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7e52326a0_-2026-03-22T160414836.png";
const DAILY_EXTRA = [
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/9ddb536b7_-2026-03-22T123739070.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/46e419525_-2026-02-18T150744909.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/ccb0d029b_-2026-02-18T145838528.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3f27a30a4_.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3211ae300_100.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/a4b03713f_-2026-03-22T142532392.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/096d0c835_70.png",
];

// פארם, סופר
const SUPER_PREVIEW = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/d53a51271_-2026-03-22T163009970.png";
const SUPER_EXTRA = [
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3784ac419_-2026-03-22T130058307.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/52e06185a_-2026-03-22T115442800.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6e4f9f168_-2026-03-22T130017988.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6b98c8aed_72.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/ea0c9f5da_-2026-02-18T145540109.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/1681bed30_-2026-03-22T143417632.png",
];

// חשמל ואלקטרוניקה
const TECH_PREVIEW = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/db8e935e8_-2026-03-22T162955489.png";
const TECH_EXTRA = [
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/477510a11_-2026-02-18T150203869.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/ca6b2de24_-2026-02-18T145345395.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/c7ef06ffc_-2026-02-18T141936848.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/96816d966_92.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/92d8c129a_-2026-02-18T150849922.png",
];

// מתנת חג
const GIFT_PREVIEW = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/28d0b6e89_-2026-03-22T163901041.png";
const GIFT_EXTRA = [];

// נופש וחופשות
const VACATION_PREVIEW = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/1b29c5bb8_-2026-03-22T162942110.png";
const VACATION_EXTRA = [
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/d11fc0b42_-2026-03-22T125322010.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/78ac452a3_-2026-03-22T130846774.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/cf3b11fa5_-2026-03-22T133529822.png",
];

// תרבות ופנאי
const CULTURE_PREVIEW = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3d11c2184_-2026-03-22T165538542.png";
const CULTURE_EXTRA = [
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7271e7a2c_-2026-01-21T190449103.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/af45cadc7_3.jpg",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3c918e2dd_-2026-03-22T124329449.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/bb4b910ed_-2026-03-22T140039783.png",
];

// אופנה
const FASHION_PREVIEW = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/9349388b9_-2026-03-22T163505767.png";
const FASHION_EXTRA = [
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/82cf01fcc_87.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6a4f8399a_90.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/69b6386a9_-2026-03-22T132245384.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3715ded54_-2026-03-22T131700657.png",
];

// ירידים
const FAIRS_PREVIEW = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/a551368ec_-2026-03-22T163623874.png";
const FAIRS_EXTRA = [
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/695e0f051_-2026-02-18T142715149.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/53f2308b8_-2026-02-18T142941224.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/8cd871928_-2026-02-18T142743437.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/252939dda_-2026-01-21T194558315.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7036516f5_76.png",
];

// ─── CATEGORIES DATA ─────────────────────────────────────────────────────────
const categories = [
  {
    id: "daily",
    emoji: "⚡",
    title: "כל בוקר הטבה חדשה",
    description: "כל יום מתחיל בהטבה חדשה שנשלחת לעובד בוואטסאפ — על מוצרי צריכה, מותגי פרימיום, חוויות ואטרקציות — תמיד במחיר הנמוך ביותר בישראל.",
    sub: "260 הטבות בשנה - ישירות לוואטסאפ שלך",
    tag: "המחיר הנמוך בישראל. תמיד.",
    tagBg: "bg-slate-700",
    bg: "from-amber-50 to-orange-100",
    previewImage: DAILY_PREVIEW,
    mainImage: DAILY_EXTRA[0],
    extraImages: DAILY_EXTRA.slice(1),
    note: "מצאתם מחיר נמוך יותר בישראל? אנחנו מחזירים את ההפרש.",
  },
  {
    id: "tech",
    emoji: "📱",
    title: "חשמל ואלקטרוניקה",
    description: "חנות קבועה של מוצרי חשמל, אלקטרוניקה, מחשבים וסלולר במחירי יבואן — מהמותגים שאנשים באמת רוצים.",
    sub: "Apple, Samsung, Dyson, Ninja ועוד",
    tag: "מחיר יבואן",
    tagBg: "bg-slate-600",
    bg: "from-slate-50 to-slate-100",
    previewImage: TECH_PREVIEW,
    mainImage: TECH_EXTRA[0],
    extraImages: TECH_EXTRA.slice(1),
    note: null,
  },
  {
    id: "super",
    emoji: "🛒",
    title: "פארם, סופר ויוקר המחיה",
    description: "שוברי קניות לסופרמרקט והנחות קבועות על מוצרי יומיום — ערך מוחשי שמרגישים שוב ושוב בסל הקניות.",
    sub: "הנחה קבועה של עד 8% ברשתות הסופרים המוזלים",
    tag: "עד 8% תמיד",
    tagBg: "bg-emerald-700",
    bg: "from-emerald-50 to-green-100",
    previewImage: SUPER_PREVIEW,
    mainImage: SUPER_EXTRA[0],
    extraImages: SUPER_EXTRA.slice(1),
    note: null,
  },
  {
    id: "gift",
    emoji: "🎁",
    title: "מתנת חג — עם בחירה",
    description: "המתנה נשארת — אבל עכשיו העובד בוחר מה הוא באמת רוצה. ארנק דיגיטלי גמיש עם מגוון רחב של אפשרויות.",
    sub: "ארנק ממותג · בחירה חופשית · ניהול מרכזי",
    tag: "בחירה חופשית",
    tagBg: "bg-violet-700",
    bg: "from-violet-50 to-purple-100",
    previewImage: GIFT_PREVIEW,
    mainImage: GIFT_PREVIEW,
    extraImages: GIFT_EXTRA,
    note: null,
  },
  {
    id: "vacation",
    emoji: "✈️",
    title: "נופש וחופשות",
    description: "חבילות טיסה, מלון, הופעות ומשחקי ספורט בארץ ובחו\"ל — במחירים שסגורים רק לעובדי הארגון.",
    sub: "בארץ ובחו\"ל · מחירים בלעדיים",
    tag: "מחירים בלעדיים",
    tagBg: "bg-sky-700",
    bg: "from-sky-50 to-blue-100",
    previewImage: VACATION_PREVIEW,
    mainImage: VACATION_EXTRA[0],
    extraImages: VACATION_EXTRA.slice(1),
    note: null,
  },
  {
    id: "culture",
    emoji: "🎭",
    title: "תרבות ופנאי",
    description: "הופעות, הצגות, פארקי שעשועים ואטרקציות — כי חוויית עובד טובה לא נגמרת בסוף יום העבודה.",
    sub: "כרטיסים · הנחות כניסה · אירועים",
    tag: "הנחת עובד",
    tagBg: "bg-rose-700",
    bg: "from-pink-50 to-rose-100",
    previewImage: CULTURE_PREVIEW,
    mainImage: CULTURE_EXTRA[0],
    extraImages: CULTURE_EXTRA.slice(1),
    note: null,
  },
  {
    id: "fashion",
    emoji: "👟",
    title: "אופנה, מותגים ולייף סטייל",
    description: "ביגוד, הנעלה, אקססוריז ומותגים מובילים — במחירים מיוחדים לעובדי הארגון, על דברים שאנשים באמת קונים.",
    sub: "מותגי פרימיום · מחירים בלעדיים · קנייה חכמה",
    tag: "מחירים בלעדיים",
    tagBg: "bg-stone-600",
    bg: "from-orange-50 to-amber-100",
    previewImage: FASHION_PREVIEW,
    mainImage: FASHION_EXTRA[0],
    extraImages: FASHION_EXTRA.slice(1),
    note: null,
  },
  {
    id: "fairs",
    emoji: "🏪",
    title: "ירידים ואירועי פופ-אפ",
    description: "ירידי צרכנות, רכב, דירות, חזרה לבית הספר ואירועי מכירה מיוחדים — חוויות קנייה מרוכזות עם ערך אמיתי.",
    sub: "אירועים תקופתיים · מחירים מיוחדים · חוויית קנייה",
    tag: "אירועים מיוחדים",
    tagBg: "bg-teal-700",
    bg: "from-teal-50 to-cyan-100",
    previewImage: FAIRS_PREVIEW,
    mainImage: FAIRS_EXTRA[0],
    extraImages: FAIRS_EXTRA.slice(1),
    note: null,
  },
];

// ─── PLACEHOLDER CARD ─────────────────────────────────────────────────────────
function PlaceholderImage({ label = "asset חסר" }) {
  return (
    <div className="w-full h-full bg-border/30 flex flex-col items-center justify-center gap-1 text-muted-foreground">
      <span className="text-2xl">🖼️</span>
      <span className="text-[10px] font-medium">⚠️ {label}</span>
    </div>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function CategoryModal({ category, onClose, onCTA }) {
  const gallery = [category.mainImage, ...(category.extraImages || [])].filter(Boolean);
  const [activeImage, setActiveImage] = useState(gallery[0] || null);
  const [direction, setDirection] = useState(0);
  const hasExtra = gallery.length > 1;

  const goToPrevious = () => {
    const idx = gallery.indexOf(activeImage);
    setDirection(-1);
    setActiveImage(gallery[idx === 0 ? gallery.length - 1 : idx - 1]);
  };

  const goToNext = () => {
    const idx = gallery.indexOf(activeImage);
    setDirection(1);
    setActiveImage(gallery[idx === gallery.length - 1 ? 0 : idx + 1]);
  };

  const selectThumbnail = (url) => {
    setDirection(0);
    setActiveImage(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[1180px] max-h-[94vh] overflow-hidden rounded-2xl md:rounded-[28px] bg-white shadow-2xl border border-black/5 flex flex-col"
        style={{ overflowX: 'hidden', maxWidth: '100vw' }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 md:top-6 right-4 md:right-5 z-30 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-secondary transition-colors"
        >
          <X className="w-5 md:w-5 h-5 md:h-5 text-foreground" />
        </button>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] min-h-full gap-0">
            {/* צד תמונה */}
            <div className="bg-white p-2 sm:p-4 lg:p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-l border-black/5 flex-col">
              <div className="w-full flex items-center justify-center flex-1 min-h-40 md:min-h-96 relative">
                {hasExtra && (
                  <button
                    type="button"
                    onClick={goToNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-md border border-black/8 flex items-center justify-center hover:bg-secondary transition-colors"
                    style={{ transform: 'translateY(-50%)' }}
                  >
                    <ChevronLeft className="w-5 h-5 text-foreground" />
                  </button>
                )}
                {activeImage ? (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImage}
                      src={activeImage}
                      alt={category.title}
                      initial={{ opacity: 0, x: direction > 0 ? 30 : direction < 0 ? -30 : 0 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction > 0 ? -30 : direction < 0 ? 30 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      style={{ maxWidth: "82%", maxHeight: "66vh", objectFit: "contain" }}
                    />
                  </AnimatePresence>
                ) : (
                  <div className="flex items-center justify-center text-6xl opacity-30">🖼️</div>
                )}
                {hasExtra && (
                  <button
                    type="button"
                    onClick={goToPrevious}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-md border border-black/8 flex items-center justify-center hover:bg-secondary transition-colors"
                    style={{ transform: 'translateY(-50%)' }}
                  >
                    <ChevronLeft className="w-5 h-5 text-foreground transform rotate-180" />
                  </button>
                )}
              </div>

              {hasExtra && (
                <div style={{
                  display: "flex",
                  gap: "8px",
                  overflowX: "auto",
                  padding: "14px 0 2px",
                  scrollbarWidth: "none",
                  width: "100%"
                }}>
                  {gallery.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => selectThumbnail(url)}
                      style={{
                        flexShrink: 0,
                        width: 72,
                        height: 72,
                        borderRadius: 14,
                        overflow: "hidden",
                        border: activeImage === url ? "2px solid #0066CC" : "1.5px solid rgba(0,0,0,0.1)",
                        opacity: activeImage === url ? 1 : 0.5,
                        transition: "all 0.2s ease",
                        background: activeImage === url ? "#EBF3FF" : "#F7F7F8",
                        padding: 5,
                        cursor: "pointer",
                        transform: activeImage === url ? "scale(1.08)" : "scale(1)",
                        boxShadow: activeImage === url ? "0 0 0 3px rgba(0,102,204,0.15)" : "0 1px 4px rgba(0,0,0,0.06)",
                      }}
                    >
                      <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* צד תוכן */}
            <div className="p-3 sm:p-5 lg:p-8 flex flex-col overflow-y-auto max-h-[60vh] lg:max-h-full">
              <div className="mb-3 sm:mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`${category.tagBg} text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full`}
                  >
                    {category.tag}
                  </span>
                </div>

                <h3 className="text-lg sm:text-2xl lg:text-[2.15rem] font-black leading-[1.1] mb-2">
                  {category.title}
                </h3>

                <p className="text-xs sm:text-[14px] lg:text-[15px] text-muted-foreground leading-6 mb-1.5">
                  {category.description}
                </p>

                {category.sub && (
                  <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground/80 font-medium">
                    {category.sub}
                  </p>
                )}

                {category.note && (
                  <div className="mt-4 rounded-2xl border border-black/8 bg-secondary/40 px-4 py-3 text-xs sm:text-sm text-muted-foreground font-medium leading-6">
                    {category.note}
                  </div>
                )}
              </div>

              <div className="h-px bg-black/8 mb-3 sm:mb-4" />

              <div className="mb-2">
                <h4 className="text-sm sm:text-base lg:text-lg font-extrabold text-foreground mb-0.5">
                  עוד הטבות בקטגוריה הזו
                </h4>
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  גללו כאן כדי לגלות עוד הטבות בלעדיות לעובדים
                </p>
              </div>

              {hasExtra ? (
                <div className="flex flex-col gap-2">
                  {/* Dot indicators only */}
                  <div className="flex items-center justify-center gap-1.5 py-1">
                    {gallery.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => selectThumbnail(gallery[i])}
                        className={`rounded-full transition-all ${
                          gallery[i] === activeImage ? "bg-primary w-5 h-1.5" : "bg-primary/25 w-1.5 h-1.5 hover:bg-primary/50"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    {gallery.indexOf(activeImage) + 1} מתוך {gallery.length}
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-black/10 bg-secondary/20 px-5 py-8 text-center">
                  <div className="text-4xl opacity-20 mb-2">✨</div>
                  <p className="text-sm sm:text-base font-semibold text-foreground mb-1">
                    בקרוב נעלה עוד דוגמאות
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    מהקטגוריה הזו
                  </p>
                </div>
              )}

              <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <button
                  onClick={onCTA}
                  style={{
                    width: "100%",
                    background: "#0066CC",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: "15px",
                    padding: "14px 20px",
                    borderRadius: "14px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 6px 20px rgba(0,102,204,0.28)",
                    fontFamily: "var(--font-heebo)",
                    transition: "background 0.16s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#0055AA"}
                  onMouseLeave={e => e.currentTarget.style.background = "#0066CC"}
                >
                  אני רוצה שהארגון שלי יצטרף
                </button>

                <button
                  onClick={onClose}
                  style={{
                    width: "100%",
                    background: "transparent",
                    color: "#1D1D1F",
                    fontWeight: 600,
                    fontSize: "14px",
                    padding: "12px 20px",
                    borderRadius: "14px",
                    border: "1px solid rgba(0,0,0,0.1)",
                    cursor: "pointer",
                    fontFamily: "var(--font-heebo)",
                    transition: "background 0.16s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#F5F5F7"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  סגור
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── CATEGORY CARD ────────────────────────────────────────────────────────────
function CategoryCard({ cat, index, onClick, isActive }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.38, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className="rounded-xl md:rounded-2xl text-right overflow-hidden group flex flex-col cursor-pointer"
      style={{
        willChange: "transform",
        background: isActive ? "#F0F6FF" : "#FFFFFF",
        boxShadow: isActive
          ? "0 0 0 2px #0066CC, 0 8px 28px rgba(0,102,204,0.14)"
          : "0 2px 12px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05)",
        border: isActive ? "1.5px solid #0066CC" : "1px solid rgba(0,0,0,0.08)",
        transition: "box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease",
      }}
    >
      <div
        className="relative w-full flex items-center justify-center p-2 sm:p-3"
        style={{ aspectRatio: "1/1", background: isActive ? "#EBF3FF" : "#FAFAFA" }}
      >
        {cat.previewImage ? (
          <img
            src={cat.previewImage}
            alt={cat.title}
            className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
            style={{ maxWidth: "92%", maxHeight: "92%" }}
          />
        ) : (
          <div className="flex items-center justify-center text-4xl opacity-30">🖼️</div>
        )}
      </div>

      <div style={{ padding: "10px 12px 12px", display: "flex", flexDirection: "column", gap: "5px", background: isActive ? "#F0F6FF" : "#fff" }}>
        <span
          className={`${cat.tagBg} text-white font-bold rounded-full`}
          style={{ fontSize: "9px", padding: "3px 8px", display: "inline-block", alignSelf: "flex-start" }}
        >
          {cat.tag}
        </span>

        <p style={{ fontWeight: 800, fontSize: "12px", color: isActive ? "#0066CC" : "#1D1D1F", lineHeight: 1.35, margin: 0 }} className="line-clamp-2">
          {cat.emoji} {cat.title}
        </p>

        <p style={{ fontSize: "10px", color: "#86868B", lineHeight: 1.5, margin: 0 }} className="line-clamp-2">
          {cat.sub}
        </p>
      </div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function BenefitsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const scrollToSurvey = () => {
    setSelectedCategory(null);
    setActiveCategory(null);
    setTimeout(() => {
      document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const handleCardClick = (cat) => {
    setActiveCategory(cat.id);
    setSelectedCategory(cat);
  };

  return (
    <section className="py-12 md:py-24 bg-white" style={{ overflowX: 'hidden', maxWidth: '100vw', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
      <div className="max-w-5xl mx-auto px-4 md:px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
            מה בדיוק מחכה לך?
          </h2>
          <p className="text-muted-foreground text-sm">לחצו על קטגוריה לראות דוגמאות מהשנה האחרונה</p>
        </motion.div>

        {/* 2+4 Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              index={i}
              isActive={activeCategory === cat.id}
              onClick={() => handleCardClick(cat)}
            />
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            marginTop: "40px",
            background: "#F7F7F8",
            border: "1px solid rgba(0,0,0,0.07)",
            borderRadius: "14px",
            padding: "15px 22px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "13px", color: "#AAAAAA" }}>ℹ️</span>
          <p style={{ fontSize: "12.5px", fontWeight: 500, color: "#8E8E93", lineHeight: 1.6, fontFamily: "var(--font-heebo)", margin: 0 }}>
            ההטבה זמינה לעובדים המחוברים לפלטפורמה ומותנית בהצטרפות הארגון.
          </p>
        </motion.div>


      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <CategoryModal
            category={selectedCategory}
            onClose={() => { setSelectedCategory(null); setActiveCategory(null); }}
            onCTA={scrollToSurvey}
          />
        )}
      </AnimatePresence>
    </section>
  );
}