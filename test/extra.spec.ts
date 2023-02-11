import { test, expect, Page } from '@playwright/test';
import beforeAllHelper from "./beforeAllHelper.js";

test.describe("Extra page", () => {
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
        await page.goto(`${url}/#extra`);
    });

    const repoEntries =  [
        {
            text: "C++ Library: Implementation of Djikstra's Algorithm",
            owner: "crGowen",
            title: "djikstras-algorithm"
        },
        {
            text: "C++ Library: Genetic Algorithm",
            owner: "crGowen",
            title: "genetic-algorithm"
        }
    ];

    repoEntries.forEach(
        async ({text, owner, title}) => test(`'${text}'`, async () => {
            await testGitHubRepoLinkEntry(text, owner, title, page);
        })
    );
});

async function testGitHubRepoLinkEntry(linkText, owner, title, page) {
    const linkSpecifier = `text="${linkText}"`;
    const linkVisible = await page.isVisible(linkSpecifier);
    expect(linkVisible, `${linkSpecifier} not visible`).toBe(true);

    const repoPagePromise = page.waitForEvent('popup');

    await page.click(linkSpecifier);

    const repoPage = await repoPagePromise;
    await repoPage.waitForLoadState();

    const expectedPageTitle = `GitHub - ${owner}/${title}`;
    expect(await repoPage.title(), `Title not ${expectedPageTitle}`).toBe(expectedPageTitle);
    
    const repoOwnerVisible = await repoPage.isVisible(`text="${owner}"`);
    expect(repoOwnerVisible, `${owner} not visible`).toBe(true);

    const repoTitleVisible = await repoPage.isVisible(`text="${title}"`);
    expect(repoTitleVisible, `${title} not visible`).toBe(true);
}