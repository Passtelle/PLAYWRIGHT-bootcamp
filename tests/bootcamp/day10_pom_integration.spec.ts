import { test, expect } from '@playwright/test';
import { SearchPage } from '../../pages/SearchPage';
import { ProductPageSmart } from '../../pages/ProductPageSmart';

test('Day 10 - Multi-POM integration: search and buy iMac', async ({ page }) => {
  // 🏗️ THE PLAN (Data & Variables)
  const url: string = 'https://ecommerce-playground.lambdatest.io/';
  const searchTerm: string = 'iMac';
  const successPattern: RegExp = /success/i;

  // 🎬 THE WORK (Actions)
  await page.goto(url);

  const searchPage: SearchPage = new SearchPage(page);
  await searchPage.search(searchTerm);

  await page.locator('.product-layout .product-thumb h4 a').nth(3).click();

  const productPage: ProductPageSmart = new ProductPageSmart(page);
  await productPage.clickBuyNow();

  // ✅ THE CHECK (Assertions)
  await expect(productPage.successNotification).toContainText(successPattern);
});
