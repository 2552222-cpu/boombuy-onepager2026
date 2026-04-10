import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "תהילה מליחי",
    org: "מקס",
    text: "ההטבות שלכם הכי שוות! תודה. קניתי אלו יוגה וחסכתי בקנייה אחת 1,000₪!",
  },
  {
    name: "רועי לוי",
    org: "בנק לאומי",
    text: "ה-8% בסופר זה לא סתם מספר בשבילנו, אני ואשתי חוסכים כמה מאות שקל כל חודש, על אותה קנייה, בלי לשנות כלום. תודה!",
  },
  {
    name: "מיכל ברגר",
    org: "בנק ישראל",
    text: "ציפינו לעוד מועדון... וקיבלנו את ה\"מועדון\"! אחלה הטבות תמשיכו ככה!",
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
    <section className="py-10 md:py-20 bg-white" style={{ overflowX: 'hidden', maxWidth: '100vw', padding: '60px 16px' }}>
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xl md:text-3xl font-bold text-center mb-6 md:mb-10"
        >
          מה עובדים אומרים
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-secondary/40 rounded-lg md:rounded-2xl p-4 md:p-6"
            >
              <Stars />
              <p className="text-sm md:text-[15px] leading-relaxed mb-3 md:mb-4 text-foreground/90">
                "{t.text}"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-7 md:w-8 h-7 md:h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs md:text-sm flex-shrink-0">
                  {t.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm md:text-[15px] font-semibold truncate">{t.name}</p>
                  <p className="text-xs md:text-sm text-muted-foreground truncate">{t.org}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}