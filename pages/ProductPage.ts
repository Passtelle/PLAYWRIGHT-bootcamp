import type { Locator, Page } from '@playwright/test';

export class ProductPage {
  // 🏗️ THE PLAN (Locators & Page Reference)
  readonly page: Page;
  readonly buyNowButton: Locator;
  readonly successNotification: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buyNowButton = page.getByRole('button', { name: /buy now/i });
    this.successNotification = page.locator('.alert-success');
  }

  // 🎬 THE WORK (Actions)
  async clickBuyNow(): Promise<void> {
    await this.buyNowButton.click();
  }
}
