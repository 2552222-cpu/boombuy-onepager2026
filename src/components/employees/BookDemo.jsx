import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { trackLinkedInConversion } from "@/lib/linkedin";
import { LINKEDIN_CONV_MEETING } from "@/lib/siteConfig";

const BG = "#F7F7F4";
const CHARCOAL = "#17191D";
const CORAL = "#F47A5A";
const WHITE = "#FFFFFF";
const EASE = [0.22, 1, 0.36, 1];
const WA_NUMBER = "972542552222";

// One stable id per booking attempt, kept for the whole browser session: a retry
// after a dropped network or a partial failure sends the SAME id, so the server
// completes the booking it already started instead of creating a second meeting.
function bookingRequestId(sessionId, slotStart) {
  const key = `boom_booking_req:${sessionId}:${slotStart}`;
  try {
    const saved = sessionStorage.getItem(key);
    if (saved) return saved;
    const raw = typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `r${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const id = raw.replace(/[^A-Za-z0-9-]/g, "").slice(0, 64);
    sessionStorage.setItem(key, id);
    return id;
  } catch {
    return `r${Date.now()}-${Math.random().toString(36).slice(2)}`.replace(/[^A-Za-z0-9-]/g, "").slice(0, 64);
  }
}

function clearBookingRequestId(sessionId, slotStart) {
  try {
    sessionStorage.removeItem(`boom_booking_req:${sessionId}:${slotStart}`);
  } catch {
    /* ignore */
  }
}

export default function BookDemo() {
  const [revealed, setRevealed] = useState(false);
  const [lead, setLead] = useState({ sessionId: "", orgName: "" });
  const [days, setDays] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [step, setStep] = useState("day");
  const [loadingDays, setLoadingDays] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [booking, setBooking] = useState(false);
  const [done, setDone] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");
  const failed = !!failureMessage;

  useEffect(() => {
    const onFit = (e) => {
      const d = e.detail || {};
      setLead({ sessionId: d.sessionId || "", orgName: d.orgName || "" });
      setRevealed(true);
    };
    window.addEventListener("boom_fit_submitted", onFit);
    return () => window.removeEventListener("boom_fit_submitted", onFit);
  }, []);

  const loadDays = useCallback(async () => {
    setFailureMessage("");
    setLoadingDays(true);
    setDays([]);
    setSlots([]);
    setSelectedDay(null);
    setSelectedSlot(null);
    setStep("day");
    try {
      const res = await base44.functions.invoke("getAvailableDays", {});
      if (res.data?.error || !Array.isArray(res.data?.days)) throw new Error("calendar_unavailable");
      setDays(res.data.days);
    } catch {
      setFailureMessage("חיבור היומן אינו זמין כרגע, ולכן לא נקבעה פגישה. הפרטים שמסרתם נשמרו ונחזור אליכם לתיאום.");
    } finally {
      setLoadingDays(false);
    }
  }, []);

  useEffect(() => {
    if (!revealed) return;
    try { base44.analytics.track({ eventName: "calendar_opened" }); } catch (e) {}
    loadDays();
  }, [revealed, loadDays]);

  const pickDay = async (date) => {
    setSelectedDay(date);
    setSelectedSlot(null);
    setStep("time");
    setLoadingSlots(true);
    try {
      const res = await base44.functions.invoke("getDaySlots", { date });
      if (res.data?.error || !Array.isArray(res.data?.slots)) throw new Error("calendar_unavailable");
      setSlots(res.data.slots);
    } catch {
      setSlots([]);
      setFailureMessage("חיבור היומן אינו זמין כרגע, ולכן לא נקבעה פגישה. הפרטים שמסרתם נשמרו ונחזור אליכם לתיאום.");
    } finally {
      setLoadingSlots(false);
    }
  };

  // Every failure ends in the contact-request state: the visitor is never told a
  // meeting was set unless the server confirmed a real calendar event.
  const failText = (code) => {
    if (code === "slot_taken") return "הזמן שנבחר כבר נתפס. נא לבחור מועד אחר.";
    if (code === "calendar_unavailable") return "חיבור היומן אינו זמין כרגע, ולכן לא נקבעה פגישה. הפרטים שמסרתם נשמרו ונחזור אליכם לתיאום.";
    if (code === "booking_partial") return "הפגישה נוצרה ביומן אך שמירת הפרטים לא הושלמה. נסו שוב — המערכת תשלים את השמירה ולא תקבע פגישה נוספת.";
    return "לא נקבעה פגישה. הפרטים שמסרתם נשמרו ונחזור אליכם לתיאום.";
  };

  const book = async () => {
    if (!selectedSlot || !lead.sessionId) return;
    setBooking(true);
    const requestId = bookingRequestId(lead.sessionId, selectedSlot.start);
    try {
      const res = await base44.functions.invoke("bookMeeting", { sessionId: lead.sessionId, start: selectedSlot.start, requestId });
      if (res.data?.ok) {
        clearBookingRequestId(lead.sessionId, selectedSlot.start);
        setDone(true);
        setStep("done");
        try { base44.analytics.track({ eventName: "meeting_booked" }); } catch (e) {}
        try { trackLinkedInConversion(LINKEDIN_CONV_MEETING); } catch (e) {}
      } else {
        if (res.data?.error === "slot_taken") clearBookingRequestId(lead.sessionId, selectedSlot.start);
        setFailureMessage(failText(res.data?.error));
      }
    } catch (e) {
      const code = e.response?.data?.error;
      if (code === "slot_taken") clearBookingRequestId(lead.sessionId, selectedSlot.start);
      setFailureMessage(failText(code));
    } finally {
      setBooking(false);
    }
  };

  if (!revealed) return null;

  const waText = encodeURIComponent(`היי, מילאתי בדיקת התאמה ל${lead.orgName || "ארגון"}, אשמח לתאם שיחה`);

  const dayBtn = (d) => ({
    background: selectedDay === d.date ? CHARCOAL : WHITE,
    color: selectedDay === d.date ? "#fff" : CHARCOAL,
    border: selectedDay === d.date ? "none" : "1.5px solid rgba(23,25,29,0.14)",
  });
  const slotBtn = (s) => ({
    background: selectedSlot?.start === s.start ? CORAL : WHITE,
    color: selectedSlot?.start === s.start ? "#fff" : CHARCOAL,
    border: selectedSlot?.start === s.start ? "none" : "1.5px solid rgba(23,25,29,0.14)",
  });

  const baseBtn = { borderRadius: 16, height: 54, fontFamily: "inherit", fontWeight: 700, fontSize: 15, cursor: "pointer" };

  return (
    <section id="book-demo" dir="rtl" className="bb-section" style={{ background: BG, paddingLeft: 20, paddingRight: 20, fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif", scrollMarginTop: 90 }}>
      <style>{`@media (max-width:768px){ #book-demo{ scroll-margin-top:72px; padding-left:16px !important; padding-right:16px !important; } } @keyframes bd-spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ maxWidth: 620, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} style={{ background: WHITE, borderRadius: 28, padding: "36px 28px", boxShadow: "0 18px 50px rgba(19,21,25,0.10)", border: "1px solid rgba(19,21,25,0.06)" }}>
          <h2 style={{ color: CHARCOAL, fontSize: "clamp(24px,3vw,32px)", fontWeight: 700, textAlign: "center", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
            {done ? "נקבע." : "בוחרים שיחת הדגמה"}
          </h2>
          <p style={{ color: "#6E7177", fontSize: 16, textAlign: "center", margin: "0 0 24px" }}>
            {done ? "הזמנה ליומן וקישור לשיחה בדרך אליכם." : "15 דקות, אונליין, בזמן שנוח לכם."}
          </p>

          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#E6F4EC", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#1A7A43", display: "inline-block" }} />
                </div>
                <p style={{ color: CHARCOAL, fontSize: 18, fontWeight: 700, margin: 0 }}>הפגישה נקבעה בהצלחה.</p>
              </motion.div>
            ) : failed ? (
              <motion.div key="wa" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center" }}>
                <p role="alert" style={{ color: "#3A3C42", fontSize: 15, margin: "0 0 16px" }}>{failureMessage}</p>
                <button type="button" onClick={loadDays} className="block mx-auto mb-4 rounded-full border border-border px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">לנסות שוב</button>
                <a href={`https://wa.me/${WA_NUMBER}?text=${waText}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#25D366", color: "#fff", borderRadius: 999, height: 52, padding: "0 24px", fontWeight: 700, fontSize: 16, textDecoration: "none" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /></svg>
                  תיאום בוואטסאפ
                </a>
              </motion.div>
            ) : step === "day" ? (
              <motion.div key="day" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <p style={{ color: CHARCOAL, fontSize: 17, fontWeight: 700, textAlign: "center", margin: "0 0 16px" }}>איזה יום נוח לכם?</p>
                {loadingDays ? (
                  <div style={{ display: "flex", justifyContent: "center" }}><span style={{ width: 28, height: 28, borderRadius: "50%", border: "3px solid rgba(19,21,25,0.12)", borderTopColor: CORAL, animation: "bd-spin 0.8s linear infinite", display: "inline-block" }} /></div>
                ) : days.length === 0 ? (
                  <p role="status" style={{ color: "#6E7177", fontSize: 15, textAlign: "center" }}>אין כרגע מועדים פנויים בחלון ההזמנות.</p>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px,1fr))", gap: 10 }}>
                    {days.map((d) => (
                      <button key={d.date} type="button" onClick={() => pickDay(d.date)} style={{ ...baseBtn, ...dayBtn(d) }}>{d.label}</button>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div key="time" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <p style={{ color: CHARCOAL, fontSize: 17, fontWeight: 700, textAlign: "center", margin: "0 0 16px" }}>בחרו שעה</p>
                {loadingSlots ? (
                  <div style={{ display: "flex", justifyContent: "center" }}><span style={{ width: 28, height: 28, borderRadius: "50%", border: "3px solid rgba(19,21,25,0.12)", borderTopColor: CORAL, animation: "bd-spin 0.8s linear infinite", display: "inline-block" }} /></div>
                ) : slots.length === 0 ? (
                  <p style={{ color: "#6E7177", fontSize: 15, textAlign: "center" }}>אין חלונות פנויים ביום זה. בחרו יום אחר.</p>
                ) : (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
                    {slots.map((s) => (
                      <button key={s.start} type="button" onClick={() => setSelectedSlot(s)} style={{ ...baseBtn, ...slotBtn(s), minWidth: 110, fontSize: 16 }}>{s.label}</button>
                    ))}
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
                  <button type="button" onClick={() => { setStep("day"); setSelectedSlot(null); }} style={{ background: "none", border: "none", color: "#6E7177", fontFamily: "inherit", fontSize: 15, cursor: "pointer", textDecoration: "underline" }}>יום אחר</button>
                  <button type="button" className="bb-btn" onClick={book} disabled={!selectedSlot || booking} style={{ background: selectedSlot && !booking ? CHARCOAL : "rgba(19,21,25,0.5)", color: "#fff", border: "none", borderRadius: 999, height: 52, padding: "0 28px", fontFamily: "inherit", fontWeight: 700, fontSize: 16, cursor: selectedSlot && !booking ? "pointer" : "wait" }}>
                    {booking ? "מקבע…" : "קבעו לי"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}