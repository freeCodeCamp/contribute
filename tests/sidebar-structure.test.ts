import sidebar from '../src/sidebar';

describe('Sidebar Structure', () => {
  describe('Sidebar Array Structure', () => {
    it('should be an array', () => {
      expect(Array.isArray(sidebar)).toBe(true);
    });

    it('should not be empty', () => {
      expect(sidebar.length).toBeGreaterThan(0);
    });

    it('should have at least 5 sections', () => {
      expect(sidebar.length).toBeGreaterThanOrEqual(5);
    });

    it('should have all required sections', () => {
      const labels = sidebar.map(section => section.label);
      expect(labels).toEqual([
        'Introduction',
        'Code Contributions',
        'Additional Guides',
        'Handbooks (Staff & Mods)',
        'Our Community'
      ]);
    });
  });

  describe('Section Structure Validation', () => {
    it('should have label and items for each section', () => {
      for (const section of sidebar) {
        expect(section).toHaveProperty('label');
        expect(section).toHaveProperty('items');
        expect(typeof section.label).toBe('string');
        expect(Array.isArray(section.items)).toBe(true);
      }
    });

    it('should have non-empty labels', () => {
      for (const section of sidebar) {
        expect(section.label.trim().length).toBeGreaterThan(0);
      }
    });

    it('should have at least one item per section', () => {
      for (const section of sidebar) {
        expect(section.items.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Items Structure', () => {
    it('should have valid item types', () => {
      for (const section of sidebar) {
        for (const item of section.items) {
          const isString = typeof item === 'string';
          const isObject =
            typeof item === 'object' &&
            item !== null &&
            'link' in item &&
            'label' in item;
          expect(isString || isObject).toBe(true);
        }
      }
    });

    it('should have valid link objects for external links', () => {
      const ourCommunity = sidebar.find(s => s.label === 'Our Community');
      expect(ourCommunity).toBeDefined();

      for (const item of ourCommunity!.items) {
        if (typeof item === 'object') {
          expect(item).toHaveProperty('link');
          expect(item).toHaveProperty('label');
          expect(item).toHaveProperty('attrs');
          expect(typeof item.link).toBe('string');
          expect(typeof item.label).toBe('string');
          expect(item.attrs).toHaveProperty('target');
          expect(item.attrs.target).toBe('_blank');
        }
      }
    });
  });

  describe('Introduction Section', () => {
    const intro = sidebar.find(s => s.label === 'Introduction');

    it('should exist', () => {
      expect(intro).toBeDefined();
    });

    it('should have correct items', () => {
      expect(intro?.items).toEqual(['getting-started', 'faq', 'security']);
    });

    it('should have at least 3 items', () => {
      expect(intro?.items.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Code Contributions Section', () => {
    const codeContribs = sidebar.find(s => s.label === 'Code Contributions');

    it('should exist', () => {
      expect(codeContribs).toBeDefined();
    });

    it('should have at least 15 items', () => {
      expect(codeContribs?.items.length).toBeGreaterThanOrEqual(15);
    });

    it('should include setup guide as first item', () => {
      expect(codeContribs?.items[0]).toBe('how-to-setup-freecodecamp-locally');
    });

    it('should include all critical guides', () => {
      const criticalGuides = [
        'how-to-setup-freecodecamp-locally',
        'codebase-best-practices',
        'how-to-contribute-to-the-codebase',
        'how-to-work-on-coding-challenges',
        'how-to-add-playwright-tests',
        'how-to-open-a-pull-request'
      ];

      for (const guide of criticalGuides) {
        expect(codeContribs?.items).toContain(guide);
      }
    });
  });

  describe('Additional Guides Section', () => {
    const additionalGuides = sidebar.find(s => s.label === 'Additional Guides');

    it('should exist', () => {
      expect(additionalGuides).toBeDefined();
    });

    it('should have at least 7 items', () => {
      expect(additionalGuides?.items.length).toBeGreaterThanOrEqual(7);
    });

    it('should include troubleshooting guide', () => {
      expect(additionalGuides?.items).toContain(
        'troubleshooting-development-issues'
      );
    });
  });

  describe('Handbooks Section', () => {
    const handbooks = sidebar.find(s => s.label === 'Handbooks (Staff & Mods)');

    it('should exist', () => {
      expect(handbooks).toBeDefined();
    });

    it('should have at least 6 items', () => {
      expect(handbooks?.items.length).toBeGreaterThanOrEqual(6);
    });

    it('should include moderator handbook', () => {
      expect(handbooks?.items).toContain('moderator-handbook');
    });
  });

  describe('Our Community Section', () => {
    const community = sidebar.find(s => s.label === 'Our Community');

    it('should exist', () => {
      expect(community).toBeDefined();
    });

    it('should have at least 3 external links', () => {
      expect(community?.items.length).toBeGreaterThanOrEqual(3);
    });

    it('should have GitHub link', () => {
      const githubLink = community?.items.find(
        item =>
          typeof item === 'object' &&
          item.link === 'https://github.com/freecodecamp/freecodecamp'
      );
      expect(githubLink).toBeDefined();
      if (typeof githubLink === 'object') {
        expect(githubLink.label).toBe('GitHub');
      }
    });

    it('should have Discourse Forum link', () => {
      const forumLink = community?.items.find(
        item =>
          typeof item === 'object' &&
          item.link === 'https://freecodecamp.org/forum/c/contributors'
      );
      expect(forumLink).toBeDefined();
      if (typeof forumLink === 'object') {
        expect(forumLink.label).toBe('Discourse Forum');
      }
    });

    it('should have Discord link', () => {
      const discordLink = community?.items.find(
        item =>
          typeof item === 'object' &&
          item.link === 'https://discord.gg/PRyKn3Vbay'
      );
      expect(discordLink).toBeDefined();
      if (typeof discordLink === 'object') {
        expect(discordLink.label).toBe('Chat Server');
      }
    });

    it('should have all external links open in new tab', () => {
      for (const item of community!.items) {
        if (typeof item === 'object') {
          expect(item.attrs.target).toBe('_blank');
        }
      }
    });

    it('should have valid HTTPS URLs', () => {
      for (const item of community!.items) {
        if (typeof item === 'object') {
          expect(item.link).toMatch(/^https:\/\//);
        }
      }
    });
  });

  describe('Slug Validation', () => {
    it('should have valid slug format for all string items', () => {
      const slugPattern = /^[a-z0-9-]+$/;

      for (const section of sidebar) {
        for (const item of section.items) {
          if (typeof item === 'string') {
            expect(item).toMatch(slugPattern);
          }
        }
      }
    });

    it('should not have duplicate slugs across all sections', () => {
      const allSlugs: string[] = [];

      for (const section of sidebar) {
        for (const item of section.items) {
          if (typeof item === 'string') {
            allSlugs.push(item);
          }
        }
      }

      const uniqueSlugs = [...new Set(allSlugs)];
      expect(allSlugs.length).toBe(uniqueSlugs.length);
    });

    it('should use kebab-case for all slugs', () => {
      for (const section of sidebar) {
        for (const item of section.items) {
          if (typeof item === 'string') {
            expect(item).not.toMatch(/[A-Z_\s]/);
          }
        }
      }
    });
  });

  describe('External Links Validation', () => {
    it('should have valid external link structure', () => {
      for (const section of sidebar) {
        for (const item of section.items) {
          if (typeof item === 'object') {
            expect(item.link).toBeTruthy();
            expect(item.label).toBeTruthy();
            expect(item.attrs).toBeTruthy();
            expect(item.attrs.target).toBe('_blank');
          }
        }
      }
    });

    it('should have valid URLs for external links', () => {
      const urlPattern = /^https?:\/\/.+/;

      for (const section of sidebar) {
        for (const item of section.items) {
          if (typeof item === 'object') {
            expect(item.link).toMatch(urlPattern);
          }
        }
      }
    });
  });

  describe('Section Count Validation', () => {
    it('should have minimum expected items per section', () => {
      const minCounts: Record<string, number> = {
        Introduction: 3,
        'Code Contributions': 16,
        'Additional Guides': 7,
        'Handbooks (Staff & Mods)': 6,
        'Our Community': 3
      };

      for (const section of sidebar) {
        expect(section.items.length).toBeGreaterThanOrEqual(
          minCounts[section.label]
        );
      }
    });
  });

  describe('Edge Cases', () => {
    it('should not have empty strings in items', () => {
      for (const section of sidebar) {
        for (const item of section.items) {
          if (typeof item === 'string') {
            expect(item.trim()).not.toBe('');
          }
        }
      }
    });

    it('should not have null or undefined items', () => {
      for (const section of sidebar) {
        for (const item of section.items) {
          expect(item).not.toBeNull();
          expect(item).not.toBeUndefined();
        }
      }
    });

    it('should have consistent label casing', () => {
      for (const section of sidebar) {
        // Labels should start with uppercase
        expect(section.label[0]).toMatch(/[A-Z]/);
      }
    });
  });
});
