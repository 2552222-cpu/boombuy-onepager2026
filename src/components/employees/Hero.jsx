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
      id="main-hero"
      className="relative bg-white"
      style={{
        minHeight: "calc(100svh - 52px)",
        overflowX: "hidden",
        maxWidth: "100vw",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        className="max-w-screen-xl mx-auto w-full px-5 md:px-10"
        style={{ paddingTop: "28px", paddingBottom: "36px" }}
      >

        {/* ── DESKTOP: grid layout ── */}
        <div
          className="hidden md:grid items-center"
          style={{
            gridTemplateColumns: "1fr 0.9fr",
            gap: "48px",
          }}
        >
          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start text-right"
          >
            {/* Chips */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="flex flex-wrap gap-2.5"
              style={{ marginBottom: "22px" }}
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
                    padding: "6px 14px",
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
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: "clamp(64px, 5.2vw, 84px)",
                lineHeight: 0.93,
                letterSpacing: "-0.032em",
                fontWeight: 900,
                marginBottom: "24px",
                maxWidth: "580px",
                fontFamily: "var(--font-heebo)",
              }}
            >
              <span style={{ display: "block" }}>יש כסף שמחכה לך</span>
              <span style={{ display: "block", color: "#0066CC" }}>בעבודה שלך</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              style={{
                maxWidth: "520px",
                fontSize: "clamp(20px, 1.6vw, 25px)",
                lineHeight: 1.52,
                marginBottom: "28px",
                color: "#86868B",
                fontWeight: 400,
                fontFamily: "var(--font-heebo)",
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

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-col items-start"
              style={{ gap: "10px" }}
            >
              <div className="flex items-center" style={{ gap: "12px" }}>
                <button
                  onClick={scrollToSurvey}
                  style={{
                    background: "#0066CC",
                    color: "#fff",
                    fontWeight: 900,
                    fontSize: "16px",
                    height: "52px",
                    padding: "0 36px",
                    borderRadius: "13px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 6px 22px rgba(0,102,204,0.26)",
                    transition: "background 0.16s ease",
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
                    fontSize: "15px",
                    height: "52px",
                    padding: "0 22px",
                    borderRadius: "13px",
                    border: "1.5px solid rgba(0,102,204,0.22)",
                    cursor: "pointer",
                    transition: "border-color 0.16s ease",
                    fontFamily: "var(--font-heebo)",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#0066CC"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(0,102,204,0.22)"}
                >
                  שתפו עם החברים בעבודה
                </button>
              </div>
              <span style={{ fontSize: "13px", color: "#86868B", fontWeight: 400 }}>
                3 שאלות · 15 שניות · בלי הרשמה
              </span>
            </motion.div>
          </motion.div>

          {/* VISUAL */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="flex justify-center items-center"
          >
            <div className="relative flex items-center justify-center">
              <div
                className="absolute pointer-events-none"
                style={{
                  width: 420,
                  height: 420,
                  background: "radial-gradient(circle, rgba(0,102,204,0.07) 0%, transparent 68%)",
                  filter: "blur(44px)",
                }}
              />
              <img
                src={HERO_IMAGE}
                alt="הטבות לעובדים"
                style={{
                  width: "clamp(240px, 32vw, 480px)",
                  maxHeight: "65svh",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                  filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.12))",
                  position: "relative",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* ── MOBILE: stacked layout ── */}
        <div className="flex md:hidden flex-col items-center text-center" style={{ gap: "0" }}>

          {/* Chips */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex flex-col items-center"
            style={{ gap: "8px", marginBottom: "20px" }}
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
                  padding: "6px 14px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: chip.highlight ? "#0066CC" : "#1D1D1F",
                  textAlign: "center",
                }}
              >
                {chip.label}
              </div>
            ))}
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{
              fontSize: "clamp(46px, 10vw, 56px)",
              lineHeight: 0.97,
              letterSpacing: "-0.028em",
              fontWeight: 900,
              marginBottom: "20px",
              fontFamily: "var(--font-heebo)",
            }}
          >
            <span style={{ display: "block" }}>יש כסף שמחכה לך</span>
            <span style={{ display: "block", color: "#0066CC" }}>בעבודה שלך</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.17 }}
            style={{
              fontSize: "clamp(18px, 4.5vw, 21px)",
              lineHeight: 1.52,
              marginBottom: "24px",
              color: "#86868B",
              fontWeight: 400,
              fontFamily: "var(--font-heebo)",
              maxWidth: "96%",
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

          {/* Visual mobile */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="flex justify-center"
            style={{ marginTop: "0", marginBottom: "24px" }}
          >
            <img
              src={HERO_IMAGE}
              alt="הטבות לעובדים"
              style={{
                width: "clamp(220px, 78vw, 340px)",
                height: "auto",
                display: "block",
                filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.11))",
                marginInline: "auto",
              }}
            />
          </motion.div>

          {/* CTA mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.28 }}
            className="flex flex-col items-center w-full"
            style={{ gap: "10px", marginBottom: "12px" }}
          >
            <button
              onClick={scrollToSurvey}
              style={{
                background: "#0066CC",
                color: "#fff",
                fontWeight: 900,
                fontSize: "16px",
                height: "52px",
                borderRadius: "13px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 6px 22px rgba(0,102,204,0.26)",
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
                fontSize: "15px",
                height: "50px",
                borderRadius: "13px",
                border: "1.5px solid rgba(0,102,204,0.22)",
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

      {/* בר תחתון צף */}
      <div
        onClick={scrollToSurvey}
        style={{
          position: "absolute", bottom: "24px",
          left: "50%", transform: "translateX(-50%)",
          width: "88%", maxWidth: "400px",
          background: "#007AFF", color: "#fff",
          padding: "15px", borderRadius: "14px",
          textAlign: "center", fontWeight: 700,
          fontSize: "15px", cursor: "pointer",
          boxShadow: "0 8px 24px rgba(0,122,255,0.2)",
          fontFamily: "var(--font-heebo)",
          zIndex: 50,
        }}
      >
        רוצים לצרף את הארגון? בואו נתחיל
      </div>
    </section>
  );
}