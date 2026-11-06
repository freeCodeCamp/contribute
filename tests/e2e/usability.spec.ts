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

test('a docs page keeps the agreed type sizes', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/how-to-setup-freecodecamp-locally/');
  const sizes = await page.evaluate(() => {
    const size = (selector: string) => {
      const element = document.querySelector(selector);
      return element ? getComputedStyle(element).fontSize : null;
    };
    return {
      h1: size('h1'),
      h2: size('.docs-content h2'),
      h3: size('.docs-content h3'),
      body: size('.docs-content > p'),
      item: size('.docs-content li'),
      cell: size('.docs-content td'),
      aside: size('[data-slot="aside-content"]'),
      inlineCode: size('.docs-content > p code'),
      block: size('pre.astro-code'),
      sidebarGroup: size(
        '[data-nb-sidebar] .top-level > li > details > summary'
      ),
      sidebarLink: size('[data-nb-sidebar] li > a'),
      breadcrumb: size('nav[aria-label*="breadcrumb" i] a'),
      toc: size('[data-nb-toc] a')
    };
  });
  expect(sizes).toEqual({
    h1: '42px',
    h2: '35px',
    h3: '29px',
    body: '18px',
    item: '18px',
    cell: '18px',
    aside: '18px',
    inlineCode: '16px',
    block: '14px',
    sidebarGroup: '16px',
    sidebarLink: '16px',
    breadcrumb: '16px',
    toc: '16px'
  });
});

test('content inside a tab keeps the page rhythm', async ({ page }) => {
  await page.goto('/how-to-setup-freecodecamp-locally/');
  const gap = await page
    .locator('[data-nb-tabs-content] .nb-table-scroll')
    .first()
    .evaluate(element => getComputedStyle(element).marginTop);
  expect(gap).toBe('24px');
});

test('a card title keeps the design size', async ({ page }) => {
  await page.goto('/');
  const size = await page
    .locator('[data-slot="card-title"]')
    .first()
    .evaluate(element => getComputedStyle(element).fontSize);
  expect(size).toBe('24px');
});

test('the landing title keeps its display size', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  const size = await page
    .locator('h1')
    .evaluate(element => getComputedStyle(element).fontSize);
  expect(size).toBe('64px');
});

test('text uses only the weights Lato ships', async ({ page }) => {
  await page.goto('/how-to-setup-freecodecamp-locally/');
  const weights = await page.evaluate(() => {
    const seen = new Set<string>();
    for (const element of document.querySelectorAll('body *')) {
      const { fontFamily, fontWeight } = getComputedStyle(element);
      if (!fontFamily.includes('Hack')) seen.add(fontWeight);
    }
    return [...seen].sort();
  });
  expect(weights).toEqual(['400', '700']);
});

test('focus shows the 3 px design ring on each kind of control', async ({
  page
}) => {
  await page.goto('/how-to-setup-freecodecamp-locally/');
  await page.keyboard.press('Tab');
  for (const selector of [
    'a[href="#main-content"], a[href^="#"]',
    'header button',
    '[data-nb-sidebar] li > a',
    '[role="tab"]',
    '.docs-content a',
    '.nb-code-figure pre'
  ]) {
    const target = page.locator(selector).first();
    await target.focus();
    await expect(target, selector).toBeFocused();
    const ring = await target.evaluate(element => {
      const { outlineColor, outlineStyle, outlineWidth } =
        getComputedStyle(element);
      return { outlineColor, outlineStyle, outlineWidth };
    });
    expect(ring, selector).toEqual({
      outlineColor: 'rgb(25, 142, 238)',
      outlineStyle: 'solid',
      outlineWidth: '3px'
    });
  }
});

test('the ring on a code block sits inside its clipped frame', async ({
  page
}) => {
  await page.goto('/how-to-setup-freecodecamp-locally/');
  await page.keyboard.press('Tab');
  const block = page.locator('.nb-code-figure pre').first();
  await block.focus();
  const offset = await block.evaluate(
    element => getComputedStyle(element).outlineOffset
  );
  expect(offset).toBe('-3px');
});

test('the search box shows focus', async ({ page }) => {
  await page.goto('/faq/');
  await page.keyboard.press('Control+k');
  const style = await page
    .locator('[data-search-input]')
    .first()
    .evaluate(element => getComputedStyle(element).outlineStyle);
  expect(style).toBe('solid');
});

test('the sidebar starts under the header', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/faq/');
  const gap = await page.evaluate(() => {
    const header = document.querySelector('header') as Element;
    const rail = document
      .querySelector('[data-nb-sidebar]')
      ?.closest('.sticky');
    return (
      (rail as Element).getBoundingClientRect().top -
      header.getBoundingClientRect().bottom
    );
  });
  expect(gap).toBeLessThanOrEqual(0);
});

test('surfaces have square corners', async ({ page }) => {
  await page.goto('/how-to-setup-freecodecamp-locally/');
  const radii = await page.evaluate(() =>
    [
      '[data-slot="aside"]',
      '.nb-code-figure',
      '.docs-content table',
      '[data-nb-sidebar] li > a',
      'header button'
    ].map(selector => {
      const element = document.querySelector(selector) as Element;
      return getComputedStyle(element).borderTopLeftRadius;
    })
  );
  expect(new Set(radii)).toEqual(new Set(['0px']));
});

test('no surface casts a drop shadow', async ({ page }) => {
  await page.goto('/faq/');
  await page.keyboard.press('Control+k');
  const shadow = await page
    .locator('[data-search-dialog] [data-slot="dialog-content"]')
    .first()
    .evaluate(element => getComputedStyle(element).boxShadow);
  expect(shadow).not.toMatch(/\d+px \d+px [1-9]/);
});

test('Lato has one family with a matched fallback', () => {
  const html = readFileSync('dist/index.html', 'utf8');
  expect(html).not.toContain('--font-lato-ext');
  expect(html).toMatch(
    /font-family:"Lato-\w+ fallback: Arial"[^}]*size-adjust/
  );
  const preloads = html.match(
    /<link[^>]+rel="?preload"?[^>]+as="?font"?[^>]*>/g
  );
  expect(preloads).toHaveLength(2);
});

test('the landing image is a modern format and loads first', async ({
  page
}) => {
  await page.goto('/');
  const image = page.locator('main img').first();
  await expect(image).toHaveAttribute('fetchpriority', 'high');
  await expect(image).toHaveAttribute('src', /\.(avif|webp)/);
});

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

test('two old page URLs still redirect', async ({ request }) => {
  const redirects = {
    '/FAQ': '/faq/',
    '/how-to-work-on-the-docs-theme': '/how-to-work-on-the-docs-site/'
  };
  for (const [path, target] of Object.entries(redirects)) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status(), path).toBe(302);
    expect(new URL(response.headers().location, 'http://x').pathname).toBe(
      target
    );
  }
});

test('every agent route answers with its content type', async ({ request }) => {
  const agentRoutes = {
    '/llms.txt': 'text/plain',
    '/llms-full.txt': 'text/plain',
    '/robots.txt': 'text/plain',
    '/index.md': 'text/markdown',
    '/index.mdx': 'text/mdx',
    '/faq/index.md': 'text/markdown',
    '/faq/index.mdx': 'text/mdx',
    '/.well-known/ard.json': 'application/json',
    '/.well-known/ai-catalog.json': 'application/json',
    '/sitemap-index.xml': 'application/xml',
    '/og.png': 'image/png',
    '/og/faq.png': 'image/png'
  };
  for (const [path, type] of Object.entries(agentRoutes)) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    expect(response.headers()['content-type'], path).toContain(type);
  }
});

test('only Markdown versions of pages ask not to be indexed', async ({
  request
}) => {
  for (const path of [
    '/index.md',
    '/index.mdx',
    '/faq/index.md',
    '/faq/index.mdx'
  ]) {
    const response = await request.head(path);
    expect(response.headers()['x-robots-tag'], path).toBe('noindex');
  }
  for (const path of ['/', '/faq/']) {
    const response = await request.head(path);
    expect(response.headers()['x-robots-tag'], path).toBeUndefined();
  }
});

test('robots.txt states the content signals', async ({ request }) => {
  const body = await (await request.get('/robots.txt')).text();
  expect(body).toContain(
    'Content-Signal: ai-train=yes, search=yes, ai-input=yes'
  );
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
      await page.goto('about:blank');
      await page.goto(`${route}#${id}`);
      await expect(
        page.locator(`[id="${id}"]`),
        `${route}#${id}`
      ).toBeVisible();
    }
  }
});

test('a page opened with a malformed hash throws no error', async ({
  page
}) => {
  const errors: string[] = [];
  page.on('pageerror', ({ message }) => errors.push(message));
  await page.goto('/how-to-setup-freecodecamp-locally/#%E0%A4%A');
  await page.waitForLoadState('networkidle');
  expect(errors).toEqual([]);
});

test('every early focus stop can be seen', async ({ page }) => {
  await page.goto('/faq/');
  for (let stop = 0; stop < 8; stop += 1) {
    await page.keyboard.press('Tab');
    const clipped = await page.evaluate(() => {
      const focused = document.activeElement;
      for (let node = focused; node; node = node.parentElement) {
        const { width, height } = node.getBoundingClientRect();
        const laidOut = getComputedStyle(node).display !== 'contents';
        if (laidOut && (width <= 1 || height <= 1)) return focused?.textContent;
      }
      return null;
    });
    expect(clipped).toBeNull();
  }
});

test('social links can be reached on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  await expect(page.locator('a[aria-label="GitHub"]:visible')).toHaveCount(1);
  await page.goto('/faq/');
  await page
    .getByRole('button', { name: /menu|navigation/i })
    .first()
    .click();
  await expect(page.locator('a[aria-label="GitHub"]:visible')).toHaveCount(1);
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
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto('/basic-git-workflow/');
  const region = page.locator('.nb-table-scroll').first();
  await expect(region).toHaveAttribute('aria-label', /.+/);
  await region.focus();
  await expect(region).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect
    .poll(() => region.evaluate(({ scrollLeft }) => scrollLeft))
    .toBeGreaterThan(0);
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
