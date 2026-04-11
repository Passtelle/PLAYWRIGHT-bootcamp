import { test, expect } from '@playwright/test';
import { BookingPage } from '../../pages/BookingPage';

test('Step 1: Search for availability and verify Our Rooms heading is visible', async ({ page }) => {

  // 🏗️ THE PLAN
  const checkIn: string = '25/03/2026';
  const checkOut: string = '30/03/2026';
  const bookingPage = new BookingPage(page);

  // 🎬 THE WORK
  await bookingPage.goto();
  await bookingPage.enterSearchDates(checkIn, checkOut);

  // ✅ THE CHECK
  await expect(bookingPage.roomsHeading).toBeVisible();
});
