import { test, expect } from '@playwright/test';

test.describe('Glossary', () => {
  test('glossary page lists all terms', async ({ page }) => {
    await page.goto('/glossary');
    await expect(page.locator('h1:text("Glossary")')).toBeVisible();
  });

  test.skip('glossary terms are auto-linked in content (needs essay content)', async () => {
    // Re-enable when an essay with glossary terms exists
  });
});
