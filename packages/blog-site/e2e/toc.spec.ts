import { test, expect } from '@playwright/test';

const ESSAY_URL = '/essays/legibility';

test.describe('Table of Contents — Desktop', () => {
  test.skip(({ isMobile }) => isMobile, 'Desktop only');

  test('panel is hidden by default', async ({ page }) => {
    await page.goto(ESSAY_URL);
    const panel = page.getByRole('navigation', { name: /contents/i });
    await expect(panel).not.toBeVisible();
  });

  test('panel appears on hover', async ({ page }) => {
    await page.goto(ESSAY_URL);
    const button = page.getByRole('button', { name: /toggle table of contents/i });
    await button.hover();
    const panel = page.getByRole('navigation', { name: /contents/i });
    await expect(panel).toBeVisible();
  });

  test('panel stays open when pinned via button click', async ({ page }) => {
    await page.goto(ESSAY_URL);
    const button = page.getByRole('button', { name: /toggle table of contents/i });
    await button.click();
    const panel = page.getByRole('navigation', { name: /contents/i });
    await expect(panel).toBeVisible();
    // Move mouse away — panel should stay pinned
    await page.mouse.move(100, 100);
    await expect(panel).toBeVisible();
  });

  test('clicking a TOC link closes the panel', async ({ page }) => {
    await page.goto(ESSAY_URL);
    const button = page.getByRole('button', { name: /toggle table of contents/i });
    await button.click();
    const panel = page.getByRole('navigation', { name: /contents/i });
    await expect(panel).toBeVisible();
    const firstLink = panel.getByRole('link').first();
    await firstLink.click();
    await expect(panel).not.toBeVisible();
  });

  test('clicking outside closes the pinned panel', async ({ page }) => {
    await page.goto(ESSAY_URL);
    const button = page.getByRole('button', { name: /toggle table of contents/i });
    await button.click();
    const panel = page.getByRole('navigation', { name: /contents/i });
    await expect(panel).toBeVisible();
    await page.mouse.click(100, 100);
    await expect(panel).not.toBeVisible();
  });
});

test.describe('Table of Contents — Mobile', () => {
  test.skip(({ isMobile }) => !isMobile, 'Mobile only');

  test('panel is hidden by default', async ({ page }) => {
    await page.goto(ESSAY_URL);
    const panel = page.getByRole('navigation', { name: /contents/i });
    await expect(panel).not.toBeVisible();
  });

  test('panel opens on button tap', async ({ page }) => {
    await page.goto(ESSAY_URL);
    const button = page.getByRole('button', { name: /toggle table of contents/i });
    await button.tap();
    const panel = page.getByRole('navigation', { name: /contents/i });
    await expect(panel).toBeVisible();
  });

  test('X close button is visible and closes the panel', async ({ page }) => {
    await page.goto(ESSAY_URL);
    await page.getByRole('button', { name: /toggle table of contents/i }).tap();
    const panel = page.getByRole('navigation', { name: /contents/i });
    await expect(panel).toBeVisible();
    const closeButton = page.getByRole('button', { name: /close table of contents/i });
    await expect(closeButton).toBeVisible();
    await closeButton.tap();
    await expect(panel).not.toBeVisible();
  });

  test('tapping outside closes the panel', async ({ page }) => {
    await page.goto(ESSAY_URL);
    await page.getByRole('button', { name: /toggle table of contents/i }).tap();
    const panel = page.getByRole('navigation', { name: /contents/i });
    await expect(panel).toBeVisible();
    await page.touchscreen.tap(100, 100);
    await expect(panel).not.toBeVisible();
  });

  test('tapping a TOC link closes the panel', async ({ page }) => {
    await page.goto(ESSAY_URL);
    await page.getByRole('button', { name: /toggle table of contents/i }).tap();
    const panel = page.getByRole('navigation', { name: /contents/i });
    await expect(panel).toBeVisible();
    const firstLink = panel.getByRole('link').first();
    await firstLink.tap();
    await expect(panel).not.toBeVisible();
  });
});
