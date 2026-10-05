const { test, expect } = require('@playwright/test');

// ---------- Test data ----------
const BASE_URL = 'https://opensource-demo.orangehrmlive.com';
const USERNAME = 'Admin';
const PASSWORD = 'admin123';

// Unique names per run, so reruns never clash with old data
const runId = Date.now();
const CREATED_TITLE = `automationtesterdemo${runId}`;
const UPDATED_TITLE = `automationtester123${runId}`;

// ---------- Helpers ----------
/** Returns the table row that contains exactly this job title. */
function jobTitleRow(page, title) {
  return page
    .locator('.oxd-table-card')
    .filter({ has: page.getByText(title, { exact: true }) });
}

async function login(page) {
  await page.goto(`${BASE_URL}/web/index.php/auth/login`);
  await page.getByPlaceholder('Username').fill(USERNAME);
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL(/dashboard\/index/);
}

async function openJobTitles(page) {
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.locator('.oxd-topbar-body-nav-tab', { hasText: 'Job' }).click();
  await page.getByRole('menuitem', { name: 'Job Titles' }).click();
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL(/admin\/viewJobTitleList/);
  await expect(page.getByRole('heading', { name: 'Job Titles' })).toBeVisible();
}

// ---------- Tests ----------
test.describe('OrangeHRM - Job Titles CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await openJobTitles(page);
  });

  test('should create, update and delete a job title', async ({ page }) => {
    const toast = page.locator('.oxd-toast');
    const jobTitleInput = page
      .locator('.oxd-input-group', { hasText: 'Job Title' })
      .locator('input');

    await test.step('Create a new job title', async () => {
      await page.getByRole('button', { name: 'Add' }).click();
      await expect(page).toHaveURL(/admin\/saveJobTitle/);
      await jobTitleInput.fill(CREATED_TITLE);
      await page.getByRole('button', { name: 'Save' }).click();

      await expect(toast).toContainText('Successfully Saved');
      await page.waitForTimeout(3000);
      await expect(page).toHaveURL(/admin\/viewJobTitleList/);
      await expect(jobTitleRow(page, CREATED_TITLE)).toBeVisible();
    });

    await test.step('Update the job title', async () => {
      // 2nd button in the row = edit icon
      await jobTitleRow(page, CREATED_TITLE).getByRole('button').nth(1).click();
      await page.waitForTimeout(3000);
      await expect(page).toHaveURL(/admin\/saveJobTitle\/\d+/);
      await expect(jobTitleInput).toHaveValue(CREATED_TITLE);

      await jobTitleInput.fill(UPDATED_TITLE);
      await page.getByRole('button', { name: 'Save' }).click();

      await expect(toast).toContainText('Successfully Updated');
      await page.waitForTimeout(5000);
      await expect(jobTitleRow(page, UPDATED_TITLE)).toBeVisible();
      await expect(page.getByText(CREATED_TITLE, { exact: true })).toHaveCount(0);
    });

    await test.step('Delete the job title', async () => {
      // 1st button in the row = delete icon
      await jobTitleRow(page, UPDATED_TITLE).getByRole('button').first().click();
      await page.getByRole('button', { name: 'Yes, Delete' }).click();
      await page.waitForTimeout(3000);
      await expect(toast).toContainText('Successfully Deleted');
      await expect(page.getByText(UPDATED_TITLE, { exact: true })).toHaveCount(0);
    });
  });
});