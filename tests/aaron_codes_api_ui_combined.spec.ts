import { test, expect } from '@playwright/test';

// Endpoints collection (key-value pairs)
const BASE_URL = 'https://bookstore.toolsqa.com';
const ENDPOINTS = {
  createUser: '/Account/v1/User',
  generateToken: '/Account/v1/GenerateToken',
  addBook: '/BookStore/v1/Books',
};

// Test data with dynamic username collection
const TEST_DATA = {
  username: `aaron_${Date.now()}`,
  password: 'TestPassword123!',
  isbn: '9781449325862',
};

test('API Flow: Create User → Generate Token → Add Book', async ({ request }) => {
  // Step 1 - Create User
  const createUserResponse = await request.post(`${BASE_URL}${ENDPOINTS.createUser}`, {
    data: {
      userName: TEST_DATA.username,
      password: TEST_DATA.password,
    },
  });
  expect(createUserResponse.status()).toBe(201);
  const createUserBody = await createUserResponse.json();
  console.log('Create User Response:', createUserBody);

  // Step 2 - Generate Token
  const generateTokenResponse = await request.post(`${BASE_URL}${ENDPOINTS.generateToken}`, {
    data: {
      userName: TEST_DATA.username,
      password: TEST_DATA.password,
    },
  });
  expect(generateTokenResponse.status()).toBe(200);
  const generateTokenBody = await generateTokenResponse.json();
  console.log('Generate Token Response:', generateTokenBody);

  const token = generateTokenBody.token;

  // Step 3 - Add Book
  const addBookResponse = await request.post(`${BASE_URL}${ENDPOINTS.addBook}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      userId: createUserBody.userID,
      collectionOfIsbns: [{ isbn: TEST_DATA.isbn }],
    },
  });
  expect(addBookResponse.status()).toBe(201);
  const addBookBody = await addBookResponse.json();
  console.log('Add Book Response:', addBookBody);
});