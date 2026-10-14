import React from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { BEFORE_IMG, AFTER_IMG, VIDEO_SRC } from '@/components/employees/hero/heroShared';
import useMobileHeroPlayback from '@/components/employees/hero/useMobileHeroPlayback';
import { photo } from '@/lib/img';

export default function MobileHeroMedia({ reducedMotion, buttonStyle }) {
  const { videoRef, phase, start, onPlaying, onEnded, onError } = useMobileHeroPlayback(reducedMotion);
  const beforeVisible = ['idle', 'loading', 'failed'].includes(phase);
  const imageStyle = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 50%' };
  const fade = reducedMotion ? 'none' : 'opacity 250ms ease';
  const label = { idle: 'לראות · 10 שנ׳', loading: 'טוען את הסרטון…', complete: 'לצפייה חוזרת', failed: 'לנסות שוב' }[phase];
  const Icon = phase === 'complete' || phase === 'failed' ? RotateCcw : Play;
  return (
    <>
      {/* Keep the video paintable; the opening image covers it until playing. */}
      <video ref={videoRef} src={VIDEO_SRC} muted playsInline preload={phase === 'idle' ? 'none' : 'auto'}
        onPlaying={onPlaying} onEnded={onEnded} onError={onError}
        aria-label="סרטון השדרוג, עשר שניות ללא קול"
        style={{ ...imageStyle, zIndex: 2 }}>
        <track kind="captions" srcLang="he" label="עברית" src="/hero-captions.vtt" />
      </video>
      <img src={photo(BEFORE_IMG, 800, 450, 72)} alt="מנהלת רווחה בעומס" width={1600} height={900}
        fetchPriority="high" loading="eager" decoding="async"
        onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = BEFORE_IMG; }}
        style={{ ...imageStyle, zIndex: 3, opacity: beforeVisible ? 1 : 0, transition: fade }} />
      {/* Only ended reveals the final image, never a timer or an early threshold. */}
      <img src={photo(AFTER_IMG, 960, 540)} alt="" width={1600} height={900} loading="lazy" decoding="async"
        onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = AFTER_IMG; }}
        style={{ ...imageStyle, zIndex: 4, opacity: phase === 'complete' ? 1 : 0, transition: fade }} />
      {phase !== 'playing' && (
        <button type="button" onClick={() => start()} disabled={phase === 'loading'} aria-busy={phase === 'loading'}
          aria-label={phase === 'idle' ? 'לראות את השדרוג' : label} style={buttonStyle}>
          <Icon size={14} color={buttonStyle.color} strokeWidth={2.5} />{label}
        </button>
      )}
    </>
  );
}