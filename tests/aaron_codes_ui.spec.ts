import { test, expect } from '@playwright/test';

class Constants {

  static BASE_URL = 'https://www.saucedemo.com/';

  static USERNAME_INPUT = '#user-name';
  static PASSWORD_INPUT = '#password';
  static LOGIN_BUTTON = '#login-button';
  static INVENTORY_CONTAINER = '.inventory_list';
  static PAGE_LOGO = '.app_logo';
}

test('Login and validate inventory page by logo', async ({ page }) => {

  await page.goto(Constants.BASE_URL);

  await page.fill(Constants.USERNAME_INPUT, 'standard_user');
  await page.fill(Constants.PASSWORD_INPUT, 'secret_sauce');

  await page.click(Constants.LOGIN_BUTTON); 

  await expect(page.locator(Constants.INVENTORY_CONTAINER)).toBeVisible();

  await expect(page.locator(Constants.PAGE_LOGO)).toHaveText('Swag Labs');

  console.log('✅ Login successful and inventory page validated by logo');
});