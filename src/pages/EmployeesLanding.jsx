import React, { useState, useEffect } from "react";
import Header from "../components/employees/Header";
import Hero from "../components/employees/Hero";
import ProofImage from "../components/employees/ProofImage";
import BenefitsShowcase from "../components/employees/BenefitsShowcase";
import TrustLogos from "../components/employees/TrustLogos";
import DigitalWallet from "../components/employees/DigitalWallet";
import Testimonials from "../components/employees/Testimonials";
import Survey from "../components/employees/Survey";
import FinalBand from "../components/employees/FinalBand";
import JoinScreen from "../components/employees/JoinScreen";

const PROOF_IMAGE_URL = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/e5b27b9ef_-2026-03-16T131338488.png";
const WALLET_IMAGE_URL = "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/259ae51a5_-2026-03-22T181118586.png";

export default function EmployeesLanding() {
  const [showJoin, setShowJoin] = useState(false);
  const [joinParams, setJoinParams] = useState({ orgKey: "", orgName: "" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sign = params.get("sign");
    const org = params.get("org");
    const orgName = params.get("orgName") || org || "";
    if (sign === "1" && org) {
      setJoinParams({ orgKey: org, orgName: decodeURIComponent(orgName) });
      setShowJoin(true);
    }
  }, []);

  if (showJoin) {
    return (
      <div className="font-heebo" dir="rtl">
        <Header />
        <JoinScreen
          orgKey={joinParams.orgKey}
          orgName={joinParams.orgName}
          onContinue={() => setShowJoin(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-heebo" dir="rtl" style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
      <Header />
      <Hero />
      <ProofImage imageUrl={PROOF_IMAGE_URL} />
      <BenefitsShowcase />
      <TrustLogos />
      <DigitalWallet imageUrl={WALLET_IMAGE_URL} />
      <Testimonials />
      <Survey />
      <FinalBand />
    </div>
  );
}