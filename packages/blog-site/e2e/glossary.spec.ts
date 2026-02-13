import { test, expect } from '@playwright/test';

test.describe('Glossary', () => {
  test('glossary terms are auto-linked in content', async ({ page }) => {
    await page.goto('/essays/containment-systems-design');
    const glossaryTrigger = page.locator('.glossary-term-trigger').first();
    await expect(glossaryTrigger).toBeVisible();
  });

  test('clicking glossary term shows popover', async ({ page }) => {
    await page.goto('/essays/containment-systems-design');
    const trigger = page.locator('.glossary-term-trigger').first();
    await trigger.click();
    const popover = page.locator('.glossary-popover');
    await expect(popover).toBeVisible();
  });

  test('popover has term title and definition', async ({ page }) => {
    await page.goto('/essays/containment-systems-design');
    const trigger = page.locator('.glossary-term-trigger').first();
    await trigger.click();
    await expect(page.locator('.glossary-popover-title')).toBeVisible();
    await expect(page.locator('.glossary-popover-def')).toBeVisible();
  });

  test('popover dismisses on escape', async ({ page }) => {
    await page.goto('/essays/containment-systems-design');
    const trigger = page.locator('.glossary-term-trigger').first();
    await trigger.click();
    await expect(page.locator('.glossary-popover')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('.glossary-popover')).not.toBeVisible();
  });

  test('glossary page lists all terms', async ({ page }) => {
    await page.goto('/glossary');
    await expect(page.getByText('Containment')).toBeVisible();
    await expect(page.getByText('Legibility')).toBeVisible();
    await expect(page.getByText('Systems Thinking')).toBeVisible();
  });

  test('glossary page shows backlinks', async ({ page }) => {
    await page.goto('/glossary');
    await expect(page.getByText('Referenced in:')).toBeVisible();
  });
});
