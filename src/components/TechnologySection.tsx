import { Cpu, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const TechnologySection = () => {
  return (
    <section id="technology" className="py-24 bg-white scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="relative">
            <div className="mb-8">
              <div className="w-16 h-1 bg-primary mb-8"></div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                Cutting-edge VR technology
              </h2>
              
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Cpu className="h-6 w-6 text-gray-600" />
                  </div>
                  <span className="text-gray-600 font-medium">JSBSIM VALIDATED</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Globe className="h-6 w-6 text-gray-600" />
                  </div>
                  <span className="text-gray-600 font-medium">REAL-TIME WEATHER</span>
                </div>
              </div>
              
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                Learn about our technology
              </Button>
            </div>
          </div>
          
          {/* Right Content - Three Columns */}
          <div className="grid grid-cols-1 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Professional flight dynamics
              </h3>
              <p className="text-gray-600">
                Our simulators use JSBSim flight dynamics engine, providing the most realistic flight physics available in consumer VR.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Immersive VR experience
              </h3>
              <p className="text-gray-600">
                High-resolution displays and precise tracking deliver an unparalleled sense of presence in the cockpit.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Real-world integration
              </h3>
              <p className="text-gray-600">
                Live weather data, realistic terrain, and authentic aircraft systems create training scenarios that mirror real flying conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;