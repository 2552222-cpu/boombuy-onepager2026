import React from "react";
import { motion } from "framer-motion";

const mainBenefit = {
  category: "אלקטרוניקה",
  title: "אייפון 16 פרו",
  subtitle: "Apple iPhone 16 Pro 256GB",
  highlight: "מחיר לעובדים: 3,890 ₪",
  strikethrough: "במקום 4,590 ₪",
  tag: "מחיר יבואן רשמי",
  bg: "from-slate-800 to-slate-950",
  emoji: "📱",
};

const smallBenefits = [
  {
    category: "סופרמרקט",
    title: "8% הנחה קבועה",
    subtitle: "שופרסל, רמי לוי, ויקטורי",
    tag: "כל קנייה",
    bg: "from-emerald-500 to-green-700",
    emoji: "🛒",
    highlight: "8%",
  },
  {
    category: "נופש",
    title: "חופשות בארץ ובחו״ל",
    subtitle: "מלונות, טיסות, חבילות",
    tag: "הטבות בלעדיות",
    bg: "from-sky-500 to-blue-700",
    emoji: "✈️",
    highlight: null,
  },
  {
    category: "מותגים",
    title: "Samsung, Dyson, Ninja",
    subtitle: "מוצרי חשמל מובילים",
    tag: "מחיר פלטפורמה",
    bg: "from-violet-500 to-purple-700",
    emoji: "⚡",
    highlight: null,
  },
  {
    category: "פארם ואופנה",
    title: "קוסמטיקה ומותגי אופנה",
    subtitle: "מותגים מובילים בהנחה קבועה",
    tag: "הטבה יומית",
    bg: "from-rose-400 to-pink-600",
    emoji: "💄",
    highlight: null,
  },
];

export default function BenefitsShowcase() {
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
          <p className="text-muted-foreground text-sm">לא קופונים. לא חד-פעמי. הטבות אמיתיות שמשתמשים בהן כל יום.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* MAIN CARD - spans 2 rows */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:row-span-2 md:col-span-1"
          >
            <div className={`bg-gradient-to-br ${mainBenefit.bg} rounded-3xl p-6 h-full min-h-[320px] flex flex-col justify-between text-white relative overflow-hidden`}>
              <div>
                <span className="text-xs font-semibold opacity-60 uppercase tracking-wider">{mainBenefit.category}</span>
                <div className="mt-3">
                  <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {mainBenefit.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-black leading-tight mb-1">{mainBenefit.title}</h3>
                <p className="text-sm opacity-70 mb-4">{mainBenefit.subtitle}</p>
              </div>
              <div>
                <p className="text-sm opacity-50 line-through mb-1">{mainBenefit.strikethrough}</p>
                <p className="text-xl font-black text-emerald-300">{mainBenefit.highlight}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent rounded-b-3xl" />
              <div className="absolute top-4 left-4 text-5xl opacity-10">{mainBenefit.emoji}</div>
            </div>
          </motion.div>

          {/* SMALL CARDS */}
          {smallBenefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i + 1) * 0.08 }}
            >
              <div className={`bg-gradient-to-br ${b.bg} rounded-2xl p-5 h-full min-h-[140px] flex flex-col justify-between text-white relative overflow-hidden`}>
                <div>
                  <span className="text-xs font-semibold opacity-60 uppercase tracking-wider">{b.category}</span>
                  <h3 className="text-lg font-bold leading-snug mt-1">{b.title}</h3>
                  <p className="text-xs opacity-70 mt-1">{b.subtitle}</p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="inline-block bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {b.tag}
                  </span>
                  {b.highlight && (
                    <span className="text-2xl font-black text-white">{b.highlight}</span>
                  )}
                </div>
                <div className="absolute top-3 left-3 text-4xl opacity-10">{b.emoji}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
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
    </section>
  );
}