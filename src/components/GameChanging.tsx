import { Plane, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const GameChanging = () => {
  return (
    <section id="about" className="py-24 bg-white scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="relative">
            <div className="mb-8">
              <div className="w-16 h-1 bg-primary mb-8"></div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                We are changing the game
              </h2>
              
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-gray-600" />
                  </div>
                  <span className="text-gray-600 font-medium">WORLD'S FIRST</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Plane className="h-6 w-6 text-gray-600" />
                  </div>
                  <span className="text-gray-600 font-medium">QUALIFIED VR FSTD</span>
                </div>
              </div>
              
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                Learn more about us
              </Button>
            </div>
          </div>
          
          {/* Right Content - Three Columns */}
          <div className="grid grid-cols-1 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                World's first qualified VR FSTD
              </h3>
              <p className="text-gray-600">
                We are the first company to receive EASA and FAA qualifications, setting a new standard in pilot training.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Cutting-edge technology for flight safety
              </h3>
              <p className="text-gray-600">
                Our highly realistic simulators provide pilots with a real-world flight experience. Try it out!
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Innovative team
              </h3>
              <p className="text-gray-600">
                Our team consists of talented engineers and aviation professionals who work hard every day to build the future of flight training.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameChanging;