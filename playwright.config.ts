import { defineConfig } from "@playwright/test";

const port = 4173;

export default defineConfig({
    testDir: "tests",
    snapshotPathTemplate: "screenshots/baseline/{projectName}/{arg}{ext}",
    outputDir: "screenshots/results",
    fullyParallel: true,
    workers: 4,
    reporter: [["list"], ["html", { outputFolder: "screenshots/report", open: "never" }]],
    use: {
        baseURL: `http://localhost:${port}`,
        // the site reads no stored preference yet, but pinning these keeps the
        // rendered dates and the initial theme identical between runs
        colorScheme: "light",
        timezoneId: "America/Toronto",
        locale: "en-CA",
    },
    projects: [
        { name: "375", use: { viewport: { width: 375, height: 812 } } },
        { name: "768", use: { viewport: { width: 768, height: 1024 } } },
        { name: "1440", use: { viewport: { width: 1440, height: 900 } } },
    ],
    webServer: {
        command: `npm run build && npm run preview -- --port ${port} --strictPort`,
        url: `http://localhost:${port}`,
        reuseExistingServer: false,
        timeout: 180_000,
    },
});
