import { test, expect } from '@playwright/test';

test.describe('Content Pages', () => {
  test('essay renders with article content', async ({ page }) => {
    await page.goto('/essays/containment-systems-design');
    await expect(page.locator('article h1').first()).toBeVisible();
    await expect(page.locator('article')).toBeVisible();
    await expect(page.locator('.prose')).toBeVisible();
  });

  test('essay has back link to essays index', async ({ page }) => {
    await page.goto('/essays/containment-systems-design');
    const backLink = page.locator('article').getByRole('link', { name: /← Essays/i });
    await expect(backLink).toBeVisible();
  });

  test('essay index lists content', async ({ page }) => {
    await page.goto('/essays');
    const links = page.locator('a[href^="/essays/"]');
    await expect(links.first()).toBeVisible();
  });
});

test.describe('Reading Progress Bar', () => {
  test('shows on content pages after scroll', async ({ page }) => {
    await page.goto('/essays/containment-systems-design');
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(200);
    // Progress bar is a div with bg-white inside nav
    const progressBar = page.locator('nav div.bg-white');
    await expect(progressBar).toBeAttached();
  });
});
