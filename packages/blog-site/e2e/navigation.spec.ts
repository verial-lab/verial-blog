import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('homepage loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Verial/);
  });

  test('nav links are visible on desktop', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'Desktop only');
    await page.goto('/');
    const nav = page.locator('nav');
    await expect(nav.getByRole('link', { name: 'Essays' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Posts' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Systems' })).toBeVisible();
  });

  test('essays page loads', async ({ page }) => {
    await page.goto('/essays');
    await expect(page.locator('h1:text("Essays")')).toBeVisible();
  });

  test('posts page loads', async ({ page }) => {
    await page.goto('/posts');
    await expect(page.locator('h1:text("Posts")')).toBeVisible();
  });

  test('systems page loads', async ({ page }) => {
    await page.goto('/systems');
    await expect(page.locator('h1:text("Systems")')).toBeVisible();
  });

  test('glossary page loads', async ({ page }) => {
    await page.goto('/glossary');
    await expect(page.locator('h1:text("Glossary")')).toBeVisible();
  });

  test('nav logo links to homepage', async ({ page }) => {
    await page.goto('/essays');
    await page.locator('nav').getByRole('link', { name: 'Verial' }).click();
    await expect(page).toHaveURL('/');
  });
});
