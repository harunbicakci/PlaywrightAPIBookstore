import { test, expect } from '@playwright/test';

// Constants for paths and locators
const PATHS = {
  form: '/automation-practice-form',
};

const LOCATORS = {
  firstNameInput: '#firstName',
  lastNameInput: '#lastName',
  emailInput: '#userEmail', // Added email as a required field
  submitButton: '#submit',
  confirmationModal: '.modal-content',
  modalTitle: '.modal-title',
};

// Test data
const TEST_DATA = {
  firstName: 'Aaron',
  lastName: 'Tester',
  email: 'aaron.tester@example.com',
};

test.describe('UI Parallel Testing Across Browsers', () => {
  test('Fill and submit form, then validate modal', async ({ page, browserName }) => {
    console.log(`Running on ${browserName}`);
    await page.goto(PATHS.form, { waitUntil: 'networkidle', timeout: 30000 });
    console.log('✅ Navigated to form page');

    // Wait for and fill form fields
    await page.locator(LOCATORS.firstNameInput).waitFor({ state: 'visible', timeout: 10000 });
    await page.fill(LOCATORS.firstNameInput, TEST_DATA.firstName);
    await page.fill(LOCATORS.lastNameInput, TEST_DATA.lastName);
    await page.fill(LOCATORS.emailInput, TEST_DATA.email); // Ensure email is filled
    console.log('✅ Form fields filled');

    // Scroll to and click submit button
    await page.locator(LOCATORS.submitButton).scrollIntoViewIfNeeded();
    await page.click(LOCATORS.submitButton);
    console.log('✅ Form submitted');

    // Wait for modal and validate
    await page.waitForSelector(LOCATORS.confirmationModal, { state: 'visible', timeout: 15000 });
    await expect(page.locator(LOCATORS.confirmationModal)).toBeVisible();
    await expect(page.locator(LOCATORS.modalTitle)).toHaveText('Thanks for submitting the form');
    console.log('✅ Confirmation modal validated');
  }, { retries: 1, timeout: 60000 }); // Increased timeout for stability
});