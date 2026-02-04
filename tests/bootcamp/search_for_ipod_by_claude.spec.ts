import { test, expect } from '@playwright/test';

// The "async" tells the computer this test will take time (internet speed)
test('search for HTC and verify', async ({ page }) => {

  // -------------------------------------------------------
  // 1. THE PLAN (Top Bricks: Data)
  // -------------------------------------------------------
  // We define our data here so we can change it easily later.
  const targetProduct = 'HTC';
  const expectedTitle = /Search - HTC/i; // /i means "Insensitive" (Case doesn't matter)
  const expectedHeading = 'Search - HTC';

  // -------------------------------------------------------
  // 2. THE WORK (Middle Bricks: Actions)
  // -------------------------------------------------------
  // Go to the website
  await page.goto('https://ecommerce-playground.lambdatest.io/');

  // Find the search box (Using .first() to avoid Strict Mode errors)
  const searchInput = page.getByPlaceholder('Search For Products').first();
  
  // Type the product from our "Plan"
  await searchInput.fill(targetProduct);
  
  // Press Enter (Better than clicking a button)
  await searchInput.press('Enter');

  // -------------------------------------------------------
  // 3. THE CHECK (Final Bricks: Assertions)
  // -------------------------------------------------------
  // Check the Browser Tab Title
  await expect(page).toHaveTitle(expectedTitle);

  // Check the Main Page Heading (H1)
  const mainHeading = page.getByRole('heading', { level: 1 });
  await expect(mainHeading).toContainText(expectedHeading);
});