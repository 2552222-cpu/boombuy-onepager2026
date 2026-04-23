import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlobalHeader from "../components/employees/GlobalHeader";
import Hero from "../components/employees/Hero";
import FeaturedOffersSlider from "../components/employees/FeaturedOffersSlider";
import TrustLogos from "../components/employees/TrustLogos";
import GlobalFooter from "../components/employees/GlobalFooter";
import FloatingWhatsApp from "../components/employees/FloatingWhatsApp";
import ComparisonSection from "../components/employees/ComparisonSection";
import DemoForm from "../components/employees/DemoForm";
import HRIntroSlides from "../components/employees/HRIntroSlides";

const EconomicSection = React.lazy(() => import("../components/employees/EconomicSection"));
const Testimonials = React.lazy(() => import("../components/employees/Testimonials"));

export default function EmployeesLanding() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!introDone && (
          <motion.div
            key="hr-intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{ position: "fixed", inset: 0, zIndex: 100 }}
          >
            <HRIntroSlides onDone={() => setIntroDone(true)} />
          </motion.div>
        )}
      </AnimatePresence>
        <div
          dir="rtl"
          style={{ overflowX: "hidden", maxWidth: "100vw" }}
        >
          <GlobalHeader />
          <Hero />
          <ComparisonSection />
          <TrustLogos />
          <React.Suspense fallback={<div style={{ height: 300 }} />}>
            <EconomicSection />
          </React.Suspense>
          <FeaturedOffersSlider />




          <React.Suspense fallback={<div style={{ height: 300 }} />}>
            <Testimonials />
          </React.Suspense>

          {/* Demo form section */}
          <section id="demo-form-section" style={{ background: "#F5F5F7", padding: "72px 20px", direction: "rtl" }}>
            <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
              <h2 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 900, color: "#1D1D1F", marginBottom: 10, letterSpacing: "-0.025em" }}>
                בואו נדבר 15 דקות
              </h2>
              <p style={{ fontSize: 15, color: "#6E6E73", marginBottom: 32, lineHeight: 1.6 }}>
                ממלאים פרטים ואנחנו חוזרים אליכם לתיאום
              </p>
              <DemoForm />
            </div>
          </section>
          <GlobalFooter />
          <FloatingWhatsApp />
        </div>
    </>
  );
}