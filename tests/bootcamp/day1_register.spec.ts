import { test, expect } from '@playwright/test';

test('Learning Locators', async ({ page }) => {
//1. Go to the page
await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register');

// 2. Find the First Name box by its placeholder and type your name
await page.getByPlaceholder('First Name').fill('Passtelle');

// 3. Check if the text actually got typed
await expect(page.getByPlaceholder('First Name')).toHaveValue('Passtelle');

//Locate the "Continue" button using its Role (button) and its Name (Continue).
await page.getByRole('button', { name: 'Continue'}).click();

// 5. Verify we are still on the Register page (because of validation errors)
await expect(page).toHaveTitle(/Register Account/);

// 6. Verify that at least one error message is visible because we left fields empty
// We search for the text 'warning' because these messages usually have a warning class
await expect(page.locator('.alert-danger')).toBeVisible();

// ... continue after filling First Name
    await page.getByPlaceholder('Last Name').fill('Senior-QA');
  // ... continue after First Name
    await page.getByPlaceholder('Last Name').fill('QA-Expert');
    
    // Using Date.now() for a unique email
    const myEmail = `atlanta_test_${Date.now()}@gmail.com`;
    await page.getByPlaceholder('E-Mail').fill(myEmail);

    await page.getByPlaceholder('Telephone').fill('4045550111');
    
    // Using exact: true to distinguish from 'Password Confirm'
    await page.getByPlaceholder('Password', { exact: true }).fill('Test12345!');
    await page.getByPlaceholder('Password Confirm').fill('Test12345!');

    // The Bulletproof way to click the Privacy Policy checkbox
    await page.locator('input[name="agree"]').check(); 

    await page.getByRole('button', { name: 'Continue' }).click();

    // Final Assertion: Did we reach the "Account Created" page?
    await expect(page).toHaveTitle(/Your Account Has Been Created!/);
});
