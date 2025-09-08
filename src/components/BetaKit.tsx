import { Button } from "@/components/ui/button";
import { Package, Zap, Home, DollarSign, CheckCircle, Play, X } from "lucide-react";
import { useState } from "react";

const BetaKit = () => {
  const [playingVideo, setPlayingVideo] = useState(false);
  const features = [
    "FlyAuqab VR Goggles with advanced optics",
    "Professional-grade joystick and throttle controls",
    "Portable carrying case for easy transport",
    "Pre-installed training modules (F-16, A320)",
    "Access to FlyAuqab Portal and LMS",
    "Real-time weather integration",
    "Multi-user support for training sessions",
    "Regular software updates and new aircraft"
  ];

  const benefits = [
    {
      icon: Zap,
      title: "83% Faster Training",
      description: "Accelerated learning with VR immersion"
    },
    {
      icon: Home,
      title: "Train Anywhere",
      description: "Classroom, base, or at home flexibility"
    },
    {
      icon: DollarSign,
      title: "Under $2,000",
      description: "Fraction of traditional simulator cost"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full mb-6">
            <Package className="h-4 w-4" />
            <span className="font-medium">FlyAuqab Beta Kit</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            FlightDeckToGo™
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your portable VR cockpit by FlyAuqab. Everything you need for professional 
            pilot training in one compact, affordable package.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Product Image */}
          <div className="relative">
            <div className="bg-gradient-sky p-12 rounded-3xl relative group cursor-pointer" onClick={() => setPlayingVideo(true)}>
              <img
                src="/product-image-fullkit.png"
                alt="FlyAuqab Beta Kit"
                className="w-full h-auto rounded-2xl shadow-hero"
              />
              
              {/* Play Button */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-6 transition-all duration-300 hover:scale-110">
                <Play className="h-12 w-12 text-white fill-white" />
              </div>
            </div>
            
            {/* Price Badge */}
            <div className="absolute -top-6 -right-6 bg-accent text-accent-foreground px-6 py-3 rounded-2xl shadow-aviation">
              <div className="text-2xl font-bold">Under $2,000</div>
              <div className="text-sm opacity-90">Complete Kit</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">
              What's Included in Your Beta Kit
            </h3>

            {/* Features List */}
            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="text-center bg-card p-4 rounded-xl border border-border">
                    <div className="bg-secondary/20 p-3 rounded-lg inline-flex mb-3">
                      <Icon className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="font-bold text-foreground mb-1">{benefit.title}</div>
                    <div className="text-sm text-muted-foreground">{benefit.description}</div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="space-y-4">
              <Button variant="hero" size="lg" className="w-full md:w-auto">
                Pre-Order Beta Kit
              </Button>
              <div className="text-sm text-muted-foreground">
                Limited quantities available. Reserve your kit today.
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-card p-8 rounded-2xl border border-border max-w-4xl mx-auto">
          <div className="text-center">
            <h4 className="text-xl font-bold text-foreground mb-4">
              Why FlightDeckToGo™ is Revolutionary
            </h4>
            <p className="text-muted-foreground mb-6">
              The first truly portable, professional-grade VR flight training system that delivers 
              the realism of multi-million dollar simulators at a fraction of the cost.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h5 className="font-semibold text-foreground mb-2">Perfect for:</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Flight schools and academies</li>
                  <li>• Military training programs</li>
                  <li>• Individual pilot development</li>
                  <li>• University aviation programs</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-2">Technical Specs:</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 4K per eye VR display</li>
                  <li>• 90Hz refresh rate</li>
                  <li>• Professional flight controls</li>
                  <li>• Cross-platform compatibility</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {playingVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-card rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setPlayingVideo(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <video
              src="/product-video-fullkit.mp4"
              controls
              autoPlay
              className="w-full h-auto max-h-[80vh]"
              onEnded={() => setPlayingVideo(false)}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  );
};

export default BetaKit;