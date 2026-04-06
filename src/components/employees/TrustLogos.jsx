import React from "react";
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
  const row1 = logos.slice(0, 13);
  const row2 = logos.slice(13, 26);

  return (
    <section className="py-8 md:py-20 bg-white border-t border-b border-border/30" style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
      <div className="w-full" style={{ maxWidth: '100vw' }}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-14"
        >
          <p style={{ fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 700, fontFamily: "var(--font-heebo)", color: "#1D1D1F" }}>
            הם כבר מגדילים את הנטו לעובדים שלהם
          </p>
        </motion.div>

        {/* Desktop: grid 7 columns x 2 rows */}
        <div
          className="hidden md:grid"
          style={{
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "16px",
            padding: "0 40px",
          }}
        >
          {logos.map((logo, i) => (
            <div
              key={i}
              style={{
                height: "65px",
                padding: "12px",
                display: "grid",
                placeItems: "center",
                filter: "grayscale(100%)",
                opacity: 0.7,
                transition: "filter 0.25s ease, opacity 0.25s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = "grayscale(0%)"; e.currentTarget.style.opacity = 1; }}
              onMouseLeave={e => { e.currentTarget.style.filter = "grayscale(100%)"; e.currentTarget.style.opacity = 0.7; }}
            >
              <img
                src={logo.url}
                alt={logo.name}
                style={{ width: "100%", height: "100%", objectFit: "contain", maxWidth: "120px", maxHeight: "41px" }}
              />
            </div>
          ))}
        </div>

        {/* Mobile: grid 3 columns */}
         <motion.div
           initial={{ opacity: 0, y: 12 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.08 }}
           className="md:hidden"
           style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", padding: "0 16px" }}
         >
           {logos.map((logo, i) => (
              <div
                key={i}
                style={{
                  height: "60px",
                  padding: "8px",
                  display: "grid",
                  placeItems: "center",
                  filter: "grayscale(100%)",
                  opacity: 0.7,
                }}
              >
                <img
                  src={logo.url}
                  alt={logo.name}
                  style={{ width: "100%", height: "100%", objectFit: "contain", maxWidth: "110px", maxHeight: "44px" }}
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              </div>
            ))}
         </motion.div>
      </div>
    </section>
  );
}