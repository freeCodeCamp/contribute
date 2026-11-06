import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import nimbus, {
  defineConfig as defineNimbusConfig
} from '@cloudflare/nimbus-docs';
import { tableScroll } from '@cloudflare/nimbus-docs/markdown';
import sidebar from './src/sidebar';

const fontFaces = [
  { weight: 400, style: 'normal', hack: 'Regular' },
  { weight: 400, style: 'italic', hack: 'Italic' },
  { weight: 700, style: 'normal', hack: 'Bold' },
  { weight: 700, style: 'italic', hack: 'BoldItalic' }
] as const;

const latoLatin = [
  'U+0000-00FF',
  'U+0131',
  'U+0152-0153',
  'U+02BB-02BC',
  'U+02C6',
  'U+02DA',
  'U+02DC',
  'U+0304',
  'U+0308',
  'U+0329',
  'U+2000-206F',
  'U+20AC',
  'U+2122',
  'U+2191',
  'U+2193',
  'U+2212',
  'U+2215',
  'U+FEFF',
  'U+FFFD'
] as [string, ...string[]];

const latoLatinExt = [
  'U+0100-02BA',
  'U+02BD-02C5',
  'U+02C7-02CC',
  'U+02CE-02D7',
  'U+02DD-02FF',
  'U+0304',
  'U+0308',
  'U+0329',
  'U+1D00-1DBF',
  'U+1E00-1E9F',
  'U+1EF2-1EFF',
  'U+2020',
  'U+20A0-20AB',
  'U+20AD-20C0',
  'U+2113',
  'U+2C60-2C7F',
  'U+A720-A7FF'
] as [string, ...string[]];

const latoFamily = (
  cssVariable: string,
  subset: string,
  unicodeRange: [string, ...string[]],
  fallbacks: string[]
) => {
  const variants = fontFaces.map(({ weight, style }) => ({
    src: [
      `./src/assets/fonts/lato/lato-${subset}-${weight}-${style}.woff2`
    ] as [string],
    weight,
    style,
    unicodeRange
  }));
  return {
    name: 'Lato',
    cssVariable,
    provider: fontProviders.local(),
    fallbacks,
    options: {
      variants: variants as [(typeof variants)[number], ...typeof variants]
    }
  };
};

const hackVariants = fontFaces.map(({ weight, style, hack }) => ({
  src: [`./src/assets/fonts/hack-zeroslash/Hack-ZeroSlash-${hack}.woff2`] as [
    string
  ],
  weight,
  style
}));

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
  fonts: [
    latoFamily('--font-lato', 'latin', latoLatin, []),
    latoFamily('--font-lato-ext', 'latin-ext', latoLatinExt, ['sans-serif']),
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
    nimbus(nimbusConfig, {
      rules: {
        'nimbus/frontmatter-shape': 'error',
        'nimbus/internal-link': [
          'error',
          { components: [{ name: 'LinkCard', attr: 'href' }] }
        ]
      },
      markdown: {
        hastPlugins: [tableScroll()],
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
