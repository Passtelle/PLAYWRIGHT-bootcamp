import { test, expect } from '@playwright/test';

test('Senior Login Validation', async ({ page }) => {
    // 1. Go to the login page
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');

    // 2. Fill in the email (Use the Placeholder or Label)
    await page.getByPlaceholder('E-Mail Address').fill('p_test@example.com');

    // 3. Fill in the password
    await page.getByPlaceholder('Password').fill('Test12345');

    // 4. Click the Login button (Using its Role)
    await page.getByRole('button', {name: 'Login'}).click();

    // 5. Verify we landed on the Account page
    await expect(page).toHaveTitle("Account Login");
});
