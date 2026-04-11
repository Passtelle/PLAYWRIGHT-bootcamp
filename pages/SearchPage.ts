import type { Locator, Page } from '@playwright/test';

export class SearchPage {
  // 🏗️ THE PLAN (Locators & Page Reference)
  readonly page: Page;
  readonly searchInput: Locator;
  readonly productHeadings: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search For Products').first();
    this.productHeadings = page.getByRole('heading', { level: 4 });
  }

  // 🎬 THE WORK (Actions)
  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }
}
