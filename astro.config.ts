import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import nimbus, {
  defineConfig as defineNimbusConfig
} from '@cloudflare/nimbus-docs';
import { tableScroll } from '@cloudflare/nimbus-docs/markdown';
import sidebar from './src/sidebar';

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
