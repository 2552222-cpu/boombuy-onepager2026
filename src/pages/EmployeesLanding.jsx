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
import FloatingWhatsApp from "../components/employees/FloatingWhatsApp";
import PersistentCTA from "../components/employees/PersistentCTA";
import LogoRail from "../components/employees/LogoRail";

export default function EmployeesLanding() {
  return (
    <div
      dir="rtl"
      style={{
        overflowX: "hidden",
        maxWidth: "100vw",
        background: "#FBFAF8",
        // reserve space for the fixed bottom logo rail + safe area
        paddingBottom: "calc(96px + env(safe-area-inset-bottom))",
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
      <FloatingWhatsApp />
      <PersistentCTA />
      <LogoRail />
    </div>
  );
}