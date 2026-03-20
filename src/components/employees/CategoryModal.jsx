import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function CategoryModal({ category, onClose }) {
  if (!category) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="bg-white w-full md:max-w-2xl rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-border/40">
            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{category.emoji} {category.categoryLabel}</span>
              <h3 className="text-lg font-extrabold text-foreground mt-0.5">{category.modalTitle}</h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Benefits list */}
          <div className="px-6 py-5 flex flex-col gap-4">
            {category.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-4 items-start bg-secondary/40 rounded-2xl p-4"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                  />
                )}
                {!item.image && (
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
                    {category.emoji}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground font-medium mb-0.5">{item.tag}</p>
                  <h4 className="font-bold text-foreground leading-snug">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">{item.subtitle}</p>
                  {item.price && (
                    <span className="inline-block mt-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
                      {item.price}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="px-6 pb-6">
            <p className="text-xs text-center text-muted-foreground">הטבות חדשות מתווספות כל יום</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}