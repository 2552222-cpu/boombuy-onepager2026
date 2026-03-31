import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const OFFERS = [
  {
    id: "apple",
    badge: "הטבה אמיתית לדוגמה | חשמל, אלקטרוניקה ומובייל",
    badgeBg: "#1D1D1F",
    title: "Apple במחיר עובדים",
    text: "אייפון, AirPods ומוצרי פרימיום במחירים שמרגישים אחרת.",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/db8e935e8_-2026-03-22T162955489.png",
    regularPrice: null,
    employeePrice: null,
    savings: null,
  },
  {
    id: "alo",
    badge: "הטבה אמיתית לדוגמה | אופנה",
    badgeBg: "#3a3a3a",
    title: "Alo Yoga במחיר עובדים",
    text: "מותג פרימיום שאנשים באמת רוצים לקנות, במחיר עובדים.",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6a4f8399a_90.png",
    regularPrice: null,
    employeePrice: null,
    savings: null,
  },
  {
    id: "adidas",
    badge: "הטבה אמיתית לדוגמה | אופנה וספורט",
    badgeBg: "#2c2c2c",
    title: "Adidas / Nike לעובדים",
    text: "גם מוצרי ספורט והנעלה הופכים להיות חלק מהנטו.",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/82cf01fcc_87.png",
    regularPrice: null,
    employeePrice: null,
    savings: null,
  },
  {
    id: "super",
    badge: "הטבה אמיתית לדוגמה | יוקר המחיה",
    badgeBg: "#1a7a4a",
    title: "סופר ופארם בהנחה קבועה",
    text: "כאן העובד מבין שזה לא מבצע חד-פעמי, אלא משהו שחוזר כל שבוע.",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/d53a51271_-2026-03-22T163009970.png",
    regularPrice: null,
    employeePrice: null,
    savings: null,
  },
  {
    id: "vacation",
    badge: "הטבה אמיתית לדוגמה | נופש וחופשות",
    badgeBg: "#0055a0",
    title: "חופשה במחיר עובדים",
    text: "חופשות, מלונות וחוויות במחירים שמרגישים אחרת.",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/1b29c5bb8_-2026-03-22T162942110.png",
    regularPrice: null,
    employeePrice: null,
    savings: null,
  },
  {
    id: "luggage",
    badge: "הטבה אמיתית לדוגמה | נסיעות וטרוול",
    badgeBg: "#444",
    title: "מזוודה במחיר עובדים",
    text: "סט 3 מזוודות Kate Hill יבואן רשמי. מחיר ירידה חריג מ-1,999 ל-249 ש״ח.",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/b4837c4f0_-2026-03-15T180501791.png",
    regularPrice: 1999,
    employeePrice: 249,
    savings: 1750,
  },
  {
    id: "culture",
    badge: "הטבה אמיתית לדוגמה | תרבות ופנאי",
    badgeBg: "#7a1020",
    title: "קזבלן והופעות במחיר עובדים",
    text: "גם עולם התרבות והבילוי חייב להרגיש חלק מהנטו.",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3d11c2184_-2026-03-22T165538542.png",
    regularPrice: null,
    employeePrice: null,
    savings: null,
  },
  {
    id: "daily",
    badge: "הטבה אמיתית לדוגמה | כל בוקר הטבה חדשה",
    badgeBg: "#1a1a2e",
    title: "כל בוקר הטבה חדשה",
    text: "260 הטבות בשנה — ישירות לוואטסאפ שלך. תמיד במחיר הנמוך ביותר בישראל.",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7e52326a0_-2026-03-22T160414836.png",
    regularPrice: null,
    employeePrice: null,
    savings: null,
  },
];

export default function FeaturedOffersSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const scrollToSurvey = () => {
    document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const go = (dir) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + OFFERS.length) % OFFERS.length);
  };

  const offer = OFFERS[current];
  const hasPrices = offer.regularPrice && offer.employeePrice;

  return (
    <section
      style={{
        background: "#F5F5F7",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        padding: "64px 16px 72px",
        overflowX: "hidden",
        maxWidth: "100vw",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2
          style={{
            fontSize: "clamp(26px, 3.5vw, 38px)",
            fontWeight: 900,
            letterSpacing: "-0.028em",
            lineHeight: 1.1,
            color: "#1D1D1F",
            marginBottom: "10px",
            fontFamily: "var(--font-heebo)",
          }}
        >
          ככה נראית הטבה אמיתית
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "#86868B",
            fontFamily: "var(--font-heebo)",
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          דוגמאות חריגות לחיסכון מהשנה האחרונה. הוכחה שהנטו שלך שווה הרבה יותר.
        </p>
      </div>

      {/* Slide */}
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: "24px",
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={offer.id}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? -60 : direction < 0 ? 60 : 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Desktop: side by side, Mobile: stacked */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  minHeight: "420px",
                }}
                className="flex-col md:grid"
              >
                {/* Image */}
                <div
                  style={{
                    background: "#FAFAFA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "40px 32px",
                    borderLeft: "1px solid rgba(0,0,0,0.06)",
                    minHeight: "280px",
                  }}
                >
                  <img
                    src={offer.image}
                    alt={offer.title}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "320px",
                      objectFit: "contain",
                      filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.1))",
                    }}
                  />
                </div>

                {/* Content */}
                <div
                  style={{
                    padding: "40px 36px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "16px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      background: offer.badgeBg,
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "5px 14px",
                      borderRadius: "999px",
                      fontFamily: "var(--font-heebo)",
                      alignSelf: "flex-start",
                    }}
                  >
                    {offer.badge}
                  </span>

                  <h3
                    style={{
                      fontSize: "clamp(24px, 3vw, 34px)",
                      fontWeight: 900,
                      letterSpacing: "-0.025em",
                      lineHeight: 1.15,
                      color: "#1D1D1F",
                      fontFamily: "var(--font-heebo)",
                      margin: 0,
                    }}
                  >
                    {offer.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "16px",
                      color: "#86868B",
                      lineHeight: 1.6,
                      fontFamily: "var(--font-heebo)",
                      margin: 0,
                    }}
                  >
                    {offer.text}
                  </p>

                  {/* Price cards — only if real data */}
                  {hasPrices && (
                    <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                      {[
                        { label: "מחיר רגיל", value: `₪${offer.regularPrice.toLocaleString()}`, color: "#86868B", strike: true },
                        { label: "מחיר לעובדים", value: `₪${offer.employeePrice.toLocaleString()}`, color: "#0066CC", strike: false },
                        { label: "החיסכון שלך", value: `₪${offer.savings.toLocaleString()}`, color: "#34C759", strike: false },
                      ].map((card) => (
                        <div
                          key={card.label}
                          style={{
                            flex: 1,
                            background: "rgba(0,0,0,0.03)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(0,0,0,0.07)",
                            borderRadius: "12px",
                            padding: "10px 12px",
                            textAlign: "center",
                          }}
                        >
                          <p style={{ fontSize: "9px", color: "#86868B", marginBottom: "4px", fontFamily: "var(--font-heebo)" }}>{card.label}</p>
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: 800,
                              color: card.color,
                              textDecoration: card.strike ? "line-through" : "none",
                              fontFamily: "var(--font-heebo)",
                            }}
                          >
                            {card.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation bar */}
          <div
            style={{
              borderTop: "1px solid rgba(0,0,0,0.06)",
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#FAFAFA",
            }}
          >
            <button
              onClick={() => go(-1)}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.1)",
                boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </button>

            {/* Dots */}
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              {OFFERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  style={{
                    width: i === current ? 20 : 6,
                    height: 6,
                    borderRadius: "999px",
                    background: i === current ? "#0066CC" : "rgba(0,0,0,0.15)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.1)",
                boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <ChevronRight className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "28px" }}>
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
        </div>
      </div>
    </section>
  );
}