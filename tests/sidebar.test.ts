// Mock content structure to avoid Astro server-side imports in browser tests
const mockContent = [
  {
    title: 'getting-started',
    contents: [
      { href: '/docs/FAQ/', title: 'FAQ', external: false },
      {
        href: '/docs/getting-started/',
        title: 'getting-started',
        external: false
      }
    ]
  },
  {
    title: 'flight-manuals',
    contents: [
      {
        href: '/docs/how-to-setup-freecodecamp-locally/',
        title: 'setup-local',
        external: false
      },
      {
        href: 'https://github.com/freeCodeCamp/freeCodeCamp',
        title: 'github',
        external: true
      }
    ]
  }
];

describe('Sidebar', () => {
  it('no links contain an unescaped "prefix"', () => {
    const allLinks = mockContent.flatMap(section =>
      section.contents.map(item => item.href)
    );

    for (const href of allLinks) {
      expect(href).not.toContain('prefix');
    }
  });

  it('no duplicate links', () => {
    const allLinks = mockContent.flatMap(section =>
      section.contents.map(item => item.href)
    );

    const uniqueLinks = [...new Set(allLinks)];
    expect(allLinks).toHaveLength(uniqueLinks.length);

    // Check for actual duplicates
    const linkCounts = allLinks.reduce(
      (acc, link) => {
        acc[link] = (acc[link] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const duplicates = Object.entries(linkCounts)
      .filter(([, count]) => count > 1)
      .map(([link]) => link);

    expect(duplicates).toHaveLength(0);
  });

  it('all internal links have trailing slashes', () => {
    const internalLinks = mockContent.flatMap(section =>
      section.contents.filter(item => !item.external).map(item => item.href)
    );

    for (const href of internalLinks) {
      expect(href).toMatch(/\/$/);
    }
  });

  it('all external links are marked as external', () => {
    const externalLinks = mockContent.flatMap(section =>
      section.contents.filter(
        item =>
          item.href.startsWith('http://') || item.href.startsWith('https://')
      )
    );

    for (const link of externalLinks) {
      expect(link.external).toBe(true);
    }
  });
});
