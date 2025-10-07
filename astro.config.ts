import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import starlight from '@astrojs/starlight';
import starlightScrollToTop from 'starlight-scroll-to-top';
import starlightLinksValidator from 'starlight-links-validator';
import sidebar from './src/sidebar';

const config = defineConfig({
  // @ts-expect-error - Vite 6/7 plugin type incompatibility: Astro 5 uses Vite 6, @tailwindcss/vite 4.1.14 uses Vite 7
  vite: { plugins: [tailwindcss()] },
  site: 'https://contribute.freecodecamp.org',
  redirects: {
    '/index': '/intro',
    '/FAQ': '/faq',
    '/how-to-work-on-the-docs-theme': '/how-to-work-on-the-docs-site'
  },
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
      sidebar: sidebar,
      plugins: [
        ...(process.env.CHECK_LINKS ? [starlightLinksValidator()] : []),
        starlightScrollToTop()
      ],
      customCss: ['./src/styles/global.css']
    })
  ]
});

export default config;
