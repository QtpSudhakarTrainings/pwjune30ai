import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PlaywrightWorld } from '../support/world';

Then('the user should be redirected to the OrangeHRM dashboard', async function (this: PlaywrightWorld) {
  await this.page.waitForSelector('text=Dashboard');
  expect(await this.page.isVisible('text=Dashboard')).toBe(true);
});

When('the user clicks on the PIM module', async function (this: PlaywrightWorld) {
  await this.page.getByRole('link', { name: 'PIM' }).click();
});

Then('the PIM module should be displayed', async function (this: PlaywrightWorld) {
  await this.page.waitForSelector('text=PIM');
  expect(await this.page.isVisible('text=PIM')).toBe(true);
});

When('the user clicks on the Add Employee option in the PIM module', async function (this: PlaywrightWorld) {
  await this.page.getByRole('link', { name: 'Add Employee' }).click();
});

Then('the Add Employee page should be displayed', async function (this: PlaywrightWorld) {
  await this.page.waitForSelector('text=Add Employee');
  expect(await this.page.isVisible('text=Add Employee')).toBe(true);
});

When('the user fills in the employee details with first name as {string} and last name as {string}', async function (this: PlaywrightWorld, firstName: string, lastName: string) {
  await this.page.getByPlaceholder('First Name').fill(firstName);
  await this.page.getByPlaceholder('Last Name').fill(lastName);
});

When('the user fills dynamically generated employee id where the length is less than 8 characters', async function (this: PlaywrightWorld) {
  let employeeId = `EMP${Date.now()}`;
  if (employeeId.length >= 8) {
    employeeId = employeeId.slice(0, 7);
  }
  await this.page.locator("//label[normalize-space()='Employee Id']/../..//input").fill(employeeId);
});


When('the user clicks the Save button', async function (this: PlaywrightWorld) {
  await this.page.getByRole('button', { name: 'Save' }).click();
});
Then('the personal details page should be displayed', async function (this: PlaywrightWorld) {
  await this.page.waitForSelector('text=Personal Details');
  expect(await this.page.isVisible('text=Personal Details')).toBe(true);
});
