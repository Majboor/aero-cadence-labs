import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * Global "Book a Demo" lead-capture controller.
 *
 * Every "Book a demo" / "Request Demo" CTA on the site used to just scroll to
 * the pricing section — there was no way for a visitor to actually request a
 * demo. This provider owns a single modal instance and exposes an `open()`
 * function through context. It ALSO listens for a `flyauqab:open-demo` window
 * event so any component (or even inline HTML) can trigger the flow without
 * importing the hook, e.g.:
 *
 *   window.dispatchEvent(new CustomEvent("flyauqab:open-demo", {
 *     detail: { source: "hero" },
 *   }));
 */

export const DEMO_OPEN_EVENT = "flyauqab:open-demo";
export const DEMO_STORAGE_KEY = "flyauqab_demo_requests";

export interface DemoRequestRecord {
  reference: string;
  fullName: string;
  email: string;
  organization: string;
  role: string;
  trainingMode: string;
  traineeCount: string;
  timeline: string;
  preferredDate: string;
  message: string;
  source: string;
  submittedAt: string;
}

interface DemoRequestContextValue {
  isOpen: boolean;
  source: string;
  open: (source?: string) => void;
  close: () => void;
}

const DemoRequestContext = createContext<DemoRequestContextValue | null>(null);

/** Fire the global event — usable from anywhere, no hook needed. */
export function openDemoRequest(source = "unknown") {
  window.dispatchEvent(
    new CustomEvent(DEMO_OPEN_EVENT, { detail: { source } })
  );
}

/** Persist a completed request locally and return the saved record. */
export function saveDemoRequest(
  record: Omit<DemoRequestRecord, "reference" | "submittedAt">
): DemoRequestRecord {
  const reference = `FA-DEMO-${Date.now()
    .toString(36)
    .toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;

  const full: DemoRequestRecord = {
    ...record,
    reference,
    submittedAt: new Date().toISOString(),
  };

  try {
    const raw = window.localStorage.getItem(DEMO_STORAGE_KEY);
    const existing: DemoRequestRecord[] = raw ? JSON.parse(raw) : [];
    existing.push(full);
    window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // localStorage may be unavailable (private mode) — the reference is still
    // returned so the confirmation screen works.
  }

  return full;
}

export function DemoRequestProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("unknown");

  const open = useCallback((src = "unknown") => {
    setSource(src);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ source?: string }>).detail;
      open(detail?.source ?? "event");
    };
    window.addEventListener(DEMO_OPEN_EVENT, handler);
    return () => window.removeEventListener(DEMO_OPEN_EVENT, handler);
  }, [open]);

  const value = useMemo(
    () => ({ isOpen, source, open, close }),
    [isOpen, source, open, close]
  );

  return (
    <DemoRequestContext.Provider value={value}>
      {children}
    </DemoRequestContext.Provider>
  );
}

export function useDemoRequest(): DemoRequestContextValue {
  const ctx = useContext(DemoRequestContext);
  if (!ctx) {
    throw new Error("useDemoRequest must be used within a DemoRequestProvider");
  }
  return ctx;
}
