import { test, expect, type Locator } from '@playwright/test';

test.describe('Day 13 - Cart Fixture Test', () => {
  // 🏗️ THE PLAN (Data & Variables)
  const homeUrl: string = 'https://practicesoftwaretesting.com';
  const cartUrl: string = 'https://practicesoftwaretesting.com/checkout';
  const productUrl: string = 'https://practicesoftwaretesting.com/product/01KKF4AR877R5NNBGXY2RCJZGG';

  test.beforeEach(async ({ page }) => {
    await page.goto(homeUrl);

    const cartBadge: Locator = page.locator('[data-test="cart-quantity"]');
    let isBadgeVisible: boolean = false;
    try {
      await cartBadge.waitFor({ state: 'visible', timeout: 2000 });
      isBadgeVisible = true;
    } catch {
      isBadgeVisible = false;
    }

    if (isBadgeVisible) {
      await page.goto(cartUrl);
      const removeButtons: Locator = page.locator('.btn-danger');
      let itemCount: number = await removeButtons.count();
      while (itemCount > 0) {
        await removeButtons.first().click();
        itemCount--;
        await expect(removeButtons).toHaveCount(itemCount);
      }
    }
  });

  test('Add item to empty cart', async ({ page }) => {
    // 🎬 THE WORK (Actions)
    await page.goto(productUrl);

    const addToCartButton: Locator = page.getByRole('button', { name: /add to cart/i });
    await addToCartButton.click();

    const cartBadge: Locator = page.locator('[data-test="cart-quantity"]');

    // ✅ THE CHECK (Assertions)
    await expect(cartBadge).toHaveText('1');
  });
});
