import { test, expect } from '@playwright/test';
import { BookingPage } from '../../pages/BookingPage';
import { RoomSelectionPage } from '../../pages/RoomSelectionPage';

test('Step 2: Select first available room and verify booking details page', async ({ page }) => {

  // 🏗️ THE PLAN
  const checkIn: string = '25/03/2026';
  const checkOut: string = '30/03/2026';
  const bookingPage = new BookingPage(page);
  const roomSelectionPage = new RoomSelectionPage(page);
  const reserveNowButton = page.getByRole('button', { name: /Reserve Now/i });

  // 🎬 THE WORK
  await bookingPage.goto();
  await bookingPage.enterSearchDates(checkIn, checkOut);
  await roomSelectionPage.clickFirstAvailableRoom();

  // ✅ THE CHECK
  await expect(reserveNowButton).toBeVisible();
});
