import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const BG = "#FBFAF8";
const CHARCOAL = "#17191D";
const BODY = "#3A3C42";
const CORAL = "#F47A5A";
const EASE = [0.22, 1, 0.36, 1];

// Short answers only. Anything that depends on commercial terms is marked
// "לפי המסלול וההיקף שסוכמו" instead of stating an unapproved number.
const ITEMS = [
  {
    q: "מה בדיוק boombuy מפעילה עבורנו?",
    a: "מועדון העובדים שלכם. אנחנו מפעילים אותו — מקימים ומריצים את מועדון ההטבות במותג הארגון, לפי המסלול וההיקף שסוכמו.",
  },
  {
    q: "מה הארגון צריך לעשות?",
    a: "הארגון קובע מדיניות, זכאות, תקציב ואישורים. אנחנו מקימים ומפעילים את ההיקף שסוכם — מיתוג, ספקים, השקה, תקשורת, הזמנות, שירות ודיווח, ככל שנכלל.",
  },
  {
    q: "לאילו ארגונים זה מתאים?",
    a: "יש שני מסלולים — ארגונים, ואיגודים, עמותות ומועדונים. ההתאמה נבחנת לפי הצורך, המסלול וההיקף שסוכמו.",
  },
  {
    q: "מה כלול ומה העלות?",
    a: "לפי המסלול וההיקף שסוכמו.",
  },
  {
    q: "תוך כמה זמן עולים לאוויר?",
    a: "לפי המסלול וההיקף שסוכמו.",
  },
  {
    q: "איך מתחילים?",
    a: "משאירים פרטים בבדיקת ההתאמה ומתאמים הדגמה של 15 דקות עם צוות boombuy.",
  },
];

export default function FAQ() {
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
        @media (prefers-reduced-motion: reduce){ .faq-chev{ transition:none; } }
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
          {ITEMS.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>
                <span>{item.q}</span>
                <ChevronDown className="faq-chev" size={22} strokeWidth={2.4} aria-hidden="true" />
              </summary>
              <p className="faq-a">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}