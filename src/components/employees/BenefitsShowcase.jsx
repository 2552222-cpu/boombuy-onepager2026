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
    sub: "260 הטבות חדשות בשנה · בשם הארגון",
    tag: "המחיר הנמוך בישראל",
    tagBg: "bg-amber-500",
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
    tagBg: "bg-slate-700",
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
    tagBg: "bg-emerald-600",
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
    tagBg: "bg-violet-600",
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
    tagBg: "bg-sky-600",
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
    tagBg: "bg-rose-500",
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
    tagBg: "bg-orange-500",
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
    tagBg: "bg-teal-600",
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
          className="absolute top-3 md:top-4 right-3 md:right-4 z-30 w-9 md:w-11 h-9 md:h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-secondary transition-colors"
        >
          <X className="w-4 md:w-5 h-4 md:h-5 text-foreground" />
        </button>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] min-h-full gap-0">
            {/* צד תמונה */}
            <div className="bg-white p-2 sm:p-4 lg:p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-l border-black/5 flex-col">
              <div className="w-full flex items-center justify-center flex-1 min-h-40 md:min-h-96">
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
                      style={{ maxWidth: "100%", maxHeight: "60vh", objectFit: "contain" }}
                    />
                  </AnimatePresence>
                ) : (
                  <div className="flex items-center justify-center text-6xl opacity-30">🖼️</div>
                )}
              </div>

              {hasExtra && (
                <div style={{
                  display: "flex",
                  gap: "8px",
                  overflowX: "auto",
                  padding: "12px 0",
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
                        width: 64,
                        height: 64,
                        borderRadius: 12,
                        overflow: "hidden",
                        border: activeImage === url 
                          ? "2.5px solid #1B4FD8" 
                          : "2px solid #E5E7EB",
                        opacity: activeImage === url ? 1 : 0.6,
                        transition: "all 0.2s ease",
                        background: "white",
                        padding: 4,
                        cursor: "pointer",
                        transform: activeImage === url ? "scale(1.05)" : "scale(1)"
                      }}
                    >
                      <img 
                        src={url} 
                        alt="" 
                        style={{
                          width: "100%", 
                          height: "100%", 
                          objectFit: "contain"
                        }} 
                      />
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
                  {category.emoji} {category.title}
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
                  <div className="mt-4 rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3 text-xs sm:text-sm text-primary font-medium leading-6">
                    💡 {category.note}
                  </div>
                )}
              </div>

              <div className="h-px bg-black/8 mb-3 sm:mb-4" />

              <div className="mb-2">
                <h4 className="text-sm sm:text-base lg:text-lg font-extrabold text-foreground mb-0.5">
                  עוד הטבות בקטגוריה הזו
                </h4>
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  לחצו על כפתור כדי לראות תמונה אחרת
                </p>
              </div>

              {hasExtra ? (
                <div className="flex flex-col gap-4">
                  {/* Slider */}
                  <div className="relative flex items-center gap-3">
                    <button
                      type="button"
                      onClick={goToPrevious}
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-primary" />
                    </button>

                    <div className="flex-1 flex items-center justify-center">
                      <div className="flex gap-2">
                        {gallery.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => selectThumbnail(gallery[i])}
                            className={`w-2 h-2 rounded-full transition-all ${
                              gallery[i] === activeImage
                                ? "bg-primary w-6"
                                : "bg-primary/30 hover:bg-primary/50"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={goToNext}
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-primary transform rotate-180" />
                    </button>
                  </div>

                  {/* Indicators */}
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

              <div className="mt-3 sm:mt-5 flex flex-col gap-2">
                <button
                  onClick={onCTA}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 md:py-4 rounded-lg md:rounded-2xl transition-all shadow-lg shadow-primary/20 text-xs md:text-base"
                >
                  זה מעניין אותי - בדקו מה מגיע לי
                </button>

                <button
                  onClick={onClose}
                  className="w-full px-4 md:px-5 py-3 md:py-4 rounded-lg md:rounded-2xl border border-black/10 hover:bg-secondary transition-colors font-semibold text-sm md:text-base"
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
function CategoryCard({ cat, index, onClick }) {
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
      className="rounded-lg md:rounded-2xl text-right overflow-hidden border border-black/8 shadow-sm group flex flex-col bg-white cursor-pointer hover:shadow-md transition-shadow"
      style={{ willChange: "transform", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
    >
      <div
        className="relative w-full flex items-center justify-center bg-white p-1 sm:p-3"
        style={{ aspectRatio: "1/1" }}
      >
        {cat.previewImage ? (
          <>
            <img
              src={cat.previewImage}
              alt={cat.title}
              className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
            <div className="absolute inset-0 bg-white/10" />
          </>
        ) : (
          <div className="flex items-center justify-center text-4xl opacity-30">🖼️</div>
        )}
      </div>

      <div className="px-2 md:px-3.5 pt-2 md:pt-2.5 pb-2 md:pb-3 flex flex-col gap-1 bg-white">
        <div className="flex items-center gap-2 mb-1">
          <span className={`${cat.tagBg} text-white text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded-full`}>
            {cat.tag}
          </span>
        </div>

        <p className="font-extrabold text-xs md:text-sm text-foreground leading-snug line-clamp-2">
          {cat.emoji} {cat.title}
        </p>

        <p className="text-[9px] md:text-[11px] text-muted-foreground leading-relaxed line-clamp-2 min-h-[20px]">
          {cat.sub}
        </p>

        <button
          type="button"
          onClick={onClick}
          className="w-full mt-1 md:mt-2 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-primary/10 text-primary text-[9px] md:text-xs font-bold text-center hover:bg-primary/20 transition-colors"
        >
          ראה דוגמאות ←
        </button>
      </div>
    </motion.button>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function BenefitsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const scrollToSurvey = () => {
    setSelectedCategory(null);
    setTimeout(() => {
      document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <section className="py-12 md:py-24 bg-white" style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
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
              onClick={() => setSelectedCategory(cat)}
            />
          ))}
        </div>

        {/* Framing band — prominent */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-14 mb-12 px-6 md:px-8 py-5 md:py-6 bg-primary/5 border border-primary/25 rounded-2xl"
        >
          <p className="text-center text-sm md:text-base font-semibold text-foreground leading-relaxed">
            💡 כל ההטבות ממומנות על ידי המערכת — לא על ידי המעסיק.
          </p>
        </motion.div>


      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <CategoryModal
            category={selectedCategory}
            onClose={() => setSelectedCategory(null)}
            onCTA={scrollToSurvey}
          />
        )}
      </AnimatePresence>
    </section>
  );
}