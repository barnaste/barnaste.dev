import { expect, test } from "@playwright/test";

declare global {
    interface Window {
        __samples: { t: number; title: string; photo: string }[];
    }
}

// screenshots only ever see the settled frame, so stagger timing needs its own
// guard. isMobile switches at 1024px, which is what splits the expected gaps.
const expectedGap: Record<string, number> = {
    "375": 375,
    "768": 375,
    "1440": 200,
};

const TOLERANCE_MS = 50;

test("home stagger delays", async ({ page }, testInfo) => {
    await page.addInitScript(() => {
        window.__samples = [];

        const tick = () => {
            const title = document.querySelector("h1")?.parentElement;
            const photo = [...document.querySelectorAll("p")].find(
                (p) => p.textContent === "Placeholder",
            )?.parentElement;

            if (title && photo) {
                window.__samples.push({
                    t: performance.now(),
                    title: getComputedStyle(title).opacity,
                    photo: getComputedStyle(photo).opacity,
                });
            }
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    });

    await page.goto("/");
    await page.waitForTimeout(2000);

    const gap = await page.evaluate(() => {
        const started = (key: "title" | "photo") =>
            window.__samples.find((s) => Number(s[key]) > 0.01);

        const title = started("title");
        const photo = started("photo");
        return title && photo ? photo.t - title.t : null;
    });

    expect(gap).not.toBeNull();
    expect(Math.abs(gap! - expectedGap[testInfo.project.name])).toBeLessThan(TOLERANCE_MS);
});
