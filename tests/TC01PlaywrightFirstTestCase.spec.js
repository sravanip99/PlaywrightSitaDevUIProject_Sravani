import {test, expect} from '@playwright/test';

var baseURL = "https://parabank.parasoft.com/parabank/index.htm";

test('I am validating the title of the page', async ({ page }) => {
var baseURL = "https://parabank.parasoft.com/parabank/index.htm";
var title = "ParaBank | Welcome | Online Banking";
  await page.goto(baseURL);
  await page.waitForTimeout(4000);

//Assertions
await expect(page).toHaveTitle(title);

await expect(page).toHaveURL(baseURL);
//toHaveTitle is assertion method

//   chai + jasmine
//   Browser- context- page- ElementHandle- Locator
//   await page.goto('https://playwright.dev/');
//   await expect(page).toHaveTitle(/Playwright/);
//   await.expect(page).toHaveURL(/playwright/);
});