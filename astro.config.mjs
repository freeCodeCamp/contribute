import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
const config = defineConfig({
  site: 'https://contribute.freecodecamp.org',
  redirects: {
    '/index': '/intro/',
    '/FAQ': '/faq/'
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  trailingSlash: 'always',
  adapter: cloudflare({
    imageService: 'cloudflare'
    // platformProxy: {
    //   enabled: true
    // }
  }),
  output: 'hybrid',
  integrations: [
    starlight({
      title: 'Contribute | freeCodeCamp.org',
      description: 'Contribute to freeCodeCamp.org',
      logo: {
        src: './public/icons/icon-96x96.png',
        replacesTitle: true
      },
      favicon: './public/favicon-32x32.png',
      tableOfContents: {
        minHeadingLevel: 1,
        maxHeadingLevel: 2
      },
      editLink: {
        baseUrl: 'https://github.com/freeCodeCamp/contribute/edit/main/'
      },
      social: {
        github: 'https://github.com/freeCodeCamp',
        twitter: 'https://twitter.com/freeCodeCamp',
        discord: 'https://chat.freecodecamp.org'
      },
      //sidebar: sidebar,
      components: {
        // Override the default `SocialIcons` component.
        Header: './src/components/FCCHeader.astro',
        MobileMenuToggle: './src/components/FCCMobileMenuToggle.astro',
        ThemeProvider: './src/components/FCCThemeProvider.astro',
        ThemeSelect: './src/components/FCCThemeSelect.astro',
        Sidebar: './src/components/FCCSidebar.astro',
        Pagination: './src/components/FCCPagination.astro'
      },
      customCss: ['./src/styles/tailwind.css']
    }),
    tailwind({
      applyBaseStyles: false,
      configFile: './tailwind.config.mjs'
    })
  ]
});

export default config;
