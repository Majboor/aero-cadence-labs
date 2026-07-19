import { test, expect } from "@playwright/test";

// Smoke coverage for the FlyAuqab Beta single-page marketing site.
// These exercise the real production bundle (built + previewed) to catch
// regressions in routing, hydration, the hero A/B experiment, navigation
// scroll behaviour and the FAQ accordion.

test.describe("FlyAuqab Beta landing page", () => {
  test("loads with the correct document title and hero", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/FlyAuqab Beta/i);

    // The hero H1 is A/B tested; whichever variant renders must carry a
    // valid bucket marker and non-empty copy.
    const hero = page.locator("h1[data-variant]");
    await expect(hero).toBeVisible();
    await expect(hero).toHaveAttribute("data-variant", /^[AB]$/);
    await expect(hero).not.toBeEmpty();
  });

  test("renders the brand navigation with primary CTAs", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation");
    await expect(nav.getByText("FlyAuqab")).toBeVisible();
    await expect(nav.getByText("BETA")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Book a demo", exact: true })
    ).toBeVisible();
  });

  test("hero A/B bucket is sticky across reloads", async ({ page }) => {
    await page.goto("/");
    const first = await page
      .locator("h1[data-variant]")
      .getAttribute("data-variant");
    expect(first).toMatch(/^[AB]$/);

    await page.reload();
    const second = await page
      .locator("h1[data-variant]")
      .getAttribute("data-variant");
    expect(second).toBe(first);

    const stored = await page.evaluate(() =>
      window.localStorage.getItem("flyauqab-hero-variant")
    );
    expect(stored).toBe(first);
  });

  test("nav 'Pricing' link scrolls the pricing section into view", async ({
    page,
  }) => {
    await page.goto("/");
    const pricing = page.locator("#pricing");
    await expect(pricing).toHaveCount(1);
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Pricing" })
      .click();
    await expect(pricing).toBeInViewport({ timeout: 5000 });
  });

  test("FAQ accordion reveals an answer when expanded", async ({ page }) => {
    await page.goto("/");
    const question = page.getByRole("button", {
      name: /which aircraft are supported/i,
    });
    await question.scrollIntoViewIfNeeded();
    await expect(question).toHaveAttribute("aria-expanded", "false");
    await question.click();
    await expect(question).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText(/F-16 and JF-17/i)).toBeVisible();
  });

  test("theme toggle switches the document to light mode", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    await expect(html).not.toHaveClass(/light/);
    await page.getByRole("button", { name: /switch to light mode/i }).first().click();
    await expect(html).toHaveClass(/light/);
  });

  test("unknown routes render the 404 page", async ({ page }) => {
    await page.goto("/this-route-does-not-exist");
    await expect(
      page.getByRole("heading", { name: "404" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /return to home/i })
    ).toBeVisible();
  });
});
