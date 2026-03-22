import React from "react";
import { motion } from "framer-motion";
import { Copy, MessageCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const SHARE_MESSAGE = `חבר'ה, גיליתי את BoomBuy ונראה שזה יכול להיות רלוונטי גם אלינו.
זה מאפשר לקבל יותר דרך מקום העבודה - סופר, חשמל, חופשות, מתנות חג ועוד - בלי שהחברה תצטרך להוסיף תקציב.
אם גם אתם רוצים שנעביר את זה ל-HR / ועד, תיכנסו ותצטרפו:
https://www.boombuyonepage.com/employees`;

export default function ShareScreen({ groupRequest, orgKey, onContinue }) {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(SHARE_MESSAGE);
    toast({ title: "הועתק ✓" });
  };

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent(SHARE_MESSAGE);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Success Message */}
          <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
            <h2 className="text-2xl font-black mb-6 text-foreground">
              הבקשה נפתחה ✓
            </h2>

            <p className="text-base leading-7 text-muted-foreground mb-6">
              מעכשיו כל עובד שיצטרף יחזק את הפנייה.
              אפשר כבר עכשיו לשלוח ל-HR, ואפשר גם לשתף עם עוד עובדים כדי להגדיל את ההשפעה.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onContinue}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-foreground font-bold py-3 px-4 rounded-xl transition-all"
              >
                חזור לדף ראשי
              </button>
            </div>
          </div>

          {/* Share Block */}
          <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
            <h3 className="text-2xl font-black mb-6 text-foreground">
              שתף עם חברים
            </h3>

            <div className="bg-secondary/50 rounded-2xl p-6 mb-6 text-sm leading-7 text-foreground whitespace-pre-wrap">
              {SHARE_MESSAGE}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleWhatsApp}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                שתף בוואטסאפ
              </button>
              <button
                onClick={handleCopy}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-foreground font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" />
                העתקה
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}