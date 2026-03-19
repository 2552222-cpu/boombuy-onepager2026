import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border/50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-center">
        <div className="flex items-center gap-1.5">
          <span className="text-2xl font-extrabold text-primary tracking-tight">Boom</span>
          <span className="text-2xl font-extrabold text-foreground tracking-tight">Buy</span>
        </div>
      </div>
    </header>
  );
}