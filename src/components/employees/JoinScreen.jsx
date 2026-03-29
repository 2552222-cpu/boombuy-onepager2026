import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";

const TARGET_COUNT = 10;

export default function JoinScreen({ orgKey, orgName, onContinue }) {
  const [formData, setFormData] = useState({
    memberName: "",
    memberPhone: "",
  });
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const groups = await base44.entities.GroupRequest.filter({ orgKey });
        if (groups.length > 0) {
          setGroupData(groups[0]);
          setNewCount(groups[0].currentCount || 1);
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
      const newBrowserToken = `browser_${Date.now()}_${Math.random()}`;

      // Create GroupMember
      await base44.entities.GroupMember.create({
        groupRequestId: group.id,
        orgKey: orgKey,
        orgName: group.orgName,
        memberName: formData.memberName,
        memberPhone: formData.memberPhone,
        memberEmail: "",
        browserToken: newBrowserToken,
        source: "employees",
      });

      // Update currentCount
      const updatedCount = (group.currentCount || 1) + 1;
      await base44.entities.GroupRequest.update(group.id, {
        currentCount: updatedCount,
        lastJoinedAt: new Date().toISOString(),
      });

      localStorage.setItem(`groupmember_${orgKey}`, newBrowserToken);
      setNewCount(updatedCount);
      setSubmitted(true);
    } catch (err) {
      setError("שגיאה בהצטרפות. אנא נסו שוב.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const remainingToTarget = Math.max(0, TARGET_COUNT - (groupData?.currentCount || 1));
  const progressPercent = ((groupData?.currentCount || 1) / TARGET_COUNT) * 100;

  const handleShareWhatsApp = () => {
    const msg = `חבר'ה 👋

ענינו על סקר של BoomBuy —
מתברר שאפשר לקבל יותר מהתקציב
שהחברה כבר נותנת לנו.

אנחנו אוספים 10 עובדים כדי
להעביר בקשה ל-HR ביחד —
ביחד זה הרבה יותר חזק.

30 שניות — ממש שווה:
https://boom-perk-flow.base44.app/join/${orgKey}`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 flex items-center justify-center" style={{ overflowX: 'hidden', maxWidth: '100vw', padding: '24px 16px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto space-y-6 w-full"
        >
          {/* Success Card */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-emerald-50 border border-emerald-200 rounded-2xl md:rounded-3xl overflow-hidden"
          >
            <div className="p-6 md:p-8 text-center">
              <h2 className="text-3xl md:text-4xl font-black text-emerald-700 mb-2">
                ✓ הצטרפת!
              </h2>
              <p className="text-sm md:text-base text-emerald-600 mb-6">
                אתה עובד מספר {newCount} מ-{orgName}
              </p>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs md:text-sm text-foreground mb-2 font-medium">
                  <span>{newCount} מתוך {TARGET_COUNT}</span>
                  <span>{Math.round((newCount / TARGET_COUNT) * 100)}%</span>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(newCount / TARGET_COUNT) * 100}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-3 bg-emerald-500 rounded-full"
                />
              </div>

              <button
                onClick={handleShareWhatsApp}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 md:py-4 rounded-lg md:rounded-xl transition-all flex items-center justify-center gap-2 text-sm md:text-base mb-3"
              >
                <MessageCircle className="w-5 h-5" />
                שתף עם חברים בוואטסאפ
              </button>

              <button
                onClick={onContinue}
                className="w-full bg-gray-200 hover:bg-gray-300 text-foreground font-bold py-3 md:py-3.5 rounded-lg md:rounded-xl transition-all text-sm md:text-base"
              >
                חזור לדף ראשי
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20" style={{ overflowX: 'hidden', maxWidth: '100vw', padding: '24px 16px' }}>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 md:space-y-8"
        >
          {/* Header */}
          <div className="bg-white rounded-2xl md:rounded-3xl border border-border shadow-sm text-center overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-black mb-3 md:mb-4 text-foreground">
                כבר {groupData?.currentCount || 1} עובדים מ-{orgName} הצטרפו
              </h2>

              {/* Progress */}
              <div className="mb-5">
                <div className="flex justify-between items-center text-xs md:text-sm text-muted-foreground mb-2 font-medium">
                  <span>{groupData?.currentCount || 1} מתוך {TARGET_COUNT}</span>
                  <span>{Math.round(progressPercent)}%</span>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="h-2.5 bg-primary rounded-full"
                />
              </div>

              <p className="text-sm md:text-base text-muted-foreground">
                נשארים עוד {remainingToTarget} עובדים — רוצה להצטרף ולעזור לחזק את הבקשה?
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl md:rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <input
                  type="text"
                  placeholder="שם פרטי *"
                  value={formData.memberName}
                  onChange={(e) => setFormData({ ...formData, memberName: e.target.value })}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground text-sm md:text-base"
                />

                <input
                  type="tel"
                  placeholder="טלפון *"
                  value={formData.memberPhone}
                  onChange={(e) => setFormData({ ...formData, memberPhone: e.target.value })}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground text-sm md:text-base"
                />

                {error && (
                  <p className="text-red-600 text-xs md:text-sm font-medium">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 md:py-4 rounded-lg md:rounded-xl transition-all disabled:opacity-50 text-base md:text-lg mt-2"
                >
                  {loading ? "הצטרפות..." : "אני בפנים 💪"}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}