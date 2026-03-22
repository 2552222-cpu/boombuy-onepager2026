import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, MessageCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const HR_MESSAGE = `היי, גיליתי את BoomBuy ונראה שזה יכול להיות רלוונטי גם אצלנו.
זה מאפשר לעובדים לקבל יותר מהתקציב שכבר קיים - הטבות יומיומיות, מחירים טובים יותר, ויותר בחירה במתנות לחג - בלי שהחברה תצטרך להוסיף תקציב.
נראה לי ששווה לבדוק:
https://www.boombuyonepage.com`;

const SHARE_MESSAGE = `חבר'ה, גיליתי את BoomBuy ונראה שזה יכול להיות רלוונטי גם אלינו.
זה מאפשר לקבל יותר דרך מקום העבודה - סופר, חשמל, חופשות, מתנות חג ועוד - בלי שהחברה תצטרך להוסיף תקציב.
אם גם אתם רוצים שנעביר את זה ל-HR / ועד, תיכנסו ותצטרפו:
https://www.boombuyonepage.com/employees`;

export default function ResultScreen({ surveyResult, onOpenRequest }) {
  const { toast } = useToast();

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
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Block 1: HR Message */}
          <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
            <h2 className="text-2xl font-black mb-6 text-foreground">
              הנה הודעה מוכנה ל-HR
            </h2>

            <div className="bg-secondary/50 rounded-2xl p-6 mb-6 text-sm leading-7 text-foreground whitespace-pre-wrap">
              {HR_MESSAGE}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleWhatsAppHR}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                שלח בוואטסאפ
              </button>
              <button
                onClick={handleCopyHR}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-foreground font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" />
                העתקה להדבקה
              </button>
            </div>
          </div>

          {/* Block 2: Open Request */}
          <div className="bg-gray-50 rounded-3xl border border-gray-200 p-8">
            <h3 className="text-xl font-black mb-2 text-foreground">
              רוצה לחזק את הפנייה?
            </h3>
            <p className="text-muted-foreground mb-6">
              אם עוד עובדים יצטרפו לבקשה, יהיה הרבה יותר קשה להתעלם ממנה.
            </p>
            <button
              onClick={onOpenRequest}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-4 rounded-xl transition-all"
            >
              פתח בקשה + שתף עם עובדים
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}