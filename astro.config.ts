import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import starlight from '@astrojs/starlight';
import starlightScrollToTop from 'starlight-scroll-to-top';
import starlightLinksValidator from 'starlight-links-validator';

const config = defineConfig({
  vite: { plugins: [tailwindcss()] },
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
  integrations: [
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
      social: [
        {
          label: 'GitHub',
          href: 'https://github.com/freeCodeCamp',
          icon: 'github'
        },
        {
          label: 'Twitter',
          href: 'https://twitter.com/freeCodeCamp',
          icon: 'twitter'
        },
        {
          label: 'Discord',
          href: 'https://chat.freecodecamp.org',
          icon: 'discord'
        }
      ],
      components: {
        Sidebar: './src/components/FCCSidebar.astro'
      },
      plugins: [
        ...(process.env.CHECK_LINKS ? [starlightLinksValidator()] : []),
        starlightScrollToTop()
      ],
      customCss: ['./src/styles/global.css']
    })
  ]
});

export default config;
