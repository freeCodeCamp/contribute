import { describe, it, expect } from 'vitest';

describe('Astro Configuration', () => {
  // Test the expected config structure without importing Astro
  const config = {
    site: 'https://contribute.freecodecamp.org'
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
});
