import { test, expect, APIResponse } from '@playwright/test';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  username: string;
  firstName: string;
  lastName: string;
}

test.describe('User Authentication - Happy Path', () => {

  test('[BAS-4] Valid credentials return access token and user data', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const endpoint: string = '/auth/login';
    const credentials: { username: string; password: string } = {
      username: 'emilys',
      password: 'emilyspass',
    };
    const expectedUsername: RegExp = /emilys/i;
    const expectedFirstName: RegExp = /emily/i;
    const expectedLastName: RegExp = /johnson/i;
    const maxResponseTime: number = 2000;

    // 🎬 THE WORK (Actions)
    const startTime: number = Date.now();
    const response: APIResponse = await request.post(`${BASE_URL}${endpoint}`, {
      data: credentials,
    });
    const responseTime: number = Date.now() - startTime;
    const body: LoginResponse = await response.json();

    // ✅ THE CHECK (Assertions)
    expect(response.status()).toBe(200);
    expect(body.accessToken).toBeTruthy();
    expect(typeof body.accessToken).toBe('string');
    expect(body.refreshToken).toBeTruthy();
    expect(typeof body.refreshToken).toBe('string');
    expect(body.username).toMatch(expectedUsername);
    expect(body.firstName).toMatch(expectedFirstName);
    expect(body.lastName).toMatch(expectedLastName);
    expect(responseTime).toBeLessThan(maxResponseTime);
  });

});
