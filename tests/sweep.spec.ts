import { expect, test, type Page } from "@playwright/test";

const toggle = (page: Page) => page.getByRole("button", { name: "Toggle Dark Mode" });
const overlay = (page: Page) => page.locator(".theme-sweep");

// install() alone leaves the clock following real time, which lets the sweep finish
// during the screenshot's stability wait. pauseAt freezes it so runFor is the only
// thing that moves time, and the overlay assertions below fail loudly if that regresses.
const START = new Date("2026-01-01T12:00:00Z");
const PAUSED = new Date("2026-01-01T12:00:03Z");

async function freeze(page: Page, path: string) {
    await page.clock.install({ time: START });
    await page.goto(path);
    await page.clock.pauseAt(PAUSED);
}

test.describe("theme sweep", () => {
    test.beforeEach(async ({ page }) => {
        await freeze(page, "/");
    });

    test("one click wipes a single diagonal", async ({ page }) => {
        await toggle(page).click();
        await page.mouse.move(0, 0);
        await page.clock.runFor(280);

        await expect(page).toHaveScreenshot("sweep-one-line.png", { animations: "disabled" });

        // still mid-sweep after the capture; proves the clock stayed frozen
        await expect(overlay(page)).toHaveCount(1);
    });

    test("a second click adds a second line", async ({ page }) => {
        await toggle(page).click();
        await page.mouse.move(0, 0);
        await page.clock.runFor(260);
        await toggle(page).click();
        await page.clock.runFor(200);

        await expect(page).toHaveScreenshot("sweep-two-lines.png", { animations: "disabled" });

        // still mid-sweep after the capture; proves the clock stayed frozen
        await expect(overlay(page)).toHaveCount(1);
    });

    test("a third click adds a third", async ({ page }) => {
        await toggle(page).click();
        await page.clock.runFor(200);
        await toggle(page).click();
        await page.clock.runFor(200);
        await toggle(page).click();
        await page.mouse.move(0, 0);
        await page.clock.runFor(150);

        await expect(page).toHaveScreenshot("sweep-three-lines.png", { animations: "disabled" });

        // still mid-sweep after the capture; proves the clock stayed frozen
        await expect(overlay(page)).toHaveCount(1);
    });

    test("the overlay is torn down once every line has passed", async ({ page }) => {
        await toggle(page).click();
        await page.clock.runFor(2000);

        await expect(overlay(page)).toHaveCount(0);
        await expect(page.locator("body")).toHaveClass(/dark/);
    });

    test("an even number of clicks lands back on the starting theme", async ({ page }) => {
        await toggle(page).click();
        await page.clock.runFor(150);
        await toggle(page).click();
        await page.clock.runFor(2000);

        await expect(overlay(page)).toHaveCount(0);
        await expect(page.locator("body")).not.toHaveClass(/dark/);
    });
});

test("the clone stays aligned with the scroll position", async ({ page }) => {
    await freeze(page, "/blog/demo");
    await page.evaluate(() => window.scrollTo(0, 1200));

    // a real click would scroll the header back into view first
    await toggle(page).dispatchEvent("click");
    await page.mouse.move(0, 0);
    await page.clock.runFor(280);

    await expect(page).toHaveScreenshot("sweep-scrolled.png", { animations: "disabled" });

    // still mid-sweep after the capture; proves the clock stayed frozen
    await expect(overlay(page)).toHaveCount(1);
});

test("reduced motion swaps instantly without sweeping", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await toggle(page).click();

    await expect(page.locator("body")).toHaveClass(/dark/);
    await expect(overlay(page)).toHaveCount(0);
});
