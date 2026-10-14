import React from 'react';
import { fitImg } from '@/lib/img';
import { LOGO_BOUNDS } from '@/components/employees/logoBounds';

export default function NormalizedLogo({ src, alt, height = 38, maxWidth = 150, loading = 'lazy', style, onError }) {
  const bounds = LOGO_BOUNDS[src.split('/').pop()];
  const fallback = (event) => {
    if (onError) return onError(event);
    event.currentTarget.onerror = null;
    event.currentTarget.src = src;
  };
  if (!bounds) return <img src={src} alt={alt} loading={loading} onError={fallback} style={{ height, maxWidth, width: 'auto', objectFit: 'contain', ...style }} />;
  const [w, h, x, y, visibleW, visibleH] = bounds;
  const scale = Math.min(height / visibleH, maxWidth / visibleW);
  return (
    <span style={{ position: 'relative', display: 'inline-block', overflow: 'hidden', flexShrink: 0, width: visibleW * scale, height: visibleH * scale }}>
      <img
        src={fitImg(src, 640, 640)}
        alt={alt}
        width={w}
        height={h}
        loading={loading}
        decoding="async"
        onError={fallback}
        style={{ position: 'absolute', display: 'block', maxWidth: 'none', width: w * scale, height: h * scale, left: -x * scale, top: -y * scale, ...style }}
      />
    </span>
  );
}