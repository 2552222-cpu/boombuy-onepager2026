import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBottomUIVisibility } from "./useBottomUIVisibility";

const WA_NUMBER = "972542552222";
const WA_MESSAGE = encodeURIComponent("היי, אני רוצה להתייעץ לגבי ניהול המהלך ולקבל הדרכה לניהול הכנסת בום ביי לארגון שלי.");

const RAIL_H_DESKTOP = 64;
// Stacked above the persistent CTA so the two never overlap or compete.
const CTA_H_DESKTOP = 48;
const STACK_GAP = 10;

export default function FloatingWhatsApp() {
  const [isMobile, setIsMobile] = useState(false);
  const { hidden } = useBottomUIVisibility();

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 768);
    c();
    window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  // On mobile the fit-check is the single floating action; WhatsApp stays in the footer.
  if (isMobile) return null;

  const bottom = `calc(${RAIL_H_DESKTOP}px + ${CTA_H_DESKTOP}px + ${STACK_GAP}px + env(safe-area-inset-bottom) + 10px)`;

  return (
    <div
      style={{
        position: "fixed",
        bottom,
        left: 24,
        zIndex: 89,
        direction: "rtl",
        pointerEvents: "none",
      }}
    >
      <AnimatePresence>
        {!hidden && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ pointerEvents: "auto" }}
          >
            <button
              onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`, "_blank")}
              aria-label="פנייה בוואטסאפ"
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "#25D366",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 20px rgba(37,211,102,0.32)",
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.565 4.132 1.547 5.867L0 24l6.335-1.52A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.012-1.374l-.36-.214-3.76.902.946-3.652-.234-.376A9.818 9.818 0 1112 21.818z" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}