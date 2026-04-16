import React, { useState } from "react";
import GlobalHeader from "../components/employees/GlobalHeader";
import Hero from "../components/employees/Hero";
import FeaturedOffersSlider from "../components/employees/FeaturedOffersSlider";
import BenefitsShowcase from "../components/employees/BenefitsShowcase";
import EconomicSection from "../components/employees/EconomicSection";
import TrustLogos from "../components/employees/TrustLogos";
import Testimonials from "../components/employees/Testimonials";
import FinalBand from "../components/employees/FinalBand";
import GlobalFooter from "../components/employees/GlobalFooter";
import FloatingWhatsApp from "../components/employees/FloatingWhatsApp";
import NetLiftCalculator from "../components/employees/NetLiftCalculator";
import IntroSlides from "../components/employees/IntroSlides";
import ZeroBudget from "../components/employees/ZeroBudget";

export default function EmployeesLanding() {
  const [showNetLift, setShowNetLift] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  // Survey (org flow) is intentionally removed from this page — it's a separate system

  if (!introDone) {
    return <IntroSlides onDone={() => setIntroDone(true)} />;
  }

  return (
    <div dir="rtl" style={{ overflowX: "hidden", maxWidth: "100vw" }}>
      <GlobalHeader />
      <Hero />
      <FeaturedOffersSlider />
      <BenefitsShowcase />
      <EconomicSection />
      <ZeroBudget />
      <TrustLogos />

      {/* NetLift Calculator — self-contained, no external navigation */}
      {showNetLift ? (
        <section id="value-calculator">
          <NetLiftCalculator />
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

      <Testimonials />
      <FinalBand />
      <GlobalFooter />
      <FloatingWhatsApp />
    </div>
  );
}