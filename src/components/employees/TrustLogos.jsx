import React from "react";
import { logoList, rowA, rowB } from "../../utils/logoData";

// Desktop: horizontal marquee rows
function HRow({ items, dir = "left", duration = 85 }) {
  const trackClass = dir === "left" ? "jci-track jci-left" : "jci-track jci-right";
  return (
    <div className="jci-row">
      <div className={trackClass} style={{ ["--jci-dur"]: `${duration}s` }}>
        {[...items, ...items].map((src, i) => {
          const logoObj = logoList.find(l => l.url === src);
          const logoIndex = logoList.findIndex(l => l.url === src);
          return (
            <div key={`${src}-${i}`} className="jci-logoCard" data-logo-index={logoIndex}>
              <img src={src} alt={logoObj?.name || "לוגו לקוח"} loading="lazy" decoding="async" width="200" height="100" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Mobile: vertical marquee column
function VCol({ items, dir = "up", duration = 30 }) {
  const animClass = dir === "up" ? "jci-vcol-up" : "jci-vcol-down";
  return (
    <div className="jci-vcol-wrap">
      <div className={`jci-vcol-track ${animClass}`} style={{ ["--jci-vdur"]: `${duration}s` }}>
        {[...items, ...items].map((src, i) => {
          const logoObj = logoList.find(l => l.url === src);
          return (
            <div key={`${src}-${i}`} className="jci-vcol-card">
              <img src={src} alt={logoObj?.name || "לוגו לקוח"} loading="lazy" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Reorder rowA so לאומי (index 0) and דלק (index 22) appear at positions 1-2 (visible on load)
const colA = (() => {
  // rowA has לאומי at pos 7, דלק at pos 4 → rotate so דלק is at pos 1
  const arr = [...rowA];
  const dIdx = arr.findIndex(url => logoList.find(l => l.url === url)?.name === "דלק");
  return [...arr.slice(dIdx - 1), ...arr.slice(0, dIdx - 1)];
})();

// Reorder rowB so Check Point appears at position 2 (visible on load)
const colB = (() => {
  const arr = [...rowB];
  const cpIdx = arr.findIndex(url => logoList.find(l => l.url === url)?.name === "Check Point");
  return [...arr.slice(cpIdx - 1), ...arr.slice(0, cpIdx - 1)];
})();

export default function TrustLogos() {
  return (
    <section id="logo-wall-section" className="jci-logoWall">
      <style>{`
        .jci-logoWall{
          width:100%;
          background:#fff;
          padding:90px 0 96px;
          font-family:'Heebo',sans-serif;
          direction:rtl;
          box-sizing:border-box;
          overflow:hidden;
        }
        .jci-head{
          text-align:center;
          margin:0 auto 44px;
          padding:0 20px;
        }
        .jci-title{
          font-size:clamp(28px, 5vw, 48px);
          font-weight:900;
          color:#1D1D1F;
          letter-spacing:-0.025em;
          margin:0 0 12px;
          line-height:1.15;
        }
        .jci-subtitle{
          font-size:15.5px;
          font-weight:400;
          color:#4B5563;
          margin:0;
          line-height:1.6;
        }

        /* ── Desktop: horizontal rows ── */
        .jci-rows{
          display:flex;
          flex-direction:column;
          gap:20px;
          padding:0;
          overflow:hidden;
        }
        .jci-row{
          width:100%;
          overflow:hidden;
          position:relative;
          height:132px;
          display:flex;
          align-items:center;
        }
        .jci-track{
          display:flex;
          align-items:center;
          gap:0;
          width:max-content;
          position:absolute;
          left:0;
          top:0;
          height:100%;
          animation-duration:var(--jci-dur);
          animation-timing-function:linear;
          animation-iteration-count:infinite;
        }
        @media (prefers-reduced-motion:no-preference){
          .jci-track{ animation-play-state:running !important; }
        }
        .jci-left{ animation-name:jciSlideLeft; }
        .jci-right{ animation-name:jciSlideRight; }
        @keyframes jciSlideLeft{
          from{ transform:translateX(0); }
          to{ transform:translateX(-50%); }
        }
        @keyframes jciSlideRight{
          from{ transform:translateX(-50%); }
          to{ transform:translateX(0); }
        }
        .jci-row:hover .jci-track{ animation-play-state:paused; }
        .jci-logoCard{
          flex:0 0 auto;
          display:flex;
          align-items:center;
          justify-content:center;
          width:180px;
          height:100px;
          padding:0;
          box-sizing:border-box;
          position:relative;
        }
        .jci-logoCard img{
          display:block;
          width:100%;
          height:100%;
          object-fit:contain;
          object-position:center;
          padding:4px 8px;
          box-sizing:border-box;
        }
        [data-logo-index="0"] img { transform: scale(1.2); }
        [data-logo-index="1"] img { transform: scale(1.5); }
        [data-logo-index="2"] img { transform: scale(1.5); }
        [data-logo-index="3"] img { transform: scale(1.2); }
        [data-logo-index="4"] img { transform: scale(1.44); }
        [data-logo-index="5"] img { transform: scale(1.44); }
        [data-logo-index="6"] img { transform: scale(1.44); }
        [data-logo-index="7"] img { transform: scale(1.44); }
        [data-logo-index="8"] img { transform: scale(1.2); }
        [data-logo-index="9"] img { transform: scale(0.72); }
        [data-logo-index="12"] img { transform: scale(1.2); }
        [data-logo-index="13"] img { transform: scale(1.2); }
        [data-logo-index="16"] img { transform: scale(1.2); }
        [data-logo-index="17"] img { transform: scale(1.2); }
        [data-logo-index="18"] img { transform: scale(1.25); }
        [data-logo-index="20"] img { transform: scale(1.3); }
        [data-logo-index="24"] img { transform: scale(1.8); }
        [data-logo-index="25"] img { transform: scale(1.2); }
        [data-logo-index="26"] img { transform: scale(0.72); }

        /* ── Mobile: vertical marquee columns ── */
        .jci-vcols{
          display:none;
          flex-direction:row;
          gap:8px;
          justify-content:center;
          padding:0 16px;
        }
        .jci-vcol-wrap{
          flex:1;
          max-width:50%;
          height:380px;
          overflow:hidden;
          position:relative;
          border-radius:16px;
        }
        .jci-vcol-track{
          display:flex;
          flex-direction:column;
          gap:0;
          width:100%;
          animation-timing-function:linear;
          animation-iteration-count:infinite;
          animation-duration:var(--jci-vdur);
        }
        .jci-vcol-up{ animation-name:jciSlideUp; }
        .jci-vcol-down{ animation-name:jciSlideDown; }
        @keyframes jciSlideUp{
          from{ transform:translateY(0); }
          to{ transform:translateY(-50%); }
        }
        @keyframes jciSlideDown{
          from{ transform:translateY(-50%); }
          to{ transform:translateY(0); }
        }
        .jci-vcol-wrap:hover .jci-vcol-track{ animation-play-state:paused; }
        .jci-vcol-card{
          flex:0 0 100px;
          height:100px;
          display:flex;
          align-items:center;
          justify-content:center;
          background:#fff;
          border-bottom:1px solid rgba(0,0,0,0.05);
        }
        .jci-vcol-card img{
          width:90%;
          height:80px;
          object-fit:contain;
          padding:8px;
          /* Neutralize per-logo scale in mobile columns */
          transform:none !important;
        }

        .jci-trust{
          font-size:13.5px;
          font-weight:400;
          color:#9CA3AF;
          margin:48px auto 0;
          text-align:center;
          max-width:900px;
          padding:0 24px;
          line-height:1.7;
        }

        @media (max-width:1024px){
          .jci-title{ font-size:32px; }
          .jci-track{ gap:2px; }
          .jci-logoCard{ width:160px; height:90px; padding:8px 10px; }
          .jci-row{ height:90px; }
        }
        @media (max-width:768px){
          .jci-logoWall{ padding:56px 0 64px; }
          .jci-head{ margin:0 auto 32px; }
          .jci-title{ font-size:clamp(22px, 4.5vw, 28px); }
          .jci-subtitle{ font-size:12px; }
          .jci-rows{ display:none !important; }
          .jci-vcols{ display:flex !important; }
          .jci-trust{ display:none; }
          .jci-vcol-wrap{ height:300px; }
        }
      `}</style>

      <div className="jci-head">
        <h2 className="jci-title">הם כבר מגדילים את הנטו לעובדים שלהם</h2>
        <p className="jci-subtitle">מאות ארגונים · 250,000+ עובדים כבר בפנים</p>
      </div>

      {/* Desktop: horizontal marquee */}
      <div className="jci-rows">
        <HRow items={rowA} dir="left" duration={120} />
        <HRow items={rowB} dir="right" duration={140} />
      </div>

      {/* Mobile: 2 vertical marquee columns */}
      <div className="jci-vcols">
        <VCol items={colA} dir="up" duration={60} />
        <VCol items={colB} dir="down" duration={68} />
      </div>

      <p className="jci-trust">
        לאומי, מזרחי, בנק ישראל, בזן, צים ורשות המיסים
      </p>
    </section>
  );
}