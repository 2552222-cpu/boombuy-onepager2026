import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Share2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

function normalizeOrgKey(name) {
  return name.trim().toLowerCase().replace(/\s+/g, "-").replace(/['"״׳]/g, "");
}

function buildShareMessage(orgKey, orgName) {
  const encoded = encodeURIComponent(orgName);
  const link = `https://www.boombuyonepage.com/employees?sign=1&org=${orgKey}&orgName=${encoded}`;
  return `חבר'ה, מצאתי עמוד קצר שמראה איך אפשר לקבל יותר דרך מקום העבודה - סופר, חשמל, חופשות והטבות יומיומיות, בלי שהחברה תשלם יותר.\nאם זה מעניין גם אתכם, תיכנסו לדקה.\nאם נהיה כמה עובדים מאותו ארגון, נשלח את זה ביחד ל-HR וזה יהיה הרבה יותר חזק 💪\n${link}`;
}

function openWhatsApp(message) {
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
}

export default function CollectiveBlock() {
  const [orgName, setOrgName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(null);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!orgName.trim()) return;
    const orgKey = normalizeOrgKey(orgName);
    const lsKey = `bb_joined_${orgKey}`;

    setLoading(true);

    // Count current signatures for this org
    const existing = await base44.entities.Signature.filter({ orgKey });
    const currentCount = existing.length;

    if (localStorage.getItem(lsKey)) {
      setAlreadyJoined(true);
      setCount(currentCount);
      setSubmitted(true);
      setLoading(false);
      return;
    }

    // Create new signature
    await base44.entities.Signature.create({
      orgName: orgName.trim(),
      orgKey,
      source: "employees",
      sharedFrom: "result-screen",
    });

    localStorage.setItem(lsKey, "1");
    setCount(currentCount + 1);
    setAlreadyJoined(false);
    setSubmitted(true);
    setLoading(false);
  };

  const orgKey = normalizeOrgKey(orgName);
  const shareMsg = buildShareMessage(orgKey, orgName.trim());

  const handleSendHR = () => {
    const msg = `היי, כמה עובדים אצלנו בדקו את BoomBuy ונראה שיש כאן משהו ששווה לבדוק.\nמדובר בפתרון שיכול לתת לעובדים יותר ערך דרך התקציב שכבר קיים, כולל הטבות יומיומיות ויותר בחירה במתנות לחג.\nכבר ${count} עובדים מהארגון שלנו מעוניינים.\nנשמח אם תבדקו אם זה יכול להתאים גם אצלנו:\nhttps://www.boombuyonepage.com`;
    openWhatsApp(msg);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-6 rounded-2xl border border-border/50 bg-secondary/40 p-5"
    >
      <div className="flex items-start gap-2 mb-4">
        <Users className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
        <p className="text-sm text-muted-foreground leading-snug">
          <strong className="text-foreground">טיפ:</strong> פנייה של כמה עובדים יחד עובדת הרבה יותר טוב
        </p>
      </div>

      {!submitted ? (
        <div className="space-y-3">
          <input
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder="באיזה ארגון אתה עובד?"
            className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm text-right outline-none focus:border-primary/50 transition-colors"
          />
          <button
            onClick={handleJoin}
            disabled={!orgName.trim() || loading}
            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-40 text-primary-foreground font-bold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                הצטרפו לבקשה - שתפו עם חברים
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {alreadyJoined ? (
            <p className="text-sm text-muted-foreground text-center py-2">כבר הצטרפת מהדפדפן הזה</p>
          ) : (
            <p className="text-sm text-green-600 font-medium text-center py-1">
              ✓ הצטרפת לבקשה. עכשיו אפשר להעביר את זה לעוד חברים מהעבודה
            </p>
          )}

          {count !== null && (
            <p className="text-center text-sm font-semibold text-foreground">
              כבר <span className="text-primary text-base">{count}</span> עובד{count !== 1 ? "ים" : ""} מ-{orgName} הצטרפו
            </p>
          )}

          <button
            onClick={() => openWhatsApp(shareMsg)}
            className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            שתף עם עוד חברים
          </button>

          {count >= 3 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleSendHR}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md shadow-green-600/20"
            >
              כבר {count} עובדים הצטרפו - שלחו ל-HR עכשיו 🚀
            </motion.button>
          )}
        </div>
      )}
    </motion.div>
  );
}