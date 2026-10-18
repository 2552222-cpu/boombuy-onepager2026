import { useCallback, useEffect, useRef, useState } from 'react';

export default function useMobileHeroPlayback(reducedMotion, source, posterReady = true) {
  const videoRef = useRef(null);
  const connection = typeof navigator === 'undefined' ? null : navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const [saveData] = useState(() => !!connection?.saveData);
  const completedRef = useRef(reducedMotion || saveData);
  const phaseRef = useRef(completedRef.current ? 'complete' : 'idle');
  const visibleRef = useRef(false);
  const timerRef = useRef(null);
  const loadTimerRef = useRef(null);
  const attemptRef = useRef(0);
  const pendingRef = useRef(false);
  const [phase, setPhase] = useState(phaseRef.current);
  const [hasFrame, setHasFrame] = useState(false);
  const [mediaRequested, setMediaRequested] = useState(false);
  const update = useCallback((next) => { phaseRef.current = next; setPhase(next); }, []);
  const clearTimers = useCallback(() => {
    clearTimeout(timerRef.current);
    clearTimeout(loadTimerRef.current);
    timerRef.current = null;
    loadTimerRef.current = null;
  }, []);
  const pause = useCallback(() => {
    attemptRef.current += 1;
    pendingRef.current = false;
    clearTimers();
    videoRef.current?.pause();
    if (['loading', 'playing'].includes(phaseRef.current)) update('paused');
  }, [clearTimers, update]);
  const complete = useCallback(() => {
    completedRef.current = true;
    pause();
    if (videoRef.current) videoRef.current.preload = 'none';
    update('complete');
  }, [pause, update]);
  const start = useCallback(() => {
    const video = videoRef.current;
    if (!posterReady || !video || completedRef.current || pendingRef.current || phaseRef.current === 'playing' || !visibleRef.current || document.hidden) return;
    clearTimers();
    const attempt = ++attemptRef.current;
    pendingRef.current = true;
    update('loading');
    setMediaRequested(true);
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    // Attach once, only after actual playback intent. Never call load() or seek
    // to zero on resume; pause/re-entry must continue the same native video.
    if (!video.getAttribute('src')) video.src = source;
    const fail = (error) => {
      if (attempt !== attemptRef.current || completedRef.current) return;
      pendingRef.current = false;
      clearTimers();
      video.pause();
      update(error?.name === 'AbortError' || document.hidden || !visibleRef.current ? 'paused' : 'failed');
    };
    // A slow/failed download must not leave the component in loading forever.
    loadTimerRef.current = setTimeout(() => fail({ name: 'TimeoutError' }), 20000);
    const request = video.play();
    request?.catch(fail);
  }, [clearTimers, source, update, posterReady]);

  useEffect(() => {
    if (reducedMotion || saveData) complete();
    // Completion is deliberately never undone when a preference is disabled.
  }, [reducedMotion, saveData, complete]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || completedRef.current) return;
    const schedule = () => {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      if (!visibleRef.current || document.hidden || completedRef.current) return;
      if (!['idle', 'paused'].includes(phaseRef.current)) return;
      timerRef.current = setTimeout(() => {
        if (visibleRef.current && !document.hidden && !completedRef.current) start();
      }, 1000);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.6;
      if (!visibleRef.current) pause();
      else schedule();
    }, { threshold: [0, 0.6, 1] });
    observer.observe(video);
    const onVisibility = () => {
      if (document.hidden) pause();
      else schedule();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      attemptRef.current += 1;
      pendingRef.current = false;
      clearTimers();
      video.pause();
    };
  }, [clearTimers, pause, start]);

  const onPlaying = () => {
    if (completedRef.current || !visibleRef.current || document.hidden || phaseRef.current === 'failed') { videoRef.current?.pause(); return; }
    clearTimers();
    pendingRef.current = false;
    setHasFrame(true);
    update('playing');
  };
  const onPause = () => {
    if (completedRef.current) return;
    if (videoRef.current?.ended) complete();
    else if (['playing', 'loading'].includes(phaseRef.current)) pause();
  };
  const onError = () => {
    if (completedRef.current || !mediaRequested) return;
    pause();
    update('failed');
  };
  return { videoRef, phase, start, hasFrame, mediaRequested, onPlaying, onPause, onEnded: complete, onError };
}