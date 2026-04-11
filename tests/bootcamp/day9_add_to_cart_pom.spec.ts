import { test, expect } from '@playwright/test';
import type { Locator } from '@playwright/test';
import { SearchPage } from '../../pages/SearchPage';
import { ProductPage } from '../../pages/ProductPage';

test('Search for iMac and buy now using POM', async ({ page }) => {
  // 🏗️ THE PLAN (Data & Variables)
  const url: string = 'https://ecommerce-playground.lambdatest.io/';
  const searchTerm: string = 'iMac';
  const successPattern: RegExp = /Success/i;

  // 🎬 THE WORK (Actions)
  await page.goto(url);

  const searchPage: SearchPage = new SearchPage(page);
  await searchPage.search(searchTerm);

  const firstProduct: Locator = page.locator('.product-layout a').first();
  await firstProduct.click();

  const productPage: ProductPage = new ProductPage(page);
  await productPage.clickBuyNow();

  // ✅ THE CHECK (Assertions)
  await expect(productPage.successNotification).toContainText(successPattern);
});
