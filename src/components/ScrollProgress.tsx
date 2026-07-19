import { useEffect, useState } from "react";

/**
 * Thin reading-progress bar pinned to the very top of the viewport.
 * Reflects how far the visitor has scrolled through the page.
 */
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-blue shadow-glow transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
