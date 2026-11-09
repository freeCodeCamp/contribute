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
    test(`${route} meets WCAG A and AA in ${colorScheme}`, async ({ page }) => {
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

  test(`${route} fits a 320 px screen`, async ({ page }) => {
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

test('a card title is bold at the body size', async ({ page }) => {
  await page.goto('/');
  const title = page.locator('[data-slot="card-title"]').first();
  await expect(title).toHaveCSS('font-size', '18px');
  await expect(title).toHaveCSS('font-weight', '700');
});

for (const colorScheme of ['light', 'dark'] as const) {
  test(`each aside type has its own tint and border (${colorScheme})`, async ({
    page
  }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto('/how-to-setup-freecodecamp-locally/');
    const looks = await page.evaluate(() =>
      ['note', 'tip', 'caution', 'danger'].map(type => {
        const style = getComputedStyle(
          document.querySelector(
            `[data-slot="aside"][data-type="${type}"]`
          ) as Element
        );
        return {
          fill: style.backgroundColor,
          edge: style.borderTopColor,
          width: style.borderTopWidth
        };
      })
    );
    expect(new Set(looks.map(({ fill }) => fill)).size).toBe(4);
    expect(new Set(looks.map(({ edge }) => edge)).size).toBe(4);
    expect(new Set(looks.map(({ width }) => width))).toEqual(new Set(['1px']));
  });
}

for (const route of [
  '/how-to-setup-freecodecamp-locally/',
  '/how-to-work-on-the-docs-site/'
]) {
  test(`${route} has no card around a table or list`, async ({ page }) => {
    await page.goto(route);
    await expect(
      page.locator('[data-slot="card"]:has(table, ul, ol)')
    ).toHaveCount(0);
  });
}

test('a long command in a table cell wraps between words', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/how-to-setup-freecodecamp-locally/');
  const code = page
    .locator('.docs-content td code')
    .filter({ hasText: 'FCC_SUPERBLOCK=' });
  await expect(code).toHaveCSS('overflow-wrap', 'normal');
  const lines = await code.evaluate(element => element.getClientRects().length);
  expect(lines).toBeGreaterThan(1);
});

test('inline code has a tint and no border', async ({ page }) => {
  await page.goto('/how-to-work-on-coding-challenges/');
  const code = page
    .locator('.docs-content p code:not([class])')
    .filter({ hasNot: page.locator('xpath=ancestor::a') })
    .first();
  await expect(code).toHaveCSS('border-top-width', '0px');
  await expect(code).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
});

for (const [viewport, least] of [
  [1280, 652],
  [1440, 720],
  [1920, 720]
] as const) {
  test(`the docs column is at least as wide as main at ${viewport} px`, async ({
    page
  }) => {
    await page.setViewportSize({ width: viewport, height: 900 });
    await page.goto('/how-to-setup-freecodecamp-locally/');
    const { width } = (await page.locator('.docs-content').boundingBox()) as {
      width: number;
    };
    expect(width).toBeGreaterThanOrEqual(least);
  });
}

test('a landing card is at least as wide as main at 1280 px', async ({
  page
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  const { width } = (await page
    .locator('[data-slot="card"]')
    .first()
    .boundingBox()) as { width: number };
  expect(width).toBeGreaterThanOrEqual(528);
});

test('the landing title stays on one line at 1280 px', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  const lines = await page.locator('h1').evaluate(element => {
    const { lineHeight } = getComputedStyle(element);
    return element.getBoundingClientRect().height / parseFloat(lineHeight);
  });
  expect(Math.round(lines)).toBe(1);
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

test('a code block shows its copy button and no language label', async ({
  page
}) => {
  await page.goto('/how-to-setup-freecodecamp-locally/');
  const figure = page.locator('.nb-code-figure:not(.nb-code-figure-titled)');
  const label = await figure
    .first()
    .evaluate(element => getComputedStyle(element, '::before').content);
  expect(label).toBe('none');
  await expect(figure.first().locator('button.nb-code-copy')).toHaveCSS(
    'opacity',
    '1'
  );
});

for (const [colorScheme, surface, theme, ink] of [
  ['light', 'rgb(255, 255, 255)', 'github-light-default', '#1f2328'],
  ['dark', 'rgb(27, 27, 50)', 'catppuccin-mocha', '#cdd6f4']
] as const) {
  test(`code sits on the card surface in ${theme} (${colorScheme})`, async ({
    page
  }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto('/how-to-work-on-coding-challenges/');
    const figure = page.locator('.nb-code-figure').first();
    await expect(figure).toHaveCSS('background-color', surface);
    const themeInk = await figure
      .locator('pre')
      .evaluate(
        (element, mode) =>
          getComputedStyle(element).getPropertyValue(`--shiki-${mode}`),
        colorScheme
      );
    expect(themeInk.toLowerCase()).toBe(ink);
  });
}

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

test('Lato has a matched fallback and two preloads', () => {
  const html = readFileSync('dist/index.html', 'utf8');
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

test('Markdown versions of pages carry noindex', async ({ request }) => {
  for (const path of [
    '/index.md',
    '/index.mdx',
    '/faq/index.md',
    '/faq/index.mdx'
  ]) {
    const response = await request.head(path);
    expect(response.headers()['x-robots-tag'], path).toBe('noindex');
  }
});

test('HTML pages can be indexed', async ({ request }) => {
  test.skip(Boolean(process.env.USABILITY_BASE_URL));
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

test('a page with a malformed hash still loads', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', ({ message }) => errors.push(message));
  await page.goto('/how-to-setup-freecodecamp-locally/#%E0%A4%A');
  await page.waitForLoadState('networkidle');
  expect(errors).toEqual([]);
  await expect(page.locator('h1')).toBeVisible();
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
  await expect(
    page.locator('a[rel~="me"][aria-label^="GitHub"]:visible')
  ).toHaveCount(1);
  await page.goto('/faq/');
  await page
    .getByRole('button', { name: /menu|navigation/i })
    .first()
    .click();
  await expect(
    page.locator('a[rel~="me"][aria-label^="GitHub"]:visible')
  ).toHaveCount(1);
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

test('a docs page shows when it last changed', async ({ page }) => {
  await page.goto('/faq/');
  await expect(page.locator('main time[datetime]').first()).toBeVisible();
});

test('every page has its own title, canonical URL and social card', async ({
  request
}) => {
  const titles: string[] = [];
  for (const route of routes) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(200);
    const html = await response.text();
    const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1].trim();
    expect(title, route).toBeTruthy();
    titles.push(title ?? '');
    const tags = [...html.matchAll(/<(link|meta)\b[^>]*>/gi)].map(
      ([tag, name]) => ({
        name: name.toLowerCase(),
        attributes: Object.fromEntries(
          [
            ...tag.matchAll(
              /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g
            )
          ].map(([, key, doubleQuoted, singleQuoted, unquoted]) => [
            key.toLowerCase(),
            doubleQuoted ?? singleQuoted ?? unquoted
          ])
        )
      })
    );
    expect(
      tags
        .filter(
          ({ name, attributes }) =>
            name === 'link' && attributes.rel === 'canonical'
        )
        .map(({ attributes }) => attributes.href),
      route
    ).toEqual([`https://contribute.freecodecamp.org${route}`]);
    const images = tags
      .filter(
        ({ name, attributes }) =>
          name === 'meta' && attributes.property === 'og:image'
      )
      .map(({ attributes }) => attributes.content);
    expect(images, route).toHaveLength(1);
    expect(images[0], route).toBeTruthy();
    const imageURL = new URL(
      images[0],
      `https://contribute.freecodecamp.org${route}`
    );
    const image = await request.get(`${imageURL.pathname}${imageURL.search}`);
    expect(image.status(), route).toBe(200);
    expect(image.headers()['content-type'], route).toContain('image/png');
  }
  expect(new Set(titles).size).toBe(routes.length);
});

test('llms.txt lists the Markdown version of every page', async ({
  request
}) => {
  const response = await request.get('/llms.txt');
  expect(response.status()).toBe(200);
  const body = await response.text();
  const targets = [...body.matchAll(/\[[^\]\r\n]*\]\(([^\s)]+)\)/g)].map(
    ([, target]) => target
  );
  expect(targets.sort()).toEqual(
    routes
      .map(route => `https://contribute.freecodecamp.org${route}index.md`)
      .sort()
  );
});

test('a Markdown page starts with its title', async ({ request }) => {
  const response = await request.get('/faq/index.md');
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toMatch(/^---/);
  expect(body).toContain('title: "Frequently Asked Questions"');
});

test('the sitemap dates every page', () => {
  const sitemap = readFileSync('dist/sitemap-0.xml', 'utf8');
  expect([...sitemap.matchAll(/<lastmod>[^<]+<\/lastmod>/g)]).toHaveLength(
    routes.length
  );
});

test('hashed fonts are cached for a year', async ({ page, request }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/faq/');
  await page.evaluate(() => document.fonts.ready);
  const font = await page.evaluate(() =>
    performance
      .getEntriesByType('resource')
      .map(({ name }) => name)
      .find(name => {
        const path = new URL(name).pathname;
        return /^\/_astro\/(?:[^/]+\/)*(?:[a-f0-9]{8,}|[^/]+\.[\w-]+)\.woff2$/.test(
          path
        );
      })
  );
  expect(font).toBeTruthy();
  const response = await request.get(font!);
  expect(response.status()).toBe(200);
  expect(response.headers()['cache-control']).toContain('max-age=31536000');
  expect(response.headers()['cache-control']).toContain('immutable');
});

test('a page stays still while fonts load', async ({ browser, baseURL }) => {
  for (const route of ['/', '/faq/', '/how-to-setup-freecodecamp-locally/']) {
    const context = await browser.newContext({
      baseURL,
      viewport: { width: 1280, height: 900 }
    });
    let total: number;
    try {
      const page = await context.newPage();
      await page.addInitScript(() => {
        const state = window as unknown as {
          layoutShiftTotal: number;
          layoutShiftObserver: PerformanceObserver;
        };
        state.layoutShiftTotal = 0;
        state.layoutShiftObserver = new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            const shift = entry as PerformanceEntry & {
              hadRecentInput: boolean;
              value: number;
            };
            if (!shift.hadRecentInput) state.layoutShiftTotal += shift.value;
          }
        });
        state.layoutShiftObserver.observe({
          type: 'layout-shift',
          buffered: true
        });
      });
      await page.goto(route);
      total = await page.evaluate(async () => {
        await document.fonts.ready;
        await new Promise(resolve => setTimeout(resolve, 500));
        const state = window as unknown as {
          layoutShiftTotal: number;
          layoutShiftObserver: PerformanceObserver;
        };
        for (const entry of state.layoutShiftObserver.takeRecords()) {
          const shift = entry as PerformanceEntry & {
            hadRecentInput: boolean;
            value: number;
          };
          if (!shift.hadRecentInput) state.layoutShiftTotal += shift.value;
        }
        state.layoutShiftObserver.disconnect();
        return state.layoutShiftTotal;
      });
    } finally {
      await context.close();
    }
    expect(total, route).toBeLessThanOrEqual(0.05);
  }
});

test('the mobile page menu shows focus in forced colours', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.emulateMedia({ forcedColors: 'active' });
  await page.goto('/how-to-setup-freecodecamp-locally/');
  const select = page.locator('[data-nb-mobile-toc] select');
  await select.focus();
  await expect(select).toHaveCSS('outline-style', 'solid');
  await expect(select).toHaveCSS('outline-width', '3px');
});

for (const [width, height] of [
  [375, 812],
  [1024, 768],
  [1440, 900]
]) {
  test(`Shift+Tab never hides focus under the sticky bars at ${width} px`, async ({
    page
  }) => {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/how-to-setup-freecodecamp-locally/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.locator('main a:visible').last().focus();
    const hidden: string[] = [];
    for (let stop = 0; stop < 40; stop++) {
      await page.keyboard.press('Shift+Tab');
      const covered = await page.evaluate(() => {
        const element = document.activeElement as HTMLElement | null;
        if (!element || element === document.body) return null;
        const box = element.getBoundingClientRect();
        const bars = [...document.querySelectorAll<HTMLElement>('body *')]
          .filter(bar => {
            const { position } = getComputedStyle(bar);
            if (position !== 'sticky' && position !== 'fixed') return false;
            if (bar.contains(element) || !bar.checkVisibility()) return false;
            const edge = bar.getBoundingClientRect();
            return (
              edge.top < window.innerHeight * 0.3 &&
              edge.height < window.innerHeight * 0.4 &&
              edge.left < box.right &&
              edge.right > box.left
            );
          })
          .map(bar => bar.getBoundingClientRect().bottom);
        const barBottom = Math.max(0, ...bars);
        return box.bottom <= barBottom && box.height > 0
          ? element.textContent?.trim().slice(0, 40) || element.tagName
          : null;
      });
      if (covered) hidden.push(covered);
    }
    expect(hidden).toEqual([]);
  });
}

for (const width of [375, 1280]) {
  test(`a heading link lands just under the sticky bars at ${width} px`, async ({
    page
  }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/how-to-work-on-the-docs-site/');
    const id = await page
      .locator('.docs-content h2[id]')
      .nth(2)
      .getAttribute('id');
    await page.goto(`/how-to-work-on-the-docs-site/#${id}`);
    const gap = await page.evaluate(target => {
      const heading = document.getElementById(target)!;
      const barBottom = Math.max(
        ...[...document.querySelectorAll<HTMLElement>('body *')]
          .filter(bar => {
            const { position } = getComputedStyle(bar);
            const edge = bar.getBoundingClientRect();
            return (
              (position === 'sticky' || position === 'fixed') &&
              bar.checkVisibility() &&
              edge.top < window.innerHeight * 0.3 &&
              edge.height < window.innerHeight * 0.4
            );
          })
          .map(bar => bar.getBoundingClientRect().bottom)
      );
      return heading.getBoundingClientRect().top - barBottom;
    }, id!);
    expect(gap).toBeGreaterThanOrEqual(0);
    expect(gap).toBeLessThanOrEqual(48);
  });
}

test('search results hold no links inside an option', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/faq/');
  await page.keyboard.press('Control+k');
  await page.locator('[data-search-input]').first().fill('git');
  await expect(page.locator('[role="option"]').first()).toBeVisible();
  await expect(
    page.locator('[data-search-results] [role="option"] :is(a, button)')
  ).toHaveCount(0);
  const results = await new AxeBuilder({ page })
    .include('[data-search-dialog][open]')
    .withTags(WCAG_TAGS)
    .analyze();
  expect(results.violations.map(violation => violation.id)).toEqual([]);
});

test('the highlighted search result has an outline, not only a colour', async ({
  page
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/faq/');
  await page.keyboard.press('Control+k');
  const input = page.locator('[data-search-input]').first();
  await input.fill('git');
  await expect(page.locator('[role="option"]').first()).toBeVisible();
  await input.press('ArrowDown');
  const highlighted = page.locator('[role="option"][data-highlighted]');
  await expect(highlighted).toHaveCount(1);
  await expect(highlighted).toHaveCSS('outline-style', 'solid');
  await expect(highlighted).toHaveCSS('outline-width', '2px');
});

for (const route of [
  '/',
  '/getting-started/',
  '/how-to-work-on-localized-client-webapp/',
  '/how-to-setup-freecodecamp-locally/'
]) {
  test(`${route} exposes no unnamed image`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(route);
    await openEverything(page);
    const tree = await page.locator('body').ariaSnapshot();
    expect(tree).not.toMatch(/- img\s*$/m);
  });
}

test('an aside with its own title still says its type', async ({ page }) => {
  await page.goto('/how-to-setup-freecodecamp-locally/');
  await expect(
    page.getByRole('note', { name: 'Danger: Windows users: read this first' })
  ).toHaveCount(1);
  await expect(
    page.getByRole('note', { name: 'Caution: Versions matter' })
  ).toHaveCount(1);
});

test('a scrolling table is named by its column headers', async ({ page }) => {
  await page.goto('/how-to-work-on-the-docs-site/');
  const regions = page.locator('.nb-table-scroll[role="region"]');
  await expect(regions.first()).toBeVisible();
  for (const region of await regions.all()) {
    await expect(region).toHaveAttribute('aria-label', /^Table: \S/);
  }
});

test('jumping to a heading inside a closed tab opens that tab', async ({
  page
}) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto('/how-to-setup-freecodecamp-locally/');
  const slug = await page.evaluate(() => {
    const options = document.querySelectorAll<HTMLOptionElement>(
      '[data-nb-mobile-toc-select] option'
    );
    for (const option of options) {
      const heading = document.getElementById(option.value);
      if (heading?.closest('[role="tabpanel"]') && !heading.checkVisibility())
        return option.value;
    }
    return null;
  });
  if (!slug) throw new Error('no heading inside a closed tab');
  await page.locator('[data-nb-mobile-toc-select]').selectOption(slug);
  await expect(page.locator(`[id="${slug}"]`)).toBeInViewport();
});

test('the page outline is one named nav with nested lists', async ({
  page
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/getting-started/');
  await expect(
    page.getByRole('complementary', { name: 'On this page' })
  ).toHaveCount(0);
  const nav = page.getByRole('navigation', { name: 'On this page' });
  await expect(nav).toBeVisible();
  const nested = nav.getByRole('list').getByRole('list');
  await expect(nested.first()).toBeVisible();
  const linkCount = await nav.getByRole('link').count();
  const topLevel = await nav.locator(':scope > ul > li > a').count();
  expect(topLevel).toBeLessThan(linkCount);
});

test('links that open a new tab say so', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  for (const route of ['/faq/', '/how-to-setup-freecodecamp-locally/']) {
    await page.goto(route);
    const links = page.locator('a[target="_blank"]:visible');
    await expect(links.first()).toBeVisible();
    for (const link of await links.all()) {
      await expect(link, route).toHaveAccessibleName(/opens in a new tab/);
      const visible = (await link.innerText()).trim().replace(/\s+/g, ' ');
      if (visible)
        await expect(link, route).toHaveAccessibleName(
          new RegExp(visible.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        );
    }
  }
});

test('cards keep a border in forced colours', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' });
  await page.goto('/getting-started/');
  for (const slot of ['link-card', 'card']) {
    const card = page.locator(`[data-slot="${slot}"]`).first();
    await expect(card).toBeVisible();
    await expect(card).toHaveCSS('border-top-style', 'solid');
    await expect(card).toHaveCSS('border-top-width', '1px');
  }
});
