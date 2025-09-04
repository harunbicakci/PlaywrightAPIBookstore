import { test, expect } from '@playwright/test';

const PATHS = { form: '/automation-practice-form' };
const LOCATORS = {
  firstNameInput: '#firstName',
  lastNameInput: '#lastName',
  emailInput: '#userEmail',
  genderRadioLabel: 'label[for="gender-radio-1"]',
  phoneInput: '#userNumber',
  dateOfBirthInput: '#dateOfBirthInput',
  datePickerMonth: '.react-datepicker__month-select',
  datePickerYear: '.react-datepicker__year-select',
  datePickerDay: '.react-datepicker__day--015:not(.react-datepicker__day--outside-month)',
  submitButton: '#submit',
  confirmationModal: '.modal-content',
  modalTitle: '.modal-title',
  modalStudentName: '//td[text()="Student Name"]/following-sibling::td',
  modalStudentEmail: '//td[text()="Student Email"]/following-sibling::td',
  modalGender: '//td[text()="Gender"]/following-sibling::td',
  modalMobile: '//td[text()="Mobile"]/following-sibling::td',
  modalDateOfBirth: '//td[text()="Date of Birth"]/following-sibling::td',
};

const TEST_DATA = {
  firstName: 'Aaron',
  lastName: 'Codes',
  email: `aaron.codes${Date.now()}@example.com`,
  gender: 'Male',
  phone: '1234567890',
  dateOfBirth: { day: '15', month: 'May', year: '1999' },
};

test.describe('Student Registration Form Automation', () => {
    test('Fill and submit form, then validate confirmation', async ({ page, browserName }) => {

    console.log(`Running on ${browserName}`);
    await page.goto(PATHS.form, { waitUntil: 'domcontentloaded' });
    console.log('✅ Navigated to form page');

    await page.locator(LOCATORS.firstNameInput).waitFor();
    console.log('✅ First name input is ready');

    
    await page.fill(LOCATORS.firstNameInput, TEST_DATA.firstName);
    await page.fill(LOCATORS.lastNameInput, TEST_DATA.lastName);
    await page.fill(LOCATORS.emailInput, TEST_DATA.email);
    await page.click(LOCATORS.genderRadioLabel, { force: true });
    await page.fill(LOCATORS.phoneInput, TEST_DATA.phone);
    await page.click(LOCATORS.dateOfBirthInput);
    await page.selectOption(LOCATORS.datePickerMonth, TEST_DATA.dateOfBirth.month);
    await page.selectOption(LOCATORS.datePickerYear, TEST_DATA.dateOfBirth.year);
    await page.click(LOCATORS.datePickerDay);
    console.log('✅ Form fields filled');

    await page.click(LOCATORS.submitButton);
    console.log('✅ Form submitted');
    if (browserName === 'firefox') {
      await page.waitForTimeout(5000);
    }

    await expect(page.locator(LOCATORS.confirmationModal)).toBeVisible();
    await expect(page.locator(LOCATORS.modalTitle)).toHaveText('Thanks for submitting the form');
    await expect(page.locator(LOCATORS.modalStudentName)).toHaveText(
      `${TEST_DATA.firstName} ${TEST_DATA.lastName}`
    );
    await expect(page.locator(LOCATORS.modalStudentEmail)).toHaveText(TEST_DATA.email);
    await expect(page.locator(LOCATORS.modalGender)).toHaveText(TEST_DATA.gender);
    await expect(page.locator(LOCATORS.modalMobile)).toHaveText(TEST_DATA.phone);
    await expect(page.locator(LOCATORS.modalDateOfBirth)).toHaveText(
      `${TEST_DATA.dateOfBirth.day} ${TEST_DATA.dateOfBirth.month},${TEST_DATA.dateOfBirth.year}`
    );
    console.log('✅ Confirmation modal validated');


    });
});