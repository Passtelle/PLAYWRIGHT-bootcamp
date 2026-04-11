import { test } from '@playwright/test';

test('Branch Practice Test', async ({ page }) => {
  // Just a simple test to practice branching
  const messageList: string[] = ['Hello', 'World', 'Git'];
  
  for (const message of messageList) {
    console.log(message);
  }
});