import { expect, test } from '@playwright/test';

test.describe('Open Source Pulse — smoke', () => {
  test('home page renders the dashboard shell', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Open Source Pulse/);
    await expect(page.getByRole('heading', { name: 'Open Source Pulse' })).toBeVisible();
  });
});
