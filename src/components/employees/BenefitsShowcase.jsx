import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Smartphone, ShoppingCart, Gift, Plane, Music, Shirt, Store, ChevronLeft, ChevronRight } from "lucide-react";

// ─── DATA ───────────────────────────────────────────────────────────────────
const DAILY_PREVIEW = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7e52326a0_-2026-03-22T160414836.png";
const DAILY_EXTRA = ["https://media.base44.com/images/public/69bc4105141d932b80ba9f27/9ddb536b7_-2026-03-22T123739070.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/46e419525_-2026-02-18T150744909.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/ccb0d029b_-2026-02-18T145838528.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3f27a30a4_.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3211ae300_100.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/a4b03713f_-2026-03-22T142532392.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/096d0c835_70.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/8fb586f26_-2026-03-15T180501791.png"];

const SUPER_PREVIEW = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/d53a51271_-2026-03-22T163009970.png";
const SUPER_EXTRA = ["https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3784ac419_-2026-03-22T130058307.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/52e06185a_-2026-03-22T115442800.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6e4f9f168_-2026-03-22T130017988.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6b98c8aed_72.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/ea0c9f5da_-2026-02-18T145540109.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/1681bed30_-2026-03-22T143417632.png"];

const TECH_PREVIEW = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/db8e935e8_-2026-03-22T162955489.png";
const TECH_EXTRA = ["https://media.base44.com/images/public/69bc4105141d932b80ba9f27/477510a11_-2026-02-18T150203869.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/ca6b2de24_-2026-02-18T145345395.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/c7ef06ffc_-2026-02-18T141936848.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/96816d966_92.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/92d8c129a_-2026-02-18T150849922.png"];

const GIFT_PREVIEW = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/28d0b6e89_-2026-03-22T163901041.png";
const GIFT_EXTRA = ["https://media.base44.com/images/public/69bc4105141d932b80ba9f27/28d0b6e89_-2026-03-22T163901041.png"];

const VACATION_PREVIEW = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/1b29c5bb8_-2026-03-22T162942110.png";
const VACATION_EXTRA = ["https://media.base44.com/images/public/69bc4105141d932b80ba9f27/d11fc0b42_-2026-03-22T125322010.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/78ac452a3_-2026-03-22T130846774.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/cf3b11fa5_-2026-03-22T133529822.png"];

const CULTURE_PREVIEW = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3d11c2184_-2026-03-22T165538542.png";
const CULTURE_EXTRA = ["https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7271e7a2c_-2026-01-21T190449103.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/af45cadc7_3.jpg","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3c918e2dd_-2026-03-22T124329449.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/bb4b910ed_-2026-03-22T140039783.png"];

const FASHION_PREVIEW = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/9349388b9_-2026-03-22T163505767.png";
const FASHION_EXTRA = ["https://media.base44.com/images/public/69bc4105141d932b80ba9f27/82cf01fcc_87.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6a4f8399a_90.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/69b6386a9_-2026-03-22T132245384.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3715ded54_-2026-03-22T131700657.png"];

const FAIRS_PREVIEW = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/a551368ec_-2026-03-22T163623874.png";
const FAIRS_EXTRA = ["https://media.base44.com/images/public/69bc4105141d932b80ba9f27/695e0f051_-2026-02-18T142715149.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/53f2308b8_-2026-02-18T142941224.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/8cd871928_-2026-02-18T142743437.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/252939dda_-2026-01-21T194558315.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7036516f5_76.png"];

const CATEGORY_ICONS = {
  daily: Zap,
  tech: Smartphone,
  super: ShoppingCart,
  gift: Gift,
  vacation: Plane,
  culture: Music,
  fashion: Shirt,
  fairs: Store,
};

const categories = [
  { id: "daily", title: "כל בוקר הטבה חדשה", description: "כל יום מתחיל בהטבה חדשה שנשלחת לעובד בוואטסאפ, על מוצרי צריכה, מותגי פרימיום, חוויות ואטרקציות. תמיד במחיר הנמוך ביותר בישראל.", sub: "260 הטבות בשנה - ישירות לוואטסאפ שלך", tag: "המחיר הנמוך בישראל. תמיד.", tagBg: "bg-slate-700", previewImage: DAILY_PREVIEW, mainImage: DAILY_EXTRA[0], extraImages: DAILY_EXTRA.slice(1) },
  { id: "tech", title: "חשמל ואלקטרוניקה", description: "חנות קבועה של מוצרי חשמל, אלקטרוניקה, מחשבים וסלולר במחירי יבואן - מהמותגים שעובדים באמת רוצים.", sub: "Apple, Samsung, Dyson, Ninja ועוד", tag: "מחיר יבואן", tagBg: "bg-slate-600", previewImage: TECH_PREVIEW, mainImage: TECH_EXTRA[0], extraImages: TECH_EXTRA.slice(1) },
  { id: "super", title: "פארם, סופר ויוקר המחיה", description: "שוברי קניות לסופרמרקט והנחות קבועות על מוצרי יומיום - ערך מוחשי שמרגישים שוב ושוב בסל הקניות.", sub: "הנחה קבועה של עד 8% ברשתות הסופרים המוזלים", tag: "הנחה קבועה של 8% בסופר! (למטה ברשתות הדיסקאונט המוזלות)", tagBg: "bg-emerald-700", previewImage: SUPER_PREVIEW, mainImage: SUPER_EXTRA[0], extraImages: SUPER_EXTRA.slice(1) },
  { id: "gift", title: "מתנות לחגים", description: "הארגון בוחר איך להעניק את המתנה - תו לסופר, אתר בחירה למתנות או ארנק אלקטרוני.", sub: "מתנה אחת, כמה מתנות, או שילוב ביניהן - לפי מה שנכון לארגון ולעובדים.", detail: "הצטרפות לפלטפורמה תאפשר לעובדים ליהנות גם ממתנות חג משודרגות. הארגון יכול לבחור בין תו לסופר, אתר בחירה למתנות או ארנק אלקטרוני שיאפשר לעובדים לבחור כמה מתנות לחג ו/או לשלב גם תו לסופר.", tag: "בחירה חופשית", tagBg: "bg-violet-700", previewImage: GIFT_PREVIEW, mainImage: GIFT_PREVIEW, extraImages: GIFT_EXTRA }, — עם בחירה", description: "המתנה נשארת - אבל עכשיו העובד בוחר מה הוא באמת רוצה. ארנק דיגיטלי גמיש עם מגוון רחב של אפשרויות.", sub: "ארנק ממותג · בחירה חופשית · ניהול מרכזי", tag: "בחירה חופשית", tagBg: "bg-violet-700", previewImage: GIFT_PREVIEW, mainImage: GIFT_PREVIEW, extraImages: [] },
  { id: "vacation", title: "נופש וחופשות", description: "חבילות טיסה, מלון, הופעות ומשחקי ספורט בארץ ובחו\"ל - במחירים שסגורים רק לעובדי הארגון.", sub: "בארץ ובחו\"ל · מחירים בלעדיים", tag: "מחירים בלעדיים", tagBg: "bg-sky-700", previewImage: VACATION_PREVIEW, mainImage: VACATION_EXTRA[0], extraImages: VACATION_EXTRA.slice(1) },
  { id: "culture", title: "תרבות ופנאי", description: "הופעות, הצגות, פארקי שעשועים ואטרקציות - כי חוויית עובד טובה לא נגמרת בסוף יום העבודה.", sub: "כרטיסים · הנחות כניסה · אירועים", tag: "הנחת עובד", tagBg: "bg-rose-700", previewImage: CULTURE_PREVIEW, mainImage: CULTURE_EXTRA[0], extraImages: CULTURE_EXTRA.slice(1) },
  { id: "fashion", title: "אופנה, מותגים ולייף סטייל", description: "ביגוד, הנעלה, אקססוריז ומותגים מובילים - במחירים מיוחדים לעובדי הארגון, על דברים שעובדים באמת קונים.", sub: "מותגי פרימיום · מחירים בלעדיים · קנייה חכמה", tag: "מחירים בלעדיים", tagBg: "bg-stone-600", previewImage: FASHION_PREVIEW, mainImage: FASHION_EXTRA[0], extraImages: FASHION_EXTRA.slice(1) },
  { id: "fairs", title: "ירידים ואירועי פופ-אפ", description: "ירידי צרכנות, רכב, דירות, חזרה לבית הספר ואירועי מכירה מיוחדים - חוויות קנייה מרוכזות עם ערך אמיתי.", sub: "אירועים תקופתיים · מחירים מיוחדים · חוויית קנייה", tag: "אירועים מיוחדים", tagBg: "bg-teal-700", previewImage: FAIRS_PREVIEW, mainImage: FAIRS_EXTRA[0], extraImages: FAIRS_EXTRA.slice(1) },
];

// ─── MODAL ────────────────────────────────────────────────────────────────────
function CategoryModal({ category, onClose, onCTA }) {
  const gallery = [category.mainImage, ...(category.extraImages || [])].filter(Boolean);
  const [activeIdx, setActiveIdx] = useState(0);
  const activeImage = gallery[activeIdx];

  const goPrev = (e) => { e.stopPropagation(); setActiveIdx((i) => (i - 1 + gallery.length) % gallery.length); };
  const goNext = (e) => { e.stopPropagation(); setActiveIdx((i) => (i + 1) % gallery.length); };

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
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-[1010] w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-slate-700" />
        </button>

        {/* Single scroll container */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col lg:flex-row-reverse">

            {/* Image side */}
            <div className="w-full lg:w-3/5 bg-[#F5F7FA] p-6 flex flex-col items-center justify-center min-h-[300px] lg:min-h-[480px]">
              <div className="relative w-full flex items-center justify-center">
                {/* Prev arrow */}
                {gallery.length > 1 && (
                  <button onClick={goPrev} className="absolute right-0 z-10 w-9 h-9 rounded-full bg-white/80 shadow-md flex items-center justify-center hover:bg-white transition-all">
                    <ChevronRight className="w-5 h-5 text-slate-600" />
                  </button>
                )}

                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    className="max-w-[80%] max-h-[40vh] lg:max-h-[50vh] object-contain drop-shadow-2xl"
                  />
                </AnimatePresence>

                {/* Next arrow */}
                {gallery.length > 1 && (
                  <button onClick={goNext} className="absolute left-0 z-10 w-9 h-9 rounded-full bg-white/80 shadow-md flex items-center justify-center hover:bg-white transition-all">
                    <ChevronLeft className="w-5 h-5 text-slate-600" />
                  </button>
                )}
              </div>

              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="mt-6 w-full px-2">
                  <p className="text-[11px] font-semibold text-slate-400 mb-3 text-center">עוד הטבות מהקטגוריה ששווה להכיר:</p>
                  <div className="flex gap-2 overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none", paddingLeft: "12px" }} style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                    {gallery.map((url, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIdx(i)}
                        className={`flex-shrink-0 w-20 h-20 rounded-2xl border-2 bg-white shadow-sm transition-all ${
                          i === activeIdx ? "border-blue-500 scale-105 shadow-md" : "border-slate-100 hover:border-blue-300"
                        }`}
                      >
                        <img src={url} className="w-full h-full object-contain p-2 rounded-2xl" alt="" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Content side */}
            <div className="w-full lg:w-2/5 p-8 md:p-10 flex flex-col gap-5">
              <div>
                <span className="bg-blue-50 text-blue-600 text-[11px] font-bold px-3 py-1.5 rounded-full inline-block mb-4 border border-blue-100">
                  {category.tag}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 leading-tight">
                  {category.title}
                </h2>
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  {category.description}
                </p>
              </div>

              {/* Sub info */}
              <div className="flex items-center gap-2 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                <p className="text-blue-700 font-bold text-sm">{category.sub}</p>
              </div>

              {/* Detail text */}
              {category.detail && (
                <p className="text-slate-500 text-xs leading-relaxed" style={{ borderRight: "3px solid #E5E7EB", paddingRight: "10px" }}>
                  {category.detail}
                </p>
              )}

              {/* Glassmorphism CTA */}
              <div className="relative mt-auto pt-4">
                <motion.div
                  animate={{ boxShadow: ["0 0 0px rgba(37,99,235,0)", "0 0 16px rgba(37,99,235,0.4)", "0 0 0px rgba(37,99,235,0)"] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-[28px]"
                />
                <button
                  onClick={onCTA}
                  className="relative w-full bg-[#0066CC] text-white font-bold py-4 rounded-[28px] shadow-lg hover:bg-blue-700 transition-all active:scale-[0.97] text-base"
                >
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
              {/* Image area */}
              <div className="aspect-square bg-white flex items-center justify-center overflow-hidden rounded-t-[40px]">
                <img src={cat.previewImage} alt={cat.title} className="max-w-full max-h-full object-contain p-3" />
              </div>

              {/* Title */}
              <div className="px-3 pt-1 pb-2 flex items-center gap-2">
                {(() => { const Icon = CATEGORY_ICONS[cat.id]; return Icon ? <Icon className="w-4 h-4 text-blue-600 flex-shrink-0" strokeWidth={1} /> : null; })()}
                <h3 className="text-xs md:text-sm font-bold text-slate-800 leading-tight line-clamp-2">{cat.title}</h3>
              </div>

              {/* Glassmorphism CTA */}
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