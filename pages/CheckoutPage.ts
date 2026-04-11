import { Locator, Page } from '@playwright/test';

export class CheckoutPage {

  // 🏗️ THE PLAN
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly reserveNowButton: Locator;

  constructor(page: Page) {
    this.firstNameInput  = page.getByPlaceholder('Firstname');
    this.lastNameInput   = page.getByPlaceholder('Lastname');
    this.emailInput      = page.getByPlaceholder('Email');
    this.phoneInput      = page.getByPlaceholder('Phone');
    this.reserveNowButton = page.getByRole('button', { name: /Reserve Now/i });
  }

  // 🎬 THE WORK
  async submitReservation(
    firstName: string,
    lastName: string,
    email: string,
    phone: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.reserveNowButton.click();
  }
}
