import { Shield, Plane, Target, Navigation, Users, Radar, ChevronDown, ChevronUp, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
// Images are located in the public/ directory:
// - airforce-holding-glasses.png
// - civil-pilot-holding-glasses.webp

const ProductModes = () => {
  const [expandedMode, setExpandedMode] = useState<string | null>(null);

  const modes = [
    {
      id: "military",
      title: "Military Mode",
      subtitle: "Defense Training",
      color: "from-red-600 to-red-800",
      icon: Shield,
      image: "/airforce-holding-glasses.png",
      video: "/airforce-pilot.mp4",
      features: [
        {
          icon: Target,
          title: "Dogfight Simulation",
          description: "Advanced air-to-air combat training with realistic physics"
        },
        {
          icon: Users,
          title: "Squadron Multiplayer",
          description: "Team-based training exercises and coordinated missions"
        },
        {
          icon: Radar,
          title: "AR Tactical Overlays",
          description: "Real-time radar, missile lock, and HUD information"
        },
        {
          icon: Shield,
          title: "Risk-Free Training",
          description: "Master tactical missions without real-world dangers"
        }
      ]
    },
    {
      id: "civil",
      title: "Civil Aviation Mode",
      subtitle: "Commercial Training",
      color: "from-blue-600 to-blue-800",
      icon: Plane,
      image: "/civil-pilot-holding-glasses.webp",
      video: "/civil-pilot-video.mp4",
      features: [
        {
          icon: Navigation,
          title: "IFR Procedures",
          description: "Instrument flight rules and navigation training"
        },
        {
          icon: Plane,
          title: "Autopilot Systems",
          description: "Advanced aircraft systems and automation training"
        },
        {
          icon: Target,
          title: "Emergency Scenarios",
          description: "Critical situation handling and emergency procedures"
        },
        {
          icon: Users,
          title: "AI Instructor",
          description: "Intelligent guidance system for cadets and trainees"
        }
      ]
    }
  ];

  const toggleMode = (modeId: string) => {
    setExpandedMode(expandedMode === modeId ? null : modeId);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Dual-Purpose Training Modes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            One platform, two specialized training environments. Click on a pilot to explore their training mode.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {modes.map((mode) => {
            const ModeIcon = mode.icon;
            const isExpanded = expandedMode === mode.id;
            const otherExpanded = expandedMode && expandedMode !== mode.id;
            
            return (
              <div 
                key={mode.id} 
                className={`relative transition-all duration-700 ease-in-out ${
                  isExpanded 
                    ? 'lg:flex-[2]' 
                    : otherExpanded 
                      ? 'lg:flex-[0.5]' 
                      : 'lg:flex-1'
                }`}
              >
                {/* Mobile Swipe Container */}
                <div className="lg:hidden relative overflow-hidden">
                  {/* Pilot Image - Always visible on mobile */}
                  <div 
                    className={`relative group cursor-pointer overflow-hidden rounded-3xl transition-all duration-700 ease-in-out ${
                      otherExpanded 
                        ? 'opacity-60' 
                        : ''
                    }`}
                    onClick={() => toggleMode(mode.id)}
                  >
                    <div className="relative h-[28rem] w-full overflow-hidden">
                      <img
                        src={mode.image}
                        alt={`${mode.title} pilot`}
                        className="w-full h-full object-cover object-bottom"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      
                      <div className={`absolute inset-0 bg-gradient-to-t ${mode.color} ${
                        isExpanded ? 'opacity-90' : otherExpanded ? 'opacity-60' : 'opacity-80'
                      } group-hover:opacity-70 transition-opacity duration-700 ease-in-out`}></div>
                      
                      {isExpanded && (
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        </div>
                      )}
                      
                      <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                        <div className="transform transition-transform duration-500 ease-in-out">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                              <ModeIcon className="h-8 w-8" />
                            </div>
                            <div>
                              <h3 className="text-3xl font-bold">{mode.title}</h3>
                              <p className="text-white/90 text-lg">{mode.subtitle}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <p className="text-white/80 text-sm">
                              {isExpanded ? "Click to collapse" : "Click to explore features"}
                            </p>
                            {isExpanded ? (
                              <ChevronUp className="h-6 w-6 text-white/80" />
                            ) : (
                              <ChevronDown className="h-6 w-6 text-white/80" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Features Panel - Slides in from appropriate side */}
                  <div className={`absolute top-0 w-full h-full transition-transform duration-700 ease-in-out ${
                    isExpanded 
                      ? 'translate-x-0' // Both slide to center when expanded
                      : `${
                          mode.id === 'military' 
                            ? 'translate-x-full' // Military: hidden to the right
                            : '-translate-x-full' // Civil: hidden to the left
                        }`
                  }`}>
                    <div className="bg-card rounded-2xl border border-border p-6 shadow-lg h-full overflow-y-auto">
                      <div className="space-y-4">
                        {mode.features.map((feature, index) => {
                          const FeatureIcon = feature.icon;
                          return (
                            <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                              <div className="bg-primary/20 p-2 rounded-lg flex-shrink-0">
                                <FeatureIcon className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground mb-1">
                                  {feature.title}
                                </h4>
                                <p className="text-muted-foreground text-sm">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="mt-6">
                        <Button 
                          variant={mode.id === "military" ? "accent" : "hero"} 
                          className="w-full"
                        >
                          Explore {mode.title}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Container - Features + Image Side by Side when Expanded */}
                <div className={`hidden lg:flex flex-col lg:flex-row gap-6 transition-all duration-700 ease-in-out ${
                  isExpanded ? 'lg:flex-row' : 'lg:flex-col'
                }`}>
                  {/* Expandable Features Panel - Direction depends on mode */}
                  <div className={`overflow-hidden transition-all duration-700 ease-in-out ${
                    isExpanded 
                      ? `max-h-[28rem] opacity-100 lg:flex-1 ${
                          mode.id === 'military' 
                            ? 'order-2' // Military: features on the right
                            : 'order-1' // Civil: features on the left
                        }` 
                      : `max-h-0 opacity-0 ${
                          mode.id === 'military' 
                            ? 'order-2' // Military: hidden, positioned right
                            : 'order-1' // Civil: hidden, positioned left
                        }`
                  }`}>
                    <div className="bg-card rounded-2xl border border-border p-6 shadow-lg h-full">
                      <div className="space-y-4">
                        {mode.features.map((feature, index) => {
                          const FeatureIcon = feature.icon;
                          return (
                            <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                              <div className="bg-primary/20 p-2 rounded-lg flex-shrink-0">
                                <FeatureIcon className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground mb-1">
                                  {feature.title}
                                </h4>
                                <p className="text-muted-foreground text-sm">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="mt-6">
                        <Button 
                          variant={mode.id === "military" ? "accent" : "hero"} 
                          className="w-full"
                        >
                          Explore {mode.title}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Pilot Image Card */}
                  <div 
                    className={`relative group cursor-pointer overflow-hidden rounded-3xl transition-all duration-700 ease-in-out ${
                      otherExpanded 
                        ? 'opacity-60' 
                        : ''
                    } ${isExpanded ? `lg:flex-1 ${
                        mode.id === 'military' 
                          ? 'order-1' // Military: image on the left
                          : 'order-2' // Civil: image on the right
                      }` : 'w-full'}`}
                    onClick={() => toggleMode(mode.id)}
                  >
                    {/* Background Image */}
                    <div className="relative h-[28rem] w-full overflow-hidden">
                      <img
                        src={mode.image}
                        alt={`${mode.title} pilot`}
                        className="w-full h-full object-cover object-bottom"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${mode.color} ${
                        isExpanded ? 'opacity-90' : otherExpanded ? 'opacity-60' : 'opacity-80'
                      } group-hover:opacity-70 transition-opacity duration-700 ease-in-out`}></div>
                      
                      {/* Active Indicator */}
                      {isExpanded && (
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        </div>
                      )}

                      {/* Play Button - Only show when not expanded */}
                      {!isExpanded && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-4">
                          <Play className="h-8 w-8 text-white fill-white" />
                        </div>
                      )}

                      {/* Inline Video - Only show when expanded */}
                      {isExpanded && (
                        <video
                          src={mode.video}
                          autoPlay
                          loop
                          muted
                          className="absolute inset-0 w-full h-full object-cover"
                        >
                          Your browser does not support the video tag.
                        </video>
                      )}
                      
                      {/* Content Overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                        <div className="transform transition-transform duration-500 ease-in-out">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                              <ModeIcon className="h-8 w-8" />
                            </div>
                            <div>
                              <h3 className="text-3xl font-bold">{mode.title}</h3>
                              <p className="text-white/90 text-lg">{mode.subtitle}</p>
                            </div>
                          </div>
                          
                          {/* Expand/Collapse Indicator */}
                          <div className="flex items-center justify-between">
                            <p className="text-white/80 text-sm">
                              {isExpanded ? "Click to collapse" : "Click to explore features"}
                            </p>
                            {isExpanded ? (
                              <ChevronUp className="h-6 w-6 text-white/80" />
                            ) : (
                              <ChevronDown className="h-6 w-6 text-white/80" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};

export default ProductModes;