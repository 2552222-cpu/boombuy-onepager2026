import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Play, RotateCcw, Calendar, Sparkles } from "lucide-react";
import { scrollToId } from "./uiHelpers";
import {
  BEFORE_IMG,
  AFTER_IMG,
  VIDEO_SRC,
  CHARCOAL,
  WARM_WHITE,
} from "./hero/heroShared";
import { photo } from "@/lib/img";

const CORAL = "#F47A5A";
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

export default function HeroTransformation() {
  // idle | playing | complete | failed
  const [stage, setStage] = useState("idle");
  const [videoShown, setVideoShown] = useState(false);
  const [afterShown, setAfterShown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mediaSize, setMediaSize] = useState({ w: 800, h: 450 });
  const [videoPreload, setVideoPreload] = useState("none");

  const videoRef = useRef(null);
  const beforeRef = useRef(null);
  const mediaRowRef = useRef(null);
  const loadTimerRef = useRef(null);
  const frameTimeoutRef = useRef(null);
  const rafRef = useRef(null);
  const rvfcIdRef = useRef(null);
  const attemptRef = useRef(0);

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 768);
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
    // Lazy-load the hero video only after window.load + idle, so it never blocks the LCP.
    const prime = () => {
      setVideoPreload("auto");
      const v = videoRef.current;
      if (v) { try { v.load(); } catch (e) { /* ignore */ } }
    };
    const schedule = () => {
      if (window.requestIdleCallback) window.requestIdleCallback(prime, { timeout: 3000 });
      else window.setTimeout(prime, 1200);
    };
    if (document.readyState === "complete") { schedule(); return; }
    window.addEventListener("load", schedule, { once: true });
    return () => window.removeEventListener("load", schedule);
  }, []);

  const primeNow = () => {
    if (videoPreload !== "auto") setVideoPreload("auto");
    const v = videoRef.current;
    if (v) { try { v.load(); } catch (e) { /* ignore */ } }
  };

  useEffect(
    () => () => {
      if (loadTimerRef.current) clearTimeout(loadTimerRef.current);
      if (frameTimeoutRef.current) clearTimeout(frameTimeoutRef.current);
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
      const onRvfc = () => {
        if (attemptRef.current !== attempt) { fail(); return; }
        if (v.readyState >= 2 && (v.currentTime || 0) > 0) finish();
        else { try { rvfcIdRef.current = v.requestVideoFrameCallback(onRvfc); } catch (e) { startRaf(); } }
      };
      const startRaf = () => {
        const tick = () => {
          if (attemptRef.current !== attempt) { fail(); return; }
          if (v.readyState >= 2 && (v.currentTime || 0) > 0) { finish(); return; }
          rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
      };
      if (typeof v.requestVideoFrameCallback === "function") {
        try { rvfcIdRef.current = v.requestVideoFrameCallback(onRvfc); } catch (e) { startRaf(); }
      } else { startRaf(); }
      frameTimeoutRef.current = setTimeout(() => {
        if (attemptRef.current !== attempt) { fail(); return; }
        if (v.readyState >= 2 && (v.currentTime || 0) > 0) finish(); else fail();
      }, FRAME_TIMEOUT_MS);
    });

  const goFailed = () => {
    attemptRef.current++;
    cancelFrameLoops();
    if (loadTimerRef.current) { clearTimeout(loadTimerRef.current); loadTimerRef.current = null; }
    const v = videoRef.current;
    if (v) { try { v.pause(); } catch (e) {} }
    setStage("failed");
  };

  const beginPlayback = async (attempt) => {
    if (attemptRef.current !== attempt) return;
    const v = videoRef.current;
    if (!v) { goFailed(); return; }
    try {
      v.muted = true;
      try { v.currentTime = 0; } catch (e) {}
      const p = v.play();
      if (p && typeof p.then === "function") await p;
    } catch (e) {
      if (attemptRef.current === attempt) goFailed();
      return;
    }
    if (attemptRef.current !== attempt) { try { v.pause(); } catch (e) {} return; }
    try { await waitForFrame(v, attempt); }
    catch (e) { if (attemptRef.current === attempt) goFailed(); return; }
    if (attemptRef.current !== attempt) { try { v.pause(); } catch (e) {} return; }
    if (loadTimerRef.current) { clearTimeout(loadTimerRef.current); loadTimerRef.current = null; }
    setVideoShown(true);
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
  const btnLight = {
    background: "#fff", color: CHARCOAL, border: "1.5px solid rgba(23,25,29,0.18)", borderRadius: 999, height: 56,
    padding: "0 26px", fontFamily: "inherit", fontWeight: 700, fontSize: "clamp(15px,1.1vw,17px)",
    cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
  };

  const proof = [
    { num: 300, suffix: "+", small: "ארגונים כבר איתנו", ltr: true },
    { num: 8, suffix: " מתוך 10", small: "עובדים מצטרפים תוך שבועות" },
    { num: 0, suffix: "", small: "ארגונים עזבו" },
  ];

  return (
    <section
      id="hero-transformation"
      style={{ background: WARM_WHITE, direction: "rtl", paddingTop: isMobile ? 0 : 8, paddingBottom: isMobile ? 16 : 12, fontFamily: "var(--font-heebo)" }}
    >
      <style>{`
        @keyframes ht-zoom { from{transform:scale(1)} to{transform:scale(1.035)} }
        .ht-zoom{ animation: ht-zoom 6s linear forwards; }
        .ht-zoom-rm{ animation: ht-zoom .15s linear forwards; }
        #hero-transformation{ scroll-margin-top:90px; }
        @media (max-width:768px){ #hero-transformation{ scroll-margin-top:72px; } }
      `}</style>

      <div style={{ margin: "0 auto", padding: isMobile ? "0 16px" : "0 32px", maxWidth: 1200, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ marginTop: isMobile ? 20 : 18, marginBottom: 24, textAlign: "center", width: "100%" }}>
          <h1 style={{ color: CHARCOAL, fontSize: isMobile ? 30 : "clamp(34px,5.4vw,68px)", fontWeight: 800, lineHeight: isMobile ? 1.12 : 1.04, letterSpacing: isMobile ? "-0.02em" : "-0.03em", margin: 0 }}>
            מועדון העובדים שלכם. {isMobile ? <br /> : " "}<span style={{ color: "#C24A2C" }}>אנחנו מפעילים אותו.</span>
          </h1>
          <p style={{ color: "#3A3C42", fontSize: isMobile ? 15 : "clamp(15px,1.8vw,20px)", fontWeight: 500, lineHeight: 1.5, margin: isMobile ? "8px auto 16px" : "12px auto 0", maxWidth: isMobile ? 320 : 640 }}>
            הטבה חדשה לעובדים כל בוקר, בשם הארגון. אתם מחליטים, אנחנו מבצעים.
          </p>
        </div>
        <div ref={mediaRowRef} style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <div
            style={{
              position: "relative",
              width: isMobile ? "100%" : mediaSize.w,
              height: isMobile ? undefined : mediaSize.h,
              aspectRatio: isMobile ? "4 / 3" : undefined,
              borderRadius: isMobile ? 22 : 34,
              overflow: "hidden",
              boxShadow: "0 24px 70px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.3)",
              background: "#000",
            }}
          >
            {/* BEFORE image (kept, never hidden) — slow zoom from click */}
            <img
              ref={beforeRef}
              src={photo(BEFORE_IMG, 1600, 900)}
              srcSet={`${photo(BEFORE_IMG, 960, 540)} 960w, ${photo(BEFORE_IMG, 1600, 900)} 1600w`}
              sizes="(max-width:768px) 100vw, 1200px"
              alt="מנהלת רווחה בעומס"
              width={1600}
              height={900}
              fetchpriority="high"
              loading="eager"
              decoding="async"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = BEFORE_IMG; }}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: isMobile ? "100% 50%" : "center center", zIndex: 1, willChange: "transform" }}
            />

            {/* Video sits above BEFORE_IMG, fades in on first frame */}
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              poster={photo(BEFORE_IMG, 1280, 720)}
              muted
              playsInline
              preload={videoPreload}
              onTimeUpdate={onTimeUpdate}
              onEnded={onEnded}
              onError={onVideoError}
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", objectPosition: isMobile ? "100% 50%" : "center center", zIndex: 2,
                opacity: videoShown ? 1 : 0,
                transition: `opacity ${fadeDur}ms cubic-bezier(.4,0,.2,1)`,
              }}
            >
              <track kind="captions" srclang="he" label="עברית" src="/hero-captions.vtt" />
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
                objectFit: "cover", objectPosition: isMobile ? "100% 50%" : "center center", zIndex: 3,
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
        </div>

        {/* Below-image CTAs */}
        <div style={{ marginTop: isMobile ? 16 : 20, display: "flex", flexDirection: isMobile ? "column" : "row", flexWrap: "wrap", gap: isMobile ? 0 : 12, justifyContent: "center", alignItems: "center", width: "100%" }}>
          <button type="button" className="bb-btn" onClick={() => scrollToId("organization-fit")} style={{ ...btnDark, width: isMobile ? "100%" : undefined, height: isMobile ? 52 : 56, fontSize: isMobile ? 16 : "clamp(15px,1.1vw,17px)" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: CORAL, display: "inline-block", flexShrink: 0 }} />
            <Calendar size={18} color="#fff" strokeWidth={2.4} />
            לתיאום הדגמה של 15 דקות
          </button>
          {isMobile ? (
            <button type="button" onClick={() => scrollToId("benefits")} style={{ marginTop: 10, background: "none", border: "none", padding: 0, fontFamily: "inherit", fontSize: 15, fontWeight: 600, color: "#17191D", textDecoration: "underline", cursor: "pointer" }}>
              לראות הטבות אמיתיות
            </button>
          ) : (
            <button type="button" className="bb-btn" onClick={() => scrollToId("benefits")} style={btnLight}>
              <Sparkles size={18} color={CORAL} strokeWidth={2.4} />
              לראות הטבות אמיתיות
            </button>
          )}
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
      </div>
    </section>
  );
}