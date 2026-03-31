import React, { useState, useEffect } from "react";
import GlobalHeader from "../components/employees/GlobalHeader";
import GlobalFooter from "../components/employees/GlobalFooter";
import IntroSlides from "../components/employees/IntroSlides";
import Hero from "../components/employees/Hero";
import FeaturedOffersSlider from "../components/employees/FeaturedOffersSlider";
import BenefitsShowcase from "../components/employees/BenefitsShowcase";
import TrustLogos from "../components/employees/TrustLogos";
import DigitalWallet from "../components/employees/DigitalWallet";
import Testimonials from "../components/employees/Testimonials";
import Survey from "../components/employees/Survey";
import FinalBand from "../components/employees/FinalBand";
import ZeroBudget from "../components/employees/ZeroBudget";
import JoinScreen from "../components/employees/JoinScreen";

const PROOF_IMAGE_URL = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/e5b27b9ef_-2026-03-16T131338488.png";

const WALLET_IMAGE_URL = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/259ae51a5_-2026-03-22T181118586.png";

export default function EmployeesLanding() {
  const [showJoin, setShowJoin] = useState(false);
  const [joinParams, setJoinParams] = useState({ orgKey: "", orgName: "" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orgKey = params.get("orgKey");
    
    if (orgKey) {
      // Fetch org name from DB
      const fetchOrgName = async () => {
        try {
          const { base44 } = await import("@/api/base44Client");
          const groups = await base44.entities.GroupRequest.filter({ orgKey });
          if (groups.length > 0) {
            setJoinParams({ 
              orgKey: orgKey, 
              orgName: groups[0].orgName 
            });
            setShowJoin(true);
          }
        } catch (err) {
          console.error("Error fetching org name:", err);
        }
      };
      fetchOrgName();
    }
  }, []);

  if (showJoin) {
    return (
      <div className="font-heebo flex flex-col min-h-screen" dir="rtl">
        <GlobalHeader />
        <JoinScreen
          orgKey={joinParams.orgKey}
          orgName={joinParams.orgName}
          onContinue={() => setShowJoin(false)}
        />
        <GlobalFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-heebo flex flex-col" dir="rtl" style={{ overflowX: 'hidden', maxWidth: '100vw', paddingBottom: '72px' }}>
      <GlobalHeader />
      <div className="flex-1">
        <IntroSlides />
        <div id="offers-slider">
          <FeaturedOffersSlider />
        </div>
        <Hero />
        <div id="benefits-showcase">
          <BenefitsShowcase />
        </div>
        <TrustLogos />
        <ZeroBudget />
        <DigitalWallet imageUrl={WALLET_IMAGE_URL} />
        <Testimonials />
        <Survey />
        <FinalBand />
      </div>
      <GlobalFooter />

      {/* Floating CTA */}
      <a
        href={`https://wa.me/972542552222?text=${encodeURIComponent("היי, ראינו את עמוד העובדים של BoomBuy ואנחנו רוצים להבין איך לצרף את הארגון שלנו.")}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#0066CC",
          color: "#fff",
          fontWeight: 700,
          fontSize: "14px",
          padding: "13px 24px",
          borderRadius: "999px",
          boxShadow: "0 8px 28px rgba(0,102,204,0.32)",
          whiteSpace: "nowrap",
          textDecoration: "none",
          zIndex: 40,
          fontFamily: "var(--font-heebo)",
          letterSpacing: "-0.01em",
          transition: "background 0.15s ease",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "#0055AA"}
        onMouseLeave={e => e.currentTarget.style.background = "#0066CC"}
      >
        רוצים לצרף את הארגון ל-BoomBuy? תנו לנו לכוון אתכם
      </a>
    </div>
  );
}