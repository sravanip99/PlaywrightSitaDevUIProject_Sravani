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
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL(/dashboard\/index/);
}

async function openEmploymentStatus(page) {
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.locator('.oxd-topbar-body-nav-tab', { hasText: 'Job' }).click();
  await page.getByRole('menuitem', { name: 'Employment Status' }).click();
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL(/admin\/employmentStatus/);
  await expect(page.getByRole('heading', { name: 'Employment Status' })).toBeVisible();
}

// ---------- Tests ----------
test.describe('OrangeHRM - Employment Status CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await openEmploymentStatus(page);
  });

  test('should create, update and delete an employment status', async ({ page }) => {
    // Names are unique on every run because of the time in the name
    const createdStatus = `Full-Time ${Date.now()}`;
    const updatedStatus = `Full-Time Permanent ${Date.now()}`;

    // Locators (they only search the page when used, so we can define them here once)
    const nameInput = page
      .locator('.oxd-input-group')
      .filter({ has: page.getByText('Name', { exact: true }) })
      .locator('input');
    const createdRow = page
      .locator('.oxd-table-card')
      .filter({ has: page.getByText(createdStatus, { exact: true }) });
    const updatedRow = page
      .locator('.oxd-table-card')
      .filter({ has: page.getByText(updatedStatus, { exact: true }) });

    await test.step('Create a new employment status', async () => {
      console.log(`Created status: ${createdStatus}`);
      await page.getByRole('button', { name: 'Add' }).click();
      await expect(nameInput).toBeVisible();

      await nameInput.fill(createdStatus);
      await page.getByRole('button', { name: 'Save' }).click();

      await expect(page.locator('.oxd-toast', { hasText: 'Successfully Saved' })).toBeVisible();
      await page.waitForTimeout(3000);
      await expect(page).toHaveURL(/admin\/employmentStatus/);
      await expect(createdRow).toBeVisible();
    });

    await test.step('Update the employment status', async () => {
      console.log(`Updated status: ${updatedStatus}`);
      // pencil icon in the row = edit
      await createdRow.locator('button:has(.bi-pencil-fill)').click();
      await expect(nameInput).toHaveValue(createdStatus);

      await nameInput.fill(updatedStatus);
      await page.getByRole('button', { name: 'Save' }).click();

      await expect(page.locator('.oxd-toast', { hasText: 'Successfully Updated' })).toBeVisible();
      await page.waitForTimeout(3000);
      await expect(updatedRow).toBeVisible();
      await expect(page.getByText(createdStatus, { exact: true })).toHaveCount(0);
    });

    await test.step('Delete the employment status', async () => {
      // trash icon in the row = delete
      await updatedRow.locator('button:has(.bi-trash)').click();
      await page.getByRole('button', { name: 'Yes, Delete' }).click();

      await expect(page.locator('.oxd-toast', { hasText: 'Successfully Deleted' })).toBeVisible();
      await page.waitForTimeout(3000);
      await expect(page.getByText(updatedStatus, { exact: true })).toHaveCount(0);
    });
  });
});