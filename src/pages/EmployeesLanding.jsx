import React, { useState, useEffect } from "react";
import GlobalHeader from "../components/employees/GlobalHeader";
import GlobalFooter from "../components/employees/GlobalFooter";
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
      <div className="font-heebo" dir="rtl" className="flex flex-col min-h-screen">
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
    <div className="min-h-screen font-heebo flex flex-col" dir="rtl" style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
      <GlobalHeader />
      <div className="flex-1">
        <Hero />
        <ProofImage imageUrl={PROOF_IMAGE_URL} />
        <div id="benefits-showcase">
          <BenefitsShowcase />
        </div>
        <TrustLogos />
        <DigitalWallet imageUrl={WALLET_IMAGE_URL} />
        <Testimonials />
        <Survey />
        <FinalBand />
      </div>
      <GlobalFooter />
    </div>
  );
}