import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const logos = [
  { name: "לאומי", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/2f10b2609_17.png" },
  { name: "ישראייר", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3375a8756_-2026-03-22T223046698.png" },
  { name: "תעש", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/8003c0d5a_62.png" },
  { name: "קרן קיימת", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/dff369112_61.png" },
  { name: "Estee Lauder", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/a6011911e_42.png" },
  { name: "ORT", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6ecb1d12e_48.png" },
  { name: "בזן", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/da1504162_47.png" },
  { name: "אלבר", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/0d5a77386_2.png" },
  { name: "בנק ישראל", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/62d86b046_8.png" },
  { name: "ZIM", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/ad90fe974_-2026-03-22T223323805.png" },
  { name: "סלקום", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/f5d33c4f1_-2026-03-23T144912129.png" },
  { name: "מזרחי טפחות", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3f66c2722_37.png" },
  { name: "Teva", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/440e21638_readytoboom93.png" },
  { name: "ONE", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/1a493167d_27.png" },
  { name: "רשות המסים", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/d27a9085c_26.png" },
  { name: "SAP", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/c078c3ee8_25.png" },
  { name: "מגן דוד אדום", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/eb5f80934_24.png" },
  { name: "מילגם", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/bbde088d4_23.png" },
  { name: "AMOT", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/076c5871f_22.png" },
  { name: "MAX", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/e6509fd0a_32.png" },
  { name: "אלקטרה אפיקים", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/ee4dfeabe_-2026-03-22T223003872.png" },
  { name: "דופלט", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6862cd610_-2026-03-22T184752919.png" },
  { name: "בנק לאומי", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/62fa4ae8e_-2026-03-22T184709815.png" },
  { name: "דלק", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/be9e3de1a_-2026-03-22T184841801.png" },
  { name: "Check Point", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/e71824c2e_-2026-04-02T203121306.png" },
  { name: "רמלאל", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/ee6b05338_-2026-04-03T180125393.png" },
  { name: "בזק בתקשורת", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/8b28ec6fc_71.png" },
];

export default function TrustLogos() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <section style={{
      background: "#fff",
      borderTop: "1px solid rgba(0,0,0,0.07)",
      borderBottom: "1px solid rgba(0,0,0,0.07)",
      padding: isMobile ? "48px 0" : "64px 0",
      overflowX: "hidden",
    }}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "40px" }}
      >
        <p style={{
          fontSize: isMobile ? "18px" : "22px",
          fontWeight: 700,
          fontFamily: "var(--font-heebo)",
          color: "#1D1D1F",
          margin: 0,
        }}>
          הם כבר מגדילים את הנטו לעובדים שלהם
        </p>
      </motion.div>

      {isMobile ? (
        // Mobile: 3 columns
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          padding: "0 16px",
        }}>
          {logos.map((logo, i) => (
            <div
              key={i}
              style={{
                height: "70px",
                padding: "10px",
                display: "grid",
                placeItems: "center",
                background: "#F5F5F7",
                borderRadius: "12px",
                filter: "grayscale(100%)",
                opacity: 0.7,
                transition: "all 0.2s ease",
              }}
            >
              <img
                src={logo.url}
                alt={logo.name}
                style={{
                  maxWidth: "90%",
                  maxHeight: "50px",
                  objectFit: "contain",
                  display: "block",
                }}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
          ))}
        </div>
      ) : (
        // Desktop: 7 columns table-like grid
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "20px",
          padding: "0 48px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}>
          {logos.map((logo, i) => (
            <div
              key={i}
              style={{
                height: "90px",
                padding: "14px 12px",
                display: "grid",
                placeItems: "center",
                background: "#F9F9FB",
                borderRadius: "14px",
                border: "1px solid rgba(0,0,0,0.06)",
                filter: "grayscale(100%)",
                opacity: 0.7,
                transition: "all 0.25s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "grayscale(0%)";
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "grayscale(100%)";
                e.currentTarget.style.opacity = "0.7";
                e.currentTarget.style.background = "#F9F9FB";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <img
                src={logo.url}
                alt={logo.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "60px",
                  objectFit: "contain",
                  display: "block",
                  width: "auto",
                }}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}