import { test, expect, APIRequestContext } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// --- POM Class ---
class BookstoreAPI {
  constructor(private request: APIRequestContext, private baseURL: string) {}

  async login(userName: string, password: string) {
    return this.request.post(`${this.baseURL}/Account/v1/Login`, {
      headers: { 'Content-Type': 'application/json' },
      data: { userName, password }
    });
  }

  async addBook(userId: string, token: string, isbn: string) {
    return this.request.post(`${this.baseURL}/BookStore/v1/Books`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: { userId, collectionOfIsbns: [{ isbn }] }
    });
  }

  async getUser(userId: string, token: string) {
    return this.request.get(`${this.baseURL}/Account/v1/User/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}

// --- Test ---
test('Bookstore API E2E Test - Simple', async ({ request }) => {
  // Load test data
  const dataPath = path.join(__dirname, '../test-data/api_test.json');
  const testData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const { baseURL, userName, password, isbn } = testData;
  const api = new BookstoreAPI(request, baseURL);

  // Step 1: Login
  const loginResponse = await api.login(userName, password);
  expect(loginResponse.ok()).toBeTruthy();
  const loginData = await loginResponse.json();
  console.log('🔑 Login Response:', loginData);

  const { userId, token } = loginData;
  expect(token).toBeTruthy();

  // Step 2: Add book
  const addResponse = await api.addBook(userId, token, isbn);
  expect(addResponse.ok()).toBeTruthy();
  console.log('📚 Add Book Response:', await addResponse.json());

  // Step 3: Validate cart
  const userResponse = await api.getUser(userId, token);
  expect(userResponse.ok()).toBeTruthy();
  const userData = await userResponse.json();
  console.log('🛒 User Data:', userData);

  expect(userData.books.some((b: any) => b.isbn === isbn)).toBeTruthy();
});