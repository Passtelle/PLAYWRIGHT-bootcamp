import { test, expect, type Locator } from '@playwright/test';
import { ContactPage } from '../../pages/ContactPage';

test('Submit contact form successfully', async ({ page }) => {
  // 🏗️ THE PLAN (Data & Variables)
  const name: string = 'Passtelle Ingrid';
  const email: string = 'test@example.com';
  const phone: string = '1234567890123';
  const subject: string = 'I want to book an apartment';
  const message: string = 'I would like to book an apartment as soon as possible. Thank you!';

  const contactPage: ContactPage = new ContactPage(page);

  // 🎬 THE WORK (Actions)
  await contactPage.goto();
  await contactPage.submitContactForm(name, email, phone, subject, message);

  // ✅ THE CHECK (Assertions)
  const successMessage: Locator = page.getByRole('heading', { name: /Thanks for getting in touch/i });
  await expect(successMessage).toBeVisible();
});
