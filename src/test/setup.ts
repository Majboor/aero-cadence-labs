import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Unmount React trees and reset persisted state between tests so hooks
// that read localStorage (theme, A/B bucket) start from a clean slate.
afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

// jsdom does not implement matchMedia; several components/hooks
// (useIsMobile, embla carousel) call it. Provide a minimal stub.
if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

// jsdom lacks scrollIntoView; Navigation uses it for smooth scrolling.
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = vi.fn();
}

// jsdom lacks IntersectionObserver; used by scroll-driven components.
if (!("IntersectionObserver" in window)) {
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  // @ts-expect-error assigning stub onto window
  window.IntersectionObserver = IO;
}
