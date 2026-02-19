import { test, expect } from '@playwright/test';

test('Search for Multiple Products', async ({ page }) => {
  // 🗒️ THE PLAN
  const baseURL: string = 'https://ecommerce-playground.lambdatest.io/';
  const products: string[] = ['iPhone', 'MacBook', 'iPad'];
  
  // 🎬 THE WORK
  for (const product of products) {
    // Step 1: Go to homepage
    await page.goto(baseURL);
    
    // Step 2: Find search input and type product name
    await page.getByPlaceholder('Search For Products').first().fill(product);
    
    // Step 3: Press Enter to search
    await page.getByPlaceholder('Search For Products').first().press('Enter');
    
    // ✅ THE CHECK
    // Verify the search results page loaded
    await expect(page).toHaveTitle(/Search/i);
    
    // Verify we see product results (at least one)
    const resultCount = await page.getByRole('heading', { level: 4 }).count();
    expect(resultCount).toBeGreaterThan(0);
    
    console.log(`✅ Found ${resultCount} results for ${product}`);
  }
});