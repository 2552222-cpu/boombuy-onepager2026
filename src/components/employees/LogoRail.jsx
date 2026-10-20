import React, { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { railLogos } from "../../utils/logoData";
import { THEME } from "./designTokens";
import { LAYOUT, railHeight, logoCell, logoSlot } from "./layoutTokens";
import { useBottomUIVisibility } from "./useBottomUIVisibility";
import LogoItem from "@/components/employees/LogoItem";

export default function LogoRail() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const [isWide, setIsWide] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [paused, setPaused] = useState(false);
  const [docHidden, setDocHidden] = useState(false);
  const [hovered, setHovered] = useState(null);
  const { hidden } = useBottomUIVisibility();
  const firedView = useRef(false);

  const railH = railHeight(isMobile);
  const cell = logoCell(isMobile);
  const slot = logoSlot(isMobile);
  // Constant px/sec. Both copies use the identical cell, so the repeat width is
  // exact and the animation never jumps at the loop point.
  const dur = (railLogos.length * slot) / LAYOUT.RAIL_SPEED_PX_PER_SEC;

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

  const logoProps = (logo, decorative) => ({
    logo,
    cell,
    alt: decorative ? "" : logo.name,
    decorative,
    interactive: true,
    hovered,
    onHover: setHovered,
  });

  if (reducedMotion) {
    return (
      <div role="region" aria-label="לקוחות boombuy" dir="rtl" aria-hidden={hidden} style={wrapStyle}>
        <div style={{ flex: 1, minWidth: 0, minHeight: 0, display: "flex", alignItems: "center", overflowX: "auto", overflowY: "hidden", touchAction: "pan-x", scrollbarWidth: "thin", padding: "0 12px", paddingBottom: "env(safe-area-inset-bottom)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)", maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)" }}>
          {railLogos.map((logo) => (
            <LogoItem key={logo.name} {...logoProps(logo, false)} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`lr-rail${running ? "" : " lr-stopped"}`} role="region" aria-label="לקוחות boombuy" dir="rtl" aria-hidden={hidden} style={wrapStyle}>
      <style>{`
        .lr-rail .lr-label{ flex:0 0 auto; display:flex; align-items:center; justify-content:center; width:120px; background:${THEME.bg}; border-left:1px solid rgba(23,25,29,0.06); }
        .lr-rail .lr-label span{ font-size:13px; font-weight:700; color:${THEME.charcoal}; line-height:1.25; text-align:center; opacity:0.82; letter-spacing:-0.01em; }
        .lr-rail .lr-viewport{ position:relative; flex:1; min-width:0; overflow:hidden; }
        .lr-rail .lr-track{ position:absolute; top:0; bottom:0; left:0; display:flex; align-items:center; direction:ltr; width:max-content; animation:lrMarquee ${dur}s linear infinite; will-change:transform; }
        .lr-rail.lr-stopped .lr-track{ animation-play-state:paused; }
        .lr-rail:hover .lr-track, .lr-rail:focus-within .lr-track{ animation-play-state:paused; }
        @keyframes lrMarquee{ from{ transform:translate3d(0,0,0); } to{ transform:translate3d(-50%,0,0); } }
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
        <div className="lr-track">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1 || undefined}
              style={{ display: "flex", alignItems: "center", flex: "0 0 auto" }}
            >
              {railLogos.map((logo) => (
                <LogoItem key={`${copy}-${logo.name}`} {...logoProps(logo, copy === 1)} />
              ))}
            </div>
          ))}
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