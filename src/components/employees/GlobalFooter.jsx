import React from "react";
import { Phone } from "lucide-react";

export default function GlobalFooter() {
  return (
    <footer className="bg-white border-t border-border/50" style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
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

          {/* Right: Contact Button */}
          <a
            href="tel:0542552222"
            className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors text-xs md:text-sm"
          >
            <Phone className="w-4 h-4" />
            התייעצו איתנו: 054-255-2222
          </a>
        </div>
      </div>
    </footer>
  );
}