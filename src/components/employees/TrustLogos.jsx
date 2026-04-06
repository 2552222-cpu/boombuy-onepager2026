import React from "react";
import { rowA, rowB } from "../../utils/logoData";

function Row({ items, dir = "left", duration = 85 }) {
  const trackClass = dir === "left" ? "jci-track jci-left" : "jci-track jci-right";
  return (
    <div className="jci-row">
      <div className={trackClass} style={{ ["--jci-dur"]: `${duration}s` }}>
        {[...items, ...items].map((src, i) => (
          <div key={`${src}-${i}`} className="jci-logoCard">
            <img src={src} alt="לוגו לקוח" loading="lazy" decoding="async" width="200" height="100" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrustLogos() {
  return (
    <section id="logo-wall-section" className="jci-logoWall">
      <style>{`
        /* Font loaded globally via index.html */

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

        .jci-rows{
          display:flex;
          flex-direction:column;
          gap:20px;
          padding:0;
          overflow:hidden;
          position:relative;
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
          gap:0px;
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
          .jci-track{
            animation-play-state:running !important;
          }
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
        }

        .jci-logoCard img{
          display:block;
          width:100%;
          height:100%;
          object-fit:contain;
          object-position:center;
          padding:10px 14px;
          box-sizing:border-box;
          transition:transform .25s ease;
        }
        .jci-logoCard:hover img{
          transform:scale(1.04);
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
          .jci-rows{ gap:2px; }
          .jci-track{ gap:1px; }
          .jci-logoCard{ width:120px; height:80px; padding:0; }
          .jci-trust{ font-size:11px; margin-top:24px; padding:0 16px; }
          .jci-row{ height:72px; }
        }
      `}</style>

      <div className="jci-head">
        <h2 className="jci-title">הם כבר מגדילים את הנטו לעובדים שלהם</h2>
        <p className="jci-subtitle">מאות ארגונים · 250,000+ עובדים כבר בפנים</p>
      </div>

      <div className="jci-rows">
        <Row items={rowA} dir="left" duration={60} />
        <Row items={rowB} dir="right" duration={65} />
      </div>

      <p className="jci-trust">
        מקס, בנק לאומי, בנק מזרחי, בנק ישראל, בנק דיסקונט, קבוצת בזן, צים ורשות המיסים - מיוצגים ע"י התאגדות / ועד עובדים
      </p>
    </section>
  );
}