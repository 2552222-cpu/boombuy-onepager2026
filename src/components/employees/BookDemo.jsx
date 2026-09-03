import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import {
  GOOGLE_CALENDAR_BOOKING_URL,
  GOOGLE_CALENDAR_EMBED,
  isCalendarConfigured,
} from "@/lib/siteConfig";

const BG = "#F7F7F4";
const CHARCOAL = "#17191D";
const CORAL = "#F47A5A";
const WHITE = "#FFFFFF";
const EASE = [0.22, 1, 0.36, 1];

export default function BookDemo() {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [thankYou, setThankYou] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const firedCalendar = useRef(false);
  const firedMeeting = useRef(false);

  const configured = isCalendarConfigured();
  const embed = GOOGLE_CALENDAR_EMBED;

  // Reveal the calendar area once the fit questionnaire has been submitted.
  useEffect(() => {
    const onFit = () => {
      setRevealed(true);
    };
    window.addEventListener("boom_fit_submitted", onFit);
    return () => window.removeEventListener("boom_fit_submitted", onFit);
  }, []);

  // Fire calendar_opened once the calendar is actually presented to the user.
  useEffect(() => {
    if (!revealed) return;
    if (!firedCalendar.current) {
      firedCalendar.current = true;
      try {
        base44.analytics.track({ eventName: "calendar_opened" });
      } catch (err) {
        /* ignore */
      }
    }
    // promote the saved lead status to calendar_opened (best-effort)
    try {
      const sid = window.localStorage.getItem("boom_fit_session");
      if (sid) {
        base44.entities.OrganizationFitLead.filter({ sessionId: sid }).then((rows) => {
          if (rows && rows.length > 0) {
            base44.entities.OrganizationFitLead.update(rows[0].id, { status: "calendar_opened" });
          }
        });
      }
    } catch (err) {
      /* ignore */
    }
  }, [revealed]);

  // meeting_booked: only on a real confirmation. We support a return-URL signal
  // (?meeting_booked=1) that a scheduler confirmation page can redirect to.
  // Without such a callback, the event stays inactive (do NOT fire on click).
  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      if (p.get("meeting_booked") === "1" && !firedMeeting.current) {
        firedMeeting.current = true;
        setThankYou(true);
        try {
          base44.analytics.track({ eventName: "meeting_booked" });
        } catch (err) {
          /* ignore */
        }
        try {
          const sid = window.localStorage.getItem("boom_fit_session");
          if (sid) {
            base44.entities.OrganizationFitLead.filter({ sessionId: sid }).then((rows) => {
              if (rows && rows.length > 0) {
                base44.entities.OrganizationFitLead.update(rows[0].id, { status: "meeting_booked" });
              }
            });
          }
        } catch (err) {
          /* ignore */
        }
        // notify persistent CTA to hide
        window.dispatchEvent(new CustomEvent("boom_meeting_booked"));
      }
    } catch (err) {
      /* ignore */
    }
  }, []);

  const openScheduler = () => {
    if (!configured) return;
    window.open(GOOGLE_CALENDAR_BOOKING_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="book-demo"
      ref={sectionRef}
      dir="rtl"
      style={{
        background: BG,
        padding: "84px 20px 96px",
        fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif",
        scrollMarginTop: 90,
      }}
    >
      <style>{`
        @media (max-width:768px){ #book-demo{ scroll-margin-top:72px; padding:64px 16px 72px; } }
      `}</style>

      <div style={{ maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{
            color: CHARCOAL,
            fontSize: "clamp(30px,4vw,54px)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            margin: 0,
          }}
        >
          15 דקות.
          <br />
          ותראו איך זה <span style={{ color: CORAL }}>נראה אצלכם</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
          style={{ color: "#3A3C42", fontSize: "clamp(17px,1.4vw,21px)", lineHeight: 1.6, margin: "20px auto 0", maxWidth: 640 }}
        >
          נכיר את הארגון, נראה את המערכת ונציג אפשרות שמתאימה לצרכים שלכם.
        </motion.p>

        <AnimatePresence mode="wait">
          {thankYou ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: EASE }}
              style={{ maxWidth: 560, margin: "40px auto 0", padding: "44px 32px", background: WHITE, borderRadius: 24, border: "1px solid rgba(244,122,90,0.35)", boxShadow: "0 18px 50px rgba(244,122,90,0.12)" }}
            >
              <h3 style={{ color: CHARCOAL, fontSize: "clamp(26px,3vw,36px)", fontWeight: 700, margin: "0 0 12px", letterSpacing: "-0.02em" }}>
                מעולה. הפגישה ביומן.
              </h3>
              <p style={{ color: "#3A3C42", fontSize: "clamp(17px,1.3vw,20px)", lineHeight: 1.6, margin: "0 0 24px" }}>
                שלחנו אליכם אישור במייל. נתראה בהדגמה.
              </p>
              <button
                type="button"
                onClick={() => {
                  setThankYou(false);
                  try {
                    const u = new URL(window.location.href);
                    u.searchParams.delete("meeting_booked");
                    window.history.replaceState({}, document.title, u.toString());
                  } catch (e) {
                    /* ignore */
                  }
                }}
                style={{ background: CHARCOAL, color: "#fff", border: "none", borderRadius: 999, height: 52, padding: "0 28px", fontFamily: "inherit", fontWeight: 700, fontSize: 16, cursor: "pointer" }}
              >
                לחזור לעמוד
              </button>
            </motion.div>
          ) : !revealed ? (
            <motion.p
              key="pending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ marginTop: 40, color: "#9AA0A6", fontSize: 16 }}
            >
              סיימו את שאלון ההתאמה ובחירת המועד תיפתח כאן.
            </motion.p>
          ) : !configured ? (
            <motion.div
              key="unconfigured"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: EASE }}
              style={{ maxWidth: 560, margin: "40px auto 0", padding: "36px 28px", background: "rgba(19,21,25,0.04)", borderRadius: 24, border: "1px dashed rgba(19,21,25,0.18)" }}
            >
              <p style={{ color: CHARCOAL, fontSize: 17, fontWeight: 600, margin: "0 0 8px" }}>
                היומן יופיע כאן ברגע שיוגדר קישור.
              </p>
              <p style={{ color: "#9AA0A6", fontSize: 15, margin: 0 }}>
                נדרש GOOGLE_CALENDAR_BOOKING_URL בהגדרות האתר.
              </p>
            </motion.div>
          ) : embed ? (
            <motion.div
              key="iframe"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: EASE }}
              style={{ marginTop: 40 }}
            >
              {iframeLoading && (
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                  <span style={{ width: 28, height: 28, borderRadius: "50%", border: "3px solid rgba(19,21,25,0.12)", borderTopColor: CORAL, animation: "bd-spin 0.8s linear infinite", display: "inline-block" }} />
                </div>
              )}
              <iframe
                src={GOOGLE_CALENDAR_BOOKING_URL}
                title="קביעת הדגמה"
                onLoad={() => setIframeLoading(false)}
                style={{
                  width: "100%",
                  minWidth: "100%",
                  height: "min(78vh, 760px)",
                  border: "1px solid rgba(19,21,25,0.10)",
                  borderRadius: 24,
                  background: WHITE,
                  boxSizing: "border-box",
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="button"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: EASE }}
              style={{ marginTop: 44, display: "flex", justifyContent: "center" }}
            >
              <button
                type="button"
                onClick={openScheduler}
                style={{
                  background: CHARCOAL, color: "#fff", border: "none", borderRadius: 999, height: 60,
                  minWidth: 260, maxWidth: 380, padding: "0 32px", fontFamily: "inherit",
                  fontWeight: 700, fontSize: "clamp(17px,1.2vw,19px)", cursor: "pointer",
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                  boxShadow: "0 12px 32px rgba(23,25,29,0.20)",
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: CORAL, display: "inline-block", flexShrink: 0 }} />
                לבחירת שעה ביומן
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`@keyframes bd-spin{to{transform:rotate(360deg)}}`}</style>
    </section>
  );
}