/**
 * Shared button styling — the single source of truth for both <Button>
 * (a real button) and <LinkButton> (an anchor styled as a button), so the
 * two stay visually identical.
 *
 * Token-mapped to Nimbus. Import `buttonVariants()` to compose the trigger
 * classes for a button-shaped element; `buttonIconSize` sizes a leading/
 * trailing icon for a given size.
 */
import { variants } from '@/lib/variants';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'destructive'
  | 'secondary-destructive'
  | 'outline';
export type ButtonSize = 'xs' | 'sm' | 'base' | 'lg';
export type ButtonShape = 'base' | 'square' | 'circle';

// `rounded-lg` is the default radius for every button; `circle` overrides
// it to `rounded-full` (see `buttonVariants`), `square` keeps it.
export const buttonBase =
  'group inline-flex max-w-full shrink-0 items-center justify-center rounded-lg text-center font-medium no-underline [text-wrap:balance] transition-all cursor-pointer select-none focus-visible:outline-3 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-80 disabled:ring-3 disabled:ring-inset disabled:ring-border-strong';

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground not-disabled:hover:bg-primary-hover aria-expanded:bg-primary-hover',
  secondary:
    'bg-card text-foreground ring-3 ring-inset ring-foreground not-disabled:hover:bg-foreground not-disabled:hover:text-background aria-expanded:bg-foreground aria-expanded:text-background',
  ghost:
    'bg-transparent text-foreground shadow-none not-disabled:hover:bg-accent aria-expanded:bg-accent',
  destructive:
    'bg-danger text-white shadow-sm not-disabled:hover:bg-danger/90 aria-expanded:bg-danger/90',
  'secondary-destructive':
    'bg-card text-danger ring ring-border shadow-sm not-disabled:hover:bg-accent not-disabled:hover:ring-danger/40 aria-expanded:bg-accent',
  outline:
    'bg-transparent text-foreground ring ring-border not-disabled:hover:ring-border-strong aria-expanded:ring-border-strong'
};

// Rectangular sizing (shape="base"). Radius comes from `buttonBase`.
export const buttonSizeText: Record<ButtonSize, string> = {
  xs: 'gap-1 px-2 py-1 text-sm',
  sm: 'gap-1 px-3 py-1.5 text-sm',
  base: 'gap-2 px-3.5 py-1.5 text-base',
  lg: 'gap-2 px-5 py-2.5 text-base'
};

// Square/circle sizing (icon-only): equal dimensions, no padding.
export const buttonSizeCompact: Record<ButtonSize, string> = {
  xs: 'size-7',
  sm: 'size-8',
  base: 'size-9',
  lg: 'size-10'
};

export const buttonIconSize: Record<ButtonSize, string> = {
  xs: 'h-3.5 w-3.5',
  sm: 'h-3.5 w-3.5',
  base: 'h-4 w-4',
  lg: 'h-[1.125rem] w-[1.125rem]'
};

export const buttonVariants = variants({
  base: buttonBase,
  variants: {
    variant: buttonVariantClasses,
    size: buttonSizeText,
    // Square and circle are icon-only: equal sides, no padding. Their size
    // comes from `compound` below.
    shape: { base: '', square: 'p-0', circle: 'p-0 rounded-full' }
  },
  defaults: { variant: 'secondary', size: 'base', shape: 'base' },
  compound: (['square', 'circle'] as const).flatMap(shape =>
    (Object.keys(buttonSizeCompact) as ButtonSize[]).map(size => ({
      shape,
      size,
      class: buttonSizeCompact[size]
    }))
  )
});
