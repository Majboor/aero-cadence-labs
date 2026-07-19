import { TrendingDown, Leaf, Minimize2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useCountUp } from "@/hooks/use-count-up";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  description: string;
  Icon: typeof TrendingDown;
}

const stats: Stat[] = [
  {
    value: 20,
    suffix: "x",
    label: "Less expensive",
    description: "Our FSTDs are 20 times less expensive than traditional FFSs",
    Icon: TrendingDown,
  },
  {
    value: 90,
    suffix: "%",
    label: "Less emissions",
    description:
      "Our FSTDs reduce CO₂ emissions by up to 90% compared to traditional helicopter training",
    Icon: Leaf,
  },
  {
    value: 10,
    suffix: "x",
    label: "Smaller",
    description: "Our FSTDs are 10 times smaller than traditional FFSs",
    Icon: Minimize2,
  },
];

const StatCard = ({ stat, index }: { stat: Stat; index: number }) => {
  const [display, ref] = useCountUp<HTMLDivElement>({ end: stat.value, duration: 1500 });
  const { Icon } = stat;

  return (
    <Reveal delay={index * 120}>
      <div className="lift group relative h-full rounded-2xl border border-border/70 bg-gradient-card p-8 text-center shadow-card hover:border-primary/50">
        {/* Corner glow accent that intensifies on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(circle_at_50%_0%,hsl(var(--aviation-blue)/0.14),transparent_65%)]" />

        <div className="relative">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>

          <div
            ref={ref}
            className="text-gradient-aviation mb-3 flex items-baseline justify-center font-display text-6xl font-bold leading-none tracking-tight md:text-7xl"
          >
            <span className="tabular-nums">{display}</span>
            <span className="text-4xl md:text-5xl">{stat.suffix}</span>
          </div>

          <div className="mb-2 text-xl font-semibold text-foreground">{stat.label}</div>
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground">
            {stat.description}
          </p>
        </div>
      </div>
    </Reveal>
  );
};

const KeyStats = () => {
  return (
    <section className="relative py-24">
      <div className="container mx-auto px-4">
        <Reveal className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            By the numbers
          </span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Revolutionary Performance
          </h2>
        </Reveal>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyStats;
