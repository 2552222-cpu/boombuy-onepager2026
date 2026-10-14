import React, { useEffect, useRef, useState } from "react";
import { base44 } from "@/api/base44Client";
import { fitImg } from "@/lib/img";
import { motion } from "framer-motion";
import { RevealHeading, RevealBlock, EASE } from "./motion";
import { SECTION } from "./layoutTokens";

const BG = SECTION.BG_MIST;
const CHARCOAL = SECTION.CHARCOAL;
const CORAL = SECTION.BTN_CORAL;

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

function Card({ t, isMobile }) {
  return (
    <div
      className="tm-card"
      style={{
        background: "#fff",
        borderRadius: 24,
        border: "1px solid rgba(19,21,25,0.06)",
        boxShadow: "0 10px 30px rgba(19,21,25,0.06)",
        padding: 22,
        display: "flex",
        flexDirection: "column",
        textAlign: "right",
        boxSizing: "border-box",
        height: "100%",
      }}
    >
      <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, dir: "ltr" }}>
        <img
          src={fitImg(t.logo, 400, 160)}
          alt={t.name}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = t.logo; }}
          style={{ height: 38, width: "auto", maxWidth: 150, objectFit: "contain" }}
        />
      </div>
      <p style={{ fontSize: isMobile ? 19 : 22, fontWeight: 600, color: "#17191D", lineHeight: 1.45, letterSpacing: "-0.01em", margin: 0 }}>
        ״{t.text}״
      </p>
      <div style={{ height: 1, background: "rgba(19,21,25,0.08)", margin: "18px 0" }} />
      <div style={{ marginTop: "auto" }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: "#17191D", margin: 0 }}>{t.name}</p>
        <p style={{ fontSize: 13, fontWeight: 500, color: "#5A5D63", margin: 0 }}>{t.role}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const firedView = useRef(false);
  const scrollerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 768);
    c();
    window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !firedView.current) {
            firedView.current = true;
            try { base44.analytics.track({ eventName: "testimonials_viewed" }); } catch (err) { /* ignore */ }
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const center = el.getBoundingClientRect().left + el.clientWidth / 2;
    let best = 0, bestD = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const cc = child.getBoundingClientRect().left + child.clientWidth / 2;
      const d = Math.abs(cc - center);
      if (d < bestD) { bestD = d; best = i; }
    });
    setActive(best);
  };

  return (
    <section
      id="testimonials"
      className="bb-section"
      ref={sectionRef}
      dir="rtl"
      style={{ background: BG, fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif", scrollMarginTop: 90, overflow: "hidden" }}
    >
      <style>{`
        @media (max-width:768px){ #testimonials{ scroll-margin-top:72px; } .tm-scroller::-webkit-scrollbar{ display:none; } }
        .tm-card{ transition: transform .3s ease, box-shadow .3s ease; }
        .tm-card:hover{ transform: translateY(-6px); box-shadow: 0 18px 44px rgba(19,21,25,0.12); }
        @media (prefers-reduced-motion: reduce){ .tm-card{ transition:none; } .tm-card:hover{ transform:none; } }
      `}</style>

      <div style={{ maxWidth: 1040, margin: "0 auto", textAlign: "center", padding: "0 16px" }}>
        <RevealBlock
          style={{ color: SECTION.CORAL_TEXT, fontWeight: SECTION.KICKER_WEIGHT, fontSize: SECTION.KICKER_SIZE, letterSpacing: "-0.01em", margin: "0 0 8px" }}
        >
          מה אומרים מי שכבר שדרגו?
        </RevealBlock>

        <RevealHeading
          as="h2"
          amount={0.2}
          style={{ color: CHARCOAL, fontSize: "clamp(26px,4vw,52px)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.025em", margin: 0, textWrap: "balance" }}
        >
          העובדים מרגישים את ההבדל. וגם <span style={{ color: SECTION.CORAL_TEXT }}>הארגון</span>.
        </RevealHeading>

        {isMobile ? (
          <>
            <div
              ref={scrollerRef}
              onScroll={onScroll}
              className="tm-scroller"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                marginTop: 30,
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                scrollPadding: "0 16px",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                padding: 0,
              }}
            >
              {ITEMS.map((t, i) => (
                <div
                  key={t.name}
                  style={{
                    scrollSnapAlign: "start",
                    flex: "0 0 84%",
                    transform: i === active ? "scale(1)" : "scale(0.96)",
                    opacity: 1,
                    transition: "transform .25s ease",
                  }}
                >
                  <Card t={t} isMobile={isMobile} />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 18 }}>
              {ITEMS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    const el = scrollerRef.current;
                    if (el) el.scrollTo({ left: i * (el.clientWidth * 0.84 + 12), behavior: "smooth" });
                  }}
                  aria-label={`עבור להמלצה ${i + 1}`}
                  style={{ width: i === active ? 18 : 6, height: 6, borderRadius: 999, border: "none", background: i === active ? CORAL : "rgba(19,21,29,0.18)", padding: 0, cursor: "pointer", transition: "width .25s ease, background .25s ease" }}
                />
              ))}
            </div>
          </>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginTop: 44, textAlign: "right" }}>
            {ITEMS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                style={{ height: "100%" }}
              >
                <Card t={t} isMobile={isMobile} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}