import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

export default function JoinScreen({ orgKey, orgName, onContinue }) {
  const [formData, setFormData] = useState({
    memberName: "",
    memberPhone: "",
    memberEmail: "",
  });
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const groups = await base44.entities.GroupRequest.filter({ orgKey });
        if (groups.length > 0) {
          setGroupData(groups[0]);
        }
      } catch (err) {
        console.error("Error fetching group data:", err);
      }
    };
    fetchGroupData();
  }, [orgKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.memberName || !formData.memberPhone) {
      setError("שדות חובה חסרים");
      return;
    }

    // בדוק browserToken
    const browserToken = localStorage.getItem(`groupmember_${orgKey}`);
    if (browserToken) {
      setError("כבר הצטרפת. אפשר לשתף עם עוד חברים.");
      return;
    }

    setLoading(true);

    try {
      const groupList = await base44.entities.GroupRequest.filter({ orgKey });
      if (groupList.length === 0) {
        setError("לא נמצאה בקשה.");
        return;
      }

      const group = groupList[0];
      const newToken = `browser_${Date.now()}_${Math.random()}`;

      // צור GroupMember
      await base44.entities.GroupMember.create({
        groupRequestId: group.id,
        orgKey: orgKey,
        orgName: group.orgName,
        memberName: formData.memberName,
        memberPhone: formData.memberPhone,
        memberEmail: formData.memberEmail || "",
        browserToken: newToken,
        source: "employees",
      });

      // עדכן currentCount (הautomation תטריג את notifyMilestone אם צריך)
      const newCount = (group.currentCount || 1) + 1;
      await base44.entities.GroupRequest.update(group.id, {
        currentCount: newCount,
        lastJoinedAt: new Date().toISOString(),
      });

      localStorage.setItem(`groupmember_${orgKey}`, newToken);
      setSubmitted(true);
    } catch (err) {
      setError("שגיאה בהצטרפות. אנא נסו שוב.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 py-12 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto bg-white rounded-3xl border border-border p-8 shadow-sm text-center"
        >
          <h2 className="text-2xl font-black mb-4 text-foreground">
            כל הכבוד! ✓
          </h2>
          <p className="text-base text-muted-foreground mb-6">
            הצטרפת בהצלחה. כל עובד נוסף יחזק את הפנייה.
          </p>
          <button
            onClick={onContinue}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 rounded-lg transition-all"
          >
            חזור לדף ראשי
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Pitch */}
          <div className="bg-white rounded-3xl border border-border p-8 shadow-sm text-center">
            <h2 className="text-2xl font-black mb-4 text-foreground">
              כבר {groupData?.currentCount || 1} עובדים מ-{orgName} הצטרפו
            </h2>
            <p className="text-base text-muted-foreground">
              ביחד זה נשמע חזק יותר ל-HR.
              רוצה להצטרף גם? זה לוקח חצי דקה.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="שם פרטי *"
                value={formData.memberName}
                onChange={(e) =>
                  setFormData({ ...formData, memberName: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground"
              />

              <input
                type="tel"
                placeholder="טלפון *"
                value={formData.memberPhone}
                onChange={(e) =>
                  setFormData({ ...formData, memberPhone: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground"
              />

              <input
                type="email"
                placeholder="מייל (אופציונלי)"
                value={formData.memberEmail}
                onChange={(e) =>
                  setFormData({ ...formData, memberEmail: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground"
              />

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-4 rounded-lg transition-all disabled:opacity-50"
              >
                {loading ? "הצטרפות..." : "אני בפנים"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}