import { expect, test } from '@playwright/test';

test.describe('testrepostpeter-frontend deployment', () => {
  test('serves its entry page', async ({ page }) => {
    const response = await page.goto('/');
    const status = response?.status();
    const url = page.url();

    expect(
      response?.ok(),
      `Expected HTTP 200-299 from ${url}, but got HTTP ${status}`,
    ).toBeTruthy();

    await expect(
      page.locator('body'),
      `Expected <body> element to be visible on ${url}`,
    ).toBeVisible();

    await expect(
      page.locator('h1'),
      `Expected <h1> on ${url}. Page title was: "${await page.title()}"`,
    ).toBeVisible();
  });
});

