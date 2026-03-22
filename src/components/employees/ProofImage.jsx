import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Sparkles, Zap } from "lucide-react";

const microLabels = [
  {
    icon: ShoppingCart,
    title: "עד 8% הנחה קבועה בסופר",
    sub: "הנחות קבועות ברשתות הקמעונאיות הגדולות בישראל",
  },
  {
    icon: Sparkles,
    title: "מחיר יבואן על מותגים מובילים",
    sub: "Apple, Dyson, Ninja, Nike, Alo Yoga, Adidas ועוד",
  },
  {
    icon: Zap,
    title: "הטבה חדשה בכל בוקר",
    sub: "260 הטבות בשנה — נשלחות בוואטסאפ",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function ProofImage({ imageUrl }) {
  return (
    <section className="py-10 md:py-24 bg-gradient-to-b from-white to-secondary/20" style={{ overflowX: 'hidden', maxWidth: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="w-full px-4 md:px-6" style={{ maxWidth: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-8 md:mb-12 max-w-5xl mx-auto"
        >
          <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-3 leading-tight">
            ככה נראית הטבה אמיתית
          </h2>
          <p className="text-xs md:text-base text-muted-foreground">
            הנחות יומיומיות אמיתיות על דברים שקונים באמת
          </p>
        </motion.div>

        {/* Image — full width on mobile, centered */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center items-center w-full relative mb-8 md:mb-0"
        >
          <div
            className="absolute pointer-events-none"
            style={{
              inset: "-20px",
              background: "radial-gradient(ellipse at 50% 55%, rgba(59,130,246,0.08) 0%, transparent 65%)",
              filter: "blur(24px)",
            }}
          />
          <img
            src={imageUrl}
            alt="הטבה אמיתית לעובדים"
            className="relative drop-shadow-xl"
            style={{ width: "clamp(200px, 32vw, 340px)" }}
          />
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-20">

          {/* Labels — staggered entrance */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-4 md:gap-7 max-w-sm w-full"
          >
            {microLabels.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex items-start gap-3 md:gap-4"
                >
                  <div className="w-8 md:w-10 h-8 md:h-10 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 md:w-5 h-4 md:h-5 text-primary" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="font-bold text-sm md:text-base text-foreground leading-snug">{item.title}</p>
                    <p className="text-[12px] md:text-sm text-muted-foreground mt-0.5 leading-snug">{item.sub}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}