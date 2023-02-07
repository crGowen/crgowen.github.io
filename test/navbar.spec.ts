import { test } from '@playwright/test';
import { expectElemsVisible } from "./helpers.js";
import server from "../scripts/server.js";

test.describe("Software Page", () => {
    let app: any = null;
    let port: number | undefined = undefined;

    test.beforeAll(() => {
        app = server("dist");
        port = app.address().port;
    });

    test.afterAll(() => {
        if(app) app.close();
    });

    test.beforeEach(async ({ page }) => {
        await page.goto(`http://localhost:${port}`);
    });

    test("Check that Nav Bar contains all 4 links", async ({page}) => {
        const navBarLinks = [
            "software",
            "renders",
            "extra",
            "about"
        ];

        await expectElemsVisible("NavBar", navBarLinks, page);
    });
});