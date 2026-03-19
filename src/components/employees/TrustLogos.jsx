import React from "react";
import { motion } from "framer-motion";

export default function TrustLogos({ imageUrl }) {
  return (
    <section className="py-12 md:py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm text-muted-foreground mb-8 font-medium"
        >
          עובדים בארגונים מובילים כבר נהנים מזה
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center"
        >
          <img
            src={imageUrl}
            alt="ארגונים שמשתמשים ב-BoomBuy"
            className="w-full max-w-3xl opacity-50 grayscale hover:opacity-70 transition-opacity duration-500"
          />
        </motion.div>
      </div>
    </section>
  );
}