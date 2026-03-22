import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft } from "lucide-react";

const KAZABLAN_IMG = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/c23a343b2_-2026-02-18T150703392.png";

const categories = [
  {
    id: "super",
    emoji: "🛒",
    title: "סופר ופארם",
    example: "8% הנחה קבועה בשופרסל, רמי לוי וויקטורי",
    tag: "8% תמיד",
    bg: "from-emerald-50 to-green-100",
    tagBg: "bg-emerald-600",
    image: null,
    description: "הנחה קבועה על כל קנייה שבועית — בלי קופונים",
    moreItems: [
      { title: "שופרסל", detail: "8% הנחה קבועה על כל קנייה", tag: "8% הנחה" },
      { title: "רמי לוי", detail: "8% הנחה קבועה על כל קנייה", tag: "8% הנחה" },
      { title: "ויקטורי", detail: "8% הנחה קבועה על כל קנייה", tag: "8% הנחה" },
      { title: "Super-Pharm", detail: "הנחה קבועה על טיפוח ותרופות", tag: "הנחת עובד" },
      { title: "יש פארם", detail: "הנחה קבועה על טיפוח ובריאות", tag: "הנחת עובד" },
    ],
  },
  {
    id: "tech",
    emoji: "📱",
    title: "חשמל ואלקטרוניקה",
    example: "אייפון 16 פרו — מחיר יבואן",
    tag: "מחיר יבואן",
    bg: "from-slate-50 to-slate-100",
    tagBg: "bg-slate-700",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/a5f930278_-2026-01-21T190449103.png",
    description: "מחירי יבואן רשמיים על Apple ועוד מותגים מובילים",
    moreItems: [
      { title: "iPhone 16 Pro 256GB", detail: "3,890 ₪ | מחיר שוק 4,590 ₪", tag: "חיסכון 700 ₪" },
      { title: "MacBook Air M3", detail: "מחיר יבואן רשמי", tag: "מחיר יבואן" },
      { title: "AirPods Pro 2", detail: "מחיר יבואן רשמי", tag: "מחיר יבואן" },
      // ⚠️ PLACEHOLDER – יש להוסיף כאן פריטים אמיתיים נוספים שאושרו
    ],
  },
  {
    id: "fragrance",
    emoji: "🌸",
    title: "בישום ויוקרה",
    example: "Dior, Calvin Klein, Chanel — מחיר יבואן",
    tag: "מחיר יבואן",
    bg: "from-pink-50 to-rose-100",
    tagBg: "bg-rose-500",
    image: null,
    description: "בשמים ממותגים מובילים במחיר יבואן ישיר",
    moreItems: [
      { title: "Calvin Klein Eternity", detail: "מחיר יבואן רשמי", tag: "מחיר יבואן" },
      { title: "Dior Sauvage", detail: "מחיר יבואן רשמי", tag: "מחיר יבואן" },
      { title: "Chanel No. 5", detail: "מחיר יבואן רשמי", tag: "מחיר יבואן" },
      { title: "Giorgio Armani Acqua di Giò", detail: "מחיר יבואן רשמי", tag: "מחיר יבואן" },
      { title: "Hugo Boss Bottled", detail: "מחיר יבואן רשמי", tag: "מחיר יבואן" },
    ],
  },
  {
    id: "culture",
    emoji: "🎭",
    title: "תרבות ופנאי",
    example: "קזבלן – הבימה | ביציע 67 ₪",
    tag: "67 ₪ ביציע",
    bg: "from-violet-50 to-purple-100",
    tagBg: "bg-violet-600",
    image: KAZABLAN_IMG,
    description: "הצגות ואירועי תרבות במחיר עובדים",
    moreItems: [
      { title: "קזבלן – הבימה", detail: "ביציע 67 ₪ | באולם 77 ₪ | מחיר רגיל 150–350 ₪", tag: "עד 78% הנחה", image: KAZABLAN_IMG },
      // ⚠️ PLACEHOLDER – יש להוסיף כאן הצגות / אירועי תרבות נוספים שאושרו
    ],
  },
  {
    id: "vacation",
    emoji: "✈️",
    title: "חופשות",
    example: "Brown Lighthouse אילת — מ-899 ₪ ללילה",
    tag: "מ-899 ₪ ללילה",
    bg: "from-sky-50 to-blue-100",
    tagBg: "bg-sky-600",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/9fb38078a_-2026-02-18T145419883.png",
    description: "חופשות בארץ ובחו\"ל במחיר עובדים",
    moreItems: [
      { title: "Brown Lighthouse אילת", detail: "מ-899 ₪ ללילה | כולל ארוחת בוקר", tag: "מחיר עובד" },
      // ⚠️ PLACEHOLDER – יש להוסיף כאן חופשות נוספות שאושרו (מלון / יעד / מחיר)
    ],
  },
  {
    id: "fashion",
    emoji: "👟",
    title: "ביגוד ואופנה",
    example: "Nike, Adidas, Lululemon — מחיר יבואן",
    tag: "מחיר יבואן",
    bg: "from-amber-50 to-orange-100",
    tagBg: "bg-orange-500",
    image: null,
    description: "מותגי ספורט ואופנה מובילים במחיר יבואן",
    moreItems: [
      // ⚠️ PLACEHOLDER – יש להוסיף כאן פריטים אמיתיים שאושרו (מותג / פריט / מחיר)
    ],
  },
];

function CategoryModal({ category, onClose }) {
  const scrollToSurvey = () => {
    onClose();
    setTimeout(() => {
      document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const hasItems = category.moreItems && category.moreItems.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full md:max-w-lg rounded-t-3xl md:rounded-3xl shadow-2xl max-h-[85vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border/40 px-5 py-4 flex items-center justify-between rounded-t-3xl z-10">
          <div>
            <p className="text-xs text-muted-foreground font-medium">{category.emoji} {category.title}</p>
            <h3 className="text-lg font-black">{category.description}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-border transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items */}
        <div className="p-5 flex flex-col gap-3">
          {hasItems ? category.moreItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3 bg-secondary/50 rounded-xl overflow-hidden"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover flex-shrink-0"
                />
              )}
              <div className={`flex items-center justify-between flex-1 ${item.image ? "py-3 pl-3" : "px-4 py-3.5"}`}>
                <div>
                  <p className="font-bold text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
                </div>
                <span className={`${category.tagBg} text-white text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap mr-3 flex-shrink-0`}>
                  {item.tag}
                </span>
              </div>
            </motion.div>
          )) : (
            <div className="text-center py-8 text-muted-foreground text-sm">
              פריטים לקטגוריה זו יתווספו בקרוב
            </div>
          )}
        </div>

        {/* Modal CTA */}
        <div className="sticky bottom-0 bg-white border-t border-border/30 px-5 py-4">
          <button
            onClick={scrollToSurvey}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 rounded-xl transition-all shadow-md shadow-primary/20"
          >
            זה מעניין אותי — בדקו מה מגיע לי
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function BenefitsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const scrollToSurvey = () => {
    document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
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
          <p className="text-muted-foreground text-sm">לחצו על קטגוריה לראות דוגמאות אמיתיות</p>
        </motion.div>

        {/* 6-category grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              onClick={() => setSelectedCategory(cat)}
              className={`bg-gradient-to-br ${cat.bg} rounded-2xl p-0 text-right overflow-hidden border border-border/20 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group`}
            >
              {cat.image ? (
                <div className="relative h-32 md:h-40 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 right-0 left-0 p-3">
                    <p className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">{cat.emoji} {cat.title}</p>
                    <p className="text-sm font-bold text-white leading-snug">{cat.example}</p>
                  </div>
                  <span className={`absolute top-2 left-2 ${cat.tagBg} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                    {cat.tag}
                  </span>
                </div>
              ) : (
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`${cat.tagBg} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                      {cat.tag}
                    </span>
                    <span className="text-2xl">{cat.emoji}</span>
                  </div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">{cat.title}</p>
                  <p className="text-sm font-bold text-foreground leading-snug">{cat.example}</p>
                </div>
              )}
              <div className="px-3 py-2 flex items-center justify-between border-t border-black/5">
                <span className="text-[11px] font-semibold text-muted-foreground">לחצו לעוד הטבות</span>
                <ChevronLeft className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center bg-secondary/50 rounded-2xl px-6 py-8 border border-border/30"
        >
          <p className="text-base md:text-lg font-bold mb-1">רוצים לראות עוד דוגמאות?</p>
          <p className="text-sm text-muted-foreground mb-5">גלו את ההטבות הבלעדיות שהעובדים נהנו מהן בשנה האחרונה</p>
          <button
            onClick={scrollToSurvey}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base px-8 py-3.5 rounded-xl shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5"
          >
            בדוק מה מגיע לך ←
          </button>
          <p className="text-xs text-muted-foreground mt-3">15 שניות · בלי הרשמה · בחינם לחלוטין</p>
        </motion.div>
      </div>

      {/* Category Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <CategoryModal
            category={selectedCategory}
            onClose={() => setSelectedCategory(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}