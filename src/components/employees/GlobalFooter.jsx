import React from "react";

export default function GlobalFooter() {
  return (
    <footer className="bg-white" style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          
          {/* Left: Copyright & Site */}
          <div className="text-center md:text-right space-y-2">
            <p className="text-xs md:text-sm font-medium text-foreground">
              BoomBuy © 2025
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              לארגונים:{" "}
              <a
                href="https://www.boombuyonepage.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                boombuyonepage.com
              </a>
            </p>
          </div>

          {/* Right: Contact link - quiet */}
          <a
            href="https://wa.me/972542552222"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            צרו קשר בוואטסאפ
          </a>
        </div>
      </div>
    </footer>
  );
}