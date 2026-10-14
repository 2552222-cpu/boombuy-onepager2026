import React from 'react';
import { Play } from 'lucide-react';
import { BEFORE_IMG, AFTER_IMG, VIDEO_SRC } from '@/components/employees/hero/heroShared';
import useMobileHeroPlayback from '@/components/employees/hero/useMobileHeroPlayback';
import { photo } from '@/lib/img';

export default function MobileHeroMedia({ reducedMotion, buttonStyle }) {
  const { videoRef, phase, start, onPlaying, onEnded, onError } = useMobileHeroPlayback(reducedMotion);
  const showBefore = ['idle', 'loading', 'failed'].includes(phase);
  const imageStyle = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 50%' };
  const fade = reducedMotion ? 'none' : 'opacity 300ms ease';
  return (
    <>
      {/* The video sits behind the opening image; the BEFORE layer fades out once
          playing, and the AFTER layer takes over on end (no flicker, no timer). */}
      <video ref={videoRef} src={VIDEO_SRC} muted playsInline preload={phase === 'idle' ? 'metadata' : 'auto'}
        onPlaying={onPlaying} onEnded={onEnded} onError={onError}
        aria-label="סרטון השדרוג, עשר שניות ללא קול"
        style={{ ...imageStyle, zIndex: 2 }}>
        <track kind="captions" srcLang="he" label="עברית" src="/hero-captions.vtt" />
      </video>
      <img src={photo(BEFORE_IMG, 800, 450, 72)} alt="מנהלת רווחה בעומס" width={1600} height={900}
        fetchPriority="high" loading="eager" decoding="async"
        onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = BEFORE_IMG; }}
        style={{ ...imageStyle, zIndex: 3, opacity: showBefore ? 1 : 0, transition: fade }} />
      <img src={photo(AFTER_IMG, 960, 540)} alt="מנהלת רווחה רגועה עם קפה" width={1600} height={900} loading="lazy" decoding="async"
        onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = AFTER_IMG; }}
        style={{ ...imageStyle, zIndex: 4, opacity: phase === 'complete' ? 1 : 0, transition: fade }} />
      {/* Accessible play control appears only as a fallback when autoplay is blocked. */}
      {phase === 'failed' && (
        <button type="button" onClick={() => start(false)} style={buttonStyle} aria-label="להפעיל את הסרטון">
          <Play size={14} color={buttonStyle.color} strokeWidth={2.5} />להפעיל
        </button>
      )}
    </>
  );
}