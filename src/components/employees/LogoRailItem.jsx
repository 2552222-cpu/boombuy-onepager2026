import React, { useState } from 'react';
import NormalizedLogo from '@/components/employees/NormalizedLogo';
import { THEME } from '@/components/employees/designTokens';

export default function LogoRailItem({ src, name, alt, slotW, logoHeight, hovered, onHover }) {
  const [err, setErr] = useState(false);
  const isHot = hovered === name;
  return (
    <span onMouseEnter={() => onHover?.(name)} onMouseLeave={() => onHover?.(null)} style={{ flex: `0 0 ${slotW}px`, width: slotW, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {err ? (
        <span aria-label={name} style={{ color: THEME.charcoal, fontWeight: 600, fontSize: 14, opacity: 0.55, whiteSpace: 'nowrap', textAlign: 'center' }}>{name}</span>
      ) : (
        <NormalizedLogo
          src={src} alt={alt} height={logoHeight} maxWidth={slotW - 24}
          onError={(event) => {
            if (event.currentTarget.src !== src) { event.currentTarget.src = src; }
            else { setErr(true); }
          }}
          style={{ filter: isHot ? 'grayscale(0) contrast(1)' : 'grayscale(1) contrast(1.05)', opacity: isHot ? 1 : 0.72, transition: 'filter .25s ease, opacity .25s ease' }}
        />
      )}
    </span>
  );
}