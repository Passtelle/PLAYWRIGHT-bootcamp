import { test, expect, APIResponse } from '@playwright/test';

interface LoginErrorResponse {
  message: string;
}

test.describe('User Authentication - Security', () => {

  test('[BAS-6] Login fails when username contains SQL injection payload', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const endpoint: string = '/auth/login';
    const credentials: { username: string; password: string } = {
      username: "admin' --",
      password: 'emilyspass',
    };
    const expectedStatus: number = 400;
    const expectedMessage: RegExp = /invalid credentials/i;
    const maxResponseTime: number = 2000;

    // 🎬 THE WORK (Actions)
    const startTime: number = Date.now();
    const response: APIResponse = await request.post(`${BASE_URL}${endpoint}`, {
      data: credentials,
    });
    const responseTime: number = Date.now() - startTime;
    const body: LoginErrorResponse = await response.json();

    // ✅ THE CHECK (Assertions)
    expect(response.status()).toBe(expectedStatus);
    expect(body.message).toMatch(expectedMessage);
    expect(responseTime).toBeLessThan(maxResponseTime);
  });

});
