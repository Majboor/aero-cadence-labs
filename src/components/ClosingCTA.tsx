import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Play, Plane } from "lucide-react";

const ClosingCTA = () => {
  return (
    <section className="py-20 bg-gradient-sky relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32">
          <Plane className="w-full h-full text-white rotate-45" />
        </div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24">
          <Plane className="w-full h-full text-white -rotate-12" />
        </div>
        <div className="absolute top-1/2 left-3/4 w-20 h-20">
          <Plane className="w-full h-full text-white rotate-90" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            FlyAuqab is redefining pilot training
            <span className="block text-cyan-200">for the skies of tomorrow</span>
          </h2>

          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join the revolution in aviation training. Experience the future of pilot 
            education with our cutting-edge VR technology.
          </p>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">20x</div>
              <div className="text-blue-100">More Affordable</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">90%</div>
              <div className="text-blue-100">Less Emissions</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">10x</div>
              <div className="text-blue-100">Smaller Footprint</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            <Button 
              variant="hero-outline" 
              size="xl" 
              className="group bg-white text-primary hover:bg-white/90"
            >
              <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Book a Demo with FlyAuqab
            </Button>
            <Button 
              variant="hero-outline" 
              size="xl" 
              className="group"
            >
              <Download className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Download Investor Deck
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Contact Information */}
          <div className="text-center text-blue-100">
            <p className="mb-4">Ready to transform your training program?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
              <a 
                href="mailto:hello@flyauqab.com" 
                className="hover:text-white transition-colors"
              >
                hello@flyauqab.com
              </a>
              <span className="hidden sm:block">•</span>
              <a 
                href="tel:+1-555-0123" 
                className="hover:text-white transition-colors"
              >
                +1 (555) 012-3456
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" fill="none" className="w-full h-auto">
          <path
            d="M0 120L50 105C100 90 200 60 300 45C400 30 500 30 600 37.5C700 45 800 60 900 67.5C1000 75 1100 75 1150 75L1200 75V120H1150C1100 120 1000 120 900 120C800 120 700 120 600 120C500 120 400 120 300 120C200 120 100 120 50 120H0V120Z"
            fill="currentColor"
            className="text-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default ClosingCTA;