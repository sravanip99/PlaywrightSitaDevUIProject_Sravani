import {test, expect} from "@playwright/test";

test.describe("Hooks Demo",()=>{

    //test.beforeAll
    test.beforeEach(async({page})=>{
        await page.goto('/');
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill("admin123");
        await page.getByRole('button', { name: 'Login' }).click();
    })

    test('Login to OrangeHRM', async({page})=>{
       
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    })

    test('Validate the title of the page', async({page})=>{
        await expect(page).toHaveTitle('OrangeHRM');
    })

    test('Validate the logo of the page', async({page})=>{
        await expect(page.getByAltText('company-branding')).toBeVisible();
    })

    test('Validate the Admin tab', async({page})=>{
        await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
    })

    test.afterEach(async({page})=>{
        await page.getByRole('link', { name: 'Welcome Admin' }).click();
        await page.getByRole('link', { name: 'Logout' }).click();
    })

    //test.afterall
})

//beforeEach - It will execute before each test case
//afterEach - It will execute after each test case
//beforeAll - It will execute before all the test cases
//afterAll - It will execute after all the test cases