import React from "react";
import { railLogos } from "@/utils/logoData";
import LogoItem from "@/components/employees/LogoItem";
import { logoCell } from "@/components/employees/layoutTokens";

// Hero (≤1024px) client marquee — built from the SAME shared LogoItem cells as the
// fixed rail, so a logo has the identical visual size in both rails. Two identical
// copies, fixed repeat width, constant speed: no jump at the loop point.
const DURATION_S = 128;

export default function InlineLogoRail() {
  const cell = logoCell(true);

  return (
    <div
      dir="ltr"
      style={{
        width: "100%",
        minWidth: 0,
        marginTop: 40,
        overflow: "hidden",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
      }}
    >
      <style>{`
        @keyframes ht-marq{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}
        .ht-marq-track{display:flex;align-items:center;width:max-content;will-change:transform;backface-visibility:hidden;animation:ht-marq ${DURATION_S}s linear infinite}
        .ht-marq-track:hover, .ht-marq-track:focus-within{animation-play-state:paused}
        @media (prefers-reduced-motion: reduce){.ht-marq-track{animation:none;overflow-x:auto}}
      `}</style>
      <div className="ht-marq-track">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1 || undefined}
            style={{ display: "flex", alignItems: "center", flex: "0 0 auto" }}
          >
            {railLogos.map((logo) => (
              <LogoItem
                key={`${copy}-${logo.name}`}
                logo={logo}
                cell={cell}
                alt={copy === 0 ? logo.name : ""}
                decorative={copy === 1}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}