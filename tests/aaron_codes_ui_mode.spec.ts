import { test, expect, Page } from '@playwright/test';

class LoginPage {
  constructor(private page: Page) {}

  async load() {
    await test.step('Load login page', async () => {
      await this.page.goto('https://www.saucedemo.com/');
    });
  }

  async login(username: string, password: string) {
    await test.step('Fill sign in form and click sign in button', async () => {
      await this.page.fill('#user-name', username);
      await this.page.fill('#password', password);
      await this.page.click('#login-button');
    });
  }
}

class InventoryPage {
  constructor(private page: Page) {}

  async addProductToCart() {
    await test.step('Add product to cart', async () => {
      await this.page.click('#add-to-cart-sauce-labs-backpack');
    });
  }
}

class CartPage {
  constructor(private page: Page) {}

  async goToCheckout() {
    await test.step('Go to checkout', async () => {
      await this.page.click('#shopping_cart_container');
      await this.page.click('#checkout');
    });
  }
}

class CheckoutPage {
  constructor(private page: Page) {}

  async fillShippingInfo(firstName: string, lastName: string, postalCode: string) {
    await test.step('Fill shipping info and complete checkout', async () => {
      await this.page.fill('#first-name', firstName);
      await this.page.fill('#last-name', lastName);
      await this.page.fill('#postal-code', postalCode);
      await this.page.click('#continue');
      await this.page.click('#finish');
    });
  }
}

class ConfirmationPage {
  constructor(private page: Page) {}

  async getThankYouMessage() {
    await test.step('Validate confirmation page', async () => {
      const message = await this.page.textContent('.complete-header');
      expect(message).toContain('Thank you for your order!');
      console.log('✅ Confirmation validated');
    });
  }
}

test.describe('Swag Labs E2E Test', () => {
  test('Login, add to cart, checkout, and validate confirmation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const confirmationPage = new ConfirmationPage(page);

    await loginPage.load();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addProductToCart();

    await cartPage.goToCheckout();

    await checkoutPage.fillShippingInfo('Aaron', 'Codes', '12345');

    await confirmationPage.getThankYouMessage();
  });
});