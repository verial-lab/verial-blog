import { test, expect } from '@playwright/test';

test.describe('Content Pages', () => {
  test('essay renders with article content', async ({ page }) => {
    await page.goto('/essays/containment-systems-design');
    await expect(page.getByRole('heading', { name: /Containment/i })).toBeVisible();
    await expect(page.locator('article')).toBeVisible();
    await expect(page.locator('.prose')).toBeVisible();
  });

  test('essay has back link to essays index', async ({ page }) => {
    await page.goto('/essays/containment-systems-design');
    const backLink = page.getByRole('link', { name: /← Essays/i });
    await expect(backLink).toBeVisible();
  });

  test('essay index lists content', async ({ page }) => {
    await page.goto('/essays');
    // Should have at least one essay link (containment)
    const links = page.locator('a[href^="/essays/"]');
    await expect(links.first()).toBeVisible();
  });
});

test.describe('Reading Progress Bar', () => {
  test('shows on content pages', async ({ page }) => {
    await page.goto('/essays/containment-systems-design');
    // Scroll down to trigger progress
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(100);
    // The progress bar is inside nav, check it exists
    const progressBar = page.locator('nav .bg-white');
    await expect(progressBar).toBeVisible();
  });

  test('hidden on index pages', async ({ page }) => {
    await page.goto('/essays');
    const progressBar = page.locator('nav .bg-white');
    await expect(progressBar).not.toBeVisible();
  });
});
