import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const OFFERS = [
  {
    id: "apple",
    badge: "מחירי יבואן",
    badgeBg: "#1D1D1F",
    title: "Apple במחיר עובדים",
    sub: "אייפון, AirPods ומוצרי פרימיום במחירי עובדים",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/db8e935e8_-2026-03-22T162955489.png",
    footerNote: "ללא סבסוד מעסיק",
    regularPrice: null,
    employeePrice: null,
    savings: null,
  },
  {
    id: "super",
    badge: "עד 8% תמיד",
    badgeBg: "#1a7a4a",
    title: "סופר ופארם בהנחה קבועה",
    sub: "הנחה קבועה ברשתות מובילות, בלי סבסוד מעסיק",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/d53a51271_-2026-03-22T163009970.png",
    footerNote: "ללא סבסוד מעסיק",
    regularPrice: null,
    employeePrice: null,
    savings: null,
  },
  {
    id: "fashion",
    badge: "מחירים בלעדיים",
    badgeBg: "#3a3a3a",
    title: "Alo Yoga, Adidas, Nike",
    sub: "מותגים שאנשים באמת קונים, במחירי עובדים",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/9349388b9_-2026-03-22T163505767.png",
    footerNote: null,
    regularPrice: null,
    employeePrice: null,
    savings: null,
  },
  {
    id: "tech",
    badge: "מחיר יבואן",
    badgeBg: "#2c2c2c",
    title: "חשמל ואלקטרוניקה",
    sub: "Dyson, Samsung, LG ועוד, במחירים שמרגישים",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/477510a11_-2026-02-18T150203869.png",
    footerNote: null,
    regularPrice: null,
    employeePrice: null,
    savings: null,
  },
  {
    id: "vacation",
    badge: "מחירים בלעדיים",
    badgeBg: "#0055a0",
    title: "נופש וחופשות",
    sub: "חופשות, מלונות וחוויות במחירים שמרגישים אחרת",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/1b29c5bb8_-2026-03-22T162942110.png",
    footerNote: null,
    regularPrice: null,
    employeePrice: null,
    savings: null,
  },
  {
    id: "culture",
    badge: "הנחת עובד",
    badgeBg: "#7a1020",
    title: "תרבות ופנאי",
    sub: "הופעות, הצגות, אטרקציות ואירועים",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3d11c2184_-2026-03-22T165538542.png",
    footerNote: null,
    regularPrice: null,
    employeePrice: null,
    savings: null,
  },
  {
    id: "gift",
    badge: "בחירה חופשית",
    badgeBg: "#5a0099",
    title: "מתנת חג עם בחירה",
    sub: "ארנק דיגיטלי גמיש במקום מתנה אחת קבועה",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/28d0b6e89_-2026-03-22T163901041.png",
    footerNote: "המערכת מסבסדת בעצמה את המוצרים",
    regularPrice: null,
    employeePrice: null,
    savings: null,
  },
];

export default function FeaturedOffersSlider() {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollToSurvey = () => {
    document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const checkScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft < -10 || el.scrollLeft > 10);
    setCanScrollRight(Math.abs(el.scrollLeft) + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * -300, behavior: "smooth" });
  };

  return (
    <section
      style={{
        background: "#F5F5F7",
        padding: "64px 0 72px",
        overflow: "hidden",
        borderTop: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", marginBottom: "36px", padding: "0 20px" }}
      >
        <h2
          style={{
            fontSize: "clamp(26px, 3.5vw, 36px)",
            fontWeight: 900,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            color: "#1D1D1F",
            marginBottom: "10px",
            fontFamily: "var(--font-heebo)",
          }}
        >
          הטבות אמיתיות מהשנה האחרונה
        </h2>
        <p style={{ fontSize: "15px", color: "#86868B", fontFamily: "var(--font-heebo)" }}>
          לחצו על הטבה כדי לגלות עוד
        </p>
      </motion.div>

      {/* Slider wrapper */}
      <div style={{ position: "relative" }}>
        {/* Nav buttons */}
        {canScrollRight && (
          <button
            onClick={() => scroll(1)}
            style={{
              position: "absolute",
              right: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.1)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        )}
        {canScrollLeft && (
          <button
            onClick={() => scroll(-1)}
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.1)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
        )}

        {/* Scrollable row */}
        <div
          ref={sliderRef}
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "auto",
            padding: "8px 28px 16px",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            flexDirection: "row-reverse",
          }}
        >
          {OFFERS.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              onClick={scrollToSurvey}
              style={{
                flexShrink: 0,
                width: "clamp(240px, 28vw, 290px)",
                background: "#fff",
                borderRadius: "20px",
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 2px 14px rgba(0,0,0,0.07)",
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              whileHover={{ y: -4, boxShadow: "0 8px 28px rgba(0,0,0,0.12)" }}
            >
              {/* Image */}
              <div
                style={{
                  background: "#FAFAFA",
                  aspectRatio: "1/1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <img
                  src={offer.image}
                  alt={offer.title}
                  style={{ maxWidth: "88%", maxHeight: "88%", objectFit: "contain" }}
                />
              </div>

              {/* Content */}
              <div style={{ padding: "14px 16px 16px" }}>
                <span
                  style={{
                    display: "inline-block",
                    background: offer.badgeBg,
                    color: "#fff",
                    fontSize: "10px",
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: "999px",
                    marginBottom: "8px",
                    fontFamily: "var(--font-heebo)",
                  }}
                >
                  {offer.badge}
                </span>
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    color: "#1D1D1F",
                    lineHeight: 1.3,
                    marginBottom: "5px",
                    fontFamily: "var(--font-heebo)",
                  }}
                >
                  {offer.title}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#86868B",
                    lineHeight: 1.5,
                    fontFamily: "var(--font-heebo)",
                    marginBottom: offer.footerNote ? "10px" : "0",
                  }}
                >
                  {offer.sub}
                </p>
                {(offer.regularPrice || offer.employeePrice) && (
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginTop: "10px",
                      marginBottom: offer.footerNote ? "8px" : "0",
                      padding: "10px",
                      background: "#F5F5F7",
                      borderRadius: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    {offer.regularPrice && (
                      <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: "9px", color: "#86868B", fontFamily: "var(--font-heebo)" }}>מחיר רגיל</p>
                        <p style={{ fontSize: "12px", fontWeight: 600, color: "#86868B", textDecoration: "line-through", fontFamily: "var(--font-heebo)" }}>₪{offer.regularPrice.toLocaleString()}</p>
                      </div>
                    )}
                    {offer.employeePrice && (
                      <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: "9px", color: "#0066CC", fontFamily: "var(--font-heebo)" }}>מחיר עובדים</p>
                        <p style={{ fontSize: "13px", fontWeight: 800, color: "#0066CC", fontFamily: "var(--font-heebo)" }}>₪{offer.employeePrice.toLocaleString()}</p>
                      </div>
                    )}
                    {offer.savings && (
                      <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: "9px", color: "#34C759", fontFamily: "var(--font-heebo)" }}>חיסכון</p>
                        <p style={{ fontSize: "13px", fontWeight: 800, color: "#34C759", fontFamily: "var(--font-heebo)" }}>₪{offer.savings.toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                )}
                {offer.footerNote && (
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#AEAEB2",
                      fontWeight: 500,
                      fontFamily: "var(--font-heebo)",
                      borderTop: "1px solid rgba(0,0,0,0.06)",
                      paddingTop: "8px",
                      marginTop: "2px",
                    }}
                  >
                    {offer.footerNote}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        style={{ textAlign: "center", marginTop: "32px", padding: "0 20px" }}
      >
        <button
          onClick={scrollToSurvey}
          style={{
            background: "#0066CC",
            color: "#fff",
            fontWeight: 800,
            fontSize: "15px",
            padding: "13px 32px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 6px 20px rgba(0,102,204,0.24)",
            fontFamily: "var(--font-heebo)",
            transition: "background 0.16s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#0055AA")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#0066CC")}
        >
          אני רוצה שהארגון שלי יצטרף
        </button>
      </motion.div>
    </section>
  );
}