import { readFile } from 'node:fs/promises';
import type { AstroIntegration } from 'astro';
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import nimbus, {
  defineConfig as defineNimbusConfig
} from '@cloudflare/nimbus-docs';
import { keyboardTableScroll } from './src/lib/table-scroll';
import sidebar from './src/sidebar';

const fontFaces = [
  { weight: 400, style: 'normal', hack: 'Regular' },
  { weight: 400, style: 'italic', hack: 'Italic' },
  { weight: 700, style: 'normal', hack: 'Bold' },
  { weight: 700, style: 'italic', hack: 'BoldItalic' }
] as const;

const hackVariants = fontFaces.map(({ weight, style, hack }) => ({
  src: [`./src/assets/fonts/hack-zeroslash/Hack-ZeroSlash-${hack}.woff2`] as [
    string
  ],
  weight,
  style
}));

const requireLato: AstroIntegration = {
  name: 'require-lato',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const html = await readFile(new URL('index.html', dir), 'utf8');
      if (!/@font-face\{font-family:Lato-/.test(html)) {
        throw new Error('Lato did not resolve from Fontsource.');
      }
    }
  }
};

const nimbusConfig = defineNimbusConfig({
  site: 'https://contribute.freecodecamp.org',
  title: 'Contribute | freeCodeCamp.org',
  description: 'Contribute to freeCodeCamp.org',
  locale: 'en',
  github: null,
  editPattern: 'https://github.com/freeCodeCamp/contribute/edit/main/{path}',
  sidebar: { items: sidebar },
  socialImageAlt: 'Contribute to freeCodeCamp'
});

export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-high-contrast' },
      defaultColor: false
    }
  },
  fonts: [
    {
      name: 'Lato',
      cssVariable: '--font-lato',
      provider: fontProviders.fontsource(),
      weights: [400, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext'],
      formats: ['woff2'],
      fallbacks: ['sans-serif']
    },
    {
      name: 'Hack-ZeroSlash',
      cssVariable: '--font-hack-zeroslash',
      provider: fontProviders.local(),
      fallbacks: ['monospace'],
      options: {
        variants: hackVariants as [
          (typeof hackVariants)[number],
          ...typeof hackVariants
        ]
      }
    }
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },
  integrations: [
    requireLato,
    nimbus(nimbusConfig, {
      rules: {
        'nimbus/frontmatter-shape': 'error',
        'nimbus/internal-link': [
          'error',
          { components: [{ name: 'LinkCard', attr: 'href' }] }
        ]
      },
      markdown: {
        hastPlugins: [keyboardTableScroll()],
        componentMap: {
          LinkButton: {
            revision: '1',
            render: ({ attrs, children }) =>
              `[${children.trim()}](${String(attrs.href)})`
          }
        }
      }
    })
  ]
});
