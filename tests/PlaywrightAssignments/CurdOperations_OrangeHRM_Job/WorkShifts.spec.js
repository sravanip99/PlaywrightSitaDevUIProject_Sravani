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

async function openWorkShifts(page) {
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.locator('.oxd-topbar-body-nav-tab', { hasText: 'Job' }).click();
  await page.getByRole('menuitem', { name: 'Work Shifts' }).click();
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL(/admin\/workShift/);
  await expect(page.getByRole('heading', { name: 'Work Shifts' })).toBeVisible();
}

// ---------- Tests ----------
test.describe('OrangeHRM - Work Shifts CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await openWorkShifts(page);
  });

  test('should create, update and delete a work shift', async ({ page }) => {
    // Name is unique on every run because of the time in the name
    const shiftName = `General ${Date.now()}`;

    // Shift times: created 8 AM to 5 PM, updated 9 AM to 6 PM
    const createdFrom = '08:00 AM';
    const createdTo = '05:00 PM';
    const updatedFrom = '09:00 AM';
    const updatedTo = '06:00 PM';

    // Locators (they only search the page when used, so we can define them here once)
    const nameInput = page
      .locator('.oxd-input-group')
      .filter({ has: page.getByText('Shift Name', { exact: true }) })
      .locator('input');
    const fromInput = page
      .locator('.oxd-input-group')
      .filter({ has: page.getByText('From', { exact: true }) })
      .locator('input');
    const toInput = page
      .locator('.oxd-input-group')
      .filter({ has: page.getByText('To', { exact: true }) })
      .locator('input');
    const shiftRow = page
      .locator('.oxd-table-card')
      .filter({ has: page.getByText(shiftName, { exact: true }) });

    await test.step('Create a new work shift', async () => {
      console.log(`Created shift: ${shiftName} (${createdFrom} to ${createdTo})`);
      await page.getByRole('button', { name: 'Add' }).click();
      await expect(nameInput).toBeVisible();

      await nameInput.fill(shiftName);

      // type the times directly in the fields, instead of using the clock pop-up
      await fromInput.fill(createdFrom);
      await fromInput.press('Tab');
      await toInput.fill(createdTo);
      await toInput.press('Tab');
      await expect(fromInput).toHaveValue(createdFrom);
      await expect(toInput).toHaveValue(createdTo);

      await page.getByRole('button', { name: 'Save' }).click();

      await expect(page.locator('.oxd-toast', { hasText: 'Successfully Saved' })).toBeVisible();
      await page.waitForTimeout(3000);
      await expect(page).toHaveURL(/admin\/workShift/);
      await expect(shiftRow).toBeVisible();
    });

    await test.step('Update the shift time', async () => {
      console.log(`Updated shift time: ${updatedFrom} to ${updatedTo}`);
      // pencil icon in the row = edit
      await shiftRow.locator('button:has(.bi-pencil-fill)').click();
      await expect(nameInput).toHaveValue(shiftName);

      await fromInput.fill(updatedFrom);
      await fromInput.press('Tab');
      await toInput.fill(updatedTo);
      await toInput.press('Tab');
      await expect(fromInput).toHaveValue(updatedFrom);
      await expect(toInput).toHaveValue(updatedTo);

      await page.getByRole('button', { name: 'Save' }).click();

      await expect(page.locator('.oxd-toast', { hasText: 'Successfully Updated' })).toBeVisible();
      await page.waitForTimeout(3000);
      await expect(page).toHaveURL(/admin\/workShift/);
      await expect(shiftRow).toBeVisible();
    });

    await test.step('Delete the work shift', async () => {
      // trash icon in the row = delete
      await shiftRow.locator('button:has(.bi-trash)').click();
      await page.getByRole('button', { name: 'Yes, Delete' }).click();

      await expect(page.locator('.oxd-toast', { hasText: 'Successfully Deleted' })).toBeVisible();
      await page.waitForTimeout(3000);
      await expect(page.getByText(shiftName, { exact: true })).toHaveCount(0);
    });
  });
});