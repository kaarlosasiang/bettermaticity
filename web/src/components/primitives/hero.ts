// Shared spacing and type scale for the white page heroes, so PageHeader and the hand-built
// heroes (Statistics, Budget, Government) stay in step. Copied from BetterSanFernando's
// page heroes (e.g. /projects/city-projects): breadcrumb → mono eyebrow → title (36/48px)
// → grey lede (16/18px) → small faint note.
export const heroClasses = {
  section: 'border-b border-line bg-white py-8 sm:py-10 lg:py-12',
  breadcrumb: 'mb-6',
  eyebrow:
    'flex items-center gap-2 font-mono text-[0.6875rem] leading-normal font-medium tracking-[0.18em] text-royal uppercase',
  title:
    'mt-3 font-display text-4xl leading-tight font-bold tracking-[-0.02em] text-balance text-heading md:text-5xl',
  lede: 'mt-5 text-base leading-7 text-ink-soft md:text-lg',
  /** Stronger lede used on the services pages (BetterSanFernando category hero). */
  ledeStrong: 'mt-4 text-lg leading-7 font-medium text-ink sm:text-xl',
  /** Small faint line under the lede. */
  note: 'mt-3 text-sm leading-6 text-ink-faint',
  meta: 'mt-2 text-sm text-ink-faint',
  /** Facts row: plain items spaced apart, no separators. */
  facts: 'mt-5 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-ink-faint',
} as const;
