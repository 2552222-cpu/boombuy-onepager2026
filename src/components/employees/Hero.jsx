import React from "react";

export default function Hero() {
  return (
    <section id="hero-section" style={{ background: "#fff", direction: "rtl", overflow: "hidden", padding: "60px 20px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img 
          src="https://media.base44.com/images/public/69bc4105141d932b80ba9f27/f8c7af3f9_1.png" 
          alt="Tablet Offer" 
          style={{ width: "100%", maxWidth: "600px", height: "auto", objectFit: "contain" }} 
        />
      </div>
    </section>
  );
}