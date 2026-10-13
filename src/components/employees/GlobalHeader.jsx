import React from "react";
import { fitImg } from "@/lib/img";
import { scrollToId } from "./uiHelpers";

export default function GlobalHeader() {
  const scrollToSection = (sectionId) => {
    scrollToId(sectionId);
  };

  return (
    <header className="sticky top-0 z-50 bg-white" style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
      <div className="max-w-screen-xl mx-auto px-5 md:px-10 flex items-center justify-between" style={{ paddingTop: "12px", paddingBottom: "12px" }}>
        
        {/* Logo - Right Side */}
        <div className="flex items-center">
          <img
            src={fitImg("https://media.base44.com/images/public/69e48538aaee477b09fc7b49/4cebf7412_15.png", 360, 120)}
            alt="boombuy"
            width={360}
            height={120}
            className="h-12 md:h-16 w-auto object-contain"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/4cebf7412_15.png"; }}
          />
        </div>

        <nav />
      </div>
    </header>
  );
}