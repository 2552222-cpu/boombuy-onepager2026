import React from "react";
import { motion } from "framer-motion";

const chips = [
  { label: "👥 מעל 250,000 עובדים כבר מקבלים יותר", highlight: false },
  { label: "💰 בלי להוסיף שקל לתקציב הארגון", highlight: true },
];

const HERO_IMAGE = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/de2fe051d_1.png";

export default function Hero() {
  const scrollToSurvey = () => {
    document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative bg-white"
      style={{
        minHeight: "86svh",
        paddingTop: "72px",
        overflowX: "hidden",
        maxWidth: "100vw",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="max-w-7xl mx-auto w-full px-5 md:px-10 py-10 md:py-0">
        <div
          className="flex flex-col md:flex-row items-center"
          style={{ gap: "clamp(40px, 5vw, 84px)" }}
        >
          {/* ── TEXT SIDE ── */}
          <div style={{ flex: "1.05" }} className="w-full order-1 md:order-none">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="flex flex-col items-center md:items-start text-center md:text-right"
            >
              {/* Chips */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-2"
                style={{ marginBottom: "28px" }}
              >
                {chips.map((chip, i) => (
                  <div
                    key={i}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      background: "#F5F5F7",
                      border: "1px solid rgba(29,29,31,0.08)",
                      borderRadius: "9999px",
                      padding: "7px 16px",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: chip.highlight ? "#0066CC" : "#1D1D1F",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {chip.label}
                  </div>
                ))}
              </motion.div>

              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  fontSize: "clamp(50px, 6vw, 96px)",
                  lineHeight: 0.94,
                  letterSpacing: "-0.03em",
                  fontWeight: 900,
                  marginBottom: "28px",
                  maxWidth: "720px",
                  fontFamily: "var(--font-heebo)",
                }}
              >
                <span style={{ display: "block" }}>יש כסף שמחכה לך</span>
                <span style={{ display: "block", color: "#0066CC" }}>בעבודה שלך</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                style={{
                  maxWidth: "540px",
                  fontSize: "clamp(20px, 1.8vw, 28px)",
                  lineHeight: 1.55,
                  marginBottom: "34px",
                  color: "#86868B",
                  fontWeight: 400,
                }}
              >
                אייפון במחיר יבואן, תרבות, חופשות בארץ ובחו&quot;ל והטבות יומיומיות - הכל כבר כלול בתקציב שהארגון{" "}
                <strong
                  style={{
                    fontWeight: 700,
                    color: "#0066CC",
                    textDecoration: "underline",
                    textDecorationThickness: "2px",
                    textUnderlineOffset: "4px",
                  }}
                >
                  ממילא
                </strong>{" "}
                משלם. פשוט מקבלים יותר.
              </motion.p>

              {/* CTA — desktop */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.32 }}
                className="hidden md:flex flex-col items-start gap-3 w-full md:w-auto"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <button
                    onClick={scrollToSurvey}
                    style={{
                      background: "#0066CC",
                      color: "#fff",
                      fontWeight: 900,
                      fontSize: "17px",
                      padding: "16px 40px",
                      borderRadius: "14px",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 8px 28px rgba(0,102,204,0.28)",
                      transition: "all 0.18s ease",
                      fontFamily: "var(--font-heebo)",
                      letterSpacing: "-0.01em",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#0055AA"}
                    onMouseLeave={e => e.currentTarget.style.background = "#0066CC"}
                  >
                    פתחו בקשה לארגון
                  </button>
                  <button
                    onClick={scrollToSurvey}
                    style={{
                      background: "transparent",
                      color: "#0066CC",
                      fontWeight: 700,
                      fontSize: "16px",
                      padding: "16px 24px",
                      borderRadius: "14px",
                      border: "1.5px solid rgba(0,102,204,0.25)",
                      cursor: "pointer",
                      transition: "all 0.18s ease",
                      fontFamily: "var(--font-heebo)",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "#0066CC"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(0,102,204,0.25)"}
                  >
                    שתפו עם החברים בעבודה
                  </button>
                </div>
                <span style={{ fontSize: "13px", color: "#86868B", fontWeight: 400 }}>
                  3 שאלות · 15 שניות · בלי הרשמה
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* ── VISUAL SIDE ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            style={{ flex: "0.95" }}
            className="w-full order-2 md:order-none flex justify-center items-center"
          >
            <div className="relative flex items-center justify-center">
              <div
                className="absolute pointer-events-none"
                style={{
                  width: 500,
                  height: 500,
                  background: "radial-gradient(circle, rgba(0,102,204,0.07) 0%, transparent 68%)",
                  filter: "blur(48px)",
                }}
              />
              <img
                src={HERO_IMAGE}
                alt="הטבות לעובדים"
                style={{
                  width: "clamp(260px, 38vw, 580px)",
                  height: "auto",
                  display: "block",
                  filter: "drop-shadow(0 20px 48px rgba(0,0,0,0.13))",
                  position: "relative",
                }}
              />
            </div>
          </motion.div>

          {/* ── MOBILE: CTA below visual ── */}
          <div className="w-full md:hidden order-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3 }}
              className="flex flex-col items-center gap-3 w-full"
              style={{ marginTop: "8px" }}
            >
              <button
                onClick={scrollToSurvey}
                style={{
                  background: "#0066CC",
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: "17px",
                  padding: "16px 0",
                  borderRadius: "14px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 8px 28px rgba(0,102,204,0.28)",
                  width: "100%",
                  fontFamily: "var(--font-heebo)",
                }}
              >
                פתחו בקשה לארגון
              </button>
              <button
                onClick={scrollToSurvey}
                style={{
                  background: "transparent",
                  color: "#0066CC",
                  fontWeight: 700,
                  fontSize: "16px",
                  padding: "14px 0",
                  borderRadius: "14px",
                  border: "1.5px solid rgba(0,102,204,0.25)",
                  cursor: "pointer",
                  width: "100%",
                  fontFamily: "var(--font-heebo)",
                }}
              >
                שתפו עם החברים בעבודה
              </button>
              <span style={{ fontSize: "13px", color: "#86868B" }}>
                3 שאלות · 15 שניות · בלי הרשמה
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}