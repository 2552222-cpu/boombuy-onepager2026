import React from "react";
import GlobalHeader from "../components/employees/GlobalHeader";
import HeroTransformation from "../components/employees/HeroTransformation";
import TrustLogos from "../components/employees/TrustLogos";
import EmployeeExperience from "../components/employees/EmployeeExperience";
import PlatformExplanation from "../components/employees/PlatformExplanation";
import ComparisonTable from "../components/employees/ComparisonTable";
import FeaturedOffersSlider from "../components/employees/FeaturedOffersSlider";
import EmployeeDemoKit from "../components/employees/EmployeeDemoKit";
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
        paddingBottom: "calc(88px + env(safe-area-inset-bottom))",
      }}
    >
      <GlobalHeader />
      <HeroTransformation />
      <TrustLogos />
      <EmployeeExperience />
      <PlatformExplanation />
      <ComparisonTable />
      <FeaturedOffersSlider />
      <Testimonials />
      <EmployeeDemoKit />
      <OrganizationFit />
      <BookDemo />
      <GlobalFooter />
      <FloatingWhatsApp />
      <PersistentCTA />
      <LogoRail />
    </div>
  );
}