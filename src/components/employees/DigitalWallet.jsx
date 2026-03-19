import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const points = [
  "הארנק מגיע עם אותו ערך שהיה - אבל אתה בוחר מה לעשות איתו",
  "כמה מתנות קטנות במקום מתנה אחת",
  "שוברים לסופר, חשמל, חופשות, בגדים - בחירה חופשית",
  "הכל במחירי הפלטפורמה - לא מחירי קמעוני",
];

export default function DigitalWallet({ imageUrl }) {
  return (
    <section className="py-16 md:py-20 px-4 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex justify-center"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 max-w-[280px] md:max-w-[320px]">
              <img
                src={imageUrl}
                alt="ארנק דיגיטלי BoomBuy"
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
              אותה מתנת חג.
              <br />
              רק שעכשיו <span className="text-primary">אתה בוחר.</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              במקום מארז קבוע - ארנק דיגיטלי עם מאות אפשרויות
            </p>

            <div className="bg-white rounded-2xl border border-border/50 p-6 shadow-sm space-y-4">
              {points.map((point, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm leading-relaxed">{point}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm font-semibold text-muted-foreground">
              יותר בחירה. יותר ערך. אותו תקציב.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}