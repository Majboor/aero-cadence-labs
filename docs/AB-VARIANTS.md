# Hero A/B Variants

The landing hero runs a live A/B experiment. Two genuinely different heroes —
not just a headline swap — are served behind a sticky 50/50 assignment with a
manual override switch.

## The two cuts

| | **Variant A** (`?variant=a`) | **Variant B** (`?variant=b`) |
|---|---|---|
| Layout | Left-aligned statement | Centered, benefit-led column |
| Headline | "Revolutionizing pilot training with VR simulators" | "Your flight deck. Anywhere." (gradient accent) |
| CTAs | Two equal buttons (Book a demo / See the tech) | One high-intent primary + a low-friction text link |
| Extras | Eyebrow + subhead | Eyebrow + subhead + **trust chips** (20x · <$2k · Minutes) |
| Component | `src/components/HeroSection.tsx` | `src/components/HeroVariantB.tsx` |

Both reuse the same design tokens (primary blue, `shadow-glow`, aviation
gradients) and the same background video, so the test measures **composition
and CTA framing**, not brand.

## How a visitor is bucketed

Resolution order (see `src/hooks/use-ab-variant.tsx`):

1. **`?variant=a` / `?variant=b` in the URL** — forces a bucket and persists
   it. Deep-link or QA either hero on demand, no console needed:
   - `https://flyauqab.waleeds.world/?variant=a`
   - `https://flyauqab.waleeds.world/?variant=b`
2. **Stored bucket** in `localStorage["flyauqab-hero-variant"]`.
3. **Fresh random 50/50** assignment, persisted so the copy never flickers
   between reloads.

Check the active bucket in the console:

```js
localStorage.getItem("flyauqab-hero-variant"); // "A" or "B"
```

The `?variant=` toggle replaces the old
`localStorage.setItem(...) + location.reload()` dance — marketers and QA can now
preview or share either cut with a single link.
