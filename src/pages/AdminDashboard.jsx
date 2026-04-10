import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Users } from "lucide-react";

// ── Lead Score ──────────────────────────────────────────────────────────────
function calcLeadScore(req) {
  let score = 0;
  const size = req.orgSize || "";
  if (size.includes("מעל 250") || size.includes("500+")) score += 4;
  else if (size.includes("201") || size.includes("250")) score += 3;
  else if (size.includes("50–250") || size.includes("51")) score += 2;
  else if (size.includes("עד 50")) score += 1;

  const budget = req.holidayBudget || "";
  if (budget.includes("מעל 500") || budget.includes("700")) score += 3;
  else if (budget.includes("200–500") || budget.includes("400")) score += 2;
  else if (budget.includes("עד 200")) score += 1;

  score += Math.min(req.activities?.length || 0, 4);

  const cnt = req.currentCount || 1;
  score += Math.min(cnt, 5);

  if (req.whatsappCopied) score += 1;
  if (req.letterCopied) score += 1;

  return score;
}

function getLeadStatus(score) {
  if (score >= 13) return { label: "Very Hot", color: "#FF2D55", bg: "#FFF0F3" };
  if (score >= 9) return { label: "Hot", color: "#FF9500", bg: "#FFF8EC" };
  if (score >= 5) return { label: "Warm", color: "#0066CC", bg: "#EBF3FF" };
  return { label: "Cold", color: "#86868B", bg: "#F5F5F7" };
}

// ── Members Drawer ──────────────────────────────────────────────────────────
function MembersDrawer({ req, onClose }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const orgSlug = req.orgKey;

  useEffect(() => {
    base44.entities.GroupMember.filter({ orgKey: orgSlug })
      .then(setMembers)
      .finally(() => setLoading(false));
  }, [orgSlug]);

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 100, display: "flex", alignItems: "flex-start", justifyContent: "flex-end" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        exit={{ x: 400 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        style={{ width: "100%", maxWidth: 420, height: "100vh", background: "#fff", boxShadow: "-8px 0 32px rgba(0,0,0,0.12)", overflowY: "auto", padding: "24px 20px", fontFamily: "var(--font-heebo)" }}
        dir="rtl"
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 900, color: "#1D1D1F", marginBottom: "2px" }}>{req.orgName}</h2>
            <a
              href={`/join/${orgSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "12px", color: "#0066CC", display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}
            >
              עמוד הארגון <ExternalLink size={11} />
            </a>
          </div>
          <button onClick={onClose} style={{ background: "#F5F5F7", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "20px" }}>
          {[
            ["גודל ארגון", req.orgSize || "—"],
            ["תקציב חג", req.holidayBudget || "—"],
            ["פעילויות", req.activities?.join(", ") || "—"],
            ["עובדים", req.currentCount || 1],
            ["WA הועתק", req.whatsappCopied ? "✓ כן" : "לא"],
            ["מכתב הועתק", req.letterCopied ? "✓ כן" : "לא"],
            ["התראה 10", req.notified10 ? "✅ נשלחה" : "—"],
            ["התראה 20", req.notified20 ? "✅ נשלחה" : "—"],
            ["התראה 50", req.notified50 ? "✅ נשלחה" : "—"],
          ].map(([label, val]) => (
            <div key={label} style={{ background: "#F5F5F7", borderRadius: "10px", padding: "10px 12px" }}>
              <p style={{ fontSize: "10px", color: "#86868B", marginBottom: "2px" }}>{label}</p>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#1D1D1F" }}>{val}</p>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "16px" }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#1D1D1F", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
            <Users size={14} /> עובדים שהצטרפו ({members.length})
          </p>
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px", color: "#86868B", fontSize: "13px" }}>טוען...</div>
          ) : members.length === 0 ? (
            <div style={{ textAlign: "center", padding: "20px", color: "#C7C7CC", fontSize: "13px" }}>עדיין אין עובדים שהצטרפו דרך עמוד הארגון</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {members.map((m) => (
                <div key={m.id} style={{ background: "#F5F5F7", borderRadius: "10px", padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 700, color: "#1D1D1F" }}>{m.memberName}</p>
                    {m.memberPhone && <p style={{ fontSize: "11px", color: "#86868B" }}>{m.memberPhone}</p>}
                  </div>
                  <p style={{ fontSize: "10px", color: "#C7C7CC" }}>
                    {new Date(m.created_date).toLocaleDateString("he-IL")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ── Demo Modal ──────────────────────────────────────────────────────────────
function DemoModal({ req, onClose }) {
  const score = calcLeadScore(req);
  const status = getLeadStatus(score);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }} onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.22 }}
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#fff", borderRadius: "20px", padding: "28px 24px", width: "100%", maxWidth: "440px", boxShadow: "0 24px 64px rgba(0,0,0,0.16)", fontFamily: "var(--font-heebo)", position: "relative" }}
        dir="rtl"
      >
        <button onClick={onClose} style={{ position: "absolute", top: 14, left: 14, background: "#F5F5F7", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <X size={16} />
        </button>
        <p style={{ fontSize: "11px", color: "#86868B", marginBottom: "4px" }}>דמו מותאם</p>
        <h2 style={{ fontSize: "22px", fontWeight: 900, marginBottom: "20px", letterSpacing: "-0.02em" }}>{req.orgName}</h2>

        {[
          ["גודל ארגון", req.orgSize || "—"],
          ["תקציב חג", req.holidayBudget || "—"],
          ["פעילויות", req.activities?.join(", ") || "—"],
          ["עובדים שהצטרפו", req.currentCount || 1],
          ["WA הועתק", req.whatsappCopied ? "כן" : "לא"],
          ["מכתב הועתק", req.letterCopied ? "כן" : "לא"],
        ].map(([label, value]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: "14px" }}>
            <span style={{ color: "#86868B" }}>{label}</span>
            <span style={{ fontWeight: 600 }}>{value}</span>
          </div>
        ))}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", padding: "12px 14px", background: status.bg, borderRadius: "12px" }}>
          <span style={{ fontSize: "13px", color: "#86868B" }}>Lead Score</span>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontWeight: 900, fontSize: "22px", color: status.color }}>{score}</span>
            <span style={{ background: status.bg, color: status.color, border: `1px solid ${status.color}40`, fontWeight: 700, fontSize: "12px", padding: "3px 10px", borderRadius: "9999px" }}>{status.label}</span>
          </div>
        </div>

        {req.initiatorPhone && (
          <a href={`https://wa.me/972${req.initiatorPhone.replace(/^0/, "").replace(/-/g, "")}`} target="_blank" rel="noopener noreferrer"
            style={{ display: "block", marginTop: "14px", background: "#0066CC", color: "#fff", fontWeight: 700, fontSize: "14px", padding: "13px", borderRadius: "12px", textAlign: "center", textDecoration: "none" }}>
            שלחו דמו בוואטסאפ
          </a>
        )}
      </motion.div>
    </div>
  );
}

// ── Dashboard ────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [demoReq, setDemoReq] = useState(null);
  const [drawerReq, setDrawerReq] = useState(null);
  const [sortBy, setSortBy] = useState("score");

  const fetchRequests = async () => {
    try {
      const data = await base44.entities.GroupRequest.list("-created_date");
      setRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    const unsub = base44.entities.GroupRequest.subscribe((event) => {
      if (event.type === "update" || event.type === "create") fetchRequests();
      else if (event.type === "delete") setRequests((prev) => prev.filter((r) => r.id !== event.id));
    });
    return () => unsub();
  }, []);

  // Admin-only guard — blocks both non-admin AND unauthenticated users
  if (!loading && (!user || user.role !== 'admin')) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F5F7", fontFamily: "var(--font-heebo)" }} dir="rtl">
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px" }}>גישה אסורה</p>
          <p style={{ fontSize: "14px", color: "#86868B" }}>עמוד זה מיועד למנהלי מערכת בלבד.</p>
          <a href="/" style={{ color: "#0066CC", fontSize: "14px", marginTop: "12px", display: "block" }}>חזרה לעמוד הראשי</a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const sorted = [...requests].sort((a, b) => {
    if (sortBy === "score") return calcLeadScore(b) - calcLeadScore(a);
    if (sortBy === "count") return (b.currentCount || 0) - (a.currentCount || 0);
    if (sortBy === "updated") return new Date(b.updated_date || b.lastJoinedAt || 0) - new Date(a.updated_date || a.lastJoinedAt || 0);
    return new Date(b.created_date) - new Date(a.created_date);
  });

  return (
    <div style={{ background: "#F5F5F7", minHeight: "100vh", padding: "32px 16px", fontFamily: "var(--font-heebo)" }} dir="rtl">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: 900, letterSpacing: "-0.02em", color: "#1D1D1F", marginBottom: "2px" }}>BoomBuy — ניהול לידים</h1>
            <p style={{ fontSize: "13px", color: "#86868B" }}>{sorted.length} ארגונים</p>
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <span style={{ fontSize: "12px", color: "#86868B" }}>מיון:</span>
            {[["score", "Lead Score"], ["count", "עובדים"], ["updated", "עדכון אחרון"], ["date", "תאריך יצירה"]].map(([val, label]) => (
              <button key={val} onClick={() => setSortBy(val)}
                style={{ padding: "6px 12px", borderRadius: "8px", border: "none", background: sortBy === val ? "#0066CC" : "#fff", color: sortBy === val ? "#fff" : "#1D1D1F", fontWeight: 600, fontSize: "12px", cursor: "pointer", fontFamily: "var(--font-heebo)" }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px", marginBottom: "20px" }}>
          {[
            ["סה״כ ארגונים", sorted.length],
            ["עובדים שהצטרפו", sorted.reduce((s, r) => s + (r.currentCount || 0), 0)],
            ["WA הועתק", sorted.filter((r) => r.whatsappCopied).length],
            ["מכתב הועתק", sorted.filter((r) => r.letterCopied).length],
            ["Hot+", sorted.filter((r) => calcLeadScore(r) >= 9).length],
          ].map(([label, value]) => (
            <div key={label} style={{ background: "#fff", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.06)", padding: "14px 16px" }}>
              <p style={{ fontSize: "11px", color: "#86868B", marginBottom: "3px" }}>{label}</p>
              <p style={{ fontSize: "24px", fontWeight: 900, color: "#1D1D1F", letterSpacing: "-0.02em" }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F5F5F7", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                  {["ארגון", "Normalized", "גודל", "תקציב חג", "פעילויות", "עובדים", "WA", "מכתב", "Score", "סטטוס", "עדכון אחרון", "עמוד", "פעולות"].map((h) => (
                    <th key={h} style={{ padding: "11px 12px", textAlign: "right", fontSize: "11px", fontWeight: 600, color: "#86868B", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.map((req, i) => {
                  const score = calcLeadScore(req);
                  const status = getLeadStatus(score);
                  return (
                    <motion.tr key={req.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                      style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                      <td style={{ padding: "12px 12px", fontWeight: 700, fontSize: "13px", whiteSpace: "nowrap" }}>
                        {req.orgName}
                        {req.initiatorName && <div style={{ fontSize: "11px", color: "#86868B", fontWeight: 400 }}>{req.initiatorName}{req.initiatorPhone && ` · ${req.initiatorPhone}`}</div>}
                      </td>
                      <td style={{ padding: "12px 12px", fontSize: "11px", color: "#86868B", whiteSpace: "nowrap" }}>{req.orgKey}</td>
                      <td style={{ padding: "12px 12px", fontSize: "12px", whiteSpace: "nowrap" }}>{req.orgSize || "—"}</td>
                      <td style={{ padding: "12px 12px", fontSize: "12px", whiteSpace: "nowrap" }}>{req.holidayBudget || "—"}</td>
                      <td style={{ padding: "12px 12px", fontSize: "12px", maxWidth: "120px" }}>{req.activities?.length ? req.activities.join(", ") : <span style={{ color: "#C7C7CC" }}>—</span>}</td>
                      <td style={{ padding: "12px 12px", textAlign: "center", fontWeight: 800, fontSize: "16px", color: "#0066CC" }}>{req.currentCount || 1}</td>
                      <td style={{ padding: "12px 12px", textAlign: "center", fontSize: "14px" }}>{req.whatsappCopied ? <span style={{ color: "#34C759" }}>✓</span> : <span style={{ color: "#C7C7CC" }}>—</span>}</td>
                      <td style={{ padding: "12px 12px", textAlign: "center", fontSize: "14px" }}>{req.letterCopied ? <span style={{ color: "#34C759" }}>✓</span> : <span style={{ color: "#C7C7CC" }}>—</span>}</td>
                      <td style={{ padding: "12px 12px", textAlign: "center" }}>
                        <span style={{ fontWeight: 900, fontSize: "15px", color: status.color }}>{score}</span>
                      </td>
                      <td style={{ padding: "12px 12px" }}>
                        <span style={{ background: status.bg, color: status.color, fontWeight: 700, fontSize: "11px", padding: "3px 9px", borderRadius: "9999px", border: `1px solid ${status.color}30`, whiteSpace: "nowrap" }}>{status.label}</span>
                      </td>
                      <td style={{ padding: "12px 12px", fontSize: "11px", color: "#86868B", whiteSpace: "nowrap" }}>
                        {req.lastJoinedAt ? new Date(req.lastJoinedAt).toLocaleDateString("he-IL") : new Date(req.created_date).toLocaleDateString("he-IL")}
                      </td>
                      <td style={{ padding: "12px 12px" }}>
                        <a href={`/join/${req.orgKey}`} target="_blank" rel="noopener noreferrer"
                          style={{ color: "#0066CC", fontSize: "12px", display: "flex", alignItems: "center", gap: "3px", textDecoration: "none" }}>
                          פתח <ExternalLink size={11} />
                        </a>
                      </td>
                      <td style={{ padding: "12px 12px" }}>
                        <div style={{ display: "flex", gap: "6px" }}>
                          <button onClick={() => setDrawerReq(req)}
                            style={{ background: "#F5F5F7", color: "#1D1D1F", fontSize: "11px", fontWeight: 600, padding: "5px 9px", borderRadius: "7px", border: "none", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "var(--font-heebo)" }}>
                            עובדים
                          </button>
                          <button onClick={() => setDemoReq(req)}
                            style={{ background: "#0066CC", color: "#fff", fontSize: "11px", fontWeight: 700, padding: "5px 9px", borderRadius: "7px", border: "none", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "var(--font-heebo)" }}>
                            דמו מותאם
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
            {sorted.length === 0 && (
              <div style={{ padding: "48px", textAlign: "center", color: "#86868B", fontSize: "14px" }}>
                עדיין אין לידים. כשעובדים ימלאו את השאלון, הם יופיעו כאן.
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {demoReq && <DemoModal req={demoReq} onClose={() => setDemoReq(null)} />}
        {drawerReq && <MembersDrawer req={drawerReq} onClose={() => setDrawerReq(null)} />}
      </AnimatePresence>
    </div>
  );
}