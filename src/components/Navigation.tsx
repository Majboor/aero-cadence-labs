import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Plane } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { openDemoRequest } from "@/hooks/use-demo-request";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "Technology", href: "#technology" },
    { name: "Pricing", href: "#pricing" },
  ];

  const closeMenu = useCallback(() => setIsOpen(false), []);

  const scrollToId = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    closeMenu();
    scrollToId(href.replace("#", ""));
  };

  // Close the mobile menu on Escape, lock body scroll while it's open,
  // and auto-close if the viewport grows to the desktop breakpoint.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    // Tailwind `lg` breakpoint = 1024px. Above it the desktop nav is shown,
    // so a lingering open mobile panel should collapse.
    const mql = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (mql.matches) closeMenu();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    mql.addEventListener("change", onResize);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
      mql.removeEventListener("change", onResize);
    };
  }, [isOpen, closeMenu]);

  return (
    <nav
      aria-label="Primary"
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="bg-gradient-blue p-2.5 rounded-xl shadow-glow flex-shrink-0">
              <Plane className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-foreground truncate">
              FlyAuqab
            </span>
            <span className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-full font-bold tracking-wider flex-shrink-0">
              BETA
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild>
              <a href="mailto:hello@flyauqab.com">Partner with Us</a>
            </Button>
            <Button
              variant="hero"
              size="sm"
              onClick={() => openDemoRequest("nav-desktop")}
            >
              Request Demo
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-1 flex-shrink-0">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen((v) => !v)}
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div id="mobile-menu" className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 py-2"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost" size="sm" asChild onClick={closeMenu}>
                  <a href="mailto:hello@flyauqab.com">Partner with Us</a>
                </Button>
                <Button
                  variant="hero"
                  size="sm"
                  onClick={() => {
                    closeMenu();
                    openDemoRequest("nav-mobile");
                  }}
                >
                  Request Demo
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
