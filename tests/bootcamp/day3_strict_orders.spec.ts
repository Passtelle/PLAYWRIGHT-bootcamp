import { test, expect, type Page, type Locator } from '@playwright/test';

// ------------------------------------------
// THE DATA (Product Array with Strict Typing)
// ------------------------------------------
const products: string[] = ['Palm Treo Pro', 'HTC Touch HD'];

for (const productName of products) {
    test(`Day 3: Buy ${productName} with Strict Types`, async ({ page }: { page: Page }) => {

        // ------------------------------------------
        // THE PLAN (Strict Variables)
        // -----------------------------------------
        const targetUrl: string = 'https://ecommerce-playground.lambdatest.io/';
        const expectedTitle: RegExp = new RegExp(productName);

        // ----------------------------------------------
        // THE ACTORS (Locators - The "Lazy" Strategy)
        // ----------------------------------------------
        // We define How to find them, but we don't look for them yet.
        const searchBox: Locator = page.getByRole('textbox', { name: 'Search For Product' });
        const searchButton: Locator = page.getByRole('button', { name: 'Search' });

        // Notice usage of .nth(2) to be safe, as strict mode hates duplicates
        const productLink: Locator = page.getByRole('link', { name: productName }).nth(2);

        // ----------------------------------------------
        // THE ACTION (Work)
        // ----------------------------------------------
        await page.goto(targetUrl);

        await searchBox.fill(productName);
        await searchButton.click();

        await productLink.click();

        // ----------------------------------------------
        // THE CHECK (Assertions)
        // ----------------------------------------------
        await expect(page).toHaveTitle(expectedTitle);
        // Check if the "Add to Cart" button is visible on the product page
        const addToCartBtn: Locator = page.getByRole('button', { name: 'Add to Cart' });
        const isAddToCartVisible: boolean = await addToCartBtn.isVisible();

        if (isAddToCartVisible) {
            await addToCartBtn.click();
            const successMessage: Locator = page.getByText(/success/i);
            await expect(successMessage).toBeVisible();
        } else {
            console.log(`Product is out of stock: ${productName}`);
        }
    });
}