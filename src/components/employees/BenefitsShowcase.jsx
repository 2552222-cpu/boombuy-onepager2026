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
  const hasExtra = category.extraImages && category.extraImages.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full max-w-[95vw] sm:max-w-[540px] md:max-w-[820px] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh]"
      >
        {/* Close button — clean, accessible */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-secondary transition-colors shadow-md"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        {/* Main image — large, full, no crop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
          className="w-full flex-shrink-0 overflow-hidden bg-white flex items-center justify-center"
          style={{
            maxHeight: "clamp(400px, 75vh, 700px)",
            minHeight: "300px",
            padding: "0",
          }}
        >
          {category.mainImage ? (
            <img
              src={category.mainImage}
              alt={category.title}
              className="w-full h-full object-contain"
              style={{ maxHeight: "100%", width: "auto" }}
            />
          ) : (
            <div className="flex items-center justify-center text-5xl opacity-30">🖼️</div>
          )}
        </motion.div>

        {/* Content wrapper — scrollable */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          {/* Header section — title + description */}
          <div className="px-5 sm:px-7 md:px-9 pt-6 sm:pt-8 pb-5 flex-shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <span className={`${category.tagBg} text-white text-[9px] font-bold px-2.5 py-1 rounded-full`}>
                {category.tag}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight mb-3.5">
              {category.emoji} {category.title}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-2">{category.description}</p>
            {category.sub && (
              <p className="text-xs sm:text-sm text-muted-foreground/70 font-medium">{category.sub}</p>
            )}
            {category.note && (
              <div className="mt-3.5 bg-primary/8 border border-primary/20 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-primary font-medium">
                💡 {category.note}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-border/30 flex-shrink-0"></div>

          {/* Extra images section */}
          {hasExtra && (
            <div className="px-5 sm:px-7 md:px-9 py-6 sm:py-8 flex-1">
              <div className="mb-5">
                <p className="text-sm font-bold text-foreground mb-0.5">עוד דוגמאות מהקטגוריה</p>
                <p className="text-xs text-muted-foreground">מהשנה האחרונה</p>
              </div>
              <div className={`grid gap-3.5 ${category.extraImages.length > 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2"}`}>
                {category.extraImages.map((url, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.12 + i * 0.04, duration: 0.28 }}
                    className="aspect-square rounded-2xl overflow-hidden bg-secondary/30 shadow-sm hover:shadow-md hover:scale-[1.03] transition-all cursor-pointer"
                  >
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {!hasExtra && (
            <div className="px-5 sm:px-7 md:px-9 py-12 sm:py-14 flex-1 flex flex-col items-center justify-center text-center">
              <span className="text-5xl sm:text-6xl opacity-35 mb-3">✨</span>
              <p className="text-base font-semibold text-foreground mb-1">בקרוב נעלה עוד דוגמאות</p>
              <p className="text-sm text-muted-foreground">מהקטגוריה הזו</p>
            </div>
          )}
        </div>

        {/* CTA Footer — strong, always visible */}
        <div className="px-5 sm:px-7 md:px-9 py-5 sm:py-6 border-t border-border/20 flex-shrink-0 bg-white">
          <button
            onClick={onCTA}
            className="w-full bg-primary hover:bg-primary/90 active:bg-primary/95 text-primary-foreground font-bold py-3.5 sm:py-4 md:py-5 rounded-2xl transition-all shadow-lg shadow-primary/20 text-sm sm:text-base md:text-lg"
          >
            זה מעניין אותי — בדקו מה מגיע לי
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── CATEGORY CARD ────────────────────────────────────────────────────────────
function CategoryCard({ cat, index, onClick }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -3, boxShadow: "0 8px 28px rgba(0,0,0,0.10)" }}
      onClick={onClick}
      className={`bg-gradient-to-br ${cat.bg} rounded-2xl text-right overflow-hidden border border-black/5 shadow-sm transition-shadow group flex flex-col`}
      style={{ willChange: "transform" }}
    >
      {/* Preview Image */}
      <div className="relative w-full overflow-hidden flex-shrink-0" style={{ aspectRatio: "4/3" }}>
        {cat.previewImage ? (
          <img
            src={cat.previewImage}
            alt={cat.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <PlaceholderImage label={`preview — ${cat.title}`} />
        )}
      </div>

      {/* Text */}
      <div className="px-3.5 pt-2.5 pb-3 flex-shrink-0 flex flex-col gap-0">
        <p className="font-extrabold text-sm text-foreground leading-snug mb-0.5">
          {cat.emoji} {cat.title}
        </p>
        <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-1">
          {cat.sub}
        </p>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5">
          <span className="text-[11px] font-semibold text-primary/80">לחצו לדוגמאות</span>
          <ChevronLeft className="w-3.5 h-3.5 text-primary/60" />
        </div>
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
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">

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

        {/* 4+4 Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
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