import { test, expect } from '@playwright/test';
import { ai } from '@zerostep/playwright';
import 'dotenv/config';
import process from 'process';

test('Signup flow using Zerostep AI', async ({ page }) => {

   test.setTimeout(120000);

  // Open website
  await page.goto('https://automationexercise.com/login',{
    waitUntil: 'domcontentloaded'
  });

  await page.waitForLoadState('networkidle');

  const aiArgs = { page, test };

  // Signup flow
  await ai('In the New User Signup section, enter "Prashant G" in the Name field', aiArgs);
  await ai('In the New User Signup section, enter "prashantg07@gmail.com" in the Email Address field', aiArgs);
  await ai('Click the Signup button in the New User Signup section', aiArgs);

  // Wait for signup page
  await page.waitForURL('**/signup');

  // Account information
  await ai('Select title Mr', aiArgs);
  await ai(`Enter "${process.env.TEST_PASSWORD}" in the Password field`, aiArgs);

  await ai('Open the Date of Birth day dropdown and select 12', aiArgs);
  await ai('Open the Date of Birth month dropdown and select July', aiArgs);
  await ai('Open the Date of Birth year dropdown and select 1985', aiArgs);
  // Checkboxes
  await ai('Check the Sign up for our newsletter checkbox', aiArgs);
  await ai('Check the Receive special offers from our partners checkbox', aiArgs);

  // Address Information
  await ai('Enter "Prashanth" in the First name field', aiArgs);
  await ai('Enter "G" in the Last name field', aiArgs);
  await ai('Enter "ABCD" in the Company field', aiArgs);
  await ai('Enter "Bangaluru" in the Address field', aiArgs);

  await page.mouse.wheel(0, 600);

  await ai('Select "India" from the Country dropdown', aiArgs);
  await ai('Enter "KARNATAKA" in the State field', aiArgs);
  await ai('Enter "Bangaluru" in the City field', aiArgs);
  await ai('Enter "577006" in the Zipcode field', aiArgs);

  // Create account
  await ai('Click the Create Account button', aiArgs);

  // Validate account creation
  const accountCreated = await ai(
    'Confirm that the ACCOUNT CREATED confirmation message is visible',
    aiArgs
  );

  expect(accountCreated).toBe(true);

});