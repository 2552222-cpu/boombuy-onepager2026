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
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20" style={{ overflowX: 'hidden', maxWidth: '100vw', padding: '24px 16px' }}>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 md:space-y-8"
        >
          {/* Success Message */}
          <div className="bg-white rounded-2xl md:rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="p-5 md:p-8">
              <h2 className="text-lg md:text-2xl font-black mb-4 md:mb-6 text-foreground">
                הבקשה נפתחה ✓
              </h2>

              <p className="text-xs md:text-base leading-6 md:leading-7 text-muted-foreground mb-5 md:mb-6">
                מעכשיו כל עובד שיצטרף יחזק את הפנייה.
                אפשר כבר עכשיו לשלוח ל-HR, ואפשר גם לשתף עם עוד עובדים כדי להגדיל את ההשפעה.
              </p>

              <button
                onClick={onContinue}
                className="w-full bg-gray-200 hover:bg-gray-300 text-foreground font-bold py-3 md:py-4 rounded-lg md:rounded-xl transition-all text-sm md:text-base"
              >
                חזור לדף ראשי
              </button>
            </div>
          </div>

          {/* Share Block */}
          <div className="bg-white rounded-2xl md:rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="p-5 md:p-8">
              <h3 className="text-lg md:text-2xl font-black mb-4 md:mb-6 text-foreground">
                שתף עם חברים
              </h3>

              <div className="bg-secondary/50 rounded-lg md:rounded-2xl p-3 md:p-6 mb-4 md:mb-6 text-xs md:text-sm leading-6 md:leading-7 text-foreground whitespace-pre-wrap max-h-40 overflow-y-auto">
                {SHARE_MESSAGE}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 md:py-4 rounded-lg md:rounded-xl transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <MessageCircle className="w-4 h-4" />
                  שתף בוואטסאפ
                </button>
                <button
                  onClick={handleCopy}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-foreground font-bold py-3 md:py-4 rounded-lg md:rounded-xl transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <Copy className="w-4 h-4" />
                  העתקה
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}