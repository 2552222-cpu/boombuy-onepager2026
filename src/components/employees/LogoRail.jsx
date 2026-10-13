import React, { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { railLogos } from "../../utils/logoData";
import { THEME } from "./designTokens";
import { LAYOUT } from "./layoutTokens";
import { useBottomUIVisibility } from "./useBottomUIVisibility";
import { fitImg } from "@/lib/img";

function SlotLogo({ src, name, alt, slotW, area, minH, maxH, scale = 1, hovered, onHover }) {
  const [err, setErr] = useState(false);
  const [h, setH] = useState(null);
  const slotStyle = {
    flex: `0 0 ${slotW}px`,
    width: slotW,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  if (err) {
    return (
      <span style={slotStyle}>
        <span
          aria-label={name}
          style={{
            color: THEME.charcoal,
            fontWeight: 600,
            fontSize: 14,
            opacity: 0.55,
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
        >
          {name}
        </span>
      </span>
    );
  }
  const isHot = hovered === name;
  const imgH = h != null ? h : maxH;
  return (
    <span
      style={slotStyle}
      onMouseEnter={() => onHover?.(name)}
      onMouseLeave={() => onHover?.(null)}
    >
      <img
        src={fitImg(src, 400, 160)}
        alt={alt}
        loading="lazy"
        decoding="async"
        width={400}
        height={160}
        onError={(e) => {
          if (e.currentTarget.src !== src) { e.currentTarget.onerror = null; e.currentTarget.src = src; }
          else { setErr(true); }
        }}
        onLoad={(e) => {
          const nw = e.currentTarget.naturalWidth || 1;
          const nh = e.currentTarget.naturalHeight || 1;
          const ratio = nw / nh;
          let calc = Math.sqrt(area / ratio);
          calc = Math.max(minH, Math.min(maxH, calc)) * scale;
          setH(Math.round(calc));
        }}
        style={{
          height: imgH,
          maxWidth: `calc(${slotW}px - 24px)`,
          width: "auto",
          objectFit: "contain",
          display: "block",
          filter: isHot ? "grayscale(0) contrast(1)" : "grayscale(1) contrast(1.05)",
          opacity: isHot ? 1 : 0.72,
          transition: "filter .25s ease, opacity .25s ease",
        }}
      />
    </span>
  );
}

export default function LogoRail() {
  const trackRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isWide, setIsWide] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);
  const [docHidden, setDocHidden] = useState(false);
  const [dur, setDur] = useState(60);
  const [hovered, setHovered] = useState(null);
  const { hidden } = useBottomUIVisibility();
  const firedView = useRef(false);

  const railH = isMobile ? LAYOUT.RAIL_HEIGHT_MOBILE : LAYOUT.RAIL_HEIGHT_DESKTOP;
  const slotW = isMobile ? LAYOUT.LOGO_SLOT_MOBILE : LAYOUT.LOGO_SLOT_DESKTOP;
  const area = isMobile ? 4200 : 7200;
  const minH = isMobile ? 24 : 30;
  const maxH = isMobile ? 50 : 64;

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
    const onVis = () => setDocHidden(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("resize", c);
      mq.removeEventListener?.("change", onMq);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      const w = el.scrollWidth;
      const single = w > 0 ? w / 2 : 0;
      if (single <= 0) return;
      const next = Math.max(single / LAYOUT.RAIL_SPEED_PX_PER_SEC, 12);
      setDur((prev) => (Math.abs(prev - next) > prev * 0.05 + 0.5 ? next : prev));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [reducedMotion, isMobile]);

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

  const running = !hidden && !docHidden && !paused && !reducedMotion;

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
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    height: railH,
  };

  const logoProps = (l) => ({ src: l.url, name: l.name, alt: l.name, slotW, area, minH, maxH, scale: l.scale || 1, hovered, onHover: setHovered });

  if (reducedMotion) {
    return (
      <div role="region" aria-label="לקוחות בום ביי" dir="rtl" aria-hidden={hidden} style={wrapStyle}>
        <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", overflowX: "auto", overflowY: "hidden", scrollbarWidth: "thin", padding: "0 12px", paddingBottom: "env(safe-area-inset-bottom)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)", maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)" }}>
          {railLogos.map((l) => (
            <SlotLogo key={l.name} {...logoProps(l)} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`lr-rail${running ? "" : " lr-stopped"}`} role="region" aria-label="לקוחות בום ביי" dir="rtl" aria-hidden={hidden} style={wrapStyle}>
      <style>{`
        .lr-rail .lr-label{ flex:0 0 auto; display:flex; align-items:center; justify-content:center; width:120px; background:${THEME.bg}; border-left:1px solid rgba(23,25,29,0.06); }
        .lr-rail .lr-label span{ font-size:13px; font-weight:700; color:${THEME.charcoal}; line-height:1.25; text-align:center; opacity:0.82; letter-spacing:-0.01em; }
        .lr-rail .lr-viewport{ position:relative; flex:1; min-width:0; overflow:hidden; }
        .lr-rail .lr-track{ position:absolute; top:0; bottom:0; left:0; display:flex; align-items:center; width:max-content; animation:lrMarquee ${dur}s linear infinite; will-change:transform; }
        .lr-rail.lr-stopped .lr-track{ animation-play-state:paused; }
        .lr-rail:hover .lr-track, .lr-rail:focus-within .lr-track{ animation-play-state:paused; }
        @keyframes lrMarquee{ from{ transform:translateX(0); } to{ transform:translateX(-50%); } }
        .lr-rail .lr-edge{ position:absolute; top:0; bottom:0; width:60px; z-index:2; pointer-events:none; }
        .lr-rail .lr-edge-r{ right:0; background:linear-gradient(to left, ${THEME.bg}, rgba(251,250,248,0)); }
        .lr-rail .lr-edge-l{ left:0; background:linear-gradient(to right, ${THEME.bg}, rgba(251,250,248,0)); }
        .lr-pause{ position:absolute; top:50%; left:8px; transform:translateY(-50%); z-index:3; width:44px; height:44px; border-radius:999px; border:1px solid rgba(23,25,29,0.12); background:${THEME.bg}; color:${THEME.charcoal}; display:flex; align-items:center; justify-content:center; cursor:pointer; }
        .lr-pause:focus-visible{ outline:3px solid rgba(244,122,90,0.6); outline-offset:2px; }
      `}</style>

      {isWide && (
        <div className="lr-label">
          <span>כבר<br />ממקסמים<br />איתנו</span>
        </div>
      )}

      <div className="lr-viewport">
        <div className="lr-track" ref={trackRef}>
          <div style={{ display: "flex", alignItems: "center", flex: "0 0 auto" }}>
            {railLogos.map((l) => (
              <SlotLogo key={`a-${l.name}`} {...logoProps(l)} />
            ))}
          </div>
          <div aria-hidden="true" style={{ display: "flex", alignItems: "center", flex: "0 0 auto" }}>
            {railLogos.map((l) => (
              <SlotLogo key={`b-${l.name}`} {...logoProps(l)} alt="" />
            ))}
          </div>
        </div>

        <div className="lr-edge lr-edge-r" />
        <div className="lr-edge lr-edge-l" />
        <button className="lr-pause" type="button" onClick={() => setPaused((p) => !p)} aria-pressed={paused} aria-label={paused ? "המשך תנועת לוגואים" : "עצור תנועת לוגואים"} tabIndex={hidden ? -1 : 0}>
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </button>
      </div>
    </div>
  );
}