import { test, expect } from '@playwright/test';
import { SecureBankLoginPage } from '../../pages/SecureBankLoginPage';
import { SecureBankDashboardPage } from '../../pages/SecureBankDashboardPage';
import { SecureBankTransactionPage } from '../../pages/SecureBankTransactionPage';

test.describe('SecureBank E2E - Deposit Flow', () => {

  test('Test 1 - Happy Path: Deposit increases total balance', async ({ page }) => {
    // 🏗️ THE PLAN (Data & Variables)
    const username: string = 'admin';
    const password: string = 'admin123';
    const transactionType: string = 'deposit';
    const fromAccount: string = 'Primary Savings';
    const depositAmount: string = '500';

    const loginPage = new SecureBankLoginPage(page);
    const dashboardPage = new SecureBankDashboardPage(page);
    const transactionPage = new SecureBankTransactionPage(page);

    // 🎬 THE WORK (Actions)
    await loginPage.goto();
    await loginPage.login(username, password);
    await transactionPage.openNewTransactionModal();
    await transactionPage.createTransaction(transactionType, fromAccount, depositAmount);
    await dashboardPage.navigateToDashboard();

    // ✅ THE CHECK (Assertions)
    await expect(page).toHaveURL(/\/bank\/dashboard/i);
    await expect(dashboardPage.accountsCount).toContainText(/2/);
    await expect(dashboardPage.totalBalance).toContainText(/8,000/);
  });

});
