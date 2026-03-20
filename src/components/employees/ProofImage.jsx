import React from "react";
import { motion } from "framer-motion";

const microLabels = [
  {
    icon: "🛒",
    title: "עד 8% הנחה קבועה בסופר",
    sub: "הנחות קבועות לקמעונאים הגדולים בישראל",
  },
  {
    icon: "📱",
    title: "מחיר יבואן על מותגים מובילים",
    sub: "אייפון, דייסון, נינג'ה, Apple, נייקי, אלו יוגה, אדידס ועוד",
  },
  {
    icon: "⚡",
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
          className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
        >
          {/* Glass card with iPhone — no white border */}
          <div className="flex-shrink-0 flex justify-center">
            <div className="relative">
              {/* Halo glow */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 60%, rgba(59,130,246,0.18) 0%, transparent 70%)",
                  filter: "blur(24px)",
                  transform: "scale(1.15)",
                }}
              />
              {/* Glass card */}
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  boxShadow: "0 8px 48px rgba(59,130,246,0.13), 0 1.5px 0 rgba(255,255,255,0.7) inset, 0 0 0 1px rgba(59,130,246,0.08)",
                  padding: "16px 12px 8px",
                  maxWidth: 320,
                }}
              >
                <img
                  src={imageUrl}
                  alt="הטבה אמיתית לעובדים"
                  className="w-full h-auto block"
                  style={{ maxWidth: 300, minWidth: 240 }}
                />
              </div>
            </div>
          </div>

          {/* Text labels */}
          <div className="flex-1 flex flex-col gap-5 max-w-md">
            {microLabels.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.12 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-xl flex-shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <p className="font-bold text-base text-foreground leading-snug">{item.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}