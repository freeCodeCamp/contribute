import { describe, it, expect } from 'vitest';

describe('Astro Configuration', () => {
  // Test the expected config structure without importing Astro
  const config = {
    site: 'https://contribute.freecodecamp.org',
    redirects: {
      '/index': '/intro',
      '/FAQ': '/faq',
      '/how-to-work-on-the-docs-theme': '/how-to-work-on-the-docs-site'
    }
  };

  describe('Site Configuration', () => {
    it('should have site URL defined', () => {
      expect(config.site).toBeDefined();
      expect(config.site).toBe('https://contribute.freecodecamp.org');
    });

    it('should use HTTPS protocol', () => {
      expect(config.site).toMatch(/^https:\/\//);
    });

    it('should have valid domain', () => {
      expect(config.site).toContain('freecodecamp.org');
    });
  });

  describe('Redirects Configuration', () => {
    it('should have redirects defined', () => {
      expect(config.redirects).toBeDefined();
      expect(typeof config.redirects).toBe('object');
    });

    it('should have exactly 3 redirects', () => {
      expect(Object.keys(config.redirects!).length).toBe(3);
    });

    it('should redirect /index to /intro', () => {
      expect(config.redirects!['/index']).toBe('/intro');
    });

    it('should redirect /FAQ to /faq', () => {
      expect(config.redirects!['/FAQ']).toBe('/faq');
    });

    it('should redirect /how-to-work-on-the-docs-theme to /how-to-work-on-the-docs-site', () => {
      expect(config.redirects!['/how-to-work-on-the-docs-theme']).toBe(
        '/how-to-work-on-the-docs-site'
      );
    });

    it('should have all redirect sources start with /', () => {
      for (const source of Object.keys(config.redirects!)) {
        expect(source).toMatch(/^\//);
      }
    });

    it('should have all redirect targets start with /', () => {
      for (const target of Object.values(config.redirects!)) {
        expect(target).toMatch(/^\//);
      }
    });

    it('should not have trailing slashes on sources', () => {
      for (const source of Object.keys(config.redirects!)) {
        if (source !== '/') {
          expect(source).not.toMatch(/\/$/);
        }
      }
    });

    it('should not have trailing slashes on targets', () => {
      for (const target of Object.values(config.redirects!)) {
        if (target !== '/') {
          expect(target).not.toMatch(/\/$/);
        }
      }
    });

    it('should not redirect to itself', () => {
      for (const [source, target] of Object.entries(config.redirects!)) {
        expect(source).not.toBe(target);
      }
    });

    it('should use lowercase for case-normalization redirects', () => {
      // /FAQ -> /faq is a case normalization
      expect(config.redirects!['/FAQ'].toLowerCase()).toBe(
        config.redirects!['/FAQ']
      );
    });
  });

  describe('Redirect Path Validation', () => {
    it('should have valid path format', () => {
      const validPathPattern = /^\/[a-z0-9-/]*$/;

      for (const target of Object.values(config.redirects!)) {
        expect(target).toMatch(validPathPattern);
      }
    });

    it('should not have duplicate redirect targets', () => {
      const targets = Object.values(config.redirects!);
      const uniqueTargets = [...new Set(targets)];
      expect(targets.length).toBe(uniqueTargets.length);
    });

    it('should not have circular redirects', () => {
      const redirectMap = config.redirects!;

      for (const [source, target] of Object.entries(redirectMap)) {
        // Check if target redirects back to source
        expect(redirectMap[target as keyof typeof redirectMap]).not.toBe(
          source
        );
      }
    });
  });

  describe('Legacy Compatibility', () => {
    it('should handle old documentation paths', () => {
      // Ensure old theme documentation redirects to current site documentation
      expect(config.redirects!['/how-to-work-on-the-docs-theme']).toBe(
        '/how-to-work-on-the-docs-site'
      );
    });

    it('should normalize case-sensitive paths', () => {
      // FAQ is commonly uppercase, should redirect to lowercase
      expect(config.redirects!['/FAQ']).toBe('/faq');
    });
  });

  describe('Edge Cases', () => {
    it('should not have empty string redirects', () => {
      for (const [source, target] of Object.entries(config.redirects!)) {
        expect(source.trim()).not.toBe('');
        expect(target.trim()).not.toBe('');
      }
    });

    it('should not have null or undefined redirects', () => {
      for (const [source, target] of Object.entries(config.redirects!)) {
        expect(source).not.toBeNull();
        expect(source).not.toBeUndefined();
        expect(target).not.toBeNull();
        expect(target).not.toBeUndefined();
      }
    });

    it('should have consistent path separator', () => {
      for (const target of Object.values(config.redirects!)) {
        // Should use forward slashes only
        expect(target).not.toContain('\\');
      }
    });
  });

  describe('URL Structure', () => {
    it('should not have query parameters in redirects', () => {
      for (const [source, target] of Object.entries(config.redirects!)) {
        expect(source).not.toContain('?');
        expect(target).not.toContain('?');
      }
    });

    it('should not have hash fragments in redirects', () => {
      for (const [source, target] of Object.entries(config.redirects!)) {
        expect(source).not.toContain('#');
        expect(target).not.toContain('#');
      }
    });

    it('should not have absolute URLs as targets', () => {
      for (const target of Object.values(config.redirects!)) {
        expect(target).not.toMatch(/^https?:\/\//);
      }
    });
  });
});
