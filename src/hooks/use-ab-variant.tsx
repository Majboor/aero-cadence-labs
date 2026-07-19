import { useEffect, useState } from "react";

export type Variant = "A" | "B";

const STORAGE_KEY = "flyauqab-hero-variant";

/** Read + normalize the `?variant=` query param. Accepts a|b|A|B. */
function variantFromQuery(): Variant | null {
  if (typeof window === "undefined") return null;
  const raw = new URLSearchParams(window.location.search)
    .get("variant")
    ?.trim()
    .toUpperCase();
  return raw === "A" || raw === "B" ? (raw as Variant) : null;
}

/**
 * Sticky 50/50 A/B assignment with a manual override switch.
 *
 * Resolution order:
 *   1. `?variant=a` / `?variant=b` in the URL — forces a bucket and
 *      persists it, so you can deep-link or QA either hero on demand
 *      (e.g. `https://flyauqab.waleeds.world/?variant=b`).
 *   2. Previously stored bucket in `localStorage["flyauqab-hero-variant"]`.
 *   3. A fresh random 50/50 assignment, persisted for consistency.
 *
 * The URL toggle means marketers/QA no longer need the console dance of
 * `localStorage.setItem(...) + reload` to preview the other cut.
 */
export function useABVariant(): Variant {
  const [variant, setVariant] = useState<Variant>("A");

  useEffect(() => {
    const forced = variantFromQuery();
    if (forced) {
      window.localStorage.setItem(STORAGE_KEY, forced);
      setVariant(forced);
      return;
    }

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
