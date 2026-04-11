import { test, expect } from '@playwright/test';

test('Register 3 users with different usernames', async ({ page }) => {
  
     // 🗒️ THE PLAN
  const emailList: string[] = ['joe@test.com', 'bob@test.com', 'rob@test.com'];

 // 🎬 THE WORK
  for (const email of emailList) {
    await page.getByPlaceholder('Email').fill(email);
    await page.check()
  

});

