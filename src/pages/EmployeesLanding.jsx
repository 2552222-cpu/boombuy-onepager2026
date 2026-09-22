import React from "react";
import GlobalHeader from "../components/employees/GlobalHeader";
import HeroTransformation from "../components/employees/HeroTransformation";
import PlatformExplanation from "../components/employees/PlatformExplanation";
import FeaturedOffersSlider from "../components/employees/FeaturedOffersSlider";
import OperationSteps from "../components/employees/OperationSteps";
import Testimonials from "../components/employees/Testimonials";
import OrganizationFit from "../components/employees/OrganizationFit";
import BookDemo from "../components/employees/BookDemo";
import GlobalFooter from "../components/employees/GlobalFooter";
import PersistentCTA from "../components/employees/PersistentCTA";
import LogoRail from "../components/employees/LogoRail";
import { LAYOUT } from "../components/employees/layoutTokens";

// Bottom reserve = rail + CTA + gap, so the footer can always scroll above the fixed stack.
const BOTTOM_RESERVE =
  LAYOUT.RAIL_HEIGHT_DESKTOP + LAYOUT.CTA_H_DESKTOP + LAYOUT.CTA_BOTTOM_MARGIN;

export default function EmployeesLanding() {
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
      <HeroTransformation />
      <PlatformExplanation />
      <FeaturedOffersSlider />
      <OperationSteps />
      <Testimonials />
      <OrganizationFit />
      <BookDemo />
      <GlobalFooter />
      <PersistentCTA />
      <LogoRail />
    </div>
  );
}