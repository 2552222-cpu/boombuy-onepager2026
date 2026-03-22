import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function RequestModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    initiatorName: "",
    initiatorPhone: "",
    orgName: "",
    initiatorEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const normalizeOrgKey = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^\w_]/g, "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.initiatorName || !formData.initiatorPhone || !formData.orgName) {
      setError("שדות חובה חסרים");
      return;
    }

    setLoading(true);

    try {
      const orgKey = normalizeOrgKey(formData.orgName);

      // בדוק אם בקשה כבר קיימת
      const existing = await base44.entities.GroupRequest.filter({
        orgKey: orgKey,
      });

      let groupRequest;
      if (existing.length > 0) {
        groupRequest = existing[0];
      } else {
        // יצירת בקשה חדשה
        groupRequest = await base44.entities.GroupRequest.create({
          orgName: formData.orgName,
          orgKey: orgKey,
          initiatorName: formData.initiatorName,
          initiatorPhone: formData.initiatorPhone,
          initiatorEmail: formData.initiatorEmail || "",
          currentCount: 1,
          status: "new_lead",
          source: "employees",
          lastJoinedAt: new Date().toISOString(),
        });
      }

      // שמור browserToken
      const browserToken = `browser_${Date.now()}_${Math.random()}`;
      localStorage.setItem(`groupmember_${orgKey}`, browserToken);

      // צור GroupMember לעובד הראשון
      await base44.entities.GroupMember.create({
        groupRequestId: groupRequest.id,
        orgKey: orgKey,
        orgName: formData.orgName,
        memberName: formData.initiatorName,
        memberPhone: formData.initiatorPhone,
        memberEmail: formData.initiatorEmail || "",
        browserToken: browserToken,
        source: "employees",
      });

      // שלח מייל על עובד ראשון אם זו בקשה חדשה
      if (existing.length === 0) {
        await base44.integrations.Core.SendEmail({
          to: "ari@boombuy.co.il,uriel@boombuy.co.il",
          subject: "BoomBuy - עובד ראשון פתח בקשה",
          body: `
Organization: ${formData.orgName}
orgKey: ${orgKey}
Current Count: 1
Initiator Name: ${formData.initiatorName}
Initiator Phone: ${formData.initiatorPhone}
Initiator Email: ${formData.initiatorEmail || "N/A"}
Created At: ${new Date().toISOString()}
HR Page: https://www.boombuyonepage.com
Employees Page: https://www.boombuyonepage.com/employees?orgKey=${orgKey}
          `,
        });
      }

      onSuccess(groupRequest, orgKey);
      onClose();
    } catch (err) {
      setError("שגיאה בשליחה. אנא נסו שוב.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      style={{ overflowX: 'hidden' }}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-black/5 w-full max-w-md"
      >
        <button
          onClick={onClose}
          className="absolute top-3 md:top-4 right-3 md:right-4 w-7 md:w-8 h-7 md:h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
        >
          <X className="w-3.5 md:w-4 h-3.5 md:h-4" />
        </button>

        <div className="p-5 md:p-8 max-h-[90vh] overflow-y-auto">
          <h2 className="text-lg md:text-2xl font-black mb-4 md:mb-6 text-foreground">פתח בקשה</h2>

          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <input
              type="text"
              placeholder="שם פרטי *"
              value={formData.initiatorName}
              onChange={(e) =>
                setFormData({ ...formData, initiatorName: e.target.value })
              }
              className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground text-sm md:text-base"
            />

            <input
              type="tel"
              placeholder="טלפון *"
              value={formData.initiatorPhone}
              onChange={(e) =>
                setFormData({ ...formData, initiatorPhone: e.target.value })
              }
              className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground text-sm md:text-base"
            />

            <input
              type="text"
              placeholder="שם הארגון *"
              value={formData.orgName}
              onChange={(e) =>
                setFormData({ ...formData, orgName: e.target.value })
              }
              className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground text-sm md:text-base"
            />

            <input
              type="email"
              placeholder="מייל (אופציונלי)"
              value={formData.initiatorEmail}
              onChange={(e) =>
                setFormData({ ...formData, initiatorEmail: e.target.value })
              }
              className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground text-sm md:text-base"
            />

            {error && <p className="text-red-600 text-xs md:text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2.5 md:py-3 px-4 rounded-lg transition-all disabled:opacity-50 text-sm md:text-base"
            >
              {loading ? "שליחה..." : "פתח בקשה"}
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}