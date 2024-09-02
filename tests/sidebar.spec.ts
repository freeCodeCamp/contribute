import { test, expect } from '@playwright/test';

test('no links in the sidebar contain an unescaped "prefix"', async ({
  page
}) => {
  await page.goto('./faq');
  const sidebar = page.getByRole('navigation').nth(1);
  for (const link of await sidebar.getByRole('link').all()) {
    const href = await link.getAttribute('href');
    expect(href).not.toContain('prefix');
  }
});

test('no duplicate links', async ({ page }) => {
  await page.goto('./faq');
  const links = await page.getByRole('link').all();
  const linkSet = [...new Set(links)];
  expect(links).toEqual(linkSet);
});
