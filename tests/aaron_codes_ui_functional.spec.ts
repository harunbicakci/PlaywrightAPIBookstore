import { test, expect, Page } from '@playwright/test';

class LoginPage {
  readonly page: Page;
  readonly usernameInput;
  readonly passwordInput;
  readonly loginButton;
  readonly message;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.message = page.locator('#flash'); // contains success or error text
  }

  async goto() {
    await this.page.goto('https://practice.expandtesting.com/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getFlashMessageText() {
    return (await this.message.textContent())?.trim();
  }
}

// === Tests ===
test.describe('Login tests on ExpandTesting practice site', () => {
  test('successful login shows success message', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('practice', 'SuperSecretPassword!');

    const msg = await login.getFlashMessageText();
    expect(msg).toContain('You logged into a secure area');
  });

  test('invalid credentials show error message', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('wronguser', 'wrongpass');

    const msg = await login.getFlashMessageText();
    expect(msg).toContain('Your username is invalid');
  });
});