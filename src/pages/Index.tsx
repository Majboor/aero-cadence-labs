import { Suspense, lazy } from "react";
import AtmosphereBackground from "@/components/AtmosphereBackground";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/HeroSection";
import KeyStats from "@/components/KeyStats";

// Below-the-fold sections are code-split so the initial payload only carries
// the navigation, hero and first stats block. The rest streams in on demand.
const GameChanging = lazy(() => import("@/components/GameChanging"));
const FeatureCards = lazy(() => import("@/components/FeatureCards"));
const SolutionSection = lazy(() => import("@/components/SolutionSection"));
const ProductModes = lazy(() => import("@/components/ProductModes"));
const CompetitiveAdvantage = lazy(
  () => import("@/components/CompetitiveAdvantage")
);
const SavingsCalculator = lazy(() => import("@/components/SavingsCalculator"));
const TechnologySection = lazy(() => import("@/components/TechnologySection"));
const FAQ = lazy(() => import("@/components/FAQ"));
const ClosingCTA = lazy(() => import("@/components/ClosingCTA"));
const Footer = lazy(() => import("@/components/Footer"));
const BackToTop = lazy(() => import("@/components/BackToTop"));

// Reserves vertical space while a lazy section loads, preventing layout shift.
const SectionFallback = () => <div className="py-24" aria-hidden="true" />;

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <AtmosphereBackground />
      <ScrollProgress />
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <KeyStats />
        <Suspense fallback={<SectionFallback />}>
          <GameChanging />
          <FeatureCards />
          <SolutionSection />
          <ProductModes />
          <CompetitiveAdvantage />
          <SavingsCalculator />
          <TechnologySection />
          <FAQ />
          <ClosingCTA />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <BackToTop />
      </Suspense>
    </div>
  );
};

export default Index;
