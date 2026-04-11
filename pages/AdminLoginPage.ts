import type { Locator, Page } from '@playwright/test';

export class AdminLoginPage {
  // 🏗️ THE PLAN (Locators & Page Reference)
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Enter username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: /Login/i });
  }

  // 🎬 THE WORK (Actions)
  async goto(): Promise<void> {
    await this.page.goto('https://automationintesting.online/admin');
  }

  async loginAdmin(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
