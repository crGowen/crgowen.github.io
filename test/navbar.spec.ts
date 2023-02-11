import { test, expect, Page } from '@playwright/test';
import process from "process";
import server from "../scripts/server.js";

test.describe("Navigation", () => {
    let app: any = null;
    let port: number | undefined = undefined;
    let url = "https://crgowen.github.io";
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        const useGithubPagesSite = process.env.USE_GH_PAGES_SITE;

        if (!useGithubPagesSite) {
            app = server("dist");
            port = app.address().port;
            url = `http://localhost:${port}`;
        }

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
        "extra",
        "about"
    ];

    navLinks.forEach(
        async (link) => test(`Check that '${link}' link works`, async () => {
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