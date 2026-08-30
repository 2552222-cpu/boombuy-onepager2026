import React from "react";

export default function GlobalHeader() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white" style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
      <div className="max-w-screen-xl mx-auto px-5 md:px-10 flex items-center justify-between" style={{ paddingTop: "14px", paddingBottom: "14px" }}>
        
        {/* Logo - Right Side */}
        <div className="flex items-center">
          <img
            src="https://media.base44.com/images/public/69e48538aaee477b09fc7b49/4cebf7412_15.png"
            alt="BoomBuy"
            className="h-12 md:h-16 w-auto object-contain"
          />
        </div>

        <nav />
      </div>
    </header>
  );
}