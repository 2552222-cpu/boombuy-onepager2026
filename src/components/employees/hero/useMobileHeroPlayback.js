import { useCallback, useEffect, useRef, useState } from 'react';

export default function useMobileHeroPlayback(reducedMotion) {
  const videoRef = useRef(null);
  const phaseRef = useRef('idle');
  const autoTried = useRef(false);
  const autoTimer = useRef(null);
  const [phase, setPhase] = useState('idle');
  const update = useCallback((next) => { phaseRef.current = next; setPhase(next); }, []);

  // Both entry points share one synchronous lock and one native play request.
  const start = useCallback((automatic = false) => {
    const video = videoRef.current;
    if (!video || ['loading', 'playing'].includes(phaseRef.current)) return;
    autoTried.current = true;
    clearTimeout(autoTimer.current);
    update('loading');
    video.pause();
    video.preload = 'auto';
    video.currentTime = 0;
    video.defaultPlaybackRate = 1;
    video.playbackRate = 1;
    // Call inside the tap, without awaiting downloads or resetting the source.
    video.play().catch(() => {
      if (videoRef.current === video && phaseRef.current === 'loading') {
        update(automatic ? 'idle' : 'failed');
      }
    });
  }, [update]);

  useEffect(() => {
    if (phase !== 'idle' || autoTried.current || reducedMotion) return;
    const video = videoRef.current;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!video || connection?.saveData || (connection?.effectiveType && connection.effectiveType !== '4g')) return;
    let visible = false;
    const schedule = () => {
      clearTimeout(autoTimer.current);
      if (!visible || document.hidden || document.readyState !== 'complete') return;
      autoTimer.current = setTimeout(() => {
        if (visible && !document.hidden && phaseRef.current === 'idle' && !autoTried.current) start(true);
      }, 2500);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.6;
      schedule();
    }, { threshold: [0, 0.6] });
    observer.observe(video);
    window.addEventListener('load', schedule);
    document.addEventListener('visibilitychange', schedule);
    return () => {
      clearTimeout(autoTimer.current);
      observer.disconnect();
      window.removeEventListener('load', schedule);
      document.removeEventListener('visibilitychange', schedule);
    };
  }, [phase, reducedMotion, start]);

  useEffect(() => {
    const video = videoRef.current;
    return () => { clearTimeout(autoTimer.current); video?.pause(); };
  }, []);

  return {
    videoRef, phase, start,
    onPlaying: () => { if (phaseRef.current === 'loading') update('playing'); },
    onEnded: () => { if (phaseRef.current === 'playing') update('complete'); },
    onError: () => {
      if (['loading', 'playing'].includes(phaseRef.current)) {
        videoRef.current?.pause();
        update('failed');
      }
    },
  };
}