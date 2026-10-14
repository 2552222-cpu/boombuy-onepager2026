import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { fitImg } from "@/lib/img";

const EASE = [0.22, 1, 0.36, 1];
const LOGO = "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/4cebf7412_15.png";

// "רגע הבוקר": a clean card above the benefits carousel that shows what lands
// on an employee's phone every morning — the boombuy logo and the daily offer,
// without any chat-bubble styling.
export default function WhatsAppMoment({ offer, isMobile }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6, once: true });

  return (
    <div ref={ref} dir="rtl" style={{ display: "flex", justifyContent: "center", marginTop: isMobile ? 18 : 22, marginBottom: isMobile ? 12 : 10 }}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ width: "100%", maxWidth: isMobile ? 320 : 380, background: "#fff", borderRadius: 20, border: "1px solid rgba(19,21,25,0.08)", boxShadow: "0 10px 30px rgba(19,21,25,0.06)", padding: "18px 22px", boxSizing: "border-box", textAlign: "center" }}
      >
        <img
          src={fitImg(LOGO, 360, 120)}
          alt="boombuy"
          width={360}
          height={120}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = LOGO; }}
          style={{ height: isMobile ? 34 : 40, width: "auto", margin: "0 auto 14px", display: "block", objectFit: "contain" }}
        />
        <AnimatePresence mode="wait">
          <motion.p
            key={offer.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            style={{ fontSize: isMobile ? 15 : 17, color: "#1A1A1A", lineHeight: 1.55, margin: 0, fontWeight: 500 }}
          >
            ☀️ בוקר טוב! ההטבה של היום: {offer.productName} ב־₪{offer.priceNew} במקום ₪{offer.priceOld}.
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}