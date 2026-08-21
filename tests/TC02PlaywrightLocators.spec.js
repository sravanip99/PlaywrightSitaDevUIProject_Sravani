import {test, expect} from '@playwright/test';

test('I am validating the title of the page', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await expect(page).toHaveTitle('OrangeHRM');
});

test('enter valid credentials and login to the application', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveTitle('OrangeHRM');
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
});