import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "תהילה מליחי",
    org: "מקס",
    text: "ההטבות שלכם ייחודיות והכי שוות בעולם (בחיים לא קניתי אלו יוגה בחצי מחיר!) אבל השירות שלכם מוש. 🙏",
  },
  {
    name: "רועי לוי",
    org: "בנק לאומי",
    text: "ה-8% בסופר זה לא סתם מספר בשבילנו, אני ואשתי חוסכים כמה מאות שקל כל חודש, על אותה קנייה, בלי לשנות כלום. תודה!",
  },
  {
    name: "מיכל ברגר",
    org: "בנק ישראל",
    text: "ציפיתי למשהו בסגנון הנחה על מנוי כושר. קיבלתי הטבה חדשה כל יום בדיוק על מה שאני ממילא קונה.",
  },
  {
    name: "דן לוי",
    org: "SAP",
    text: "הייתי סקפטי. אבל Apple עוד לא ראיתי מעולם הטבה על אייפון בשום מועדון. מבעס שלא ידעתי על זה קודם 😂",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-16 md:py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-center mb-10"
        >
          מה עובדים אומרים
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-secondary/40 rounded-2xl p-6 border border-border/30"
            >
              <Stars />
              <p className="text-sm leading-relaxed mb-4 text-foreground/90">
                "{t.text}"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.org}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}