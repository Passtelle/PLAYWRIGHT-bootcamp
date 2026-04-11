import { test, expect } from '@playwright/test';
import type { Locator } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Invalid login shows an error message', async ({ page }) => {
  // 🏗️ THE PLAN (Data & Variables)
  const url: string = 'https://ecommerce-playground.lambdatest.io/index.php?route=account/login';
  const email: string = 'invalid@test.com';
  const password: string = 'wrongpass';
  const errorPattern: RegExp = /Warning|No match/i;

  // 🎬 THE WORK (Actions)
  await page.goto(url);
  const loginPage: LoginPage = new LoginPage(page);
  await loginPage.login(email, password);

  // ✅ THE CHECK (Assertions)
  const errorMessage: Locator = page.locator('.alert-danger');
  await expect(errorMessage).toContainText(errorPattern);
});
