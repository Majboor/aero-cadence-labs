import { CheckCircle, Shield, Zap, DollarSign, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const SolutionSection = () => {
  const [playingVideo, setPlayingVideo] = useState(false);
  const features = [
    {
      icon: Shield,
      text: "Realistic flight dynamics (JSBSim, validated within 5–10% accuracy)",
    },
    {
      icon: Zap,
      text: "FlyAuqab goggles + joystick (Beta Kit)",
    },
    {
      icon: CheckCircle,
      text: "Supports both dogfight training & civil IFR/navigation training",
    },
    {
      icon: DollarSign,
      text: "Dual-use platform for military and civil aviation",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <CheckCircle className="h-4 w-4" />
              <span className="font-medium">Revolutionary Solution</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              FlyAuqab Beta
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              A portable, sub-$2,000 AR/VR flight training system designed for both 
              fighter and civil aviation training. Revolutionary technology that makes 
              professional pilot training accessible worldwide.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-foreground">{feature.text}</p>
                  </div>
                );
              })}
            </div>

            <Button variant="hero-outline" size="lg" className="group">
              Learn More About Our Solution
              <CheckCircle className="h-5 w-5 ml-2 group-hover:scale-110 transition-transform" />
            </Button>
          </div>

          {/* Product Image */}
          <div className="relative">
            <div className="bg-card border border-border p-8 rounded-3xl relative group cursor-pointer" onClick={() => setPlayingVideo(true)}>
              <img
                src="/product-image-fullkit.png"
                alt="FlyAuqab Beta Kit"
                className="w-full h-auto rounded-2xl"
              />
              
              {/* Play Button */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-6 transition-all duration-300 hover:scale-110">
                <Play className="h-12 w-12 text-white fill-white" />
              </div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-primary text-white px-4 py-2 rounded-full font-bold">
              Under $2,000
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary text-white px-4 py-2 rounded-full font-bold">
              Portable
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

export default SolutionSection;