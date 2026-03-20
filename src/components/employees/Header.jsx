import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border/50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-center">
        <img
          src="https://media.base44.com/images/public/69bc4105141d932b80ba9f27/09a5f43d9_500400.png"
          alt="BoomBuy"
          className="h-10 w-auto"
        />
      </div>
    </header>
  );
}