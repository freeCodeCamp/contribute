import { test, expect } from '@playwright/test';

const legacyRoutes = [
  { from: '/#/how-to-translate-files', to: '/how-to-translate-files/' },
  { from: '/#/how-to-setup-wsl', to: '/how-to-setup-wsl/' },
  {
    from: '/#/how-to-setup-freecodecamp-locally',
    to: '/how-to-setup-freecodecamp-locally/'
  },
  {
    from: '/#/how-to-add-playwright-tests',
    to: '/how-to-add-playwright-tests/'
  }
];

test.describe('Legacy URL redirects', () => {
  for (const route of legacyRoutes) {
    test(`should redirect ${route.from} to ${route.to}`, async ({ page }) => {
      await page.goto(route.from);
      await expect(page).toHaveURL(route.to);
    });
  }

  test('should handle query parameters in legacy URLs', async ({ page }) => {
    await page.goto(
      '/#/how-to-add-playwright-tests?id=run-the-playwright-tests'
    );
    await expect(page).toHaveURL(
      '/how-to-add-playwright-tests/#run-the-playwright-tests'
    );
  });
});
