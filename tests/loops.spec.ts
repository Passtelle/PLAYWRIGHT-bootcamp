import { test, expect } from '@playwright/test';

test('Loop through all items', async ({ page }) => {
  // 1. Login (Standard setup)
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // 2. GET THE BASKET (Find all product names)
  // We use .all() to get an Array (List) of elements
  const allProductNames = await page.locator('.inventory_item_name').all();

  console.log('📦 STARTING INVENTORY SCAN...');

  // 3. THE LOOP (Scan each item)
  for (const product of allProductNames) {
      
      // Get the text of the CURRENT item we are holding
      const text = await product.innerText();
      
      // Print it to the terminal
      console.log(`Found Product: ${text}`);
  }

  console.log('✅ SCAN COMPLETE');
});