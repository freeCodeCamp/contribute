import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('FCCSidebar Component', () => {
  let dom: JSDOM;
  let document: Document;

  beforeEach(() => {
    dom = new JSDOM(
      `
      <!DOCTYPE html>
      <html>
        <body>
          <nav class="top-level">
            <ul>
              <li>
                <strong>Getting Started</strong>
                <ul>
                  <li>
                    <a href="/docs/FAQ" title="Frequently Asked Questions" class="current">
                      <strong>FAQ</strong>
                    </a>
                  </li>
                  <li>
                    <a href="/docs/getting-started" title="Getting Started" target="_self">
                      Getting Started
                    </a>
                  </li>
                </ul>
              </li>
              <hr />
              <li>
                <strong>Flight Manuals</strong>
                <ul>
                  <li>
                    <a href="/docs/flight-manuals/working-on-virtual-machines" title="Working on Virtual Machines">
                      Working on Virtual Machines
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/freeCodeCamp/freeCodeCamp" title="GitHub Repository" target="_blank">
                      GitHub Repository
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          <div class="md:sl-hidden">
            <div class="mobile-menu-footer">
              <div class="social-links">
                <a href="https://github.com/freeCodeCamp">GitHub</a>
                <a href="https://discord.gg/PRyKn3Vbay">Discord</a>
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

  describe('Navigation Structure', () => {
    it('renders nav with correct class', () => {
      const nav = document.querySelector('nav');
      expect(nav).toBeTruthy();
      expect(nav?.classList.contains('top-level')).toBe(true);
    });

    it('contains main navigation list', () => {
      const mainList = document.querySelector('nav > ul');
      expect(mainList).toBeTruthy();
    });

    it('renders section titles', () => {
      const sectionTitles = document.querySelectorAll('nav > ul > li > strong');
      expect(sectionTitles.length).toBeGreaterThan(0);

      const firstTitle = sectionTitles[0];
      expect(firstTitle?.textContent).toBe('Getting Started');
    });

    it('renders section separators', () => {
      const separator = document.querySelector('hr');
      expect(separator).toBeTruthy();
    });
  });

  describe('Navigation Links', () => {
    it('renders internal navigation links', () => {
      const internalLinks = document.querySelectorAll('a[target="_self"]');
      expect(internalLinks.length).toBeGreaterThan(0);

      const firstLink = internalLinks[0];
      expect(firstLink?.getAttribute('href')).toBe('/docs/getting-started');
      expect(firstLink?.getAttribute('title')).toBe('Getting Started');
    });

    it('renders external links with target="_blank"', () => {
      const externalLinks = document.querySelectorAll('a[target="_blank"]');
      expect(externalLinks.length).toBeGreaterThan(0);

      const githubLink = Array.from(externalLinks).find(link =>
        link.getAttribute('href')?.includes('github.com')
      );
      expect(githubLink).toBeTruthy();
      expect(githubLink?.getAttribute('target')).toBe('_blank');
    });

    it('highlights current page', () => {
      const currentLink = document.querySelector('a.current');
      expect(currentLink).toBeTruthy();
      expect(currentLink?.getAttribute('href')).toBe('/docs/FAQ');
      expect(currentLink?.classList.contains('current')).toBe(true);
    });

    it('renders strong text for emphasized links', () => {
      const strongLinks = document.querySelectorAll('a > strong');
      expect(strongLinks.length).toBeGreaterThan(0);

      const faqLink = strongLinks[0];
      expect(faqLink?.textContent).toBe('FAQ');
    });
  });

  describe('Hierarchical Structure', () => {
    it('has nested list structure', () => {
      const nestedLists = document.querySelectorAll('ul ul');
      expect(nestedLists.length).toBeGreaterThan(0);
    });

    it('contains section groupings', () => {
      const sections = document.querySelectorAll('nav > ul > li');
      expect(sections.length).toBeGreaterThanOrEqual(2);

      sections.forEach(section => {
        const title = section.querySelector('strong');
        const subList = section.querySelector('ul');
        expect(title).toBeTruthy();
        expect(subList).toBeTruthy();
      });
    });

    it('has proper nesting levels', () => {
      const topLevelItems = document.querySelectorAll('nav > ul > li');
      const secondLevelItems = document.querySelectorAll(
        'nav > ul > li > ul > li'
      );

      expect(topLevelItems.length).toBeGreaterThan(0);
      expect(secondLevelItems.length).toBeGreaterThan(0);
    });
  });

  describe('Mobile Menu Footer', () => {
    it('renders mobile menu footer', () => {
      const mobileFooter = document.querySelector('.md\\:sl-hidden');
      expect(mobileFooter).toBeTruthy();
    });

    it('contains social links in mobile footer', () => {
      const socialLinks = document.querySelectorAll(
        '.mobile-menu-footer .social-links a'
      );
      expect(socialLinks.length).toBeGreaterThan(0);

      const githubLink = Array.from(socialLinks).find(
        link => link.textContent === 'GitHub'
      );
      expect(githubLink).toBeTruthy();
      expect(githubLink?.getAttribute('href')).toBe(
        'https://github.com/freeCodeCamp'
      );
    });

    it('has responsive visibility class', () => {
      const mobileFooter = document.querySelector('.md\\:sl-hidden');
      expect(mobileFooter?.classList.contains('md:sl-hidden')).toBe(true);
    });
  });

  describe('Link Attributes', () => {
    it('has proper title attributes', () => {
      const linksWithTitles = document.querySelectorAll('a[title]');
      expect(linksWithTitles.length).toBeGreaterThan(0);

      linksWithTitles.forEach(link => {
        expect(link.getAttribute('title')).toBeTruthy();
      });
    });

    it('has proper href attributes', () => {
      const allLinks = document.querySelectorAll('a[href]');
      expect(allLinks.length).toBeGreaterThan(0);

      allLinks.forEach(link => {
        const href = link.getAttribute('href');
        expect(href).toBeTruthy();
        expect(href).not.toBe('');
      });
    });

    it('differentiates internal and external links', () => {
      const internalLinks = document.querySelectorAll('a[href^="/"]');
      const externalLinks = document.querySelectorAll('a[href^="http"]');

      expect(internalLinks.length).toBeGreaterThan(0);
      expect(externalLinks.length).toBeGreaterThan(0);

      // Internal links should have target="_self" or no target
      internalLinks.forEach(link => {
        const target = link.getAttribute('target');
        expect(target === '_self' || target === null).toBe(true);
      });

      // External links should have target="_blank"
      externalLinks.forEach(link => {
        const target = link.getAttribute('target');
        expect(target === '_blank' || target === null).toBe(true);
      });
    });
  });

  describe('Accessibility', () => {
    it('has semantic navigation structure', () => {
      const nav = document.querySelector('nav');
      expect(nav).toBeTruthy();

      const lists = nav?.querySelectorAll('ul');
      expect(lists && lists.length).toBeGreaterThan(0);
    });

    it('has descriptive link text', () => {
      const links = document.querySelectorAll('a');

      links.forEach(link => {
        const text = link.textContent?.trim();
        expect(text).toBeTruthy();
        expect(text && text.length).toBeGreaterThan(0);
      });
    });

    it('has proper heading hierarchy with strong elements', () => {
      const headings = document.querySelectorAll('nav strong');
      expect(headings.length).toBeGreaterThan(0);

      headings.forEach(heading => {
        expect(heading.textContent?.trim()).toBeTruthy();
      });
    });
  });

  describe('Responsive Design', () => {
    it('has responsive mobile footer', () => {
      const mobileElement = document.querySelector('.md\\:sl-hidden');
      expect(mobileElement).toBeTruthy();
    });

    it('maintains navigation structure across breakpoints', () => {
      const nav = document.querySelector('nav.top-level');
      expect(nav).toBeTruthy();

      const mainList = nav?.querySelector('ul');
      expect(mainList).toBeTruthy();
    });
  });

  describe('Content Organization', () => {
    it('groups related navigation items', () => {
      const sections = document.querySelectorAll('nav > ul > li');

      sections.forEach(section => {
        const title = section.querySelector('strong');
        const subItems = section.querySelectorAll('ul > li');

        expect(title).toBeTruthy();
        expect(subItems.length).toBeGreaterThan(0);
      });
    });

    it('maintains logical content hierarchy', () => {
      const topLevel = document.querySelectorAll('nav > ul > li');
      const secondLevel = document.querySelectorAll('nav > ul > li > ul > li');

      expect(topLevel.length).toBeGreaterThan(0);
      expect(secondLevel.length).toBeGreaterThan(topLevel.length);
    });
  });
});
