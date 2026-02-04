import { test, expect } from '@playwright/test';

test('Login with Variables', async ({ page }) => {
  // 1. DATA SETUP
  const url: string = 'https://www.saucedemo.com/';
  const username: string = 'standard_user';
  const password: string = 'secret_sauce';

  // 2. ACTION ("The Recipe")
  await page.goto(url);
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');

  // 3. ASSERTION
  await expect(page).toHaveURL(/inventory/);

  // 4. Strict Checks
  await expect(page.locator('.title')).toHaveText('Products');
  await expect(page.locator('.inventory_item_name').filter({ hasText: 'Sauce Labs Backpack' })).toBeVisible();
  await expect(page.locator('.inventory_item')).toHaveCount(6);

  // 5. Sort Items
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
  await expect(page.locator('.inventory_item_name').first()).toHaveText('Sauce Labs Onesie');

  // 6. Add to Cart (The Shopping Cart Challenge)
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  // 7. Verify Cart Badge
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

  // 8. Go to the Cart Page
    await page.locator('.shopping_cart_link').click();

  // 9. Verify we are in the Cart
  await expect(page).toHaveURL(/cart/);

  // 10. Check that our specific items are in the list
  // We check that the text "Sauce Labs Onesie" is visible in the cart list
    await expect(page.locator('.inventory_item_name').filter({ hasText: 'Sauce Labs Onesie'})).toBeVisible();
    await expect(page.locator('.inventory_item_name').filter({ hasText: 'Sauce Labs Bike Light' })).toBeVisible();
})  