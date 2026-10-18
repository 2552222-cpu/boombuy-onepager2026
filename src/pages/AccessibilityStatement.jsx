import React, { useEffect } from "react";
import GlobalHeader from "@/components/employees/GlobalHeader";
import GlobalFooter from "@/components/employees/GlobalFooter";
import StatementSection from "@/components/employees/legal/StatementSection";

const CHARCOAL = "#17191D";
const BODY = "#3A3C42";
const CORAL = "#C24A2C";

const UPDATED = "17 באוקטובר 2026";
const EMAIL = "support@boombuy.co.il";
const PHONE_DISPLAY = "054-2552222";
const PHONE_HREF = "tel:+97254255222";

const LIST = { margin: "8px 0 0", paddingInlineStart: 22, display: "flex", flexDirection: "column", gap: 4 };
const LINK = { color: CORAL, fontWeight: 700, textDecoration: "underline" };

export default function AccessibilityStatement() {
  useEffect(() => {
    document.title = "הצהרת נגישות · boombuy";
    let m = document.querySelector('meta[name="robots"]');
    if (!m) {
      m = document.createElement("meta");
      m.name = "robots";
      document.head.appendChild(m);
    }
    m.setAttribute("content", "index,follow");
  }, []);

  return (
    <div dir="rtl" style={{ background: "#FBFAF8", minHeight: "100vh", fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif" }}>
      <GlobalHeader />
      <main id="main-content" tabIndex={-1} style={{ maxWidth: 760, margin: "0 auto", padding: "64px 20px 80px", color: CHARCOAL }}>
        <h1 style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 8px" }}>
          הצהרת נגישות
        </h1>
        <p style={{ color: BODY, fontSize: 15, margin: "0 0 28px" }}>עודכן לאחרונה: {UPDATED}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 28, color: BODY, fontSize: 16, lineHeight: 1.7 }}>
          <StatementSection title="כללי">
            <p style={{ margin: 0 }}>
              אתר boombuy (boombuyonepage.com) הוא פלטפורמה להקמה ולהפעלה של מועדוני הטבות ורווחה לעובדים, במותג הארגון.
              אנו רואים חשיבות רבה בהנגשת האתר ותכניו לכלל המשתמשים, לרבות אנשים עם מוגבלות, ופועלים כדי שכל אדם יוכל
              להשתמש בשירותינו באופן עצמאי, שוויוני ונוח.
            </p>
            <p style={{ margin: "10px 0 0" }}>
              ההנגשה בוצעה ברוח הוראות חוק שוויון זכויות לאנשים עם מוגבלות, התשנ"ח–1998, ותקנות שוויון זכויות לאנשים עם
              מוגבלות (התאמות נגישות לשירות), התשע"ג–2013.
            </p>
          </StatementSection>

          <StatementSection title="רמת הנגישות">
            <p style={{ margin: 0 }}>
              האתר הונגש בהתאם לתקן הישראלי ת"י 5568 – "קווים מנחים לנגישות תכנים באינטרנט", ברמת AA, המבוסס על הנחיות
              WCAG 2.0 של ארגון W3C.
            </p>
            <p style={{ margin: "10px 0 0" }}>
              ההנגשה מותאמת לשפה העברית ולכיווניות מימין לשמאל (RTL), ולשימוש בדפדפנים עדכניים – Chrome, Safari, Edge
              ו‑Firefox – במחשב ובטלפון נייד.
            </p>
          </StatementSection>

          <StatementSection title="אמצעי הנגישות באתר">
            <p style={{ margin: 0 }}>בכל עמוד באתר זמין תפריט נגישות צף, הכולל את ההתאמות הבאות:</p>
            <ul style={LIST}>
              <li>התאמת גודל הטקסט בארבע דרגות.</li>
              <li>ניגודיות גבוהה לשיפור קריאות הטקסט.</li>
              <li>ניגודיות כהה (מצב כהה).</li>
              <li>תצוגה בגווני אפור.</li>
              <li>הדגשת קישורים וכפתורים.</li>
              <li>מעבר לגופן קריא ופשוט לקריאה.</li>
              <li>עצירת אנימציות ותנועה.</li>
              <li>סמן עכבר גדול.</li>
              <li>איפוס ההגדרות בבת אחת.</li>
            </ul>
            <p style={{ margin: "10px 0 0" }}>ההגדרות נשמרות בדפדפן שלכם וממשיכות לחול גם בביקורים הבאים.</p>
          </StatementSection>

          <StatementSection title="מבנה ותמיכה טכנית">
            <ul style={{ ...LIST, margin: 0 }}>
              <li>האתר תומך בניווט מלא באמצעות המקלדת (Tab, Shift+Tab, Enter ו‑Esc).</li>
              <li>האתר תואם לקוראי מסך נפוצים.</li>
              <li>לתוכן חזותי משמעותי הוגדרו חלופות טקסט, ולעמודים הוגדרו כותרות היררכיות ואזורי ניווט.</li>
              <li>האתר מותאם לתצוגה בגדלי מסך שונים, וכן להגדלת תצוגה ולשינוי גופן בדפדפן.</li>
            </ul>
          </StatementSection>

          <StatementSection title="הסדרי נגישות לשירות">
            <p style={{ margin: 0 }}>
              השירות שלנו ניתן באופן מקוון. אם אינכם יכולים להשתמש באתר או בחלק ממנו, נשמח לתת לכם שירות בדרכים חלופיות –
              בטלפון או בוואטסאפ – ובהן מסירת מידע, תיאום פגישה ורישום להדגמה בעל פה, בהתאם לצורך שלכם.
            </p>
          </StatementSection>

          <StatementSection title="דרכי פנייה ובקשות נגישות">
            <p style={{ margin: 0 }}>
              נתקלתם בבעיית נגישות, או שיש לכם בקשה או הצעה לשיפור? נשמח שתפנו לרכז/ת הנגישות שלנו:
            </p>
            <ul style={LIST}>
              <li>
                דוא"ל:{" "}
                <a href={`mailto:${EMAIL}`} style={LINK}>
                  {EMAIL}
                </a>
              </li>
              <li>
                טלפון / וואטסאפ:{" "}
                <a href={PHONE_HREF} style={LINK} dir="ltr">
                  {PHONE_DISPLAY}
                </a>
              </li>
            </ul>
            <p style={{ margin: "10px 0 0" }}>
              בפנייה נשמח לקבל תיאור של הבעיה, סוג המכשיר והדפדפן שבהם השתמשתם, וכתובת העמוד שבו נתקלתם בקושי. אנו
              מתחייבים לחזור אליכם בהקדם, לכל המאוחר תוך 5 ימי עסקים.
            </p>
          </StatementSection>

          <StatementSection title="תוכן של צד שלישי">
            <p style={{ margin: 0 }}>
              באתר משולבים שירותים חיצוניים, כגון תיאום פגישות דרך יומן וכלי מדידה ופרסום. רכיבים אלה אינם בשליטתנו
              המלאה, אך אם נתקלתם בקושי בשימוש בהם נשמח לסייע לכם בדרכים חלופיות.
            </p>
          </StatementSection>

          <StatementSection title="עדכון ההצהרה">
            <p style={{ margin: 0 }}>
              הצהרת נגישות זו עודכנה ב‑{UPDATED}. אנו ממשיכים לבדוק ולשפר את נגישות האתר באופן שוטף, ונודה לכם על כל פנייה
              שתסייע לנו בכך.
            </p>
          </StatementSection>
        </div>
      </main>
      <GlobalFooter />
    </div>
  );
}