import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "יחזקאל מזרחי",
    role: "יו\"ר ועד עובדי עיריית תל אביב - אגף שפע",
    logo: "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/5325ce61f_.png",
    logoHeight: 44,
    text: "BoomBuy יצרה חוויית עובד אחרת. הם מספקים רמת שירות וטכנולוגיה מתוחכמת שקובעת סטנדרט שלא הכרנו לפני.",
  },
  {
    name: "גניב דוד",
    role: "מזכיר כללי התאגדות עובדי בנק לאומי",
    logo: "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/333366c6f_.png",
    logoHeight: 44,
    text: "If BoomBuy פשוט ההשקעה הטובה ביותר למען העובדים. הפלטפורמה מספקת ערך מדהים מבלי להוסיף שקל אחד לתקציב הרווחה שלנו. העובדים שלנו מרוצים יותר, מעורבים יותר, ומגלים כל הזמן הטבות חדשות שהם אוהבים.",
  },
  {
    name: "שירה סיירי",
    role: "ראש מטה הנהלה, עמותת שלוה",
    logo: "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/febd43cdc_KUUV.png",
    logoHeight: 44,
    text: "Boombuy – היא שותפה אמיתית לדרך. השירות האנושי, החוס האישי והמקצועיות מורגשים בכל פרס. אתר ההטבות מגוון, משתלם ואטרקטיבי, והעובדים שלנו נהנים ממנו מאוד!",
  },
  {
    name: "יקירה שינדר",
    role: "משאבי אנוש סוכנות לביטוח שקל",
    logo: "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/2279bccfc_.png",
    logoHeight: 44,
    text: "חברת boombuy דואגת כל זום לבום המתפרץ. דבר שיצר בז חיובי ומדהים אצל העובדים. השירות והמקצועות מעל הכל!",
  },
];

export default function Testimonials() {
  return (
    <section dir="rtl" style={{ background: "#F5F5F7", padding: "80px 20px" }}>
      <style>{`
        @media (max-width: 640px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <h2 style={{ fontSize: "clamp(26px, 5vw, 42px)", fontWeight: 900, color: "#1D1D1F", letterSpacing: "-0.03em", margin: "0 0 10px", fontFamily: "var(--font-heebo)" }}>
            יותר לעובדים, יותר לארגון
          </h2>
          <p style={{ fontSize: 16, color: "#6E6E73", margin: 0 }}>כמה מילים ממי שכבר עובד איתנו.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }} className="testimonials-grid">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: "28px 24px",
                border: "1px solid rgba(0,0,0,0.07)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div style={{ height: 44, display: "flex", alignItems: "center" }}>
                {t.logo && (
                  <img src={t.logo} alt={t.name} style={{ height: t.logoHeight || 44, maxWidth: 140, objectFit: "contain", objectPosition: "right" }} />
                )}
              </div>

              <p style={{ fontSize: 14, color: "#3A3A3C", lineHeight: 1.7, margin: 0, flex: 1 }}>
                ״{t.text}״
              </p>

              <div>
                <p style={{ fontSize: 14, fontWeight: 800, color: "#1D1D1F", margin: "0 0 2px" }}>{t.name}</p>
                <p style={{ fontSize: 13, color: "#6E6E73", margin: 0 }}>{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}