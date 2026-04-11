import { test, expect } from '@playwright/test';
import type { Locator } from '@playwright/test';

test('Search for MacBook and verify results page', async ({ page }) => {
  // 🏗️ THE PLAN (Data & Variables)
  const url: string = 'https://ecommerce-playground.lambdatest.io/';
  const searchTerm: string = 'MacBook';
  const titlePattern: RegExp = /Search/i;

  // 🎬 THE WORK (Actions)
  await page.goto(url);

  const searchInput: Locator = page.getByPlaceholder('Search For Products').first();
  await searchInput.fill(searchTerm);

  const searchButton: Locator = page.getByRole('button', { name: /search/i }).first();
  await searchButton.click();

  // ✅ THE CHECK (Assertions)
  await expect(page).toHaveTitle(titlePattern);
});
