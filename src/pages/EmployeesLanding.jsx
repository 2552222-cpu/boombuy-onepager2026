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
import NetLiftCalculator from "../components/employees/NetLiftCalculator.jsx";
import SurveyGate from "../components/employees/SurveyGate";
import Survey from "../components/employees/Survey";

// userFlowState: "entry" | "benefits" | "surveyGate" | "survey" | "result"
// Strictly forward-only. No fallbacks. No sessionStorage as source of truth.

export default function EmployeesLanding() {
  const [userFlowState, setUserFlowState] = useState("entry");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (history.scrollRestoration) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orgKey = params.get("orgKey");
    if (orgKey) window.location.replace(`/join/${orgKey}`);
  }, []);

  const advance = (to) => {
    const order = ["entry", "benefits", "surveyGate", "survey", "result"];
    const currentIdx = order.indexOf(userFlowState);
    const nextIdx = order.indexOf(to);
    // Only advance forward
    if (nextIdx > currentIdx) setUserFlowState(to);
  };

  return (
    <div className="min-h-screen font-heebo flex flex-col" dir="rtl" style={{ overflowX: 'hidden', maxWidth: '100vw', paddingBottom: '72px' }}>
      <GlobalHeader />
      <div className="flex-1">
        <IntroSlides onDone={() => {}} />
        <Hero onAdvance={() => advance("benefits")} />
        <EconomicSection />
        <FeaturedOffersSlider />

        {/* Benefits — always rendered for SEO/content, but onAdvance only active */}
        <div id="benefits-showcase">
          <BenefitsShowcase onAdvance={() => advance("surveyGate")} />
        </div>

        <TrustLogos />
        <ZeroBudget />
        <Testimonials />
        <NetLiftCalculator onAdvance={() => advance("surveyGate")} />

        {/* SurveyGate — only when state >= surveyGate */}
        {(userFlowState === "surveyGate" || userFlowState === "survey" || userFlowState === "result") && (
          <SurveyGate onAdvance={() => advance("survey")} />
        )}

        {/* Survey — only when state >= survey */}
        {(userFlowState === "survey" || userFlowState === "result") && (
          <Survey onAdvance={() => advance("result")} />
        )}

        {/* FinalBand — only shown before the flow starts (entry state) */}
        {userFlowState === "entry" && <FinalBand />}
      </div>
      <GlobalFooter />
      <FloatingWhatsApp />
    </div>
  );
}