import type { Locator, Page } from '@playwright/test';

export class ParabankRegisterPage {
  // 🏗️ THE PLAN (Locators & Page Reference)
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly phoneInput: Locator;
  readonly ssnInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Spring MVC object binding — field names use full dotted path e.g. customer.firstName
    this.firstNameInput = page.locator('input[name="customer.firstName"]');
    this.lastNameInput = page.locator('input[name="customer.lastName"]');
    this.addressInput = page.locator('input[name="customer.address.street"]');
    this.cityInput = page.locator('input[name="customer.address.city"]');
    this.stateInput = page.locator('input[name="customer.address.state"]');
    this.zipCodeInput = page.locator('input[name="customer.address.zipCode"]');
    this.phoneInput = page.locator('input[name="customer.phoneNumber"]');
    this.ssnInput = page.locator('input[name="customer.ssn"]');
    this.usernameInput = page.locator('input[name="customer.username"]');
    this.passwordInput = page.locator('input[name="customer.password"]');
    this.confirmPasswordInput = page.locator('input[name="repeatedPassword"]');
    this.registerButton = page.getByRole('button', { name: /register/i });
  }

  // 🎬 THE WORK (Actions)
  async goto(): Promise<void> {
    await this.page.goto('https://parabank.parasoft.com/parabank/register.htm');
  }

  async register(
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
    phone: string,
    ssn: string,
    username: string,
    password: string,
    confirmPassword: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.addressInput.fill(address);
    await this.cityInput.fill(city);
    await this.stateInput.fill(state);
    await this.zipCodeInput.fill(zipCode);
    await this.phoneInput.fill(phone);
    await this.ssnInput.fill(ssn);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.registerButton.click();
  }
}
