import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { EMPLOYEE_DEMO_URL, isEmployeeDemoConfigured } from "@/lib/siteConfig";

const BG = "#F7F7F4";
const CHARCOAL = "#17191D";
const CORAL = "#F47A5A";
const FRAME_BG = "#FFFFFF";
const EASE = [0.22, 1, 0.36, 1];

const POINTS = [
  "חוויה ממותגת בשם הארגון",
  "חיסכון שנתי שמחושב לעובד",
  "ערך שממשיך להתגלות לאורך כל השנה",
];

export default function EmployeeDemoKit() {
  const sectionRef = useRef(null);
  const firedView = useRef(false);
  const firedOpen = useRef(false);
  const [reduced, setReduced] = useState(false);
  const configured = isEmployeeDemoConfigured();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onMq = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", onMq);
    return () => mq.removeEventListener?.("change", onMq);
  }, []);

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

  const hy = reduced ? 0 : 18;

  return (
    <section
      id="employee-demo-kit"
      ref={sectionRef}
      dir="rtl"
      style={{
        background: BG,
        padding: "80px 20px 88px",
        fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif",
        scrollMarginTop: 90,
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div
          style={{
            background: FRAME_BG,
            borderRadius: 28,
            border: "1px solid rgba(19,21,25,0.08)",
            boxShadow: "0 24px 70px rgba(19,21,25,0.08)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
          }}
        >
          {/* Explanation side */}
          <div style={{ flex: "1 1 52%", padding: "clamp(28px,4vw,56px)", boxSizing: "border-box" }}>
            <motion.p
              initial={{ opacity: 0, y: hy }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{ color: CORAL, fontWeight: 600, fontSize: "clamp(15px,1.2vw,18px)", margin: 0, letterSpacing: "-0.01em" }}
            >
              עכשיו אפשר להרגיש את זה בעצמך
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: hy }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.06 }}
              style={{
                color: CHARCOAL,
                fontSize: "clamp(28px,3.4vw,44px)",
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                margin: "12px 0 0",
              }}
            >
              ראו את בום ביי
              <br />
              דרך העיניים של <span style={{ color: CORAL }}>העובד</span>.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: hy }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.14 }}
              style={{
                color: "#3A3C42",
                fontSize: "clamp(16px,1.3vw,19px)",
                fontWeight: 400,
                lineHeight: 1.65,
                margin: "20px 0 0",
                maxWidth: 480,
              }}
            >
              התנסו בחוויית ההצטרפות וראו איך העובדים מגלים את ההטבות, החיסכון והערך שהארגון מעניק להם.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: hy }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.22 }}
              style={{ listStyle: "none", padding: 0, margin: "26px 0 0", display: "flex", flexDirection: "column", gap: 12 }}
            >
              {POINTS.map((p) => (
                <li key={p} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: "clamp(16px,1.2vw,18px)", color: CHARCOAL, fontWeight: 500 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: CORAL, flex: "0 0 auto" }} />
                  {p}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: hy }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
              style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}
            >
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
                  minWidth: 240,
                  maxWidth: 360,
                  padding: "0 30px",
                  fontFamily: "inherit",
                  fontWeight: 700,
                  fontSize: "clamp(16px,1.1vw,18px)",
                  cursor: configured ? "pointer" : "not-allowed",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: CORAL, display: "inline-block", flexShrink: 0 }} />
                להתנסות כמו עובד
              </button>

              {/* Preview-only missing-link notice — not shown on the public site once configured */}
              {!configured && (
                <span
                  style={{
                    fontSize: 13,
                    color: "#9AA0A6",
                    background: "rgba(19,21,25,0.05)",
                    borderRadius: 999,
                    padding: "6px 12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  נדרש קישור לערכה
                </span>
              )}
            </motion.div>
          </div>

          {/* Preview side — neutral placeholder (no real join-kit asset exists yet) */}
          <div
            style={{
              flex: "1 1 48%",
              background: "linear-gradient(160deg, #F2F1EE 0%, #E9E7E2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(24px,3vw,40px)",
              boxSizing: "border-box",
              minHeight: 320,
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 300,
                aspectRatio: "9 / 16",
                borderRadius: 28,
                background: "#fff",
                border: "1px solid rgba(19,21,25,0.08)",
                boxShadow: "0 20px 50px rgba(19,21,25,0.12)",
                padding: 18,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ height: 14, width: "55%", borderRadius: 999, background: CORAL }} />
              <div style={{ height: 10, width: "80%", borderRadius: 999, background: "rgba(19,21,25,0.12)" }} />
              <div style={{ flex: 1, borderRadius: 16, background: "linear-gradient(160deg,#F4F3F0,#ECEAE5)" }} />
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ height: 10, flex: 1, borderRadius: 999, background: "rgba(19,21,25,0.10)" }} />
                <div style={{ height: 10, flex: 1, borderRadius: 999, background: "rgba(244,122,90,0.35)" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width:768px){
          #employee-demo-kit{ scroll-margin-top:72px; padding:64px 16px 72px; }
        }
        @media (max-width:860px){
          #employee-demo-kit > div > div{ flex-direction:column !important; }
        }
      `}</style>
    </section>
  );
}