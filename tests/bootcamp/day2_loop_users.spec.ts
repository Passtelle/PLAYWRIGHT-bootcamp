import { test, expect } from '@playwright/test';

test('Register Multiple Users with Loop', async ({ page }) => {
  // 🗒️ THE PLAN
  const baseURL: string = 'https://ecommerce-playground.lambdatest.io/index.php?route=account/register';
  const users: string[] = ['Alice', 'Bob', 'Charlie'];
  
  // 🎬 THE WORK
  for (const userName of users) {
    // Step 1: Go to registration page
    await page.goto(baseURL);
    
    // Step 2: Fill first name
    await page.getByPlaceholder('First Name').fill(userName);
    
    // Step 3: Fill last name
    await page.getByPlaceholder('Last Name').fill('Test');
    
    // Step 4: Create unique email for each user
    const userEmail: string = `${userName.toLowerCase()}_${Date.now()}@test.com`;
    await page.getByPlaceholder('E-Mail').fill(userEmail);
    
    // Step 5: Fill telephone
    await page.getByPlaceholder('Telephone').fill('1234567890');
    
    // Step 6: Fill password
    await page.getByPlaceholder('Password', { exact: true }).fill('Test12345!');
    
    // Step 7: Fill password confirm
    await page.getByPlaceholder('Password Confirm').fill('Test12345!');
    
    // Step 8: Agree to privacy policy
    await page.locator('input[name="agree"]').check();
    
    // Step 9: Click continue
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // ✅ THE CHECK
    await expect(page).toHaveTitle(/Your Account Has Been Created!/);
    
    console.log(`✅ Successfully registered: ${userName}`);
  }
});