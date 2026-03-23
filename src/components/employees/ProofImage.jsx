import React from "react";
import { motion } from "framer-motion";

const PROOF_CARDS = [
  { label: "מחיר לעובדים", value: "249 ₪", highlight: false },
  { label: "מחיר נמוך בזאפ", value: "1,999 ₪", highlight: false },
  { label: "החיסכון שלך", value: "1,750 ₪", highlight: true },
];

export default function ProofImage({ imageUrl }) {
  const cards = PROOF_CARDS;

  const scrollToBenefits = () => {
    document.getElementById("benefits-showcase")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      style={{
        background: "#fff",
        overflowX: "hidden",
        maxWidth: "100vw",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div
        className="max-w-screen-xl mx-auto px-5 md:px-10"
        style={{ paddingTop: "96px", paddingBottom: "112px" }}
      >

        {/* ── DESKTOP ── */}
        <div
          className="hidden md:grid items-center"
          style={{ gridTemplateColumns: "0.95fr 0.82fr", gap: "56px" }}
        >
          {/* IMAGE — LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="flex justify-center items-center"
          >
            <img
              src={imageUrl}
              alt="הטבה אמיתית לעובדים"
              style={{
                width: "clamp(360px, 40vw, 560px)",
                height: "auto",
                objectFit: "contain",
                display: "block",
                filter: "drop-shadow(0 20px 48px rgba(0,0,0,0.13))",
              }}
            />
          </motion.div>

          {/* TEXT — RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col items-start text-right"
          >
            {/* H2 */}
            <h2
              style={{
                fontSize: "clamp(56px, 4.6vw, 66px)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                fontWeight: 900,
                marginBottom: "20px",
                fontFamily: "var(--font-heebo)",
              }}
            >
              <span style={{ display: "block" }}>ככה נראית</span>
              <span style={{ display: "block", color: "#0066CC" }}>הטבה אמיתית</span>
            </h2>

            {/* Subtitle */}
            <p
              style={{
                fontSize: "clamp(19px, 1.5vw, 23px)",
                lineHeight: 1.6,
                color: "#86868B",
                fontWeight: 400,
                marginBottom: "22px",
                maxWidth: "520px",
                fontFamily: "var(--font-heebo)",
              }}
            >
              דוגמאות חריגות לחיסכון מהשנה האחרונה.{" "}
              הנה הוכחה שהנטו שלך שווה הרבה יותר.
            </p>

            {/* Proof Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
                marginBottom: "24px",
                width: "100%",
              }}
            >
              {cards.map((card, i) => (
                <div
                  key={i}
                  style={{
                    background: card.highlight ? "rgba(0,102,204,0.05)" : "#F7F7F8",
                    border: card.highlight
                      ? "1px solid rgba(0,102,204,0.2)"
                      : "1px solid rgba(0,0,0,0.07)",
                    borderRadius: "18px",
                    padding: "14px 12px 12px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    textAlign: "right",
                    gap: "5px",
                    boxShadow: card.highlight
                      ? "0 2px 12px rgba(0,102,204,0.08)"
                      : "0 1px 6px rgba(0,0,0,0.04)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#86868B",
                      fontFamily: "var(--font-heebo)",
                      lineHeight: 1.3,
                    }}
                  >
                    {card.label}
                  </span>
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: 900,
                      color: card.highlight ? "#0066CC" : "#1D1D1F",
                      fontFamily: "var(--font-heebo)",
                      letterSpacing: "-0.025em",
                      lineHeight: 1.1,
                      fontSize: "28px",
                      }}
                      >
                      {card.value}
                      </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={scrollToBenefits}
              style={{
                background: "#F5F5F7",
                color: "#1D1D1F",
                fontWeight: 700,
                fontSize: "15px",
                height: "50px",
                padding: "0 28px",
                borderRadius: "12px",
                border: "1px solid rgba(29,29,31,0.1)",
                cursor: "pointer",
                transition: "background 0.16s ease",
                fontFamily: "var(--font-heebo)",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#EAEAEC"}
              onMouseLeave={e => e.currentTarget.style.background = "#F5F5F7"}
            >
              גלה את כל ההטבות
            </button>
          </motion.div>
        </div>

        {/* ── MOBILE ── */}
        <div
          className="flex md:hidden flex-col items-center text-center"
          style={{ gap: "0" }}
        >
          {/* H2 */}
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: "clamp(40px, 9vw, 46px)",
              lineHeight: 1.05,
              letterSpacing: "-0.028em",
              fontWeight: 900,
              marginBottom: "16px",
              fontFamily: "var(--font-heebo)",
            }}
          >
            <span style={{ display: "block" }}>ככה נראית</span>
            <span style={{ display: "block", color: "#0066CC" }}>הטבה אמיתית</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.07 }}
            style={{
              fontSize: "clamp(17px, 4vw, 20px)",
              lineHeight: 1.6,
              color: "#86868B",
              fontWeight: 400,
              marginBottom: "20px",
              maxWidth: "95%",
              fontFamily: "var(--font-heebo)",
            }}
          >
            דוגמאות חריגות לחיסכון מהשנה האחרונה.{" "}
            הנה הוכחה שהנטו שלך שווה הרבה יותר.
          </motion.p>

          {/* Proof Cards mobile — 2+1 layout */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            style={{ width: "100%", marginBottom: "20px" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              {cards.slice(0, 2).map((card, i) => (
                <div
                  key={i}
                  style={{
                    background: "#F7F7F8",
                    border: "1px solid rgba(0,0,0,0.07)",
                    borderRadius: "16px",
                    padding: "12px 10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: "4px",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                  }}
                >
                  <span style={{ fontSize: "11px", fontWeight: 500, color: "#86868B", fontFamily: "var(--font-heebo)" }}>
                    {card.label}
                  </span>
                  <span style={{ fontSize: "19px", fontWeight: 900, color: "#1D1D1F", fontFamily: "var(--font-heebo)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                    {card.value}
                  </span>
                </div>
              ))}
            </div>
            {/* Card 3 — full width, highlighted */}
            <div
              style={{
                background: "rgba(0,102,204,0.05)",
                border: "1px solid rgba(0,102,204,0.2)",
                borderRadius: "16px",
                padding: "12px 10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "4px",
                boxShadow: "0 2px 12px rgba(0,102,204,0.08)",
              }}
            >
              <span style={{ fontSize: "11px", fontWeight: 500, color: "#86868B", fontFamily: "var(--font-heebo)" }}>
                {cards[2].label}
              </span>
              <span style={{ fontSize: "22px", fontWeight: 900, color: "#0066CC", fontFamily: "var(--font-heebo)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                {cards[2].value}
              </span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.12 }}
            onClick={scrollToBenefits}
            style={{
              background: "#F5F5F7",
              color: "#1D1D1F",
              fontWeight: 700,
              fontSize: "15px",
              height: "50px",
              borderRadius: "12px",
              border: "1px solid rgba(29,29,31,0.1)",
              cursor: "pointer",
              width: "100%",
              fontFamily: "var(--font-heebo)",
              marginBottom: "32px",
            }}
          >
            גלה את כל ההטבות
          </motion.button>

          {/* Image */}
          <motion.img
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            src={imageUrl}
            alt="הטבה אמיתית לעובדים"
            style={{
              width: "clamp(240px, 82vw, 380px)",
              height: "auto",
              objectFit: "contain",
              display: "block",
              marginInline: "auto",
              filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.11))",
            }}
          />
        </div>

      </div>
    </section>
  );
}