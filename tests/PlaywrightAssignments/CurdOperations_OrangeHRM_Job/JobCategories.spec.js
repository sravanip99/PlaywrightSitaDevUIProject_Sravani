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

async function openJobCategories(page) {
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.locator('.oxd-topbar-body-nav-tab', { hasText: 'Job' }).click();
  await page.getByRole('menuitem', { name: 'Job Categories' }).click();
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL(/admin\/jobCategory/);
  await expect(page.getByRole('heading', { name: 'Job Categories' })).toBeVisible();
}

// ---------- Tests ----------
test.describe('OrangeHRM - Job Categories CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await openJobCategories(page);
  });

  test('should create, update and delete a job category', async ({ page }) => {
    // Names are unique on every run because of the time in the name
    const createdCategory = `Craft Workers ${Date.now()}`;
    const updatedCategory = `Sales Technician ${Date.now()}`;

    // Locators (they only search the page when used, so we can define them here once)
    const nameInput = page
      .locator('.oxd-input-group')
      .filter({ has: page.getByText('Name', { exact: true }) })
      .locator('input');
    const createdRow = page
      .locator('.oxd-table-card')
      .filter({ has: page.getByText(createdCategory, { exact: true }) });
    const updatedRow = page
      .locator('.oxd-table-card')
      .filter({ has: page.getByText(updatedCategory, { exact: true }) });

    await test.step('Create a new job category', async () => {
      console.log(`Created category: ${createdCategory}`);
      await page.getByRole('button', { name: 'Add' }).click();
      await expect(nameInput).toBeVisible();

      await nameInput.fill(createdCategory);
      await page.getByRole('button', { name: 'Save' }).click();

      await expect(page.locator('.oxd-toast', { hasText: 'Successfully Saved' })).toBeVisible();
      await page.waitForTimeout(3000);
      await expect(page).toHaveURL(/admin\/jobCategory/);
      await expect(createdRow).toBeVisible();
    });

    await test.step('Update the job category', async () => {
      console.log(`Updated category: ${updatedCategory}`);
      // pencil icon in the row = edit
      await createdRow.locator('button:has(.bi-pencil-fill)').click();
      await expect(nameInput).toHaveValue(createdCategory);

      // fill() clears the old text and types the new one, no arrow keys needed
      await nameInput.fill(updatedCategory);
      await page.getByRole('button', { name: 'Save' }).click();

      await expect(page.locator('.oxd-toast', { hasText: 'Successfully Updated' })).toBeVisible();
      await page.waitForTimeout(3000);
      await expect(updatedRow).toBeVisible();
      await expect(page.getByText(createdCategory, { exact: true })).toHaveCount(0);
    });

    await test.step('Delete the job category', async () => {
      // trash icon in the row = delete
      await updatedRow.locator('button:has(.bi-trash)').click();
      await page.getByRole('button', { name: 'Yes, Delete' }).click();

      await expect(page.locator('.oxd-toast', { hasText: 'Successfully Deleted' })).toBeVisible();
      await page.waitForTimeout(3000);
      await expect(page.getByText(updatedCategory, { exact: true })).toHaveCount(0);
    });
  });
});