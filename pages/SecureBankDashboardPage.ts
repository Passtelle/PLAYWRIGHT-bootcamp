import type { Locator, Page } from "@playwright/test";

export class SecureBankDashboardPage {

  // 🏗️ THE PLAN (Locators & Page Reference)
  readonly page: Page;
  readonly totalBalance: Locator;
  readonly accountsCount: Locator;
  readonly transactionsCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.totalBalance = page.getByTestId("total-balance");           // 🥇 Gold
    this.accountsCount = page.getByTestId("accounts-count");         // 🥇 Gold
    this.transactionsCount = page.getByTestId("transactions-count"); // 🥇 Gold
  }

  // 🎬 THE WORK (Actions)
  async getTotalBalance(): Promise<string> {
    return (await this.totalBalance.textContent()) ?? '';
  }

  async getAccountsCount(): Promise<string> {
    return (await this.accountsCount.textContent()) ?? '';
  }

  async getTransactionsCount(): Promise<string> {
    return (await this.transactionsCount.textContent()) ?? '';
  }

}
