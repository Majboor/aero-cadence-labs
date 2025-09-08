const KeyStats = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-muted-foreground mb-4">
            Revolutionary Performance
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-6xl md:text-7xl font-bold text-primary mb-4">
              20x
            </div>
            <div className="text-xl font-semibold text-foreground mb-2">
              Less expensive
            </div>
            <div className="text-muted-foreground">
              Our FSTDs are 20 times less expensive than traditional FFSs
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-6xl md:text-7xl font-bold text-primary mb-4">
              90%
            </div>
            <div className="text-xl font-semibold text-foreground mb-2">
              Less emissions
            </div>
            <div className="text-muted-foreground">
              Our FSTDs reduce CO₂ emissions by up to 90% compared to traditional helicopter training
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-6xl md:text-7xl font-bold text-primary mb-4">
              10x
            </div>
            <div className="text-xl font-semibold text-foreground mb-2">
              Smaller
            </div>
            <div className="text-muted-foreground">
              Our FSTDs are 10 times smaller than traditional FFSs
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyStats;