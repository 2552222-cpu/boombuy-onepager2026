import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Smartphone, Gift, Plane, Sparkles, Music } from "lucide-react";

const cards = [
  {
    icon: Sparkles,
    title: "כל בוקר הטבה חדשה",
    desc: "כל יום מחכה משהו שרלוונטי לחיים שלך",
    featured: true,
  },
  {
    icon: ShoppingCart,
    title: "יוקר המחיה",
    desc: "שוברי קניות לסופרמרקט, מורגש בכל שבוע",
    featured: false,
  },
  {
    icon: Smartphone,
    title: "חשמל ואלקטרוניקה",
    desc: "Apple, Samsung, Dyson, Ninja ועוד",
    featured: false,
  },
  {
    icon: Gift,
    title: "מתנת חג - עם בחירה",
    desc: "ארנק גמיש, בחירה חופשית",
    featured: false,
  },
  {
    icon: Plane,
    title: "נופש וחופשות",
    desc: 'בארץ ובחו"ל, מחירים בלעדיים',
    featured: false,
  },
  {
    icon: Music,
    title: "תרבות ופנאי",
    desc: "כרטיסים, אירועים ועוד",
    featured: false,
  },
];

export default function ValueCards() {
  return (
    <section className="py-16 md:py-20 px-4 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className={`rounded-2xl p-6 ${
                card.featured
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 sm:col-span-2 lg:col-span-1"
                  : "bg-white border border-border/50 shadow-sm"
              }`}
            >
              <card.icon className={`w-7 h-7 mb-3 ${card.featured ? "text-white/80" : "text-primary"}`} />
              <h3 className={`font-bold text-lg mb-1.5 ${card.featured ? "" : "text-foreground"}`}>
                {card.title}
              </h3>
              <p className={`text-sm leading-relaxed ${card.featured ? "text-white/80" : "text-muted-foreground"}`}>
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 bg-accent rounded-2xl p-5 text-center"
        >
          <p className="text-accent-foreground font-semibold text-sm md:text-base">
            ההטבות האלה לא דורשות מהמעסיק להוסיף תקציב
          </p>
        </motion.div>
      </div>
    </section>
  );
}