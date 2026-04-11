import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { buildWaMessage, buildLetterMessage, buildSurveyInsights } from "@/utils/messages";
import ILS from "../components/employees/ILS";

const TARGET_1 = 10;
const TARGET_2 = 20;


// ─── Local storage helpers ─────────────────────────────────────────────────────
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

function getSurveyDoneOrgs() {
  try { return JSON.parse(localStorage.getItem("boomBuySurveyDone") || "{}"); } catch { return {}; }
}

function markSurveyDone(orgKey) {
  const orgs = getSurveyDoneOrgs();
  orgs[orgKey] = true;
  localStorage.setItem("boomBuySurveyDone", JSON.stringify(orgs));
}

// ─── Message generators — delegate to canonical source ───────────────────────
function waMsg(orgName, count, orgSlug, refId) {
  return buildWaMessage(orgName, orgSlug, count, refId);
}

function letterMsg(orgName, count, orgKey, group) {
  const insights = buildSurveyInsights(group);
  return buildLetterMessage(orgName, orgKey, count, insights);
}

// ─── Micro Survey ─────────────────────────────────────────────────────────────
const MICRO_Q1 = ["סופר ופארם", "חשמל ואלקטרוניקה", "דלק ותחבורה", "חופשות ונסיעות"];
const MICRO_Q2 = ["מאוד חשוב לי", "דיי חשוב", "לא ממש"];

function MicroSurvey({ orgKey, orgName, onDone }) {
  const [q1, setQ1] = useState("");
  const [step, setStep] = useState(1);

  const handleQ1 = (ans) => { setQ1(ans); setStep(2); };

  const handleQ2 = async (ans) => {
    try {
      await base44.entities.SurveyResponse.create({
        orgKey,
        orgName,
        answer1: q1,
        answer2: ans,
        answer3: "",
        sessionToken: getBrowserToken(),
      });
    } catch {}
    markSurveyDone(orgKey);
    onDone();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,102,204,0.15)", padding: "22px 20px" }}
    >
      <p style={{ fontSize: "11px", fontWeight: 700, color: "#0066CC", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "8px" }}>
        שאלה {step} מתוך 2 · 10 שניות
      </p>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="q1" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }}>
            <p style={{ fontSize: "16px", fontWeight: 800, marginBottom: "14px", lineHeight: 1.35 }}>איפה אתם הכי מרגישים את יוקר המחיה?</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {MICRO_Q1.map((opt) => (
                <button key={opt} onClick={() => handleQ1(opt)}
                  style={{ background: "#F5F5F7", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "999px", padding: "9px 16px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-heebo)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#EBF3FF"; e.currentTarget.style.borderColor = "#0066CC"; e.currentTarget.style.color = "#0066CC"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F5F7"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; e.currentTarget.style.color = "inherit"; }}
                >{opt}</button>
              ))}
            </div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key="q2" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }}>
            <p style={{ fontSize: "16px", fontWeight: 800, marginBottom: "14px", lineHeight: 1.35 }}>כמה חשוב לך שהארגון יאמץ הטבות אמיתיות?</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {MICRO_Q2.map((opt) => (
                <button key={opt} onClick={() => handleQ2(opt)}
                  style={{ background: "#F5F5F7", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "999px", padding: "9px 16px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-heebo)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#EBF3FF"; e.currentTarget.style.borderColor = "#0066CC"; e.currentTarget.style.color = "#0066CC"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F5F7"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; e.currentTarget.style.color = "inherit"; }}
                >{opt}</button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function OrgPage() {
  const { orgSlug } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [joining, setJoining] = useState(false);
  const [justJoined, setJustJoined] = useState(false);
  const [showMicroSurvey, setShowMicroSurvey] = useState(false);
  const [surveyDone, setSurveyDone] = useState(false);
  const [waCopied, setWaCopied] = useState(false);
  const [letterCopied, setLetterCopied] = useState(false);
  const [myMemberId, setMyMemberId] = useState("");
  const refParam = new URLSearchParams(window.location.search).get("ref") || "";

  useEffect(() => {
    const load = async () => {
      try {
        const results = await base44.entities.GroupRequest.filter({ orgKey: orgSlug });
        if (results.length > 0) {
          setGroup(results[0]);

          // Check join status: joined-orgs map OR any token for this org key
          const joinedOrgs = getJoinedOrgs();
          const storedMemberId = localStorage.getItem(`groupmember_${orgSlug}`);
          if (joinedOrgs[orgSlug] || !!storedMemberId) {
            setAlreadyJoined(true);
            if (storedMemberId) setMyMemberId(storedMemberId);
          }

          // Restore survey-done state
          const surveyDoneOrgs = getSurveyDoneOrgs();
          if (surveyDoneOrgs[orgSlug]) setSurveyDone(true);
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
      const newMember = await base44.entities.GroupMember.create({
        groupRequestId: group.id,
        orgKey: orgSlug,
        orgName: group.orgName,
        memberName: memberName.trim(),
        memberPhone: memberPhone.trim() || undefined,
        browserToken,
        source: "employees",
        referrerMemberId: refParam || undefined,
        joinedVia: "org_page",
        shareSource: refParam ? "referral_link" : "direct",
      });
      localStorage.setItem(`groupmember_${orgSlug}`, newMember.id);
      setMyMemberId(newMember.id);
      const prevCount = group.currentCount || 1;
      const newCount = prevCount + 1;
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
      setMemberPhone("");
      setShowMicroSurvey(true);

      // Fire milestone notifications
      base44.functions.invoke("notifyGroupMilestones", {
        event: "member_joined",
        orgKey: orgSlug,
        prevCount,
        newCount,
      }).catch(() => {});
    } catch (err) {
      console.error(err);
    } finally {
      setJoining(false);
    }
  };

  const handleSurveyDone = () => {
    setSurveyDone(true);
    markSurveyDone(orgSlug);
  };

  const handleWACopy = async () => {
    await navigator.clipboard.writeText(waMsg(group.orgName, group.currentCount || 1, orgSlug, myMemberId));
    setWaCopied(true);
    setTimeout(() => setWaCopied(false), 2500);
    base44.entities.GroupRequest.update(group.id, { whatsappCopied: true }).catch(() => {});
  };

  const handleLetterCopy = async () => {
    await navigator.clipboard.writeText(letterMsg(group.orgName, group.currentCount || 1, orgSlug, group));
    setLetterCopied(true);
    setTimeout(() => setLetterCopied(false), 2500);
    base44.entities.GroupRequest.update(group.id, { letterCopied: true }).catch(() => {});
  };

  // Share tools are ONLY visible after surveyDone — no exceptions.
  // Returning users who never completed the survey do NOT get access.
  const showShareTools = surveyDone;

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
  const currentTarget = count < TARGET_1 ? TARGET_1 : TARGET_2;
  const progress = Math.min((count / currentTarget) * 100, 100);

  return (
    <div dir="rtl" style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "var(--font-heebo)", padding: "0 0 60px" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.06)", padding: "14px 20px" }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: "20px", fontWeight: 900, color: "#0066CC", letterSpacing: "-0.02em" }}>בום ביי</span>
        </a>
      </div>

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "32px 16px", display: "flex", flexDirection: "column", gap: "16px" }}>

        {/* Hero title */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          style={{ background: "linear-gradient(135deg, #0055CC 0%, #1A7AFF 100%)", borderRadius: "24px", padding: "32px 26px", textAlign: "center" }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.7)", marginBottom: "8px", letterSpacing: "0.04em" }}>
            עובדים מ-{group.orgName} כבר התחילו מהלך
          </p>
          <h1 style={{ fontSize: "clamp(22px, 5vw, 30px)", fontWeight: 900, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.2, marginBottom: "10px" }}>
            איך להוציא יותר מהשכר בלי לבקש העלאה
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
            אם גם אתם רוצים לקדם את זה ב-{group.orgName}, מצטרפים לבקשה, עונים על 2 שאלות קצרות, ואז נפתחים כלי השיתוף והמכתב להנהלה.
          </p>
        </motion.div>

        {/* Group Letter */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}
          style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.07)", padding: "22px 22px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, color: "#86868B", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>מכתב קבוצתי</p>
          <p style={{ fontSize: "14px", lineHeight: 1.75, color: "#1D1D1F", whiteSpace: "pre-line" }}>
{`שלום,

אנחנו קבוצת עובדים מ-${group.orgName} שמאמינה שמגיע לנו יותר.

בום ביי מאפשרת לנו לקבל:
- 8% הנחה קבועה בסופרמרקטים
- מחירי יבואן על Apple, Samsung ועוד
- חופשות, תרבות ומותגי פרימיום במחירים בלעדיים
- מתנת חג עם בחירה חופשית

הכול בלי שהארגון מוציא שקל נוסף.

${count} עובדים כבר חתמו על הבקשה. הצטרפות שלך מחזקת אותנו.

אם גם לכם זה רלוונטי, מצטרפים כאן לבקשה, עונים על 2 שאלות קצרות, ואז ממשיכים לשיתוף.`}
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.07)", padding: "20px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ fontWeight: 700, fontSize: "15px", color: "#1D1D1F" }}>{count} / {currentTarget} עובדים</span>
            {count < currentTarget && <span style={{ fontSize: "12px", color: "#86868B" }}>עוד {currentTarget - count} להשלמת היעד</span>}
            {count >= TARGET_2 && <span style={{ fontSize: "12px", color: "#34C759", fontWeight: 700 }}>✓ עברתם 20!</span>}
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

        {/* Join / Already joined / Micro-survey */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
          style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.07)", padding: "20px 22px" }}>
          <AnimatePresence mode="wait">
            {showMicroSurvey && !surveyDone ? (
              <MicroSurvey key="survey" orgKey={orgSlug} orgName={group.orgName} onDone={handleSurveyDone} />
            ) : justJoined && surveyDone ? (
              <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "8px 0" }}>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>🎉</div>
                <p style={{ fontWeight: 800, fontSize: "16px", color: "#34C759", marginBottom: "6px" }}>הצטרפתם בהצלחה!</p>
                <p style={{ fontSize: "13px", color: "#86868B" }}>תודה על המשוב. עכשיו שתפו עוד עמיתים</p>
              </motion.div>
            ) : alreadyJoined ? (
              <motion.div key="already" style={{ textAlign: "center", padding: "8px 0" }}>
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>✅</div>
                <p style={{ fontWeight: 700, fontSize: "15px", color: "#34C759", marginBottom: "4px" }}>כבר הצטרפתם לבקשה</p>
                {!surveyDone ? (
                  <>
                    <p style={{ fontSize: "13px", color: "#86868B", marginBottom: "12px" }}>השלימו 2 שאלות קצרות כדי לפתוח את כלי השיתוף</p>
                    <button
                      onClick={() => setShowMicroSurvey(true)}
                      style={{ background: "#0066CC", color: "#fff", fontWeight: 700, fontSize: "14px", padding: "10px 22px", borderRadius: "12px", border: "none", cursor: "pointer", fontFamily: "var(--font-heebo)" }}
                    >
                      לשאלון ←
                    </button>
                  </>
                ) : (
                  <p style={{ fontSize: "13px", color: "#86868B" }}>שתפו עוד עמיתים כדי להגדיל את הסיכוי</p>
                )}
              </motion.div>
            ) : !showJoinForm ? (
              <motion.div key="cta">
                <p style={{ fontSize: "14px", fontWeight: 700, marginBottom: "12px", textAlign: "center" }}>הצטרפו לבקשה הקבוצתית</p>
                <button
                  onClick={() => setShowJoinForm(true)}
                  style={{ width: "100%", background: "#0066CC", color: "#fff", fontWeight: 800, fontSize: "16px", padding: "15px", borderRadius: "13px", border: "none", cursor: "pointer", fontFamily: "var(--font-heebo)", boxShadow: "0 6px 20px rgba(0,102,204,0.25)" }}
                >
                  כן, אני מצטרף ←
                </button>
                <p style={{ fontSize: "12px", color: "#AEAEB2", textAlign: "center", marginTop: "10px" }}>
                  מידע בסיסי בלבד · לא נמכר ולא משותף
                </p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p style={{ fontWeight: 700, fontSize: "15px", marginBottom: "14px" }}>מה שמך ומספר הטלפון?</p>
                <input
                  type="text"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  placeholder="שם פרטי ומשפחה"
                  style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.12)", background: "#F5F5F7", fontFamily: "var(--font-heebo)", fontSize: "15px", marginBottom: "10px", boxSizing: "border-box", textAlign: "right" }}
                  autoFocus
                />
                <input
                  type="tel"
                  value={memberPhone}
                  onChange={(e) => setMemberPhone(e.target.value)}
                  placeholder="מספר טלפון נייד (אופציונלי)"
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
            )}
          </AnimatePresence>
        </motion.div>

        {/* Share actions — gated behind survey completion */}
        <AnimatePresence>
          {showShareTools && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {/* WA share */}
              <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.07)", padding: "18px 20px" }}>
                <p style={{ fontWeight: 700, fontSize: "14px", marginBottom: "8px" }}>הודעה מוכנה לקבוצת העובדים</p>
                <div style={{ background: "#F5F5F7", borderRadius: "10px", padding: "11px 13px", fontSize: "12.5px", color: "#444", lineHeight: 1.65, marginBottom: "10px", whiteSpace: "pre-line", maxHeight: "120px", overflow: "hidden" }}>
                  {waMsg(group.orgName, count, orgSlug, myMemberId).slice(0, 220)}...
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={handleWACopy}
                    style={{ flex: 1, background: waCopied ? "#34C759" : "#0066CC", color: "#fff", fontWeight: 700, fontSize: "13px", padding: "10px", borderRadius: "10px", border: "none", cursor: "pointer", fontFamily: "var(--font-heebo)", transition: "background 0.15s" }}
                  >
                    {waCopied ? "הועתק! ✓" : "העתק הודעה"}
                  </button>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(waMsg(group.orgName, count, orgSlug, myMemberId))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ flex: 1, background: "#25D366", color: "#fff", fontWeight: 700, fontSize: "13px", padding: "10px", borderRadius: "10px", textAlign: "center", textDecoration: "none", fontFamily: "var(--font-heebo)", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    שלח בוואטסאפ ←
                  </a>
                </div>
              </div>

              {/* Management Letter */}
              <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.07)", padding: "18px 20px" }}>
                <p style={{ fontWeight: 700, fontSize: "14px", marginBottom: "8px" }}>מכתב מוכן להנהלה / ועד / רווחה</p>
                <div style={{ background: "#F5F5F7", borderRadius: "10px", padding: "11px 13px", fontSize: "12.5px", color: "#444", lineHeight: 1.65, marginBottom: "10px", whiteSpace: "pre-line", maxHeight: "100px", overflow: "hidden" }}>
                  {letterMsg(group.orgName, count, orgSlug, group).slice(0, 200)}...
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
          )}
        </AnimatePresence>

        {/* Prompt to complete survey if joined but survey not done */}
        {alreadyJoined && justJoined && !surveyDone && !showMicroSurvey && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ background: "rgba(0,102,204,0.07)", border: "1px solid rgba(0,102,204,0.2)", borderRadius: "14px", padding: "14px 18px", textAlign: "center" }}>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#0066CC" }}>
              השלימו את השאלון הקצר כדי לפתוח את כלי השיתוף
            </p>
          </motion.div>
        )}

      </div>
    </div>
  );
}