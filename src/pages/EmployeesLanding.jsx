import React, { useState } from "react";
import GlobalHeader from "../components/employees/GlobalHeader";
import Hero from "../components/employees/Hero";
import FeaturedOffersSlider from "../components/employees/FeaturedOffersSlider";
import TrustLogos from "../components/employees/TrustLogos";
import FinalBand from "../components/employees/FinalBand";
import GlobalFooter from "../components/employees/GlobalFooter";
import FloatingWhatsApp from "../components/employees/FloatingWhatsApp";
import ZeroBudget from "../components/employees/ZeroBudget";
import ComparisonSection from "../components/employees/ComparisonSection";
import Survey from "../components/employees/Survey";

const NetLiftCalculator = React.lazy(() => import("../components/employees/NetLiftCalculator"));
const EconomicSection = React.lazy(() => import("../components/employees/EconomicSection"));
const Testimonials = React.lazy(() => import("../components/employees/Testimonials"));

export default function EmployeesLanding() {
  const [showNetLift, setShowNetLift] = useState(false);
  const lastOrgKey = localStorage.getItem("boomBuyLastOrgKey");
  const lastOrgName = localStorage.getItem("boomBuyLastOrgName");

  return (
        <div
          dir="rtl"
          style={{ overflowX: "hidden", maxWidth: "100vw" }}
        >
          <GlobalHeader />
          <Hero />
          <ComparisonSection />
          <TrustLogos />
          <React.Suspense fallback={<div style={{ height: 300 }} />}>
            <EconomicSection />
          </React.Suspense>
          <FeaturedOffersSlider />


          {/* NetLift Calculator — self-contained, no external navigation */}
          {showNetLift ? (
            <section id="value-calculator">
              <React.Suspense fallback={<div style={{ height: 400 }} />}>
                <NetLiftCalculator />
              </React.Suspense>
            </section>
          ) : (
            <section id="value-calculator" style={{ background: "linear-gradient(160deg, #0a0e1a, #0d1829)", padding: "64px 20px", textAlign: "center", direction: "rtl" }}>
              <div style={{ maxWidth: 480, margin: "0 auto" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#4A9EFF", letterSpacing: "0.07em", marginBottom: 14 }}>EVI CHECK · NetLift Index</p>
                <h2 style={{ fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 14 }}>
                  בכמה יגדל הנטו האפקטיבי שלך?
                </h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, marginBottom: 32 }}>
                  בדיקה מהירה בכמה ישתפר הערך הכלכלי שלך מהטבות הרווחה
                </p>
                <button
                  onClick={() => setShowNetLift(true)}
                  style={{
                    background: "#0066CC",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 17,
                    padding: "18px 40px",
                    borderRadius: 20,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-heebo)",
                    boxShadow: "0 8px 28px rgba(0,102,204,0.4)",
                    width: "100%",
                    maxWidth: 360,
                  }}
                >
                  בדקו את הנטו שלי ←
                </button>
              </div>
            </section>
          )}

          <React.Suspense fallback={<div style={{ height: 300 }} />}>
            <Testimonials />
          </React.Suspense>

          {lastOrgKey ? (
            <section id="survey-section" style={{ background: "#F5F5F7", padding: "60px 16px" }}>
              <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>👋</div>
                <h2 style={{ fontSize: "clamp(22px,4vw,28px)", fontWeight: 900, color: "#1D1D1F", marginBottom: 10, letterSpacing: "-0.025em" }}>
                  כבר פתחתם בקשה עבור {lastOrgName}
                </h2>
                <p style={{ fontSize: 14, color: "#86868B", marginBottom: 24, lineHeight: 1.6 }}>
                  הבקשה שלכם פעילה. כדי להגדיל את הסיכוי — שתפו עוד עמיתים
                </p>
                <a
                  href={`/join/${lastOrgKey}`}
                  style={{
                    display: "block", background: "#0066CC", color: "#fff",
                    fontWeight: 800, fontSize: 16, padding: "16px",
                    borderRadius: 14, textDecoration: "none",
                    boxShadow: "0 6px 20px rgba(0,102,204,0.28)",
                    marginBottom: 12,
                  }}
                >
                  חזרו לעמוד הבקשה שלכם ←
                </a>
                <button
                  onClick={() => {
                    localStorage.removeItem("boomBuyLastOrgKey");
                    localStorage.removeItem("boomBuyLastOrgName");
                    window.location.reload();
                  }}
                  style={{ background: "none", border: "none", color: "#AEAEB2", fontSize: 13, cursor: "pointer", fontFamily: "var(--font-heebo)" }}
                >
                  פתחו בקשה לארגון אחר
                </button>
              </div>
            </section>
          ) : (
            <Survey />
          )}
          <FinalBand />
          <GlobalFooter />
          <FloatingWhatsApp />
        </div>
  );
}