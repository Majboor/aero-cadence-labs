/**
 * AtmosphereBackground
 * A fixed, non-interactive decorative layer that gives the whole page depth:
 * two slow-drifting aurora glows, a masked technical grid, and a fine grain
 * overlay. Theme-aware and fully behind content. Purely presentational.
 */
const AtmosphereBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base wash so aurora reads on both themes without fighting content. */}
      <div className="absolute inset-0 bg-background" />

      {/* Aurora glow — top left */}
      <div
        data-aurora
        className="absolute -top-1/4 -left-1/4 h-[70vmax] w-[70vmax] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at center, hsl(var(--aviation-blue) / 0.20), transparent 62%)",
          animation: "ui-aurora-a 22s ease-in-out infinite",
        }}
      />

      {/* Aurora glow — bottom right */}
      <div
        data-aurora
        className="absolute -bottom-1/3 -right-1/4 h-[65vmax] w-[65vmax] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle at center, hsl(var(--aviation-blue-glow) / 0.16), transparent 60%)",
          animation: "ui-aurora-b 28s ease-in-out infinite",
        }}
      />

      {/* Technical grid, faded toward the horizon */}
      <div className="bg-grid absolute inset-x-0 top-0 h-[120vh]" />

      {/* Film grain for texture */}
      <div className="grain absolute inset-0" />
    </div>
  );
};

export default AtmosphereBackground;
