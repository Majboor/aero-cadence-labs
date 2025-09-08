import { Button } from "@/components/ui/button";
import trainingImage from "@/assets/training-facility.jpg";
import vrCockpitImage from "@/assets/vr-cockpit-hero.jpg";

const FeatureCards = () => {
  const features = [
    {
      id: "operators",
      title: "For operators",
      subtitle: "Maximize training efficiency and effectiveness",
      image: trainingImage,
      color: "primary"
    },
    {
      id: "pilots", 
      title: "For pilots",
      subtitle: "Affordable, realistic, and safe training",
      image: vrCockpitImage,
      color: "primary"
    }
  ];

  return (
    <section id="features" className="py-24 bg-background scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="relative group">
              {/* Background Image */}
              <div className="relative h-96 rounded-3xl overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
              </div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div>
                  <div className="text-primary text-sm font-semibold mb-3 uppercase tracking-wide">
                    {feature.title}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    {feature.subtitle}
                  </h3>
                </div>
                
                <div className="mt-8">
                  <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black">
                    Learn more
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;