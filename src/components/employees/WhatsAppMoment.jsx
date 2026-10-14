import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CheckCheck } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const WA_DARK = "#075E54";   // WhatsApp dark green
const WA_BUBBLE = "#DCF8C6"; // WhatsApp outgoing bubble green
const WA_READ = "#53BDEB";    // WhatsApp read-checks blue

// Compact WhatsApp message, without sender branding.
export default function WhatsAppMoment({ offer, isMobile, cardWidth = 280 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6, once: true });
  const time = "09:00";

  return (
    <div ref={ref} dir="rtl" style={{ display: "flex", justifyContent: "center", marginTop: 6, marginBottom: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ width: "100%", maxWidth: Math.min(248, cardWidth * 0.88), background: WA_DARK, borderRadius: 12, boxShadow: "0 8px 18px rgba(7,94,84,0.30)", padding: 6, boxSizing: "border-box", fontFamily: "var(--font-heebo)" }}
      >
        <div style={{ background: WA_BUBBLE, borderRadius: 8, padding: "9px 11px", boxShadow: "0 1px 1px rgba(0,0,0,0.08)" }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={offer.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              style={{ fontSize: isMobile ? 12 : 13, color: "#111B21", lineHeight: 1.45, margin: 0, fontWeight: 500 }}
            >
              ☀️ בוקר טוב! ההטבה של היום: {offer.productName} ב־₪{offer.priceNew} במקום ₪{offer.priceOld}.
            </motion.p>
          </AnimatePresence>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4, marginTop: 6 }}>
            <span style={{ fontSize: 10, color: "#667781" }}>{time}</span>
            <CheckCheck size={13} color={WA_READ} strokeWidth={2.5} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}