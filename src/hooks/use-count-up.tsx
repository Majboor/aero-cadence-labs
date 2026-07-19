import { useEffect, useRef, useState } from "react";

interface CountUpOptions {
  /** Final numeric value to animate toward. */
  end: number;
  /** Duration of the count in ms. */
  duration?: number;
  /** Decimal places to render. */
  decimals?: number;
}

/**
 * Animates a number from 0 to `end` with an ease-out curve, but only once the
 * element is scrolled into view. Returns [displayValue, ref]. Respects
 * prefers-reduced-motion by snapping straight to the final value.
 */
export function useCountUp<T extends HTMLElement = HTMLDivElement>({
  end,
  duration = 1600,
  decimals = 0,
}: CountUpOptions): [string, React.RefObject<T>] {
  const ref = useRef<T>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setValue(end);
      return;
    }

    let raf = 0;
    let started = false;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        setValue(end * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            run();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end, duration]);

  return [value.toFixed(decimals), ref];
}
