import { readFileSync } from 'node:fs';
import { AxeBuilder } from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const WCAG_TAGS = [
  'wcag2a',
  'wcag2aa',
  'wcag21a',
  'wcag21aa',
  'wcag22a',
  'wcag22aa'
];

const SLUGS = [
  'authors-analytics-manual',
  'basic-git-workflow',
  'codebase-best-practices',
  'courses-vscode-extension',
  'curriculum-file-structure',
  'curriculum-help',
  'faq',
  'getting-started',
  'how-to-add-playwright-tests',
  'how-to-catch-outgoing-emails-locally',
  'how-to-create-catalog-items',
  'how-to-enable-new-languages',
  'how-to-fix-merge-conflicts',
  'how-to-help-with-video-challenges',
  'how-to-open-a-pull-request',
  'how-to-setup-freecodecamp-locally',
  'how-to-setup-freecodecamp-mobile-app-locally',
  'how-to-setup-wsl',
  'how-to-work-on-coding-challenges',
  'how-to-work-on-labs',
  'how-to-work-on-language-curricula',
  'how-to-work-on-localized-client-webapp',
  'how-to-work-on-quizzes',
  'how-to-work-on-reviews',
  'how-to-work-on-the-component-library',
  'how-to-work-on-the-docs-site',
  'how-to-work-on-theory-lessons',
  'how-to-work-on-tutorials-that-use-coderoad',
  'how-to-work-on-workshops',
  'moderator-handbook',
  'moderator-onboarding-guide',
  'reply-templates',
  'security-hall-of-fame',
  'security',
  'troubleshooting-development-issues',
  'user-token-workflow',
  'writing-style-guide'
];

const routes = [
  ...readFileSync('dist/sitemap-0.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)
].map(([, loc]) => new URL(loc).pathname);

const openEverything = (page: Page) =>
  page.evaluate(() => {
    document.querySelectorAll('details').forEach(details => {
      details.open = true;
    });
    document.querySelectorAll('[role="tabpanel"]').forEach(panel => {
      panel.removeAttribute('hidden');
    });
  });

for (const route of routes) {
  for (const colorScheme of ['light', 'dark'] as const) {
    test(`axe finds no WCAG A or AA issue on ${route} in ${colorScheme}`, async ({
      page
    }) => {
      await page.emulateMedia({ colorScheme });
      await page.goto(route);
      await openEverything(page);
      const { violations } = await new AxeBuilder({ page })
        .withTags(WCAG_TAGS)
        .analyze();
      expect(
        violations.map(({ id, nodes }) => ({
          id,
          targets: nodes.slice(0, 3).map(({ target }) => target.join(' '))
        }))
      ).toEqual([]);
    });
  }

  test(`${route} keeps its heading and table structure`, async ({ page }) => {
    await page.goto(route);
    await openEverything(page);
    const { violations } = await new AxeBuilder({ page })
      .withRules([
        'heading-order',
        'empty-table-header',
        'label-content-name-mismatch'
      ])
      .analyze();
    expect(
      violations.map(({ id, nodes }) => ({
        id,
        targets: nodes.slice(0, 3).map(({ target }) => target.join(' '))
      }))
    ).toEqual([]);
  });

  test(`${route} does not scroll sideways at 320 px`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto(route);
    await openEverything(page);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test('fonts come from the cache on the next page', async ({ page }) => {
  await page.goto('/faq/');
  await page.evaluate(() => document.fonts.ready);
  await page.goto('/getting-started/');
  await page.evaluate(() => document.fonts.ready);
  const transfers = await page.evaluate(() =>
    performance
      .getEntriesByType('resource')
      .filter(({ name }) => name.endsWith('.woff2'))
      .map(entry => (entry as PerformanceResourceTiming).transferSize)
  );
  expect(transfers.length).toBeGreaterThan(0);
  expect(transfers.every(size => size === 0)).toBe(true);
});

test('every old page keeps its URL', () => {
  expect(routes).toEqual(
    expect.arrayContaining(SLUGS.map(slug => `/${slug}/`))
  );
  expect(routes).toContain('/');
});

test('/intro redirects to /', async ({ request }) => {
  for (const path of ['/intro', '/intro/']) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status(), path).toBe(301);
    expect(new URL(response.headers().location, 'http://x').pathname).toBe('/');
  }
});

test('every internal link and fragment resolves', async ({ request }) => {
  test.setTimeout(240_000);
  const htmlByRoute = new Map<string, string>();
  const load = async (route: string) => {
    const cached = htmlByRoute.get(route);
    if (cached !== undefined) return cached;
    const response = await request.get(route);
    const html = response.ok() ? await response.text() : '';
    htmlByRoute.set(route, html);
    return html;
  };
  const broken: string[] = [];
  for (const route of routes) {
    const html = await load(route);
    for (const [, href] of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
      if (!/^[/#]/.test(href) || href.startsWith('//')) continue;
      const { pathname, hash } = new URL(href, `http://x${route}`);
      if (/\.[a-z0-9]+$/i.test(pathname)) continue;
      const target = await load(pathname);
      if (target === '') {
        broken.push(`${route} -> ${href}`);
        continue;
      }
      const id = decodeURIComponent(hash.slice(1));
      if (id && !target.includes(`id="${id}"`)) {
        broken.push(`${route} -> ${href}`);
      }
    }
  }
  expect([...new Set(broken)]).toEqual([]);
});

test('a link to a heading inside a tab opens that tab', async ({ page }) => {
  test.setTimeout(120_000);
  const tabbedRoutes = routes.filter(route => {
    const file = `dist${route}index.html`;
    return readFileSync(file, 'utf8').includes('role="tabpanel"');
  });
  expect(tabbedRoutes.length).toBeGreaterThan(0);
  for (const route of tabbedRoutes) {
    await page.goto(route);
    const ids = await page.evaluate(() =>
      [
        ...document.querySelectorAll(
          '[role="tabpanel"] h2[id], [role="tabpanel"] h3[id], [role="tabpanel"] h4[id]'
        )
      ].map(({ id }) => id)
    );
    for (const id of ids) {
      await page.goto(`${route}#${id}`);
      await expect(
        page.locator(`[id="${id}"]`),
        `${route}#${id}`
      ).toBeVisible();
    }
  }
});

test('the sidebar navigation has a name', async ({ page }) => {
  await page.goto('/faq/');
  await expect(page.locator('[data-nb-sidebar-tree] nav')).toHaveAttribute(
    'aria-label',
    /.+/
  );
});

test('a wide table can be reached and scrolled by keyboard', async ({
  page
}) => {
  await page.goto('/basic-git-workflow/');
  const region = page.locator('.nb-table-scroll').first();
  await expect(region).toHaveAttribute('tabindex', '0');
  await expect(region).toHaveAttribute('aria-label', /.+/);
});

test('the search button name holds its visible text', async ({ page }) => {
  await page.goto('/faq/');
  await expect(
    page.getByRole('button', { name: /^Search/ }).first()
  ).toBeVisible();
});

test('search announces how many results it found', async ({ page }) => {
  await page.goto('/faq/');
  await page.keyboard.press('Control+k');
  await page.locator('[data-search-input]').first().fill('git');
  await expect(
    page.locator('[data-search-dialog] [role="status"]').first()
  ).toHaveText(/\d+ results?/);
});

test('the mobile page menu shows focus in forced colours', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.emulateMedia({ forcedColors: 'active' });
  await page.goto('/how-to-setup-freecodecamp-locally/');
  const select = page.locator('[data-nb-mobile-toc] select');
  await select.focus();
  const outline = await select.evaluate(element => {
    const { outlineStyle, outlineWidth } = getComputedStyle(element);
    return { outlineStyle, outlineWidth };
  });
  expect(outline.outlineStyle).not.toBe('none');
  expect(outline.outlineWidth).not.toBe('0px');
});
