import { test, expect } from '@playwright/test';

test.describe('Footnotes', () => {
  test('footnote markers are visible', async ({ page }) => {
    await page.goto('/essays/containment-systems-design');
    const footnoteRef = page.locator('sup a[data-footnote-ref]').first();
    await expect(footnoteRef).toBeVisible();
  });

  test('footnotes section exists at bottom', async ({ page }) => {
    await page.goto('/essays/containment-systems-design');
    const footnotesSection = page.locator('.footnotes');
    await expect(footnotesSection).toBeVisible();
  });

  test('clicking footnote scrolls to note', async ({ page }) => {
    await page.goto('/essays/containment-systems-design');
    const firstRef = page.locator('sup a[data-footnote-ref]').first();
    const href = await firstRef.getAttribute('href');
    await firstRef.click();
    await page.waitForTimeout(500); // smooth scroll
    // The target footnote should be in viewport
    const targetId = href?.replace('#', '');
    if (targetId) {
      const target = page.locator(`#${targetId}`);
      await expect(target).toBeInViewport();
    }
  });
});
