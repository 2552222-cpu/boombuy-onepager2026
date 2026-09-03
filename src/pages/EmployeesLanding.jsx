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

export default function EmployeesLanding() {
  return (
    <div
      dir="rtl"
      style={{ overflowX: "hidden", maxWidth: "100vw", background: "#FBFAF8" }}
    >
      <GlobalHeader />
      <HeroTransformation />
      <TrustLogos />
      <EmployeeExperience />
      <PlatformExplanation />
      <ComparisonTable />
      <FeaturedOffersSlider />
      <EmployeeDemoKit />
      <Testimonials />
      <OrganizationFit />
      <BookDemo />
      <GlobalFooter />
      <FloatingWhatsApp />
      <PersistentCTA />
    </div>
  );
}