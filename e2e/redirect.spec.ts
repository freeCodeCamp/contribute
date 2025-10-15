import { test, expect } from '@playwright/test';

test.describe('# redirection', () => {
  test('redirects #/ to /intro', async ({ page }) => {
    await page.goto('#/');
    await expect(page).toHaveURL('/intro/');
  });

  test('redirects /#/page?id=anchor to /page/#anchor', async ({ page }) => {
    await page.goto('/#/page?id=anchor');
    await expect(page).toHaveURL('/page/#anchor');
  });
});
