import { test, expect, Page } from '@playwright/test';
import beforeAllHelper from "./beforeAllHelper.js";

test.describe("Blog page", () => {
    let app: any = null;
    let url: string;
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        [app, url] = beforeAllHelper();
        page = await browser.newPage();
    });

    test.afterAll(() => {
        if(app) app.close();
    });

    test.beforeEach(async () => {
        await page.goto(`${url}/#blog`);
    });

    test("CPU arch/var perf blog exists and link works", async () => {
        const linkVisible = await page.isVisible(`text="CPU Architecture and Variable Performance"`);
        expect(linkVisible, `CPU arch/var perf link not visible`).toBe(true);
        await page.click(`text="CPU Architecture and Variable Performance"`);

        const text = await page.isVisible(`text="CPU architecture, and which variable size is actually fastest for arithmetic?"`);
        expect(text, `Main header not visible`).toBe(true);

        const text2 = await page.isVisible(`text="'Simple' variable choice"`);
        expect(text2, `Subheader not visible`).toBe(true);

        const paragraph1 = await page.isVisible(`text=It is tempting to think of all variables as purely mathematical`);
        expect(paragraph1, `Opening paragraph not visible`).toBe(true);

        const paragraph2 = await page.isVisible(`text=Nearly a decade ago when I first started to learn`);
        expect(paragraph2, `First content paragraph not visible`).toBe(true);
    });
});