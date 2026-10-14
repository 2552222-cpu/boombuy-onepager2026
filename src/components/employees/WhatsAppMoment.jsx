import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CheckCheck } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const WA_DARK = "#075E54";   // WhatsApp dark green
const WA_BUBBLE = "#DCF8C6"; // WhatsApp outgoing bubble green
const WA_READ = "#53BDEB";    // WhatsApp read-checks blue

function WaLogo({ size = 18, color = "#075E54" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true" style={{ display: "block" }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.692.248-1.287.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// "רגע הבוקר": a WhatsApp-style message preview sent in the employer's name.
// Dark green WhatsApp chat look, two read checkmarks, no boombuy branding.
export default function WhatsAppMoment({ offer, isMobile }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6, once: true });
  const time = "09:00";

  return (
    <div ref={ref} dir="rtl" style={{ display: "flex", justifyContent: "center", marginTop: isMobile ? 18 : 22, marginBottom: isMobile ? 12 : 10 }}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ width: "100%", maxWidth: isMobile ? 340 : 400, background: WA_DARK, borderRadius: 18, boxShadow: "0 16px 36px rgba(7,94,84,0.30)", padding: "14px 16px 18px", boxSizing: "border-box", fontFamily: "var(--font-heebo)" }}
      >
        {/* Chat header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, color: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <WaLogo size={22} color={WA_DARK} />
            </div>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>המעסיד</div>
              <div style={{ fontSize: 11, opacity: 0.85 }}>מקוון</div>
            </div>
          </div>
          <div style={{ fontSize: 12, opacity: 0.85 }}>{time}</div>
        </div>

        {/* Message bubble */}
        <div style={{ background: WA_BUBBLE, borderRadius: 12, padding: "12px 14px", boxShadow: "0 1px 1px rgba(0,0,0,0.08)" }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={offer.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              style={{ fontSize: isMobile ? 15 : 16, color: "#111B21", lineHeight: 1.55, margin: 0, fontWeight: 500 }}
            >
              ☀️ בוקר טוב! ההטבה של היום: {offer.productName} ב־₪{offer.priceNew} במקום ₪{offer.priceOld}.
            </motion.p>
          </AnimatePresence>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4, marginTop: 6 }}>
            <span style={{ fontSize: 11, color: "#667781" }}>{time}</span>
            <CheckCheck size={16} color={WA_READ} strokeWidth={2.5} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}