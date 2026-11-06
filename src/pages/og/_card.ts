/**
 * The site's social cards, 1200 × 630 PNGs rendered at build time: the logo
 * over a hairline, then the page's section and title. `og/[...slug].ts`
 * draws one per page and `og.png.ts` the site's own, with its description as
 * the title. This file is the cards' look; edit it freely.
 *
 * `@cloudflare/nimbus-docs/og` does the rest: it loads the fonts, fits text
 * to its lines by measuring it, and renders the PNG. To use another script,
 * such as Chinese or Japanese, add a font that covers it to `fonts`.
 *
 * The leading underscore keeps Astro from routing this file or `_fonts/`.
 */
import {
  createCardRenderer,
  type CardNode,
  type CardTypography
} from '@cloudflare/nimbus-docs/og';
import { readFileSync } from 'node:fs';
import { root } from 'astro:config/server';

const FOREGROUND = '#ffffff';
const MUTED = '#d0d0d5';
const BORDER = '#3b3b4f';
const BACKGROUND = '#0a0a23';

const LOGO_RATIO = 2100 / 240;
const logoSource = `data:image/svg+xml;base64,${readFileSync(
  new URL('public/icons/primary_logo.svg', root)
).toString('base64')}`;

const WIDTH = 1200;
const HEIGHT = 630;
const LEFT = 80;
const COLUMN = WIDTH - LEFT - 200;

const TITLE: CardTypography = {
  fontFamily: 'Inter',
  fontWeight: 500,
  letterSpacing: '-0.025em',
  lineHeight: 1.1,
  color: FOREGROUND
};
const SECTION: CardTypography = {
  fontFamily: 'Inter',
  fontWeight: 400,
  lineHeight: 1.2,
  color: MUTED
};

// Fonts sit beside this file, not in public/, so they never ship. Read from
// the project so `astro build --root <site>` finds them.
const font = (file: string) => new URL(`src/pages/og/_fonts/${file}`, root);
const renderer = await createCardRenderer({
  width: WIDTH,
  height: HEIGHT,
  fonts: [
    { name: 'Inter', source: font('Inter-Regular.ttf'), weight: 400 },
    { name: 'Inter', source: font('Inter-Medium.ttf'), weight: 500 }
  ],
  emoji: 'strip'
});

type Style = Record<string, string | number>;
const el = (
  type: string,
  style: Style,
  children?: CardNode | (CardNode | undefined)[] | string
): CardNode => ({
  type,
  props: { style, children }
});

const Logo = (height: number): CardNode => ({
  type: 'img',
  props: {
    src: logoSource,
    width: Math.round(height * LOGO_RATIO),
    height
  }
});

async function card({
  section,
  title,
  sizes
}: {
  section?: string;
  title: string;
  sizes: number[];
}): Promise<CardNode> {
  const heading = await renderer.fit(title, {
    width: COLUMN,
    sizes,
    lines: 3,
    style: TITLE
  });
  const label = section
    ? await renderer.fit(section, {
        width: COLUMN,
        sizes: [26],
        lines: 1,
        style: SECTION
      })
    : undefined;
  return el(
    'div',
    {
      width: WIDTH,
      height: HEIGHT,
      display: 'flex',
      position: 'relative',
      background: BACKGROUND
    },
    [
      el(
        'div',
        { position: 'absolute', left: LEFT, top: 72, display: 'flex' },
        Logo(32)
      ),
      el('div', {
        position: 'absolute',
        left: LEFT,
        right: LEFT,
        top: 148,
        height: 0,
        borderTop: `1.5px solid ${BORDER}`
      }),
      // Hung from the hairline rather than set on the bottom margin: X crops
      // the card to 2:1 and covers its foot with the link's domain.
      el(
        'div',
        {
          position: 'absolute',
          left: LEFT,
          top: 204,
          display: 'flex',
          flexDirection: 'column'
        },
        [
          label && el('div', { display: 'flex', marginBottom: 18 }, label.node),
          heading.node
        ]
      )
    ]
  );
}

/** A page's card. */
export const renderPageCard = async (input: {
  section?: string;
  title: string;
}) => renderer.png(await card({ ...input, sizes: [64, 56, 50, 44] }));

/** The site's card: its description, or its title when it has none. */
export const renderSiteCard = async (input: { title: string }) =>
  renderer.png(await card({ ...input, sizes: [72, 64, 56, 50, 44] }));
