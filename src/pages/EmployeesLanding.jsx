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
import SavingsInfographic from "../components/employees/SavingsInfographic";
import EconomicSection from "../components/employees/EconomicSection";
import FloatingWhatsApp from "../components/employees/FloatingWhatsApp";


const PROOF_IMAGE_URL = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/e5b27b9ef_-2026-03-16T131338488.png";

const WALLET_IMAGE_URL = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/259ae51a5_-2026-03-22T181118586.png";

export default function EmployeesLanding() {
  const [introDone, setIntroDone] = useState(false);
  const [pastBenefits, setPastBenefits] = useState(false);

  React.useEffect(() => {
    const el = document.getElementById("benefits-showcase");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setPastBenefits(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (history.scrollRestoration) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orgKey = params.get("orgKey");
    if (orgKey) {
      window.location.replace(`/join/${orgKey}`);
    }
  }, []);

  return (
    <div className="min-h-screen font-heebo flex flex-col" dir="rtl" style={{ overflowX: 'hidden', maxWidth: '100vw', paddingBottom: '72px' }}>
      <GlobalHeader />
      <div className="flex-1">
        <IntroSlides onDone={() => setIntroDone(true)} />
        <Hero />
        <EconomicSection />
        <div id="offers-slider">
          <FeaturedOffersSlider />
        </div>
        <TrustLogos />
        <div id="benefits-showcase">
          <BenefitsShowcase />
        </div>
        <ZeroBudget />

        <Testimonials />
        <Survey />
        <FinalBand />
      </div>
      <GlobalFooter />

      <FloatingWhatsApp />
    </div>
  );
}