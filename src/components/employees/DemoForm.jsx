import React, { useState } from "react";
import { base44 } from "@/api/base44Client";

export default function DemoForm() {
  const [form, setForm] = useState({ name: "", phone: "", org: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await base44.functions.invoke("sendDemoLead", { name: form.name, phone: form.phone, org: form.org });
      setSubmitted(true);
    } catch (err) {
      alert("שגיאה בשליחה: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ background: "#fff", borderRadius: 20, padding: "40px 24px", boxShadow: "0 2px 20px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ fontSize: 40, marginBottom: 14 }}>✅</div>
        <h3 style={{ fontSize: 22, fontWeight: 900, color: "#1D1D1F", marginBottom: 8 }}>קיבלנו! נחזור אליכם בקרוב</h3>
        <p style={{ fontSize: 15, color: "#6E6E73", lineHeight: 1.6 }}>נציג יצור איתכם קשר לתיאום הדמו</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: "#fff", borderRadius: 20, padding: "32px 24px", boxShadow: "0 2px 20px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.07)", display: "flex", flexDirection: "column", gap: 14 }}>
      <input
        required
        placeholder="שם מלא"
        value={form.name}
        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        style={inputStyle}
      />
      <input
        required
        type="tel"
        placeholder="מספר טלפון"
        value={form.phone}
        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
        style={inputStyle}
      />
      <input
        required
        placeholder="שם הארגון"
        value={form.org}
        onChange={e => setForm(f => ({ ...f, org: e.target.value }))}
        style={inputStyle}
      />
      <button
        type="submit"
        disabled={loading}
        style={{
          background: "#0066CC",
          color: "#fff",
          fontWeight: 800,
          fontSize: 16,
          padding: "16px",
          borderRadius: 14,
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          fontFamily: "var(--font-heebo)",
          opacity: loading ? 0.7 : 1,
          marginTop: 4,
        }}
      >
        {loading ? "שולח..." : "קבע 15 דק׳ דמו ←"}
      </button>
    </form>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 12,
  border: "1.5px solid rgba(0,0,0,0.1)",
  fontSize: 15,
  fontFamily: "var(--font-heebo)",
  outline: "none",
  boxSizing: "border-box",
  textAlign: "right",
  background: "#FAFAFA",
};