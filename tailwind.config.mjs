import starlightPlugin from '@astrojs/starlight-tailwind';

// Generated color palettes
const accent = {
  200: '#c8c8c8',
  600: '#6b6b6b',
  900: '#323232',
  950: '#242424'
};
const gray = {
  100: '#f5f6fd',
  200: '#eaedfc',
  300: '#bec1d3',
  400: '#8489ab',
  500: '#525574',
  700: '#323552',
  800: '#22243f',
  900: '#161724'
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: { accent, gray }
    }
  },
  plugins: [starlightPlugin()]
};
