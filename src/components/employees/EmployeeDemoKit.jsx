import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { EMPLOYEE_DEMO_URL, isEmployeeDemoConfigured } from "@/lib/siteConfig";

const BG = "#F7F7F4";
const CHARCOAL = "#17191D";
const CORAL = "#F47A5A";
const EASE = [0.22, 1, 0.36, 1];

// Slim, low-presence band — placed right before the organization-fit CTA.
// As a B2B consumer-behavior call: testimonials build desire, this line offers
// a self-serve "try before you commit" bridge for still-hesitant buyers, then
// the fit questionnaire captures the lead. No image — the welcome experience
// lives on the demo itself (a <3-min onboarding flow).
export default function EmployeeDemoKit() {
  const sectionRef = useRef(null);
  const firedView = useRef(false);
  const firedOpen = useRef(false);
  const configured = isEmployeeDemoConfigured();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !firedView.current) {
            firedView.current = true;
            try {
              base44.analytics.track({ eventName: "employee_demo_viewed" });
            } catch (err) {
              /* ignore */
            }
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onOpen = () => {
    if (!configured) return;
    if (!firedOpen.current) {
      firedOpen.current = true;
      try {
        base44.analytics.track({ eventName: "employee_demo_opened" });
      } catch (err) {
        /* ignore */
      }
    }
    window.open(EMPLOYEE_DEMO_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="employee-demo-kit"
      ref={sectionRef}
      dir="rtl"
      style={{
        background: BG,
        padding: "40px 24px",
        fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif",
        scrollMarginTop: 90,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="edk-band"
        style={{
          maxWidth: 940,
          margin: "0 auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 26,
          flexWrap: "wrap",
          textAlign: "center",
        }}
      >
        <div style={{ flex: "1 1 380px", minWidth: 260 }}>
          <p style={{ color: CORAL, fontWeight: 600, fontSize: "clamp(15px,1.3vw,18px)", margin: 0, letterSpacing: "-0.01em", lineHeight: 1.4 }}>
            לא השתכנעת?
          </p>
          <h2 style={{ color: CHARCOAL, fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.025em", margin: "8px 0 0" }}>
            ראו את המערכת <span style={{ color: CORAL }}>מעיני העובד</span> — בעוד פחות מ-3 דקות
          </h2>
        </div>

        <button
          type="button"
          onClick={onOpen}
          disabled={!configured}
          style={{
            background: configured ? CHARCOAL : "rgba(19,21,25,0.25)",
            color: "#fff",
            border: "none",
            borderRadius: 999,
            height: 56,
            minWidth: 220,
            padding: "0 28px",
            fontFamily: "inherit",
            fontWeight: 700,
            fontSize: "clamp(16px,1.1vw,18px)",
            cursor: configured ? "pointer" : "not-allowed",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            boxShadow: "0 8px 24px rgba(19,21,25,0.18)",
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: CORAL, display: "inline-block", flexShrink: 0 }} />
          להתנסות כמו עובד
        </button>

        {!configured && (
          <span style={{ fontSize: 13, color: "#9AA0A6", background: "rgba(19,21,25,0.05)", borderRadius: 999, padding: "6px 12px" }}>
            נדרש קישור לערכה
          </span>
        )}
      </motion.div>

      <style>{`
        @media (max-width:768px){
          #employee-demo-kit{ scroll-margin-top:72px; padding:34px 20px; }
          .edk-band{ flex-direction:column; gap:18px; }
        }
      `}</style>
    </section>
  );
}