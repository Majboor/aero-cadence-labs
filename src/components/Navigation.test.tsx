import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navigation from "./Navigation";

describe("Navigation", () => {
  it("renders the FlyAuqab brand and BETA badge", () => {
    render(<Navigation />);
    expect(screen.getByText("FlyAuqab")).toBeInTheDocument();
    expect(screen.getByText("BETA")).toBeInTheDocument();
  });

  it("renders every primary nav link (desktop set)", () => {
    render(<Navigation />);
    for (const label of ["About", "Features", "Technology", "Pricing"]) {
      // Links appear in the desktop bar; at least one match must exist.
      expect(screen.getAllByRole("link", { name: label }).length).toBeGreaterThan(0);
    }
  });

  it("exposes a Request Demo call to action", () => {
    render(<Navigation />);
    expect(
      screen.getAllByRole("button", { name: /request demo/i }).length
    ).toBeGreaterThan(0);
  });

  it("opens and closes the mobile menu when the toggle is clicked", async () => {
    const user = userEvent.setup();
    render(<Navigation />);

    // The mobile menu is collapsed initially: only the desktop link set exists.
    expect(screen.getAllByRole("link", { name: "About" })).toHaveLength(1);

    const toggle = screen.getByRole("button", {
      name: /open navigation menu/i,
    }) as HTMLButtonElement;
    await user.click(toggle);

    // After opening, the mobile duplicate of the links is rendered.
    expect(screen.getAllByRole("link", { name: "About" }).length).toBe(2);

    await user.click(toggle);
    expect(screen.getAllByRole("link", { name: "About" })).toHaveLength(1);
  });

  it("provides a partner mailto link", () => {
    render(<Navigation />);
    const partnerLink = screen.getByRole("link", { name: /partner with us/i });
    expect(partnerLink).toHaveAttribute("href", "mailto:hello@flyauqab.com");
  });
});
