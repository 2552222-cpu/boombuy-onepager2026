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
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <section style={{ background: "#fff", padding: isMobile ? "48px 20px" : "80px 40px", borderTop: "1px solid #f0f0f0" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        <motion.p 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ textAlign: "center", fontSize: isMobile ? "19px" : "24px", fontWeight: 800, marginBottom: isMobile ? "32px" : "56px", color: "#1D1D1F" }}
        >
          הם כבר מגדילים את הנטו לעובדים שלהם
        </motion.p>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "repeat(7, 1fr)", 
          gap: isMobile ? "12px" : "24px",
          alignItems: "center" 
        }}>
          {logos.map((logo, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              style={{ 
                height: isMobile ? "70px" : "90px", 
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "#F9F9FB", borderRadius: "16px", padding: "10px",
                filter: "grayscale(100%)", opacity: 0.6, transition: "0.3s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = "grayscale(0%)"; e.currentTarget.style.opacity = "1"; e.currentTarget.style.background = "#fff"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = "grayscale(100%)"; e.currentTarget.style.opacity = "0.6"; e.currentTarget.style.background = "#F9F9FB"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <img src={logo.url} alt={logo.name} style={{ maxWidth: "85%", maxHeight: "65%", objectFit: "contain" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}