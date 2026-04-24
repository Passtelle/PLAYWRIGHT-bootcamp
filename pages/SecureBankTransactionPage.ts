import type { Locator, Page } from "@playwright/test";

export class SecureBankTransactionPage {

  // 🏗️ THE PLAN (Locators & Page Reference)
  readonly page: Page;
  readonly newTransactionButton: Locator;
  readonly transactionTypeSelect: Locator;
  readonly fromAccountSelect: Locator;
  readonly amountInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTransactionButton = page.getByTestId("quick-new-transaction");    // 🥇 Gold
    this.transactionTypeSelect = page.getByTestId("transaction-type-select"); // 🥇 Gold
    this.fromAccountSelect = page.getByTestId("from-account-select");         // 🥇 Gold
    this.amountInput = page.getByTestId("transaction-amount-input");          // 🥇 Gold
    this.submitButton = page.getByTestId("submit-transaction-button");        // 🥇 Gold
  }

  // 🎬 THE WORK (Actions)
  async openNewTransactionModal(): Promise<void> {
    await this.newTransactionButton.click();
  }

  async createTransaction(
    transactionType: string,
    fromAccount: string,
    amount: string
  ): Promise<void> {
    // Radix UI combobox — click trigger, then click the option by visible text
    await this.transactionTypeSelect.click();
    await this.page.getByRole('option', { name: new RegExp(transactionType, 'i') }).click();
    await this.fromAccountSelect.click();
    await this.page.getByRole('option', { name: new RegExp(fromAccount, 'i') }).click();
    await this.amountInput.fill(amount);
    await this.submitButton.click();
  }

}
