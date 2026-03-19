import React from "react";
import { motion } from "framer-motion";

const microLabels = [
  "8% קבוע בסופר",
  "מחיר יבואן על מותגים מובילים",
  "הטבה חדשה כמעט כל יום",
];

export default function ProofImage({ imageUrl }) {
  return (
    <section className="py-16 md:py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
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
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
        >
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-border/30 max-w-[320px]">
                <img
                  src={imageUrl}
                  alt="הטבה אמיתית לעובדים"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4 max-w-md">
            {microLabels.map((label, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3 bg-secondary/60 rounded-xl px-5 py-3.5"
              >
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <span className="font-medium text-sm md:text-base">{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}