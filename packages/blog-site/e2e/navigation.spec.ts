import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('homepage loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Verial/);
  });

  test('nav links are visible on desktop', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Essays' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Posts' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Systems' })).toBeVisible();
  });

  test('essays page loads', async ({ page }) => {
    await page.goto('/essays');
    await expect(page.getByRole('heading', { name: 'Essays' })).toBeVisible();
  });

  test('posts page loads', async ({ page }) => {
    await page.goto('/posts');
    await expect(page.getByRole('heading', { name: 'Posts' })).toBeVisible();
  });

  test('systems page loads', async ({ page }) => {
    await page.goto('/systems');
    await expect(page.getByRole('heading', { name: 'Systems' })).toBeVisible();
  });

  test('glossary page loads', async ({ page }) => {
    await page.goto('/glossary');
    await expect(page.getByRole('heading', { name: 'Glossary' })).toBeVisible();
  });

  test('nav logo links to homepage', async ({ page }) => {
    await page.goto('/essays');
    await page.getByRole('link', { name: 'Verial' }).click();
    await expect(page).toHaveURL('/');
  });
});
