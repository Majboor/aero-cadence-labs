import { useEffect, useMemo, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingDown, Leaf, Clock } from "lucide-react";

// Illustrative industry benchmarks used to model the comparison.
// Traditional full-flight-simulator (FFS) operating cost per training hour,
// and FlyAuqab's blended cost per training hour (~20x lower, matching the
// headline figure quoted elsewhere on the site). Figures are estimates for
// planning purposes only.
const TRADITIONAL_COST_PER_HOUR = 1200; // USD / hour
const FLYAUQAB_COST_PER_HOUR = 60; // USD / hour (~20x cheaper)
const CO2_KG_PER_TRADITIONAL_HOUR = 380; // kg CO2 per real/FFS training hour
const CO2_REDUCTION = 0.9; // 90% fewer emissions

// Smoothly animates a number toward `value` for a bit of delight.
const useAnimatedNumber = (value: number, duration = 700) => {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const rafRef = useRef<number>();

  useEffect(() => {
    const from = fromRef.current;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setDisplay(from + (value - from) * eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = value;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      fromRef.current = value;
    };
  }, [value, duration]);

  return display;
};

const formatUSD = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const SavingsCalculator = () => {
  const [pilots, setPilots] = useState(25);
  const [hoursPerPilot, setHoursPerPilot] = useState(40);

  const { traditionalCost, flyauqabCost, savings, savingsPct, co2Saved, hoursTotal } =
    useMemo(() => {
      const totalHours = pilots * hoursPerPilot;
      const traditional = totalHours * TRADITIONAL_COST_PER_HOUR;
      const flyauqab = totalHours * FLYAUQAB_COST_PER_HOUR;
      const save = traditional - flyauqab;
      return {
        hoursTotal: totalHours,
        traditionalCost: traditional,
        flyauqabCost: flyauqab,
        savings: save,
        savingsPct: traditional > 0 ? Math.round((save / traditional) * 100) : 0,
        co2Saved: Math.round((totalHours * CO2_KG_PER_TRADITIONAL_HOUR * CO2_REDUCTION) / 1000), // tonnes
      };
    }, [pilots, hoursPerPilot]);

  const animatedSavings = useAnimatedNumber(savings);
  const animatedCo2 = useAnimatedNumber(co2Saved);

  return (
    <section id="savings" className="py-20 bg-background scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center space-x-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full mb-6">
            <Calculator className="h-4 w-4" />
            <span className="font-medium">Interactive Estimator</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Calculate Your Training Savings
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Move the sliders to model your fleet. See how much a FlyAuqab deployment could save
            your program every year versus traditional full-flight simulators.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="bg-card rounded-3xl border border-border p-8 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-8">Your Program</h3>

            <div className="space-y-10">
              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <label htmlFor="pilots-slider" className="text-muted-foreground">
                    Pilots / trainees
                  </label>
                  <span className="text-2xl font-bold text-primary tabular-nums">{pilots}</span>
                </div>
                <Slider
                  id="pilots-slider"
                  aria-label="Number of pilots or trainees"
                  min={1}
                  max={200}
                  step={1}
                  value={[pilots]}
                  onValueChange={(v) => setPilots(v[0])}
                />
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <label htmlFor="hours-slider" className="text-muted-foreground">
                    Training hours / pilot / year
                  </label>
                  <span className="text-2xl font-bold text-primary tabular-nums">
                    {hoursPerPilot}
                  </span>
                </div>
                <Slider
                  id="hours-slider"
                  aria-label="Training hours per pilot per year"
                  min={5}
                  max={200}
                  step={5}
                  value={[hoursPerPilot]}
                  onValueChange={(v) => setHoursPerPilot(v[0])}
                />
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border">
                <Clock className="h-4 w-4 shrink-0" />
                <span className="tabular-nums">
                  {hoursTotal.toLocaleString("en-US")} total training hours / year
                </span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-gradient-blue rounded-3xl p-8 shadow-glow text-white flex flex-col">
            <div className="flex items-center gap-2 mb-2 text-white/90">
              <TrendingDown className="h-5 w-5" />
              <span className="font-medium">Estimated annual savings</span>
            </div>
            <div className="text-4xl md:text-5xl font-bold mb-1 tabular-nums">
              {formatUSD(Math.round(animatedSavings))}
            </div>
            <div className="text-white/80 mb-8">
              {savingsPct}% lower than traditional simulator training
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 rounded-2xl p-4">
                <div className="text-white/70 text-sm mb-1">Traditional cost</div>
                <div className="text-lg font-bold tabular-nums">{formatUSD(traditionalCost)}</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4">
                <div className="text-white/70 text-sm mb-1">With FlyAuqab</div>
                <div className="text-lg font-bold tabular-nums">{formatUSD(flyauqabCost)}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/10 rounded-2xl p-4 mb-6">
              <Leaf className="h-5 w-5 shrink-0 text-white" />
              <span className="text-sm">
                <span className="font-bold tabular-nums">
                  ~{Math.round(animatedCo2).toLocaleString("en-US")} tonnes
                </span>{" "}
                of CO₂ avoided per year
              </span>
            </div>

            <Button
              variant="secondary"
              size="lg"
              className="mt-auto w-full bg-white text-primary hover:bg-white/90"
              onClick={() =>
                document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Request a tailored quote
            </Button>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground max-w-3xl mx-auto mt-8">
          Figures are illustrative estimates based on published industry benchmarks and FlyAuqab's
          ~20x cost advantage. Actual savings depend on fleet, mission profile and deployment scale.
        </p>
      </div>
    </section>
  );
};

export default SavingsCalculator;
