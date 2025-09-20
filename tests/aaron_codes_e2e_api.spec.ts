import { test, expect, APIRequestContext } from '@playwright/test';

class UsersAPI {
  private request: APIRequestContext;
  private baseURL = 'https://jsonplaceholder.typicode.com';
  private expectedFields = ['id', 'name', 'email'];
  private createdUsers = new Map<number, any>();

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  // ✅ Retrieve Users
  async getUsers() {
    const response = await this.request.get(`${this.baseURL}/users`);
    expect(response.ok()).toBeTruthy();

    const users = await response.json();
    users.forEach((user: any) => {
      this.expectedFields.forEach(field =>
        expect(user).toHaveProperty(field)
      );
    });
    console.log('✅ Retrieved and validated users');
  }

  // ✅ Create Users
  async createUsers(newUsers: { name: string; email: string }[]) {
    for (const user of newUsers) {
      const response = await this.request.post(`${this.baseURL}/users`, {
        data: user,
      });
      expect(response.ok()).toBeTruthy();

      const created = await response.json();
      this.createdUsers.set(created.id, created);
    }
    console.log('✅ Created users:', Array.from(this.createdUsers.values()));
  }

  // ✅ Delete Users
  async deleteUsers() {
    for (const [id] of this.createdUsers) {
      const response = await this.request.delete(`${this.baseURL}/users/${id}`);
      expect(response.status()).toBe(200);
    }
    console.log('✅ Deleted users successfully');
    this.createdUsers.clear();
  }
}

// === Test Runner ===
test('Users API CRUD flow', async ({ request }) => {
  const usersAPI = new UsersAPI(request);

  // Step 1: Retrieve & Validate
  await usersAPI.getUsers();

  // Step 2: Create
  await usersAPI.createUsers([
    { name: 'John Doe', email: 'john.doe@example.com' },
    { name: 'Jane Smith', email: 'jane.smith@example.com' },
  ]);

  // Step 3: Delete
  await usersAPI.deleteUsers();
});