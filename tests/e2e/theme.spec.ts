import { expect, test, type Page } from '@playwright/test';

test.use({ viewport: { width: 1280, height: 900 } });

const countTransitions = (page: Page) =>
  page.evaluate(() => {
    const root = document.documentElement;
    root.dataset.transitions = '0';
    document.addEventListener('transitionrun', () => {
      root.dataset.transitions = String(Number(root.dataset.transitions) + 1);
    });
  });

const expectStillSwitch = async (page: Page, mode: string) => {
  const root = page.locator('html');
  await expect(root).toHaveAttribute('data-mode', mode);
  await page.evaluate(
    () =>
      new Promise<void>(done =>
        requestAnimationFrame(() => requestAnimationFrame(() => done()))
      )
  );
  await expect(root).toHaveAttribute('data-transitions', '0');
};

test('the theme button switches at once', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/faq/');
  const button = page.locator('[data-nb-theme-toggle]:visible').first();
  await button.hover();
  await button.evaluate(async element => {
    await Promise.all(
      element.getAnimations().map(animation => animation.finished)
    );
  });
  await countTransitions(page);
  await button.click();
  await expectStillSwitch(page, 'dark');
  await expect(button).toHaveAttribute('aria-pressed', 'true');
});

test('a chosen theme stays after a reload and on the next page', async ({
  page
}) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/faq/');
  await page.locator('[data-nb-theme-toggle]:visible').first().click();
  await expect(page.locator('html')).toHaveAttribute('data-mode', 'dark');
  await page.goto('/getting-started/');
  await expect(page.locator('html')).toHaveAttribute('data-mode', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-mode', 'dark');
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('ui-mode')))
    .toBe('dark');
});

test('a chosen theme beats the OS setting', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/faq/');
  await expect(page.locator('html')).toHaveAttribute('data-mode', 'dark');
  await page.locator('[data-nb-theme-toggle]:visible').first().click();
  await expect
    .poll(() => page.locator('html').getAttribute('data-mode'))
    .toBeNull();
  await page.reload();
  await expect
    .poll(() => page.locator('html').getAttribute('data-mode'))
    .toBeNull();
});

test('before a choice, the page follows the OS theme', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/faq/');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-mode', 'dark');
});

test('a choice in another tab applies here', async ({ context, page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/faq/');
  const other = await context.newPage();
  await other.emulateMedia({ colorScheme: 'light' });
  await other.goto('/faq/');
  await other.evaluate(() => localStorage.setItem('ui-mode', 'dark'));
  await expect(page.locator('html')).toHaveAttribute('data-mode', 'dark');
});
