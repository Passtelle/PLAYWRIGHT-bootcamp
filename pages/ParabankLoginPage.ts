import type { Locator, Page } from '@playwright/test';

export class ParabankLoginPage {
  // 🏗️ THE PLAN (Locators & Page Reference)
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    // Parabank table layout has no associated <label for> — name attributes are the stable hook
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', { name: /log in/i });
    this.logoutLink = page.getByRole('link', { name: /log out/i });
  }

  // 🎬 THE WORK (Actions)
  async goto(): Promise<void> {
    await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }
}
