import { expect, test } from '@playwright/test';

test.use({
  viewport: { width: 1280, height: 900 },
  permissions: ['clipboard-read', 'clipboard-write']
});

test('clicking a tab shows its panel and hides the others', async ({
  page
}) => {
  await page.goto('/how-to-setup-freecodecamp-locally/');
  const tab = page.getByRole('tab', { name: 'Dev Container', exact: true });
  const firstPanel = page.locator(
    '[data-nb-tabs-content][data-nb-tab-label="Local Machine"]'
  );
  await expect(firstPanel).toBeVisible();
  await tab.click();
  await expect(tab).toHaveAttribute('aria-selected', 'true');
  await expect(
    page.locator('[data-nb-tabs-content][data-nb-tab-label="Dev Container"]')
  ).toBeVisible();
  await expect(firstPanel).toBeHidden();
});

test('arrow keys move between tabs', async ({ page }) => {
  await page.goto('/how-to-setup-freecodecamp-locally/');
  const tab = page.getByRole('tab', { name: 'Dev Container', exact: true });
  await tab.focus();
  await tab.press('ArrowRight');
  await expect(
    page.getByRole('tab', { name: 'GitHub Codespaces', exact: true })
  ).toBeFocused();
});

test('the copy button copies the code', async ({ page }) => {
  await page.goto('/how-to-setup-freecodecamp-locally/');
  const figure = page.locator('.nb-code-figure').first();
  await figure.hover();
  const code = (await figure.locator('pre').innerText()).trim();
  const button = figure.locator('button.nb-code-copy');
  await button.click();
  await expect
    .poll(() =>
      page.evaluate(async () => (await navigator.clipboard.readText()).trim())
    )
    .toBe(code);
  await expect(button).toHaveAccessibleName('Copied!');
});

test('the copy page button copies the Markdown', async ({ page }) => {
  await page.goto('/faq/');
  const button = page.locator('[data-nb-page-actions-copy]');
  await expect(button).toHaveText('Copy page');
  await button.click();
  await expect(button).toHaveText('Copied');
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toMatch(/^---/);
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toContain('Frequently Asked Questions');
});

test('View as Markdown opens the Markdown version', async ({
  page,
  request
}) => {
  await page.goto('/faq/');
  const link = page
    .locator('[data-nb-page-actions]')
    .getByRole('link', { name: 'View as Markdown', exact: true });
  await expect(link).toHaveAttribute('href', '/faq/index.md');
  const href = await link.getAttribute('href');
  const response = await request.get(href!);
  await expect.poll(() => response.status()).toBe(200);
  await expect
    .poll(() => response.headers()['content-type'])
    .toContain('text/markdown');
});

test('an image opens larger and Escape closes it', async ({ page }) => {
  await page.goto('/moderator-handbook/');
  const button = page.locator('button').filter({
    has: page.locator('img[src="/images/github/xkcd-free-speech.png"]')
  });
  await button.click();
  const dialog = page.locator('[data-nb-image-zoom]');
  await expect(dialog).toHaveAttribute('open', '');
  await expect(
    dialog.getByRole('button', { name: 'Close', exact: true })
  ).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveJSProperty('open', false);
  await expect(button).toBeFocused();
});

test('a file tree folder collapses and expands', async ({ page }) => {
  await page.goto('/how-to-work-on-localized-client-webapp/');
  const summary = page.locator('[data-file-tree] summary').first();
  const folder = summary.locator('..');
  await summary.click();
  await expect(folder).toHaveJSProperty('open', false);
  await expect(folder.locator('li').first()).toBeHidden();
  await summary.click();
  await expect(folder).toHaveJSProperty('open', true);
});
