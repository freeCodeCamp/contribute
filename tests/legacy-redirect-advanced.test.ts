describe('Legacy URL Redirects - Advanced', () => {
  const legacyRoutes = [
    { from: '/#/how-to-translate-files', to: '/how-to-translate-files/' },
    { from: '/#/how-to-setup-wsl', to: '/how-to-setup-wsl/' },
    {
      from: '/#/how-to-setup-freecodecamp-locally',
      to: '/how-to-setup-freecodecamp-locally/'
    },
    {
      from: '/#/how-to-add-playwright-tests',
      to: '/how-to-add-playwright-tests/'
    }
  ];

  describe('Hash-based Route Transformation', () => {
    it('should extract path correctly from hash routes', () => {
      for (const route of legacyRoutes) {
        const hashPath = route.from.replace('/#/', '');
        const expectedPath = route.to.replace(/\/$/, '');
        expect(`/${hashPath}`).toBe(expectedPath);
      }
    });

    it('should preserve path segments in transformation', () => {
      for (const route of legacyRoutes) {
        const segments = route.from.replace('/#/', '').split('-');
        const targetSegments = route.to.replace(/^\/|\/$/g, '').split('-');
        expect(segments).toEqual(targetSegments);
      }
    });

    it('should maintain kebab-case format', () => {
      for (const route of legacyRoutes) {
        // Check that from path uses only lowercase letters and hyphens (ignoring /# prefix)
        const fromPath = route.from.replace(/^\/#\//, '');
        expect(fromPath).toMatch(/^[a-z-]+$/);
        expect(route.to).toMatch(/^\/[a-z-/]+\/$/);
      }
    });
  });

  describe('Query Parameter Handling', () => {
    const testCases = [
      {
        from: '/#/how-to-add-playwright-tests?id=run-the-playwright-tests',
        to: '/how-to-add-playwright-tests/#run-the-playwright-tests'
      },
      {
        from: '/#/how-to-translate-files?id=getting-started',
        to: '/how-to-translate-files/#getting-started'
      },
      {
        from: '/#/how-to-setup-wsl?id=installation-steps',
        to: '/how-to-setup-wsl/#installation-steps'
      }
    ];

    it('should transform query parameters to hash fragments', () => {
      for (const testCase of testCases) {
        const [basePath, query] = testCase.from.split('?');
        const hashPath = basePath.replace('/#/', '');
        const anchorId = query.replace('id=', '');
        const transformed = `/${hashPath}/#${anchorId}`;

        expect(transformed).toBe(testCase.to);
      }
    });

    it('should handle multiple query parameters', () => {
      const testCase = {
        from: '/#/how-to-setup-wsl?id=section&highlight=true',
        expected: '/how-to-setup-wsl/#section'
      };

      const [basePath, queryString] = testCase.from.split('?');
      const hashPath = basePath.replace('/#/', '');
      const params = new URLSearchParams(queryString);
      const anchorId = params.get('id');

      expect(`/${hashPath}/#${anchorId}`).toBe(testCase.expected);
    });

    it('should handle URL encoded parameters', () => {
      const testCase = {
        from: '/#/how-to-translate-files?id=what%20is%20this',
        expected: '/how-to-translate-files/#what%20is%20this'
      };

      const [basePath, query] = testCase.from.split('?');
      const hashPath = basePath.replace('/#/', '');
      const anchorId = query.replace('id=', '');
      const transformed = `/${hashPath}/#${anchorId}`;

      expect(transformed).toBe(testCase.expected);
    });
  });

  describe('Path Normalization', () => {
    it('should normalize paths to lowercase', () => {
      for (const route of legacyRoutes) {
        expect(route.from.toLowerCase()).toBe(route.from);
        expect(route.to.toLowerCase()).toBe(route.to);
      }
    });

    it('should handle paths with varying slash counts', () => {
      const testCases = [
        { input: '/#/how-to-setup-wsl', expected: '/how-to-setup-wsl/' },
        { input: '#/how-to-setup-wsl', expected: '/how-to-setup-wsl/' }
      ];

      for (const testCase of testCases) {
        const normalized = testCase.input
          .replace(/^\/#\//, '')
          .replace(/^#\//, '')
          .replace(/\/?$/, '');
        const result = `/${normalized}/`;
        expect(result).toBe(testCase.expected);
      }
    });

    it('should remove double slashes', () => {
      const input = '/#//how-to-setup-wsl//';
      const cleaned = input.replace(/\/+/g, '/');
      expect(cleaned).not.toContain('//');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle empty hash', () => {
      const emptyHash = '/#/';
      const result = emptyHash.replace('/#/', '');
      expect(result).toBe('');
    });

    it('should handle missing hash', () => {
      const noHash = '/how-to-setup-wsl';
      const hasHash = noHash.includes('#');
      expect(hasHash).toBe(false);
    });

    it('should handle routes without query parameters', () => {
      for (const route of legacyRoutes) {
        expect(route.from).not.toContain('?');
      }
    });

    it('should preserve special characters in anchors', () => {
      const testCase = '/#/how-to-setup-wsl?id=section-1.2.3';
      const [, query] = testCase.split('?');
      const anchorId = query.replace('id=', '');
      expect(anchorId).toBe('section-1.2.3');
    });

    it('should handle routes with trailing content', () => {
      const testCase = '/#/how-to-setup-wsl/additional/path';
      const normalized = testCase.replace('/#/', '');
      expect(normalized).toBe('how-to-setup-wsl/additional/path');
    });
  });

  describe('Route Validation', () => {
    it('should not have routes with spaces', () => {
      for (const route of legacyRoutes) {
        expect(route.from).not.toContain(' ');
        expect(route.to).not.toContain(' ');
      }
    });

    it('should not have routes with uppercase letters', () => {
      for (const route of legacyRoutes) {
        expect(route.from).toBe(route.from.toLowerCase());
        expect(route.to).toBe(route.to.toLowerCase());
      }
    });

    it('should not have routes with special characters except hyphens and slashes', () => {
      const validPattern = /^[/#a-z-]+$/;

      for (const route of legacyRoutes) {
        expect(route.from.replace('?', '').split('?')[0]).toMatch(validPattern);
      }
    });

    it('should not have duplicate routes', () => {
      const sources = legacyRoutes.map(r => r.from);
      const uniqueSources = [...new Set(sources)];
      expect(sources.length).toBe(uniqueSources.length);
    });

    it('should not have routes targeting the same destination', () => {
      const targets = legacyRoutes.map(r => r.to);
      const uniqueTargets = [...new Set(targets)];
      expect(targets.length).toBe(uniqueTargets.length);
    });
  });

  describe('Bi-directional Mapping', () => {
    it('should allow reverse lookup from target to source', () => {
      const reverseMap = new Map<string, string>();

      for (const route of legacyRoutes) {
        reverseMap.set(route.to, route.from);
      }

      expect(reverseMap.size).toBe(legacyRoutes.length);
      expect(reverseMap.get('/how-to-setup-wsl/')).toBe('/#/how-to-setup-wsl');
    });

    it('should maintain unique mappings', () => {
      const forwardMap = new Map<string, string>();
      const reverseMap = new Map<string, string>();

      for (const route of legacyRoutes) {
        forwardMap.set(route.from, route.to);
        reverseMap.set(route.to, route.from);
      }

      expect(forwardMap.size).toBe(reverseMap.size);
    });
  });

  describe('Pattern Consistency', () => {
    it('should follow naming convention: how-to-*', () => {
      for (const route of legacyRoutes) {
        const path = route.from.replace('/#/', '');
        expect(path).toMatch(/^how-to-/);
      }
    });

    it('should have consistent separator usage', () => {
      for (const route of legacyRoutes) {
        const path = route.from.replace('/#/', '');
        const words = path.split('-');

        for (const word of words) {
          expect(word.length).toBeGreaterThan(0);
        }
      }
    });

    it('should not have consecutive hyphens', () => {
      for (const route of legacyRoutes) {
        expect(route.from).not.toContain('--');
        expect(route.to).not.toContain('--');
      }
    });

    it('should not start or end with hyphens in path segments', () => {
      for (const route of legacyRoutes) {
        const path = route.from.replace('/#/', '');
        expect(path).not.toMatch(/^-/);
        expect(path).not.toMatch(/-$/);
      }
    });
  });

  describe('URL Construction', () => {
    it('should build complete URLs correctly', () => {
      const baseUrl = 'https://contribute.freecodecamp.org';

      for (const route of legacyRoutes) {
        const fullUrl = `${baseUrl}${route.to}`;
        expect(fullUrl).toMatch(/^https:\/\/[a-z.]+\/[a-z-/]+\/$/);
      }
    });

    it('should handle relative path construction', () => {
      for (const route of legacyRoutes) {
        const relativePath = route.to.replace(/^\//, '');
        expect(relativePath).not.toMatch(/^\//);
        expect(relativePath).toMatch(/\/$/);
      }
    });
  });

  describe('Performance and Memory', () => {
    it('should handle large route sets efficiently', () => {
      const largeRouteSet = Array.from({ length: 1000 }, (_, i) => ({
        from: `/#/route-${i}`,
        to: `/route-${i}/`
      }));

      const startTime = Date.now();
      const routeMap = new Map(largeRouteSet.map(r => [r.from, r.to]));
      const endTime = Date.now();

      expect(routeMap.size).toBe(1000);
      expect(endTime - startTime).toBeLessThan(100);
    });

    it('should handle route lookup efficiently', () => {
      const routeMap = new Map(legacyRoutes.map(r => [r.from, r.to]));

      const startTime = Date.now();
      for (let i = 0; i < 10000; i++) {
        routeMap.get('/#/how-to-setup-wsl');
      }
      const endTime = Date.now();

      expect(endTime - startTime).toBeLessThan(100);
    });
  });
});
