import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useABVariant } from "./use-ab-variant";

const STORAGE_KEY = "flyauqab-hero-variant";

describe("useABVariant", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("assigns a valid A or B bucket on first visit and persists it", async () => {
    const { result } = renderHook(() => useABVariant());
    await waitFor(() => {
      expect(window.localStorage.getItem(STORAGE_KEY)).not.toBeNull();
    });
    expect(["A", "B"]).toContain(result.current);
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe(result.current);
  });

  it("buckets into A when the random roll is below 0.5", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1);
    const { result } = renderHook(() => useABVariant());
    await waitFor(() => expect(result.current).toBe("A"));
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("A");
  });

  it("buckets into B when the random roll is at/above 0.5", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.9);
    const { result } = renderHook(() => useABVariant());
    await waitFor(() => expect(result.current).toBe("B"));
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("B");
  });

  it("re-reads the stored bucket instead of re-rolling (sticky)", async () => {
    window.localStorage.setItem(STORAGE_KEY, "B");
    const randomSpy = vi.spyOn(Math, "random");
    const { result } = renderHook(() => useABVariant());
    await waitFor(() => expect(result.current).toBe("B"));
    expect(randomSpy).not.toHaveBeenCalled();
  });
});
