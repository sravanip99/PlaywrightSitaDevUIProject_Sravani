import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://sauce-demo.myshopify.com/');
  await page.getByRole('link', { name: 'Grey jacket Grey jacket £' }).click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await page.locator('#main-menu').getByRole('link', { name: 'Home' }).click();
  await page.getByRole('link', { name: 'Noir jacket Noir jacket £' }).click();
  await page.getByLabel('Color').selectOption('Red');
  await page.getByLabel('Size').selectOption('L');
  await page.getByRole('button', { name: 'Add to Cart' }).click();
});