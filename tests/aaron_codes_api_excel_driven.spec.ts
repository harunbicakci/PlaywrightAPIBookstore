import { test, expect, Page } from '@playwright/test';
import * as XLSX from 'xlsx';
import path from 'path';

// Excel Data Type
interface UserData {
  FirstName: string;
  LastName: string;
  DateOfBirth: string | number;
  Street: string;
  PostalCode: string | number;
  City: string;
  State: string;
  Country: string;
  Phone: string | number;
  Email: string;
  Password: string;
}

// --- POM ---
class RegistrationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://practicesoftwaretesting.com/auth/register');
  }

  async fillRegistrationForm(userData: UserData) {
    await this.page.fill('#first_name', String(userData.FirstName));
    await this.page.fill('#last_name', String(userData.LastName));
    await this.page.fill('#dob', String(userData.DateOfBirth));
    await this.page.fill('#street', String(userData.Street));
    await this.page.fill('#postal_code', String(userData.PostalCode));
    await this.page.fill('#city', String(userData.City));
    await this.page.fill('#state', String(userData.State));
    await this.page.selectOption('#country', { label: String(userData.Country) });
    await this.page.fill('#phone', String(userData.Phone));
    await this.page.fill('#email', String(userData.Email));
    await this.page.fill('#password', String(userData.Password));
    await this.page.getByRole('button', { name: 'Register' }).click();  }
  

  async validateUserData(userData: UserData) {
    await expect(this.page.locator('#first_name')).toHaveValue(String(userData.FirstName));
    await expect(this.page.locator('#last_name')).toHaveValue(String(userData.LastName));
    await expect(this.page.locator('#email')).toHaveValue(String(userData.Email));
  }
}


// --- Excel Reader ---
function getExcelData(): UserData[] {
  const filePath = path.join(__dirname, '../excel-test-data/test-data.xlsx'); // Excel in same folder
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
}

// --- Test ---
test.describe('E2E Registration Test with Excel Data', () => {
  const excelData = getExcelData();

  test('Register new user and validate', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const userData = excelData[0]; // first row only

    await registrationPage.navigate();
    await registrationPage.fillRegistrationForm(userData);
    await registrationPage.validateUserData(userData);
  });
});