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
];

export default function TrustLogos() {
  return (
    <section className="py-10 md:py-14 px-4 bg-white border-t border-b border-border/30">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm text-muted-foreground mb-8 font-medium text-center"
        >
          עובדים בארגונים מובילים כבר נהנים מזה
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          {[logos.slice(0, 10), logos.slice(10)].map((row, rowIdx) => (
            <div key={rowIdx} className="flex justify-center items-center gap-8">
              {row.map((logo, i) => (
                <div key={i} className="flex items-center justify-center opacity-60 hover:opacity-90 transition-opacity flex-shrink-0">
                  <img
                    src={logo.url}
                    alt={logo.name}
                    className="h-10 w-auto object-contain max-w-[110px] grayscale"
                  />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}