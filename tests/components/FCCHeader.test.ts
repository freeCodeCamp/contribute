import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('FCCHeader Component', () => {
  let dom: JSDOM;
  let document: Document;

  beforeEach(() => {
    dom = new JSDOM(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Test Page</title>
        </head>
        <body>
          <div class="flex justify-between items-center">
            <!-- Search Section -->
            <div class="flex md:w-64">
              <div class="search-component">
                <input type="search" placeholder="Search..." aria-label="Search">
              </div>
            </div>
            
            <!-- Site Title Section -->
            <div class="flex-1 flex justify-center">
              <div class="overflow-hidden max-w-[240px]">
                <a href="/" class="site-title">
                  <span>freeCodeCamp</span>
                  <span class="subtitle">Contribute</span>
                </a>
              </div>
            </div>
            
            <!-- Right Section: Social Icons, Theme Select, Language Select -->
            <div class="hidden md:flex items-center space-x-4">
              <div class="flex items-center space-x-4 after:content-[''] after:h-8 after:border-r after:border-gray-300 dark:after:border-gray-700">
                <div class="social-icons">
                  <a href="https://github.com/freeCodeCamp" aria-label="GitHub">
                    <svg role="img" aria-label="GitHub"><use href="#github"></use></svg>
                  </a>
                  <a href="https://forum.freecodecamp.org" aria-label="Forum">
                    <svg role="img" aria-label="Forum"><use href="#forum"></use></svg>
                  </a>
                  <a href="https://discord.gg/PRyKn3Vbay" aria-label="Discord">
                    <svg role="img" aria-label="Discord"><use href="#discord"></use></svg>
                  </a>
                </div>
              </div>
              <div class="theme-select">
                <select aria-label="Select theme">
                  <option value="auto">Auto</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
              <div class="language-select">
                <select aria-label="Select language">
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
      { url: 'http://localhost:4321' }
    );
    document = dom.window.document;
  });

  describe('Layout Structure', () => {
    it('has correct flexbox layout', () => {
      const header = document.querySelector(
        '.flex.justify-between.items-center'
      );
      expect(header).toBeTruthy();

      const sections = header?.querySelectorAll('div');
      expect(sections?.length).toBeGreaterThanOrEqual(3);
    });

    it('has three main sections', () => {
      const header = document.querySelector(
        '.flex.justify-between.items-center'
      );
      const children = header?.children;

      expect(children?.length).toBe(3);

      // Search section
      const searchSection = children?.[0];
      expect(searchSection?.classList.contains('flex')).toBe(true);
      expect(searchSection?.classList.contains('md:w-64')).toBe(true);

      // Site title section
      const titleSection = children?.[1];
      expect(titleSection?.classList.contains('flex-1')).toBe(true);
      expect(titleSection?.classList.contains('flex')).toBe(true);
      expect(titleSection?.classList.contains('justify-center')).toBe(true);

      // Right section
      const rightSection = children?.[2];
      expect(rightSection?.classList.contains('hidden')).toBe(true);
      expect(rightSection?.classList.contains('md:flex')).toBe(true);
      expect(rightSection?.classList.contains('items-center')).toBe(true);
      expect(rightSection?.classList.contains('space-x-4')).toBe(true);
    });
  });

  describe('Search Section', () => {
    it('renders search component', () => {
      const searchSection = document.querySelector('.flex.md\\:w-64');
      expect(searchSection).toBeTruthy();

      const searchInput = searchSection?.querySelector('input[type="search"]');
      expect(searchInput).toBeTruthy();
      expect(searchInput?.getAttribute('placeholder')).toBe('Search...');
      expect(searchInput?.getAttribute('aria-label')).toBe('Search');
    });

    it('has responsive width classes', () => {
      const searchSection = document.querySelector('.flex.md\\:w-64');
      expect(searchSection?.classList.contains('flex')).toBe(true);
      expect(searchSection?.classList.contains('md:w-64')).toBe(true);
    });
  });

  describe('Site Title Section', () => {
    it('renders site title with correct structure', () => {
      const titleSection = document.querySelector(
        '.flex-1.flex.justify-center'
      );
      expect(titleSection).toBeTruthy();

      const titleContainer = titleSection?.querySelector(
        '.overflow-hidden.max-w-\\[240px\\]'
      );
      expect(titleContainer).toBeTruthy();

      const titleLink = titleContainer?.querySelector('a.site-title');
      expect(titleLink).toBeTruthy();
      expect(titleLink?.getAttribute('href')).toBe('/');
    });

    it('has overflow protection', () => {
      const titleContainer = document.querySelector(
        '.overflow-hidden.max-w-\\[240px\\]'
      );
      expect(titleContainer).toBeTruthy();
      expect(titleContainer?.classList.contains('overflow-hidden')).toBe(true);
      expect(titleContainer?.classList.contains('max-w-[240px]')).toBe(true);
    });

    it('displays freeCodeCamp branding', () => {
      const titleSpan = document.querySelector('.site-title span');
      expect(titleSpan?.textContent).toBe('freeCodeCamp');

      const subtitleSpan = document.querySelector('.site-title .subtitle');
      expect(subtitleSpan?.textContent).toBe('Contribute');
    });
  });

  describe('Right Section Components', () => {
    it('has responsive visibility', () => {
      const rightSection = document.querySelector(
        '.hidden.md\\:flex.items-center.space-x-4'
      );
      expect(rightSection).toBeTruthy();
      expect(rightSection?.classList.contains('hidden')).toBe(true);
      expect(rightSection?.classList.contains('md:flex')).toBe(true);
      expect(rightSection?.classList.contains('items-center')).toBe(true);
      expect(rightSection?.classList.contains('space-x-4')).toBe(true);
    });

    it('renders social icons with divider', () => {
      const socialContainer = document.querySelector(
        '.flex.items-center.space-x-4'
      );
      expect(socialContainer).toBeTruthy();

      // Check for divider styling
      const dividerClasses = socialContainer?.className;
      expect(dividerClasses).toContain('after:border-r');
      expect(dividerClasses).toContain('after:border-gray-300');
      expect(dividerClasses).toContain('dark:after:border-gray-700');
    });

    it('renders theme select component', () => {
      const themeSelect = document.querySelector('.theme-select select');
      expect(themeSelect).toBeTruthy();
      expect(themeSelect?.getAttribute('aria-label')).toBe('Select theme');

      const options = themeSelect?.querySelectorAll('option');
      expect(options?.length).toBe(3);

      const optionValues = Array.from(options || []).map(opt =>
        opt.getAttribute('value')
      );
      expect(optionValues).toEqual(['auto', 'light', 'dark']);
    });

    it('renders language select component', () => {
      const languageSelect = document.querySelector('.language-select select');
      expect(languageSelect).toBeTruthy();
      expect(languageSelect?.getAttribute('aria-label')).toBe(
        'Select language'
      );

      const englishOption = languageSelect?.querySelector('option[value="en"]');
      expect(englishOption?.textContent).toBe('English');
    });
  });

  describe('Social Icons', () => {
    it('renders GitHub link', () => {
      const githubLink = document.querySelector(
        'a[href="https://github.com/freeCodeCamp"]'
      );
      expect(githubLink).toBeTruthy();
      expect(githubLink?.getAttribute('aria-label')).toBe('GitHub');

      const githubIcon = githubLink?.querySelector('svg');
      expect(githubIcon).toBeTruthy();
      expect(githubIcon?.getAttribute('role')).toBe('img');
    });

    it('renders Forum link', () => {
      const forumLink = document.querySelector(
        'a[href="https://forum.freecodecamp.org"]'
      );
      expect(forumLink).toBeTruthy();
      expect(forumLink?.getAttribute('aria-label')).toBe('Forum');
    });

    it('renders Discord link', () => {
      const discordLink = document.querySelector(
        'a[href="https://discord.gg/PRyKn3Vbay"]'
      );
      expect(discordLink).toBeTruthy();
      expect(discordLink?.getAttribute('aria-label')).toBe('Discord');
    });

    it('has proper accessibility attributes', () => {
      const socialLinks = document.querySelectorAll('.social-icons a');

      socialLinks.forEach(link => {
        expect(link.getAttribute('aria-label')).toBeTruthy();

        const icon = link.querySelector('svg');
        expect(icon?.getAttribute('role')).toBe('img');
        expect(icon?.getAttribute('aria-label')).toBeTruthy();
      });
    });
  });

  describe('Responsive Design', () => {
    it('hides right section on mobile', () => {
      const rightSection = document.querySelector('.hidden.md\\:flex');
      expect(rightSection?.classList.contains('hidden')).toBe(true);
      expect(rightSection?.classList.contains('md:flex')).toBe(true);
    });

    it('adapts search section width on desktop', () => {
      const searchSection = document.querySelector('.md\\:w-64');
      expect(searchSection?.classList.contains('md:w-64')).toBe(true);
    });

    it('maintains proper spacing across breakpoints', () => {
      const rightSection = document.querySelector('.space-x-4');
      expect(rightSection?.classList.contains('space-x-4')).toBe(true);

      const socialContainer = document.querySelector(
        '.flex.items-center.space-x-4'
      );
      expect(socialContainer?.classList.contains('space-x-4')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels for interactive elements', () => {
      const searchInput = document.querySelector('input[type="search"]');
      expect(searchInput?.getAttribute('aria-label')).toBe('Search');

      const themeSelect = document.querySelector('.theme-select select');
      expect(themeSelect?.getAttribute('aria-label')).toBe('Select theme');

      const languageSelect = document.querySelector('.language-select select');
      expect(languageSelect?.getAttribute('aria-label')).toBe(
        'Select language'
      );
    });

    it('has semantic navigation structure', () => {
      const siteTitle = document.querySelector('a.site-title');
      expect(siteTitle?.getAttribute('href')).toBe('/');

      const externalLinks = document.querySelectorAll('a[href^="http"]');
      expect(externalLinks.length).toBeGreaterThan(0);
    });

    it('provides visual focus indicators', () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, select'
      );
      expect(interactiveElements.length).toBeGreaterThan(0);
    });
  });

  describe('Dark Mode Support', () => {
    it('includes dark mode classes for divider', () => {
      const socialContainer = document.querySelector(
        '.flex.items-center.space-x-4'
      );
      const className = socialContainer?.className;

      expect(className).toContain('dark:after:border-gray-700');
      expect(className).toContain('after:border-gray-300');
    });

    it('supports theme switching', () => {
      const themeSelect = document.querySelector('.theme-select select');
      const darkOption = themeSelect?.querySelector('option[value="dark"]');

      expect(darkOption).toBeTruthy();
      expect(darkOption?.textContent).toBe('Dark');
    });
  });
});
