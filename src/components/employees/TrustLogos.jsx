import React from "react";
import { motion } from "framer-motion";

const logos = [
  { name: "לאומי", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/2f10b2609_17.png" },
  { name: "ישראייר", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/cf7b65131_63.png" },
  { name: "תעש", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/8003c0d5a_62.png" },
  { name: "קרן קיימת", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/dff369112_61.png" },
  { name: "Estee Lauder", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/a6011911e_42.png" },
  { name: "ORT", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6ecb1d12e_48.png" },
  { name: "בזן", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/da1504162_47.png" },
  { name: "אלבר", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/0d5a77386_2.png" },
  { name: "בנק ישראל", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/62d86b046_8.png" },
  { name: "ZIM", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/b47147863_7.png" },
  { name: "בנק יהב", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/1bca83968_6.png" },
  { name: "מזרחי טפחות", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3f66c2722_37.png" },
  { name: "Teva", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/440e21638_readytoboom93.png" },
  { name: "ONE", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/1a493167d_27.png" },
  { name: "רשות המסים", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/d27a9085c_26.png" },
  { name: "SAP", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/c078c3ee8_25.png" },
  { name: "מגן דוד אדום", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/eb5f80934_24.png" },
  { name: "מילגם", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/bbde088d4_23.png" },
  { name: "AMOT", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/076c5871f_22.png" },
  { name: "MAX", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/e6509fd0a_32.png" },
  { name: "אלקטרה", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/86558f4e3_-2026-03-22T184955963.png" },
  { name: "דופלט", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6862cd610_-2026-03-22T184752919.png" },
  { name: "בנק לאומי", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/62fa4ae8e_-2026-03-22T184709815.png" },
  { name: "אלקטרה אפיקים", url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/77cbb97ef_-2026-03-22T184841801.png" },
];

export default function TrustLogos() {
  const row1 = logos.slice(0, 12);
  const row2 = logos.slice(12, 24);

  return (
    <section className="py-8 md:py-20 bg-white border-t border-b border-border/30" style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
      <div className="w-full" style={{ maxWidth: '100vw' }}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-14"
        >
          <p className="text-lg md:text-xl font-semibold text-foreground leading-relaxed">
            עובדים בארגונים מובילים כבר נהנים מזה
          </p>
        </motion.div>

        {/* Desktop: 2 rows */}
        <div className="hidden md:flex flex-col gap-8">
          {[row1, row2].map((row, rowIdx) => (
            <motion.div
              key={rowIdx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + rowIdx * 0.08 }}
              className="flex justify-between items-center w-full"
              style={{ padding: "0 40px" }}
            >
              {row.map((logo, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
                  style={{ width: "calc(100% / 12 - 8px)", height: "56px", minHeight: "56px" }}
                >
                  <img
                    src={logo.url}
                    alt={logo.name}
                    className="w-auto h-full object-contain"
                    style={{ maxWidth: "90%" }}
                  />
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Mobile: grid 3 columns */}
         <motion.div
           initial={{ opacity: 0, y: 12 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.08 }}
           className="md:hidden grid grid-cols-3 gap-3"
           style={{ padding: "0 16px" }}
         >
           {logos.map((logo, i) => (
             <div
               key={i}
               className="flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity duration-300"
               style={{ height: "60px" }}
             >
               <img
                 src={logo.url}
                 alt={logo.name}
                 className="h-full w-auto object-contain"
                 style={{ maxWidth: "100%" }}
               />
             </div>
           ))}
         </motion.div>
      </div>
    </section>
  );
}