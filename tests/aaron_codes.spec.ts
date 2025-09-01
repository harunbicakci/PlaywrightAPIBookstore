import { test, expect } from '@playwright/test';

const baseUrl = 'https://bookstore.toolsqa.com';
const createUserEndpoint = '/Account/v1/User';
const url = `${baseUrl}${createUserEndpoint}`;

const userName = 'adminUser013';
const password = 'adminUser@123';

test('Create a new user', async ({ request }) => {
  const response = await request.post(url, {
    data: {
      userName: userName,
      password: password
    },
  });

  expect(response.status()).toBe(201);

  const responseBody = await response.json();

  expect(responseBody).toHaveProperty('userID');
  expect(responseBody.userID).not.toBeNull();
  expect(responseBody.username).toBe(userName);

  expect(responseBody).not.toHaveProperty('code');
  expect(responseBody).not.toHaveProperty('message');

  console.log('✅ User created successfully:', responseBody);
  console.log('UserID ===> ' + responseBody.userID);
});