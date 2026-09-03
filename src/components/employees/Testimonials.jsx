import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";

const BG = "#F7F7F4";
const CHARCOAL = "#17191D";
const CORAL = "#F47A5A";
const EASE = [0.22, 1, 0.36, 1];

// Primary testimonial — large, on its own.
const PRIMARY = {
  name: "יניב דוד",
  role: "מזכיר כללי, ארגון העובדים בבנק לאומי",
  logo: "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/333366c6f_.png",
  logoScale: 0.55,
  text: "ההשקעה הטובה ביותר שעשינו למען העובדים. העובדים מדברים על זה יום יום.",
};

// Additional testimonials — swipeable row.
const OTHERS = [
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
  const [index, setIndex] = useState(0);

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

  const go = (dir) => setIndex((p) => (p + dir + OTHERS.length) % OTHERS.length);

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
      <style>{`
        @media (max-width:768px){ #testimonials{ scroll-margin-top:72px; padding:64px 16px 72px; } }
      `}</style>

      <div style={{ maxWidth: 1080, margin: "0 auto", textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ color: CORAL, fontWeight: 600, fontSize: "clamp(15px,1.2vw,18px)", margin: 0, letterSpacing: "-0.01em" }}
        >
          מה אומרים מי שכבר שדרגו?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
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

        {/* Primary testimonial — large */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.12 }}
          style={{
            marginTop: 44,
            background: "#fff",
            borderRadius: 28,
            border: "1px solid rgba(19,21,25,0.08)",
            boxShadow: "0 24px 70px rgba(19,21,25,0.10)",
            padding: "clamp(28px,4vw,52px)",
            maxWidth: 820,
            margin: "44px auto 0",
            textAlign: "right",
          }}
        >
          <div style={{ height: 48, display: "flex", alignItems: "center", marginBottom: 20 }}>
            <img
              src={PRIMARY.logo}
              alt={PRIMARY.name}
              style={{ height: 38, maxWidth: 140, objectFit: "contain", objectPosition: "right", transform: PRIMARY.logoScale ? `scale(${PRIMARY.logoScale})` : "none", transformOrigin: "right center" }}
            />
          </div>
          <p style={{ fontSize: "clamp(20px,2.4vw,30px)", color: CHARCOAL, fontWeight: 600, lineHeight: 1.4, letterSpacing: "-0.02em", margin: "0 0 24px" }}>
            ״{PRIMARY.text}״
          </p>
          <div>
            <p style={{ fontSize: "clamp(18px,1.6vw,22px)", fontWeight: 800, color: CHARCOAL, margin: "0 0 4px" }}>{PRIMARY.name}</p>
            <p style={{ fontSize: "clamp(15px,1.2vw,17px)", color: "#6E7177", margin: 0 }}>{PRIMARY.role}</p>
          </div>
        </motion.div>

        {/* Secondary testimonials — swipeable */}
        <div style={{ marginTop: 36, position: "relative" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{
                background: "#fff",
                borderRadius: 22,
                border: "1px solid rgba(19,21,25,0.07)",
                boxShadow: "0 10px 30px rgba(19,21,25,0.06)",
                padding: "clamp(22px,3vw,36px)",
                maxWidth: 620,
                margin: "0 auto",
                textAlign: "right",
              }}
            >
              <div style={{ height: 40, display: "flex", alignItems: "center", marginBottom: 14 }}>
                <img src={OTHERS[index].logo} alt={OTHERS[index].name} style={{ height: 32, maxWidth: 120, objectFit: "contain", objectPosition: "right" }} />
              </div>
              <p style={{ fontSize: "clamp(16px,1.4vw,19px)", color: "#3A3C42", lineHeight: 1.7, margin: "0 0 18px" }}>
                ״{OTHERS[index].text}״
              </p>
              <div>
                <p style={{ fontSize: 16, fontWeight: 800, color: CHARCOAL, margin: "0 0 2px" }}>{OTHERS[index].name}</p>
                <p style={{ fontSize: 14, color: "#6E7177", margin: 0 }}>{OTHERS[index].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* controls */}
          <div style={{ marginTop: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <button type="button" onClick={() => go(-1)} aria-label="הקודם" style={navBtn}>›</button>
            <div style={{ display: "flex", gap: 6 }}>
              {OTHERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`המלצה ${i + 1}`}
                  style={{
                    width: i === index ? 20 : 7, height: 7, borderRadius: 999,
                    background: i === index ? CORAL : "rgba(19,21,25,0.18)",
                    border: "none", padding: 0, cursor: "pointer", transition: "all .25s ease",
                  }}
                />
              ))}
            </div>
            <button type="button" onClick={() => go(1)} aria-label="הבא" style={navBtn}>‹</button>
          </div>
        </div>
      </div>
    </section>
  );
}

const navBtn = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: "1px solid rgba(19,21,25,0.12)",
  background: "#fff",
  color: CHARCOAL,
  fontSize: 22,
  lineHeight: 1,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};