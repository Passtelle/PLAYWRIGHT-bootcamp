import { test, expect } from '@playwright/test';
import { BookingPage } from '../../pages/BookingPage';
import { RoomSelectionPage } from '../../pages/RoomSelectionPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test('Day 16: Full end-to-end booking flow confirms reservation', async ({ page }) => {

  // 🏗️ THE PLAN
  const checkIn: string = '28/03/2026';
  const checkOut: string = '31/03/2026';
  const firstName: string = 'Passtelle';
  const lastName: string = 'Ingrid';
  const email: string = 'passtelle@fake.test';
  const phone: string = '0016785700268';

  const bookingPage = new BookingPage(page);
  const roomSelectionPage = new RoomSelectionPage(page);
  const checkoutPage = new CheckoutPage(page);

  const successMessage = page.getByRole('heading', { name: /Booking Confirmed/i });

  // 🎬 THE WORK
  await bookingPage.goto();
  await bookingPage.enterSearchDates(checkIn, checkOut);
  await roomSelectionPage.clickFirstAvailableRoom();
  await checkoutPage.submitReservation(firstName, lastName, email, phone);

  // ✅ THE CHECK
  await expect(successMessage).toBeVisible();
});
