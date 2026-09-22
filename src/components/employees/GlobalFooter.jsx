import React from "react";

// WhatsApp lives in the footer only on this page (also on desktop) — no floating button
// that competes with the main "בדיקת התאמה" action. Link + phone number preserved.
const WA_URL = "https://wa.me/972542552222";

export default function GlobalFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white" style={{ overflowX: "hidden", maxWidth: "100vw" }} dir="rtl">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Right (RTL start): Copyright & site */}
          <div className="text-center md:text-right space-y-2">
            <p className="text-xs md:text-sm font-medium text-foreground">
              BoomBuy © {year}
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

          {/* Left (RTL end): WhatsApp contact */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            aria-label="צרו קשר בוואטסאפ"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.565 4.132 1.547 5.867L0 24l6.335-1.52A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.012-1.374l-.36-.214-3.76.902.946-3.652-.234-.376A9.818 9.818 0 1112 21.818z" />
            </svg>
            צרו קשר בוואטסאפ
          </a>
        </div>
      </div>
    </footer>
  );
}