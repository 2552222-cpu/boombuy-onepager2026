import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Play, RotateCcw, Calendar } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { scrollToId } from "./uiHelpers";
import {
  BEFORE_IMG,
  AFTER_IMG,
  VIDEO_SRC,
  CHARCOAL,
  WARM_WHITE,
} from "./hero/heroShared";
import { photo, fitImg } from "@/lib/img";
import { railLogos } from "@/utils/logoData";

const CORAL = "#F47A5A";
const EASE = [0.22, 1, 0.36, 1];
const LOAD_TIMEOUT_MS = 8000;
const FRAME_TIMEOUT_MS = 3000;
const MIN_MEDIA_H = 180;

function CountUp({ to, suffix, reducedMotion }) {
  const ref = useRef(null);
  const [val, setVal] = useState(reducedMotion ? to : 0);
  const done = useRef(reducedMotion);
  useEffect(() => {
    if (reducedMotion) { setVal(to); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const start = performance.now();
          const dur = 1200;
          const tick = (now) => {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(Math.round(to * eased));
            if (t < 1) requestAnimationFrame(tick);
            else setVal(to);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, reducedMotion]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function InlineLogoRail() {
  // Fixed slot width keeps the track width stable, so lazy-loaded images
  // (whose rendered width settles only after decode) never shift the -50%
  // loop endpoint — that shift was the "jumps every second" bug.
  const SLOT = 132;
  return (
    <div dir="rtl" style={{ marginTop: 40, overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)", maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)" }}>
      <style>{`@keyframes ht-marq{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}} .ht-marq-track{display:flex;align-items:center;will-change:transform;backface-visibility:hidden;animation:ht-marq 64s linear infinite} .ht-marq-track:hover{animation-play-state:paused} @media (prefers-reduced-motion: reduce){ .ht-marq-track{ animation:none; } }`}</style>
      <div className="ht-marq-track">
        {[...railLogos, ...railLogos].map((l, i) => (
          <span key={i} style={{ flex: `0 0 ${SLOT}px`, width: SLOT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <img src={fitImg(l.url, 240, 96)} alt={l.name} width={116} height={40} loading={i < railLogos.length ? "eager" : "lazy"} decoding="async" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = l.url; }} style={{ height: 40, width: "auto", maxWidth: SLOT - 16, flexShrink: 0, display: "block", objectFit: "contain", filter: "grayscale(1) opacity(0.7)" }} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HeroTransformation() {
  // idle | playing | complete | failed
  const [stage, setStage] = useState("idle");
  const [videoShown, setVideoShown] = useState(false);
  const [afterShown, setAfterShown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mediaSize, setMediaSize] = useState({ w: 800, h: 450 });
  const [videoPreload, setVideoPreload] = useState("none");

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const headingY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  const headingWords = [
    { t: "מועדון", c: false },
    { t: "העובדים", c: false },
    { t: "שלכם.", c: false, br: true },
    { t: "אנחנו", c: true },
    { t: "מפעילים", c: true },
    { t: "אותו.", c: true },
  ];

  const videoRef = useRef(null);
  const beforeRef = useRef(null);
  const mediaRowRef = useRef(null);
  const loadTimerRef = useRef(null);
  const frameTimeoutRef = useRef(null);
  const rafRef = useRef(null);
  const rvfcIdRef = useRef(null);
  const attemptRef = useRef(0);
  const frameRef = useRef(null);
  const stageRef = useRef("idle");
  const autoTriedRef = useRef(false);
  const autoTimerRef = useRef(null);
  const frameInView = useInView(frameRef, { amount: 0.6, once: true });

  useEffect(() => {
    const c = () => {
      setIsMobile(window.innerWidth < 768);
      setIsNarrow(window.innerWidth <= 1024);
    };
    c();
    window.addEventListener("resize", c);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMq = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", onMq);
    return () => {
      window.removeEventListener("resize", c);
      mq.removeEventListener?.("change", onMq);
    };
  }, []);

  useLayoutEffect(() => {
    const compute = () => {
      const vh = window.innerHeight;
      const mob = window.innerWidth < 768;
      const headerEl = document.querySelector("header");
      const headerH = headerEl ? headerEl.getBoundingClientRect().height : mob ? 64 : 72;
      const padTop = 8;
      const headingReserve = mob ? 130 : 150;
      // Below the image: two CTAs (stack on mobile) + proof row + padding.
      const btnH = mob ? 116 : 60;
      const proofH = mob ? 70 : 48;
      const padBottom = mob ? 16 : 12;
      const gaps = 36;
      const belowReserve = btnH + proofH + padBottom + gaps;
      const availH = vh - headerH - padTop - headingReserve - belowReserve;
      const availW = mediaRowRef.current
        ? mediaRowRef.current.getBoundingClientRect().width
        : Math.min(window.innerWidth - (mob ? 40 : 64), 1200);
      let w = Math.min(availW, 1200);
      let h = (w * 9) / 16;
      if (availH >= MIN_MEDIA_H && h > availH) {
        h = availH;
        w = (h * 16) / 9;
      }
      setMediaSize({ w: Math.round(w), h: Math.round(h) });
    };
    compute();
    const headerEl = document.querySelector("header");
    const ro = new ResizeObserver(compute);
    if (headerEl) ro.observe(headerEl);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [isMobile]);

  useEffect(() => {
    // Preload the hero video only after window.load + 3s so it never competes
    // with the first paint. hover/touchstart on the button (primeNow) and
    // auto-play (autoStart) also prime it. preload stays "none" until then.
    const prime = () => {
      setVideoPreload("auto");
      const v = videoRef.current;
      if (v) { try { v.preload = "auto"; v.load(); } catch (e) { /* ignore */ } }
    };
    const schedule = () => { window.setTimeout(prime, 3000); };
    if (document.readyState === "complete") { schedule(); return; }
    window.addEventListener("load", schedule, { once: true });
    return () => window.removeEventListener("load", schedule);
  }, []);

  const primeNow = () => {
    if (videoPreload !== "auto") setVideoPreload("auto");
    const v = videoRef.current;
    if (v) { try { v.preload = "auto"; v.load(); } catch (e) { /* ignore */ } }
  };

  useEffect(() => { stageRef.current = stage; }, [stage]);

  // Mobile only: auto-play the transformation video once (muted) — but only after
  // window.load + 2.5s, and only on a fast connection (saveData off, effectiveType
  // 4g or unknown). We prime preload=auto and wait for canplay before play(). If
  // the browser blocks autoplay or the connection is slow, the "לראות" button
  // stays. Desktop = click-to-play.
  useEffect(() => {
    if (!isMobile || reducedMotion) return;
    if (!frameInView) return;
    if (autoTriedRef.current) return;
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn && conn.saveData) return;
    const et = conn && conn.effectiveType;
    if (et && et !== "4g") return;
    autoTriedRef.current = true;
    const start = () => {
      autoTimerRef.current = setTimeout(() => { if (stageRef.current === "idle") autoStart(); }, 2500);
    };
    if (document.readyState === "complete") { start(); return; }
    window.addEventListener("load", start, { once: true });
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      window.removeEventListener("load", start);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameInView, isMobile, reducedMotion]);

  useEffect(
    () => () => {
      if (loadTimerRef.current) clearTimeout(loadTimerRef.current);
      if (frameTimeoutRef.current) clearTimeout(frameTimeoutRef.current);
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      cancelFrameLoops();
      const v = videoRef.current;
      if (v) { try { v.pause(); } catch (e) { /* ignore */ } }
    },
    []
  );

  const cancelFrameLoops = () => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    const v = videoRef.current;
    if (rvfcIdRef.current != null && v && typeof v.cancelVideoFrameCallback === "function") {
      try { v.cancelVideoFrameCallback(rvfcIdRef.current); } catch (e) { /* ignore */ }
    }
    rvfcIdRef.current = null;
  };

  const applyZoom = () => {
    const img = beforeRef.current;
    if (!img) return;
    img.classList.remove("ht-zoom", "ht-zoom-rm");
    void img.offsetWidth; // reflow to restart the animation
    img.classList.add(reducedMotion ? "ht-zoom-rm" : "ht-zoom");
  };

  const waitForFrame = (v, attempt) =>
    new Promise((resolve, reject) => {
      let done = false;
      const cleanup = () => {
        if (frameTimeoutRef.current) { clearTimeout(frameTimeoutRef.current); frameTimeoutRef.current = null; }
        cancelFrameLoops();
      };
      const finish = () => { if (done) return; done = true; cleanup(); resolve(); };
      const fail = () => { if (done) return; done = true; cleanup(); reject(); };
      const ready = () => attemptRef.current === attempt && v.readyState >= 2 && (v.currentTime || 0) > 0;
      // rAF path is paint-independent: it resolves the moment currentTime
      // advances. On mobile iOS, requestVideoFrameCallback never fires while
      // the <video> sits at opacity:0 (no frame is painted), so the video
      // appeared "stuck" until the 3s timeout. rAF detects playback directly.
      const startRaf = () => {
        const tick = () => {
          if (attemptRef.current !== attempt) { fail(); return; }
          if (ready()) { finish(); return; }
          rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
      };
      startRaf();
      // rVFC (desktop) may resolve a touch earlier on paint; on mobile it simply
      // never fires and the rAF path above wins.
      if (typeof v.requestVideoFrameCallback === "function") {
        const onRvfc = () => {
          if (attemptRef.current !== attempt) { fail(); return; }
          if (ready()) finish();
          else { try { rvfcIdRef.current = v.requestVideoFrameCallback(onRvfc); } catch (e) { /* rAF still running */ } }
        };
        try { rvfcIdRef.current = v.requestVideoFrameCallback(onRvfc); } catch (e) { /* rAF still running */ }
      }
      frameTimeoutRef.current = setTimeout(() => {
        if (attemptRef.current !== attempt) { fail(); return; }
        if (ready()) finish(); else fail();
      }, FRAME_TIMEOUT_MS);
    });

  // Wait for the video to be buffered enough to play (canplay). Used by the
  // mobile auto-play path so we never call play() on an empty buffer.
  const waitForCanPlay = (v, attempt) =>
    new Promise((resolve, reject) => {
      if (v.readyState >= 3) { resolve(); return; }
      let done = false;
      const to = setTimeout(() => {
        if (done) return; done = true; cleanup();
        if (attemptRef.current !== attempt) { reject(); return; }
        if (v.readyState >= 2) resolve(); else reject();
      }, 7000);
      const cleanup = () => {
        v.removeEventListener("canplay", onCan);
        v.removeEventListener("error", onErr);
        if (to) clearTimeout(to);
      };
      const onCan = () => { if (done) return; done = true; cleanup(); resolve(); };
      const onErr = () => { if (done) return; done = true; cleanup(); reject(); };
      v.addEventListener("canplay", onCan);
      v.addEventListener("error", onErr);
    });

  const goFailed = () => {
    attemptRef.current++;
    cancelFrameLoops();
    if (loadTimerRef.current) { clearTimeout(loadTimerRef.current); loadTimerRef.current = null; }
    const v = videoRef.current;
    if (v) { try { v.pause(); } catch (e) {} }
    setStage("failed");
  };

  const revertToIdle = () => {
    attemptRef.current++;
    cancelFrameLoops();
    if (loadTimerRef.current) { clearTimeout(loadTimerRef.current); loadTimerRef.current = null; }
    const v = videoRef.current;
    if (v) { try { v.pause(); } catch (e) {} }
    setVideoShown(false);
    setAfterShown(false);
    setStage("idle");
  };

  const beginPlayback = async (attempt, autoMode = false) => {
    if (attemptRef.current !== attempt) return;
    const v = videoRef.current;
    if (!v) { goFailed(); return; }
    try {
      v.muted = true;
      try { v.currentTime = 0; } catch (e) {}
      const p = v.play();
      if (p && typeof p.then === "function") await p;
    } catch (e) {
      if (attemptRef.current === attempt) { if (autoMode) revertToIdle(); else goFailed(); }
      return;
    }
    if (attemptRef.current !== attempt) { try { v.pause(); } catch (e) {} return; }
    try { await waitForFrame(v, attempt); }
    catch (e) { if (attemptRef.current === attempt) goFailed(); return; }
    if (attemptRef.current !== attempt) { try { v.pause(); } catch (e) {} return; }
    if (loadTimerRef.current) { clearTimeout(loadTimerRef.current); loadTimerRef.current = null; }
    setVideoShown(true);
  };

  const autoStart = async () => {
    if (stageRef.current !== "idle") return;
    if (videoPreload !== "auto") setVideoPreload("auto");
    const v = videoRef.current;
    if (v) { try { v.preload = "auto"; v.load(); } catch (e) { /* ignore */ } }
    const attempt = ++attemptRef.current;
    setStage("playing");
    setAfterShown(false);
    applyZoom();
    loadTimerRef.current = setTimeout(() => { if (attemptRef.current === attempt) goFailed(); }, LOAD_TIMEOUT_MS);
    if (v) {
      try { await waitForCanPlay(v, attempt); }
      catch (e) { if (attemptRef.current === attempt) revertToIdle(); return; }
    }
    beginPlayback(attempt, true);
  };

  const onStart = () => {
    if (stage !== "idle") return;
    if (videoPreload !== "auto") { setVideoPreload("auto"); }
    const attempt = ++attemptRef.current;
    setStage("playing");
    setAfterShown(false);
    applyZoom();
    loadTimerRef.current = setTimeout(() => { if (attemptRef.current === attempt) goFailed(); }, LOAD_TIMEOUT_MS);
    beginPlayback(attempt);
  };

  const onReplay = () => {
    if (stage !== "complete") return;
    attemptRef.current++;
    cancelFrameLoops();
    setVideoShown(false);
    setAfterShown(false);
    setStage("playing");
    applyZoom();
    const attempt = ++attemptRef.current;
    const v = videoRef.current;
    if (v) { try { v.currentTime = 0; } catch (e) {} }
    loadTimerRef.current = setTimeout(() => { if (attemptRef.current === attempt) goFailed(); }, LOAD_TIMEOUT_MS);
    beginPlayback(attempt);
  };

  const onRetry = () => {
    if (stage !== "failed") return;
    attemptRef.current++;
    setVideoShown(false);
    setAfterShown(false);
    setStage("idle");
    const v = videoRef.current;
    if (v) { try { v.pause(); v.load(); } catch (e) {} }
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    const cur = v.currentTime || 0;
    const dur = v.duration;
    if (isFinite(dur) && dur > 0 && cur >= dur - 1) setAfterShown(true);
  };

  const onEnded = () => {
    if (stage === "playing") {
      setAfterShown(true);
      setStage("complete");
    }
  };

  const onVideoError = () => {
    if (stage === "playing") goFailed();
  };

  const fadeDur = reducedMotion ? 150 : 900;
  const afterDur = reducedMotion ? 150 : 1000;

  const inImageBtn = {
    position: "absolute",
    bottom: isMobile ? 12 : 16,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 20,
    background: isMobile ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(23,25,29,0.10)",
    borderRadius: 999,
    height: isMobile ? 38 : 48,
    padding: isMobile ? "0 14px" : "0 22px",
    fontFamily: "var(--font-heebo)",
    fontWeight: 700,
    fontSize: isMobile ? 13 : 16,
    color: CHARCOAL,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    whiteSpace: "nowrap",
    boxShadow: isMobile ? "0 4px 14px rgba(0,0,0,0.14)" : "0 8px 24px rgba(0,0,0,0.18)",
    transition: "opacity .35s ease",
  };

  const btnDark = {
    background: CHARCOAL, color: "#fff", border: "none", borderRadius: 999, height: 56,
    padding: "0 26px", fontFamily: "inherit", fontWeight: 700, fontSize: "clamp(15px,1.1vw,17px)",
    cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
    boxShadow: "0 8px 24px rgba(23,25,29,0.18)",
  };

  const proof = [
    { num: 300, suffix: "+", small: "ארגונים כבר איתנו", ltr: true },
    { num: 8, suffix: " מתוך 10", small: "עובדים מצטרפים תוך שבועות" },
    { num: 0, suffix: "", small: "ארגונים עזבו" },
  ];

  return (
    <section
      id="hero-transformation"
      ref={sectionRef}
      style={{ background: WARM_WHITE, direction: "rtl", paddingTop: isMobile ? 0 : 8, paddingBottom: isMobile ? 16 : 12, fontFamily: "var(--font-heebo)" }}
    >
      <style>{`
        @keyframes ht-zoom { from{transform:scale(1)} to{transform:scale(1.035)} }
        .ht-zoom{ animation: ht-zoom 6s linear forwards; }
        .ht-zoom-rm{ animation: ht-zoom .15s linear forwards; }
        #hero-transformation{ scroll-margin-top:90px; }
        @media (max-width:768px){ #hero-transformation{ scroll-margin-top:72px; } }
      `}</style>

      <div style={{ margin: "0 auto", padding: isMobile ? "0 12px" : "0 32px", maxWidth: 1200, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <motion.div style={{ marginTop: isMobile ? 20 : 18, marginBottom: 24, textAlign: "center", width: "100%", y: (reducedMotion || isMobile) ? 0 : headingY, opacity: (reducedMotion || isMobile) ? 1 : headingOpacity }}>
          <motion.h1
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: reducedMotion ? 0 : 0.06, delayChildren: 0.1 } } }}
            style={{ color: CHARCOAL, fontSize: isMobile ? 30 : "clamp(34px,5.4vw,68px)", fontWeight: 800, lineHeight: isMobile ? 1.12 : 1.04, letterSpacing: isMobile ? "-0.02em" : "-0.03em", margin: 0 }}
          >
            {headingWords.map((w, i) => (
              <React.Fragment key={i}>
                <motion.span
                  variants={{ hidden: { opacity: 1, y: reducedMotion ? 0 : 14 }, show: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0.15 : 0.5, ease: EASE } } }}
                  style={{ display: "inline-block", color: w.c ? "#C24A2C" : CHARCOAL, willChange: "transform" }}
                >
                  {w.t}
                </motion.span>
                {w.br && isMobile ? <br /> : " "}
              </React.Fragment>
            ))}
          </motion.h1>
          <p style={{ color: "#3A3C42", fontSize: isMobile ? 15 : "clamp(15px,1.8vw,20px)", fontWeight: 500, lineHeight: 1.5, margin: isMobile ? "8px auto 16px" : "12px auto 0", maxWidth: isMobile ? 320 : 640 }}>
            הטבה חדשה לעובדים כל בוקר, בשם הארגון. אתם מחליטים, אנחנו מבצעים.
          </p>
        </motion.div>
        <div ref={mediaRowRef} style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <motion.div style={{ width: "100%", y: reducedMotion ? 0 : mediaY, scale: reducedMotion ? 1 : mediaScale }}>
            <motion.div
              initial={reducedMotion ? false : { scale: 0.985 }}
              animate={reducedMotion ? {} : { scale: 1 }}
              transition={reducedMotion ? { duration: 0.15 } : { duration: 0.7, ease: EASE, delay: 0.45 }}
              style={{ width: "100%" }}
            >
          <div
            ref={frameRef}
            style={{
              position: "relative",
              margin: "0 auto",
              width: isMobile ? "100%" : mediaSize.w,
              height: isMobile ? undefined : mediaSize.h,
              aspectRatio: isMobile ? "16 / 10" : undefined,
              borderRadius: isMobile ? 20 : 34,
              overflow: "hidden",
              boxShadow: "0 24px 70px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.3)",
              background: "#000",
            }}
          >
            {/* BEFORE image (kept, never hidden) — slow zoom from click */}
            <img
              ref={beforeRef}
              src={photo(BEFORE_IMG, 1280, 720, 76)}
              srcSet={`${photo(BEFORE_IMG, 800, 450, 72)} 800w, ${photo(BEFORE_IMG, 1280, 720, 76)} 1280w, ${photo(BEFORE_IMG, 1600, 900, 78)} 1600w`}
              sizes="(max-width:768px) 100vw, 1200px"
              alt="מנהלת רווחה בעומס"
              width={1600}
              height={900}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = BEFORE_IMG; }}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 50%", zIndex: 1, willChange: "transform" }}
            />

            {/* Video sits above BEFORE_IMG, fades in on first frame */}
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              muted
              playsInline
              preload={videoPreload}
              onTimeUpdate={onTimeUpdate}
              onEnded={onEnded}
              onError={onVideoError}
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "50% 50%", zIndex: 2,
                opacity: videoShown ? 1 : 0,
                transition: `opacity ${fadeDur}ms cubic-bezier(.4,0,.2,1)`,
              }}
            >
              <track kind="captions" srcLang="he" label="עברית" src="/hero-captions.vtt" />
            </video>

            {/* AFTER image — fades in 1s before the video ends */}
            <img
              src={photo(AFTER_IMG, 1600, 900)}
              srcSet={`${photo(AFTER_IMG, 960, 540)} 960w, ${photo(AFTER_IMG, 1600, 900)} 1600w`}
              sizes="(max-width:768px) 100vw, 1200px"
              alt=""
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = AFTER_IMG; }}
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "50% 50%", zIndex: 3,
                opacity: afterShown ? 1 : 0,
                transition: `opacity ${afterDur}ms cubic-bezier(.4,0,.2,1)`,
              }}
            />

            {/* In-image CTA — bottom center */}
            {stage === "idle" && (
              <button type="button" onClick={onStart} onMouseEnter={primeNow} onTouchStart={primeNow} style={inImageBtn} aria-label="לראות את השדרוג">
                <Play size={isMobile ? 14 : 16} color={CHARCOAL} strokeWidth={2.5} />
                {isMobile ? "לראות · 10 שנ׳" : "לראות את השדרוג · 10 שניות"}
              </button>
            )}
            {stage === "complete" && (
              <button type="button" onClick={onReplay} style={inImageBtn} aria-label="לצפייה חוזרת">
                <RotateCcw size={isMobile ? 14 : 16} color={CHARCOAL} strokeWidth={2.5} />
                לצפייה חוזרת
              </button>
            )}
            {stage === "failed" && (
              <button type="button" onClick={onRetry} style={{ ...inImageBtn, background: "rgba(255,255,255,0.95)" }} aria-label="לנסות שוב">
                <RotateCcw size={isMobile ? 14 : 16} color={CORAL} strokeWidth={2.5} />
                לנסות שוב
              </button>
            )}
          </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Below-image CTAs */}
        <div style={{ marginTop: isMobile ? 16 : 20, display: "flex", flexDirection: isMobile ? "column" : "row", flexWrap: "wrap", gap: isMobile ? 0 : 12, justifyContent: "center", alignItems: "center", width: "100%" }}>
          <button type="button" className="bb-btn bb-pulse-btn" onClick={() => scrollToId("organization-fit")} style={{ ...btnDark, width: isMobile ? "100%" : undefined, height: isMobile ? 52 : 56, fontSize: isMobile ? 16 : "clamp(15px,1.1vw,17px)" }}>
            <span className="bb-pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: CORAL, display: "inline-block", flexShrink: 0 }} />
            <Calendar size={18} color="#fff" strokeWidth={2.4} />
            לתיאום הדגמה של 15 דקות
          </button>
        </div>

        {/* Proof row */}
        <div style={{ marginTop: isMobile ? 18 : 22, display: "flex", flexWrap: isMobile ? "nowrap" : "wrap", justifyContent: "center", gap: isMobile ? 10 : 28, width: "100%" }}>
          {proof.map((p) => (
            <div key={p.small} style={{ textAlign: "center", flex: isMobile ? "1 1 0" : "1 1 90px", maxWidth: 260, minWidth: 0 }}>
              <div style={{ color: CHARCOAL, fontSize: isMobile ? 22 : "clamp(20px,2.4vw,28px)", fontWeight: 800, lineHeight: 1.1 }} dir={p.ltr ? "ltr" : undefined}>
                <CountUp to={p.num} suffix={p.suffix} reducedMotion={reducedMotion} />
              </div>
              <div style={{ color: "#5A5C62", fontSize: isMobile ? 12 : "clamp(12px,1.1vw,14px)", fontWeight: 500, marginTop: 2, lineHeight: 1.3, display: isMobile ? "-webkit-box" : undefined, WebkitLineClamp: isMobile ? 2 : undefined, WebkitBoxOrient: isMobile ? "vertical" : undefined, overflow: isMobile ? "hidden" : undefined }}>
                {p.small}
              </div>
            </div>
          ))}
        </div>

        {isNarrow && <InlineLogoRail />}
      </div>
    </section>
  );
}