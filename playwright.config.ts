import { defineConfig, devices } from '@playwright/test';

const useCommon = {
    headless: true,
    ignoreHTTPSErrors: true
};

export default defineConfig({
    projects: [
        {
            name: "chromium",
            use: { ...useCommon, ...devices["Desktop Chrome"]}
        },
        {
            name: "firefox",
            use: { ...useCommon, ...devices["Desktop Firefox"]}
        },
        {
            name: "webkit",
            use: { ...useCommon, ...devices["Desktop Safari"]}
        }
    ]
});