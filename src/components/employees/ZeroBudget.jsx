import React from "react";
import { motion } from "framer-motion";
import ILS from "./ILS";

export default function ZeroBudget() {
  return (
    <section style={{ background: "#FAFAFA", overflowX: "hidden", maxWidth: "100vw" }}>
      <div className="max-w-screen-xl mx-auto px-5 md:px-10" style={{ paddingTop: "72px", paddingBottom: "72px" }}>
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
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "120px",
            padding: "20px 28px",
            background: "#F5F5F7",
            borderRadius: "18px",
            flexShrink: 0,
            textAlign: "center",
          }}>
            <ILS value={0} style={{
              fontSize: "clamp(40px, 5vw, 56px)",
              fontWeight: 900,
              color: "#0066CC",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              fontFamily: "var(--font-heebo)",
            }} />
            <span style={{ fontSize: "13px", fontWeight: 500, color: "#86868B", marginTop: "6px", whiteSpace: "nowrap" }}>
              עלות למעסיק
            </span>
          </div>

          {/* Divider — desktop only */}
          <div className="hidden md:block" style={{ width: "1px", background: "rgba(0,0,0,0.07)", alignSelf: "stretch", flexShrink: 0 }} />

          {/* Text */}
          <div className="flex flex-col justify-center text-right" style={{ flex: 1 }}>
            <h2 style={{ fontSize: "clamp(20px, 3.5vw, 32px)", fontWeight: 900, color: "#1D1D1F", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 10 }}>
            0 עלות למעסיק. ערך כפול לעובד.
          </h2>
          <p style={{ fontSize: "clamp(14px, 1.8vw, 17px)", color: "#6E6E73", lineHeight: 1.6, maxWidth: 420, margin: 0 }}>
            בום ביי עובדת על בסיס התקציב הקיים שהארגון כבר מקצה. בלי להוסיף עלות למעסיק, העובדים מקבלים יותר ערך לאורך כל השנה.
          </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}