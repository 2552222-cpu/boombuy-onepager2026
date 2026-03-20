import React from "react";
import { motion } from "framer-motion";
import GroupRequestBlock from "./GroupRequestBlock";

export default function CollectiveBlock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-6"
    >
      <GroupRequestBlock />
    </motion.div>
  );
}