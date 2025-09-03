import { test, expect, Page } from '@playwright/test';

export class E2ETest {
  // ---------- Constants / Locators ----------
  static BASE_URL = 'https://www.saucedemo.com/';

  // Login page
  static USERNAME_INPUT = '#user-name';
  static PASSWORD_INPUT = '#password';
  static LOGIN_BUTTON = '#login-button';

  // Inventory page
  static INVENTORY_CONTAINER = '.inventory_list';
  static FIRST_PRODUCT_ADD_BUTTON = '.inventory_item:first-child button';
  static INVENTORY_LOGO = '.app_logo';
  static CART_ICON = '.shopping_cart_link';

  // Cart page
  static CART_ITEM = '.cart_item';
  static CHECKOUT_BUTTON = '#checkout';

  // Checkout page
  static FIRST_NAME = '#first-name';
  static LAST_NAME = '#last-name';
  static ZIP_CODE = '#postal-code';
  static CONTINUE_BUTTON = '#continue';
  static FINISH_BUTTON = '#finish';

  // Confirmation page
  static CONFIRMATION_TEXT = '.complete-header';

  // ---------- Test Data ----------
  static TEST_DATA = {
    username: 'standard_user',
    password: 'secret_sauce',
    firstName: 'Aaron',
    lastName: 'Codes',
    zipCode: '12345',
  };

  // ---------- Methods ----------
  static async login(page: Page) {
    await page.goto(E2ETest.BASE_URL);
    await page.fill(E2ETest.USERNAME_INPUT, E2ETest.TEST_DATA.username);
    await page.fill(E2ETest.PASSWORD_INPUT, E2ETest.TEST_DATA.password);
    await page.click(E2ETest.LOGIN_BUTTON);
  }

  static async validateTitle(page: Page, expectedTitle: string) {
    await expect(page).toHaveTitle(expectedTitle);
  }

  static async addFirstProductToCart(page: Page) {
    await page.click(E2ETest.FIRST_PRODUCT_ADD_BUTTON);
  }

  static async navigateToCart(page: Page) {
    await page.click(E2ETest.CART_ICON);
  }

  static async navigateToInventory(page: Page) {
    await page.click(E2ETest.INVENTORY_LOGO);
  }

  static async checkout(page: Page) {
    await page.click(E2ETest.CHECKOUT_BUTTON);
    await page.fill(E2ETest.FIRST_NAME, E2ETest.TEST_DATA.firstName);
    await page.fill(E2ETest.LAST_NAME, E2ETest.TEST_DATA.lastName);
    await page.fill(E2ETest.ZIP_CODE, E2ETest.TEST_DATA.zipCode);
    await page.click(E2ETest.CONTINUE_BUTTON);
    await page.click(E2ETest.FINISH_BUTTON);
  }

  static async validateConfirmation(page: Page) {
    await expect(page.locator(E2ETest.CONFIRMATION_TEXT)).toHaveText('Thank you for your order!');
  }
}

// ---------- Execute the test ----------
test('E2E: Modular Methods Example', async ({ page }) => {
  await E2ETest.login(page);
  await E2ETest.validateTitle(page, 'Swag Labs');

  await E2ETest.addFirstProductToCart(page);

  await E2ETest.navigateToCart(page);
  await E2ETest.validateTitle(page, 'Swag Labs');

  await E2ETest.navigateToInventory(page);
  await E2ETest.validateTitle(page, 'Swag Labs');

  await E2ETest.checkout(page);
  await E2ETest.validateConfirmation(page);
});