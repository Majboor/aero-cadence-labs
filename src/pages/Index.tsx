import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import KeyStats from "@/components/KeyStats";
import GameChanging from "@/components/GameChanging";
import FeatureCards from "@/components/FeatureCards";
import SolutionSection from "@/components/SolutionSection";
import ProductModes from "@/components/ProductModes";
import CompetitiveAdvantage from "@/components/CompetitiveAdvantage";
import TechnologySection from "@/components/TechnologySection";
import FAQ from "@/components/FAQ";
import ClosingCTA from "@/components/ClosingCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <KeyStats />
      <GameChanging />
      <FeatureCards />
      <SolutionSection />
      <ProductModes />
      <CompetitiveAdvantage />
      <TechnologySection />
      <FAQ />
      <ClosingCTA />
      <Footer />
    </div>
  );
};

export default Index;
