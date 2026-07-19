import { useEffect, useState } from "react";

export type Variant = "A" | "B";

const STORAGE_KEY = "flyauqab-hero-variant";

/**
 * Sticky 50/50 A/B assignment. A visitor is bucketed once and stays in
 * that bucket across reloads so the experience is consistent. Read the
 * active bucket in the console via localStorage["flyauqab-hero-variant"].
 */
export function useABVariant(): Variant {
  const [variant, setVariant] = useState<Variant>("A");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "A" || stored === "B") {
      setVariant(stored);
      return;
    }
    const assigned: Variant = Math.random() < 0.5 ? "A" : "B";
    window.localStorage.setItem(STORAGE_KEY, assigned);
    setVariant(assigned);
  }, []);

  return variant;
}
