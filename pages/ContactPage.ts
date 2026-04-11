import type { Locator, Page } from '@playwright/test';

export class ContactPage {
  // 🏗️ THE PLAN (Locators & Page Reference)
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByTestId('ContactName');
    this.emailInput = page.getByTestId('ContactEmail');
    this.phoneInput = page.getByTestId('ContactPhone');
    this.subjectInput = page.getByTestId('ContactSubject');
    this.messageInput = page.getByTestId('ContactDescription');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }

  // 🎬 THE WORK (Actions)
  async goto(): Promise<void> {
    await this.page.goto('https://automationintesting.online/');
  }

  async submitContactForm(
    name: string,
    email: string,
    phone: string,
    subject: string,
    message: string
  ): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
    await this.submitButton.click();
  }
}
