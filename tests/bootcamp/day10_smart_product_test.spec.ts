import { test, expect } from '@playwright/test';
import { SearchPage } from '../../pages/SearchPage';
import { ProductPageSmart2 } from '../../pages/ProductPageSmart2';

test('Day 10 - Smart product page: buy if in stock, log if out of stock', async ({ page }) => {
  // 🏗️ THE PLAN (Data & Variables)
  const url: string = 'https://ecommerce-playground.lambdatest.io/';
  const searchTerm: string = 'MacBook';
  const successPattern: RegExp = /success/i;

  // 🎬 THE WORK (Actions)
  await page.goto(url);

  const searchPage: SearchPage = new SearchPage(page);
  await searchPage.search(searchTerm);

  await page.locator('.product-layout a').first().click();
  
  const productPage: ProductPageSmart2 = new ProductPageSmart2(page);
  const outOfStock: boolean = await productPage.isOutOfStock();

  if (outOfStock) {
    console.log('Product is out of stock — skipping purchase.');
  } else {
    await productPage.clickBuyNow();

    // ✅ THE CHECK (Assertions)
    await expect(productPage.successNotification).toBeVisible();
    await expect(productPage.successNotification).toHaveText(successPattern);
  }
});
