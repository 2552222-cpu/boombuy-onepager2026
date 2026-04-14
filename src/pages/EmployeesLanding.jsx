import React, { useEffect, useState } from "react";
import GlobalHeader from "../components/employees/GlobalHeader";
import GlobalFooter from "../components/employees/GlobalFooter";
import IntroSlides from "../components/employees/IntroSlides";
import Hero from "../components/employees/Hero";
import FeaturedOffersSlider from "../components/employees/FeaturedOffersSlider";
import BenefitsShowcase from "../components/employees/BenefitsShowcase";
import TrustLogos from "../components/employees/TrustLogos";
import Testimonials from "../components/employees/Testimonials";
import FinalBand from "../components/employees/FinalBand";
import ZeroBudget from "../components/employees/ZeroBudget";
import EconomicSection from "../components/employees/EconomicSection";
import FloatingWhatsApp from "../components/employees/FloatingWhatsApp";
import ValueCalculator from "../components/employees/ValueCalculator.jsx";
import SurveyGate from "../components/employees/SurveyGate";
import Survey from "../components/employees/Survey";

export default function EmployeesLanding() {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (history.scrollRestoration) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orgKey = params.get("orgKey");
    if (orgKey) window.location.replace(`/join/${orgKey}`);
  }, []);

  return (
    <div className="min-h-screen font-heebo flex flex-col" dir="rtl" style={{ overflowX: 'hidden', maxWidth: '100vw', paddingBottom: '72px' }}>
      <GlobalHeader />
      <div className="flex-1">
        <IntroSlides onDone={() => {}} />
        <Hero />
        <EconomicSection />
        <FeaturedOffersSlider />
        <div id="benefits-showcase">
          <BenefitsShowcase />
        </div>
        <TrustLogos />
        <ZeroBudget />
        <Testimonials />
        <ValueCalculator />
        <SurveyGate />
        <Survey />
        <FinalBand />
      </div>
      <GlobalFooter />
      <FloatingWhatsApp />
    </div>
  );
}