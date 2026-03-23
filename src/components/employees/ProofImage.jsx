import React from "react";
import { motion } from "framer-motion";

export default function ProofImage({ imageUrl }) {
  const scrollToBenefits = () => {
    document.getElementById("benefits-showcase")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="bg-white"
      style={{
        overflowX: "hidden",
        maxWidth: "100vw",
        borderTop: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div
        className="max-w-screen-xl mx-auto px-5 md:px-10"
        style={{ paddingTop: "96px", paddingBottom: "108px" }}
      >

        {/* ── DESKTOP: image left, text right ── */}
        <div
          className="hidden md:grid items-center"
          style={{ gridTemplateColumns: "1fr 0.8fr", gap: "68px" }}
        >
          {/* IMAGE — LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="flex justify-center items-center"
          >
            <motion.img
              src={imageUrl}
              alt="הטבה אמיתית לעובדים"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                width: "clamp(480px, 50vw, 700px)",
                height: "auto",
                objectFit: "contain",
                display: "block",
                filter: "drop-shadow(0 24px 56px rgba(0,0,0,0.13))",
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
                fontSize: "clamp(58px, 4.8vw, 68px)",
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                fontWeight: 900,
                marginBottom: "22px",
                fontFamily: "var(--font-heebo)",
              }}
            >
              <span style={{ display: "block" }}>הנה ההוכחה איך</span>
              <span style={{ display: "block", color: "#0066CC" }}>הנטו שלך יגדל</span>
            </h2>

            {/* Subtitle */}
            <p
              style={{
                fontSize: "clamp(19px, 1.6vw, 23px)",
                lineHeight: 1.6,
                color: "#86868B",
                fontWeight: 400,
                marginBottom: "22px",
                maxWidth: "520px",
                fontFamily: "var(--font-heebo)",
              }}
            >
              כאן רואים בפועל איך תקציב העובדים נותן יותר.
              מחיר לעובדים, מחיר נמוך בזאפ, והחיסכון שנשאר אצלך.
            </p>

            {/* Proof strip */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0",
                background: "rgba(0,102,204,0.05)",
                border: "1px solid rgba(0,102,204,0.12)",
                borderRadius: "12px",
                padding: "12px 18px",
                marginBottom: "22px",
                backdropFilter: "blur(8px)",
              }}
            >
              {[
                "מחיר לעובדים",
                "מחיר נמוך בזאפ",
                "החיסכון שלך",
              ].map((item, i) => (
                <React.Fragment key={i}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: i === 2 ? "#0066CC" : "#1D1D1F",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item}
                  </span>
                  {i < 2 && (
                    <span
                      style={{
                        margin: "0 10px",
                        color: "rgba(0,0,0,0.18)",
                        fontSize: "13px",
                      }}
                    >
                      |
                    </span>
                  )}
                </React.Fragment>
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

        {/* ── MOBILE: text first, then image ── */}
        <div className="flex md:hidden flex-col items-center text-center" style={{ gap: "0" }}>

          {/* H2 */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{
              fontSize: "clamp(40px, 9vw, 46px)",
              lineHeight: 1.05,
              letterSpacing: "-0.028em",
              fontWeight: 900,
              marginBottom: "18px",
              fontFamily: "var(--font-heebo)",
            }}
          >
            <span style={{ display: "block" }}>הנה ההוכחה איך</span>
            <span style={{ display: "block", color: "#0066CC" }}>הנטו שלך יגדל</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
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
            כאן רואים בפועל איך תקציב העובדים נותן יותר.
            מחיר לעובדים, מחיר נמוך בזאפ, והחיסכון שנשאר אצלך.
          </motion.p>

          {/* Proof strip mobile */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "6px 10px",
              background: "rgba(0,102,204,0.05)",
              border: "1px solid rgba(0,102,204,0.12)",
              borderRadius: "12px",
              padding: "11px 16px",
              marginBottom: "20px",
              width: "100%",
            }}
          >
            {[
              "מחיר לעובדים",
              "מחיר נמוך בזאפ",
              "החיסכון שלך",
            ].map((item, i) => (
              <React.Fragment key={i}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: i === 2 ? "#0066CC" : "#1D1D1F",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item}
                </span>
                {i < 2 && (
                  <span style={{ color: "rgba(0,0,0,0.18)", fontSize: "12px" }}>|</span>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* CTA mobile */}
          <motion.button
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
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

          {/* Image mobile */}
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            src={imageUrl}
            alt="הטבה אמיתית לעובדים"
            style={{
              width: "clamp(260px, 86vw, 400px)",
              height: "auto",
              objectFit: "contain",
              display: "block",
              marginInline: "auto",
              filter: "drop-shadow(0 14px 36px rgba(0,0,0,0.12))",
            }}
          />
        </div>

      </div>
    </section>
  );
}