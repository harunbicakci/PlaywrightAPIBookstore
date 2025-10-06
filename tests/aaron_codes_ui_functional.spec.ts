import { test, expect, APIRequestContext } from '@playwright/test';

class NotesAPI {
  readonly request: APIRequestContext;
  readonly baseURL: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseURL = 'https://practice.expandtesting.com/notes/api';
  }

  async healthCheck() {
    const resp = await this.request.get(`${this.baseURL}/health`);
    expect(resp.ok()).toBeTruthy();
    const body = await resp.json();
    console.log('Health check:', body);
    expect(body).toHaveProperty('status');
    return body;
  }

  async register(name: string, email: string, password: string) {
    const resp = await this.request.post(`${this.baseURL}/users/register`, {
      data: { name, email, password },
    });
    expect(resp.status()).toBe(201);
    const body = await resp.json();
    console.log('Registered user:', body);
    return body;
  }

  async login(email: string, password: string) {
    const resp = await this.request.post(`${this.baseURL}/users/login`, {
      data: { email, password },
    });
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    console.log('Login response:', body);
    return body;
  }

  async createNote(token: string, title: string, description: string, category: string) {
    const resp = await this.request.post(`${this.baseURL}/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: { title, description, category },
    });
    expect(resp.status()).toBe(201);
    const body = await resp.json();
    console.log('Created note:', body);
    return body;
  }

  async getNote(token: string, noteId: string) {
    const resp = await this.request.get(`${this.baseURL}/notes/${noteId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    console.log('Fetched note:', body);
    return body;
  }

  async updateNote(token: string, noteId: string, title: string, description: string, category: string) {
    const resp = await this.request.put(`${this.baseURL}/notes/${noteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: { title, description, category },
    });
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    console.log('Updated note:', body);
    return body;
  }

  async deleteNote(token: string, noteId: string) {
    const resp = await this.request.delete(`${this.baseURL}/notes/${noteId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    console.log('Deleted note:', body);
    return body;
  }
}

test('Notes API E2E flow › health → register → login → create → get → update → delete', async ({ request }) => {
  const api = new NotesAPI(request);

  // Health check
  await api.healthCheck();

  // Register a new user
  const email = `qatester_${Date.now()}@example.com`;
  const password = 'Password123!';
  await api.register('QA Tester', email, password);

  // Login
  const loginRes = await api.login(email, password);
  const token = loginRes.data.token;

  // Create note
  const noteRes = await api.createNote(token, 'First Note', 'This is my first note', 'General');
  const noteId = noteRes.data.id;

  // Get note
  await api.getNote(token, noteId);

  // Update note
  await api.updateNote(token, noteId, 'Updated Note', 'This note was updated', 'Work');

  // Delete note
  await api.deleteNote(token, noteId);
});