import React from "react";
import { motion } from "framer-motion";

const orgs = [
  "בנק לאומי",
  "בנק ישראל",
  "SAP",
  "מקס",
  "בנק הפועלים",
  "אלביט",
  "Check Point",
  "פרטנר",
  "בזק",
];

export default function TrustLogos() {
  return (
    <section className="py-12 md:py-16 px-4 bg-white border-t border-b border-border/30">
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
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-4"
        >
          {orgs.map((org, i) => (
            <span
              key={i}
              className="text-sm md:text-base font-semibold text-muted-foreground/50 select-none"
            >
              {org}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}