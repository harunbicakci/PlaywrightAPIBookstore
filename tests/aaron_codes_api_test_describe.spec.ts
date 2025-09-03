import { test, expect } from '@playwright/test';

const BASE_URL = 'https://api.restful-api.dev';
const ENDPOINTS = {
  createObject: '/objects',
  getObject: (id: string) => `/objects/${id}`,
};

const TEST_DATA = {
  name: `Test Phone ${Date.now()}`,
  data: {
    brand: 'TestBrand',
    model: 'X100',
    price: 666,
  },
};

test.describe.serial('API Object Creation and Validation Flow', () => {
  let objectId: string;

  test('Step 1: Create a new object with POST', async ({ request }) => {
    const response = await request.post(`${BASE_URL}${ENDPOINTS.createObject}`, {
      data: {
        name: TEST_DATA.name,
        data: TEST_DATA.data,
      },
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log('POST Response Status:', response.status());
    objectId = responseBody.id;
    console.log('✅ Object created successfully. Object ID:', objectId);
  });

  test('Step 2: Get object details with GET and validate', async ({ request }) => {
    const response = await request.get(`${BASE_URL}${ENDPOINTS.getObject(objectId)}`);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.id).toBe(objectId);
    expect(responseBody.name).toBe(TEST_DATA.name);
    expect(responseBody.data.brand).toBe(TEST_DATA.data.brand);
    expect(responseBody.data.model).toBe(TEST_DATA.data.model);
    expect(responseBody.data.price).toBe(TEST_DATA.data.price);
    console.log('✅ Object details fetched and validated:', responseBody);
  });
});