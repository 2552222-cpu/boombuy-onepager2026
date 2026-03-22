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
    sub: "260 הטבות בשנה — נשלחות בוואטסאפ בשם הארגון",
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
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-secondary/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            ככה נראית הטבה אמיתית
          </h2>
          <p className="text-muted-foreground text-base">
            הנחות יומיומיות אמיתיות על דברים שקונים באמת
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">

          {/* Image — centered on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-shrink-0 flex justify-center items-center w-full md:w-auto relative"
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
              className="relative drop-shadow-xl mx-auto"
              style={{ width: "clamp(180px, 24vw, 300px)" }}
            />
          </motion.div>

          {/* Labels — staggered entrance */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-7 max-w-sm w-full"
          >
            {microLabels.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}