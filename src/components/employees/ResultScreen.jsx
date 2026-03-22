import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, MessageCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const getInsights = (answer1, answer2) => {
  const insights = [];

  // Insight 1 - based on answer1
  if (answer1.includes("קניות")) {
    insights.push("עם 8% הנחה קבועה — משפחה ממוצעת חוסכת ₪280-420 בחודש על קניות");
  } else if (answer1.includes("חשמל")) {
    insights.push("עם מחיר יבואן על אלקטרוניקה — חוסכים ממוצע של ₪150-300 בפריט");
  } else if (answer1.includes("חופשות")) {
    insights.push("עם מחירים בלעדיים לחופשות — משפחה חוסכת עד ₪2,000 בטיול");
  } else if (answer1.includes("בגדים")) {
    insights.push("עם הטבות על בגדים ומותגים — חוסכים עד 25% על כל רכישה");
  }

  // Insight 2 - based on answer2
  if (answer2.includes("משנה לי את החודש")) {
    insights.push("עובדים שמרגישים שהחברה דואגת להם מדווחים על 34% יותר שביעות רצון");
  } else if (answer2.includes("דואגים")) {
    insights.push("כשעובדים מרגישים מוערכים, הם נשארים בחברה יותר זמן");
  } else if (answer2.includes("בדיוק")) {
    insights.push("זה בדיוק מה שחברות מובילות משלמות עבור — עובדים מאושרים");
  }

  return insights;
};

export default function ResultScreen({ surveyResult, onOpenRequest }) {
  const { toast } = useToast();
  const insights = getInsights(surveyResult[0] || "", surveyResult[1] || "");

  const resultsLink = "https://www.boombuyonepage.com/results";

  const HR_MESSAGE = `היי, [X] עובדים אצלנו ענו על סקר קצר לגבי הטבות עובדים.
הנתונים מעניינים — שניה לראות:
${resultsLink}

BoomBuy מאפשרים לנו לקבל יותר מהתקציב שכבר קיים — בלי עלות נוספת.
שווה 15 דקות?`;

  const SHARE_MESSAGE = `חבר'ה, ענו על 3 שאלות — אנחנו בונים ביחד מה לומר ל-HR.
30 שניות, אנונימי לחלוטין:
${resultsLink}`;

  const handleCopyHR = () => {
    navigator.clipboard.writeText(HR_MESSAGE);
    toast({ title: "הועתק ✓" });
  };

  const handleWhatsAppHR = () => {
    const encoded = encodeURIComponent(HR_MESSAGE);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  const handleCopyShare = () => {
    navigator.clipboard.writeText(SHARE_MESSAGE);
    toast({ title: "הועתק ✓" });
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(SHARE_MESSAGE);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 py-8 md:py-12" style={{ overflowX: 'hidden', maxWidth: '100vw', padding: '24px 16px' }}>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 md:space-y-8"
        >
          {/* Block 0: Personal Insights */}
          <div className="bg-white rounded-2xl md:rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="p-4 md:p-8">
              <h2 className="text-xl md:text-2xl font-black mb-6 text-foreground">
                הנה מה שגילינו עליך
              </h2>
              <div className="space-y-4">
                {insights.map((insight, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 bg-primary/5 border border-primary/20 rounded-lg"
                  >
                    <p className="text-sm md:text-base font-medium text-foreground">
                      ✓ {insight}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Block 1: HR Message */}
          <div className="bg-white rounded-2xl md:rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="p-4 md:p-8">
              <h2 className="text-xl md:text-2xl font-black mb-4 md:mb-6 text-foreground">
                הנה הודעה מוכנה ל-HR
              </h2>

              <div className="bg-secondary/50 rounded-lg md:rounded-2xl p-3 md:p-6 mb-4 md:mb-6 text-xs md:text-sm leading-6 md:leading-7 text-foreground whitespace-pre-wrap max-h-40 overflow-y-auto">
                {HR_MESSAGE}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={handleWhatsAppHR}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg md:rounded-xl transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <MessageCircle className="w-4 h-4" />
                  שלח בוואטסאפ
                </button>
                <button
                  onClick={handleCopyHR}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-foreground font-bold py-3 rounded-lg md:rounded-xl transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <Copy className="w-4 h-4" />
                  העתקה להדבקה
                </button>
              </div>
            </div>
          </div>

          {/* Block 2: Open Request */}
          <div className="bg-gray-50 rounded-2xl md:rounded-3xl border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-8">
              <h3 className="text-lg md:text-xl font-black mb-2 text-foreground">
                רוצה לחזק את הפנייה?
              </h3>
              <p className="text-xs md:text-base text-muted-foreground mb-4 md:mb-6">
                אם עוד עובדים יצטרפו לבקשה, יהיה הרבה יותר קשה להתעלם ממנה.
              </p>
              <button
                onClick={onOpenRequest}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 md:py-4 rounded-lg md:rounded-xl transition-all text-sm md:text-base"
              >
                פתח בקשה + שתף עם עובדים
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}