import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft } from "lucide-react";

// ─── ASSETS ──────────────────────────────────────────────────────────────────
// כל בוקר הטבה חדשה
const DAILY_MAIN = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/516ba6238_-2026-03-22T152453196.png";
// ⚠️ PLACEHOLDERS — יש להחליף ב-URLs אמיתיים לאחר העלאה
const DAILY_EXTRA = [
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/ccb0d029b_-2026-02-18T145838528.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3f27a30a4_.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3211ae300_100.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/a4b03713f_-2026-03-22T142532392.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/096d0c835_70.png",
];

// פארם, סופר
const SUPER_MAIN = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/0bf56386b_-2026-03-22T130058307.png";
const SUPER_EXTRA = [
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/52e06185a_-2026-03-22T115442800.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6e4f9f168_-2026-03-22T130017988.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6b98c8aed_72.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/ea0c9f5da_-2026-02-18T145540109.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/1681bed30_-2026-03-22T143417632.png",
];

// חשמל ואלקטרוניקה
const TECH_MAIN = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3be64bac9_95.png";
const TECH_EXTRA = [
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/ca6b2de24_-2026-02-18T145345395.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/c7ef06ffc_-2026-02-18T141936848.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/96816d966_92.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/92d8c129a_-2026-02-18T150849922.png",
];

// מתנת חג
const GIFT_MAIN = "https://media.base44.com/images/public/user_6873bc3c3e8d221ea3308e3a/5cd836c23_-2026-03-15T125003543.png";
const GIFT_EXTRA = []; // ⚠️ PLACEHOLDER

// נופש וחופשות
const VACATION_MAIN = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/d11fc0b42_-2026-03-22T125322010.png";
const VACATION_EXTRA = [
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/78ac452a3_-2026-03-22T130846774.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/cf3b11fa5_-2026-03-22T133529822.png",
];

// תרבות ופנאי
const CULTURE_MAIN = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7271e7a2c_-2026-01-21T190449103.png";
const CULTURE_EXTRA = [
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/af45cadc7_3.jpg",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3c918e2dd_-2026-03-22T124329449.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/bb4b910ed_-2026-03-22T140039783.png",
];

// אופנה
const FASHION_MAIN = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/82cf01fcc_87.png";
const FASHION_EXTRA = [
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6a4f8399a_90.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/69b6386a9_-2026-03-22T132245384.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3715ded54_-2026-03-22T131700657.png",
];

// ירידים
const FAIRS_MAIN = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/695e0f051_-2026-02-18T142715149.png";
const FAIRS_EXTRA = [
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
    mainImage: DAILY_MAIN,
    extraImages: DAILY_EXTRA,
    note: "מצאתם מחיר נמוך יותר בישראל? אנחנו מחזירים את ההפרש.",
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
    mainImage: SUPER_MAIN,
    extraImages: SUPER_EXTRA,
    note: null,
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
    mainImage: TECH_MAIN,
    extraImages: TECH_EXTRA,
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
    mainImage: GIFT_MAIN,
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
    mainImage: VACATION_MAIN,
    extraImages: VACATION_EXTRA,
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
    mainImage: CULTURE_MAIN,
    extraImages: CULTURE_EXTRA,
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
    mainImage: FASHION_MAIN,
    extraImages: FASHION_EXTRA,
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
    mainImage: FAIRS_MAIN,
    extraImages: FAIRS_EXTRA,
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
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 70 }}
        transition={{ type: "spring", damping: 30, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full md:max-w-xl rounded-t-3xl md:rounded-3xl shadow-2xl max-h-[92vh] flex flex-col"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur shadow flex items-center justify-center hover:bg-secondary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Main image — hero size */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full flex-shrink-0 overflow-hidden rounded-t-3xl md:rounded-t-3xl"
          style={{ aspectRatio: "4/3", maxHeight: "52vw", minHeight: 200 }}
        >
          {category.mainImage ? (
            <img
              src={category.mainImage}
              alt={category.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-secondary/40 flex items-center justify-center text-3xl">🖼️</div>
          )}
        </motion.div>

        {/* Header info */}
        <div className="px-5 pt-4 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`${category.tagBg} text-white text-[10px] font-bold px-2.5 py-1 rounded-full`}>
              {category.tag}
            </span>
          </div>
          <h3 className="text-lg font-black leading-snug">
            {category.emoji} {category.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{category.description}</p>
          {category.sub && (
            <p className="text-xs text-muted-foreground/80 mt-1 font-medium">{category.sub}</p>
          )}
          {category.note && (
            <div className="mt-3 bg-primary/8 border border-primary/20 rounded-xl px-4 py-2.5 text-xs text-primary font-medium">
              💡 {category.note}
            </div>
          )}
        </div>

        {/* Extra images */}
        <div className="overflow-y-auto flex-1 px-5 pb-2">
          {hasExtra ? (
            <>
              <p className="text-xs font-semibold text-muted-foreground mb-3">דוגמאות מהשנה האחרונה</p>
              <div className="grid grid-cols-2 gap-3">
                {category.extraImages.map((url, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className="aspect-square rounded-2xl overflow-hidden bg-secondary/30"
                  >
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 py-4 text-center text-muted-foreground">
              <span className="text-2xl">🖼️</span>
              <p className="text-sm font-medium">דוגמאות נוספות יתווספו בקרוב</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="px-5 pb-6 pt-4 border-t border-border/30 flex-shrink-0">
          <button
            onClick={onCTA}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/20 text-base"
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
      {/* Visual — 60% */}
      <div className="relative w-full overflow-hidden flex-shrink-0" style={{ aspectRatio: "4/3" }}>
        {cat.mainImage ? (
          <img
            src={cat.mainImage}
            alt={cat.title}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          />
        ) : (
          <PlaceholderImage label={`asset ראשי — ${cat.title}`} />
        )}
        {/* Badge */}
        <span className={`absolute top-2.5 right-2.5 ${cat.tagBg} text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow`}>
          {cat.tag}
        </span>
      </div>

      {/* Text — 40% */}
      <div className="px-3.5 pt-3 pb-3.5 flex-1 flex flex-col justify-between">
        <div>
          {!cat.imageHasTitle && (
            <p className="font-extrabold text-sm text-foreground leading-snug">
              {cat.emoji} {cat.title}
            </p>
          )}
          <p className={`text-[11px] text-muted-foreground leading-relaxed line-clamp-2 ${!cat.imageHasTitle ? "mt-1" : ""}`}>
            {cat.sub}
          </p>
        </div>
        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-black/5">
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

        {/* Bottom framing line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-xs text-muted-foreground mt-8 font-medium"
        >
          כל ההטבות ממומנות על ידי המערכת — לא על ידי המעסיק.
        </motion.p>

        {/* CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8 text-center bg-secondary/50 rounded-2xl px-6 py-8 border border-border/30"
        >
          <p className="text-base md:text-lg font-bold mb-1">בדקו אם גם אצלכם אפשר לקבל את זה</p>
          <p className="text-sm text-muted-foreground mb-5">3 שאלות קצרות — ותדעו מה מגיע לכם דרך הארגון</p>
          <button
            onClick={scrollToSurvey}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base px-8 py-3.5 rounded-xl shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5"
          >
            בדקו מה מגיע לי ←
          </button>
          <p className="text-xs text-muted-foreground mt-3">15 שניות · בלי הרשמה · בחינם לחלוטין</p>
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