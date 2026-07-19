import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Floating "return to top" control that fades in once the visitor
 * has scrolled past the hero.
 */
const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 rounded-full bg-primary text-primary-foreground p-3 shadow-glow transition-all duration-300 hover:scale-110 ${
        visible
          ? "opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-4"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};

export default BackToTop;
