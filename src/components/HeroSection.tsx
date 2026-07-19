import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Play } from "lucide-react";
import { useABVariant } from "@/hooks/use-ab-variant";
import { openDemoRequest } from "@/hooks/use-demo-request";
import HeroVariantB from "@/components/HeroVariantB";

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

// Variant A copy. Variant B lives in its own component (HeroVariantB)
// with a distinct centered layout + CTA. Toggle via `?variant=a|b`.
const COPY_A = {
  headline: "Revolutionizing pilot training with VR simulators",
  subhead:
    "Professional-grade flight training for fighter and civil aviation — 20x cheaper, fully portable, and ready to fly under $2,000.",
} as const;

const HeroSection = () => {
  const variant = useABVariant();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Honor prefers-reduced-motion: hold the background video on its poster frame.
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      const video = videoRef.current;
      if (!video) return;
      if (media.matches) {
        video.pause();
        video.removeAttribute("autoplay");
      } else {
        video.play().catch(() => {});
      }
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  // Variant B renders a distinct centered hero; A keeps the cinematic layout below.
  if (variant === "B") {
    return <HeroVariantB />;
  }

  const copy = COPY_A;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          poster="/flyauqab_image.png"
          className="w-full h-full object-cover"
        >
          <source src="/airforce-with-jets-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-primary/15 text-primary border border-primary/30 px-4 py-1.5 rounded-full mb-6 text-sm font-semibold tracking-wide backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Now in Beta · Dual-Use AR/VR
          </div>

          {/* Main Headline (A/B tested) */}
          <h1
            data-variant={variant}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight"
          >
            {copy.headline}
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl leading-relaxed">
            {copy.subhead}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
              onClick={() => openDemoRequest("hero")}
            >
              Book a demo
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-white border-white/60 hover:bg-white hover:text-black"
              onClick={() => scrollToId("technology")}
            >
              <Play className="h-4 w-4 mr-2" />
              See the tech
            </Button>
          </div>
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

export default HeroSection;
