import { test, expect, type Locator } from '@playwright/test';
import { AdminLoginPage } from '../../pages/AdminLoginPage';

test('Admin can log in successfully', async ({ page }) => {
  // 🏗️ THE PLAN (Data & Variables)
  const username: string = 'admin';
  const password: string = 'password';

  const adminLoginPage: AdminLoginPage = new AdminLoginPage(page);

  // 🎬 THE WORK (Actions)
  await adminLoginPage.goto();
  await adminLoginPage.loginAdmin(username, password);

  // ✅ THE CHECK (Assertions)
  const logoutButton: Locator = page.getByRole('button', { name: /Logout/i });
  await expect(logoutButton).toBeVisible();
});
