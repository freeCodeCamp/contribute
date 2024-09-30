import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

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
    react(),
    starlight({
      title: 'Contribute | freeCodeCamp.org',
      description: 'Contribute to freeCodeCamp.org',
      logo: {
        light: './public/icons/secondary_logo.svg',
        dark: './public/icons/primary_logo.svg',
        replacesTitle: true
      },
      favicon: 'favicon.ico',
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
      customCss: ['./src/styles/tailwind.css', './src/styles/override.css']
    }),
    tailwind({
      applyBaseStyles: false,
      configFile: './tailwind.config.mjs'
    })
  ]
});

export default config;
