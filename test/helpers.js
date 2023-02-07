import { expect } from '@playwright/test';

async function expectElemsVisible(testString, elems, page) {
    return await serialForEach(elems, async (x) => {
        const elemVisible = await page.isVisible(`text="${x}"`);
        expect(elemVisible, `${testString}: Elem ${x} not visible`).toBe(true);
    });
}

function serialForEach(elems, fn) {
    const elemsPromises = elems.map((x) => () => fn(x));

    return elemsPromises.reduce((prev, curr) => prev.then(curr),
    Promise.resolve());
}

export {
    expectElemsVisible
};