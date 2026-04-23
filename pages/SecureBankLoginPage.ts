import type { Locator, Page } from "@playwright/test";

export class SecureBankLoginPage {
  // 🏗️ THE PLAN (Locators & Page Reference)
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId("username-input"); // 🥇 Gold
    this.passwordInput = page.getByTestId("password-input"); // 🥇 Gold
    this.loginButton = page.getByTestId("login-button"); // 🥇 Gold
  }

  // 🎬 THE WORK (Actions)
  async goto(): Promise<void> {
    await this.page.goto("https://www.qaplayground.com/bank");
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
