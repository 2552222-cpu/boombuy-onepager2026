import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Smartphone, Plane, Music, Shirt, Zap } from "lucide-react";

const BENEFITS = [
  {
    icon: ShoppingCart, id: "super",
    title: "סופר ומזון",
    marketPrice: "2,000",
    employeePrice: "1,840",
    saving: "160",
    note: "8% הנחה קבועה ברשתות הדיסקאונט",
    color: "#34C759",
  },
  {
    icon: Smartphone, id: "tech",
    title: "חשמל ואלקטרוניקה",
    marketPrice: "4,590",
    employeePrice: "3,890",
    saving: "700",
    note: "מחירי יבואן — Apple, Samsung, Dyson",
    color: "#0066CC",
  },
  {
    icon: Plane, id: "vacation",
    title: "חופשות",
    marketPrice: "3,200",
    employeePrice: "2,000",
    saving: "1,200",
    note: "חיסכון של 1,200 ₪ לחופשה",
    color: "#FF9F0A",
  },
  {
    icon: Music, id: "culture",
    title: "הופעות ותרבות",
    marketPrice: "290",
    employeePrice: "190",
    saving: "100",
    note: "100 ₪ חיסכון לכרטיס",
    color: "#BF5AF2",
  },
  {
    icon: Shirt, id: "fashion",
    title: "אופנה",
    marketPrice: "499",
    employeePrice: "299",
    saving: "200",
    note: "מותגי פרימיום במחירים בלעדיים",
    color: "#FF2D55",
  },
  {
    icon: Zap, id: "daily",
    title: "מוצרי צריכה ויוקר מחיה",
    marketPrice: "300",
    employeePrice: "200",
    saving: "100",
    note: "כל בוקר הטבה חדשה ישירות לוואטסאפ",
    color: "#FF9F0A",
  },
];

export default function NetLiftBenefits({ onContinue, onNext }) {
  const handleContinue = onNext || onContinue;
  const bottomRef = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHasScrolled(true); },
      { threshold: 0.5 }
    );
    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div dir="rtl" style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "var(--font-heebo)", paddingBottom: "120px" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(160deg, #0a0e1a, #0d1829)",
        padding: "48px 20px 40px",
        textAlign: "center",
      }}>
        <div style={{
          display: "inline-block",
          background: "rgba(74,158,255,0.15)",
          border: "1px solid rgba(74,158,255,0.3)",
          borderRadius: "999px",
          padding: "5px 16px",
          marginBottom: "16px",
        }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#4A9EFF", letterSpacing: "0.06em" }}>
            NetLift Index · הטבות
          </span>
        </div>
        <h2 style={{
          fontSize: "clamp(22px, 5vw, 32px)",
          fontWeight: 900,
          color: "#fff",
          letterSpacing: "-0.03em",
          lineHeight: 1.2,
          marginBottom: 10,
        }}>
          אלה ההטבות שיכולות להגדיל את הנטו שלך
        </h2>
        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
          גללו למטה לצפות בכל ההטבות
        </p>
      </div>

      {/* Cards */}
      <div style={{ maxWidth: "520px", margin: "0 auto", padding: "24px 16px", display: "flex", flexDirection: "column", gap: "14px" }}>
        {BENEFITS.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            style={{
              background: "#fff",
              borderRadius: "20px",
              border: "1px solid rgba(0,0,0,0.07)",
              padding: "20px 20px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
              <div style={{
                width: 44, height: 44, borderRadius: "12px", flexShrink: 0,
                background: `${b.color}18`, display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <b.icon size={22} color={b.color} strokeWidth={1.75} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "15px", fontWeight: 800, color: "#1D1D1F", marginBottom: "4px" }}>{b.title}</p>
                <p style={{ fontSize: "12px", color: "#86868B", marginBottom: "12px" }}>{b.note}</p>
                <div style={{ display: "flex", gap: "8px" }}>
                  {[
                    { label: "מחיר שוק", val: b.marketPrice, strike: true, color: "#86868B", bg: "#F5F5F7" },
                    { label: "מחיר לעובד", val: b.employeePrice, strike: false, color: "#0066CC", bg: "#F0F4FF" },
                    { label: "חיסכון", val: b.saving, strike: false, color: "#1A7A43", bg: "rgba(52,199,89,0.08)" },
                  ].map((c) => (
                    <div key={c.label} style={{
                      flex: 1, background: c.bg, borderRadius: "10px", padding: "8px 6px", textAlign: "center",
                    }}>
                      <p style={{ fontSize: "10px", color: "#86868B", fontWeight: 700, marginBottom: "3px" }}>{c.label}</p>
                      <p style={{
                        fontSize: "14px", fontWeight: 900, color: c.color,
                        textDecoration: c.strike ? "line-through" : "none",
                        direction: "ltr", textAlign: "center",
                      }}>{c.val} ₪</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Bottom sentinel */}
        <div ref={bottomRef} style={{ height: 1 }} />
      </div>

      {/* Sticky CTA */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        padding: "16px 20px",
        background: "linear-gradient(to top, #F5F5F7 60%, transparent)",
        zIndex: 50,
      }}>
        <div style={{ maxWidth: "520px", margin: "0 auto" }}>
          <motion.button
            onClick={handleContinue}
            animate={hasScrolled ? { boxShadow: ["0 0 0px rgba(0,102,204,0)", "0 0 24px rgba(0,102,204,0.5)", "0 0 0px rgba(0,102,204,0)"] } : {}}
            transition={{ duration: 2.4, repeat: Infinity }}
            style={{
              width: "100%",
              background: hasScrolled ? "#0066CC" : "#AEAEB2",
              color: "#fff",
              fontWeight: 800,
              fontSize: "16px",
              padding: "17px",
              borderRadius: "16px",
              border: "none",
              cursor: hasScrolled ? "pointer" : "default",
              fontFamily: "var(--font-heebo)",
              transition: "background 0.3s",
            }}
          >
            {hasScrolled ? "אני רוצה לבדוק את פוטנציאל הנטו שלי ←" : "גללו למטה לצפות בכל ההטבות"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}