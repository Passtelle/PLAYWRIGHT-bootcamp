import { test, expect } from '@playwright/test';
import type { Locator } from '@playwright/test';
import { SearchPage } from '../../pages/SearchPage';

test('Search for MacBook using SearchPage POM', async ({ page }) => {
  // 🏗️ THE PLAN (Data & Variables)
  const url: string = 'https://ecommerce-playground.lambdatest.io/';
  const searchTerm: string = 'MacBook';
  const titlePattern: RegExp = /Search/i;

  // 🎬 THE WORK (Actions)
  await page.goto(url);

  const searchPage: SearchPage = new SearchPage(page);
  await searchPage.search(searchTerm);

  // ✅ THE CHECK (Assertions)
  await expect(page).toHaveTitle(titlePattern);

  const productHeadings: Locator = searchPage.productHeadings;
  const count: number = await productHeadings.count();
  expect(count).toBeGreaterThan(0);

  console.log(`Found ${count} results for "${searchTerm}"`);
});
