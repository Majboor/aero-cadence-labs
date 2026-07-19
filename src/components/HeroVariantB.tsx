import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, ShieldCheck } from "lucide-react";
import { openDemoRequest } from "@/hooks/use-demo-request";

const scrollToId = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const TRUST_CHIPS = [
  { value: "20x", label: "cheaper than legacy sims" },
  { value: "<$2k", label: "all-in, ready to fly" },
  { value: "Minutes", label: "from case to cockpit" },
];

/**
 * Variant B of the hero — a deliberately DIFFERENT experiment from A.
 *
 * Where variant A is a left-aligned statement over a cinematic video,
 * variant B is a centered, benefit-led layout with a punchier headline,
 * a single high-intent primary CTA (+ a low-friction secondary link),
 * and a row of trust chips that surface the three numbers that close a
 * demo. Same design tokens, distinct composition — a real layout test,
 * not just a copy swap. Reachable via `?variant=b`.
 */
const HeroVariantB = () => {
  return (
    <section
      data-variant="B"
      className="relative min-h-screen flex items-center justify-center overflow-hidden text-center"
    >
      {/* Background Video with a centered radial vignette */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/flyauqab_image.png"
          className="w-full h-full object-cover"
        >
          <source src="/airforce-with-jets-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]"></div>
      </div>

      {/* Content — centered column */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-primary/15 text-primary border border-primary/30 px-4 py-1.5 rounded-full mb-8 text-sm font-semibold tracking-wide backdrop-blur-sm">
          <ShieldCheck className="h-4 w-4" />
          Fighter-grade &amp; civil · Now in Beta
        </div>

        {/* Headline (variant B) */}
        <h1
          data-variant="B"
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.02] tracking-tight max-w-4xl"
        >
          Your flight deck.
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
            {" "}
            Anywhere.
          </span>
        </h1>

        <p className="text-lg md:text-2xl text-white/80 mb-10 max-w-2xl leading-relaxed">
          Fighter-grade and civil VR flight training that packs into a backpack —
          20x cheaper than a legacy sim and deployable in minutes.
        </p>

        {/* CTAs — one high-intent primary, one low-friction link */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-14">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow text-base px-8"
            onClick={() => openDemoRequest("hero-variant-b")}
          >
            Book your demo flight
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          <button
            onClick={() => scrollToId("technology")}
            className="text-white/80 hover:text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors"
          >
            or see how it flies
          </button>
        </div>

        {/* Trust chips */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {TRUST_CHIPS.map((chip) => (
            <div
              key={chip.label}
              className="flex items-baseline gap-2 bg-white/5 border border-white/15 rounded-xl px-4 py-2 backdrop-blur-sm"
            >
              <span className="text-xl font-bold text-primary">{chip.value}</span>
              <span className="text-sm text-white/70">{chip.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <button
        aria-label="Scroll to content"
        onClick={() => scrollToId("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white transition-colors animate-bounce"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
};

export default HeroVariantB;
