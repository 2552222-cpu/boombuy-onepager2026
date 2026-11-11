import React from "react";
import GlobalHeader from "../components/employees/GlobalHeader";
import GlobalFooter from "../components/employees/GlobalFooter";

const CHARCOAL = "#17191D";
const BODY = "#3A3C42";

// Title, description, canonical, OG and structured data for this route are applied
// centrally by SeoManager, which owns the head on every entry and navigation.
export default function Privacy() {
  return (
    <div dir="rtl" style={{ background: "#FBFAF8", minHeight: "100vh", fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif" }}>
      <GlobalHeader />
      <main id="main-content" tabIndex={-1} style={{ maxWidth: 760, margin: "0 auto", padding: "64px 20px 80px", color: CHARCOAL }}>
        <h1 style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 24px" }}>
          מדיניות פרטיות
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: 28, color: BODY, fontSize: 16, lineHeight: 1.7 }}>
          <section>
            <h2 style={{ color: CHARCOAL, fontSize: 20, fontWeight: 700, margin: "0 0 10px" }}>אילו פרטים נאספים</h2>
            <p style={{ margin: 0 }}>בטופס בדיקת ההתאמה אנו אוספים: שם מלא, שם הארגון, טלפון, כתובת מייל, תשובות הבדיקה (גודל ארגון, מצב רווחה, מטרת שדרוג) ומקור ההגעה לאתר.</p>
          </section>

          <section>
            <h2 style={{ color: CHARCOAL, fontSize: 20, fontWeight: 700, margin: "0 0 10px" }}>מטרת השימוש</h2>
            <p style={{ margin: 0 }}>הפרטים נאספים כדי ליצור איתכם קשר ולתאם שיחת הדגמה. הפרטים נשמרים במערכות שלנו ובספקים שמשמשים אותנו לתפעול (כמו Google לתיאום פגישות), ולא נמסרים לגורם אחר לשיווק מטעמו.</p>
          </section>

          <section>
            <h2 style={{ color: CHARCOAL, fontSize: 20, fontWeight: 700, margin: "0 0 10px" }}>Google Calendar</h2>
            <p style={{ margin: 0 }}>הטופס באתר מעביר לצוות בקשה לתיאום שיחה; הוא אינו קובע פגישה אוטומטית. לאחר תיאום איתכם, הצוות יכול להשתמש ב־Google Calendar לצורך שליחת הזמנה, הכוללת את המועד שסוכם ואת כתובת המייל שלכם.</p>
          </section>

          <section>
            <h2 style={{ color: CHARCOAL, fontSize: 20, fontWeight: 700, margin: "0 0 10px" }}>כלי מדידה ופרסום</h2>
            <p style={{ margin: 0 }}>אנו שומרים את מקור ההגעה שנלווה לפנייה כדי להבין מאיזה ערוץ הגעתם. תג המעקב של LinkedIn אינו פעיל כעת באתר. אם יופעלו כלי מעקב נוספים, נעדכן את המידע עליהם ואת מנגנון הבחירה הנדרש.</p>
          </section>

          <section>
            <h2 style={{ color: CHARCOAL, fontSize: 20, fontWeight: 700, margin: "0 0 10px" }}>הזכויות שלכם</h2>
            <p style={{ margin: 0 }}>יש לכם זכות לבקש לעיין במידע שנאסף עליכם או למחוק אותו. לכל בקשה ניתן לפנות אלינו בכתובת support@boombuy.co.il.</p>
          </section>
        </div>
      </main>
      <GlobalFooter />
    </div>
  );
}