import React from "react";
import { motion } from "framer-motion";

export default function ZeroBudget() {
  return (
    <section
      style={{
        background: "#FAFAFA",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        overflowX: "hidden",
        maxWidth: "100vw",
      }}
    >
      <div
        className="max-w-screen-xl mx-auto px-5 md:px-10"
        style={{ paddingTop: "72px", paddingBottom: "72px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center md:items-stretch"
          style={{
            gap: "40px",
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.07)",
            borderRadius: "24px",
            padding: "40px 40px",
            boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
          }}
        >
          {/* Value Tile */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "140px",
              padding: "28px 32px",
              background: "#F5F5F7",
              border: "1px solid rgba(0,0,0,0.07)",
              borderRadius: "18px",
              flexShrink: 0,
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontSize: "clamp(48px, 6vw, 64px)",
                fontWeight: 900,
                color: "#0066CC",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                fontFamily: "var(--font-heebo)",
              }}
            >
              0 ₪
            </span>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#86868B",
                marginTop: "8px",
                fontFamily: "var(--font-heebo)",
                whiteSpace: "nowrap",
              }}
            >
              עלות למעסיק
            </span>
          </div>

          {/* Divider — desktop only */}
          <div
            className="hidden md:block"
            style={{
              width: "1px",
              background: "rgba(0,0,0,0.07)",
              alignSelf: "stretch",
              flexShrink: 0,
            }}
          />

          {/* Text */}
          <div
            className="flex flex-col justify-center text-right"
            style={{ flex: 1 }}
          >
            <h2
              style={{
                fontSize: "clamp(26px, 2.8vw, 36px)",
                fontWeight: 900,
                letterSpacing: "-0.028em",
                lineHeight: 1.15,
                marginBottom: "14px",
                fontFamily: "var(--font-heebo)",
                color: "#1D1D1F",
              }}
            >
              0 ₪ תוספת תקציב לארגון שלך.
            </h2>
            <p
              style={{
                fontSize: "clamp(16px, 1.4vw, 19px)",
                lineHeight: 1.65,
                color: "#86868B",
                fontWeight: 400,
                maxWidth: "560px",
                fontFamily: "var(--font-heebo)",
              }}
            >
              הפלטפורמה עובדת על מקסום התקציב הקיים שהארגון כבר ממילא מוציא — כדי לתת לעובדים הרבה יותר ערך.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}