import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { sidebar } from './src/sidebar';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/index': '/intro',
    '/FAQ': '/faq'
  },
  integrations: [
    starlight({
      title: 'Contribute | freeCodeCamp.org',
      description: 'Contribute to freeCodeCamp.org',
      locales: {
        root: {
          label: 'English',
          lang: 'en'
        }
        // es: {
        //   label: 'Español',
        //   lang: 'es'
        // }
        // de: {
        //   label: 'German',
        //   lang: 'de'
        // },
        // it: {
        //   label: 'Italian',
        //   lang: 'it'
        // },
        // jp: {
        //   label: 'Japanese',
        //   lang: 'jp'
        // },
        // pt: {
        //   label: 'Portuguese',
        //   lang: 'pt'
        // },
        // uk: {
        //   label: 'Ukrainian',
        //   lang: 'uk'
        // },
        // zh: {
        //   label: 'Chinese',
        //   lang: 'zh'
        // },
        // 'zh-Tw': {
        //   label: 'Chinese Traditional',
        //   lang: 'zh-TW'
        // }
      },
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
        discord:
          'https://discord.com/invite/freecodecamp-org-official-fi-fo-692816967895220344'
      },
      sidebar: sidebar,
      components: {
        // Override the default `SocialIcons` component.
        Header: './src/components/FCCHeader.astro',
        ThemeProvider: './src/components/FCCThemeProvider.astro',
        ThemeSelect: './src/components/FCCThemeSelect.astro'
      },
      customCss: [
        // Relative path to your custom CSS file
        './src/styles/theme.css'
      ]
    })
  ],
  output: 'server',
  adapter: node({
    mode: 'middleware'
  })
});
