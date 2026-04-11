import type { Locator, Page } from '@playwright/test';

export class ProductPageSmart2 {
  // 🏗️ THE PLAN (Locators & Page Reference)
  readonly page: Page;
  readonly buyNowButton: Locator;
  readonly addToCartButton: Locator;
  readonly outOfStockButton: Locator;
  readonly successNotification: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buyNowButton = page.getByRole('button', { name: /buy now/i });
    this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
    this.outOfStockButton = page.getByRole('button', { name: /out of stock/i }).first();
    this.successNotification = page.locator('.alert-success');
  }

  // 🎬 THE WORK (Actions)
  async clickBuyNow(): Promise<void> {
    await this.buyNowButton.click();
  }

  async clickAddToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async isOutOfStock(): Promise<boolean> {
    return this.outOfStockButton.isVisible();
  }
}
