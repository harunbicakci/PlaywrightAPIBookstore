import { test, expect, APIRequestContext } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// --- POM class (inside same file) ---
class UserAPI {
  constructor(private request: APIRequestContext, private baseURL: string) {}

  async getUser(userId: number) {
    return this.request.get(`${this.baseURL}/users/${userId}`);
  }
}

// --- Test ---
test('API Test with POM + JSON Data', async ({ request }) => {
  // Load test data
  const dataPath = path.join(__dirname, '../test-data/api_test.json');
  const testData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const { baseURL, userId } = testData;
  const api = new UserAPI(request, baseURL);

  // Step 1: Call API
  const response = await api.getUser(userId);
  expect(response.ok()).toBeTruthy();

  // Step 2: Validate response
  const userData = await response.json();
  console.log('👤 User Data:', userData);

  expect(userData.id).toBe(userId);
  expect(userData).toHaveProperty('name');
});