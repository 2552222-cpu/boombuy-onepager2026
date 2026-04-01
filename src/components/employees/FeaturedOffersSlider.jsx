import React, { useState } from "react";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const OFFERS = [
  {
    id: "apple",
    badge: "חשמל, אלקטרוניקה ומובייל",
    title: "Apple במחיר עובדים",
    text: "אייפון, AirPods ומוצרי פרימיום במחירים שמרגישים אחרת.",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/db8e935e8_-2026-03-22T162955489.png",
    accent: "#0071e3",
    regularPrice: null, employeePrice: null, savings: null,
  },
  {
    id: "alo",
    badge: "אופנה",
    title: "Alo Yoga במחיר עובדים",
    text: "מותג פרימיום שאנשים באמת רוצים לקנות, במחיר עובדים.",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6a4f8399a_90.png",
    accent: "#6c63ff",
    regularPrice: null, employeePrice: null, savings: null,
  },
  {
    id: "adidas",
    badge: "אופנה וספורט",
    title: "Adidas / Nike לעובדים",
    text: "גם מוצרי ספורט והנעלה הופכים להיות חלק מהנטו.",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/82cf01fcc_87.png",
    accent: "#222",
    regularPrice: null, employeePrice: null, savings: null,
  },
  {
    id: "super",
    badge: "יוקר המחיה",
    title: "סופר ופארם בהנחה קבועה",
    text: "כאן העובד מבין שזה לא מבצע חד-פעמי, אלא משהו שחוזר כל שבוע.",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/d53a51271_-2026-03-22T163009970.png",
    accent: "#1a7a4a",
    regularPrice: null, employeePrice: null, savings: null,
  },
  {
    id: "vacation",
    badge: "נופש וחופשות",
    title: "חופשה במחיר עובדים",
    text: "חופשות, מלונות וחוויות במחירים שמרגישים אחרת.",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/1b29c5bb8_-2026-03-22T162942110.png",
    accent: "#0055a0",
    regularPrice: null, employeePrice: null, savings: null,
  },
  {
    id: "luggage",
    badge: "נסיעות וטרוול",
    title: "מזוודה במחיר עובדים",
    text: "סט 3 מזוודות Kate Hill יבואן רשמי. מחיר ירידה חריג מ-1,999 ל-249 ש״ח.",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/b4837c4f0_-2026-03-15T180501791.png",
    accent: "#444",
    regularPrice: 1999, employeePrice: 249, savings: 1750,
  },
  {
    id: "culture",
    badge: "תרבות ופנאי",
    title: "קזבלן והופעות במחיר עובדים",
    text: "גם עולם התרבות והבילוי חייב להרגיש חלק מהנטו.",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3d11c2184_-2026-03-22T165538542.png",
    accent: "#7a1020",
    regularPrice: null, employeePrice: null, savings: null,
  },
  {
    id: "daily",
    badge: "כל בוקר הטבה חדשה",
    title: "כל בוקר הטבה חדשה",
    text: "260 הטבות בשנה — ישירות לוואטסאפ שלך. תמיד במחיר הנמוך ביותר בישראל.",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7e52326a0_-2026-03-22T160414836.png",
    accent: "#0066CC",
    regularPrice: null, employeePrice: null, savings: null,
  },
];

function OfferModal({ offer, onClose, onCTA }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.75)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 24,
          width: "100%",
          maxWidth: 800,
          maxHeight: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
          direction: "rtl",
        }}
      >
        {/* Image area — large */}
        <div style={{
          background: "#FAFAFA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 40px",
          flex: 1,
          minHeight: 360,
          position: "relative",
        }}>
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 16, left: 16,
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(0,0,0,0.08)", border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
          <img
            src={offer.image}
            alt={offer.title}
            style={{
              maxWidth: "100%",
              maxHeight: 420,
              objectFit: "contain",
              filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.15))",
            }}
          />
        </div>

        {/* Content */}
        <div style={{
          padding: "28px 36px 32px",
          borderTop: "1px solid rgba(0,0,0,0.07)",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}>
          <span style={{
            display: "inline-block",
            background: offer.accent,
            color: "#fff",
            fontSize: 11, fontWeight: 700,
            padding: "4px 12px", borderRadius: 999,
            alignSelf: "flex-start",
            fontFamily: "var(--font-heebo)",
          }}>
            {offer.badge}
          </span>

          <h3 style={{
            fontSize: "clamp(22px, 3vw, 30px)",
            fontWeight: 900,
            color: "#1D1D1F",
            letterSpacing: "-0.025em",
            lineHeight: 1.2,
            margin: 0,
            fontFamily: "var(--font-heebo)",
          }}>
            {offer.title}
          </h3>

          <p style={{ fontSize: 15, color: "#555", lineHeight: 1.6, margin: 0, fontFamily: "var(--font-heebo)" }}>
            {offer.text}
          </p>

          {offer.regularPrice && (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { label: "מחיר רגיל", value: `₪${offer.regularPrice.toLocaleString()}`, color: "#86868B", strike: true },
                { label: "מחיר עובדים", value: `₪${offer.employeePrice.toLocaleString()}`, color: "#34C759", strike: false },
                { label: "חיסכון", value: `₪${offer.savings.toLocaleString()}`, color: "#0066CC", strike: false },
              ].map((c) => (
                <div key={c.label} style={{
                  background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.07)",
                  borderRadius: 12, padding: "8px 14px", textAlign: "center",
                }}>
                  <p style={{ fontSize: 10, color: "#86868B", margin: "0 0 3px", fontFamily: "var(--font-heebo)" }}>{c.label}</p>
                  <p style={{ fontSize: 15, fontWeight: 800, color: c.color, textDecoration: c.strike ? "line-through" : "none", margin: 0, fontFamily: "var(--font-heebo)" }}>{c.value}</p>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={onCTA}
            style={{
              background: "#0066CC", color: "#fff",
              fontWeight: 800, fontSize: 15,
              padding: "13px 28px", borderRadius: 12,
              border: "none", cursor: "pointer",
              fontFamily: "var(--font-heebo)",
              boxShadow: "0 6px 20px rgba(0,102,204,0.25)",
              alignSelf: "flex-start",
              marginTop: 4,
            }}
          >
            אני רוצה שהארגון שלי יצטרף
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FeaturedOffersSlider() {
  const [active, setActive] = useState(0);
  const [modalOffer, setModalOffer] = useState(null);

  const scrollToSurvey = () => {
    setModalOffer(null);
    setTimeout(() => document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" }), 150);
  };

  const go = (dir) => setActive((p) => Math.min(Math.max(p + dir, 0), OFFERS.length - 1));

  return (
    <section style={{
      background: "#F5F5F7",
      padding: "64px 0 72px",
      overflowX: "hidden",
      maxWidth: "100vw",
      borderTop: "1px solid rgba(0,0,0,0.06)",
      direction: "rtl",
    }}>
      {/* Header */}
      <div style={{
        maxWidth: 1300, margin: "0 auto",
        padding: "0 20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: "2rem", flexWrap: "wrap",
      }}>
        <div>
          <h2 style={{
            fontSize: "clamp(24px, 3.5vw, 36px)",
            fontWeight: 900, color: "#1D1D1F",
            letterSpacing: "-0.025em", lineHeight: 1.15,
            marginBottom: 8,
            fontFamily: "var(--font-heebo)",
          }}>
            ככה נראית הטבה אמיתית
          </h2>
          <p style={{ fontSize: 15, color: "#86868B", fontFamily: "var(--font-heebo)", lineHeight: 1.6 }}>
            דוגמאות חריגות לחיסכון מהשנה האחרונה. לחצו על הטבה כדי לראות אותה בגדול.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={() => go(-1)} disabled={active === 0} style={{
            width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.1)",
            background: "#fff", color: "#1D1D1F", display: "flex", alignItems: "center",
            justifyContent: "center", cursor: active === 0 ? "default" : "pointer",
            opacity: active === 0 ? 0.3 : 1, transition: "0.2s",
            boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
          }}>
            <ChevronRight size={18} />
          </button>
          <button onClick={() => go(1)} disabled={active === OFFERS.length - 1} style={{
            width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.1)",
            background: "#fff", color: "#1D1D1F", display: "flex", alignItems: "center",
            justifyContent: "center", cursor: active === OFFERS.length - 1 ? "default" : "pointer",
            opacity: active === OFFERS.length - 1 ? 0.3 : 1, transition: "0.2s",
            boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
          }}>
            <ChevronLeft size={18} />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 20px", overflowX: "auto", scrollbarWidth: "none" }}>
        <div style={{
          display: "flex",
          gap: "1rem",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingBottom: 40,
        }}>
          {OFFERS.map((o, i) => {
            const isActive = i === active;
            return (
              <div
                key={o.id}
                onClick={() => { setActive(i); setModalOffer(o); }}
                onMouseEnter={() => setActive(i)}
                style={{
                  position: "relative",
                  flexShrink: 0,
                  flexBasis: isActive ? "clamp(260px, 28vw, 440px)" : "5rem",
                  height: "26rem",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "flex-basis 0.55s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.3s",
                  transform: isActive ? "translateY(-6px)" : "none",
                  boxShadow: isActive
                    ? "0 18px 55px rgba(0,0,0,0.18)"
                    : "0 2px 10px rgba(0,0,0,0.08)",
                  border: isActive ? `2px solid ${o.accent}` : "1px solid rgba(0,0,0,0.08)",
                }}
              >
                {/* BG Image */}
                <img
                  src={o.image}
                  alt={o.title}
                  style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%",
                    objectFit: "cover",
                    filter: isActive
                      ? "brightness(0.35) saturate(60%)"
                      : "brightness(0.25) saturate(40%)",
                    transition: "filter 0.4s, transform 0.55s",
                    transform: isActive ? "scale(1.04)" : "scale(1)",
                  }}
                />
                {/* gradient */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(transparent 25%, rgba(0,0,0,0.8) 100%)",
                  zIndex: 1,
                }} />
                {/* accent bar */}
                <div style={{
                  position: "absolute", bottom: 0, right: 0, left: 0,
                  height: 3, background: o.accent, zIndex: 3,
                  opacity: isActive ? 1 : 0, transition: "opacity 0.3s",
                }} />

                {/* Content */}
                <div style={{
                  position: "absolute", inset: 0, zIndex: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isActive ? "flex-start" : "center",
                  justifyContent: isActive ? "flex-end" : "center",
                  padding: isActive ? "0 1.4rem 1.6rem" : "1rem 0",
                  gap: "0.5rem",
                }}>
                  {isActive && (
                    <span style={{
                      background: o.accent, color: "#fff",
                      fontSize: 10, fontWeight: 700,
                      padding: "3px 10px", borderRadius: 999,
                      fontFamily: "var(--font-heebo)",
                    }}>
                      {o.badge}
                    </span>
                  )}
                  <h3 style={{
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: isActive ? "clamp(16px, 2vw, 22px)" : "0.82rem",
                    lineHeight: 1.2,
                    fontFamily: "var(--font-heebo)",
                    margin: 0,
                    writingMode: isActive ? "horizontal-tb" : "vertical-rl",
                    transform: isActive ? "none" : "rotate(180deg)",
                    letterSpacing: isActive ? "-0.02em" : "0.02em",
                    transition: "font-size 0.3s",
                  }}>
                    {o.title}
                  </h3>
                  {isActive && (
                    <p style={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: 13, lineHeight: 1.5,
                      fontFamily: "var(--font-heebo)",
                      margin: 0,
                    }}>
                      {o.text}
                    </p>
                  )}
                  {isActive && (
                    <div style={{
                      marginTop: 6,
                      background: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: 8,
                      padding: "6px 14px",
                      fontSize: 12,
                      color: "rgba(255,255,255,0.85)",
                      fontFamily: "var(--font-heebo)",
                      fontWeight: 600,
                    }}>
                      לחץ לפרטים מלאים ←
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", paddingBottom: 28 }}>
        {OFFERS.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            width: i === active ? 20 : 8, height: 8,
            borderRadius: 999,
            background: i === active ? "#0066CC" : "rgba(0,0,0,0.15)",
            border: "none", cursor: "pointer",
            transition: "all 0.3s ease", padding: 0,
          }} />
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={scrollToSurvey}
          style={{
            background: "#0066CC", color: "#fff",
            fontWeight: 800, fontSize: 15,
            padding: "13px 32px", borderRadius: 12,
            border: "none", cursor: "pointer",
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

      {/* Full screen modal */}
      <AnimatePresence>
        {modalOffer && (
          <OfferModal
            offer={modalOffer}
            onClose={() => setModalOffer(null)}
            onCTA={scrollToSurvey}
          />
        )}
      </AnimatePresence>
    </section>
  );
}