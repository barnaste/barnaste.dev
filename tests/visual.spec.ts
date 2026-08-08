import { expect, test, type Locator, type Page } from "@playwright/test";

const routes = [
    { path: "/", name: "home" },
    { path: "/projects", name: "projects" },
    { path: "/blog", name: "blog-index" },
    { path: "/blog/demo", name: "post-demo" },
    { path: "/blog/placehold", name: "post-placehold" },
    { path: "/blog/nonexistent", name: "post-missing" },
];

// entry transitions are driven by requestAnimationFrame, so they emit no
// transitionend to wait on. longest is a 375ms delay over a 500ms duration.
const ENTRY_MS = 1200;
// theme toggle spins for 800ms while the body cross-fades for 300ms
const THEME_MS = 1000;
const HOVER_MS = 400;

async function settle(page: Page) {
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => document.fonts.ready.then(() => undefined));
    await page.waitForTimeout(ENTRY_MS);
}

async function enterDark(page: Page) {
    await page.getByLabel("Toggle Dark Mode").click();
    await page.mouse.move(0, 0);
    await page.waitForTimeout(THEME_MS);
}

async function hoverShot(page: Page, target: Locator, name: string, pad = 24) {
    await target.scrollIntoViewIfNeeded();
    await target.hover();
    await page.waitForTimeout(HOVER_MS);

    const box = await target.boundingBox();
    if (!box) throw new Error(`no bounding box for ${name}`);

    await expect(page).toHaveScreenshot(name, {
        clip: {
            x: Math.max(0, box.x - pad),
            y: Math.max(0, box.y - pad),
            width: box.width + pad * 2,
            height: box.height + pad * 2,
        },
        animations: "disabled",
    });
}

for (const { path, name } of routes) {
    test(`${name} light`, async ({ page }) => {
        await page.goto(path);
        await settle(page);
        await expect(page).toHaveScreenshot(`${name}-light.png`, {
            fullPage: true,
            animations: "disabled",
        });
    });

    test(`${name} dark`, async ({ page }) => {
        await page.goto(path);
        await settle(page);
        await enterDark(page);
        await expect(page).toHaveScreenshot(`${name}-dark.png`, {
            fullPage: true,
            animations: "disabled",
        });
    });
}

test("nav inactive link hover", async ({ page }) => {
    await page.goto("/");
    await settle(page);
    await hoverShot(page, page.getByRole("link", { name: "projects" }), "hover-nav-inactive.png");
});

test("nav active link hover", async ({ page }) => {
    await page.goto("/");
    await settle(page);
    await hoverShot(page, page.getByRole("link", { name: "home" }), "hover-nav-active.png");
});

test("theme toggle hover", async ({ page }) => {
    await page.goto("/");
    await settle(page);
    await hoverShot(page, page.getByLabel("Toggle Dark Mode"), "hover-theme-toggle.png");
});

test("resume reveal hover", async ({ page }) => {
    await page.goto("/");
    await settle(page);
    await hoverShot(page, page.getByText("On Study Term"), "hover-resume.png");
});

test("skill card hover", async ({ page }) => {
    await page.goto("/");
    await settle(page);
    await hoverShot(page, page.locator(".skill-card").first(), "hover-skill-card.png");
});

test("contact link hover", async ({ page }) => {
    await page.goto("/");
    await settle(page);
    await hoverShot(page, page.getByLabel("GitHub Profile"), "hover-contact-link.png");
});

test("blog entry hover", async ({ page }) => {
    await page.goto("/blog");
    await settle(page);
    await hoverShot(page, page.locator("a[href^='/blog/']").first(), "hover-blog-entry.png");
});

test("heading anchor hover", async ({ page }) => {
    await page.goto("/blog/demo");
    await settle(page);
    await hoverShot(page, page.locator(".blog-article h2").first(), "hover-heading-anchor.png", 56);
});

test("blog article link hover", async ({ page }) => {
    await page.goto("/blog/demo");
    await settle(page);
    await hoverShot(page, page.locator(".blog-article a[href='https://www.google.com']").first(), "hover-article-link.png");
});
