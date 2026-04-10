import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { buildWaMessage, buildLetterMessage } from "@/utils/messages";

const TARGET = 5;



export default function ResultScreen({ group, orgName, orgKey, orgSize, holidayBudget, activities }) {
  const topRef = useRef(null);
  const currentCount = group?.currentCount || 1;

  useEffect(() => {
    setTimeout(() => {
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 50);
  }, []);
  const remaining = Math.max(0, TARGET - currentCount);
  const [waCopied, setWaCopied] = useState(false);
  const [letterCopied, setLetterCopied] = useState(false);

  const handleWACopy = async () => {
    await navigator.clipboard.writeText(buildWaMessage(orgName, orgKey, currentCount));
    setWaCopied(true);
    setTimeout(() => setWaCopied(false), 2000);
    if (group?.id) {
      base44.entities.GroupRequest.update(group.id, { whatsappCopied: true }).catch(() => {});
    }
  };

  const handleLetterCopy = async () => {
    await navigator.clipboard.writeText(buildLetterMessage(orgName, orgKey, currentCount));
    setLetterCopied(true);
    setTimeout(() => setLetterCopied(false), 2000);
    if (group?.id) {
      base44.entities.GroupRequest.update(group.id, { letterCopied: true }).catch(() => {});
    }
  };

  return (
    <section
      ref={topRef}
      style={{
        background: "#F5F5F7",
        overflowX: "hidden",
        maxWidth: "100vw",
        padding: "60px 16px",
      }}
    >
      <div className="max-w-xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

        {/* ── RESULT HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{
            background: "#fff",
            borderRadius: "20px",
            border: "1px solid rgba(0,0,0,0.07)",
            padding: "28px 24px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(22px, 5vw, 28px)",
              fontWeight: 900,
              letterSpacing: "-0.025em",
              marginBottom: "10px",
              fontFamily: "var(--font-heebo)",
            }}
          >
            מעולה. זה נראה רלוונטי לארגון שלכם.
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "#86868B",
              lineHeight: 1.6,
              fontFamily: "var(--font-heebo)",
              maxWidth: "440px",
              margin: "0 auto 24px",
            }}
          >
            עכשיו בואו נעשה את זה פשוט. אנחנו נעזור לכם להבין למי נכון לפנות, איך לאסוף עוד עובדים, ואיך לשלוח פנייה מסודרת.
          </p>

          {/* PRIMARY CTA */}
          <a
            href="https://wa.me/972542552222"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              background: "#0066CC",
              color: "#fff",
              fontWeight: 800,
              fontSize: "16px",
              padding: "15px 20px",
              borderRadius: "13px",
              textDecoration: "none",
              fontFamily: "var(--font-heebo)",
              marginBottom: "10px",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#0055AA")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#0066CC")}
          >
            התייעצו איתנו בוואטסאפ
          </a>

          {/* SECONDARY CTA */}
          <button
            onClick={handleWACopy}
            style={{
              width: "100%",
              background: "transparent",
              color: "#1D1D1F",
              fontWeight: 600,
              fontSize: "14px",
              padding: "13px 20px",
              borderRadius: "13px",
              border: "1px solid rgba(0,0,0,0.1)",
              cursor: "pointer",
              fontFamily: "var(--font-heebo)",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F5F7")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {waCopied ? "הועתק!" : "העתק הודעה לקבוצת העובדים"}
          </button>
        </motion.div>

        {/* ── PROGRESS BLOCK ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          style={{
            background: "#fff",
            borderRadius: "16px",
            border: "1px solid rgba(0,0,0,0.07)",
            padding: "18px 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#1D1D1F",
                fontFamily: "var(--font-heebo)",
              }}
            >
              {currentCount}/{TARGET} עובדים הצטרפו
            </span>
            {remaining > 0 && (
              <span
                style={{
                  fontSize: "12px",
                  color: "#86868B",
                  fontFamily: "var(--font-heebo)",
                }}
              >
                חסרים עוד {remaining} לפני פנייה מסודרת
              </span>
            )}
          </div>
          <div
            style={{
              height: "6px",
              background: "rgba(0,0,0,0.07)",
              borderRadius: "9999px",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{ height: "100%", background: "#0066CC", borderRadius: "9999px" }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((currentCount / TARGET) * 100, 100)}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* ── 3 ACTIONS ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.14 }}
          style={{
            background: "#fff",
            borderRadius: "20px",
            border: "1px solid rgba(0,0,0,0.07)",
            padding: "24px",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 900,
              lineHeight: 1.3,
              marginBottom: "20px",
              fontFamily: "var(--font-heebo)",
              letterSpacing: "-0.015em",
            }}
          >
            בואו נכניס את בום-ביי לארגון שלכם<br />
            ב-3 פעולות פשוטות
          </h3>

          {[
            {
              num: "1",
              title: "פונים נכון",
              text: "נבין יחד מי הגורם הנכון בארגון - ועד העובדים, מנהלת הרווחה או גורם תקציבי.",
            },
            {
              num: "2",
              title: "אוספים עוד 4",
              text: "שולחים הודעה מוכנה בקבוצת העובדים. ברגע שיש לפחות 5 שמעוניינים - הפנייה כבר נשמעת אחרת.",
            },
            {
              num: "3",
              title: "שולחים פנייה מסודרת",
              text: "משתמשים במכתב המוכן להנהלה או לוועד. משם אנחנו כבר עוזרים לכם לסגור את כל השאר.",
            },
          ].map((action, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "14px",
                alignItems: "flex-start",
                marginBottom: i < 2 ? "18px" : 0,
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 32,
                  height: 32,
                  background: "#EBF3FF",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "13px",
                  color: "#0066CC",
                  fontFamily: "var(--font-heebo)",
                }}
              >
                {action.num}
              </div>
              <div>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "14px",
                    color: "#1D1D1F",
                    marginBottom: "3px",
                    fontFamily: "var(--font-heebo)",
                  }}
                >
                  {action.title}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#86868B",
                    lineHeight: 1.6,
                    fontFamily: "var(--font-heebo)",
                  }}
                >
                  {action.text}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── TOOLBOX ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          {/* WhatsApp message */}
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              border: "1px solid rgba(0,0,0,0.07)",
              padding: "20px 20px 16px",
            }}
          >
            <p
              style={{
                fontWeight: 700,
                fontSize: "14px",
                marginBottom: "10px",
                fontFamily: "var(--font-heebo)",
              }}
            >
              הודעה מוכנה לקבוצת העובדים
            </p>
            <div
              style={{
                background: "#F5F5F7",
                borderRadius: "10px",
                padding: "12px 14px",
                fontSize: "13px",
                color: "#444",
                lineHeight: 1.65,
                fontFamily: "var(--font-heebo)",
                marginBottom: "10px",
                whiteSpace: "pre-line",
              }}
            >
              {buildWaMessage(orgName, orgKey, currentCount)}
            </div>
            <button
              onClick={handleWACopy}
              style={{
                background: waCopied ? "#34C759" : "#0066CC",
                color: "#fff",
                fontWeight: 700,
                fontSize: "13px",
                padding: "10px 18px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-heebo)",
                transition: "background 0.15s",
              }}
            >
              {waCopied ? "הועתק!" : "העתק הודעה"}
            </button>
          </div>

          {/* Letter */}
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              border: "1px solid rgba(0,0,0,0.07)",
              padding: "20px 20px 16px",
            }}
          >
            <p
              style={{
                fontWeight: 700,
                fontSize: "14px",
                marginBottom: "10px",
                fontFamily: "var(--font-heebo)",
              }}
            >
              המכתב המוכן להנהלה
            </p>
            <div
              style={{
                background: "#F5F5F7",
                borderRadius: "10px",
                padding: "12px 14px",
                fontSize: "13px",
                color: "#444",
                lineHeight: 1.65,
                fontFamily: "var(--font-heebo)",
                marginBottom: "10px",
                whiteSpace: "pre-line",
              }}
            >
              {buildLetterMessage(orgName, orgKey, currentCount)}
            </div>
            <button
              onClick={handleLetterCopy}
              style={{
                background: letterCopied ? "#34C759" : "#0066CC",
                color: "#fff",
                fontWeight: 700,
                fontSize: "13px",
                padding: "10px 18px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-heebo)",
                transition: "background 0.15s",
              }}
            >
              {letterCopied ? "הועתק!" : "העתק מכתב"}
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}