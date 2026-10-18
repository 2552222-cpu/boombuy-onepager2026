import React, { useState } from "react";
import NormalizedLogo from "@/components/employees/NormalizedLogo";
import { THEME } from "@/components/employees/designTokens";

// ONE shared cell for every client logo — used by the fixed rail, by that rail's
// animation copy and by the inline hero rail. Same geometry everywhere, so the
// duplicated copy is pixel-identical to the first one and the loop seam is invisible.
//
// The cell is a fixed box; the logo sits inside a smaller symbol box and keeps its
// own aspect ratio (fit by width OR height, whichever binds). It is never stretched,
// never cropped and never allowed to overflow its cell. `logo.opticalScale`
// (default 1) is the explicit per-logo optical correction, applied on top.
export default function LogoItem({
  logo,
  cell,
  alt,
  decorative = false,
  interactive = false,
  loading = "lazy",
  hovered,
  onHover,
}) {
  const [failed, setFailed] = useState(false);
  const isHot = interactive && hovered === logo.name;
  const optical = logo.opticalScale ?? 1;

  return (
    <span
      onMouseEnter={interactive ? () => onHover?.(logo.name) : undefined}
      onMouseLeave={interactive ? () => onHover?.(null) : undefined}
      aria-hidden={decorative || undefined}
      style={{
        flex: `0 0 ${cell.w + cell.gap}px`,
        width: cell.w + cell.gap,
        height: cell.h,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          width: cell.w,
          height: cell.h,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {failed ? (
          <span
            style={{
              color: THEME.charcoal,
              fontWeight: 600,
              fontSize: 13,
              opacity: 0.55,
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            {logo.name}
          </span>
        ) : (
          <NormalizedLogo
            src={logo.url}
            alt={alt}
            height={Math.round(cell.symbolH * optical)}
            maxWidth={Math.round(cell.symbolW * optical)}
            loading={loading}
            onError={(event) => {
              if (event.currentTarget.src !== logo.url) event.currentTarget.src = logo.url;
              else setFailed(true);
            }}
            style={{
              filter: isHot ? "grayscale(0) contrast(1)" : "grayscale(1) contrast(1.05)",
              opacity: isHot ? 1 : 0.72,
              transition: "filter .25s ease, opacity .25s ease",
            }}
          />
        )}
      </span>
    </span>
  );
}