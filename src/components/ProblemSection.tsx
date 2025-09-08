import { AlertTriangle, DollarSign, Users, Zap } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Fighter Pilot Training",
      description: "Limited simulators, high-risk environments, and extremely high operational costs",
      color: "text-red-500",
    },
    {
      icon: Users,
      title: "Global Pilot Shortage",
      description: "600k+ pilots needed by 2041 for civil aviation with inadequate training infrastructure",
      color: "text-orange-500",
    },
    {
      icon: DollarSign,
      title: "Expensive Simulators",
      description: "Traditional simulators costing $10M+ each, limiting accessibility and scalability",
      color: "text-yellow-500",
    },
    {
      icon: Zap,
      title: "Inadequate VR Solutions",
      description: "Current VR sims are fun but not realistic or versatile enough for professional training",
      color: "text-blue-500",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 bg-destructive/10 text-destructive px-6 py-3 rounded-full mb-8 border border-destructive/20">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-bold tracking-wide">Critical Industry Challenges</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            The Aviation Training Crisis
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The aviation industry faces unprecedented challenges in pilot training, 
            from limited resources to massive costs and safety concerns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className="bg-card p-8 rounded-2xl border border-border hover:shadow-card transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-muted ${problem.color}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {problem.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-destructive mb-2">$10M+</div>
            <div className="text-muted-foreground">Cost per traditional simulator</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-destructive mb-2">600k+</div>
            <div className="text-muted-foreground">Pilots needed by 2041</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-destructive mb-2">Limited</div>
            <div className="text-muted-foreground">High-quality training access</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;