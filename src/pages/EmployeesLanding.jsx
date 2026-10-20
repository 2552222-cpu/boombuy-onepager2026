import React, { useEffect, useState } from "react";
import GlobalHeader from "../components/employees/GlobalHeader";
import HeroTransformation from "../components/employees/HeroTransformation";
import PlatformExplanation from "../components/employees/PlatformExplanation";
import FeaturedOffersSlider from "../components/employees/FeaturedOffersSlider";
import ExperienceFilm from "../components/employees/ExperienceFilm";
import OperationSteps from "../components/employees/OperationSteps";
import Testimonials from "../components/employees/Testimonials";
import OrganizationFit from "../components/employees/OrganizationFit";
import BookDemo from "../components/employees/BookDemo";
import GlobalFooter from "../components/employees/GlobalFooter";
import OfferPaths from "../components/employees/OfferPaths";
import FAQ from "../components/employees/FAQ";
import { captureLeadSource } from "../lib/leadSource";
import { initLinkedIn } from "../lib/linkedin";
import PersistentCTA from "../components/employees/PersistentCTA";
import LogoRail from "../components/employees/LogoRail";
import AccessibilityWidget from "../components/employees/a11y/AccessibilityWidget";
import { pageBottomReserve } from "../components/employees/layoutTokens";
import { useLenis } from "@/hooks/useLenis";
import AboutContact from "@/components/employees/AboutContact";

export default function EmployeesLanding() {
  const [isMobile, setIsMobile] = useState(false);
  useLenis();
  useEffect(() => {
    captureLeadSource();
    initLinkedIn();
    const c = () => setIsMobile(window.innerWidth < 768);
    c();
    window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  // After the hero, the fixed rail and CTA share the reserved bottom space.
  const bottomReserve = pageBottomReserve(isMobile);

  return (
    <div
      dir="rtl"
      style={{
        overflowX: "clip",
        maxWidth: "100vw",
        background: "#FBFAF8",
        paddingBottom: `calc(${bottomReserve}px + env(safe-area-inset-bottom))`,
      }}
    >
      <GlobalHeader />
      <main id="main-content" tabIndex={-1}>
      <HeroTransformation />
      <FeaturedOffersSlider />
      <ExperienceFilm />
      <PlatformExplanation />
      <OfferPaths />
      <OperationSteps />
      <Testimonials />
      <AboutContact />
      <FAQ />
      <OrganizationFit />
      <BookDemo />
      </main>
      <GlobalFooter />
      <PersistentCTA />
      <LogoRail />
      <AccessibilityWidget />
    </div>
  );
}