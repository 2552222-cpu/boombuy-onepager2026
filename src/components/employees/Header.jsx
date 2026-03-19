import React from "react";

export default function Header({ logoUrl }) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border/50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-center">
        <img 
          src={logoUrl} 
          alt="BoomBuy" 
          className="h-9 object-contain"
        />
      </div>
    </header>
  );
}