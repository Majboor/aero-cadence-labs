import { Check, X, Star } from "lucide-react";

const CompetitiveAdvantage = () => {
  const comparison = [
    {
      feature: "Cost",
      traditional: { value: "$10M+ per unit", status: "negative" },
      vr: { value: "$20k–$100k", status: "neutral" },
      flyauqab: { value: "<$2k / unit", status: "positive" }
    },
    {
      feature: "Fighter Training",
      traditional: { value: "Full Support", status: "positive" },
      vr: { value: "Not Available", status: "negative" },
      flyauqab: { value: "Full Support", status: "positive" }
    },
    {
      feature: "Civil Aviation",
      traditional: { value: "Full Support", status: "positive" },
      vr: { value: "Limited", status: "neutral" },
      flyauqab: { value: "Full Support", status: "positive" }
    },
    {
      feature: "Realism",
      traditional: { value: "High", status: "positive" },
      vr: { value: "Medium", status: "neutral" },
      flyauqab: { value: "High + Physical Controls", status: "positive" }
    },
    {
      feature: "Scalability",
      traditional: { value: "Very Low", status: "negative" },
      vr: { value: "Medium", status: "neutral" },
      flyauqab: { value: "Very High", status: "positive" }
    },
    {
      feature: "Portability",
      traditional: { value: "Fixed Installation", status: "negative" },
      vr: { value: "Limited", status: "neutral" },
      flyauqab: { value: "Fully Portable", status: "positive" }
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "positive":
        return <Check className="h-5 w-5 text-green-500" />;
      case "negative":
        return <X className="h-5 w-5 text-red-500" />;
      case "neutral":
        return <div className="h-5 w-5 rounded-full bg-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "positive":
        return "text-green-600 bg-green-50 border-green-200";
      case "negative":
        return "text-red-600 bg-red-50 border-red-200";
      case "neutral":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <section id="pricing" className="py-20 bg-background scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full mb-6">
            <Star className="h-4 w-4" />
            <span className="font-medium">Competitive Analysis</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why Choose FlyAuqab?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how FlyAuqab Beta compares to traditional simulators and existing VR solutions.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-card rounded-3xl border border-border overflow-hidden shadow-aviation">
            {/* Header */}
            <div className="bg-muted/50 p-6 border-b border-border">
              <div className="grid grid-cols-4 gap-4">
                <div className="font-semibold text-foreground">Feature</div>
                <div className="text-center font-semibold text-muted-foreground">
                  Traditional Simulators
                </div>
                <div className="text-center font-semibold text-muted-foreground">
                  VR Sims
                </div>
                <div className="text-center font-semibold text-secondary">
                  <div className="flex items-center justify-center space-x-2">
                    <Star className="h-5 w-5" />
                    <span>FlyAuqab Beta</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Rows */}
            <div className="divide-y divide-border">
              {comparison.map((item, index) => (
                <div key={index} className="p-6 hover:bg-muted/20 transition-colors">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div className="font-medium text-foreground">
                      {item.feature}
                    </div>
                    
                    <div className="text-center">
                      <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg border ${getStatusColor(item.traditional.status)}`}>
                        {getStatusIcon(item.traditional.status)}
                        <span className="text-sm font-medium">{item.traditional.value}</span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg border ${getStatusColor(item.vr.status)}`}>
                        {getStatusIcon(item.vr.status)}
                        <span className="text-sm font-medium">{item.vr.value}</span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg border ${getStatusColor(item.flyauqab.status)} ${item.flyauqab.status === 'positive' ? 'ring-2 ring-secondary/30' : ''}`}>
                        {getStatusIcon(item.flyauqab.status)}
                        <span className="text-sm font-medium">{item.flyauqab.value}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {comparison.map((item, index) => (
              <div key={index} className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-4">{item.feature}</h3>
                
                <div className="space-y-3">
                  {/* Traditional Simulators */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Traditional Simulators</span>
                    <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg border ${getStatusColor(item.traditional.status)}`}>
                      {getStatusIcon(item.traditional.status)}
                      <span className="text-sm font-medium">{item.traditional.value}</span>
                    </div>
                  </div>
                  
                  {/* VR Sims */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">VR Sims</span>
                    <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg border ${getStatusColor(item.vr.status)}`}>
                      {getStatusIcon(item.vr.status)}
                      <span className="text-sm font-medium">{item.vr.value}</span>
                    </div>
                  </div>
                  
                  {/* FlyAuqab Beta */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-secondary font-medium">FlyAuqab Beta</span>
                    <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg border ${getStatusColor(item.flyauqab.status)} ${item.flyauqab.status === 'positive' ? 'ring-2 ring-secondary/30' : ''}`}>
                      {getStatusIcon(item.flyauqab.status)}
                      <span className="text-sm font-medium">{item.flyauqab.value}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-green-50 p-6 rounded-2xl border border-green-200">
              <div className="text-3xl font-bold text-green-600 mb-2">20x</div>
              <div className="text-green-700 font-medium">Less Expensive</div>
              <div className="text-sm text-green-600 mt-1">Than traditional simulators</div>
            </div>
            <div className="text-center bg-blue-50 p-6 rounded-2xl border border-blue-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">90%</div>
              <div className="text-blue-700 font-medium">Less Emissions</div>
              <div className="text-sm text-blue-600 mt-1">Compared to real aircraft training</div>
            </div>
            <div className="text-center bg-purple-50 p-6 rounded-2xl border border-purple-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">10x</div>
              <div className="text-purple-700 font-medium">Smaller Footprint</div>
              <div className="text-sm text-purple-600 mt-1">Portable anywhere</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitiveAdvantage;