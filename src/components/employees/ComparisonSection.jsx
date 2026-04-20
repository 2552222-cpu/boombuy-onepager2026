import React, { useState, useEffect } from "react";

const BOOMBUY_PROS = [
  { label: "חופש בחירה:", text: "העובד נהנה מ-כמה מתנות לחג ו/או תו לסופר." },
  { label: "מעורבות שיא:", text: "גישה קבועה להטבות מרגשות 365 ימים בשנה." },
  { label: "הגדלת שכר נטו:", text: "הוזלה קבועה בסל הצריכה והסופר (ללא סבסוד מעסיק)." },
  { label: "מקסימום ערך:", text: "0 תוספת תקציב — אפס נטל תפעולי לארגון." },
];

const TRADITIONAL_CONS = [
  { label: "בחירה מוגבלת:", text: "מתנה אחת או תו קנייה יחיד לרוב." },
  { label: "מעורבות נמוכה:", text: "מספר נגיעות מצומצם עם העובד בשנה." },
  { label: "עומס תפעולי:", text: "ניהול לוגיסטיקה, אקסלים וכיבוי שריפות בחגים." },
  { label: "0 אימפקט על השכר:", text: "ההטבה נגמרת ברגע קנייה בחנות." },
];

export default function ComparisonSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section dir="rtl" style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.06)", padding: isMobile ? "60px 20px" : "80px 20px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? "40px" : "56px" }}>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, color: "#1D1D1F", letterSpacing: "-0.035em", margin: "0 0 14px", fontFamily: "var(--font-heebo)" }}>
            אותו תקציב — רק{" "}
            <span style={{ color: "#0055CC" }}>ממוקסם.</span>
          </h2>
          <p style={{ fontSize: "clamp(15px, 2vw, 17px)", color: "#6E6E73", maxWidth: 520, margin: "0 auto", lineHeight: 1.65 }}>
            אנחנו מחליפים את הנטל התפעולי והבחירה המוגבלת בחוויית עובד חכמה שמשדרגת את הנטו הריאלי.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px", alignItems: "start" }}>

          {/* BoomBuy Pro Card */}
          <div style={{ position: "relative", background: "#fff", border: "2px solid #0055CC", borderRadius: "24px", padding: "32px 28px", boxShadow: "0 8px 32px rgba(0,85,204,0.12)" }}>
            {/* Badge */}
            <div style={{ position: "absolute", top: "-16px", left: "50%", transform: "translateX(-50%)" }}>
              <span style={{ background: "#0055CC", color: "#fff", fontSize: 12, fontWeight: 800, padding: "5px 16px", borderRadius: 999, whiteSpace: "nowrap", letterSpacing: "0.02em" }}>
                הסטנדרט של Boombuy
              </span>
            </div>

            <h3 style={{ fontSize: 22, fontWeight: 900, color: "#1D1D1F", marginBottom: 24, letterSpacing: "-0.02em", textAlign: "center" }}>
              BoomBuy Pro
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {BOOMBUY_PROS.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: "rgba(0,85,204,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#0055CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <p style={{ margin: 0, fontSize: 15, color: "#1D1D1F", lineHeight: 1.6 }}>
                    <strong>{item.label}</strong>{" "}{item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Traditional Card */}
          <div style={{ background: "#F5F5F7", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "24px", padding: "32px 28px" }}>
            <h3 style={{ fontSize: 22, fontWeight: 900, color: "#6E6E73", marginBottom: 24, letterSpacing: "-0.02em", textAlign: "center" }}>
              המודל המסורתי
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {TRADITIONAL_CONS.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: "rgba(200,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="#CC0000" strokeWidth="2" strokeLinecap="round"/></svg>
                  </span>
                  <p style={{ margin: 0, fontSize: 15, color: "#6E6E73", lineHeight: 1.6 }}>
                    <strong style={{ color: "#4A4A4F" }}>{item.label}</strong>{" "}{item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}