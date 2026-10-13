import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const BG = "#FBFAF8";
const CHARCOAL = "#17191D";
const BODY = "#3A3C42";
const CORAL = "#F47A5A";
const EASE = [0.22, 1, 0.36, 1];

// All FAQ items. `featured` ones are always visible; the rest are revealed by the
// "עוד שאלות" toggle. Every item stays in the DOM (inside <details>) for SEO/AI.
const ITEMS = [
  { q: "מה כלול ומה העלות?", a: "לחברות עד 1,000 עובדים יש מסלול חינם עם אתר הטבות. מועדון ממותג בשם הארגון עולה 10 ₪ לעובד לחודש, וארגון שמעביר דרכנו את מתנות החג מקבל עליו זיכוי.", featured: true },
  { q: "מה הארגון צריך לעשות?", a: "לאשר מדיניות, זכאות ותקציב. כל השאר עלינו: מיתוג, ספקים, השקה, תקשורת, הזמנות, ושירות לעובדים עם מענה עד סוף יום העסקים.", featured: true },
  { q: "תוך כמה זמן עולים לאוויר?", a: "14 עד 21 יום מרגע ההחלטה.", featured: true },
  { q: "לאילו ארגונים זה מתאים?", a: "לארגונים, לוועדים, לאיגודים ולמועדוני לקוחות. יותר מ־300 ארגונים עובדים איתנו, מעשרות עובדים ועד עשרות אלפים.", featured: true },
  { q: "מה boombuy מפעילה עבורנו?", a: "אנחנו מקימים ומפעילים את מועדון ההטבות של הארגון, במותג שלכם: האתר, ההטבות, הספקים, ההשקה והשירות לעובדים.", featured: false },
  { q: "איך מתחילים?", a: "משאירים פרטים בבדיקת ההתאמה, בוחרים יום ושעה, ומדברים איתנו חצי שעה.", featured: false },
  { q: "מה זו ההטבה היומית?", a: "כל בוקר העובדים מקבלים הטבה חדשה על מוצר, תמיד במחיר הנמוך בישראל ביום שלה. מצאו את המוצר זול יותר באותו יום? מקבלים את ההפרש בנקודות.", featured: false },
  { q: "המועדון יהיה בשם שלנו?", a: "כן. אתר ממותג בשם הארגון, עם הלוגו שלכם.", featured: false },
  { q: "מי נותן שירות לעובדים?", a: "אנחנו. העובדים פונים אלינו ומקבלים מענה עד סוף יום העסקים.", featured: false },
  { q: "מה אם העובדים לא ישתמשו?", a: "בעשרת הארגונים האחרונים שהשקנו, 8 מתוך 10 עובדים הצטרפו תוך שבועות, ו־60% קונים שוב.", featured: false },
  { q: "גם איגודים ועמותות יכולים?", a: "כן. לאיגודים יש מודל שותפות: מועדון בשם האיגוד, ומקור הכנסה מהרכישות של החברים.", featured: false },
  { q: "מה קורה עם הנתונים של העובדים?", a: "הנתונים משותפים לארגון ול־boombuy, ונמחקים בסיום ההתקשרות.", featured: false },
];

export default function FAQ() {
  const [open, setOpen] = useState(false);
  const featured = ITEMS.filter((i) => i.featured);
  const rest = ITEMS.filter((i) => !i.featured);

  return (
    <section
      id="faq"
      dir="rtl"
      style={{
        background: BG,
        padding: "84px 20px 92px",
        fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif",
        scrollMarginTop: 90,
      }}
    >
      <style>{`
        @media (max-width:768px){ #faq{ scroll-margin-top:72px; padding:48px 16px 56px !important; } }
        .faq-item{ border-bottom:1px solid rgba(19,21,25,0.10); }
        .faq-item summary{ list-style:none; cursor:pointer; display:flex; align-items:center; justify-content:space-between; gap:16px; padding:22px 4px; font-weight:700; color:${CHARCOAL}; font-size:clamp(17px,1.5vw,20px); }
        .faq-item summary::-webkit-details-marker{ display:none; }
        .faq-item summary:focus-visible{ outline:3px solid rgba(244,122,90,0.55); outline-offset:2px; border-radius:10px; }
        .faq-chev{ transition:transform .25s ease; flex:0 0 auto; color:${CORAL}; }
        .faq-item[open] .faq-chev{ transform:rotate(180deg); }
        .faq-a{ color:${BODY}; font-size:clamp(15px,1.25vw,18px); line-height:1.7; margin:0; padding:0 4px 22px; }
        .faq-more{ display:flex; align-items:center; gap:8px; margin:24px auto 0; height:48px; padding:0 22px; border-radius:999; border:1.5px solid rgba(19,21,25,0.16); background:#fff; color:${CHARCOAL}; font-family:inherit; font-weight:700; font-size:16px; cursor:pointer; transition: transform .18s ease, box-shadow .18s ease; }
        .faq-more:hover{ transform: translateY(-1px); box-shadow:0 8px 20px rgba(19,21,25,0.10); }
        .faq-more:active{ transform: scale(0.98); }
        .faq-more .faq-chev{ transition: transform .25s ease; }
        @media (prefers-reduced-motion: reduce){ .faq-chev, .faq-more{ transition:none; } }
      `}</style>

      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{
            color: CHARCOAL,
            fontSize: "clamp(28px,4vw,46px)",
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: "-0.025em",
            margin: "0 0 12px",
            textAlign: "center",
          }}
        >
          שאלות <span style={{ color: CORAL }}>נפוצות</span>
        </motion.h2>

        <div style={{ marginTop: 24 }}>
          {featured.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>
                <span>{item.q}</span>
                <ChevronDown className="faq-chev" size={22} strokeWidth={2.4} aria-hidden="true" />
              </summary>
              <p className="faq-a">{item.a}</p>
            </details>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="faq-more"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{ overflow: "hidden" }}
            >
              <div>
                {rest.map((item) => (
                  <details key={item.q} className="faq-item">
                    <summary>
                      <span>{item.q}</span>
                      <ChevronDown className="faq-chev" size={22} strokeWidth={2.4} aria-hidden="true" />
                    </summary>
                    <p className="faq-a">{item.a}</p>
                  </details>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button type="button" className="faq-more" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          {open ? "פחות שאלות" : "עוד שאלות"}
          <ChevronDown className="faq-chev" size={20} strokeWidth={2.4} aria-hidden="true" style={{ transform: open ? "rotate(180deg)" : "none" }} />
        </button>
      </div>
    </section>
  );
}