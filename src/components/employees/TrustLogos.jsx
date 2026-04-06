import React from "react";

const logos = [
  { name: "לאומי", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/2f10b2609_17.png" },
  { name: "ישראייר", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/f26a5145d_-2026-02-18T184914549.png" },
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
  { name: "HOT mobile", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/5f7a627b6_-2026-04-06T212635319.png" },
];

const LogoCard = ({ logo, onMouseEnter, onMouseLeave }) => (
  <div
    style={{
      width: "120px",
      height: "80px",
      background: "#F9F9FB",
      borderRadius: "14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "12px",
      transition: "filter 0.3s, opacity 0.3s, boxShadow 0.3s",
      cursor: "pointer",
      flexShrink: 0,
    }}
    className="logo-card"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <img 
      src={logo.url} 
      alt={logo.name} 
      style={{ width: "100%", height: "100%", objectFit: "contain" }} 
    />
  </div>
);

export default function TrustLogos() {
  return (
    <section style={{ background: "#fff", padding: "80px 40px", borderTop: "1px solid #f0f0f0" }}>
      <style>{`
        .logo-card {
          filter: grayscale(100%);
          opacity: 0.5;
        }
        .marquee-track {
          display: flex;
          gap: 16px;
          width: fit-content;
          animation-play-state: running;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .marquee-track:hover .logo-card {
          filter: grayscale(0%);
          opacity: 1;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }
        @keyframes marquee-rtl {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-rtl {
          animation: marquee-rtl 35s linear infinite;
        }
        .marquee-ltr {
          animation: marquee-rtl 38s linear infinite reverse;
        }
      `}</style>

      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        <h2 style={{ 
          textAlign: "center", 
          fontSize: "clamp(18px, 2.5vw, 24px)", 
          fontWeight: 800, 
          marginBottom: "56px", 
          color: "#1D1D1F" 
        }}>
          הם כבר מגדילים את הנטו לעובדים שלהם
        </h2>

        {/* שורה 1: RTL */}
        <div style={{ 
          marginBottom: "32px", 
          overflow: "hidden", 
          position: "relative", 
          height: "96px",
          paddingTop: "8px",
          paddingBottom: "8px",
        }}>
          <div className="marquee-track marquee-rtl">
            {[...logos, ...logos].map((logo, i) => (
              <LogoCard key={`rtl-${i}`} logo={logo} />
            ))}
          </div>
          <div style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100px",
            height: "100%",
            background: "linear-gradient(to right, #fff, transparent)",
            zIndex: 10,
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "100px",
            height: "100%",
            background: "linear-gradient(to left, #fff, transparent)",
            zIndex: 10,
            pointerEvents: "none",
          }} />
        </div>

        {/* שורה 2: LTR */}
        <div style={{ 
          overflow: "hidden", 
          position: "relative", 
          height: "96px",
          paddingTop: "8px",
          paddingBottom: "8px",
        }}>
          <div className="marquee-track marquee-ltr">
            {[...logos, ...logos].map((logo, i) => (
              <LogoCard key={`ltr-${i}`} logo={logo} />
            ))}
          </div>
          <div style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100px",
            height: "100%",
            background: "linear-gradient(to right, #fff, transparent)",
            zIndex: 10,
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "100px",
            height: "100%",
            background: "linear-gradient(to left, #fff, transparent)",
            zIndex: 10,
            pointerEvents: "none",
          }} />
        </div>
      </div>
    </section>
  );
}