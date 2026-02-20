import { test } from '@playwright/test';

test('Understanding Variables', async ({ page }) => {
  // 🗒️ THE PLAN
  const websiteURL = 'https://ecommerce-playground.lambdatest.io/';
  let productName = 'iPhone';
  
  // 🎬 THE WORK
  console.log('Website:', websiteURL);
  console.log('Product 1:', productName);
  
  // Now let's change the product (because we used 'let')
  productName = 'MacBook';
  console.log('Product 2:', productName);
  
  // Try to change websiteURL (this will cause an error!)
  Uncomment the line below and see what happens:
  // websiteURL = 'https://google.com';
});