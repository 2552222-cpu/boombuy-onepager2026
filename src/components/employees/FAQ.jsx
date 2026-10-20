import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { RevealHeading, RevealBlock } from "./motion";
import { FAQ_ITEMS } from "@/lib/faqData";
import FAQItem from "@/components/employees/FAQItem";

const BG = "#FBFAF8";
const CHARCOAL = "#17191D";
const BODY = "#3A3C42";
const CORAL = "#F47A5A";
const EASE = [0.22, 1, 0.36, 1];

export default function FAQ() {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const featured = FAQ_ITEMS.filter((i) => i.featured);
  const rest = FAQ_ITEMS.filter((i) => !i.featured);

  return (
    <section
      id="faq"
      dir="rtl"
      className="bb-section"
      style={{
        background: BG,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif",
        scrollMarginTop: 90,
      }}
    >
      <style>{`
        @media (max-width:768px){ #faq{ scroll-margin-top:72px; padding-left:16px !important; padding-right:16px !important; } }
        .faq-item{ border-bottom:1px solid rgba(19,21,25,0.10); }
        .faq-question{ width:100%; text-align:right; font-family:inherit; background:none; border:0; cursor:pointer; display:flex; align-items:center; justify-content:space-between; gap:16px; padding:18px 4px; font-weight:700; color:${CHARCOAL}; font-size:clamp(17px,1.5vw,20px); }
        .faq-question:focus-visible{ outline:3px solid rgba(244,122,90,0.55); outline-offset:2px; border-radius:10px; }
        .faq-chev{ transition:transform .4s cubic-bezier(.34,1.56,.64,1); flex:0 0 auto; color:${CORAL}; }
        .faq-question[aria-expanded="true"] .faq-chev{ transform:rotate(180deg); }
        .faq-a{ color:${BODY}; font-size:clamp(15px,1.25vw,18px); line-height:1.7; margin:0; padding:0 4px 22px; }
        .faq-more{ display:flex; align-items:center; gap:8px; margin:24px auto 0; height:48px; padding:0 22px; border-radius:999; border:1.5px solid rgba(19,21,25,0.16); background:#fff; color:${CHARCOAL}; font-family:inherit; font-weight:700; font-size:16px; cursor:pointer; transition: transform .18s ease, box-shadow .18s ease; }
        .faq-more:hover{ transform: translateY(-1px); box-shadow:0 8px 20px rgba(19,21,25,0.10); }
        .faq-more:active{ transform: scale(0.98); }
        .faq-more .faq-chev{ transition: transform .4s cubic-bezier(.34,1.56,.64,1); }
        @media (prefers-reduced-motion: reduce){ .faq-chev, .faq-more{ transition:none; } }
      `}</style>

      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <RevealBlock style={{ color: "#C24A2C", fontWeight: 700, fontSize: 13, letterSpacing: "-0.01em", margin: "0 0 8px", textAlign: "center" }}>לפני ששואלים</RevealBlock>
        <RevealHeading
          as="h2"
          amount={0.2}
          style={{
            color: CHARCOAL,
            fontSize: "clamp(28px,4vw,46px)",
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: "-0.025em",
            margin: "0 0 12px",
            textAlign: "center",
          }}
        >
          שאלות <span style={{ color: "#C24A2C" }}>נפוצות</span>
        </RevealHeading>

        <div style={{ marginTop: 24 }}>
          {featured.map((item) => <FAQItem key={item.q} item={item} index={FAQ_ITEMS.indexOf(item)} />)}
        </div>

        {/* Shared content is in the initial build artifact and the React tree.
            React's root replaces that fallback; it is not a second screen-reader copy. */}
        <motion.div
          id="faq-additional"
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
          style={{ overflow: "hidden" }}
          inert={open ? undefined : ""}
        >
          <div>
            {rest.map((item) => <FAQItem key={item.q} item={item} index={FAQ_ITEMS.indexOf(item)} />)}
          </div>
        </motion.div>

        <button type="button" className="faq-more" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="faq-additional">
          {open ? "פחות שאלות" : "עוד שאלות"}
          <ChevronDown className="faq-chev" size={20} strokeWidth={2.4} aria-hidden="true" style={{ transform: open ? "rotate(180deg)" : "none" }} />
        </button>
      </div>
    </section>
  );
}