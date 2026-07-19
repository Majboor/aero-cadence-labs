import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn (className merge helper)", () => {
  it("joins truthy class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("drops falsy / conditional values", () => {
    const show = false as boolean;
    expect(cn("a", show && "b", undefined, null, "c")).toBe("a c");
  });

  it("resolves conflicting tailwind utilities so the last one wins", () => {
    // tailwind-merge should collapse padding conflicts to the final value.
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });

  it("supports conditional object syntax from clsx", () => {
    expect(cn({ active: true, hidden: false })).toBe("active");
  });

  it("returns an empty string when given nothing", () => {
    expect(cn()).toBe("");
  });
});
