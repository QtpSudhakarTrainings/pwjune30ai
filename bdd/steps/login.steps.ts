import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PlaywrightWorld } from '../support/world';

Given('I navigate to the OrangeHRM login page', async function (this: PlaywrightWorld) {
  await this.page.goto('https://qtpsudhakar-vibetestq-hrm.up.railway.app/');
});

When(
  'the user logs in with user name as {string} and password as {string}',
  async function (this: PlaywrightWorld, username: string, password: string) {
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
);


