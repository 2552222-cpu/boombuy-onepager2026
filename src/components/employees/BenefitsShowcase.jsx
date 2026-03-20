import React from "react";
import { motion } from "framer-motion";

const mainBenefit = {
  category: "אלקטרוניקה",
  title: "אייפון 16 פרו",
  subtitle: "Apple iPhone 16 Pro 256GB · אחריות רשמית DCS",
  highlight: "מחיר לעובדים: 3,890 ₪",
  strikethrough: "במקום 4,590 ₪",
  tag: "מחיר יבואן רשמי",
  bg: "from-slate-800 to-slate-950",
  emoji: "📱",
  image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/a5f930278_-2026-01-21T190449103.png",
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
    image: null,
  },
  {
    category: "נופש ובידור",
    title: "קזבלן – הבימה",
    subtitle: "כרטיסים ביציע 67 ₪ | באולם 77 ₪",
    tag: "הטבת עובד",
    bg: "from-slate-700 to-slate-900",
    emoji: "🎭",
    highlight: null,
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/cca75e25b_-2026-02-18T150703392.png",
  },
  {
    category: "נופש ובידור",
    title: "חופשה זוגית באילת",
    subtitle: "2 לילות + ארוחת בוקר | מלון Brown Lighthouse",
    tag: "מ-899 ₪ ללילה",
    bg: "from-sky-500 to-blue-700",
    emoji: "✈️",
    highlight: null,
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/9fb38078a_-2026-02-18T145419883.png",
  },
  {
    category: "נופש ובידור",
    title: "חופשה משפחתית בגאורגיה",
    subtitle: "3 לילות 5 כוכבים | כולל כבודה, טיסה, פנסיון",
    tag: "מ-6,600 ₪ לזוג עם ילד",
    bg: "from-violet-500 to-purple-700",
    emoji: "🏖️",
    highlight: null,
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/085b551cc_91.png",
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
              {b.image ? (
                <div className="rounded-2xl overflow-hidden h-full min-h-[140px] flex flex-col relative border border-border/30 shadow-sm bg-white">
                  <div className="relative flex-1 min-h-[100px]">
                    <img src={b.image} alt={b.title} className="w-full h-full object-cover object-top" style={{maxHeight: 160}} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 right-0 left-0 p-3">
                      <span className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">{b.category}</span>
                      <h3 className="text-sm font-bold text-white leading-snug">{b.title}</h3>
                      <p className="text-[11px] text-white/70 mt-0.5">{b.subtitle}</p>
                    </div>
                  </div>
                  <div className="px-3 py-2 bg-white flex items-center justify-between">
                    <span className={`inline-block bg-gradient-to-r ${b.bg} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
                      {b.tag}
                    </span>
                    {b.highlight && <span className="text-xl font-black text-foreground">{b.highlight}</span>}
                  </div>
                </div>
              ) : (
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
              )}
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