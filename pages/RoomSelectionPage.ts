import { type Locator, type Page } from '@playwright/test';

export class RoomSelectionPage {

  // 🏗️ THE PLAN
  readonly page: Page;
  readonly bookNowButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bookNowButton = page.getByRole('link', { name: /Book now/i }).nth(1);
  }

  // 🎬 THE WORK
  async clickFirstAvailableRoom(): Promise<void> {
    await this.bookNowButton.click();
  }
}
