import { test, expect, Page } from '@playwright/test';

class SaucedemoApp {
  readonly page: Page;
  
  // Locators
  readonly usernameInput;
  readonly passwordInput;
  readonly loginButton;
  readonly inventoryContainer;
  readonly productAddButton;   // generic “Add to Cart” for a first product
  readonly cartIcon;
  readonly checkoutButton;
  readonly firstNameInput;
  readonly lastNameInput;
  readonly postalCodeInput;
  readonly continueButton;
  readonly finishButton;
  readonly confirmationMessage;
  readonly menuButton;
  readonly logoutLink;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.inventoryContainer = page.locator('.inventory_list');
    this.productAddButton = page.locator('.inventory_item button');  // picks first “Add to cart”
    this.cartIcon = page.locator('.shopping_cart_link');
    this.checkoutButton = page.locator('#checkout');
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.confirmationMessage = page.locator('.complete-header');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async gotoLogin() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyOnInventoryPage() {
    await expect(this.inventoryContainer).toBeVisible({ timeout: 5000 });
  }

  async addFirstProductToCart() {
    await this.productAddButton.first().click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async checkout(firstName: string, lastName: string, postal: string) {
    await this.checkoutButton.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postal);
    await this.continueButton.click();
    await this.finishButton.click();
  }

  async verifyCheckoutSuccess() {
    await expect(this.confirmationMessage).toHaveText('Thank you for your order!');
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async verifyOnLoginPage() {
    await expect(this.loginButton).toBeVisible();
  }
}

// === Test ===
test('SauceDemo full e2e flow', async ({ page }) => {
  const app = new SaucedemoApp(page);

  await app.gotoLogin();
  await app.login('standard_user', 'secret_sauce');
  await app.verifyOnInventoryPage();
  await app.addFirstProductToCart();
  await app.goToCart();
  await app.checkout('Alice', 'Test', '12345');
  await app.verifyCheckoutSuccess();
  await app.logout();
  await app.verifyOnLoginPage();
});