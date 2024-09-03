import starlightPlugin from '@astrojs/starlight-tailwind';

const gray = {
  100: '#ffffff', // gray 10
  150: '#d0d0d5', // gray 15
  750: '#3b3b4f', // gray 75
  800: '#2a2a40', // gray 80
  850: '#1b1b32', // gray 85
  900: '#0a0a23' // gray 90
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: { gray }
    }
  },
  plugins: [starlightPlugin()]
};
