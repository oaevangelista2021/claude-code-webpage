import { test, expect } from "@playwright/test";

const CONTACT_EMAIL = "oevangelista2021@gmail.com";
const MAILTO_PREFIX = `mailto:${CONTACT_EMAIL}`;

const AGENT_NAMES = [
  "Assistant Project Manager Assistant AI",
  "Admin AI",
  "Superintendent AI",
  "Project Accounting AI",
  "Estimating AI",
];

test.describe("Buildology landing page", () => {
  test("loads with the correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Buildology/);
  });

  test("renders Oscar's images", async ({ page }) => {
    await page.goto("/");

    const oePhoto = page.locator('img[src="/oe photo.png"]');
    const oscar1 = page.locator('img[src="/Oscar_1.jpg"]');
    const oscarDirector = page.locator('img[src="/Oscar_Director.png"]');

    await expect(oePhoto).toBeVisible();
    await expect(oscar1).toBeVisible();
    await expect(oscarDirector).toBeVisible();
  });

  test("contains the core services and AI agent roster copy", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByText("Vertical and horizontal projects"),
    ).toBeVisible();

    for (const name of AGENT_NAMES) {
      await expect(page.getByText(name, { exact: false }).first()).toBeVisible();
    }
  });

  test("every CTA links to the contact email via mailto", async ({
    page,
  }) => {
    await page.goto("/");

    const mailLinks = page.locator('a[href^="mailto:"]');
    const count = await mailLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const href = await mailLinks.nth(i).getAttribute("href");
      expect(href).toBeTruthy();
      expect(href!.startsWith(MAILTO_PREFIX)).toBe(true);
    }
  });

  test("shows the time-lapse video and reveals it on scroll", async ({
    page,
  }) => {
    await page.goto("/");

    const video = page.locator('video[src="/video (construction-timelapse).mp4"]');
    await expect(video).toHaveCount(1);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(video).toBeInViewport();
  });
});
