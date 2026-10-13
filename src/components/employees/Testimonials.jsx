import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

const BG = "#F7F7F4";
const CHARCOAL = "#17191D";
const CORAL = "#F47A5A";
const EASE = [0.22, 1, 0.36, 1];

// 4 testimonials — Yanniv David first. Displayed as a 2×2 grid (desktop) / single column (mobile).
const ITEMS = [
  {
    name: "יניב דוד",
    role: "מזכיר כללי, ארגון העובדים בבנק לאומי",
    logo: "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/333366c6f_.png",
    text: "ההשקעה הטובה ביותר שעשינו למען העובדים. העובדים מדברים על זה יום יום.",
  },
  {
    name: "יחזקאל מזרחי",
    role: 'יו"ר ועד עובדי עיריית תל אביב - אגף שפע',
    logo: "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/5325ce61f_.png",
    text: "boombuy יצרה חוויית עובד אחרת. הם מספקים רמת שירות וטכנולוגיה מתוחכמת שקובעת סטנדרט שלא הכרנו לפני.",
  },
  {
    name: "שירה סיירי",
    role: "ראש מטה הנהלה, עמותת שלוה",
    logo: "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/febd43cdc_KUUV.png",
    text: "boombuy היא שותפה אמיתית לדרך. השירות האנושי, החום האישי והמקצועיות מורגשים בכל פרט. אתר ההטבות מגוון, משתלם ואטרקטיבי, והעובדים שלנו נהנים ממנו מאוד!",
  },
  {
    name: "יקירה שינדר",
    role: "משאבי אנוש, סוכנות לביטוח שקל",
    logo: "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/2279bccfc_.png",
    text: "חברת boombuy דואגת כל יום להטבה יומית. דבר שיצר באז חיובי ומדהים אצל העובדים. השירות והמקצועיות מעל הכל!",
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const firedView = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !firedView.current) {
            firedView.current = true;
            try {
              base44.analytics.track({ eventName: "testimonials_viewed" });
            } catch (err) {
              /* ignore */
            }
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      dir="rtl"
      style={{
        background: BG,
        padding: "84px 20px 92px",
        fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif",
        scrollMarginTop: 90,
      }}
    >
      <style>{`@media (max-width:768px){ #testimonials{ scroll-margin-top:72px; padding:48px 16px 56px !important; } }`}</style>

      <div style={{ maxWidth: 1040, margin: "0 auto", textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ color: CORAL, fontWeight: 600, fontSize: "clamp(15px,1.2vw,18px)", margin: 0, letterSpacing: "-0.01em" }}
        >
          מה אומרים מי שכבר שדרגו?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.06 }}
          style={{
            color: CHARCOAL,
            fontSize: "clamp(30px,4vw,52px)",
            fontWeight: 700,
            lineHeight: 1.06,
            letterSpacing: "-0.025em",
            margin: "12px 0 0",
          }}
        >
          העובדים מרגישים את ההבדל.
          <br />
          וגם <span style={{ color: CORAL }}>הארגון</span>.
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            marginTop: 44,
            textAlign: "right",
          }}
        >
          {ITEMS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
              style={{
                background: "#fff",
                borderRadius: 22,
                border: "1px solid rgba(19,21,25,0.07)",
                boxShadow: "0 10px 30px rgba(19,21,25,0.06)",
                padding: "clamp(22px,3vw,32px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ height: 44, display: "flex", alignItems: "center", marginBottom: 14 }}>
                <img src={t.logo} alt={t.name} style={{ height: 38, maxWidth: 140, objectFit: "contain", objectPosition: "right" }} />
              </div>
              <p style={{ fontSize: "clamp(16px,1.35vw,19px)", color: "#3A3C42", lineHeight: 1.7, margin: "0 0 18px", flexGrow: 1 }}>
                ״{t.text}״
              </p>
              <div>
                <p style={{ fontSize: 16, fontWeight: 800, color: CHARCOAL, margin: "0 0 2px" }}>{t.name}</p>
                <p style={{ fontSize: 14, color: "#6E7177", margin: 0 }}>{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}