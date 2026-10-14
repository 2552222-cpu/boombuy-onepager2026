import React from 'react';
import { Play } from 'lucide-react';
import { BEFORE_IMG, AFTER_IMG, VIDEO_SRC } from '@/components/employees/hero/heroShared';
import useMobileHeroPlayback from '@/components/employees/hero/useMobileHeroPlayback';
import { fitImg } from '@/lib/img';

// One persistent media instance at every width; resizing never resets completion.
export default function MobileHeroMedia({ reducedMotion, buttonStyle }) {
  const { videoRef, phase, start, hasFrame, mediaRequested, onPlaying, onPause, onEnded, onError } = useMobileHeroPlayback(reducedMotion, VIDEO_SRC);
  const [afterReady, setAfterReady] = React.useState(false);
  const showAfter = phase === 'complete' && afterReady;
  const showBefore = !hasFrame && !showAfter;
  const loadAfter = mediaRequested || phase === 'complete';
  const imageStyle = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', objectPosition: '50% 50%' };
  const fade = reducedMotion ? 'none' : 'opacity 300ms ease';
  const sizes = '(max-width: 767px) calc(100vw - 32px), (max-width: 1100px) calc(100vw - 64px), 1036px';
  const afterLoaded = (event) => setAfterReady(event.currentTarget.naturalWidth > 0);
  const imageFallback = (event, original) => {
    const image = event.currentTarget;
    if (image.getAttribute('src') === original) return;
    image.removeAttribute('srcset');
    image.src = original;
  };
  return (
    <>
      <video ref={videoRef} muted playsInline preload="none"
        onPlaying={onPlaying} onPause={onPause} onEnded={onEnded} onError={onError}
        aria-label="סרטון השדרוג, עשר שניות ללא קול" style={{ ...imageStyle, zIndex: 2 }}>
        <track kind="captions" srcLang="he" label="עברית" src="/hero-captions.vtt" />
      </video>
      <img src={fitImg(BEFORE_IMG, 1280, 720, 76)}
        srcSet={`${fitImg(BEFORE_IMG, 640, 360, 72)} 640w, ${fitImg(BEFORE_IMG, 960, 540, 74)} 960w, ${fitImg(BEFORE_IMG, 1280, 720, 76)} 1280w, ${fitImg(BEFORE_IMG, 1600, 900, 78)} 1600w`}
        sizes={sizes} alt={showBefore ? 'מנהלת רווחה בעומס' : ''} width={1600} height={900}
        fetchPriority="high" loading="eager" decoding="async" onError={(event) => imageFallback(event, BEFORE_IMG)}
        style={{ ...imageStyle, zIndex: 3, opacity: showBefore ? 1 : 0, transition: fade }} />
      {loadAfter && <img src={fitImg(AFTER_IMG, 1280, 720, 76)}
        srcSet={`${fitImg(AFTER_IMG, 640, 360, 72)} 640w, ${fitImg(AFTER_IMG, 960, 540, 74)} 960w, ${fitImg(AFTER_IMG, 1280, 720, 76)} 1280w, ${fitImg(AFTER_IMG, 1600, 900, 78)} 1600w`}
        sizes={sizes} alt={showAfter ? 'מנהלת רווחה רגועה עם קפה' : ''} width={1600} height={900}
        loading="eager" decoding="async" onLoad={afterLoaded} onError={(event) => imageFallback(event, AFTER_IMG)}
        ref={(image) => { if (image?.complete && image.naturalWidth > 0 && !afterReady) setAfterReady(true); }}
        style={{ ...imageStyle, zIndex: 4, opacity: showAfter ? 1 : 0, transition: fade }} />}
      {phase === 'failed' && <button type="button" onClick={start} style={buttonStyle} aria-label="להפעיל את הסרטון">
        <Play size={16} color={buttonStyle.color} strokeWidth={2.5} />להפעיל
      </button>}
    </>
  );
}