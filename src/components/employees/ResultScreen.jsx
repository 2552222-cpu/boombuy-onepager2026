import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

const TARGET_COUNT = 10;

const getInsights = (answer1) => {
  if (answer1.includes("קניות")) {
    return "עובד ממוצע עם הוצאות סופר יכול לחסוך ₪280-420 בחודש מהתקציב שהחברה כבר נותנת.";
  } else if (answer1.includes("חשמל")) {
    return "עובד שרוצה אלקטרוניקה יכול לחסוך ₪150-300 בפריט עם מחיר יבואן.";
  } else if (answer1.includes("חופשות")) {
    return "משפחה שרוצה לנוסע יכולה לחסוך עד ₪2,000 בטיול עם מחירים בלעדיים.";
  } else if (answer1.includes("בגדים")) {
    return "עובד שאוהב אופנה יכול לחסוך עד 25% על כל רכישה מהתקציב המוקדש.";
  }
  return "לפי התשובות שלך, אתה יכול להפיק יותר מהתקציב שהחברה כבר נותנת.";
};

export default function ResultScreen({ surveyResult, sessionToken }) {
  const { toast } = useToast();
  const [currentCount, setCurrentCount] = useState(0);
  const [formData, setFormData] = useState({
    memberName: "",
    memberPhone: "",
    orgName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [joinedData, setJoinedData] = useState(null);
  const [hitMilestone, setHitMilestone] = useState(false);

  const insight = getInsights(surveyResult[0] || "");

  // Check if already joined from this browser
  useEffect(() => {
    const checkAlreadyJoined = async () => {
      try {
        const allGroups = await base44.entities.GroupRequest.list();
        for (const group of allGroups) {
          const browserToken = localStorage.getItem(`groupmember_${group.orgKey}`);
          if (browserToken) {
            // Already joined with this org on this browser
            setJoinedData({
              orgKey: group.orgKey,
              orgName: group.orgName,
              count: group.currentCount || 1,
              memberId: browserToken,
            });
            setCurrentCount(group.currentCount || 1);
            break;
          }
        }
      } catch (err) {
        console.error("Error checking joined status:", err);
      }
    };
    checkAlreadyJoined();
  }, []);

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

    if (!formData.memberName || !formData.memberPhone || !formData.orgName) {
      setError("שדות חובה חסרים");
      return;
    }

    const orgKey = normalizeOrgKey(formData.orgName);

    // Check if already joined with this org on this browser
    const browserToken = localStorage.getItem(`groupmember_${orgKey}`);
    if (browserToken) {
      setError("כבר הצטרפת לארגון זה. אפשר לשתף עם חברים.");
      return;
    }

    setLoading(true);

    try {
      // Get or create GroupRequest
      const existing = await base44.entities.GroupRequest.filter({ orgKey });
      let groupRequest;

      if (existing.length > 0) {
        groupRequest = existing[0];
      } else {
        // Create new GroupRequest
        groupRequest = await base44.entities.GroupRequest.create({
          orgName: formData.orgName,
          orgKey: orgKey,
          initiatorName: formData.memberName,
          initiatorPhone: formData.memberPhone,
          initiatorEmail: "",
          currentCount: 1,
          status: "new_lead",
          source: "employees",
          lastJoinedAt: new Date().toISOString(),
        });
      }

      // Create GroupMember
      const newBrowserToken = `browser_${Date.now()}_${Math.random()}`;
      await base44.entities.GroupMember.create({
        groupRequestId: groupRequest.id,
        orgKey: orgKey,
        orgName: formData.orgName,
        memberName: formData.memberName,
        memberPhone: formData.memberPhone,
        memberEmail: "",
        browserToken: newBrowserToken,
        source: "employees",
      });

      // Update count
      const newCount = (groupRequest.currentCount || 1) + 1;
      const updatedGroup = await base44.entities.GroupRequest.update(groupRequest.id, {
        currentCount: newCount,
        lastJoinedAt: new Date().toISOString(),
      });

      // Update survey response
      try {
        const responses = await base44.entities.SurveyResponse.filter({ sessionToken });
        if (responses.length > 0) {
          for (const resp of responses) {
            await base44.entities.SurveyResponse.update(resp.id, {
              orgKey,
              orgName: formData.orgName,
            });
          }
        }
      } catch (err) {
        console.error("Error updating survey:", err);
      }

      // Save browser token
      localStorage.setItem(`groupmember_${orgKey}`, newBrowserToken);

      // Set joined state
      setJoinedData({
        orgKey,
        orgName: formData.orgName,
        count: newCount,
        memberId: newBrowserToken,
      });
      setCurrentCount(newCount);

      // Check if hit milestone
      if (newCount === TARGET_COUNT) {
        setHitMilestone(true);
      }
    } catch (err) {
      setError("שגיאה בהצטרפות. אנא נסו שוב.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const progressPercent = (currentCount / TARGET_COUNT) * 100;

  const handleShareWhatsApp = () => {
    const msg = `חבר'ה 👋

ענינו על סקר של BoomBuy —
מתברר שאפשר לקבל יותר מהתקציב
שהחברה כבר נותנת לנו.

אנחנו אוספים 10 עובדים כדי
להעביר בקשה ל-HR ביחד —
ביחד זה הרבה יותר חזק.

30 שניות — ממש שווה:
https://www.boombuyonepage.com?orgKey=${joinedData?.orgKey}`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  const handleShareHR = () => {
    const msg = `היי,

${currentCount} עובדים אצלנו ביקשו שאעביר את זה אליך.

BoomBuy מאפשרים לנו לקבל יותר מהתקציב שכבר קיים — הטבות יומיומיות, מחירי יבואן, מתנות חג גמישות — בלי שקל נוסף מהחברה.

שווה 15 דקות?
https://www.boombuyonepage.com

לקביעת שיחה: 054-255-2222 (ארי)`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  // If hit milestone, show milestone banner
  if (hitMilestone && joinedData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 flex items-center justify-center" style={{ overflowX: 'hidden', maxWidth: '100vw', padding: '24px 16px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto space-y-6"
        >
          {/* Milestone Banner */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl md:rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="p-8 md:p-10 text-white text-center">
              <p className="text-4xl md:text-5xl mb-3">🎉</p>
              <h2 className="text-2xl md:text-3xl font-black mb-2">
                הגעתם ל-10 עובדים!
              </h2>
              <p className="text-sm md:text-base opacity-95 mb-6">
                עכשיו זה הזמן לשלוח ל-HR ביחד
              </p>

              <button
                onClick={handleShareHR}
                className="w-full bg-white text-emerald-600 font-bold py-4 rounded-xl hover:bg-gray-50 transition-all text-base md:text-lg flex items-center justify-center gap-2 mb-3"
              >
                <MessageCircle className="w-5 h-5" />
                שלחו ל-HR עכשיו — 10 עובדים מחכים
              </button>

              <button
                onClick={() => setHitMilestone(false)}
                className="w-full bg-white/20 text-white font-bold py-3 rounded-xl hover:bg-white/30 transition-all text-sm md:text-base"
              >
                חזור לשיתוף עם חברים
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // If joined, show success with share buttons
  if (joinedData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20" style={{ overflowX: 'hidden', maxWidth: '100vw', padding: '24px 16px' }}>
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Success Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-emerald-50 border border-emerald-200 rounded-2xl md:rounded-3xl overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-black text-emerald-700 mb-1">
                ✓ הצטרפת!
              </h2>
              <p className="text-sm md:text-base text-emerald-600 mb-6">
                אתה עובד מספר {currentCount} מ-{joinedData.orgName}
              </p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center text-xs md:text-sm text-foreground mb-2 font-medium">
                  <span>{currentCount} מתוך {TARGET_COUNT} עובדים</span>
                  <span>{Math.round(progressPercent)}%</span>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-3 bg-emerald-500 rounded-full"
                />
              </div>

              <p className="text-xs md:text-sm text-muted-foreground mb-6">
                ככל שנהיה יותר — קשה יותר להתעלם מזה
              </p>

              <div className="space-y-2">
                <button
                  onClick={handleShareWhatsApp}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 md:py-4 rounded-lg md:rounded-xl transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <MessageCircle className="w-4 h-4" />
                  שתף עם חברים בוואטסאפ
                </button>

                <button
                  onClick={handleShareHR}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-foreground font-bold py-2.5 md:py-3 rounded-lg md:rounded-xl transition-all text-sm md:text-base"
                >
                  שלח ל-HR ישירות
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Main form view
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20" style={{ overflowX: 'hidden', maxWidth: '100vw', padding: '24px 16px' }}>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Personal Insight Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-100 rounded-2xl md:rounded-3xl border border-gray-200 overflow-hidden"
        >
          <div className="p-5 md:p-6">
            <p className="text-sm md:text-base text-foreground leading-relaxed">
              <span className="font-bold">לפי התשובות שלך:</span> {insight}
            </p>
          </div>
        </motion.div>

        {/* Main CTA Card - Dark Blue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-b from-blue-900 to-blue-950 rounded-2xl md:rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="p-6 md:p-10 text-white">
            <h2 className="text-2xl md:text-3xl font-black mb-6">
              עזור לנו להגיע ל-10 עובדים<br />
              כדי שנוכל להעביר את זה ל-HR
            </h2>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs md:text-sm mb-2 opacity-90">
                <span>עובדים שנרשמו</span>
                <span>{currentCount} מתוך {TARGET_COUNT}</span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-3 bg-white/40 rounded-full overflow-hidden"
              >
                <motion.div
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-full bg-white"
                />
              </motion.div>
            </div>

            <p className="text-sm md:text-base opacity-90 mb-8">
              ככל שנהיה יותר — קשה יותר להתעלם מזה
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <input
                type="text"
                placeholder="שם פרטי *"
                value={formData.memberName}
                onChange={(e) => setFormData({ ...formData, memberName: e.target.value })}
                className="w-full px-4 md:px-5 py-3 md:py-3.5 rounded-lg bg-white/95 text-foreground placeholder-gray-500 text-sm md:text-base"
              />

              <input
                type="tel"
                placeholder="טלפון *"
                value={formData.memberPhone}
                onChange={(e) => setFormData({ ...formData, memberPhone: e.target.value })}
                className="w-full px-4 md:px-5 py-3 md:py-3.5 rounded-lg bg-white/95 text-foreground placeholder-gray-500 text-sm md:text-base"
              />

              <input
                type="text"
                placeholder="שם הארגון *"
                value={formData.orgName}
                onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                className="w-full px-4 md:px-5 py-3 md:py-3.5 rounded-lg bg-white/95 text-foreground placeholder-gray-500 text-sm md:text-base"
              />

              {error && (
                <p className="text-red-200 text-xs md:text-sm font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-blue-900 font-bold py-3.5 md:py-4 rounded-lg md:rounded-xl hover:bg-gray-100 transition-all disabled:opacity-50 text-base md:text-lg mt-6"
              >
                {loading ? "הצטרפות..." : "הצטרף לבקשה + שתף עם חברים"}
              </button>

              <p className="text-xs md:text-sm text-white/70 text-center">
                אנונימי לחלוטין · לא מוכרים את הפרטים שלך
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}