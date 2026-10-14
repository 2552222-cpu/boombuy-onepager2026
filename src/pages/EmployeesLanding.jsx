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
import { pageBottomReserve } from "../components/employees/layoutTokens";
import { useLenis } from "@/hooks/useLenis";

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

  // Mobile: only the CTA is fixed (logos live inline in the hero). Desktop: rail + CTA.
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
      <main>
      <HeroTransformation />
      <FeaturedOffersSlider />
      <ExperienceFilm />
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