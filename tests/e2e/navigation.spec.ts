import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 1280, height: 900 } });

test('the sidebar marks the current page', async ({ page }) => {
  await page.goto('/how-to-work-on-labs/');
  const current = page.locator('[data-nb-sidebar] [aria-current="page"]');
  await expect(current).toHaveCount(1);
  await expect(current).toHaveAttribute('href', '/how-to-work-on-labs/');
  await expect(current.locator('xpath=ancestor::details[1]')).toHaveJSProperty(
    'open',
    true
  );
});

test('a sidebar link opens its page', async ({ page }) => {
  await page.goto('/how-to-work-on-labs/');
  await page.locator('[data-nb-sidebar] a[href="/faq/"]').click();
  await expect(page).toHaveURL(url => url.pathname === '/faq/');
});

test('a collapsed sidebar group stays collapsed on the next page', async ({
  page
}) => {
  await page.goto('/faq/');
  const summary = page
    .locator('[data-nb-sidebar] summary')
    .filter({ hasText: 'Handbooks' });
  await summary.click();
  await page.locator('[data-nb-sidebar] a[href="/security/"]').click();
  await expect(page).toHaveURL(url => url.pathname === '/security/');
  await expect(summary.locator('..')).toHaveJSProperty('open', false);
});

test('the sidebar filter narrows the list and Escape restores it', async ({
  page
}) => {
  await page.goto('/faq/');
  const input = page.locator('[data-nb-sidebar-filter-input]');
  const links = page.locator('[data-nb-sidebar] a:visible');
  await input.fill('lab');
  await expect(links).toHaveCount(1);
  await expect(links).toHaveText('Work on Lab Challenges');
  await input.press('Escape');
  await expect(links).toHaveCount(38);
  await expect(input).toHaveValue('');
});

test('pressing slash focuses the sidebar filter', async ({ page }) => {
  await page.goto('/faq/');
  await page.locator('h1').click();
  await page.keyboard.press('/');
  await expect(page.locator('[data-nb-sidebar-filter-input]')).toBeFocused();
});

test('community links open in a new tab', async ({ page }) => {
  await page.goto('/faq/');
  const links = page.locator('[data-nb-sidebar] a[href^="http"]');
  await expect(links).toHaveCount(3);
  await expect(links).toHaveText(['GitHub', 'Discourse Forum', 'Chat Server']);
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener');
  }
});

test('the phone menu opens, moves focus and closes with Escape', async ({
  page
}) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/faq/');
  const open = page.getByRole('button', {
    name: 'Open navigation',
    exact: true
  });
  await open.click();
  await expect(open).toHaveAttribute('aria-expanded', 'true');
  await expect(
    page.getByRole('button', { name: 'Close sidebar', exact: true })
  ).toBeFocused();
  await expect(page.locator('[data-nb-sidebar] a:visible')).toHaveCount(38);
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-nb-sidebar] a:visible')).toHaveCount(0);
  await expect(open).toBeFocused();
});

test('a phone menu link opens its page', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/faq/');
  await page
    .getByRole('button', { name: 'Open navigation', exact: true })
    .click();
  await page.locator('[data-nb-sidebar] a[href="/security/"]').click();
  await expect(page).toHaveURL(url => url.pathname === '/security/');
});

test('the skip link comes first and moves to the content', async ({ page }) => {
  await page.goto('/faq/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content', exact: true })
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(url => url.hash === '#main-content');
});

test('a breadcrumb leads home', async ({ page }) => {
  await page.goto('/how-to-work-on-labs/');
  const home = page.locator('nav[aria-label*="breadcrumb" i] a').first();
  await expect(home).toHaveText('Home');
  await home.click();
  await expect(page).toHaveURL(url => url.pathname === '/');
});

test('next and previous links follow the sidebar order', async ({ page }) => {
  const start = '/how-to-work-on-labs/';
  await page.goto(start);
  const hrefs = await page
    .locator('[data-nb-sidebar] a')
    .evaluateAll(links => links.map(link => link.getAttribute('href')));
  const index = hrefs.indexOf(start);
  await expect(page.locator('a[rel="prev"]')).toHaveAttribute(
    'href',
    hrefs[index - 1]!
  );
  const next = page.locator('a[rel="next"]');
  await expect(next).toHaveAttribute('href', hrefs[index + 1]!);
  await next.click();
  await expect(page).toHaveURL(url => url.pathname === hrefs[index + 1]);
  const previous = page.locator('a[rel="prev"]');
  await expect(previous).toHaveAttribute('href', start);
  await previous.click();
  await expect(page).toHaveURL(url => url.pathname === start);
});

test('the first and last pages have one pager link', async ({ page }) => {
  await page.goto('/getting-started/');
  const pager = page.locator('a[rel="prev"], a[rel="next"]');
  await expect(pager).toHaveCount(1);
  await expect(pager).toHaveAttribute('rel', 'next');
  await expect(pager).toHaveAttribute('href', '/faq/');
  await page.goto('/how-to-help-with-video-challenges/');
  await expect(pager).toHaveCount(1);
  await expect(pager).toHaveAttribute('rel', 'prev');
});

test('the page contents link moves to its heading', async ({ page }) => {
  await page.goto('/how-to-setup-freecodecamp-locally/');
  const link = page.locator(
    '[data-nb-toc] a[href="#choose-where-to-run-freecodecamp"]'
  );
  await link.click();
  await expect(page).toHaveURL(
    url => url.hash === '#choose-where-to-run-freecodecamp'
  );
  await expect(link).toHaveAttribute('aria-current', 'true');
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document
            .getElementById('choose-where-to-run-freecodecamp')!
            .getBoundingClientRect().top -
          document.querySelector('header')!.getBoundingClientRect().bottom
      )
    )
    .toBeGreaterThanOrEqual(0);
});

test('the phone page menu jumps to a heading', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/how-to-setup-freecodecamp-locally/');
  await page
    .locator('[data-nb-mobile-toc] select')
    .selectOption('choose-where-to-run-freecodecamp');
  await expect
    .poll(() =>
      page.locator('#choose-where-to-run-freecodecamp').evaluate(heading => {
        const top = heading.getBoundingClientRect().top;
        return top >= 0 && top <= 450;
      })
    )
    .toBe(true);
});

test('a heading link points at its heading', async ({ page }) => {
  await page.goto('/faq/');
  const heading = page.locator('.docs-content h2[id]').first();
  const id = await heading.getAttribute('id');
  await heading.hover();
  const link = heading.locator('a.heading-anchor');
  await expect(link).toHaveAccessibleName(/^Copy link to/);
  await link.click();
  await expect(page).toHaveURL(url => url.hash === `#${id}`);
});

test('the landing page leads to getting started', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Contribute to freeCodeCamp');
  await page
    .getByRole('link', { name: 'Get Started', exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(url => url.pathname === '/getting-started/');
});

test('the 404 page offers a way home', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist/');
  await expect.poll(() => response?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText('Page not found');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex'
  );
  await expect(
    page.getByRole('main').getByRole('link', { name: 'Back home', exact: true })
  ).toHaveAttribute('href', '/');
});
