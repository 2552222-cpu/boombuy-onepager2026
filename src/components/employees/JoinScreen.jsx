import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Share2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

function buildShareMessage(orgKey, orgName) {
  const encoded = encodeURIComponent(orgName);
  const link = `https://www.boombuyonepage.com/employees?sign=1&org=${orgKey}&orgName=${encoded}`;
  return `חבר'ה, מצאתי עמוד קצר שמראה איך אפשר לקבל יותר דרך מקום העבודה - סופר, חשמל, חופשות והטבות יומיומיות, בלי שהחברה תשלם יותר.\nאם זה מעניין גם אתכם, תיכנסו לדקה.\nאם נהיה כמה עובדים מאותו ארגון, נשלח את זה ביחד ל-HR וזה יהיה הרבה יותר חזק 💪\n${link}`;
}

export default function JoinScreen({ orgKey, orgName, onContinue }) {
  const [count, setCount] = useState(null);
  const [joined, setJoined] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [loading, setLoading] = useState(false);
  const lsKey = `bb_joined_${orgKey}`;
  const displayName = orgName || orgKey;

  useEffect(() => {
    base44.entities.Signature.filter({ orgKey }).then((res) => {
      setCount(res.length);
    });
    if (localStorage.getItem(lsKey)) {
      setAlreadyJoined(true);
      setJoined(true);
    }
  }, [orgKey]);

  const handleJoin = async () => {
    if (localStorage.getItem(lsKey)) {
      setAlreadyJoined(true);
      setJoined(true);
      return;
    }
    setLoading(true);
    await base44.entities.Signature.create({
      orgName: displayName,
      orgKey,
      source: "employees",
      sharedFrom: "invite-link",
    });
    localStorage.setItem(lsKey, "1");
    const res = await base44.entities.Signature.filter({ orgKey });
    setCount(res.length);
    setJoined(true);
    setLoading(false);
  };

  const shareMsg = buildShareMessage(orgKey, displayName);

  const handleSendHR = () => {
    const msg = `היי, כמה עובדים אצלנו בדקו את BoomBuy ונראה שיש כאן משהו ששווה לבדוק.\nמדובר בפתרון שיכול לתת לעובדים יותר ערך דרך התקציב שכבר קיים, כולל הטבות יומיומיות ויותר בחירה במתנות לחג.\nכבר ${count} עובדים מהארגון שלנו מעוניינים.\nנשמח אם תבדקו אם זה יכול להתאים גם אצלנו:\nhttps://www.boombuyonepage.com`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/40 flex flex-col items-center justify-center px-4 py-16" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Users className="w-8 h-8 text-primary" />
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold mb-3">
          חבר שלך כבר בפנים - רוצה להצטרף?
        </h1>

        {count !== null && (
          <p className="text-muted-foreground text-base mb-8 leading-relaxed">
            כבר <strong className="text-foreground">{count}</strong> עובד{count !== 1 ? "ים" : ""} מ-<strong className="text-foreground">{displayName}</strong> רוצים את זה.
            <br />
            ככל שנהיה יותר - יהיה קשה יותר להתעלם מזה.
          </p>
        )}

        {!joined ? (
          <button
            onClick={handleJoin}
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/25 transition-all mb-4"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
            ) : (
              "אני בפנים - הצטרף לבקשה"
            )}
          </button>
        ) : (
          <div className="space-y-3 mb-4">
            {alreadyJoined ? (
              <p className="text-sm text-muted-foreground bg-secondary/60 rounded-xl px-4 py-3">
                כבר הצטרפת מהדפדפן הזה
              </p>
            ) : (
              <p className="text-sm text-green-600 font-medium bg-green-50 rounded-xl px-4 py-3">
                ✓ הצטרפת לבקשה. עכשיו אפשר להעביר את זה לעוד חברים מהעבודה
              </p>
            )}

            {count !== null && (
              <p className="font-semibold text-foreground">
                כבר <span className="text-primary text-lg">{count}</span> עובד{count !== 1 ? "ים" : ""} הצטרפו
              </p>
            )}

            <button
              onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareMsg)}`, "_blank")}
              className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              שתף עם עוד חברים
            </button>

            {count >= 3 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleSendHR}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md"
              >
                כבר {count} עובדים הצטרפו - שלחו ל-HR עכשיו 🚀
              </motion.button>
            )}
          </div>
        )}

        <button
          onClick={onContinue}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
        >
          המשך לעמוד
        </button>
      </motion.div>
    </div>
  );
}