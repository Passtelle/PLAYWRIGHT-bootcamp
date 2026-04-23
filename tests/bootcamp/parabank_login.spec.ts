import { test, expect } from '@playwright/test';
import { ParabankLoginPage } from '../../pages/ParabankLoginPage';

test.describe('Parabank Login', () => {

  let loginPage: ParabankLoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new ParabankLoginPage(page);
    await loginPage.goto();
  });

  test('Test 1 - Happy Path: Valid credentials log in successfully', async ({ page }) => {
    // 🏗️ THE PLAN (Data & Variables)
    const username: string = process.env.PARABANK_USERNAME as string;
    const password: string = process.env.PARABANK_PASSWORD as string;

    // 🎬 THE WORK (Actions)
    await loginPage.login(username, password);

    // ✅ THE CHECK (Assertions)
    // "Log Out" link only appears when a session is active
    await expect(page.getByRole('link', { name: /log out/i })).toBeVisible();
  });

  test('Test 2 - Negative Path: Invalid credentials show error', async ({ page }) => {
    // 🏗️ THE PLAN (Data & Variables)
    const username: string = process.env.PARABANK_USERNAME as string;
    const wrongPassword: string = 'wrongpassword999';

    // 🎬 THE WORK (Actions)
    await loginPage.login(username, wrongPassword);

    // ✅ THE CHECK (Assertions)
    await expect(page.getByText(/error/i).first()).toBeVisible();
  });

});
