import { test, expect, Page } from '@playwright/test';
import beforeAllHelper from "./beforeAllHelper.js";

test.describe("Navigation", () => {
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
        await page.goto(url);
    });

    test("Test that 404 Page works", async () => {
        await page.goto(`${url}/#doesnotexist`);

        const pageNotFoundVisible = await page.isVisible(`text="404 - Page not found"`);
        expect(pageNotFoundVisible, `404 Page is broken`).toBe(true);
    });

    test("Check that fake link is not found", async () => {
        const linkSpecifier = `text="doesnotexist"`;
        const linkVisible = await page.isVisible(linkSpecifier);
        expect(linkVisible, `${linkSpecifier} is visible`).toBe(false);
    });

    const navLinks =  [
        "software",
        "renders",
        "blog",
        "about"
    ];

    navLinks.forEach(
        async (link) => test(`Test '${link}' navbar link`, async () => {
            await testLinkVisibleAndWorks(link, page);
        })
    );
});

async function testLinkVisibleAndWorks(linkText, page) {
    const linkSpecifier = `text="${linkText}"`;
    const linkVisible = await page.isVisible(linkSpecifier);
    expect(linkVisible, `${linkSpecifier} not visible`).toBe(true);

    await page.click(linkSpecifier);
    
    const pageNotFoundVisible = await page.isVisible(`text="404 - Page not found"`);
    expect(pageNotFoundVisible, `${linkSpecifier} links to 404`).toBe(false);
}