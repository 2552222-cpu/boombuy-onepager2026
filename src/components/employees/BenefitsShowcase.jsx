import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import CategoryModal from "./CategoryModal";

const KAZABLAN_IMAGE = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/c23a343b2_-2026-02-18T150703392.png";

const categories = [
  {
    id: "super",
    emoji: "🛒",
    categoryLabel: "פארם, סופר ויוקר המחיה",
    modalTitle: "הנחות יומיומיות על קניות",
    headline: "עד 8% הנחה קבועה לסופר",
    subtitle: "שופרסל, רמי לוי, ויקטורי, סופר-פארם ועוד",
    tag: "8% תמיד",
    highlight: "8%",
    highlightColor: "text-emerald-600",
    bg: "from-emerald-50 to-green-100",
    image: null,
    items: [
      { title: "שופרסל", subtitle: "8% הנחה קבועה על כל קנייה", tag: "סופרמרקט", price: "8% הנחה", image: null },
      { title: "רמי לוי", subtitle: "8% הנחה קבועה על כל קנייה", tag: "סופרמרקט", price: "8% הנחה", image: null },
      { title: "ויקטורי", subtitle: "8% הנחה קבועה על כל קנייה", tag: "סופרמרקט", price: "8% הנחה", image: null },
      { title: "סופר-פארם", subtitle: "הנחות מיוחדות לעובדים על תרופות וטיפוח", tag: "פארם", price: "הנחת עובד", image: null },
      { title: "Be", subtitle: "הנחות על מוצרי טיפוח וקוסמטיקה", tag: "פארם", price: "הנחת עובד", image: null },
    ],
  },
  {
    id: "electronics",
    emoji: "📱",
    categoryLabel: "חשמל ואלקטרוניקה",
    modalTitle: "מחירי יבואן על מותגים מובילים",
    headline: "אייפון 16 פרו",
    subtitle: "מחיר יבואן רשמי · אחריות DCS",
    tag: "מחיר יבואן",
    highlight: "3,890 ₪",
    highlightColor: "text-primary",
    bg: "from-slate-800 to-slate-950",
    textLight: true,
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/a5f930278_-2026-01-21T190449103.png",
    items: [
      { title: "אייפון 16 פרו 256GB", subtitle: "אחריות רשמית DCS · מחיר יבואן", tag: "Apple", price: "3,890 ₪ (במקום 4,590 ₪)", image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/a5f930278_-2026-01-21T190449103.png" },
      { title: "Samsung Galaxy S25", subtitle: "מחיר יבואן רשמי לעובדים", tag: "Samsung", price: "הנחת עובד", image: null },
      { title: "מקבוק פרו", subtitle: "מחיר יבואן אפל רשמי", tag: "Apple", price: "מחיר יבואן", image: null },
      { title: "אוזניות AirPods Pro", subtitle: "מחיר יבואן אפל רשמי", tag: "Apple", price: "מחיר יבואן", image: null },
      { title: "טלוויזיות Samsung", subtitle: "מחירי יבואן על מגוון דגמים", tag: "Samsung", price: "מחיר יבואן", image: null },
    ],
  },
  {
    id: "perfume",
    emoji: "🌸",
    categoryLabel: "בישום",
    modalTitle: "בשמים ומוצרי יוקרה",
    headline: "בשמי יוקרה במחירי עובדים",
    subtitle: "Dior, Chanel, YSL ועוד מותגים מובילים",
    tag: "מחירי יוקרה",
    highlight: null,
    bg: "from-rose-50 to-pink-100",
    image: null,
    items: [
      { title: "Dior Sauvage", subtitle: "בושם גברי יוקרתי · מחיר מיוחד לעובדים", tag: "Dior", price: "הנחת עובד", image: null },
      { title: "Chanel N°5", subtitle: "בושם נשי קלאסי · מחיר מיוחד לעובדים", tag: "Chanel", price: "הנחת עובד", image: null },
      { title: "YSL Black Opium", subtitle: "בושם נשי · מחיר מיוחד לעובדים", tag: "YSL", price: "הנחת עובד", image: null },
      { title: "Giorgio Armani", subtitle: "מגוון בשמים · מחיר מיוחד לעובדים", tag: "Armani", price: "הנחת עובד", image: null },
    ],
  },
  {
    id: "culture",
    emoji: "🎭",
    categoryLabel: "תרבות ופנאי",
    modalTitle: "הופעות, תיאטרון ואטרקציות",
    headline: "קזבלן – הבימה",
    subtitle: "כרטיסים ביציע 67 ₪ | באולם 77 ₪",
    tag: "הופעת תרבות",
    highlight: "מ-67 ₪",
    highlightColor: "text-foreground",
    bg: "from-slate-800 to-slate-950",
    textLight: true,
    image: KAZABLAN_IMAGE,
    items: [
      { title: "קזבלן – הבימה הלאומי", subtitle: "כרטיסים ביציע 67 ₪ | באולם 77 ₪ | 7/5 בשעה 20:30", tag: "תיאטרון", price: "מ-67 ₪ (במקום 150-350 ₪)", image: KAZABLAN_IMAGE },
      { title: "הופעות מוזיקה", subtitle: "כרטיסים מוזלים לעובדים", tag: "מוזיקה", price: "הנחת עובד", image: null },
      { title: "פארקי שעשועים", subtitle: "Luna Park, ים מלח ועוד", tag: "פנאי", price: "הנחת עובד", image: null },
      { title: "קולנוע", subtitle: "כרטיסים מוזלים לרשתות הקולנוע", tag: "קולנוע", price: "הנחת עובד", image: null },
    ],
  },
  {
    id: "vacation",
    emoji: "✈️",
    categoryLabel: "חופשות",
    modalTitle: "חופשות מסובסדות בארץ ובחו\"ל",
    headline: "חופשה זוגית באילת",
    subtitle: "2 לילות + ארוחת בוקר | Brown Lighthouse",
    tag: "נופש",
    highlight: "מ-899 ₪ ללילה",
    highlightColor: "text-sky-600",
    bg: "from-sky-500 to-blue-700",
    textLight: true,
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/9fb38078a_-2026-02-18T145419883.png",
    items: [
      { title: "חופשה זוגית באילת", subtitle: "2 לילות + ארוחת בוקר | מלון Brown Lighthouse", tag: "ארץ", price: "מ-899 ₪ ללילה", image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/9fb38078a_-2026-02-18T145419883.png" },
      { title: "חופשה משפחתית בגאורגיה", subtitle: "3 לילות 5 כוכבים | טיסה + פנסיון + כבודה", tag: "חו\"ל", price: "מ-6,600 ₪ לזוג עם ילד", image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/085b551cc_91.png" },
      { title: "חופשה בתל אביב", subtitle: "סופ\"ש עירוני במלון בוטיק", tag: "ארץ", price: "הנחת עובד", image: null },
      { title: "חבילות אירופה", subtitle: "טיסה + מלון בחבילה", tag: "חו\"ל", price: "מחיר מיוחד", image: null },
    ],
  },
  {
    id: "daily",
    emoji: "⚡",
    categoryLabel: "הטבה חדשה כל יום",
    modalTitle: "הטבות יומיות מתחלפות",
    headline: "הטבה חדשה כל יום",
    subtitle: "מוצרים, שירותים ואטרקציות שמתחלפים כל בוקר",
    tag: "דינמי",
    highlight: null,
    bg: "from-violet-500 to-purple-700",
    textLight: true,
    image: null,
    items: [
      { title: "הטבת יום ראשון", subtitle: "מוצר או שירות מיוחד במחיר עובד", tag: "שבועי", price: "מחיר מיוחד", image: null },
      { title: "הטבת אמצע שבוע", subtitle: "מוצר או שירות מיוחד במחיר עובד", tag: "שבועי", price: "מחיר מיוחד", image: null },
      { title: "הטבת סוף שבוע", subtitle: "הפתעה שמחכה לכם בכל שישי", tag: "סוף שבוע", price: "מחיר מיוחד", image: null },
      { title: "הטבות עונתיות", subtitle: "בחגים ובמועדים מיוחדים – הטבות גדולות במיוחד", tag: "חגים", price: "מחיר מיוחד", image: null },
    ],
  },
];

export default function BenefitsShowcase() {
  const [activeCategory, setActiveCategory] = useState(null);
  const scrollToSurvey = () => {
    document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
            ההטבות הבלעדיות שהעובדים נהנו מהן בשנה האחרונה
          </h2>
          <p className="text-muted-foreground text-sm">לחצו על קטגוריה לצפייה בעוד הטבות</p>
        </motion.div>

        {/* 6-category grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              onClick={() => setActiveCategory(cat)}
              className="text-right group focus:outline-none"
            >
              <div className={`relative rounded-2xl overflow-hidden h-[180px] md:h-[220px] flex flex-col justify-end bg-gradient-to-br ${cat.bg} border border-border/20 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5`}>
                {/* Background image */}
                {cat.image && (
                  <>
                    <img
                      src={cat.image}
                      alt={cat.headline}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  </>
                )}

                {/* No-image: emoji decoration */}
                {!cat.image && (
                  <div className="absolute top-3 left-3 text-5xl opacity-[0.12] pointer-events-none select-none">
                    {cat.emoji}
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 p-4">
                  <span className={`text-[10px] font-semibold uppercase tracking-wider mb-1 block ${cat.textLight || cat.image ? "text-white/60" : "text-muted-foreground"}`}>
                    {cat.emoji} {cat.categoryLabel}
                  </span>
                  <h3 className={`text-sm md:text-base font-bold leading-snug ${cat.textLight || cat.image ? "text-white" : "text-foreground"}`}>
                    {cat.headline}
                  </h3>
                  <p className={`text-xs mt-0.5 leading-snug line-clamp-2 ${cat.textLight || cat.image ? "text-white/65" : "text-muted-foreground"}`}>
                    {cat.subtitle}
                  </p>
                  {cat.highlight && (
                    <span className={`inline-block mt-2 text-sm font-black ${cat.textLight || cat.image ? "text-white" : cat.highlightColor}`}>
                      {cat.highlight}
                    </span>
                  )}
                </div>

                {/* Hover indicator */}
                <div className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${cat.textLight || cat.image ? "bg-white/20" : "bg-black/10"}`}>
                  <ChevronLeft className={`w-3 h-3 ${cat.textLight || cat.image ? "text-white" : "text-foreground"}`} />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <button
            onClick={scrollToSurvey}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
          >
            גלו את ההטבות הבלעדיות שלכם ←
          </button>
          <p className="text-xs text-muted-foreground mt-3">15 שניות · בלי הרשמה · בחינם לחלוטין</p>
        </motion.div>
      </div>

      {/* Modal */}
      {activeCategory && (
        <CategoryModal
          category={activeCategory}
          onClose={() => setActiveCategory(null)}
        />
      )}
    </section>
  );
}