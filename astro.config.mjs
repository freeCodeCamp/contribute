import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import starlight from '@astrojs/starlight';

import { sidebar } from './src/sidebar';

// https://astro.build/config
export default defineConfig({
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
        discord:
          'https://discord.com/invite/freecodecamp-org-official-fi-fo-692816967895220344'
      },
      sidebar: sidebar,
      components: {
        // Override the default `SocialIcons` component.
        Header: './src/components/FCCHeader.astro',
      },
    })
  ],
  output: 'hybrid',
  adapter: cloudflare({
    imageService: 'passthrough'
  })
});
