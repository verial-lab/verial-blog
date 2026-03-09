import { test, expect } from '@playwright/test';

test.describe('Content Pages', () => {
  test('essay index lists content', async ({ page }) => {
    await page.goto('/essays');
    const heading = page.locator('h1:text("Essays")');
    await expect(heading).toBeVisible();
  });

  test('glossary page loads', async ({ page }) => {
    await page.goto('/glossary');
    await expect(page.locator('h1:text("Glossary")')).toBeVisible();
  });
});
