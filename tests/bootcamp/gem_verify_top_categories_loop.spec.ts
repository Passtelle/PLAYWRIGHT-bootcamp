import { test, expect } from '@playwright/test';

test('Verify Top Categories via Loop', async ({ page }) => {
  // 🏗️ THE PLAN
  const categories: string[] = ['Components', 'Tablets', 'Software'];
  const url: string = 'https://ecommerce-playground.lambdatest.io/';

  // 🎬 THE WORK
  await page.goto(url);

  for (const category of categories) {
    const link = page.getByRole('link', { name: category, exact: true });
    // MISSING STEP: How do we make sure it's visible before we move on?
    await console.log(`Checking category: ${category}`);
  }

  // ✅ THE CHECK
  // (We will add a dynamic assertion here)
  await expect(category)
});