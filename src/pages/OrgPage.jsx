import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpLeft, ShoppingCart, Smartphone, Plane, Zap } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { buildWaMessage, buildLetterMessage, buildSurveyInsights } from "@/utils/messages";
import ILS from "../components/employees/ILS";

const TARGET_1 = 10;
const TARGET_2 = 20;
const TARGET_LARGE = 50;


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

// ─── Mini Landing Proof Cards ─────────────────────────────────────────────────
const PROOF_CARDS = [
  { Icon: ShoppingCart, title: "סופר ופארם", sub: "8% הנחה קבועה ברשתות הדיסקאונט המוזלות" },
  { Icon: Smartphone, title: "חשמל ואלקטרוניקה", sub: "מחירי יבואן על Apple, Samsung ועוד" },
  { Icon: Plane, title: "חופשות והופעות", sub: "חבילות בלעדיות בארץ ובחו\"ל" },
  { Icon: Zap, title: "הטבה יומית", sub: "כל בוקר הטבה חדשה ישירות לוואטסאפ" },
];



// ─── Mini Landing ─────────────────────────────────────────────────────────────
function MiniLanding({ orgName }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      style={{ background: "#fff", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.07)", padding: "26px 22px" }}>
      {/* Badge */}
      <div style={{ display: "inline-block", background: "rgba(0,102,204,0.08)", border: "1px solid rgba(0,102,204,0.18)", borderRadius: 999, padding: "5px 14px", marginBottom: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#0066CC" }}>בקשה פעילה של עובדי {orgName}</span>
      </div>
      <h1 style={{ fontSize: "clamp(20px, 4.5vw, 26px)", fontWeight: 900, color: "#1D1D1F", letterSpacing: "-0.025em", lineHeight: 1.25, marginBottom: 10 }}>
        כך זה יכול לעזור גם לעובדים אצלכם
      </h1>
      <p style={{ fontSize: 14, color: "#6E6E73", lineHeight: 1.65, marginBottom: 22 }}>
        לפני שמצטרפים לבקשה, הנה כמה דוגמאות להטבות שיכולות לעזור להתמודד עם יוקר המחיה ולתת יותר ערך לאורך השנה
      </p>
      {/* Proof cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
        {PROOF_CARDS.map((c) => (
          <div key={c.title} style={{ background: "#F5F5F7", borderRadius: 12, padding: "12px 12px" }}>
            <c.Icon size={18} color="#0055CC" strokeWidth={1.75} style={{ marginBottom: 8 }} />
            <p style={{ fontSize: 12.5, fontWeight: 800, color: "#1D1D1F", marginBottom: 2, lineHeight: 1.25 }}>{c.title}</p>
            <p style={{ fontSize: 11, color: "#86868B", lineHeight: 1.4 }}>{c.sub}</p>
          </div>
        ))}
      </div>
      {/* Full-width secondary benefits preview tile */}
      <a href="https://boom-perk-flow.base44.app/#offers-slider" target="_blank" rel="noopener noreferrer"
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "#F0F4FF", border: "1.5px solid rgba(0, 102, 204, 0.3)", borderRadius: 14, padding: "18px 16px",
          textDecoration: "none", cursor: "pointer", transition: "all 0.24",
          boxShadow: "0 2px 16px rgba(0, 102, 204, 0.12)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(0, 102, 204, 0.45)";
          e.currentTarget.style.boxShadow = "0 4px 24px rgba(0, 102, 204, 0.18)";
          e.currentTarget.style.background = "#E8F0FF";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(0, 102, 204, 0.3)";
          e.currentTarget.style.boxShadow = "0 2px 16px rgba(0, 102, 204, 0.12)";
          e.currentTarget.style.background = "#F0F4FF";
        }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#0066CC", marginBottom: 4, margin: 0 }}>תראו לי את ההסבר המלא וההטבות</p>
          <p style={{ fontSize: 11.5, color: "#86868B", margin: 0, lineHeight: 1.4 }}>דוגמאות נוספות למה שהעובדים יכולים לקבל לאורך השנה</p>
        </div>
        <ArrowUpLeft size={18} color="#0066CC" style={{ flexShrink: 0, marginRight: 12 }} strokeWidth={1.75} />
      </a>
    </motion.div>
  );
}

// ─── Micro Survey ─────────────────────────────────────────────────────────────
const MICRO_QUESTIONS = [
  {
    q: "עד כמה מה שראית כאן רלוונטי לך אישית?",
    opts: ["מאוד", "די", "קצת", "לא ממש"]
  },
  {
    q: "מה הכי מדבר אליך מתוך מה שראית?",
    opts: ["סופר ויוקר המחיה", "חופשות והופעות", "חשמל ואלקטרוניקה", "הטבות יומיות לאורך השנה"]
  },
  {
    q: "איזה משפט הכי נכון מבחינתך?",
    opts: ["זה יכול לעזור לי מאוד לעבור את החודש", "זה יכול לתת לי ערך אמיתי לאורך השנה", "הארגון שלנו חייב פתרון כזה", "מעניין, אבל פחות רלוונטי לי כרגע"]
  },
];

function MicroSurvey({ orgKey, orgName, onDone }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = async (opt) => {
    const next = [...answers, opt];
    setAnswers(next);
    if (next.length < MICRO_QUESTIONS.length) {
      setStep(step + 1);
    } else {
      try {
        await base44.entities.SurveyResponse.create({
          orgKey,
          orgName,
          answer1: next[0],
          answer2: next[1],
          answer3: next[2],
          sessionToken: Math.random().toString(36).slice(2) + Date.now().toString(36),
        });
      } catch {}
      onDone();
    }
  };

  const current = MICRO_QUESTIONS[step];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,102,204,0.15)", padding: "22px 20px" }}
    >
          <p style={{ fontSize: "11px", fontWeight: 700, color: "#0066CC", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px" }}>
        שאלה {step + 1} מתוך {MICRO_QUESTIONS.length} · 10 שניות
      </p>
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }}>
          <p style={{ fontSize: "16px", fontWeight: 800, marginBottom: "14px", lineHeight: 1.35 }}>{current.q}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {current.opts.map((opt) => (
              <button key={opt} onClick={() => handleAnswer(opt)}
                style={{ background: "#F5F5F7", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "999px", padding: "9px 16px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-heebo)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#EBF3FF"; e.currentTarget.style.borderColor = "#0066CC"; e.currentTarget.style.color = "#0066CC"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F5F7"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; e.currentTarget.style.color = "inherit"; }}
              >{opt}</button>
            ))}
          </div>
        </motion.div>
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
  const isLargeOrg = group?.orgSize === "1000+ עובדים";
  const currentTarget = isLargeOrg ? TARGET_LARGE : TARGET_2;
  const progress = Math.min((count / currentTarget) * 100, 100);

  return (
    <div dir="rtl" style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "var(--font-heebo)", padding: "0 0 60px" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.06)", padding: "16px 20px", display: "flex", justifyContent: "flex-end" }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <div style={{ fontSize: "clamp(16px, 4vw, 18px)", fontWeight: 900, color: "#0066CC", letterSpacing: "-0.03em", fontFamily: "var(--font-heebo)" }}>BoomBuy</div>
        </a>
      </div>

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "32px 16px", display: "flex", flexDirection: "column", gap: "16px" }}>

        {/* Mini Landing */}
        <MiniLanding orgName={group.orgName} />

        {/* Progress */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.07)", padding: "20px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ fontWeight: 700, fontSize: "15px", color: "#1D1D1F" }}>{count} / {currentTarget} עובדים</span>
            {count < currentTarget && <span style={{ fontSize: "12px", color: "#86868B" }}>עוד {currentTarget - count} להשלמת היעד</span>}
            {count >= currentTarget && <span style={{ fontSize: "12px", color: "#34C759", fontWeight: 700 }}>✓ עברתם {currentTarget}!</span>}
          </div>
          <div style={{ height: "8px", background: "rgba(0,0,0,0.07)", borderRadius: "9999px", overflow: "hidden" }}>
            <motion.div
              style={{ height: "100%", background: count >= currentTarget ? "#34C759" : "#0066CC", borderRadius: "9999px" }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </div>
          <p style={{ fontSize: "12px", color: "#86868B", marginTop: "10px", lineHeight: 1.5 }}>
            ככל שיותר עובדים מצטרפים, הפנייה לוועד / רווחה / הנהלה מקבלת יותר משקל.
          </p>
        </motion.div>

        {/* Step: Survey → Join → Share */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
          style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.07)", padding: "20px 22px" }}>
          <AnimatePresence mode="wait">
            {alreadyJoined ? (
              <motion.div key="joined" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
                  <p style={{ fontWeight: 800, fontSize: 17, color: "#1D1D1F", marginBottom: 4 }}>הצטרפתם בהצלחה!</p>
                  <p style={{ fontSize: 13, color: "#86868B", marginBottom: 20 }}>
                    שתפו עוד עמיתים — ככל שיצטרפו יותר, כך גדל הסיכוי שזה יקרה
                  </p>
                </div>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(waMsg(group.orgName, group.currentCount || 1, orgSlug, myMemberId))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "block", background: "#25D366", color: "#fff", textDecoration: "none", padding: "15px", borderRadius: 14, fontSize: 15, fontWeight: 800, textAlign: "center", marginBottom: 10, fontFamily: "var(--font-heebo)" }}
                >
                  שתפו עמיתים בוואטסאפ ← (מומלץ)
                </a>
                <button
                  onClick={handleLetterCopy}
                  style={{ width: "100%", background: "transparent", color: "#0066CC", fontWeight: 700, fontSize: 14, padding: "13px", borderRadius: 13, border: "1.5px solid rgba(0,102,204,0.25)", cursor: "pointer", fontFamily: "var(--font-heebo)" }}
                >
                  {letterCopied ? "✓ הועתק!" : "העתק מכתב ל-HR / ועד"}
                </button>
              </motion.div>
            ) : !surveyDone ? (
              <MicroSurvey key="survey" orgKey={orgSlug} orgName={group.orgName} onDone={handleSurveyDone} />
            ) : !showJoinForm ? (
              <motion.div key="cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p style={{ fontSize: "14px", fontWeight: 700, marginBottom: "12px", textAlign: "center" }}>תודה על המשוב. עכשיו הצטרפו לבקשה</p>
                <button onClick={() => setShowJoinForm(true)}
                  style={{ width: "100%", background: "#0066CC", color: "#fff", fontWeight: 800, fontSize: "16px", padding: "15px", borderRadius: "13px", border: "none", cursor: "pointer", fontFamily: "var(--font-heebo)", boxShadow: "0 6px 20px rgba(0,102,204,0.25)" }}>
                  אני מצטרף לבקשה ←
                </button>
                <p style={{ fontSize: "12px", color: "#AEAEB2", textAlign: "center", marginTop: "10px" }}>מידע בסיסי בלבד · לא נמכר ולא משותף</p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p style={{ fontWeight: 700, fontSize: "15px", marginBottom: "14px" }}>מה שמך ומספר הטלפון?</p>
                <input type="text" value={memberName} onChange={(e) => setMemberName(e.target.value)}
                  placeholder="שם פרטי ומשפחה"
                  style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.12)", background: "#F5F5F7", fontFamily: "var(--font-heebo)", fontSize: "15px", marginBottom: "10px", boxSizing: "border-box", textAlign: "right" }}
                  autoFocus />
                <input type="tel" value={memberPhone} onChange={(e) => setMemberPhone(e.target.value)}
                  placeholder="מספר טלפון נייד"
                  style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.12)", background: "#F5F5F7", fontFamily: "var(--font-heebo)", fontSize: "15px", marginBottom: "12px", boxSizing: "border-box", textAlign: "right" }} />
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={handleJoin} disabled={!memberName.trim() || joining}
                    style={{ flex: 1, background: memberName.trim() ? "#0066CC" : "#C7C7CC", color: "#fff", fontWeight: 700, fontSize: "14px", padding: "13px", borderRadius: "10px", border: "none", cursor: memberName.trim() ? "pointer" : "default", fontFamily: "var(--font-heebo)" }}>
                    {joining ? "שומר..." : "אני מצטרף לבקשה"}
                  </button>
                  <button onClick={() => setShowJoinForm(false)}
                    style={{ background: "transparent", color: "#86868B", fontSize: "13px", padding: "13px 16px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.1)", cursor: "pointer", fontFamily: "var(--font-heebo)" }}>
                    ביטול
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}