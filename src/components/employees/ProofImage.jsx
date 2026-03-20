import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Sparkles, Zap } from "lucide-react";

const microLabels = [
  {
    icon: ShoppingCart,
    title: "עד 8% הנחה קבועה בסופר",
    sub: "הנחות קבועות לקמעונאים הגדולים בישראל",
  },
  {
    icon: Sparkles,
    title: "מחיר יבואן על מותגים מובילים",
    sub: "אייפון, דייסון, נינג'ה, Apple, נייקי, אלו יוגה, אדידס ועוד",
  },
  {
    icon: Zap,
    title: "הטבה חדשה בכל בוקר",
    sub: "הטבות יומיות בלעדיות שמתחדשות כל יום",
  },
];

export default function ProofImage({ imageUrl }) {
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-secondary/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            ככה נראית הטבה שבאמת מרגישים
          </h2>
          <p className="text-muted-foreground text-base">
            הנחות יומיומיות אמיתיות על דברים שקונים באמת
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20"
        >
          {/* Phone — no card, no border, just drop shadow + glow */}
          <div className="flex-shrink-0 flex justify-center relative">
            {/* Soft glow behind phone */}
            <div
              className="absolute pointer-events-none"
              style={{
                inset: "-30px",
                background: "radial-gradient(ellipse at 50% 55%, rgba(59,130,246,0.15) 0%, transparent 65%)",
                filter: "blur(20px)",
              }}
            />
            <img
              src={imageUrl}
              alt="הטבה אמיתית לעובדים"
              className="relative drop-shadow-2xl"
              style={{ width: "clamp(200px, 26vw, 320px)" }}
            />
          </div>

          {/* Text labels */}
          <div className="flex flex-col gap-7 max-w-sm w-full">
            {microLabels.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.12 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="font-bold text-base text-foreground leading-snug">{item.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{item.sub}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}