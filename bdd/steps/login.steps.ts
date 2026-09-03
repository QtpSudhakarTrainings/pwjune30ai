import { Given, When, Then } from '@cucumber/cucumber';
import { chromium,Page, BrowserContext,expect } from '@playwright/test';

let browser;
let context: BrowserContext;
let page: Page;

Given('I navigate to the OrangeHRM login page', async function () {
  // Implement navigation to the OrangeHRM login page
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();

  await page.goto('https://qtpsudhakar-vibetestq-hrm.up.railway.app/');
});

When("the user logs in with user name as {string} and password as {string}", async function (username: string, password: string) {
  await page.getByPlaceholder("Username").fill(username);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
});

Then('the user should be redirected to the OrangeHRM dashboard', async function () {
  // Implement verification of successful login
  await page.waitForSelector('text=Dashboard');
  expect(await page.isVisible('text=Dashboard')).toBe(true);
});
