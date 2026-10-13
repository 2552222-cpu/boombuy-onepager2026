import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// useReveal: an element is "shown" once it scrolls into view (once, amount 0.15).
// A 1s fallback forces it visible if the IntersectionObserver never fires, so
// content can never get stuck at opacity 0.
export function useReveal(amount = 0.15, timeout = 1200) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (inView) {
      setShown(true);
      return;
    }
    const t = setTimeout(() => setShown(true), timeout);
    return () => clearTimeout(t);
  }, [inView, timeout]);
  return { ref, shown };
}

// Heading reveal: a clip-path mask wipes from bottom to top (inset 100% → 0),
// 700ms. In reduced-motion it falls back to a 150ms fade. Never stuck hidden.
export function RevealHeading({ children, style, as = "h2", amount = 0.2 }) {
  const reduce = prefersReducedMotion();
  const { ref, shown } = useReveal(amount);
  const Tag = motion[as] || motion.h2;
  return (
    <Tag
      ref={ref}
      initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(100% 0 0 0)" }}
      animate={shown ? (reduce ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0 0)" }) : undefined}
      transition={reduce ? { duration: 0.15 } : { duration: 0.7, ease: EASE }}
      style={style}
    >
      {children}
    </Tag>
  );
}

// Generic reveal block: y 24 → 0 + opacity, with an optional stagger delay.
export function RevealBlock({ children, style, delay = 0, amount = 0.15, as = "div" }) {
  const reduce = prefersReducedMotion();
  const { ref, shown } = useReveal(amount);
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      ref={ref}
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      animate={shown ? { opacity: 1, y: 0 } : undefined}
      transition={reduce ? { duration: 0.15 } : { duration: 0.6, ease: EASE, delay }}
      style={style}
    >
      {children}
    </Tag>
  );
}