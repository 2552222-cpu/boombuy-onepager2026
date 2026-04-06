import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft } from "lucide-react";

// ─── ASSETS (הקישורים המדויקים שלך - ללא שינוי) ───────────────────────────────
const DAILY_PREVIEW = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7e52326a0_-2026-03-22T160414836.png";
const DAILY_EXTRA = [
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/9ddb536b7_-2026-03-22T123739070.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/46e419525_-2026-02-18T150744909.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/ccb0d029b_-2026-02-18T145838528.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3f27a30a4_.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3211ae300_100.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/a4b03713f_-2026-03-22T142532392.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/096d0c835_70.png",
  "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/e5b27b9ef_-2026-03-16T131338488.png",
];
const SUPER_PREVIEW = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/d53a51271_-2026-03-22T163009970.png";
const SUPER_EXTRA = ["https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3784ac419_-2026-03-22T130058307.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/52e06185a_-2026-03-22T115442800.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6e4f9f168_-2026-03-22T130017988.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6b98c8aed_72.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/ea0c9f5da_-2026-02-18T145540109.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/1681bed30_-2026-03-22T143417632.png"];
const TECH_PREVIEW = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/db8e935e8_-2026-03-22T162955489.png";
const TECH_EXTRA = ["https://media.base44.com/images/public/69bc4105141d932b80ba9f27/477510a11_-2026-02-18T150203869.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/ca6b2de24_-2026-02-18T145345395.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/c7ef06ffc_-2026-02-18T141936848.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/96816d966_92.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/92d8c129a_-2026-02-18T150849922.png"];
const GIFT_PREVIEW = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/28d0b6e89_-2026-03-22T163901041.png";
const VACATION_PREVIEW = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/1b29c5bb8_-2026-03-22T162942110.png";
const VACATION_EXTRA = ["https://media.base44.com/images/public/69bc4105141d932b80ba9f27/d11fc0b42_-2026-03-22T125322010.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/78ac452a3_-2026-03-22T130846774.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/cf3b11fa5_-2026-03-22T133529822.png"];
const CULTURE_PREVIEW = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3d11c2184_-2026-03-22T165538542.png";
const CULTURE_EXTRA = ["https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7271e7a2c_-2026-01-21T190449103.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/af45cadc7_3.jpg","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3c918e2dd_-2026-03-22T124329449.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/bb4b910ed_-2026-03-22T140039783.png"];
const FASHION_PREVIEW = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/9349388b9_-2026-03-22T163505767.png";
const FASHION_EXTRA = ["https://media.base44.com/images/public/69bc4105141d932b80ba9f27/82cf01fcc_87.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6a4f8399a_90.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/69b6386a9_-2026-03-22T132245384.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3715ded54_-2026-03-22T131700657.png"];
const FAIRS_PREVIEW = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/a551368ec_-2026-03-22T163623874.png";
const FAIRS_EXTRA = ["https://media.base44.com/images/public/69bc4105141d932b80ba9f27/695e0f051_-2026-02-18T142715149.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/53f2308b8_-2026-02-18T142941224.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/8cd871928_-2026-02-18T142743437.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/252939dda_-2026-01-21T194558315.png","https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7036516f5_76.png"];

// ─── DATA ─────────────────────────────────────────────────────────────────────
const categories = [
  { id: "daily", emoji: "⚡", title: "כל בוקר הטבה חדשה", description: "כל יום מתחיל בהטבה חדשה שנשלחת לעובד בוואטסאפ — על מוצרי צריכה, מותגי פרימיום, חוויות ואטרקציות — תמיד במחיר הנמוך ביותר בישראל.", sub: "260 הטבות בשנה - ישירות לוואטסאפ שלך", tag: "המחיר הנמוך בישראל. תמיד.", tagBg: "bg-slate-700", previewImage: DAILY_PREVIEW, mainImage: DAILY_EXTRA[0], extraImages: DAILY_EXTRA.slice(1) },
  { id: "tech", emoji: "📱", title: "חשמל ואלקטרוניקה", description: "חנות קבועה של מוצרי חשמל, אלקטרוניקה, מחשבים וסלולר במחירי יבואן - מהמותגים שעובדים באמת רוצים.", sub: "Apple, Samsung, Dyson, Ninja ועוד", tag: "מחיר יבואן", tagBg: "bg-slate-600", previewImage: TECH_PREVIEW, mainImage: TECH_EXTRA[0], extraImages: TECH_EXTRA.slice(1) },
  { id: "super", emoji: "🛒", title: "פארם, סופר ויוקר המחיה", description: "שוברי קניות לסופרמרקט והנחות קבועות על מוצרי יומיום - ערך מוחשי שמרגישים שוב ושוב בסל הקניות.", sub: "הנחה קבועה של עד 8% ברשתות הסופרים המוזלים", tag: "עד 8% תמיד", tagBg: "bg-emerald-700", previewImage: SUPER_PREVIEW, mainImage: SUPER_EXTRA[0], extraImages: SUPER_EXTRA.slice(1) },
  { id: "gift", emoji: "🎁", title: "מתנת חג — עם בחירה", description: "המתנה נשארת - אבל עכשיו העובד בוחר מה הוא באמת רוצה. ארנק דיגיטלי גמיש עם מגוון רחב של אפשרויות.", sub: "ארנק ממותג · בחירה חופשית · ניהול מרכזי", tag: "בחירה חופשית", tagBg: "bg-violet-700", previewImage: GIFT_PREVIEW, mainImage: GIFT_PREVIEW, extraImages: [] },
  { id: "vacation", emoji: "✈️", title: "נופש וחופשות", description: "חבילות טיסה, מלון, הופעות ומשחקי ספורט בארץ ובחו\"ל - במחירים שסגורים רק לעובדי הארגון.", sub: "בארץ ובחו\"ל · מחירים בלעדיים", tag: "מחירים בלעדיים", tagBg: "bg-sky-700", previewImage: VACATION_PREVIEW, mainImage: VACATION_EXTRA[0], extraImages: VACATION_EXTRA.slice(1) },
  { id: "culture", emoji: "🎭", title: "תרבות ופנאי", description: "הופעות, הצגות, פארקי שעשועים ואטרקציות - כי חוויית עובד טובה לא נגמרת בסוף יום העבודה.", sub: "כרטיסים · הנחות כניסה · אירועים", tag: "הנחת עובד", tagBg: "bg-rose-700", previewImage: CULTURE_PREVIEW, mainImage: CULTURE_EXTRA[0], extraImages: CULTURE_EXTRA.slice(1) },
  { id: "fashion", emoji: "👟", title: "אופנה, מותגים ולייף סטייל", description: "ביגוד, הנעלה, אקססוריז ומותגים מובילים - במחירים מיוחדים לעובדי הארגון, על דברים שעובדים באמת קונים.", sub: "מותגי פרימיום · מחירים בלעדיים · קנייה חכמה", tag: "מחירים בלעדיים", tagBg: "bg-stone-600", previewImage: FASHION_PREVIEW, mainImage: FASHION_EXTRA[0], extraImages: FASHION_EXTRA.slice(1) },
  { id: "fairs", emoji: "🏪", title: "ירידים ואירועי פופ-אפ", description: "ירידי צרכנות, רכב, דירות, חזרה לבית הספר ואירועי מכירה מיוחדים - חוויות קנייה מרוכזות עם ערך אמיתי.", sub: "אירועים תקופתיים · מחירים מיוחדים · חוויית קנייה", tag: "אירועים מיוחדים", tagBg: "bg-teal-700", previewImage: FAIRS_PREVIEW, mainImage: FAIRS_EXTRA[0], extraImages: FAIRS_EXTRA.slice(1) },
];

// ─── MODAL ────────────────────────────────────────────────────────────────────
function CategoryModal({ category, onClose, onCTA }) {
  const gallery = [category.mainImage, ...(category.extraImages || [])].filter(Boolean);
  const [activeImage, setActiveImage] = useState(gallery[0] || null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 md:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl h-full md:h-auto md:max-h-[92vh] bg-white md:rounded-[32px] overflow-hidden flex flex-col lg:flex-row-reverse text-right"
        dir="rtl"
      >
        <button onClick={onClose} className="absolute top-4 left-4 z-[1010] w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center border border-black/5">
          <X className="w-6 h-6 text-slate-900" />
        </button>

        <div className="w-full lg:w-3/5 bg-[#F8F9FB] flex flex-col items-center justify-center p-4 md:p-12 relative min-h-[320px]">
          <div className="flex-1 flex items-center justify-center w-full">
             <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="max-w-[85%] max-h-[45vh] md:max-h-[55vh] object-contain drop-shadow-2xl"
                />
             </AnimatePresence>
          </div>

          {gallery.length > 1 && (
            <div className="flex gap-2 mt-6 overflow-x-auto pb-2 w-full justify-center no-scrollbar">
              {gallery.map((url, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(url)}
                  className={`flex-shrink-0 w-16 h-16 rounded-xl border-2 transition-all ${activeImage === url ? "border-blue-600 scale-105" : "border-transparent opacity-50 hover:opacity-100"}`}
                >
                  <img src={url} className="w-full h-full object-contain p-1" alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-full lg:w-2/5 p-6 md:p-12 flex flex-col overflow-y-auto">
          <div className="mb-auto">
            <span className={`${category.tagBg} text-white text-[11px] font-bold px-3 py-1.5 rounded-full inline-block mb-4`}>
              {category.tag}
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-4 leading-[1.1]">
              {category.title}
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6">
              {category.description}
            </p>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-slate-500 font-medium text-sm md:text-base">
              {category.sub}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={onCTA}
              className="w-full bg-[#0066CC] text-white font-bold py-4 md:py-5 rounded-2xl shadow-xl hover:bg-blue-700 transition-all active:scale-[0.98] text-lg"
            >
              אני רוצה שהארגון שלי יצטרף
            </button>
            <button onClick={onClose} className="w-full bg-slate-100 text-slate-700 font-semibold py-3 rounded-2xl md:hidden">
              סגור
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function BenefitsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <section className="py-16 md:py-24 px-4 bg-white" dir="rtl" style={{ overflowX: 'hidden' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
           <p className="text-blue-600 font-bold text-sm tracking-widest uppercase mb-3">לחצו כדי לגלות עוד</p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-5">
            מה עוד מחכה לך בפנים?
          </h2>
          <p className="text-slate-500 text-lg md:text-xl max-w-3xl mx-auto">
            כאן נכנסים לעומק. כל קטגוריה נפתחת ומציגה דוגמאות אמיתיות מהפלטפורמה.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              onClick={() => setSelectedCategory(cat)}
              className="cursor-pointer group bg-white rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all flex flex-col h-full"
            >
              <div className="aspect-square bg-[#FAFAFB] p-4 flex items-center justify-center rounded-t-[24px] md:rounded-t-[32px] overflow-hidden">
                <img
                  src={cat.previewImage}
                  alt={cat.title}
                  className="max-w-[90%] max-h-[90%] object-contain group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-4 md:p-6 flex flex-col flex-grow">
                <span className={`text-[9px] md:text-[11px] font-bold ${cat.tagBg} text-white px-2.5 py-1 rounded-full w-fit mb-3`}>
                  {cat.tag}
                </span>
                <h3 className="text-sm md:text-lg font-black text-slate-800 leading-tight">
                  {cat.emoji} {cat.title}
                </h3>
                <p className="text-[10px] md:text-sm text-slate-400 mt-2 line-clamp-2 font-medium">
                  {cat.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-6 bg-slate-50 rounded-[24px] border border-slate-100 flex items-center justify-center gap-3">
           <span className="text-slate-300">ℹ️</span>
           <p className="text-slate-500 text-sm md:text-base font-medium text-center">
             ההטבה זמינה לעובדים המחוברים לפלטפורמה ומותנית בהצטרפות הארגון.
           </p>
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