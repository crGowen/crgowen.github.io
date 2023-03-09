import { test, expect, Page } from '@playwright/test';
import beforeAllHelper from "./beforeAllHelper.js";

test.describe("Software page", () => {
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
        await page.goto(`${url}/#software`);
    });

    test("Stenor page exists and Stenor link works", async () => {
        const linkVisible = await page.isVisible(`text="Stenor"`);
        expect(linkVisible, `Stenor link not visible`).toBe(true);
        await page.click(`text="Stenor"`);

        const text = await page.isVisible(`text="What is Stenor?"`);
        expect(text, `Stenor section 1 not visible`).toBe(true);

        const text2 = await page.isVisible(`text="How to use"`);
        expect(text2, `Stenor section 3 not visible`).toBe(true);

        const secondPagePromise = page.waitForEvent('popup');

        await page.click(`text="Version 2.0.0 (.zip) / Windows x64"`);

        const secondPage = await secondPagePromise;
        await secondPage.waitForLoadState();

        const descriptionVisible = await secondPage.isVisible(`text="Build: 64bit / Windows / Release"`);
        expect(descriptionVisible, `Stenor description not visible`).toBe(true);

        const downloadVisible = await secondPage.isVisible(`text="Assets"`);
        expect(downloadVisible, `Stenor DL not visible`).toBe(true);
    });

    test("Game of Life page exists and basic functionality works", async () => {
        const linkVisible = await page.isVisible(`text="Conway's Game of Life"`);
        expect(linkVisible, `GOL link not visible`).toBe(true);
        await page.click(`text="Conway's Game of Life"`);

        const text = await page.isVisible(`text="Conway's Game of Life"`);
        expect(text, `GOL header not visible`).toBe(true);

        const text2 = await page.isVisible(`text=The 'Game of Life' is a cellular evolution`);
        expect(text2, `GOL text not visible`).toBe(true);

        const golSq = page.locator('id=golsq-11,11');

        await expect(golSq, `GOL Sq not visible`).toBeVisible();
        await expect(golSq, `GOL Sq styled inactive to start`).toHaveClass("golSq");
        await golSq.click();

        await expect(golSq, `GOL Sq styled active after click`).toHaveClass("golSq sqActive");

        await page.click(`text="Clear"`);

        await expect(golSq, `GOL Sq DEFAULT styled inactive after clear`).toHaveClass("golSq");
    });

    test("Interactive Periodic Table page exists and basic functionality works", async () => {
        const linkVisible = await page.isVisible(`text="Interactive Periodic Table"`);
        expect(linkVisible, `IPT link not visible`).toBe(true);
        await page.click(`text="Interactive Periodic Table"`);

        const berylliumSymbol = await page.isVisible(`text="Be"`);
        expect(berylliumSymbol, `Beryllium symbol not visible`).toBe(true);
        await page.click(`text="Be"`);
        const berylliumName = await page.isVisible(`text="Beryllium"`);
        expect(berylliumName, `Beryllium name not visible`).toBe(true);
        const berylliumText = await page.isVisible(`text=In 1798 Louis-Nicolas Vauquelin reported`);
        expect(berylliumText, `Beryllium text not visible`).toBe(true);

        const leadSymbol = await page.isVisible(`text="Pb"`);
        expect(leadSymbol, `Lead symbol not visible`).toBe(true);
        await page.click(`text="Pb"`);
        const leadName = await page.isVisible(`text="Lead"`);
        expect(leadName, `Lead name not visible`).toBe(true);
        const leadText = await page.isVisible(`text=A relatively common element, lead has been`);
        expect(leadText, `Lead text not visible`).toBe(true);
    });

    const repoEntries =  [
        {
            text: "C++ Library: Implementation of Djikstra's Algorithm",
            owner: "crGowen",
            title: "djikstras-algorithm"
        },
        {
            text: "C Library: Genetic Algorithm",
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