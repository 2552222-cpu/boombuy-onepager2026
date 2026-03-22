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
    <section className="py-20 md:py-28 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
          {/* Image — visual hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 flex justify-center md:justify-end"
          >
            <div className="w-full max-w-[360px] md:max-w-[420px]">
              <img
                src={imageUrl}
                alt="ארנק דיגיטלי BoomBuy — בחירה חופשית"
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>

          {/* Content — text side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-4 md:mb-5 leading-tight">
              אותה מתנת חג.
              <br />
              רק שעכשיו <span className="text-primary">אתה בוחר.</span>
            </h2>

            <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-10 leading-relaxed">
              במקום מארז קבוע - ארנק דיגיטלי עם מגוון אפשרויות
            </p>

            <div className="bg-white rounded-3xl border border-border/40 p-7 md:p-8 shadow-md space-y-5">
              {points.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex gap-3.5 items-start"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/12 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-primary font-bold" />
                  </div>
                  <span className="text-sm md:text-base leading-relaxed text-foreground">{point}</span>
                </motion.div>
              ))}
            </div>

            <p className="mt-8 md:mt-10 text-base md:text-lg font-semibold text-foreground">
              יותר בחירה. יותר ערך. אותו תקציב.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}