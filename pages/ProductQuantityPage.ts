import type { Locator, Page } from '@playwright/test';

export class ProductQuantityPage {
  // 🏗️ THE PLAN (Locators & Page Reference)
  readonly page: Page;
  readonly quantityIncreaseButton: Locator;
  readonly quantityDecreaseButton: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.quantityIncreaseButton = page.getByRole('button', { name: /\+/ });
    this.quantityDecreaseButton = page.getByRole('button', { name: /-/ });
    this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
  }

  // 🎬 THE WORK (Actions)
  async increaseQuantity(): Promise<void> {
    await this.quantityIncreaseButton.click();
  }

  async decreaseQuantity(): Promise<void> {
    await this.quantityDecreaseButton.click();
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
