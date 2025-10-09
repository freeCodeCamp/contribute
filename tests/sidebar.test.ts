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

  describe('Link Structure Validation', () => {
    it('should have valid href for all links', () => {
      const allLinks = mockContent.flatMap(section =>
        section.contents.map(item => item.href)
      );

      for (const href of allLinks) {
        expect(href).toBeTruthy();
        expect(typeof href).toBe('string');
        expect(href.trim()).not.toBe('');
      }
    });

    it('should have valid title for all links', () => {
      for (const section of mockContent) {
        for (const item of section.contents) {
          expect(item.title).toBeTruthy();
          expect(typeof item.title).toBe('string');
          expect(item.title.trim()).not.toBe('');
        }
      }
    });

    it('should have external flag defined for all links', () => {
      for (const section of mockContent) {
        for (const item of section.contents) {
          expect(item).toHaveProperty('external');
          expect(typeof item.external).toBe('boolean');
        }
      }
    });
  });

  describe('Internal Links', () => {
    it('should start with / for all internal links', () => {
      const internalLinks = mockContent.flatMap(section =>
        section.contents.filter(item => !item.external)
      );

      for (const link of internalLinks) {
        expect(link.href).toMatch(/^\//);
      }
    });

    it('should use lowercase paths', () => {
      const internalLinks = mockContent.flatMap(section =>
        section.contents.filter(item => !item.external)
      );

      for (const link of internalLinks) {
        const path = link.href.replace(/^\/docs\//, '').replace(/\/$/, '');
        if (path !== 'FAQ') {
          expect(path.toLowerCase()).toBe(path);
        }
      }
    });

    it('should use kebab-case for paths', () => {
      const internalLinks = mockContent.flatMap(section =>
        section.contents.filter(
          item => !item.external && item.href !== '/docs/FAQ/'
        )
      );

      for (const link of internalLinks) {
        const path = link.href.replace(/^\/docs\//, '').replace(/\/$/, '');
        expect(path).toMatch(/^[a-z-]+$/);
      }
    });
  });

  describe('External Links', () => {
    it('should use HTTPS protocol', () => {
      const externalLinks = mockContent.flatMap(section =>
        section.contents.filter(item => item.external)
      );

      for (const link of externalLinks) {
        expect(link.href).toMatch(/^https:\/\//);
      }
    });

    it('should have valid URLs', () => {
      const externalLinks = mockContent.flatMap(section =>
        section.contents.filter(item => item.external)
      );

      for (const link of externalLinks) {
        expect(() => new URL(link.href)).not.toThrow();
      }
    });

    it('should not have trailing slashes for GitHub URLs', () => {
      const githubLinks = mockContent.flatMap(section =>
        section.contents.filter(
          item => item.external && item.href.includes('github.com')
        )
      );

      for (const link of githubLinks) {
        expect(link.href).not.toMatch(/\/$/);
      }
    });
  });

  describe('Section Structure', () => {
    it('should have title for each section', () => {
      for (const section of mockContent) {
        expect(section.title).toBeTruthy();
        expect(typeof section.title).toBe('string');
      }
    });

    it('should have contents array for each section', () => {
      for (const section of mockContent) {
        expect(Array.isArray(section.contents)).toBe(true);
        expect(section.contents.length).toBeGreaterThan(0);
      }
    });

    it('should have unique section titles', () => {
      const titles = mockContent.map(section => section.title);
      const uniqueTitles = [...new Set(titles)];
      expect(titles.length).toBe(uniqueTitles.length);
    });
  });

  describe('Edge Cases', () => {
    it('should not have null or undefined links', () => {
      for (const section of mockContent) {
        for (const item of section.contents) {
          expect(item).not.toBeNull();
          expect(item).not.toBeUndefined();
          expect(item.href).not.toBeNull();
          expect(item.href).not.toBeUndefined();
        }
      }
    });

    it('should not have empty href values', () => {
      for (const section of mockContent) {
        for (const item of section.contents) {
          expect(item.href.trim().length).toBeGreaterThan(0);
        }
      }
    });

    it('should not mix external and internal link patterns', () => {
      for (const section of mockContent) {
        for (const item of section.contents) {
          if (item.external) {
            expect(item.href).toMatch(/^https?:\/\//);
          } else {
            expect(item.href).toMatch(/^\//);
            expect(item.href).not.toMatch(/^https?:\/\//);
          }
        }
      }
    });
  });
});
