import { test, expect } from "@playwright/test";

test.describe("Hooks Demo", () => {

    // Runs once before all tests - logs in once for all tests
    test.beforeAll(async () => {
        console.log("Before All: Starting the OrangeHRM test suite");
    });

    // Runs before EVERY test - logs in fresh each time
    test.beforeEach(async ({ page }) => {
        console.log("Before Each: Navigating to the login page and performing login");
        await page.goto('/');
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill("admin123");
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    });

    // Runs after EVERY test - logs out
    test.afterEach(async ({ page }) => {
        console.log("After Each: Logging out from the application");
        await page.locator('p.oxd-userdropdown-name').click();
        await page.getByRole('menuitem', { name: 'Logout' }).click();
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    // Runs once after all tests - logs out once for all tests
    test.afterAll(async () => {
        console.log("After All: Completed the OrangeHRM test suite");
    });

    //Test Case 1 Verify Dashboard Widgets
    test('Verify Time at Work widget is visible', async ({ page }) => {
        await expect(page.getByText('Time at Work')).toBeVisible();
    });

    test('Verify My Actions widget is visible', async ({ page }) => {
        await expect(page.getByText('My Actions')).toBeVisible();
    });

    test('Verify Quick Launch widget is visible', async ({ page }) => {
        await expect(page.getByText('Quick Launch')).toBeVisible();
    });

    test('Verify Buzz Latest Posts widget is visible', async ({ page }) => {
        await expect(page.getByText('Buzz Latest Posts')).toBeVisible();
    });

    test('Verify Employees on Leave Today widget is visible', async ({ page }) => {
        await expect(page.getByText('Employees on Leave Today')).toBeVisible();
    });

    test('Verify Employee Distribution by Sub Unit widget is visible', async ({ page }) => {
        await expect(page.getByText('Employee Distribution by Sub Unit')).toBeVisible();
        console.log('All dashboard widgets are visible');
    });

    //Test Case 2 Verify Menu Items on Dashboard Page
    test('verify Menu Items on Dashboard Page', async ({ page }) => {
        const menuItems = [
            'Admin',
            'PIM',
            'Leave',
            'Time',
            'Recruitment',
            'My Info',
            'Performance',
            'Dashboard',
            'Directory',
            'Maintenance',
            'Claim',
            'Buzz'
        ];

        for (const menuItem of menuItems) {
            await expect(page.getByRole('link', { name: menuItem, exact: true })).toBeVisible();
        }
        console.log('All menu items are visible');
    });

    /*test('verify Menu Items on Dashboard Page', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'Admin', exact: true })).toBeVisible();
    });

    test('verify Menu Items on Dashboard Page', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'PIM', exact: true })).toBeVisible();
    });

    test('verify Menu Items on Dashboard Page', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'Leave', exact: true })).toBeVisible();
    });

    test('verify Menu Items on Dashboard Page', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'Time', exact: true })).toBeVisible();
    });

    test('verify Menu Items on Dashboard Page', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'Recruitment', exact: true })).toBeVisible();
    });

    test('verify Menu Items on Dashboard Page', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'My Info', exact: true })).toBeVisible();
    });

    test('verify Menu Items on Dashboard Page', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'Performance', exact: true })).toBeVisible();
    });

    test('verify Menu Items on Dashboard Page', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'Dashboard', exact: true })).toBeVisible();
    });

    test('verify Menu Items on Dashboard Page', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'Directory', exact: true })).toBeVisible();
    });

    test('verify Menu Items on Dashboard Page', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'Maintenance', exact: true })).toBeVisible();
    });

    test('verify Menu Items on Dashboard Page', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'Claim', exact: true })).toBeVisible();
    });

    test('verify Menu Items on Dashboard Page', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'Buzz', exact: true })).toBeVisible();
        console.log('All menu items are visible');
    });*/

    //Test Case 3 Get User Name from Dashboard Page
    test('Get User Name from Dashboard Page and print in console', async ({ page }) => {
        const userName = await page.locator('p.oxd-userdropdown-name').textContent();
        console.log(`Logged in user name is: ${userName}`);
    });

});
