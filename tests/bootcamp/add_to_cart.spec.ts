import { test, expect, type Page, type Locator } from '@playwright/test';

test('Add iPod Touch to Cart', async ({ page }: { page: Page }) => {
    // ============================================
    // PLAN: Define all locators and test data upfront
    // ============================================
    const baseUrl: string = 'https://ecommerce-playground.lambdatest.io/';
    const searchTerm: string = 'iPod';
    const productName: string = 'iPod Touch';
    const expectedSuccessMessage: string = 'Success: You have added';

    // Locators
    const searchInput: Locator = page.getByRole('textbox', { name: 'Search For Products' });
    const searchButton: Locator = page.getByRole('button', { name: 'Search' });
    const productLink: Locator = page.getByRole('link', { name: productName, exact: true }).first();
    const addToCartButton: Locator = page.getByRole('button', { name: 'Add to Cart' });
    const successAlert: Locator = page.locator('.alert-success');

    // ============================================
    // WORK: Execute the test steps
    // ============================================

    // Step 1: Navigate to the e-commerce site
    await page.goto(baseUrl);

    // Step 2: Search for 'iPod'
    await searchInput.fill(searchTerm);
    await searchButton.click();

    // Step 3: Click on 'iPod Touch' product
    await productLink.click();

    // Step 4: Add the product to cart
    await addToCartButton.click();

    // ============================================
    // CHECK: Verify the expected outcome
    // ============================================

    // Step 5: Verify the success message is displayed
    await expect(successAlert).toBeVisible();
    await expect(successAlert).toContainText(expectedSuccessMessage);
    await expect(successAlert).toContainText(productName);
});
