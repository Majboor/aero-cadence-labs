import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useTheme } from "./use-theme";

const STORAGE_KEY = "flyauqab-theme";

describe("useTheme", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove("light");
  });

  it("defaults to the brand dark theme with no stored preference", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("dark");
    expect(document.documentElement.classList.contains("light")).toBe(false);
  });

  it("respects a stored light preference", async () => {
    window.localStorage.setItem(STORAGE_KEY, "light");
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("light");
    await waitFor(() =>
      expect(document.documentElement.classList.contains("light")).toBe(true)
    );
  });

  it("toggles between dark and light and applies the html class", async () => {
    const { result } = renderHook(() => useTheme());

    act(() => result.current.toggleTheme());
    await waitFor(() => expect(result.current.theme).toBe("light"));
    expect(document.documentElement.classList.contains("light")).toBe(true);

    act(() => result.current.toggleTheme());
    await waitFor(() => expect(result.current.theme).toBe("dark"));
    expect(document.documentElement.classList.contains("light")).toBe(false);
  });

  it("persists the chosen theme to localStorage", async () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setTheme("light"));
    await waitFor(() =>
      expect(window.localStorage.getItem(STORAGE_KEY)).toBe("light")
    );
  });
});
