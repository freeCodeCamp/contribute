import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const fromRoot = (path: string) => resolve(process.cwd(), path);

describe('home page', () => {
  it('serves the landing page from the docs collection at /', () => {
    expect(existsSync(fromRoot('src/content/docs/index.mdx'))).toBe(true);
    expect(existsSync(fromRoot('src/content/docs/intro.mdx'))).toBe(false);
    expect(existsSync(fromRoot('src/pages/index.astro'))).toBe(false);
  });

  it('keeps only the agreed redirects', () => {
    const rules = readFileSync(fromRoot('public/_redirects'), 'utf8')
      .split('\n')
      .filter(Boolean);

    expect(rules).toEqual([
      '/intro / 301',
      '/intro/ / 301',
      '/FAQ /faq/ 302',
      '/how-to-work-on-the-docs-theme /how-to-work-on-the-docs-site/ 302'
    ]);
  });

  it('has no script for old hash links', () => {
    expect(existsSync(fromRoot('src/modules/redirect.ts'))).toBe(false);
  });
});
