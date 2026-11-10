import { existsSync, readdirSync } from 'node:fs';
import { relative } from 'node:path';
import sidebar from '../src/sidebar';

const pages = sidebar.flatMap(section =>
  section.items.filter((item): item is string => typeof item === 'string')
);

it('every sidebar page exists', () => {
  for (const page of pages) {
    expect(existsSync(`src/content/docs/${page}.mdx`), page).toBe(true);
  }
});

it('each page appears once in the sidebar', () => {
  expect(new Set(pages).size).toBe(pages.length);
});

it('every page is in the sidebar or on the agreed list', () => {
  const included = new Set([
    ...pages,
    'index',
    'moderator-onboarding-guide',
    'security-hall-of-fame'
  ]);
  for (const file of readdirSync('src/content/docs', {
    recursive: true,
    withFileTypes: true
  })) {
    if (file.name.endsWith('.mdx')) {
      const page = relative(
        'src/content/docs',
        `${file.parentPath}/${file.name}`
      ).slice(0, -4);
      expect(included.has(page), page).toBe(true);
    }
  }
});

it('the sidebar sections keep their order', () => {
  expect(sidebar.map(section => section.label)).toEqual([
    'Introduction',
    'Code Contributions',
    'Additional Guides',
    'Handbooks (Staff & Mods)',
    'Our Community'
  ]);
});
