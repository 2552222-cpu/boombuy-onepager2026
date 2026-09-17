import React, { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { railLogos } from "../../utils/logoData";
import { THEME } from "./designTokens";

const RAIL_HEIGHT_DESKTOP = 64;
const RAIL_HEIGHT_MOBILE = 52;
const LOGO_H_DESKTOP = 32; // 28–34
const LOGO_H_MOBILE = 26; // 22–28
const SPEED_PX_PER_SEC = 20;

// Single logo with graceful text fallback (keeps every org readable if a file breaks).
function RailLogo({ src, name, alt, style }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <span
        aria-label={name}
        style={{
          ...style,
          height: style.height,
          display: "inline-flex",
          alignItems: "center",
          color: THEME.charcoal,
          fontWeight: 600,
          fontSize: 14,
          opacity: 0.5,
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      style={style}
      onError={() => setErr(true)}
    />
  );
}

export default function LogoRail() {
  const trackRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dur, setDur] = useState(60);

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 768);
    c();
    window.addEventListener("resize", c);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMq = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", onMq);
    return () => {
      window.removeEventListener("resize", c);
      mq.removeEventListener?.("change", onMq);
    };
  }, []);

  // Measure track to drive a ~20px/sec linear speed (no accel, no jump at the loop join).
  useEffect(() => {
    if (reducedMotion) return;
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      const w = el.scrollWidth; // 2x one set
      const single = w > 0 ? w / 2 : 0;
      if (single > 0) setDur(Math.max(single / SPEED_PX_PER_SEC, 12));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    const t = setTimeout(measure, 700); // re-measure after logos load
    return () => {
      ro.disconnect();
      clearTimeout(t);
    };
  }, [reducedMotion, isMobile]);

  // Visibility: appear only after the hero leaves view; hide on hero return,
  // during the fit questionnaire / details form / calendar, and when a benefit modal is open.
  useEffect(() => {
    let hero = false;
    let fitBook = false;
    let modal = false;
    const recompute = () => setVisible(!hero && !fitBook && !modal);
    const observers = [];
    const heroEl = document.getElementById("hero-transformation");
    if (heroEl) {
      const io = new IntersectionObserver(
        ([entry]) => {
          hero = entry.isIntersecting && entry.intersectionRatio > 0.03;
          recompute();
        },
        { threshold: [0, 0.03, 0.2] }
      );
      io.observe(heroEl);
      observers.push(io);
    }
    ["organization-fit", "book-demo"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          fitBook = entry.isIntersecting && entry.intersectionRatio > 0.08;
          recompute();
        },
        { threshold: [0, 0.08, 0.2] }
      );
      io.observe(el);
      observers.push(io);
    });
    const onModal = (e) => {
      modal = Boolean(e.detail && e.detail.open);
      recompute();
    };
    window.addEventListener("offersModalChange", onModal);
    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("offersModalChange", onModal);
    };
  }, []);

  if (!visible) return null;

  const railH = isMobile ? RAIL_HEIGHT_MOBILE : RAIL_HEIGHT_DESKTOP;
  const logoH = isMobile ? LOGO_H_MOBILE : LOGO_H_DESKTOP;
  const logoMargin = isMobile ? "0 28px" : "0 44px";
  const logoStyle = {
    height: logoH,
    width: "auto",
    margin: logoMargin,
    display: "block",
    flex: "0 0 auto",
  };

  // Reduced motion: a static, manually scrollable row (no animation, no pause button).
  if (reducedMotion) {
    return (
      <div
        role="region"
        aria-label="לקוחות בום ביי"
        dir="rtl"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 80,
          background: THEME.bg,
          borderTop: "1px solid rgba(23,25,29,0.07)",
        }}
      >
        <div
          style={{
            height: railH,
            paddingBottom: "env(safe-area-inset-bottom)",
            display: "flex",
            alignItems: "center",
            overflowX: "auto",
            overflowY: "hidden",
            scrollbarWidth: "thin",
            padding: "0 16px",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
            maskImage:
              "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
          }}
        >
          {railLogos.map((l) => (
            <RailLogo key={l.name} src={l.url} name={l.name} alt={l.name} style={logoStyle} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`lr-rail${paused ? " lr-paused" : ""}`}
      role="region"
      aria-label="לקוחות בום ביי"
      dir="rtl"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 80,
        background: THEME.bg,
        borderTop: "1px solid rgba(23,25,29,0.07)",
        fontFamily: THEME.fontFamily,
      }}
    >
      <style>{`
        .lr-rail .lr-viewport{ position:relative; height:${railH}px; overflow:hidden; padding-bottom:env(safe-area-inset-bottom); }
        .lr-rail .lr-track{ position:absolute; top:0; bottom:0; left:0; display:flex; align-items:center; width:max-content; animation:lrMarquee ${dur}s linear infinite; will-change:transform; }
        .lr-rail:hover .lr-track, .lr-rail:focus-within .lr-track, .lr-rail.lr-paused .lr-track{ animation-play-state:paused; }
        @keyframes lrMarquee{ from{ transform:translateX(0); } to{ transform:translateX(-50%); } }
        .lr-rail .lr-edge{ position:absolute; top:0; bottom:0; width:72px; z-index:2; pointer-events:none; }
        .lr-rail .lr-edge-l{ left:0; background:linear-gradient(to right, ${THEME.bg}, rgba(251,250,248,0)); }
        .lr-rail .lr-edge-r{ right:0; background:linear-gradient(to left, ${THEME.bg}, rgba(251,250,248,0)); }
        .lr-pause{ position:absolute; top:50%; left:8px; transform:translateY(-50%); z-index:3; width:30px; height:30px; border-radius:999px; border:1px solid rgba(23,25,29,0.12); background:${THEME.bg}; color:${THEME.charcoal}; display:flex; align-items:center; justify-content:center; cursor:pointer; }
        .lr-pause:focus-visible{ outline:3px solid rgba(244,122,90,0.6); outline-offset:2px; }
      `}</style>

      <div className="lr-viewport">
        <div className="lr-track" ref={trackRef}>
          <div style={{ display: "flex", alignItems: "center", flex: "0 0 auto" }}>
            {railLogos.map((l) => (
              <RailLogo key={`a-${l.name}`} src={l.url} name={l.name} alt={l.name} style={logoStyle} />
            ))}
          </div>
          <div aria-hidden="true" style={{ display: "flex", alignItems: "center", flex: "0 0 auto" }}>
            {railLogos.map((l) => (
              <RailLogo key={`b-${l.name}`} src={l.url} name={l.name} alt="" style={logoStyle} />
            ))}
          </div>
        </div>
        <div className="lr-edge lr-edge-l" />
        <div className="lr-edge lr-edge-r" />
        <button
          className="lr-pause"
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? "המשך תנועת לוגואים" : "עצור תנועת לוגואים"}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      </div>
    </div>
  );
}