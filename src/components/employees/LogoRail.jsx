import React, { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { railLogos } from "../../utils/logoData";
import { THEME } from "./designTokens";
import { useBottomUIVisibility } from "./useBottomUIVisibility";

const RAIL_HEIGHT_DESKTOP = 64;
const RAIL_HEIGHT_MOBILE = 52;
const LOGO_H_DESKTOP = 32;
const LOGO_H_MOBILE = 26;
const LOGO_MARGIN_DESKTOP = "0 44px";
const LOGO_MARGIN_MOBILE = "0 28px";
const SPEED_PX_PER_SEC = 20;

function RailLogo({ src, name, alt, style }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <span
        aria-label={name}
        style={{
          ...style,
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
  return <img src={src} alt={alt} loading="lazy" decoding="async" style={style} onError={() => setErr(true)} />;
}

export default function LogoRail() {
  const trackRef = useRef(null);
  const railRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isWide, setIsWide] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);
  const [dur, setDur] = useState(60);
  const { hidden } = useBottomUIVisibility();
  const firedView = useRef(false);

  useEffect(() => {
    const c = () => {
      setIsMobile(window.innerWidth < 768);
      setIsWide(window.innerWidth >= 1024);
    };
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

  // Measure the track AFTER it is mounted, after logos load, and on resize.
  // Only update the speed when the value actually changes (no jump during playback).
  useEffect(() => {
    if (reducedMotion) return;
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      const w = el.scrollWidth; // duplicated set → divide by 2
      const single = w > 0 ? w / 2 : 0;
      if (single <= 0) return;
      const next = Math.max(single / SPEED_PX_PER_SEC, 12);
      setDur((prev) => (Math.abs(prev - next) > prev * 0.05 + 0.5 ? next : prev));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    // re-measure after the lazy logos finish loading
    const imgs = trackRef.current ? trackRef.current.querySelectorAll("img") : [];
    const loadHandlers = [];
    imgs.forEach((img) => {
      const h = () => measure();
      img.addEventListener("load", h);
      loadHandlers.push([img, h]);
    });
    return () => {
      ro.disconnect();
      loadHandlers.forEach(([img, h]) => img.removeEventListener("load", h));
    };
  }, [reducedMotion, isMobile]);

  // logos_viewed: fire once when the rail is actually shown to the user
  useEffect(() => {
    if (!hidden && !firedView.current) {
      firedView.current = true;
      try {
        base44.analytics?.track?.({ eventName: "logos_viewed" });
      } catch (e) {
        /* ignore */
      }
    }
  }, [hidden]);

  const railH = isMobile ? RAIL_HEIGHT_MOBILE : RAIL_HEIGHT_DESKTOP;
  const logoH = isMobile ? LOGO_H_MOBILE : LOGO_H_DESKTOP;
  const logoMargin = isMobile ? LOGO_MARGIN_MOBILE : LOGO_MARGIN_DESKTOP;
  const logoStyle = { height: logoH, width: "auto", margin: logoMargin, display: "block", flex: "0 0 auto" };

  const wrapStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 80,
    background: THEME.bg,
    borderTop: "1px solid rgba(23,25,29,0.07)",
    fontFamily: THEME.fontFamily,
    transition: "opacity .35s ease, transform .35s ease",
    opacity: hidden ? 0 : 1,
    transform: hidden ? "translateY(100%)" : "translateY(0)",
    pointerEvents: hidden ? "none" : "auto",
  };

  // Reduced motion: a static, manually scrollable row.
  if (reducedMotion) {
    return (
      <div ref={railRef} role="region" aria-label="לקוחות בום ביי" dir="rtl" style={wrapStyle}>
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
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
            maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
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
    <div ref={railRef} className={`lr-rail${paused ? " lr-paused" : ""}`} role="region" aria-label="לקוחות בום ביי" dir="rtl" style={wrapStyle}>
      <style>{`
        .lr-rail .lr-viewport{ position:relative; height:${railH}px; overflow:hidden; padding-bottom:env(safe-area-inset-bottom); }
        .lr-rail .lr-track{ position:absolute; top:0; bottom:0; left:0; display:flex; align-items:center; width:max-content; animation:lrMarquee ${dur}s linear infinite; will-change:transform; }
        .lr-rail:hover .lr-track, .lr-rail:focus-within .lr-track, .lr-rail.lr-paused .lr-track{ animation-play-state:paused; }
        @keyframes lrMarquee{ from{ transform:translateX(0); } to{ transform:translateX(-50%); } }
        .lr-rail .lr-edge{ position:absolute; top:0; bottom:0; width:72px; z-index:2; pointer-events:none; }
        .lr-rail .lr-edge-r{ right:0; background:linear-gradient(to left, ${THEME.bg}, rgba(251,250,248,0)); }
        .lr-rail .lr-edge-l{ left:0; background:linear-gradient(to right, ${THEME.bg}, rgba(251,250,248,0)); }
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

        {/* Optional small label — desktop-wide only, so it never crowds mobile logos */}
        {isWide && !hidden && (
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              width: 92,
              zIndex: 3,
              background: THEME.bg,
              borderLeft: "1px solid rgba(23,25,29,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 600, color: THEME.charcoal, opacity: 0.7, letterSpacing: "-0.01em" }}>
              בין לקוחותינו
            </span>
          </div>
        )}

        <div className="lr-edge lr-edge-r" />
        <div className="lr-edge lr-edge-l" />
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