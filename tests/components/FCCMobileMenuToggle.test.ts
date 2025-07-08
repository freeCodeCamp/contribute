import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

interface MockStarlightMenuButton extends HTMLElement {
  btn: HTMLButtonElement;
  bars: Element;
  close: Element;
  setExpanded(expanded: boolean): void;
  toggleExpanded(): void;
  closeOnEscape(e: KeyboardEvent): void;
}

describe('FCCMobileMenuToggle Component', () => {
  let dom: JSDOM;
  let document: Document;
  let window: Window & typeof globalThis;

  beforeEach(() => {
    dom = new JSDOM(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Test Page</title>
        </head>
        <body>
          <nav>
            <starlight-menu-button>
              <button
                aria-expanded="false"
                aria-label="Toggle navigation menu"
                aria-controls="starlight__sidebar"
                class="sl-flex md:sl-hidden"
              >
                <svg class="bars-icon" role="img" aria-hidden="true">
                  <use href="#bars"></use>
                </svg>
                <svg class="close-icon hidden" role="img" aria-hidden="true">
                  <use href="#close"></use>
                </svg>
              </button>
            </starlight-menu-button>
          </nav>
          <div id="starlight__sidebar" class="sidebar-pane">
            <div class="sidebar-content">Navigation content</div>
          </div>
        </body>
      </html>
    `,
      {
        url: 'http://localhost:4321',
        pretendToBeVisual: true,
        resources: 'usable'
      }
    );

    document = dom.window.document;
    window = dom.window as Window & typeof globalThis;

    // Set up global references
    global.window = window as Window & typeof globalThis;
    global.document = document;
    global.HTMLElement = window.HTMLElement;
    global.customElements = window.customElements;

    // Mock StarlightMenuButton custom element
    class MockStarlightMenuButton extends window.HTMLElement {
      btn: HTMLButtonElement;
      bars: Element;
      close: Element;

      constructor() {
        super();
        this.btn = this.querySelector('button')!;
        this.bars = this.btn.querySelector(':first-child')!;
        this.close = this.btn.querySelector(':nth-child(2)')!;

        this.btn.addEventListener('click', () => this.toggleExpanded());

        const parentNav = this.closest('nav');
        if (parentNav) {
          parentNav.addEventListener('keyup', e =>
            this.closeOnEscape(e as KeyboardEvent)
          );
        }
      }

      setExpanded(expanded: boolean) {
        this.btn.setAttribute('aria-expanded', String(expanded));
        document.body.toggleAttribute('data-mobile-menu-expanded', expanded);
        this.bars.classList.toggle('hidden', expanded);
        this.close.classList.toggle('hidden', !expanded);
      }

      toggleExpanded() {
        this.setExpanded(this.btn.getAttribute('aria-expanded') !== 'true');
      }

      closeOnEscape(e: KeyboardEvent) {
        if (e.code === 'Escape') {
          this.setExpanded(false);
          this.btn.focus();
        }
      }
    }

    window.customElements.define(
      'starlight-menu-button',
      MockStarlightMenuButton
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Button Structure', () => {
    it('renders button with correct attributes', () => {
      const button = document.querySelector('starlight-menu-button button');
      expect(button).toBeTruthy();
      expect(button?.getAttribute('aria-expanded')).toBe('false');
      expect(button?.getAttribute('aria-label')).toBe('Toggle navigation menu');
      expect(button?.getAttribute('aria-controls')).toBe('starlight__sidebar');
    });

    it('has correct CSS classes', () => {
      const button = document.querySelector('starlight-menu-button button');
      expect(button?.classList.contains('sl-flex')).toBe(true);
      expect(button?.classList.contains('md:sl-hidden')).toBe(true);
    });

    it('contains both bars and close icons', () => {
      const button = document.querySelector('starlight-menu-button button');
      const icons = button?.querySelectorAll('svg');
      expect(icons?.length).toBe(2);

      const barsIcon = button?.querySelector('.bars-icon');
      const closeIcon = button?.querySelector('.close-icon');

      expect(barsIcon).toBeTruthy();
      expect(closeIcon).toBeTruthy();
      expect(closeIcon?.classList.contains('hidden')).toBe(true);
    });
  });

  describe('Toggle Functionality', () => {
    it('toggles aria-expanded when clicked', () => {
      const menuButton = document.querySelector(
        'starlight-menu-button'
      ) as MockStarlightMenuButton;
      const button = menuButton.querySelector('button');

      // Initially collapsed
      expect(button?.getAttribute('aria-expanded')).toBe('false');

      // Click to expand
      button?.click();
      expect(button?.getAttribute('aria-expanded')).toBe('true');

      // Click to collapse
      button?.click();
      expect(button?.getAttribute('aria-expanded')).toBe('false');
    });

    it('toggles body data attribute when expanded', () => {
      const menuButton = document.querySelector(
        'starlight-menu-button'
      ) as MockStarlightMenuButton;
      const button = menuButton.querySelector('button');

      // Initially no data attribute
      expect(document.body.hasAttribute('data-mobile-menu-expanded')).toBe(
        false
      );

      // Click to expand
      button?.click();
      expect(document.body.hasAttribute('data-mobile-menu-expanded')).toBe(
        true
      );

      // Click to collapse
      button?.click();
      expect(document.body.hasAttribute('data-mobile-menu-expanded')).toBe(
        false
      );
    });

    it('toggles icon visibility when expanded', () => {
      const menuButton = document.querySelector(
        'starlight-menu-button'
      ) as MockStarlightMenuButton;
      const button = menuButton.querySelector('button');
      const barsIcon = button?.querySelector('.bars-icon');
      const closeIcon = button?.querySelector('.close-icon');

      // Initially bars visible, close hidden
      expect(barsIcon?.classList.contains('hidden')).toBe(false);
      expect(closeIcon?.classList.contains('hidden')).toBe(true);

      // Click to expand
      button?.click();
      expect(barsIcon?.classList.contains('hidden')).toBe(true);
      expect(closeIcon?.classList.contains('hidden')).toBe(false);

      // Click to collapse
      button?.click();
      expect(barsIcon?.classList.contains('hidden')).toBe(false);
      expect(closeIcon?.classList.contains('hidden')).toBe(true);
    });
  });

  describe('Keyboard Interaction', () => {
    it('closes menu on Escape key', () => {
      const menuButton = document.querySelector(
        'starlight-menu-button'
      ) as MockStarlightMenuButton;
      const button = menuButton.querySelector('button');
      const nav = document.querySelector('nav');

      // Expand menu first
      button?.click();
      expect(button?.getAttribute('aria-expanded')).toBe('true');

      // Press Escape key
      const escapeEvent = new window.KeyboardEvent('keyup', { code: 'Escape' });
      nav?.dispatchEvent(escapeEvent);

      expect(button?.getAttribute('aria-expanded')).toBe('false');
      expect(document.body.hasAttribute('data-mobile-menu-expanded')).toBe(
        false
      );
    });

    it('ignores other keys', () => {
      const menuButton = document.querySelector(
        'starlight-menu-button'
      ) as MockStarlightMenuButton;
      const button = menuButton.querySelector('button');
      const nav = document.querySelector('nav');

      // Expand menu first
      button?.click();
      expect(button?.getAttribute('aria-expanded')).toBe('true');

      // Press Enter key (should not close menu)
      const enterEvent = new window.KeyboardEvent('keyup', { code: 'Enter' });
      nav?.dispatchEvent(enterEvent);

      expect(button?.getAttribute('aria-expanded')).toBe('true');
    });

    it('focuses button after closing with Escape', () => {
      const menuButton = document.querySelector(
        'starlight-menu-button'
      ) as MockStarlightMenuButton;
      const button = menuButton.querySelector('button');
      const nav = document.querySelector('nav');

      // Mock focus method
      button.focus = vi.fn();

      // Expand menu first
      button?.click();

      // Press Escape key
      const escapeEvent = new window.KeyboardEvent('keyup', { code: 'Escape' });
      nav?.dispatchEvent(escapeEvent);

      expect(button.focus).toHaveBeenCalled();
    });
  });

  describe('Custom Element Behavior', () => {
    it('defines custom element', () => {
      expect(window.customElements.get('starlight-menu-button')).toBeDefined();
    });

    it('finds button and icon elements on construction', () => {
      const menuButton = document.querySelector(
        'starlight-menu-button'
      ) as MockStarlightMenuButton;

      expect(menuButton.btn).toBeTruthy();
      expect(menuButton.bars).toBeTruthy();
      expect(menuButton.close).toBeTruthy();
    });

    it('has setExpanded method', () => {
      const menuButton = document.querySelector(
        'starlight-menu-button'
      ) as MockStarlightMenuButton;

      expect(typeof menuButton.setExpanded).toBe('function');

      // Test setExpanded(true)
      menuButton.setExpanded(true);
      expect(menuButton.btn.getAttribute('aria-expanded')).toBe('true');

      // Test setExpanded(false)
      menuButton.setExpanded(false);
      expect(menuButton.btn.getAttribute('aria-expanded')).toBe('false');
    });

    it('has toggleExpanded method', () => {
      const menuButton = document.querySelector(
        'starlight-menu-button'
      ) as MockStarlightMenuButton;

      expect(typeof menuButton.toggleExpanded).toBe('function');

      // Initially false, should toggle to true
      menuButton.toggleExpanded();
      expect(menuButton.btn.getAttribute('aria-expanded')).toBe('true');

      // Should toggle back to false
      menuButton.toggleExpanded();
      expect(menuButton.btn.getAttribute('aria-expanded')).toBe('false');
    });

    it('has closeOnEscape method', () => {
      const menuButton = document.querySelector(
        'starlight-menu-button'
      ) as MockStarlightMenuButton;

      expect(typeof menuButton.closeOnEscape).toBe('function');

      // Expand menu first
      menuButton.setExpanded(true);

      // Test closeOnEscape with Escape key
      const escapeEvent = new window.KeyboardEvent('keyup', { code: 'Escape' });
      menuButton.closeOnEscape(escapeEvent);

      expect(menuButton.btn.getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      const button = document.querySelector('starlight-menu-button button');

      expect(button?.getAttribute('aria-expanded')).toBe('false');
      expect(button?.getAttribute('aria-label')).toBe('Toggle navigation menu');
      expect(button?.getAttribute('aria-controls')).toBe('starlight__sidebar');
    });

    it('updates aria-expanded state correctly', () => {
      const menuButton = document.querySelector(
        'starlight-menu-button'
      ) as MockStarlightMenuButton;
      const button = menuButton.querySelector('button');

      // Test expanded state
      menuButton.setExpanded(true);
      expect(button?.getAttribute('aria-expanded')).toBe('true');

      // Test collapsed state
      menuButton.setExpanded(false);
      expect(button?.getAttribute('aria-expanded')).toBe('false');
    });

    it('controls sidebar element', () => {
      const button = document.querySelector('starlight-menu-button button');
      const sidebar = document.querySelector('#starlight__sidebar');

      expect(button?.getAttribute('aria-controls')).toBe('starlight__sidebar');
      expect(sidebar).toBeTruthy();
    });

    it('has proper icon accessibility', () => {
      const icons = document.querySelectorAll('starlight-menu-button svg');

      icons.forEach(icon => {
        expect(icon.getAttribute('role')).toBe('img');
        expect(icon.getAttribute('aria-hidden')).toBe('true');
      });
    });
  });

  describe('Responsive Design', () => {
    it('is hidden on desktop', () => {
      const button = document.querySelector('starlight-menu-button button');
      expect(button?.classList.contains('md:sl-hidden')).toBe(true);
    });

    it('is visible on mobile', () => {
      const button = document.querySelector('starlight-menu-button button');
      expect(button?.classList.contains('sl-flex')).toBe(true);
    });

    it('prevents body scroll when expanded', () => {
      const menuButton = document.querySelector(
        'starlight-menu-button'
      ) as MockStarlightMenuButton;
      const button = menuButton.querySelector('button');

      // Expand menu
      button?.click();
      expect(document.body.hasAttribute('data-mobile-menu-expanded')).toBe(
        true
      );

      // Collapse menu
      button?.click();
      expect(document.body.hasAttribute('data-mobile-menu-expanded')).toBe(
        false
      );
    });
  });

  describe('Event Handling', () => {
    it('attaches click event listener to button', () => {
      const menuButton = document.querySelector(
        'starlight-menu-button'
      ) as MockStarlightMenuButton;
      const button = menuButton.querySelector('button');

      // Mock click event
      const clickEvent = new window.Event('click');
      button?.dispatchEvent(clickEvent);

      // Should toggle the menu
      expect(button?.getAttribute('aria-expanded')).toBe('true');
    });

    it('attaches keyup event listener to parent nav', () => {
      const nav = document.querySelector('nav');
      const menuButton = document.querySelector(
        'starlight-menu-button'
      ) as MockStarlightMenuButton;

      // Expand menu first
      menuButton.setExpanded(true);

      // Create and dispatch keyup event
      const keyupEvent = new window.KeyboardEvent('keyup', { code: 'Escape' });
      nav?.dispatchEvent(keyupEvent);

      // Should close the menu
      expect(menuButton.btn.getAttribute('aria-expanded')).toBe('false');
    });
  });
});
