import React from "react";
import Header from "../components/employees/Header";
import Hero from "../components/employees/Hero";
import ProofImage from "../components/employees/ProofImage";
import BenefitsSlider from "../components/employees/BenefitsSlider";
import ValueCards from "../components/employees/ValueCards";
import TrustLogos from "../components/employees/TrustLogos";
import DigitalWallet from "../components/employees/DigitalWallet";
import Testimonials from "../components/employees/Testimonials";
import Survey from "../components/employees/Survey";
import FinalBand from "../components/employees/FinalBand";

const LOGO_URL = "/__generating__/img_bdffd6cb97e1.png";
const PROOF_IMAGE_URL = "https://media.base44.com/images/public/user_6873bc3c3e8d221ea3308e3a/2caa7313a_-2026-03-16T131338488.png";
const WALLET_IMAGE_URL = "https://media.base44.com/images/public/user_6873bc3c3e8d221ea3308e3a/5cd836c23_-2026-03-15T125003543.png";
const TRUST_LOGOS_URL = "/__generating__/img_e92d97af95c3.png";

export default function EmployeesLanding() {
  return (
    <div className="min-h-screen font-heebo" dir="rtl">
      <Header logoUrl={LOGO_URL} />
      <Hero />
      <ProofImage imageUrl={PROOF_IMAGE_URL} />
      <BenefitsSlider />
      <ValueCards />
      <TrustLogos imageUrl={TRUST_LOGOS_URL} />
      <DigitalWallet imageUrl={WALLET_IMAGE_URL} />
      <Testimonials />
      <Survey />
      <FinalBand />
    </div>
  );
}