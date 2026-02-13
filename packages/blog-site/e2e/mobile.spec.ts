import { test, expect } from '@playwright/test';

// These tests run in the 'mobile' project (Pixel 7 — Chromium mobile viewport)
test.describe('Mobile', () => {
  test('hamburger menu opens and shows links', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile only');
    await page.goto('/');
    // Click hamburger
    await page.getByLabel('Toggle menu').click();
    await page.waitForTimeout(300); // wait for animation
    await expect(page.locator('nav').getByRole('link', { name: 'Essays' })).toBeVisible();
    await expect(page.locator('nav').getByRole('link', { name: 'Glossary' })).toBeVisible();
  });

  test('hamburger menu navigates and closes', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile only');
    await page.goto('/');
    await page.getByLabel('Toggle menu').click();
    await page.waitForTimeout(300);
    await page.locator('nav').getByRole('link', { name: 'Essays' }).click();
    await expect(page).toHaveURL('/essays');
  });

  test('content is readable on mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile only');
    await page.goto('/essays/containment-systems-design');
    const article = page.locator('article');
    await expect(article).toBeVisible();
  });
});
