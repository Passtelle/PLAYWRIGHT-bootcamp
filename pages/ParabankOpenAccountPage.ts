import type { Locator, Page } from '@playwright/test';

export type AccountType = 'CHECKING' | 'SAVINGS';

const ACCOUNT_TYPE_VALUES: Record<AccountType, string> = {
  CHECKING: '0',
  SAVINGS: '1',
};

export class ParabankOpenAccountPage {
  // 🏗️ THE PLAN (Locators & Page Reference)
  readonly page: Page;
  readonly accountTypeSelect: Locator;
  readonly fromAccountSelect: Locator;
  readonly openAccountButton: Locator;
  readonly newAccountLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountTypeSelect = page.locator('select#type');
    this.fromAccountSelect = page.locator('select#fromAccountId');
    this.openAccountButton = page.getByRole('button', { name: /open new account/i });
    this.newAccountLink = page.locator('#newAccountId');
  }

  // 🎬 THE WORK (Actions)
  async goto(): Promise<void> {
    await this.page.goto('https://parabank.parasoft.com/parabank/openaccount.htm');
  }

  async selectAccountType(accountType: AccountType): Promise<void> {
    await this.accountTypeSelect.selectOption(ACCOUNT_TYPE_VALUES[accountType]);
  }

  async selectFromAccount(fromAccountId: string): Promise<void> {
    await this.fromAccountSelect.selectOption(fromAccountId);
  }

  async clickOpenAccount(): Promise<void> {
    await this.openAccountButton.click();
  }

  async getNewAccountId(): Promise<string> {
    await this.newAccountLink.waitFor({ state: 'visible' });
    return this.newAccountLink.innerText();
  }

  async openAccount(accountType: AccountType, fromAccountId: string): Promise<string> {
    await this.selectAccountType(accountType);
    await this.selectFromAccount(fromAccountId);
    await this.clickOpenAccount();
    return this.getNewAccountId();
  }
}
