import { describe, it, expect } from 'vitest';

describe('URL Patterns and Path Validation', () => {
  const baseUrl = 'https://contribute.freecodecamp.org';

  describe('Base URL Structure', () => {
    it('should use HTTPS protocol', () => {
      expect(baseUrl).toMatch(/^https:\/\//);
    });

    it('should have valid domain', () => {
      expect(baseUrl).toContain('freecodecamp.org');
    });

    it('should use subdomain structure', () => {
      expect(baseUrl).toMatch(/https:\/\/[a-z]+\.freecodecamp\.org/);
    });

    it('should not have trailing slash', () => {
      expect(baseUrl).not.toMatch(/\/$/);
    });

    it('should have contribute subdomain', () => {
      expect(baseUrl).toContain('contribute.');
    });
  });

  describe('Path Pattern Validation', () => {
    const validPaths = [
      '/intro',
      '/faq',
      '/how-to-setup-freecodecamp-locally',
      '/how-to-translate-files',
      '/how-to-work-on-coding-challenges',
      '/moderator-handbook'
    ];

    it('should validate path format', () => {
      const pathPattern = /^\/[a-z0-9-]+$/;

      for (const path of validPaths) {
        expect(path).toMatch(pathPattern);
      }
    });

    it('should use kebab-case', () => {
      for (const path of validPaths) {
        const pathWithoutSlash = path.substring(1);
        expect(pathWithoutSlash).not.toMatch(/[A-Z_\s]/);
        expect(pathWithoutSlash).toMatch(/^[a-z0-9-]+$/);
      }
    });

    it('should not have consecutive hyphens', () => {
      for (const path of validPaths) {
        expect(path).not.toContain('--');
      }
    });

    it('should not start with hyphen after slash', () => {
      for (const path of validPaths) {
        expect(path).not.toMatch(/\/-/);
      }
    });

    it('should not end with hyphen', () => {
      for (const path of validPaths) {
        expect(path).not.toMatch(/-$/);
      }
    });
  });

  describe('Documentation Path Patterns', () => {
    const docPaths = [
      '/docs/intro/',
      '/docs/faq/',
      '/docs/how-to-setup-freecodecamp-locally/',
      '/docs/moderator-handbook/'
    ];

    it('should have docs prefix', () => {
      for (const path of docPaths) {
        expect(path).toMatch(/^\/docs\//);
      }
    });

    it('should have trailing slash', () => {
      for (const path of docPaths) {
        expect(path).toMatch(/\/$/);
      }
    });

    it('should construct valid full URLs', () => {
      for (const path of docPaths) {
        const fullUrl = `${baseUrl}${path}`;
        expect(fullUrl).toMatch(/^https:\/\/[a-z.]+\/docs\/[a-z-/]+\/$/);
      }
    });
  });

  describe('Hash Fragment Patterns', () => {
    const hashPaths = [
      '/how-to-setup-wsl/#installation',
      '/how-to-add-playwright-tests/#run-the-playwright-tests',
      '/curriculum-help/#getting-started'
    ];

    it('should have valid hash fragment format', () => {
      for (const path of hashPaths) {
        expect(path).toContain('#');
        const [, fragment] = path.split('#');
        expect(fragment).toMatch(/^[a-z0-9-]+$/);
      }
    });

    it('should have path before hash', () => {
      for (const path of hashPaths) {
        const [pathPart] = path.split('#');
        // Remove trailing slash for validation
        const pathWithoutTrailingSlash = pathPart.replace(/\/$/, '');
        expect(pathWithoutTrailingSlash).toMatch(/^\/[a-z0-9-]+$/);
      }
    });

    it('should not have multiple hash symbols', () => {
      for (const path of hashPaths) {
        const hashCount = (path.match(/#/g) || []).length;
        expect(hashCount).toBe(1);
      }
    });
  });

  describe('External Link Patterns', () => {
    const externalLinks = [
      'https://github.com/freecodecamp/freecodecamp',
      'https://freecodecamp.org/forum/c/contributors',
      'https://discord.gg/PRyKn3Vbay',
      'https://chat.freecodecamp.org'
    ];

    it('should use HTTPS protocol', () => {
      for (const link of externalLinks) {
        expect(link).toMatch(/^https:\/\//);
      }
    });

    it('should have valid URL structure', () => {
      for (const link of externalLinks) {
        expect(() => new URL(link)).not.toThrow();
      }
    });

    it('should not have trailing slash for service URLs', () => {
      const serviceUrls = externalLinks.filter(
        url => !url.includes('freecodecamp.org/forum')
      );

      for (const url of serviceUrls) {
        if (!url.includes('/c/')) {
          expect(url).not.toMatch(/\/$/);
        }
      }
    });
  });

  describe('Slug Generation', () => {
    const titleToSlugCases = [
      {
        title: 'How to Setup freeCodeCamp Locally',
        slug: 'how-to-setup-freecodecamp-locally'
      },
      { title: 'How to Translate Files', slug: 'how-to-translate-files' },
      { title: 'Moderator Handbook', slug: 'moderator-handbook' },
      { title: 'FAQ', slug: 'faq' }
    ];

    it('should convert titles to valid slugs', () => {
      for (const { title, slug } of titleToSlugCases) {
        const generated = title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
        expect(generated).toBe(slug);
      }
    });

    it('should handle special characters', () => {
      const title = "How to Work on the Component's Library";
      const slug = title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    });

    it('should remove consecutive hyphens', () => {
      const title = 'How  to  Setup   WSL';
      const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/-+/g, '-');
      expect(slug).not.toContain('--');
    });
  });

  describe('Path Normalization', () => {
    it('should normalize paths consistently', () => {
      const testCases = [
        { input: '/FAQ', normalized: '/faq' },
        { input: '/INDEX', normalized: '/index' },
        { input: '/How-To-Setup', normalized: '/how-to-setup' }
      ];

      for (const { input, normalized } of testCases) {
        expect(input.toLowerCase()).toBe(normalized);
      }
    });

    it('should handle path with query strings', () => {
      const path = '/docs/faq?section=getting-started';
      const [pathPart, queryPart] = path.split('?');

      expect(pathPart).toBe('/docs/faq');
      expect(queryPart).toBe('section=getting-started');
    });

    it('should clean double slashes', () => {
      const testCases = [
        { input: '//docs//faq//', expected: '/docs/faq/' },
        { input: '/docs///faq', expected: '/docs/faq' }
      ];

      for (const { input, expected } of testCases) {
        const cleaned = input.replace(/\/+/g, '/');
        expect(cleaned).toBe(expected);
      }
    });
  });

  describe('URL Encoding', () => {
    it('should handle encoded characters', () => {
      const encodedPath = '/how-to-setup%20wsl';
      const decoded = decodeURIComponent(encodedPath);
      expect(decoded).toBe('/how-to-setup wsl');
    });

    it('should encode special characters', () => {
      const path = '/path with spaces';
      const encoded = encodeURIComponent(path);
      expect(encoded).not.toContain(' ');
    });

    it('should handle hash fragments with encoding', () => {
      const fragment = 'section with spaces';
      const encoded = encodeURIComponent(fragment);
      expect(encoded).toBe('section%20with%20spaces');
    });
  });

  describe('URL Construction Edge Cases', () => {
    it('should handle empty path', () => {
      const fullUrl = `${baseUrl}/`;
      expect(fullUrl).toBe('https://contribute.freecodecamp.org/');
    });

    it('should handle root path', () => {
      const fullUrl = `${baseUrl}`;
      expect(fullUrl).toBe('https://contribute.freecodecamp.org');
    });

    it('should handle nested paths', () => {
      const path = '/docs/code-contributions/setup';
      expect(path).toMatch(/^\/[a-z-/]+$/);
    });

    it('should reject invalid characters', () => {
      const invalidPaths = [
        '/docs/FAQ!',
        '/docs/test@page',
        '/docs/test page',
        '/docs/test#fragment#another'
      ];

      for (const path of invalidPaths) {
        const hasInvalidChars = /[!@\s]/.test(path);
        const hasMultipleHashes = (path.match(/#/g) || []).length > 1;

        expect(hasInvalidChars || hasMultipleHashes).toBe(true);
      }
    });
  });

  describe('Canonical URL Patterns', () => {
    it('should construct canonical URLs', () => {
      const paths = ['/intro', '/faq', '/how-to-setup-freecodecamp-locally'];

      for (const path of paths) {
        const canonical = `${baseUrl}${path}`;
        expect(canonical).toMatch(
          /^https:\/\/contribute\.freecodecamp\.org\/[a-z-]+$/
        );
      }
    });

    it('should handle trailing slash consistency', () => {
      const pathWithSlash = '/docs/faq/';
      const pathWithoutSlash = '/docs/faq';

      expect(pathWithSlash.replace(/\/$/, '')).toBe(pathWithoutSlash);
    });
  });

  describe('Relative vs Absolute Paths', () => {
    it('should identify absolute paths', () => {
      const absolutePaths = [
        '/intro',
        '/docs/faq',
        '/how-to-setup-freecodecamp-locally'
      ];

      for (const path of absolutePaths) {
        expect(path).toMatch(/^\//);
      }
    });

    it('should identify relative paths', () => {
      const relativePaths = ['intro', 'docs/faq', '../getting-started'];

      for (const path of relativePaths) {
        expect(path).not.toMatch(/^\//);
      }
    });

    it('should convert relative to absolute', () => {
      const testCases = [
        { relative: 'intro', absolute: '/intro' },
        { relative: 'docs/faq', absolute: '/docs/faq' }
      ];

      for (const { relative, absolute } of testCases) {
        const converted = `/${relative}`;
        expect(converted).toBe(absolute);
      }
    });
  });
});
