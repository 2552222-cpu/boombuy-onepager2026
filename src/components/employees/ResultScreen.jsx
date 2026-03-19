import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Copy, Share2, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

function buildMessage(answers) {
  const expense = answers[0] || "";
  const feeling = answers[1] || "";
  const size = answers[2] || "";

  let sizeText = "";
  if (size.includes("עד 50")) sizeText = "גם בארגון בגודל שלנו";
  else if (size.includes("50-250")) sizeText = "בארגון בגודל שלנו";
  else sizeText = "בארגון גדול כמו שלנו";

  let feelingText = "";
  if (feeling.includes("משנה לי את החודש")) feelingText = " ונראה שזה יכול לעשות שינוי אמיתי לעובדים";
  else if (feeling.includes("דואגים")) feelingText = " ונראה שזה בדיוק מה שעובדים מחפשים";
  else feelingText = " ונראה שזה בדיוק מה שחסר אצלנו";

  return `היי, נתקלתי בפתרון שנראה רלוונטי לארגון שלנו. הוא יכול לתת לעובדים יותר דרך התקציב שכבר קיים - כולל הטבות יומיומיות על ${expense} ויותר בחירה במתנות לחג. ${sizeText} זה יכול לעבוד${feelingText}. נראה לי ששווה לבדוק:\nhttps://www.boombuyonepage.com`;
}

function buildShareText() {
  return `היי, ראיתי משהו שיכול להיות שווה לנו בעבודה - הטבות יומיומיות על קניות, חשמל, חופשות ועוד, באותו תקציב שכבר קיים. תבדוק:\nhttps://www.boombuyonepage.com`;
}

export default function ResultScreen({ answers }) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const message = useMemo(() => buildMessage(answers), [answers]);
  const expense = answers[0] || "קניות";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    toast({ title: "ההודעה הועתקה!", description: "אפשר להדביק ולשלוח" });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  const handleShareColleagues = () => {
    const text = buildShareText();
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  return (
    <section className="py-16 md:py-20 px-4 bg-[#111827]" id="survey-section">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            הארגון שלך יכול לתת לך יותר.
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            באותו תקציב שכבר קיים - אפשר לקבל הטבות יומיומיות אמיתיות על {expense}.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-xl"
        >
          <p className="text-xs text-muted-foreground mb-2 font-medium">
            הודעה מוכנה למנהלת רווחה / HR / ועד
          </p>
          <div className="bg-secondary/50 rounded-xl p-4 mb-6 text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
            {message}
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleCopy}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "הועתק!" : "העתקה להדבקה"}
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              שליחה בוואטסאפ
            </button>

            <button
              onClick={handleShareColleagues}
              className="w-full bg-transparent border border-border text-foreground font-medium py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-secondary/50"
            >
              <Share2 className="w-4 h-4" />
              שתף עם חברים מהעבודה
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}