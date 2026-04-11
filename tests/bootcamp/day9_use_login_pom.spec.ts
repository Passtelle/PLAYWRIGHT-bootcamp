import { test, expect } from '@playwright/test';
import type { Locator } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Invalid login attempts show a warning for each email', async ({ page }) => {
  // 🏗️ THE PLAN (Data & Variables)
  const url: string = 'https://ecommerce-playground.lambdatest.io/index.php?route=account/login';
  const invalidEmails: string[] = ['Alice@test.com', 'bob@test.com', 'rob@test.com'];
  const password: string = 'wrongpass123';
  const warningPattern: RegExp = /Warning/i;

  // 🎬 THE WORK (Actions)
  const loginPage: LoginPage = new LoginPage(page);

  for (const email of invalidEmails) {
    await page.goto(url);
    await loginPage.login(email, password);

    // ✅ THE CHECK (Assertions)
    const errorMessage: Locator = page.locator('.alert-danger');
    await expect(errorMessage).toContainText(warningPattern);

    console.log(`Verified warning shown for: ${email}`);
  }
});
