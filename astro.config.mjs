import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/index': '/intro',
    '/FAQ': '/faq'
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [
    starlight({
      title: 'Contribute | freeCodeCamp.org',
      description: 'Contribute to freeCodeCamp.org',
      logo: {
        src: './public/icons/icon-96x96.png',
        replacesTitle: true
      },
      tableOfContents: true,
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
      applyBaseStyles: false
    })
  ],
  output: 'server',
  adapter: node({
    mode: 'middleware'
  })
});
