import { test, expect, APIResponse } from '@playwright/test';

interface ErrorResponse {
  message: string;
}

test.describe('User Authentication - Authorization Validation', () => {

  test('[BAS-8] Access protected resource fails when Authorization header is missing', async ({ request }) => {
    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const endpoint: string = '/auth/me';
    const expectedStatus: number = 401;
    const expectedMessage: RegExp = /access token is required/i;
    const maxResponseTime: number = 2000;

    // 🎬 THE WORK (Actions)
    const startTime: number = Date.now();
    const response: APIResponse = await request.get(`${BASE_URL}${endpoint}`);
    const responseTime: number = Date.now() - startTime;
    const body: ErrorResponse = await response.json();

    // ✅ THE CHECK (Assertions)
    expect(response.status()).toBe(expectedStatus);
    expect(body.message).toMatch(expectedMessage);
    expect(responseTime).toBeLessThan(maxResponseTime);
  });
});
