import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function GlobalHeader() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // בדוק אם יש ?admin=true או אם המשתמש הוא admin
    const params = new URLSearchParams(window.location.search);
    const adminParam = params.get("admin") === "true";
    setIsAdmin(adminParam);
  }, []);

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
            src="https://media.base44.com/images/public/69bc4105141d932b80ba9f27/09a5f43d9_500400.png"
            alt="BoomBuy"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </div>

        {/* Links - Left Side */}
        <nav className="flex items-center gap-5 md:gap-8">
          <button
            onClick={() => scrollToSection("benefits-showcase")}
            style={{ fontSize: "14px", fontWeight: 500, color: "#1D1D1F" }}
            className="hover:text-primary transition-colors"
          >
            הטבות לדוגמא
          </button>

          <a
            href="https://www.boombuyonepage.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "14px", fontWeight: 500, color: "#1D1D1F" }}
            className="hover:text-primary transition-colors"
          >
            לארגונים
          </a>

          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="text-xs md:text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              דשבורד
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}