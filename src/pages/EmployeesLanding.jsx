import React, { useEffect } from "react";
import GlobalHeader from "../components/employees/GlobalHeader";
import HeroTransformation from "../components/employees/HeroTransformation";
import PlatformExplanation from "../components/employees/PlatformExplanation";
import FeaturedOffersSlider from "../components/employees/FeaturedOffersSlider";
import OperationSteps from "../components/employees/OperationSteps";
import Testimonials from "../components/employees/Testimonials";
import OrganizationFit from "../components/employees/OrganizationFit";
import BookDemo from "../components/employees/BookDemo";
import GlobalFooter from "../components/employees/GlobalFooter";
import PromiseBand from "../components/employees/PromiseBand";
import OfferPaths from "../components/employees/OfferPaths";
import FAQ from "../components/employees/FAQ";
import { captureLeadSource } from "../lib/leadSource";
import { initLinkedIn } from "../lib/linkedin";
import PersistentCTA from "../components/employees/PersistentCTA";
import LogoRail from "../components/employees/LogoRail";
import { LAYOUT } from "../components/employees/layoutTokens";

// Bottom reserve = rail + CTA + gap, so the footer can always scroll above the fixed stack.
const BOTTOM_RESERVE =
  LAYOUT.RAIL_HEIGHT_DESKTOP + LAYOUT.CTA_H_DESKTOP + LAYOUT.CTA_BOTTOM_MARGIN;

export default function EmployeesLanding() {
  useEffect(() => {
    captureLeadSource();
    initLinkedIn();
  }, []);
  return (
    <div
      dir="rtl"
      style={{
        overflowX: "hidden",
        maxWidth: "100vw",
        background: "#FBFAF8",
        paddingBottom: `calc(${BOTTOM_RESERVE}px + env(safe-area-inset-bottom))`,
      }}
    >
      <GlobalHeader />
      <main>
      <HeroTransformation />
      <PromiseBand />
      <FeaturedOffersSlider />
      <PlatformExplanation />
      <OfferPaths />
      <OperationSteps />
      <Testimonials />
      <FAQ />
      <OrganizationFit />
      <BookDemo />
      </main>
      <GlobalFooter />
      <PersistentCTA />
      <LogoRail />
    </div>
  );
}