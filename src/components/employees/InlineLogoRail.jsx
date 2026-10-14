import React from 'react';
import { railLogos } from '@/utils/logoData';
import NormalizedLogo from '@/components/employees/NormalizedLogo';

export default function InlineLogoRail() {
  const SLOT = 132;
  return (
    <div dir="ltr" style={{ width: '100%', minWidth: 0, marginTop: 40, overflow: 'hidden', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)', maskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)' }}>
      <style>{`
        @keyframes ht-marq{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}
        .ht-marq-track{display:flex;align-items:center;width:max-content;will-change:transform;backface-visibility:hidden;animation:ht-marq 128s linear infinite}
        .ht-marq-track:hover{animation-play-state:paused}
        @media (prefers-reduced-motion: reduce){.ht-marq-track{animation:none}}
      `}</style>
      <div className="ht-marq-track">
        {[...railLogos, ...railLogos].map((logo, index) => (
          <span key={index} aria-hidden={index >= railLogos.length ? true : undefined} style={{ flex: `0 0 ${SLOT}px`, width: SLOT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <NormalizedLogo src={logo.url} alt={index < railLogos.length ? logo.name : ''} height={38} maxWidth={116} loading={index < railLogos.length ? 'eager' : 'lazy'} style={{ filter: 'grayscale(1) opacity(0.7)' }} />
          </span>
        ))}
      </div>
    </div>
  );
}