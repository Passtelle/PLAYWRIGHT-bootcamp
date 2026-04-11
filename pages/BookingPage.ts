import { type Locator, type Page } from '@playwright/test';

export class BookingPage {

  // 🏗️ THE PLAN
  readonly page: Page;
  readonly checkInInput: Locator;
  readonly checkOutInput: Locator;
  readonly searchButton: Locator;
  readonly roomsHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkInInput = page.locator('.react-datepicker-wrapper input').first();
    this.checkOutInput = page.locator('.react-datepicker-wrapper input').nth(1);
    this.searchButton = page.getByRole('button', { name: /Check Availability/i });
    this.roomsHeading = page.getByRole('heading', { name: /our rooms/i });
  }

  // 🎬 THE WORK
  async goto(): Promise<void> {
    await this.page.goto('https://automationintesting.online/');
  }

  async enterSearchDates(checkIn: string, checkOut: string): Promise<void> {
    await this.checkInInput.fill(checkIn);
    await this.checkOutInput.fill(checkOut);
    await this.searchButton.click();
  }
}
