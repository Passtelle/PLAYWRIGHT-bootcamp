import { test, expect, type Locator } from '@playwright/test';

test.describe('Day 13 - Hooks Example', () => {
  // 🏗️ SETUP (Shared Data)
  const homeUrl: string = 'https://practicesoftwaretesting.com';
  const product1Url: string = 'https://practicesoftwaretesting.com/product/01KKF4AR7W897G12QP3WKPXMX4';
  const product2Url: string = 'https://practicesoftwaretesting.com/product/01KKF4AR877R5NNBGXY2RCJZGG';

  test.beforeEach(async ({ page }) => {
    console.log('Starting test with clean state');
    await page.goto(homeUrl);
  });

  test.afterEach(async () => {
    console.log('Test finished');
  });

  test('Test 1 - Add Safety Goggles to cart', async ({ page }) => {
    // 🎬 THE WORK (Actions)
    await page.goto(product1Url);
    const addToCartButton: Locator = page.getByRole('button', { name: /add to cart/i });
    await addToCartButton.click();

    // ✅ THE CHECK (Assertions)
    await expect(addToCartButton).toBeVisible();
  });

  test('Test 2 - Add Combination Pliers to cart', async ({ page }) => {
    // 🎬 THE WORK (Actions)
    await page.goto(product2Url);
    const addToCartButton: Locator = page.getByRole('button', { name: /add to cart/i });
    await addToCartButton.click();

    // ✅ THE CHECK (Assertions)
    await expect(addToCartButton).toBeVisible();
  });
});
