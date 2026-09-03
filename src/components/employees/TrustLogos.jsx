import React, { useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { rowA, rowB } from "../../utils/logoData";

const CHARCOAL = "#17191D";
const CORAL = "#F47A5A";
const BG = "#F7F7F4";

// Horizontal marquee rail. dir="left" => content slides right-to-left (top rail).
// dir="right" => content slides left-to-right (bottom rail).
// Seamless loop: each logo carries its own horizontal margin (no flex gap), so the
// track is exactly 2x one set and translateX(-50%) aligns the duplicated set perfectly.
function Rail({ items, dir = "left", duration = 90 }) {
  const trackClass = dir === "left" ? "tl-track tl-left" : "tl-track tl-right";
  return (
    <div className="tl-row" data-dir={dir}>
      <div className={trackClass} style={{ ["--tl-dur"]: `${duration}s` }}>
        {[...items, ...items].map((src, i) => (
          <img
            key={`${src}-${i}`}
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            className="tl-logo"
          />
        ))}
      </div>
    </div>
  );
}

export default function TrustLogos() {
  const sectionRef = useRef(null);
  const firedRef = useRef(false);

  const scrollToEmployee = () =>
    document
      .getElementById("ee-title")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            try {
              base44.analytics.track({ eventName: "trust_logos_view" });
            } catch (err) {
              /* analytics must never break the UI */
            }
            io.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="trust-logos-section" className="tl-wall" dir="rtl">
      <style>{`
        .tl-wall{
          width:100%;
          background:${BG};
          padding:36px 32px 28px;
          box-sizing:border-box;
          font-family:'Heebo','Assistant',sans-serif;
          scroll-margin-top:90px;
        }
        .tl-continue{
          display:inline-flex;
          align-items:center;
          gap:10px;
          background:${CHARCOAL};
          color:#fff;
          border:none;
          cursor:pointer;
          border-radius:999px;
          padding:14px 24px;
          font-family:'Heebo','Assistant',sans-serif;
          font-weight:600;
          font-size:16px;
          box-shadow:0 6px 18px rgba(20,22,26,0.12);
          transition:transform .18s ease, box-shadow .18s ease;
        }
        .tl-continue:hover{ transform:translateY(-2px); box-shadow:0 10px 24px rgba(20,22,26,0.18); }
        .tl-continue:focus-visible{ outline:3px solid rgba(244,122,90,0.55); outline-offset:3px; }
        .tl-head{
          max-width:900px;
          margin:0 auto 24px;
          text-align:center;
          padding:0 8px;
        }
        .tl-title{
          font-size:clamp(26px, 3.2vw, 36px);
          font-weight:700;
          color:${CHARCOAL};
          letter-spacing:-0.02em;
          line-height:1.25;
          margin:0;
        }
        .tl-accent{ color:${CORAL}; }

        .tl-rows{
          display:flex;
          flex-direction:column;
          gap:20px;
          box-shadow:0 18px 60px rgba(20,22,26,0.055);
        }
        .tl-row{
          position:relative;
          width:100%;
          overflow:hidden;
          height:52px;
        }
        .tl-row::before, .tl-row::after{
          content:'';
          position:absolute;
          top:0; bottom:0;
          width:120px;
          z-index:2;
          pointer-events:none;
        }
        .tl-row::before{
          right:0;
          background:linear-gradient(to right, ${BG} 0%, rgba(247,247,244,0) 100%);
        }
        .tl-row::after{
          left:0;
          background:linear-gradient(to left, ${BG} 0%, rgba(247,247,244,0) 100%);
        }
        .tl-track{
          position:absolute;
          left:0;
          top:0;
          height:100%;
          display:flex;
          align-items:center;
          width:max-content;
          animation-timing-function:linear;
          animation-iteration-count:infinite;
          animation-duration:var(--tl-dur);
          will-change:transform;
        }
        .tl-left{ animation-name:tlSlideLeft; }
        .tl-right{ animation-name:tlSlideRight; }
        @keyframes tlSlideLeft{
          from{ transform:translateX(0); }
          to{ transform:translateX(-50%); }
        }
        @keyframes tlSlideRight{
          from{ transform:translateX(-50%); }
          to{ transform:translateX(0); }
        }
        .tl-logo{
          height:45px;
          width:auto;
          margin:0 32px;
          display:block;
          flex:0 0 auto;
        }
        @media (hover:hover) and (pointer:fine){
          .tl-row:hover .tl-track{ animation-play-state:paused; }
        }

        @media (max-width:768px){
          .tl-wall{ padding:28px 20px 24px; scroll-margin-top:72px; }
          .tl-head{ margin:0 auto 18px; }
          .tl-title{ font-size:clamp(22px, 5vw, 26px); line-height:1.3; }
          .tl-rows{ gap:18px; }
          .tl-row{ height:42px; }
          .tl-logo{ height:36px; margin:0 20px; }
          .tl-row::before, .tl-row::after{ width:64px; }
        }
      `}</style>

      <div className="tl-head">
        <h2 className="tl-title">
          כבר הופכים תקציב רווחה
          <br />
          <span className="tl-accent">לחוויית עובד יומיומית</span>
          <br />
          <span className="tl-accent">במאות מהארגונים המובילים בישראל</span>
        </h2>
      </div>

      <div className="tl-rows">
        <Rail items={rowA} dir="left" duration={90} />
        <Rail items={rowB} dir="right" duration={105} />
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 22, marginBottom: 20 }}>
        <button type="button" className="tl-continue" onClick={scrollToEmployee}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: CORAL,
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          לראות מה העובדים מרגישים
        </button>
      </div>
    </section>
  );
}