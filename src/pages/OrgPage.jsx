import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";

const TARGET_1 = 10;
const TARGET_2 = 20;

const BASE_URL = "https://boom-perk-flow.base44.app";

function getBrowserToken() {
  let token = localStorage.getItem("boomBuyBrowserToken");
  if (!token) {
    token = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("boomBuyBrowserToken", token);
  }
  return token;
}

function getJoinedOrgs() {
  try { return JSON.parse(localStorage.getItem("boomBuyJoinedOrgs") || "{}"); } catch { return {}; }
}

function markJoined(orgKey) {
  const orgs = getJoinedOrgs();
  orgs[orgKey] = true;
  localStorage.setItem("boomBuyJoinedOrgs", JSON.stringify(orgs));
}

function waMsg(orgName, count, orgSlug) {
  const link = `${BASE_URL}/join/${orgSlug}`;
  if (count >= TARGET_2) {
    return `חבר׳ה, פתחנו בקשה לצרף את ${orgName} ל-BoomBuy. זה יכול לתת לנו מחירי יבואן על Apple, הנחות קבועות בסופר, אופנה, חופשות והטבות נוספות - בלי תוספת תקציב לארגון. כבר עברנו את ה-20, וכל הצטרפות נוספת מחזקת עוד יותר את הפנייה. הצטרפו כאן: ${link}`;
  }
  if (count >= TARGET_1) {
    const remaining = TARGET_2 - count;
    return `חבר׳ה, פתחנו בקשה לצרף את ${orgName} ל-BoomBuy. זה יכול לתת לנו מחירי יבואן על Apple, הנחות קבועות בסופר, אופנה, חופשות והטבות נוספות - בלי תוספת תקציב לארגון. כבר ${count} עובדים הצטרפו. חסרים לנו עוד ${remaining} כדי להגיע ל-20. הצטרפו כאן: ${link}`;
  }
  const remaining = TARGET_1 - count;
  return `חבר׳ה, פתחנו בקשה לצרף את ${orgName} ל-BoomBuy. זה יכול לתת לנו מחירי יבואן על Apple, הנחות קבועות בסופר, אופנה, חופשות והטבות נוספות - בלי תוספת תקציב לארגון. כבר ${count} עובדים הצטרפו. חסרים לנו עוד ${remaining} כדי להגיע ל-10. הצטרפו כאן: ${link}`;
}

function letterMsg(orgName, count, orgKey) {
  const orgLink = orgKey ? `${BASE_URL}/join/${orgKey}` : BASE_URL;
  return `שלום,

קבוצת עובדים מתוך ${orgName} ביקשה לבחון את ההצטרפות למועדון BoomBuy.

עד כה הצטרפו לבקשה ${count} עובדים מתוך הארגון.

המהלך מאפשר לעובדים לקבל מחירי סיטונאות על מוצרי פרימיום, הנחות קבועות בסופר ובפארם, מתנות חג גמישות והטבות נוספות - והכול ב-0 ש"ח תוספת תקציב לארגון.

נשמח אם תבדקו תיאום פגישת דמו קצרה מול צוות BoomBuy.

קישור לעמוד הבקשה:
${orgLink}

יצירת קשר ישיר:
https://wa.me/972542552222`;
}

export default function OrgPage() {
  const { orgSlug } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [memberDept, setMemberDept] = useState("");
  const [joining, setJoining] = useState(false);
  const [justJoined, setJustJoined] = useState(false);
  const [waCopied, setWaCopied] = useState(false);
  const [letterCopied, setLetterCopied] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const results = await base44.entities.GroupRequest.filter({ orgKey: orgSlug });
        if (results.length > 0) {
          setGroup(results[0]);
          const joined = getJoinedOrgs();
          if (joined[orgSlug]) setAlreadyJoined(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();

    const unsub = base44.entities.GroupRequest.subscribe((event) => {
      if ((event.type === "update" || event.type === "create") && event.data?.orgKey === orgSlug) {
        setGroup(event.data);
      }
    });
    return () => unsub();
  }, [orgSlug]);

  const handleJoin = async () => {
    if (!memberName.trim()) return;
    setJoining(true);
    const browserToken = getBrowserToken();
    try {
      await base44.entities.GroupMember.create({
        groupRequestId: group.id,
        orgKey: orgSlug,
        orgName: group.orgName,
        memberName: memberName.trim(),
        memberEmail: memberDept.trim() || undefined,
        browserToken,
        source: "employees",
      });
      const newCount = (group.currentCount || 1) + 1;
      await base44.entities.GroupRequest.update(group.id, {
        currentCount: newCount,
        lastJoinedAt: new Date().toISOString(),
      });
      setGroup((g) => ({ ...g, currentCount: newCount }));
      markJoined(orgSlug);
      setAlreadyJoined(true);
      setJustJoined(true);
      setShowJoinForm(false);
      setMemberName("");
      setMemberDept("");
    } catch (err) {
      console.error(err);
    } finally {
      setJoining(false);
    }
  };

  const handleWACopy = async () => {
    await navigator.clipboard.writeText(waMsg(group.orgName, group.currentCount || 1, orgSlug));
    setWaCopied(true);
    setTimeout(() => setWaCopied(false), 2500);
    base44.entities.GroupRequest.update(group.id, { whatsappCopied: true }).catch(() => {});
  };

  const handleLetterCopy = async () => {
    await navigator.clipboard.writeText(letterMsg(group.orgName, group.currentCount || 1, orgSlug));
    setLetterCopied(true);
    setTimeout(() => setLetterCopied(false), 2500);
    base44.entities.GroupRequest.update(group.id, { letterCopied: true }).catch(() => {});
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F5F7" }}>
        <div style={{ width: 36, height: 36, border: "3px solid rgba(0,102,204,0.15)", borderTopColor: "#0066CC", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  if (!group) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F5F7", fontFamily: "var(--font-heebo)" }} dir="rtl">
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>הארגון לא נמצא</p>
          <a href="/" style={{ color: "#0066CC", fontSize: "14px" }}>חזרה לעמוד הראשי</a>
        </div>
      </div>
    );
  }

  const count = group.currentCount || 1;
  const currentTarget = count < TARGET_1 ? TARGET_1 : count < TARGET_2 ? TARGET_2 : TARGET_2;
  const progress = Math.min((count / currentTarget) * 100, 100);

  return (
    <div dir="rtl" style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "var(--font-heebo)", padding: "0 0 60px" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.06)", padding: "14px 20px", display: "flex", alignItems: "center", gap: "10px" }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: "20px", fontWeight: 900, color: "#0066CC", letterSpacing: "-0.02em" }}>BoomBuy</span>
        </a>
      </div>

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "32px 16px", display: "flex", flexDirection: "column", gap: "20px" }}>

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          style={{ background: "#fff", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.07)", padding: "28px 24px", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(22px, 5vw, 28px)", fontWeight: 900, letterSpacing: "-0.025em", marginBottom: "8px" }}>
            בואו נכניס את BoomBuy ל-{group.orgName}
          </h1>
          <p style={{ fontSize: "15px", color: "#86868B", lineHeight: 1.6 }}>
            כבר <strong style={{ color: "#0066CC" }}>{count}</strong> עובדים הצטרפו.{" "}
            {count < TARGET_1 ? `ב-10 כבר מרגישים מסה ראשונית.` : count < TARGET_2 ? `ב-20 זה כבר כוח שאי אפשר להתעלם ממנו.` : `כל הצטרפות נוספת מחזקת את הפנייה.`}
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.07 }}
          style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.07)", padding: "20px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ fontWeight: 700, fontSize: "15px", color: "#1D1D1F" }}>{count} / {currentTarget} עובדים</span>
            {count < currentTarget && (
              <span style={{ fontSize: "12px", color: "#86868B" }}>עוד {currentTarget - count} להשלמת היעד</span>
            )}
            {count >= TARGET_2 && (
              <span style={{ fontSize: "12px", color: "#34C759", fontWeight: 700 }}>✓ עברתם 20!</span>
            )}
          </div>
          <div style={{ height: "8px", background: "rgba(0,0,0,0.07)", borderRadius: "9999px", overflow: "hidden" }}>
            <motion.div
              style={{ height: "100%", background: count >= TARGET_2 ? "#34C759" : "#0066CC", borderRadius: "9999px" }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </div>
          <p style={{ fontSize: "12px", color: "#86868B", marginTop: "10px", lineHeight: 1.5 }}>
            ככל שיותר עובדים מצטרפים, הפנייה לוועד / רווחה / הנהלה מקבלת יותר משקל.
          </p>
        </motion.div>

        {/* Join / Already joined */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.12 }}
          style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.07)", padding: "20px 22px" }}>

          {alreadyJoined ? (
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>✅</div>
              <p style={{ fontWeight: 700, fontSize: "15px", color: "#34C759", marginBottom: "4px" }}>
                {justJoined ? "הצטרפתם בהצלחה!" : "כבר הצטרפתם לבקשה של הארגון הזה"}
              </p>
              <p style={{ fontSize: "13px", color: "#86868B" }}>שתפו עוד עמיתים כדי להגדיל את הסיכוי</p>
            </div>
          ) : (
            <>
              {!showJoinForm ? (
                <button
                  onClick={() => setShowJoinForm(true)}
                  style={{ width: "100%", background: "#0066CC", color: "#fff", fontWeight: 800, fontSize: "16px", padding: "15px", borderRadius: "13px", border: "none", cursor: "pointer", fontFamily: "var(--font-heebo)", boxShadow: "0 6px 20px rgba(0,102,204,0.25)" }}
                >
                  הצטרפו גם אתם
                </button>
              ) : (
                <AnimatePresence>
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                    <p style={{ fontWeight: 700, fontSize: "15px", marginBottom: "14px" }}>מה שמך?</p>
                    <input
                      type="text"
                      value={memberName}
                      onChange={(e) => setMemberName(e.target.value)}
                      placeholder="שם פרטי"
                      style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.12)", background: "#F5F5F7", fontFamily: "var(--font-heebo)", fontSize: "15px", marginBottom: "10px", boxSizing: "border-box", textAlign: "right" }}
                      autoFocus
                    />
                    <input
                      type="text"
                      value={memberDept}
                      onChange={(e) => setMemberDept(e.target.value)}
                      placeholder="מחלקה / תפקיד (אופציונלי)"
                      style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.12)", background: "#F5F5F7", fontFamily: "var(--font-heebo)", fontSize: "15px", marginBottom: "12px", boxSizing: "border-box", textAlign: "right" }}
                    />
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        onClick={handleJoin}
                        disabled={!memberName.trim() || joining}
                        style={{ flex: 1, background: memberName.trim() ? "#0066CC" : "#C7C7CC", color: "#fff", fontWeight: 700, fontSize: "14px", padding: "13px", borderRadius: "10px", border: "none", cursor: memberName.trim() ? "pointer" : "default", fontFamily: "var(--font-heebo)" }}
                      >
                        {joining ? "שומר..." : "הצטרפו"}
                      </button>
                      <button
                        onClick={() => setShowJoinForm(false)}
                        style={{ background: "transparent", color: "#86868B", fontSize: "13px", padding: "13px 16px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.1)", cursor: "pointer", fontFamily: "var(--font-heebo)" }}
                      >
                        ביטול
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </>
          )}
        </motion.div>

        {/* Actions */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.18 }}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

          {/* WA Message */}
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.07)", padding: "18px 20px" }}>
            <p style={{ fontWeight: 700, fontSize: "14px", marginBottom: "8px" }}>הודעה מוכנה לקבוצת העובדים</p>
            <div style={{ background: "#F5F5F7", borderRadius: "10px", padding: "11px 13px", fontSize: "12.5px", color: "#444", lineHeight: 1.65, marginBottom: "10px", whiteSpace: "pre-line" }}>
              {waMsg(group.orgName, count, orgSlug)}
            </div>
            <button
              onClick={handleWACopy}
              style={{ background: waCopied ? "#34C759" : "#0066CC", color: "#fff", fontWeight: 700, fontSize: "13px", padding: "10px 18px", borderRadius: "10px", border: "none", cursor: "pointer", fontFamily: "var(--font-heebo)", transition: "background 0.15s" }}
            >
              {waCopied ? "הועתק! ✓" : "העתק הודעה לקבוצת העובדים"}
            </button>
          </div>

          {/* Management Letter */}
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.07)", padding: "18px 20px" }}>
            <p style={{ fontWeight: 700, fontSize: "14px", marginBottom: "8px" }}>מכתב מוכן להנהלה / ועד / רווחה</p>
            <div style={{ background: "#F5F5F7", borderRadius: "10px", padding: "11px 13px", fontSize: "12.5px", color: "#444", lineHeight: 1.65, marginBottom: "10px", whiteSpace: "pre-line" }}>
              {letterMsg(group.orgName, count, orgSlug)}
            </div>
            <button
              onClick={handleLetterCopy}
              style={{ background: letterCopied ? "#34C759" : "#0066CC", color: "#fff", fontWeight: 700, fontSize: "13px", padding: "10px 18px", borderRadius: "10px", border: "none", cursor: "pointer", fontFamily: "var(--font-heebo)", transition: "background 0.15s" }}
            >
              {letterCopied ? "הועתק! ✓" : "העתק מכתב להנהלה"}
            </button>
          </div>

          {/* Consult */}
          <a
            href={`https://wa.me/972542552222?text=${encodeURIComponent(`היי, פתחנו בקשה עבור ${group.orgName} ואנחנו רוצים להבין איך נכון לקדם את זה מול הארגון.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block", background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.07)", padding: "16px 20px", textAlign: "center", textDecoration: "none", color: "#1D1D1F", fontWeight: 600, fontSize: "14px" }}
          >
            💬 התייעצו איתנו
          </a>
        </motion.div>
      </div>
    </div>
  );
}