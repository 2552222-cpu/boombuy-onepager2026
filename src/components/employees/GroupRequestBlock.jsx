import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Copy, Users, CheckCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import InitiatorForm from "./InitiatorForm";
import { buildWaMessage, buildLetterMessage } from "@/utils/messages";

function normalizeKey(str) {
  return str.trim().toLowerCase().replace(/\s+/g, "-");
}



function getMilestone(count) {
  if (count >= 10) return 10;
  if (count >= 5) return 5;
  if (count >= 3) return 3;
  return 0;
}

export default function GroupRequestBlock({ defaultOrgName = "", defaultOrgKey = "" }) {
  const [step, setStep] = useState("input"); // input | initiator_form | joined
  const [orgInput, setOrgInput] = useState(defaultOrgName);
  const [orgKey, setOrgKey] = useState(defaultOrgKey);
  const [orgName, setOrgName] = useState(defaultOrgName);
  const [groupRequestId, setGroupRequestId] = useState(null);
  const [count, setCount] = useState(0);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isInitiator, setIsInitiator] = useState(false);

  const lsKey = orgKey ? `bb_grp_${orgKey}` : null;

  const fetchCount = useCallback(async (grId) => {
    const sigs = await base44.entities.GroupSignature.filter({ groupRequestId: grId });
    return sigs.length;
  }, []);

  useEffect(() => {
    if (!defaultOrgKey) return;
    const init = async () => {
      const existing = await base44.entities.GroupRequest.filter({ orgKey: defaultOrgKey, status: "collecting" });
      if (existing.length > 0) {
        const gr = existing[0];
        setGroupRequestId(gr.id);
        const c = await fetchCount(gr.id);
        setCount(c);
        const lk = `bb_grp_${defaultOrgKey}`;
        if (localStorage.getItem(lk)) {
          setAlreadyJoined(true);
          setStep("joined");
        }
      }
    };
    init();
  }, [defaultOrgKey]);

  const checkAndNotify = async (grId, newCount, gr) => {
    if (newCount === 5 && !gr.notifiedAt5) {
      base44.functions.invoke("notifyGroupThreshold", { groupRequestId: grId, count: newCount });
    } else if (newCount === 10 && !gr.notifiedAt10) {
      base44.functions.invoke("notifyGroupThreshold", { groupRequestId: grId, count: newCount });
    }
  };

  // Step 1: user clicks "הצטרפו לבקשה" from the input form
  const handleInitiate = () => {
    const key = normalizeKey(orgInput);
    if (!key) return;
    setOrgKey(key);
    setOrgName(orgInput.trim());
    setStep("initiator_form");
  };

  // Step 2: initiator fills their details → create group_request + first signature
  const handleInitiatorSubmit = async ({ name, phone, email }) => {
    setLoading(true);
    const key = orgKey || normalizeKey(orgInput);
    const nameStr = orgName || orgInput.trim();

    // Check if active group_request exists
    let gr;
    const existing = await base44.entities.GroupRequest.filter({ orgKey: key });
    const active = existing.filter(r => r.status === "collecting" || r.status === "ready_to_send");

    if (active.length > 0) {
      gr = active[0];
    } else {
      gr = await base44.entities.GroupRequest.create({
        orgName: nameStr,
        orgKey: key,
        currentCount: 0,
        status: "collecting",
        source: "employees",
        initiatorName: name,
        initiatorPhone: phone,
        initiatorEmail: email || "",
      });
    }

    const token = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    await base44.entities.GroupSignature.create({
      orgName: nameStr,
      orgKey: key,
      groupRequestId: gr.id,
      source: "employees",
      localSignatureToken: token,
    });

    const newCount = await fetchCount(gr.id);
    await base44.entities.GroupRequest.update(gr.id, { currentCount: newCount });
    await checkAndNotify(gr.id, newCount, gr);

    localStorage.setItem(`bb_grp_${key}`, token);
    setGroupRequestId(gr.id);
    setOrgKey(key);
    setOrgName(nameStr);
    setCount(newCount);
    setIsInitiator(true);
    setStep("joined");
    setLoading(false);
  };

  // For people arriving via share link — just join
  const handleJoin = async () => {
    if (!orgKey || !groupRequestId) return;
    if (localStorage.getItem(lsKey)) {
      setAlreadyJoined(true);
      return;
    }
    setLoading(true);

    const grArr = await base44.entities.GroupRequest.filter({ orgKey });
    const gr = grArr.find(r => r.id === groupRequestId || r.status === "collecting" || r.status === "ready_to_send");
    if (!gr) { setLoading(false); return; }

    const token = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    await base44.entities.GroupSignature.create({
      orgName: orgName || gr.orgName,
      orgKey,
      groupRequestId: gr.id,
      source: "employees",
      localSignatureToken: token,
    });

    const newCount = await fetchCount(gr.id);
    await base44.entities.GroupRequest.update(gr.id, { currentCount: newCount });
    await checkAndNotify(gr.id, newCount, gr);

    localStorage.setItem(lsKey, token);
    setCount(newCount);
    setStep("joined");
    setLoading(false);
  };

  const handleShare = () => {
    const msg = buildWaMessage(orgName, orgKey, count);
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleSendHR = () => {
    const msg = buildLetterMessage(orgName, orgKey, count);
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildLetterMessage(orgName, orgKey, count));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const milestone = getMilestone(count);

  // ── If arriving via share link (defaultOrgKey set) and not yet joined
  if (defaultOrgKey && step !== "joined") {
    return (
      <div className="bg-white rounded-2xl border border-border/40 shadow-sm p-6 w-full max-w-md mx-auto" dir="rtl">
        <div className="text-center mb-5">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-extrabold mb-1">חבר שלך כבר בפנים - רוצה להצטרף?</h3>
          {count > 0 && (
            <p className="text-sm text-muted-foreground">
              כבר <strong className="text-foreground">{count}</strong> עובדים מ-<strong className="text-foreground">{orgName || defaultOrgKey}</strong> הצטרפו לבקשה.<br />
              ככל שנהיה יותר, יהיה קשה יותר להתעלם מזה.
            </p>
          )}
        </div>
        <button
          onClick={handleJoin}
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground font-bold py-4 rounded-xl transition-all shadow-md shadow-primary/20"
        >
          {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" /> : "אני בפנים - הצטרף לבקשה"}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-secondary/40 rounded-2xl border border-border/30 p-6 w-full" dir="rtl">
      <AnimatePresence mode="wait">

        {/* STEP: input */}
        {step === "input" && (
          <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="font-extrabold text-base mb-1">פנייה של כמה עובדים יחד עובדת הרבה יותר טוב</h3>
            <p className="text-sm text-muted-foreground mb-4">
              אם גם עובדים נוספים אצלכם ירצו את זה, יהיה הרבה יותר קל להעביר את הבקשה הלאה ל-HR או לוועד.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="באיזה ארגון אתה עובד?"
                value={orgInput}
                onChange={(e) => setOrgInput(e.target.value)}
                className="flex-1 border border-border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                onClick={handleInitiate}
                disabled={!orgInput.trim()}
                className="bg-primary hover:bg-primary/90 disabled:opacity-40 text-primary-foreground font-bold text-sm px-5 py-3 rounded-xl transition-all whitespace-nowrap"
              >
                הצטרפו לבקשה
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP: initiator form */}
        {step === "initiator_form" && (
          <motion.div key="initiator_form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <InitiatorForm
              orgName={orgName}
              onSubmit={handleInitiatorSubmit}
              onBack={() => setStep("input")}
            />
          </motion.div>
        )}

        {/* STEP: joined */}
        {step === "joined" && (
          <motion.div key="joined" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

            {/* Already joined notice */}
            {alreadyJoined && (
              <div className="bg-secondary rounded-xl px-4 py-3 text-sm text-muted-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                כבר הצטרפת לבקשה מהדפדפן הזה. אפשר עדיין לשתף עם עוד חברים.
              </div>
            )}

            {/* Initiator special message */}
            {isInitiator && milestone >= 5 && (
              <div className="bg-primary/10 rounded-xl px-4 py-3 text-sm font-medium text-primary mb-4">
                הבקשה שפתחת התחזקה – כבר {count} עובדים מ-{orgName} הצטרפו. עכשיו אפשר להעביר אותה הלאה עם הרבה יותר משקל.
              </div>
            )}

            {/* Milestone messaging */}
            {milestone === 0 && (
              <div className="mb-4">
                <p className="font-bold text-sm">הצטרפת לבקשה ✓</p>
                <p className="text-sm text-muted-foreground mt-0.5">מעולה. עכשיו אפשר להעביר את זה לעוד חברים מהעבודה ולחזק את הפנייה.</p>
              </div>
            )}
            {milestone === 3 && (
              <div className="mb-4">
                <p className="font-bold text-sm text-amber-700">יש כבר עניין ראשוני</p>
                <p className="text-sm text-muted-foreground mt-0.5">כבר {count} עובדים הצטרפו. אפשר להעביר ל-HR, אבל אם תצרפו עוד כמה - זה יהיה חזק יותר.</p>
              </div>
            )}
            {milestone === 5 && (
              <div className="mb-4">
                <p className="font-bold text-sm text-primary">הבקשה התחזקה</p>
                <p className="text-sm text-muted-foreground mt-0.5">כבר {count} עובדים מ-{orgName} הצטרפו. זה כבר זמן טוב להעביר ל-HR או לוועד עם הרבה יותר משקל.</p>
              </div>
            )}
            {milestone === 10 && (
              <div className="mb-4">
                <p className="font-bold text-sm text-green-700">יש כאן עניין אמיתי בארגון</p>
                <p className="text-sm text-muted-foreground mt-0.5">כבר {count} עובדים מ-{orgName} הצטרפו. זה כבר לא עניין של עובד אחד - זו פנייה עם תמיכה אמיתית.</p>
              </div>
            )}

            {/* Count badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary/10 text-primary font-extrabold text-lg px-4 py-1.5 rounded-full">
                {count}
              </div>
              <span className="text-sm font-medium text-foreground">עובדים הצטרפו לבקשה</span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2">
              {milestone >= 3 && (
                <button
                  onClick={handleSendHR}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
                >
                  {milestone >= 5
                    ? `כבר ${count} עובדים רוצים את זה - שלחו ל-HR עכשיו 🚀`
                    : "שלחו ל-HR עכשיו"}
                </button>
              )}
              {milestone >= 5 && (
                <button
                  onClick={handleCopy}
                  className="w-full bg-white border border-border hover:bg-secondary text-foreground font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? "הועתק ✓" : "העתק נוסח לשליחה"}
                </button>
              )}
              <button
                onClick={handleShare}
                className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                שתף עם עוד חברים
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}