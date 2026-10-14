import { useCallback, useEffect, useRef, useState } from 'react';

// Shared play-once logic for the hero video (mobile + desktop).
// Behaviour:
//  - Autoplay muted + playsInline once the media is 60% visible for 1 continuous
//    second. No loop, no replay button.
//  - On end, freeze on the AFTER image. `completed` persists for the component
//    lifetime — scrolling back or returning to the tab never restarts.
//  - Pause below 15% visibility or on tab hide; resume only when visible again
//    AND not completed.
//  - prefers-reduced-motion: start on the AFTER image, no autoplay.
//  - If autoplay is blocked, fall back to 'failed' so an accessible play control
//    can be shown (the only place a button appears).
export default function useMobileHeroPlayback(reducedMotion) {
  const videoRef = useRef(null);
  const phaseRef = useRef(reducedMotion ? 'complete' : 'idle');
  const completedRef = useRef(!!reducedMotion);
  const inViewRef = useRef(false);
  const visibleTimer = useRef(null);
  const [phase, setPhase] = useState(reducedMotion ? 'complete' : 'idle');

  const update = useCallback((next) => { phaseRef.current = next; setPhase(next); }, []);

  const start = useCallback((automatic) => {
    const video = videoRef.current;
    if (!video || completedRef.current) return;
    if (['loading', 'playing'].includes(phaseRef.current)) return;
    update('loading');
    try { video.preload = 'auto'; } catch (e) { /* ignore */ }
    try { video.currentTime = 0; } catch (e) { /* ignore */ }
    const p = video.play();
    if (p && typeof p.then === 'function') {
      p.catch(() => {
        if (videoRef.current === video && phaseRef.current === 'loading') update('failed');
      });
    }
  }, [update]);

  const resume = useCallback(() => {
    const video = videoRef.current;
    if (!video || completedRef.current || phaseRef.current !== 'playing') return;
    const p = video.play();
    if (p && typeof p.then === 'function') p.catch(() => {});
  }, []);

  useEffect(() => {
    if (reducedMotion) return; // static AFTER image, no autoplay
    const video = videoRef.current;
    if (!video) return;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection?.saveData) return;

    const clearTimer = () => { if (visibleTimer.current) { clearTimeout(visibleTimer.current); visibleTimer.current = null; } };
    const armTimer = () => {
      clearTimer();
      if (!inViewRef.current || document.hidden || completedRef.current || phaseRef.current !== 'idle') return;
      visibleTimer.current = setTimeout(() => {
        if (inViewRef.current && !document.hidden && !completedRef.current && phaseRef.current === 'idle') start(true);
      }, 1000);
    };

    const io = new IntersectionObserver(([entry]) => {
      const ratio = entry.intersectionRatio;
      inViewRef.current = ratio >= 0.6;
      if (ratio < 0.15) {
        try { video.pause(); } catch (e) { /* ignore */ }
        clearTimer();
      } else if (!inViewRef.current) {
        clearTimer(); // dropped below 60% → reset the continuous-visibility timer
      } else if (!completedRef.current && phaseRef.current === 'idle') {
        armTimer();
      } else if (!completedRef.current && phaseRef.current === 'playing') {
        resume();
      }
    }, { threshold: [0, 0.15, 0.6, 1] });
    io.observe(video);

    const onVis = () => {
      if (document.hidden) {
        try { video.pause(); } catch (e) { /* ignore */ }
        clearTimer();
      } else if (inViewRef.current && phaseRef.current === 'playing' && !completedRef.current) {
        resume();
      } else if (inViewRef.current && phaseRef.current === 'idle' && !completedRef.current) {
        armTimer();
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      clearTimer();
    };
  }, [reducedMotion, start, resume]);

  useEffect(() => {
    const video = videoRef.current;
    return () => { if (visibleTimer.current) clearTimeout(visibleTimer.current); try { video?.pause(); } catch (e) { /* ignore */ } };
  }, []);

  return {
    videoRef, phase, start,
    onPlaying: () => { if (phaseRef.current === 'loading') update('playing'); },
    onEnded: () => { completedRef.current = true; if (phaseRef.current === 'playing') update('complete'); },
    onError: () => {
      if (['loading', 'playing'].includes(phaseRef.current)) {
        try { videoRef.current?.pause(); } catch (e) { /* ignore */ }
        update('failed');
      }
    },
  };
}