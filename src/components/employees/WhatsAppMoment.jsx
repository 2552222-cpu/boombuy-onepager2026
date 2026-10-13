import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

// "רגע ה־WhatsApp": a small chat card above the benefits carousel that shows
// exactly what lands on an employee's phone every morning. A typing indicator
// appears first, then the green bubble with the centered offer. It swaps with a
// 250ms fade when the carousel changes cards. The "וואו" of the page.
export default function WhatsAppMoment({ offer, isMobile }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6, once: true });
  const reduce =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [typed, setTyped] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setTyped(true); return; }
    const t = setTimeout(() => setTyped(true), 1200);
    return () => clearTimeout(t);
  }, [inView, reduce]);

  const showBubble = typed || reduce;

  return (
    <div ref={ref} dir="rtl" style={{ display: "flex", justifyContent: "center", marginTop: isMobile ? 18 : 22, marginBottom: isMobile ? 6 : 10 }}>
      <style>{`@keyframes wa-bounce{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-4px);opacity:1}} @media (prefers-reduced-motion: reduce){ .wa-dot{ animation:none !important; } }`}</style>
      <div style={{ width: "100%", maxWidth: 340, background: "#fff", borderRadius: 20, border: "1px solid rgba(19,21,25,0.08)", boxShadow: "0 10px 30px rgba(19,21,25,0.06)", padding: "14px 16px", boxSizing: "border-box" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#17191D", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, flex: "0 0 auto" }}>B</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#17191D", flex: "1 1 auto", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>מועדון ההטבות של [הארגון שלך]</span>
          <span style={{ fontSize: 12, color: "#6E7177", flex: "0 0 auto" }}>07:30</span>
        </div>
        {/* Bubble area */}
        <div style={{ minHeight: 44, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <AnimatePresence mode="wait">
            {!showBubble ? (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ background: "#EDEFF1", borderRadius: "18px 18px 18px 4px", padding: "10px 14px", display: "inline-flex", gap: 4 }}
              >
                {[0, 1, 2].map((d) => (
                  <span key={d} className="wa-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#8A8F95", display: "inline-block", animation: `wa-bounce 1.2s ${d * 0.18}s infinite ease-in-out` }} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                style={{ background: "#E7F6E3", borderRadius: "18px 18px 4px 18px", padding: "12px 14px", maxWidth: 320 }}
              >
                <p style={{ fontSize: 15, color: "#1A1A1A", lineHeight: 1.5, margin: 0 }}>
                  ☀️ בוקר טוב! ההטבה של היום: {offer.productName} ב-₪{offer.priceNew} במקום ₪{offer.priceOld}. היום בלבד.
                </p>
                <span style={{ display: "block", fontSize: 11, color: "#3B7DD2", marginTop: 6, textAlign: "left" }}>✓✓</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}