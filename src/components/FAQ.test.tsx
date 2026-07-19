import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FAQ from "./FAQ";

describe("FAQ section", () => {
  it("renders the section heading", () => {
    render(<FAQ />);
    expect(
      screen.getByRole("heading", { name: /got questions/i })
    ).toBeInTheDocument();
  });

  it("renders each question as an accordion trigger", () => {
    render(<FAQ />);
    const triggers = screen.getAllByRole("button");
    // The FAQ ships with eight canonical questions.
    expect(triggers.length).toBeGreaterThanOrEqual(8);
    expect(
      screen.getByRole("button", {
        name: /certified for real-world training/i,
      })
    ).toBeInTheDocument();
  });

  it("reveals the answer when a question is expanded", async () => {
    const user = userEvent.setup();
    render(<FAQ />);
    const trigger = screen.getByRole("button", {
      name: /which aircraft are supported/i,
    });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(await screen.findByText(/F-16 and JF-17/i)).toBeInTheDocument();
  });
});
