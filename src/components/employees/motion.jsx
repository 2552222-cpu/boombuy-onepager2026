import React from "react";
import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Heading reveal: a clip-path mask wipes from bottom to top (inset 100% → 0),
// 700ms. In reduced-motion it falls back to a 150ms fade.
export function RevealHeading({ children, style, as = "h2", amount = 0.2 }) {
  const Tag = motion[as] || motion.h2;
  const reduce = prefersReducedMotion();
  return (
    <Tag
      initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(100% 0 0 0)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: true, amount }}
      transition={reduce ? { duration: 0.15 } : { duration: 0.7, ease: EASE }}
      style={style}
    >
      {children}
    </Tag>
  );
}

// Generic reveal block: y 24 → 0 + opacity, with an optional stagger delay.
export function RevealBlock({ children, style, delay = 0, amount = 0.2, as = "div" }) {
  const Tag = motion[as] || motion.div;
  const reduce = prefersReducedMotion();
  return (
    <Tag
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={reduce ? { duration: 0.15 } : { duration: 0.6, ease: EASE, delay }}
      style={style}
    >
      {children}
    </Tag>
  );
}