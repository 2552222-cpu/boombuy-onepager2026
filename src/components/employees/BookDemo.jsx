import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

const BG = "#F7F7F4";
const CHARCOAL = "#17191D";
const WHITE = "#FFFFFF";
const EASE = [0.22, 1, 0.36, 1];
const WA_NUMBER = "972542552222";

// Automatic booking is TEMPORARILY OFF.
//
// The connected calendar grants the email scope only, so availability cannot be
// verified and no meeting can be created or confirmed. Rather than showing a
// confirmation that was never validated, this panel now simply confirms that the
// details were received and says we will schedule the intro call ourselves.
// The calendar flow (getAvailableDays → getDaySlots → bookMeeting) stays in the
// codebase and can be restored once the connector is re-authorised with the
// calendar.events scope; bookMeeting refuses to book until then.
export default function BookDemo() {
  const [lead, setLead] = useState(null);

  useEffect(() => {
    const onFit = (e) => {
      const detail = e.detail || {};
      setLead({ orgName: detail.orgName || "" });
      try {
        base44.analytics.track({ eventName: "contact_request_saved" });
      } catch (err) {
        /* analytics must never break the confirmation */
      }
    };
    window.addEventListener("boom_fit_submitted", onFit);
    return () => window.removeEventListener("boom_fit_submitted", onFit);
  }, []);

  if (!lead) return null;

  const waText = encodeURIComponent(
    `היי, מילאתי בדיקת התאמה ל${lead.orgName || "ארגון"}, אשמח לתאם שיחה`
  );

  return (
    <section
      id="book-demo"
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
      <style>{`@media (max-width:768px){ #book-demo{ scroll-margin-top:72px; padding-left:16px !important; padding-right:16px !important; } }`}</style>
      <div style={{ maxWidth: 620, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            background: WHITE,
            borderRadius: 28,
            padding: "36px 28px",
            boxShadow: "0 18px 50px rgba(19,21,25,0.10)",
            border: "1px solid rgba(19,21,25,0.06)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "#E6F4EC",
              margin: "0 auto 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-hidden="true"
          >
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#1A7A43", display: "inline-block" }} />
          </div>

          <h2
            style={{
              color: CHARCOAL,
              fontSize: "clamp(24px,3vw,32px)",
              fontWeight: 700,
              margin: "0 0 10px",
              letterSpacing: "-0.02em",
            }}
          >
            הפרטים התקבלו.
          </h2>
          <p style={{ color: "#3A3C42", fontSize: 17, lineHeight: 1.6, margin: "0 0 24px" }}>
            נחזור אליכם לתיאום שיחת היכרות.
          </p>

          <a
            href={`https://wa.me/${WA_NUMBER}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bb-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#25D366",
              color: "#fff",
              borderRadius: 999,
              height: 52,
              padding: "0 24px",
              fontWeight: 700,
              fontSize: 16,
              textDecoration: "none",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
            לתיאום מהיר בוואטסאפ
          </a>
        </motion.div>
      </div>
    </section>
  );
}