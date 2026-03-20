import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const benefits = [
  {
    category: "סופרמרקט",
    title: "8% הנחה קבועה על כל קנייה",
    desc: "שופרסל, רמי לוי, ויקטורי ועוד",
    tag: "הנחה קבועה",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    category: "אלקטרוניקה",
    title: "מחיר יבואן על Apple",
    desc: "iPhone, iPad, Mac, AirPods",
    tag: "מחיר יבואן",
    gradient: "from-slate-700 to-slate-900",
  },
  {
    category: "נופש",
    title: "חופשות בארץ ובחו״ל",
    desc: "מלונות, טיסות, חבילות נופש",
    tag: "הטבות בלעדיות",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    category: "מותגים",
    title: "Samsung, Dyson, Ninja",
    desc: "מוצרי חשמל במחירי פלטפורמה",
    tag: "חיסכון משמעותי",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    category: "פארם",
    title: "קוסמטיקה וטיפוח",
    desc: "מותגים מובילים בהנחות קבועות",
    tag: "הטבה יומית",
    gradient: "from-rose-400 to-pink-600",
  },
  {
    category: "אופנה",
    title: "בגדים ומותגי אופנה",
    desc: "שוברים למותגים מובילים",
    tag: "הטבות מחיר",
    gradient: "from-amber-500 to-orange-600",
  },
];

export default function BenefitsSlider() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft < -10);
    setCanScrollRight(el.scrollLeft > -(el.scrollWidth - el.clientWidth - 10));
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll);
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = dir === "right" ? -300 : 300;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">הטבות שבאמת משתמשים בהן</h2>
          <p className="text-muted-foreground">כל יום הטבות חדשות על מה שקונים ממילא</p>
        </motion.div>

        <div className="relative">
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white shadow-lg rounded-full items-center justify-center border border-border/50 hover:bg-secondary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white shadow-lg rounded-full items-center justify-center border border-border/50 hover:bg-secondary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex-shrink-0 w-[260px] md:w-[280px] snap-start"
              >
                <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full">
                  <div className={`bg-gradient-to-br ${b.gradient} p-5 text-white`}>
                    <span className="text-xs font-medium opacity-80">{b.category}</span>
                    <h3 className="font-bold text-lg mt-1 leading-snug">{b.title}</h3>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground mb-3">{b.desc}</p>
                    <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                      {b.tag}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}