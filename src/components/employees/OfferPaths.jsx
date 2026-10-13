import React, { useEffect, useRef, useState } from "react";
import { RevealHeading, RevealBlock } from "./motion";
import { SECTION } from "./layoutTokens";

const BG = SECTION.BG_MIST;
const CHARCOAL = SECTION.CHARCOAL;
const BODY = SECTION.BODY_COLOR;
const CORAL = SECTION.BTN_CORAL;
const EASE = [0.22, 1, 0.36, 1];

const PATHS = [
  { title: "ארגונים", text: "חברות שרוצות לתת לעובדים יותר, מאותו תקציב." },
  { title: "איגודים ומועדונים", text: "גופים שרוצים לתת לחברים ערך, ולהרוויח מזה." },
];

const MODULES = ["מתנות חג", "הטבות יומיות", "וולנס", "תרבות", "חופשות ונסיעות", "מותגים וקניות"];

export default function OfferPaths() {
  const [isMobile, setIsMobile] = useState(false);
  const chipsRef = useRef(null);
  const [activeChip, setActiveChip] = useState(0);

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 768);
    c();
    window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  const onChipsScroll = () => {
    const el = chipsRef.current;
    if (!el) return;
    const center = el.getBoundingClientRect().left + el.clientWidth / 2;
    let best = 0, bestD = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const cc = child.getBoundingClientRect().left + child.clientWidth / 2;
      const d = Math.abs(cc - center);
      if (d < bestD) { bestD = d; best = i; }
    });
    setActiveChip(best);
  };

  return (
    <section
      id="offer-paths"
      className="bb-section"
      dir="rtl"
      style={{ background: BG, fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif", scrollMarginTop: 90 }}
    >
      <style>{`@media (max-width:768px){ #offer-paths{ scroll-margin-top:72px; } .op-chips::-webkit-scrollbar{ display:none; } }`}</style>

      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center", padding: "0 16px" }}>
        <RevealBlock style={{ color: SECTION.CORAL_TEXT, fontWeight: SECTION.KICKER_WEIGHT, fontSize: SECTION.KICKER_SIZE, letterSpacing: "-0.01em", margin: "0 0 8px" }}>מי אצלנו</RevealBlock>
        <RevealHeading
          as="h2"
          style={{ color: CHARCOAL, fontSize: `clamp(${SECTION.H2_MOBILE}px,4vw,48px)`, fontWeight: SECTION.H2_WEIGHT, lineHeight: SECTION.H2_LH, letterSpacing: "-0.025em", margin: 0 }}
        >
          למי זה <span style={{ color: SECTION.CORAL_TEXT }}>מתאים</span>
        </RevealHeading>

        <RevealBlock
          delay={0.08}
          style={{ color: BODY, fontSize: `clamp(${SECTION.BODY_MOBILE}px,1.4vw,${SECTION.BODY_DESKTOP}px)`, lineHeight: SECTION.BODY_LH, margin: "14px auto 0", maxWidth: 660 }}
        >
          לכל ארגון עם עובדים או חברים, מעשרות ועד עשרות אלפים.
        </RevealBlock>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: isMobile ? 10 : 20, marginTop: isMobile ? 28 : 44, justifyContent: "center" }}>
          {PATHS.map((p, i) => (
            <RevealBlock
              key={p.title}
              delay={i * 0.08}
              style={{
                background: "#fff",
                borderRadius: isMobile ? 18 : 24,
                border: "1px solid rgba(19,21,25,0.08)",
                boxShadow: "0 10px 30px rgba(19,21,25,0.06)",
                padding: isMobile ? "16px" : "32px 28px",
                textAlign: "right",
                boxSizing: "border-box",
              }}
            >
              <h3 style={{ color: CHARCOAL, fontSize: isMobile ? 17 : "clamp(20px,1.8vw,24px)", fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.01em" }}>{p.title}</h3>
              <p style={{ color: BODY, fontSize: isMobile ? 14 : "clamp(15px,1.2vw,17px)", lineHeight: 1.55, margin: 0 }}>{p.text}</p>
            </RevealBlock>
          ))}
        </div>

        {isMobile ? (
          <div
            ref={chipsRef}
            onScroll={onChipsScroll}
            className="op-chips"
            style={{
              display: "flex",
              gap: 10,
              marginTop: 26,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              padding: "4px 0",
              flexWrap: "nowrap",
              whiteSpace: "nowrap",
            }}
          >
            {MODULES.map((m, i) => (
              <span
                key={m}
                style={{
                  scrollSnapAlign: "center",
                  flex: "0 0 auto",
                  background: "#fff",
                  border: "1px solid rgba(19,21,25,0.10)",
                  borderRadius: 999,
                  padding: "10px 18px",
                  color: CHARCOAL,
                  fontSize: 15,
                  fontWeight: 600,
                  transform: i === activeChip ? "scale(1)" : "scale(0.96)",
                  opacity: i === activeChip ? 1 : 0.8,
                  transition: "transform .25s ease, opacity .25s ease",
                }}
              >
                {m}
              </span>
            ))}
          </div>
        ) : (
          <RevealBlock
            delay={0.12}
            style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 32 }}
          >
            {MODULES.map((m) => (
              <span
                key={m}
                style={{
                  background: "#fff",
                  border: "1px solid rgba(19,21,25,0.10)",
                  borderRadius: 999,
                  padding: "10px 18px",
                  color: CHARCOAL,
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                {m}
              </span>
            ))}
          </RevealBlock>
        )}
      </div>
    </section>
  );
}