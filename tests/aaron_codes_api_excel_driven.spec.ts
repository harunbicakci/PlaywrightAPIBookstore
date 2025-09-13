import { test, expect } from '@playwright/test';
import * as XLSX from 'xlsx';

// Define interface for Excel data structure
interface UserData {
  ID: number;
  Name: string;
  Username: string;
  Email: string;
  Gender: string;
  MobileNo: string; // Updated to remove quotes and space
}

// Read Excel file and convert to JSON
const workbook = XLSX.readFile('/Users/harunbicakci/PlaywrightAPIBookstore/excel-test-data/test-data.xlsx');
const sheetName = workbook.SheetNames[0]; // Assuming default sheet
const excelData: UserData[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
console.log('Excel Data:', excelData); // Debug log

test.describe('API Testing with Excel Data', () => {
  test('Validate user data via API', async ({ request }) => {
    for (const userData of excelData) {
      await test.step(`Validate user with ID ${userData.ID}`, async () => {
        const response = await request.get(`https://jsonplaceholder.typicode.com/users/${userData.ID}`);
        expect(response.status()).toBe(200); // Expect success
        const apiUser = await response.json();
        expect(apiUser.id).toBe(userData.ID); // Validate ID matches
        console.log(`Validated user ID ${userData.ID}: ${apiUser.name}`);
      });
    }
  });
});