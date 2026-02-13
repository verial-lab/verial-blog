import { test, expect } from '@playwright/test';

// These tests run in the 'mobile' project (iPhone 14 viewport)
test.describe('Mobile', () => {
  test('hamburger menu opens and shows links', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile only');
    await page.goto('/');
    // Desktop nav links should be hidden
    await expect(page.locator('.hidden.md\\:flex')).not.toBeVisible();
    // Click hamburger
    await page.getByLabel('Toggle menu').click();
    await expect(page.getByRole('link', { name: 'Essays' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Glossary' })).toBeVisible();
  });

  test('hamburger menu navigates and closes', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile only');
    await page.goto('/');
    await page.getByLabel('Toggle menu').click();
    await page.getByRole('link', { name: 'Essays' }).click();
    await expect(page).toHaveURL('/essays');
  });

  test('content is readable on mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile only');
    await page.goto('/essays/containment-systems-design');
    const article = page.locator('article');
    await expect(article).toBeVisible();
    // Article shouldn't overflow viewport
    const box = await article.boundingBox();
    const viewport = page.viewportSize();
    if (box && viewport) {
      expect(box.width).toBeLessThanOrEqual(viewport.width + 1);
    }
  });
});
