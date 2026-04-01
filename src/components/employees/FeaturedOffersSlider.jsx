import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const OFFERS = [
  {
    id: "apple",
    badge: "חשמל, אלקטרוניקה ומובייל",
    title: "Apple במחיר עובדים",
    text: "אייפון, AirPods ומוצרי פרימיום במחירים שמרגישים אחרת.",
    bg: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/db8e935e8_-2026-03-22T162955489.png",
    thumb: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/db8e935e8_-2026-03-22T162955489.png",
    accent: "#0071e3",
    regularPrice: null, employeePrice: null, savings: null,
  },
  {
    id: "alo",
    badge: "אופנה",
    title: "Alo Yoga במחיר עובדים",
    text: "מותג פרימיום שאנשים באמת רוצים לקנות, במחיר עובדים.",
    bg: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6a4f8399a_90.png",
    thumb: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6a4f8399a_90.png",
    accent: "#6c63ff",
    regularPrice: null, employeePrice: null, savings: null,
  },
  {
    id: "adidas",
    badge: "אופנה וספורט",
    title: "Adidas / Nike לעובדים",
    text: "גם מוצרי ספורט והנעלה הופכים להיות חלק מהנטו.",
    bg: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/82cf01fcc_87.png",
    thumb: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/82cf01fcc_87.png",
    accent: "#111",
    regularPrice: null, employeePrice: null, savings: null,
  },
  {
    id: "super",
    badge: "יוקר המחיה",
    title: "סופר ופארם בהנחה קבועה",
    text: "כאן העובד מבין שזה לא מבצע חד-פעמי, אלא משהו שחוזר כל שבוע.",
    bg: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/d53a51271_-2026-03-22T163009970.png",
    thumb: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/d53a51271_-2026-03-22T163009970.png",
    accent: "#1a7a4a",
    regularPrice: null, employeePrice: null, savings: null,
  },
  {
    id: "vacation",
    badge: "נופש וחופשות",
    title: "חופשה במחיר עובדים",
    text: "חופשות, מלונות וחוויות במחירים שמרגישים אחרת.",
    bg: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/1b29c5bb8_-2026-03-22T162942110.png",
    thumb: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/1b29c5bb8_-2026-03-22T162942110.png",
    accent: "#0055a0",
    regularPrice: null, employeePrice: null, savings: null,
  },
  {
    id: "luggage",
    badge: "נסיעות וטרוול",
    title: "מזוודה במחיר עובדים",
    text: "סט 3 מזוודות Kate Hill יבואן רשמי. מחיר ירידה חריג מ-1,999 ל-249 ש״ח.",
    bg: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/b4837c4f0_-2026-03-15T180501791.png",
    thumb: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/b4837c4f0_-2026-03-15T180501791.png",
    accent: "#444",
    regularPrice: 1999, employeePrice: 249, savings: 1750,
  },
  {
    id: "culture",
    badge: "תרבות ופנאי",
    title: "קזבלן והופעות במחיר עובדים",
    text: "גם עולם התרבות והבילוי חייב להרגיש חלק מהנטו.",
    bg: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3d11c2184_-2026-03-22T165538542.png",
    thumb: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3d11c2184_-2026-03-22T165538542.png",
    accent: "#7a1020",
    regularPrice: null, employeePrice: null, savings: null,
  },
  {
    id: "daily",
    badge: "כל בוקר הטבה חדשה",
    title: "כל בוקר הטבה חדשה",
    text: "260 הטבות בשנה — ישירות לוואטסאפ שלך. תמיד במחיר הנמוך ביותר בישראל.",
    bg: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7e52326a0_-2026-03-22T160414836.png",
    thumb: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7e52326a0_-2026-03-22T160414836.png",
    accent: "#ff6b35",
    regularPrice: null, employeePrice: null, savings: null,
  },
];

export default function FeaturedOffersSlider() {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);

  const scrollToSurvey = () => {
    document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const go = (dir) => {
    setActive((prev) => Math.min(Math.max(prev + dir, 0), OFFERS.length - 1));
  };

  const offer = OFFERS[active];

  return (
    <section style={{
      background: "#07090d",
      padding: "64px 0 72px",
      overflowX: "hidden",
      maxWidth: "100vw",
      direction: "rtl",
    }}>
      {/* Header */}
      <div style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "0 20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: "2rem",
        flexWrap: "wrap",
      }}>
        <div>
          <h2 style={{
            fontSize: "clamp(24px, 3.5vw, 36px)",
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "-0.025em",
            lineHeight: 1.15,
            marginBottom: 8,
            fontFamily: "var(--font-heebo)",
          }}>
            ככה נראית הטבה אמיתית
          </h2>
          <p style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.45)",
            fontFamily: "var(--font-heebo)",
            lineHeight: 1.6,
          }}>
            דוגמאות חריגות לחיסכון מהשנה האחרונה. הוכחה שהנטו שלך שווה הרבה יותר.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => go(-1)}
            disabled={active === 0}
            style={{
              width: 40, height: 40, borderRadius: "50%", border: "none",
              background: active === 0 ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.12)",
              color: "#fff", fontSize: 20, display: "flex", alignItems: "center",
              justifyContent: "center", cursor: active === 0 ? "default" : "pointer",
              opacity: active === 0 ? 0.3 : 1, transition: "0.3s",
            }}
          >
            <ChevronRight size={18} />
          </button>
          <button
            onClick={() => go(1)}
            disabled={active === OFFERS.length - 1}
            style={{
              width: 40, height: 40, borderRadius: "50%", border: "none",
              background: active === OFFERS.length - 1 ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.12)",
              color: "#fff", fontSize: 20, display: "flex", alignItems: "center",
              justifyContent: "center", cursor: active === OFFERS.length - 1 ? "default" : "pointer",
              opacity: active === OFFERS.length - 1 ? 0.3 : 1, transition: "0.3s",
            }}
          >
            <ChevronLeft size={18} />
          </button>
        </div>
      </div>

      {/* Cards Track */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 20px", overflowX: "auto", scrollbarWidth: "none" }}>
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: "1.25rem",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingBottom: 40,
          }}
        >
          {OFFERS.map((o, i) => {
            const isActive = i === active;
            return (
              <div
                key={o.id}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                style={{
                  position: "relative",
                  flexShrink: 0,
                  flexBasis: isActive ? "clamp(280px, 30vw, 480px)" : "5rem",
                  height: "26rem",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "flex-basis 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s",
                  transform: isActive ? "translateY(-6px)" : "none",
                  boxShadow: isActive ? "0 18px 55px rgba(0,0,0,0.55)" : "none",
                }}
              >
                {/* BG Image */}
                <img
                  src={o.bg}
                  alt={o.title}
                  style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%",
                    objectFit: "cover",
                    filter: isActive ? "brightness(0.55) saturate(80%)" : "brightness(0.4) saturate(50%)",
                    transition: "filter 0.4s, transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    transform: isActive ? "scale(1.04)" : "scale(1)",
                  }}
                />

                {/* Gradient overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(transparent 30%, rgba(0,0,0,0.85) 100%)",
                  zIndex: 1,
                }} />

                {/* Accent color bar */}
                <div style={{
                  position: "absolute", bottom: 0, right: 0, left: 0,
                  height: 3, background: o.accent, zIndex: 3,
                  opacity: isActive ? 1 : 0, transition: "opacity 0.3s",
                }} />

                {/* Content */}
                <div style={{
                  position: "absolute", inset: 0, zIndex: 2,
                  display: "flex",
                  flexDirection: isActive ? "row" : "column",
                  alignItems: "center",
                  justifyContent: isActive ? "flex-start" : "center",
                  padding: isActive ? "1.5rem 1.8rem" : "1rem 0",
                  gap: isActive ? "1.2rem" : "0.5rem",
                }}>
                  {/* Thumbnail (active only) */}
                  {isActive && (
                    <img
                      src={o.thumb}
                      alt={o.title}
                      style={{
                        width: 110, height: 220,
                        borderRadius: "0.5rem",
                        objectFit: "contain",
                        flexShrink: 0,
                        filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.5))",
                        background: "rgba(255,255,255,0.05)",
                        padding: 6,
                      }}
                    />
                  )}

                  {/* Text */}
                  <div style={{
                    display: "flex", flexDirection: "column",
                    gap: "0.6rem",
                    flex: 1,
                  }}>
                    {/* Badge */}
                    <span style={{
                      display: isActive ? "inline-block" : "none",
                      background: o.accent,
                      color: "#fff",
                      fontSize: 10, fontWeight: 700,
                      padding: "3px 10px", borderRadius: 999,
                      fontFamily: "var(--font-heebo)",
                      alignSelf: "flex-start",
                    }}>
                      {o.badge}
                    </span>

                    {/* Title */}
                    <h3 style={{
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: isActive ? "clamp(18px, 2.2vw, 28px)" : "0.85rem",
                      lineHeight: 1.2,
                      fontFamily: "var(--font-heebo)",
                      margin: 0,
                      writingMode: isActive ? "horizontal-tb" : "vertical-rl",
                      transform: isActive ? "none" : "rotate(180deg)",
                      textAlign: isActive ? "right" : "center",
                      letterSpacing: isActive ? "-0.02em" : "0.02em",
                      transition: "font-size 0.3s",
                      maxWidth: isActive ? "none" : "4rem",
                    }}>
                      {o.title}
                    </h3>

                    {/* Description (active only) */}
                    {isActive && (
                      <p style={{
                        color: "rgba(255,255,255,0.7)",
                        fontSize: 14, lineHeight: 1.6,
                        fontFamily: "var(--font-heebo)",
                        margin: 0,
                        maxWidth: "20rem",
                      }}>
                        {o.text}
                      </p>
                    )}

                    {/* Price cards (active + has prices) */}
                    {isActive && o.regularPrice && (
                      <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                        {[
                          { label: "מחיר רגיל", value: `₪${o.regularPrice.toLocaleString()}`, color: "#86868B", strike: true },
                          { label: "מחיר עובדים", value: `₪${o.employeePrice.toLocaleString()}`, color: "#34C759", strike: false },
                          { label: "חיסכון", value: `₪${o.savings.toLocaleString()}`, color: "#ff6b35", strike: false },
                        ].map((card) => (
                          <div key={card.label} style={{
                            background: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 10, padding: "7px 10px",
                            textAlign: "center", minWidth: 70,
                          }}>
                            <p style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", marginBottom: 3, fontFamily: "var(--font-heebo)" }}>{card.label}</p>
                            <p style={{
                              fontSize: 13, fontWeight: 800, color: card.color,
                              textDecoration: card.strike ? "line-through" : "none",
                              fontFamily: "var(--font-heebo)",
                            }}>{card.value}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", padding: "0 0 28px" }}>
        {OFFERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: i === active ? 20 : 10,
              height: 10,
              borderRadius: 999,
              background: i === active ? "#ff6b35" : "rgba(255,255,255,0.25)",
              border: "none", cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={scrollToSurvey}
          style={{
            background: "#ff6b35",
            color: "#fff",
            fontWeight: 800,
            fontSize: 15,
            padding: "13px 32px",
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 6px 20px rgba(255,107,53,0.35)",
            fontFamily: "var(--font-heebo)",
            transition: "background 0.16s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#ff824f")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#ff6b35")}
        >
          אני רוצה שהארגון שלי יצטרף
        </button>
      </div>
    </section>
  );
}