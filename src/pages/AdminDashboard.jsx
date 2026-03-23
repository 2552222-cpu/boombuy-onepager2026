import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";

const statusColors = {
  new_lead: "bg-blue-100 text-blue-700",
  collecting: "bg-yellow-100 text-yellow-700",
  warmed_up: "bg-orange-100 text-orange-700",
  hot: "bg-red-100 text-red-700",
  contacted: "bg-purple-100 text-purple-700",
  sent_to_hr: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-600",
};

const STATUS_LABELS = {
  new_lead: "ליד חדש",
  collecting: "אוסף",
  warmed_up: "חמים",
  hot: "בוער",
  contacted: "נוצר קשר",
  sent_to_hr: "נשלח ל-HR",
  closed: "סגור",
};

function calcLeadScore(req) {
  let score = 0;
  // org size
  if (req.orgSize?.includes("מעל 250")) score += 3;
  else if (req.orgSize?.includes("50–250")) score += 2;
  else if (req.orgSize) score += 1;
  // budget
  if (req.holidayBudget?.includes("מעל 500")) score += 3;
  else if (req.holidayBudget?.includes("200–500")) score += 2;
  else if (req.holidayBudget) score += 1;
  // count
  score += Math.min(req.currentCount || 0, 5);
  // activities
  score += (req.activities?.length || 0);
  // copied bonus
  if (req.whatsappCopied) score += 1;
  if (req.letterCopied) score += 2;
  return score;
}

function ScoreBadge({ score }) {
  const color =
    score >= 10 ? "#34C759" : score >= 6 ? "#FF9500" : "#86868B";
  return (
    <span
      style={{
        display: "inline-block",
        background: `${color}18`,
        color,
        fontWeight: 800,
        fontSize: "13px",
        padding: "3px 10px",
        borderRadius: "9999px",
        fontFamily: "var(--font-heebo)",
      }}
    >
      {score}
    </span>
  );
}

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

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
      else if (event.type === "delete")
        setRequests((prev) => prev.filter((r) => r.id !== event.id));
    });
    return () => unsub();
  }, []);

  const updateStatus = async (id, status) => {
    await base44.entities.GroupRequest.update(id, { status });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const sorted = [...requests].sort((a, b) => calcLeadScore(b) - calcLeadScore(a));

  return (
    <div
      className="min-h-screen"
      style={{ background: "#F5F5F7", padding: "32px 16px", fontFamily: "var(--font-heebo)" }}
      dir="rtl"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: "#1D1D1F",
              marginBottom: "4px",
            }}
          >
            BoomBuy — ניהול לידים
          </h1>
          <p style={{ fontSize: "14px", color: "#86868B" }}>
            {sorted.length} ארגונים · ממוין לפי Lead Score
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          {[
            { label: "סה״כ ארגונים", value: sorted.length },
            { label: "עובדים שהצטרפו", value: sorted.reduce((s, r) => s + (r.currentCount || 0), 0) },
            { label: "WA הועתק", value: sorted.filter((r) => r.whatsappCopied).length },
            { label: "מכתב הועתק", value: sorted.filter((r) => r.letterCopied).length },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: "14px",
                border: "1px solid rgba(0,0,0,0.06)",
                padding: "16px 18px",
              }}
            >
              <p style={{ fontSize: "11px", color: "#86868B", marginBottom: "4px" }}>{stat.label}</p>
              <p style={{ fontSize: "26px", fontWeight: 900, color: "#1D1D1F", letterSpacing: "-0.02em" }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            border: "1px solid rgba(0,0,0,0.06)",
            overflow: "hidden",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F5F5F7", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                  {[
                    "ארגון",
                    "גודל",
                    "תקציב חג",
                    "פעילויות",
                    "עובדים",
                    "WA",
                    "מכתב",
                    "Lead Score",
                    "סטטוס",
                    "פעולה",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 16px",
                        textAlign: "right",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#86868B",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.map((req, i) => (
                  <motion.tr
                    key={req.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
                  >
                    <td style={{ padding: "12px 16px", fontWeight: 700, fontSize: "13px", color: "#1D1D1F", whiteSpace: "nowrap" }}>
                      {req.orgName}
                      {req.initiatorName && (
                        <div style={{ fontSize: "11px", color: "#86868B", fontWeight: 400 }}>
                          {req.initiatorName}
                          {req.initiatorPhone && ` · ${req.initiatorPhone}`}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#1D1D1F", whiteSpace: "nowrap" }}>
                      {req.orgSize || "—"}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#1D1D1F", whiteSpace: "nowrap" }}>
                      {req.holidayBudget || "—"}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#1D1D1F", maxWidth: "140px" }}>
                      {req.activities?.length
                        ? req.activities.join(", ")
                        : <span style={{ color: "#C7C7CC" }}>—</span>}
                    </td>
                    <td style={{ padding: "12px 16px", textAlign: "center" }}>
                      <span style={{ fontWeight: 800, fontSize: "15px", color: "#0066CC" }}>
                        {req.currentCount || 1}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", textAlign: "center" }}>
                      <span style={{ fontSize: "15px" }}>{req.whatsappCopied ? "✓" : "—"}</span>
                    </td>
                    <td style={{ padding: "12px 16px", textAlign: "center" }}>
                      <span style={{ fontSize: "15px" }}>{req.letterCopied ? "✓" : "—"}</span>
                    </td>
                    <td style={{ padding: "12px 16px", textAlign: "center" }}>
                      <ScoreBadge score={calcLeadScore(req)} />
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <select
                        value={req.status || "new_lead"}
                        onChange={(e) => updateStatus(req.id, e.target.value)}
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          padding: "4px 8px",
                          borderRadius: "8px",
                          border: "1px solid rgba(0,0,0,0.1)",
                          background: "#F5F5F7",
                          fontFamily: "var(--font-heebo)",
                          cursor: "pointer",
                        }}
                      >
                        {Object.entries(STATUS_LABELS).map(([val, label]) => (
                          <option key={val} value={val}>{label}</option>
                        ))}
                      </select>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <a
                        href={`https://wa.me/972${(req.initiatorPhone || "542552222").replace(/^0/, "").replace(/-/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: "#0066CC",
                          color: "#fff",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "6px 12px",
                          borderRadius: "8px",
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                          fontFamily: "var(--font-heebo)",
                        }}
                      >
                        וואטסאפ
                      </a>
                    </td>
                  </motion.tr>
                ))}
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
    </div>
  );
}