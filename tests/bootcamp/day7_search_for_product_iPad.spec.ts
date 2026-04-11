import { test, expect } from '@playwright/test';
import type { Locator } from '@playwright/test';

test('Search for iPad and verify results', async ({ page }) => {
  // 🏗️ THE PLAN (Data & Variables)
  const url: string = 'https://ecommerce-playground.lambdatest.io/';
  const searchTerm: string = 'iPad';
  const titlePattern: RegExp = /Search/i;

  // 🎬 THE WORK (Actions)
  await page.goto(url);

  const searchInput: Locator = page.getByPlaceholder('Search For Products').first();
  await searchInput.fill(searchTerm);
  await searchInput.press('Enter');

  // ✅ THE CHECK (Assertions)
  await expect(page).toHaveTitle(titlePattern);

  const productHeadings: Locator = page.getByRole('heading', { level: 4 });
  const count: number = await productHeadings.count();
  expect(count).toBeGreaterThan(0);

  console.log(`Found ${count} products for iPad`);
});
