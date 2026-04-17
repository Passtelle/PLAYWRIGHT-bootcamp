import { test, expect, APIResponse } from '@playwright/test';

interface UserErrorResponse {
  message: string;
}

test.describe('User Retrieval - Error Handling', () => {

  test('[BAS-7] Retrieve user fails when user ID does not exist', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const userId: string = '99999';
    const expectedMessage: RegExp = /user with id '99999' not found/i;
    const maxResponseTime: number = 2000;

    // 🎬 THE WORK (Actions)
    const startTime: number = Date.now();
    const response: APIResponse = await request.get(`${BASE_URL}/users/${userId}`);
    const responseTime: number = Date.now() - startTime;
    const body: UserErrorResponse = await response.json();

    // ✅ THE CHECK (Assertions)
    expect(response.status()).toBe(404);
    expect(body.message).toMatch(expectedMessage);
    expect(responseTime).toBeLessThan(maxResponseTime);
  });

});
