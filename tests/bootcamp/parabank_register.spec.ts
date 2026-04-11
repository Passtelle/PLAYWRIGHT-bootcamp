import { test, expect } from '@playwright/test';
import { ParabankRegisterPage } from '../../pages/ParabankRegisterPage';
import { generateUserData, generateUniqueUsername, UserData } from '../../helpers/testData';

test.describe('Parabank Registration', () => {

  let registerPage: ParabankRegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new ParabankRegisterPage(page);
    await registerPage.goto();
  });

  test('Test 1 - Happy Path: Successful Registration', async ({ page }) => {
    // 🏗️ THE PLAN (Data & Variables)
    const user: UserData = generateUserData();
    const username: string = generateUniqueUsername();
    const password: string = 'Test@1234';

    // 🎬 THE WORK (Actions)
    await registerPage.register(
      user.firstName,
      user.lastName,
      user.address,
      user.city,
      user.state,
      user.zipCode,
      user.phone,
      user.ssn,
      username,
      password,
      password
    );

    // ✅ THE CHECK (Assertions)
    // "Log Out" link only appears when a session is active — proves user was created AND auto-logged in
    await expect(page.getByRole('link', { name: /log out/i })).toBeVisible();
  });

  test('Test 2 - Negative Path: Password Mismatch', async ({ page }) => {
    // 🏗️ THE PLAN (Data & Variables)
    const user: UserData = generateUserData();
    const username: string = generateUniqueUsername();
    const password: string = 'Test@1234';
    const wrongConfirm: string = 'Wrong@9999';

    // 🎬 THE WORK (Actions)
    await registerPage.register(
      user.firstName,
      user.lastName,
      user.address,
      user.city,
      user.state,
      user.zipCode,
      user.phone,
      user.ssn,
      username,
      password,
      wrongConfirm
    );

    // ✅ THE CHECK (Assertions)
    await expect(page.getByText(/passwords did not match/i)).toBeVisible();
  });

  test('Test 3 - Edge Case: Duplicate Username', async ({ page }) => {
    // 🏗️ THE PLAN (Data & Variables)
    const firstUser: UserData = generateUserData();
    const duplicateUsername: string = generateUniqueUsername();
    const password: string = 'Test@1234';

    // 🎬 THE WORK (Actions)
    // Step 1: Register successfully to claim the username
    await registerPage.register(
      firstUser.firstName,
      firstUser.lastName,
      firstUser.address,
      firstUser.city,
      firstUser.state,
      firstUser.zipCode,
      firstUser.phone,
      firstUser.ssn,
      duplicateUsername,
      password,
      password
    );

    // Step 2: Return to register page and attempt to claim the same username again
    const secondUser: UserData = generateUserData();
    await registerPage.goto();
    await registerPage.register(
      secondUser.firstName,
      secondUser.lastName,
      secondUser.address,
      secondUser.city,
      secondUser.state,
      secondUser.zipCode,
      secondUser.phone,
      secondUser.ssn,
      duplicateUsername,
      password,
      password
    );

    // ✅ THE CHECK (Assertions)
    await expect(page.getByText(/this username already exists/i)).toBeVisible();
  });

});
