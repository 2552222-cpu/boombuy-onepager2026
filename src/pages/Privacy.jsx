import React, { useEffect } from "react";
import GlobalHeader from "../components/employees/GlobalHeader";
import GlobalFooter from "../components/employees/GlobalFooter";

const CHARCOAL = "#17191D";
const BODY = "#3A3C42";

export default function Privacy() {
  useEffect(() => {
    document.title = "מדיניות פרטיות · boombuy";
    let m = document.querySelector('meta[name="robots"]');
    if (!m) { m = document.createElement("meta"); m.name = "robots"; document.head.appendChild(m); }
    m.setAttribute("content", "index,follow");
  }, []);
  return (
    <div dir="rtl" style={{ background: "#FBFAF8", minHeight: "100vh", fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif" }}>
      <GlobalHeader />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "64px 20px 80px", color: CHARCOAL }}>
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
            <p style={{ margin: 0 }}>לתיאום פגישות אנו משתמשים ב־Google Calendar, כדי להציג זמינות ולקבוע עבורכם מועד לשיחה. המועד שנבחר וכתובת המייל שלכם מועברים ליומן שלנו לצורך יצירת ההזמנה.</p>
          </section>

          <section>
            <h2 style={{ color: CHARCOAL, fontSize: 20, fontWeight: 700, margin: "0 0 10px" }}>כלי מדידה ופרסום</h2>
            <p style={{ margin: 0 }}>אנו משתמשים בכלי מדידה ופרסום של LinkedIn, כדי למדוד את הגעת הגולשים מהקמפיינים שלנו ולשפר אותם. זיהוי הגולש מתבצע באמצעות עוגיית li_fat_id.</p>
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