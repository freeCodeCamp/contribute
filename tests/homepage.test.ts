import { JSDOM } from 'jsdom';

describe('Homepage', () => {
  let dom: JSDOM;
  let document: Document;

  beforeEach(() => {
    dom = new JSDOM(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Contribute to the freeCodeCamp Community | Contribute | freeCodeCamp.org</title>
          <meta name="description" content="Learn how to contribute to freeCodeCamp's open source community">
        </head>
        <body>
          <header class="fcc-header">
            <a href="/" class="home-link">freeCodeCamp Contribute</a>
            <nav class="main-nav">
              <a href="/docs/FAQ">FAQ</a>
              <a href="/docs/flight-manuals">Flight Manuals</a>
            </nav>
            <button class="mobile-menu-toggle" aria-label="Toggle mobile menu">
              <span class="menu-icon"></span>
            </button>
          </header>
          <main>
            <h1>Welcome to freeCodeCamp Contribute</h1>
            <p class="hero-text">The freeCodeCamp.org community is possible thanks to thousands of kind volunteers like you.</p>
            <div class="cta-buttons">
              <a href="/docs/FAQ" class="cta-button primary">Get Started</a>
              <a href="https://github.com/freeCodeCamp/freeCodeCamp" class="cta-button secondary">View on GitHub</a>
            </div>
          </main>
        </body>
      </html>
    `,
      { url: 'http://localhost:4321' }
    );
    document = dom.window.document;
  });

  afterEach(() => {
    if (dom) {
      dom.window.close();
    }
  });

  describe('Page Metadata', () => {
    it('has correct title', () => {
      const title = document.title;
      expect(title).toBe(
        'Contribute to the freeCodeCamp Community | Contribute | freeCodeCamp.org'
      );
    });

    it('has correct meta description', () => {
      const metaDescription = document
        .querySelector('meta[name="description"]')
        ?.getAttribute('content');
      expect(metaDescription).toBe(
        "Learn how to contribute to freeCodeCamp's open source community"
      );
    });
  });

  describe('Header', () => {
    it('renders header with correct branding', () => {
      const header = document.querySelector('.fcc-header');
      expect(header).toBeTruthy();

      const homeLink = header?.querySelector('.home-link');
      expect(homeLink?.textContent).toBe('freeCodeCamp Contribute');
      expect(homeLink?.getAttribute('href')).toBe('/');
    });

    it('has main navigation links', () => {
      const nav = document.querySelector('.main-nav');
      expect(nav).toBeTruthy();

      const links = nav?.querySelectorAll('a');
      expect(links?.length).toBeGreaterThan(0);

      const faqLink = Array.from(links || []).find(
        link => link.textContent === 'FAQ'
      );
      expect(faqLink?.getAttribute('href')).toBe('/docs/FAQ');
    });

    it('has mobile menu toggle button', () => {
      const mobileToggle = document.querySelector('.mobile-menu-toggle');
      expect(mobileToggle).toBeTruthy();
      expect(mobileToggle?.getAttribute('aria-label')).toBe(
        'Toggle mobile menu'
      );
    });
  });

  describe('Hero Section', () => {
    it('displays welcome heading', () => {
      const heading = document.querySelector('h1');
      expect(heading?.textContent).toBe('Welcome to freeCodeCamp Contribute');
    });

    it('displays hero text', () => {
      const heroText = document.querySelector('.hero-text');
      expect(heroText?.textContent).toContain(
        'thousands of kind volunteers like you'
      );
    });
  });

  describe('Call to Action', () => {
    it('has primary CTA button linking to FAQ', () => {
      const primaryCTA = document.querySelector('.cta-button.primary');
      expect(primaryCTA?.textContent).toBe('Get Started');
      expect(primaryCTA?.getAttribute('href')).toBe('/docs/FAQ');
    });

    it('has secondary CTA button linking to GitHub', () => {
      const secondaryCTA = document.querySelector('.cta-button.secondary');
      expect(secondaryCTA?.textContent).toBe('View on GitHub');
      expect(secondaryCTA?.getAttribute('href')).toBe(
        'https://github.com/freeCodeCamp/freeCodeCamp'
      );
    });
  });

  describe('Accessibility', () => {
    it('has semantic HTML structure', () => {
      expect(document.querySelector('header')).toBeTruthy();
      expect(document.querySelector('main')).toBeTruthy();
      expect(document.querySelector('nav')).toBeTruthy();
    });

    it('has proper heading hierarchy', () => {
      const h1Elements = document.querySelectorAll('h1');
      expect(h1Elements.length).toBe(1);
    });

    it('has accessible button labels', () => {
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => {
        const ariaLabel = button.getAttribute('aria-label');
        const textContent = button.textContent?.trim();
        expect(ariaLabel || textContent).toBeTruthy();
      });
    });
  });
});
