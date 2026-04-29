import { test, expect } from '@playwright/test';
import { SecureBankLoginPage } from '../../pages/SecureBankLoginPage';
import { SecureBankDashboardPage } from '../../pages/SecureBankDashboardPage';
import { SecureBankTransactionPage } from '../../pages/SecureBankTransactionPage';

test.describe('SecureBank E2E - Deposit Flow', () => {

  // 🏗️ THE PLAN (Shared Variables)
  let loginPage: SecureBankLoginPage;
  let dashboardPage: SecureBankDashboardPage;
  let transactionPage: SecureBankTransactionPage;

  const username: string = 'admin';
  const password: string = 'admin123';
  const transactionType: string = 'deposit';
  const fromAccount: string = 'Primary Savings';

  test.beforeEach(async ({ page }) => {
    loginPage = new SecureBankLoginPage(page);
    dashboardPage = new SecureBankDashboardPage(page);
    transactionPage = new SecureBankTransactionPage(page);
    await loginPage.goto();
    await loginPage.login(username, password);
  });

  test('Test 1 - Happy Path: Deposit increases total balance', async ({ page }) => {
    // 🏗️ THE PLAN (Test-specific data)
    const depositAmount: string = '500';

    // 🎬 THE WORK (Actions)
    await transactionPage.openNewTransactionModal();
    await transactionPage.createTransaction(transactionType, fromAccount, depositAmount);
    await dashboardPage.navigateToDashboard();

    // ✅ THE CHECK (Assertions)
    await expect(page).toHaveURL(/\/bank\/dashboard/i);
    await expect(dashboardPage.accountsCount).toContainText(/2/i);
    await expect(dashboardPage.totalBalance).toContainText(/8,000/i);
  });

  test('Test 2 - Negative Path: Submit deposit with empty amount', async ({ page }) => {
    // 🏗️ THE PLAN (Test-specific data)
    const emptyAmount: string = '';

    // 🎬 THE WORK (Actions)
    await transactionPage.openNewTransactionModal();
    await transactionPage.createTransaction(transactionType, fromAccount, emptyAmount);

    // ✅ THE CHECK (Assertions)
    await expect(page.getByText(/please enter a valid amount/i)).toBeVisible();
  });

});
