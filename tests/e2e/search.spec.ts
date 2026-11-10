import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 1280, height: 900 } });

test.beforeEach(async ({ page }) => {
  await page.goto('/faq/');
});

test('the search button opens search and focuses the box', async ({ page }) => {
  await page
    .getByRole('button', { name: /^Search/ })
    .first()
    .click();
  await expect(page.locator('[data-search-dialog]').first()).toHaveAttribute(
    'open',
    ''
  );
  await expect(page.locator('[data-search-input]').first()).toBeFocused();
});

test('Ctrl+K opens search and focuses the box', async ({ page }) => {
  await page.keyboard.press('Control+k');
  await expect(page.locator('[data-search-dialog]').first()).toHaveAttribute(
    'open',
    ''
  );
  await expect(page.locator('[data-search-input]').first()).toBeFocused();
});

test('Escape closes search and returns focus to the search button', async ({
  page
}) => {
  const button = page.getByRole('button', { name: /^Search/ }).first();
  await button.click();
  await expect(page.locator('[data-search-input]').first()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-search-input]').first()).toBeHidden();
  await expect(button).toBeFocused();
});

test('Escape returns focus to the search button when a click did not focus it', async ({
  page
}) => {
  const button = page.getByRole('button', { name: /^Search/ }).first();
  await button.dispatchEvent('click');
  await expect(page.locator('[data-search-input]').first()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(button).toBeFocused();
});

test('a query lists results and announces the count', async ({ page }) => {
  await page.keyboard.press('Control+k');
  await page.locator('[data-search-input]').first().fill('git');
  await expect(
    page.locator('[data-search-dialog] [role="status"]').first()
  ).toHaveText(/\d+ results?/);
  await expect(page.locator('[data-search-results] a').first()).toBeVisible();
});

test('clicking a result opens that page', async ({ page }) => {
  await page.keyboard.press('Control+k');
  await page.locator('[data-search-input]').first().fill('git');
  const link = page.locator('[data-search-results] a').first();
  await expect(link).toBeVisible();
  const href = await link.getAttribute('href');
  const pathname = new URL(href!, page.url()).pathname;
  await link.click();
  await expect(page).toHaveURL(url => url.pathname === pathname);
});

test('ArrowDown then Enter opens the first result', async ({ page }) => {
  await page.keyboard.press('Control+k');
  const input = page.locator('[data-search-input]').first();
  await input.fill('git');
  const link = page.locator('[data-search-results] a').first();
  await expect(link).toBeVisible();
  const href = await link.getAttribute('href');
  const pathname = new URL(href!, page.url()).pathname;
  await input.press('ArrowDown');
  await input.press('Enter');
  await expect(page).toHaveURL(url => url.pathname === pathname);
});

test('an unmatched query says so', async ({ page }) => {
  await page.keyboard.press('Control+k');
  await page.locator('[data-search-input]').first().fill('qqqqqqqqqq');
  await expect(
    page.locator('[data-search-dialog] [role="status"]').first()
  ).toHaveText('No results found.');
  await expect(page.locator('[data-search-results] a')).toHaveCount(0);
});

test('clearing the query clears the results', async ({ page }) => {
  await page.keyboard.press('Control+k');
  const input = page.locator('[data-search-input]').first();
  await input.fill('git');
  await expect(page.locator('[data-search-results] a').first()).toBeVisible();
  await input.clear();
  await expect(
    page.locator('[data-search-dialog] [role="status"]').first()
  ).toHaveText('Type to search…');
  await expect(page.locator('[data-search-results] a')).toHaveCount(0);
});

test('a search highlight matches a docs highlight', async ({ page }) => {
  const background = await page.locator('.docs-content').evaluate(element => {
    const mark = document.createElement('mark');
    mark.textContent = 'git';
    element.append(mark);
    const background = getComputedStyle(mark).backgroundColor;
    mark.remove();
    return background;
  });
  expect(background).toBe('rgba(0, 46, 173, 0.3)');
  await page.keyboard.press('Control+k');
  await page.locator('[data-search-input]').first().fill('git');
  await expect(page.locator('[data-search-results] mark').first()).toHaveCSS(
    'background-color',
    background
  );
});

test('focus shows the design ring in search', async ({ page }) => {
  await page.keyboard.press('Control+k');
  const input = page.locator('[data-search-input]').first();
  await expect(input).toHaveCSS('outline-style', 'solid');
  await input.fill('git');
  const link = page.locator('[data-search-results] a').first();
  await expect(link).toBeVisible();
  await link.focus();
  await expect(link).toHaveCSS('outline-color', 'rgb(25, 142, 238)');
  await expect(link).toHaveCSS('outline-style', 'solid');
  await expect(link).toHaveCSS('outline-width', '3px');
});
