const { test, expect } = require('@playwright/test');

// ---------- Test data ----------
const BASE_URL = 'https://opensource-demo.orangehrmlive.com';
const USERNAME = 'Admin';
const PASSWORD = 'admin123';

// ---------- Helpers ----------
async function login(page) {
  await page.goto(`${BASE_URL}/web/index.php/auth/login`);
  await page.getByPlaceholder('Username').fill(USERNAME);
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/dashboard\/index/);
}

async function openPayGrades(page) {
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.locator('.oxd-topbar-body-nav-tab', { hasText: 'Job' }).click();
  await page.getByRole('menuitem', { name: 'Pay Grades' }).click();
  await expect(page).toHaveURL(/admin\/viewPayGrades/);
}

// ---------- Tests ----------
test.describe('OrangeHRM - Pay Grades CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await openPayGrades(page);
  });

  test('should create a pay grade with a random currency, update it and delete it', async ({ page }) => {
    // Names are unique on every run because of the time in the name
    const createdGrade = `Grade ${Date.now()}`;
    const updatedGrade = `Updated Grade ${Date.now()}`;

    // Locators (they only search the page when used, so we can define them here once)
    const nameInput = page
      .locator('.oxd-input-group')
      .filter({ has: page.getByText('Name', { exact: true }) })
      .locator('input');
    const createdRow = page
      .locator('.oxd-table-card')
      .filter({ has: page.getByText(createdGrade, { exact: true }) });
    const updatedRow = page
      .locator('.oxd-table-card')
      .filter({ has: page.getByText(updatedGrade, { exact: true }) });

    let currencyName = ''; // filled in the currency step

    await test.step('Create a new pay grade', async () => {
      console.log(`Created grade: ${createdGrade}`);
      await page.getByRole('button', { name: 'Add' }).click();
      await nameInput.fill(createdGrade);
      await page.getByRole('button', { name: 'Save' }).click();
      //await expect(page.locator('.oxd-toast', { hasText: 'No Records Found' }).first()).toBeVisible();
    });

    await test.step('Add a random currency to the pay grade', async () => {
      // "Add" button of the Currencies section
      await page.getByRole('button', { name: 'Add' }).click();

      // open the currency dropdown
      await page
        .locator('.oxd-input-group')
        .filter({ has: page.getByText('Currency', { exact: true }) })
        .locator('.oxd-select-text')
        .click();

      // pick a random option
      const options = page.getByRole('option');
      await expect(options.nth(1)).toBeVisible(); // wait until the list is loaded
      const count = await options.count();
      const index = Math.floor(Math.random() * (count - 1)) + 1; // index 0 is "-- Select --"
      //.trim to remove any leading/trailing whitespace
      const currencyText = (await options.nth(index).innerText()).trim(); // e.g. "INR - Indian Rupee"
      await options.nth(index).click();

      console.log(`Selected currency: ${currencyText}`);
      currencyName = currencyText.split(' - ').slice(1).join(' - '); // text after "INR - "

      // two Save buttons are on the page now, the currency one is the last
      await page.getByRole('button', { name: 'Save' }).last().click();

      await page.waitForTimeout(3000);
      await expect(page.locator('.oxd-toast', { hasText: 'Successfully Saved' }).first()).toBeVisible();
      await expect(page.locator('.oxd-table-card', { hasText: currencyName })).toBeVisible();
    });

    await test.step('Cancel and check the pay grade is in the list', async () => {
      await page.getByRole('button', { name: 'Cancel' }).click();
      await page.waitForTimeout(3000);
      await expect(page).toHaveURL(/admin\/viewPayGrades/);
      await expect(createdRow).toBeVisible();
    });

    await test.step('Update the pay grade name', async () => {
      console.log(`Updated grade: ${updatedGrade}`);
      // pencil icon in the row = edit
      await createdRow.locator('button:has(.bi-pencil-fill)').click();
      await expect(nameInput).toHaveValue(createdGrade);

      await nameInput.fill(updatedGrade);
      await page.getByRole('button', { name: 'Save' }).first().click();
      await page.waitForTimeout(3000);
      await expect(page.locator('.oxd-toast', { hasText: 'Successfully Updated' }).first()).toBeVisible();

      await page.getByRole('button', { name: 'Cancel' }).click();
      await expect(page).toHaveURL(/admin\/viewPayGrades/);
      await expect(updatedRow).toBeVisible();
      await expect(page.getByText(createdGrade, { exact: true })).toHaveCount(0);
    });

    await test.step('Delete the pay grade', async () => {
      // trash icon in the row = delete
      await updatedRow.locator('button:has(.bi-trash)').click();
      await page.getByRole('button', { name: 'Yes, Delete' }).click();
      await page.waitForTimeout(3000);
      await expect(page.locator('.oxd-toast', { hasText: 'Successfully Deleted' }).first()).toBeVisible();
      await expect(page.getByText(updatedGrade, { exact: true })).toHaveCount(0);
    });
  });
});