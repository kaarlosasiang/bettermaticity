// Shared spacing and type scale for the white page heroes, so PageHeader and the hand-built
// heroes (Statistics, Budget, Government) stay in step. Hierarchy, top to bottom: mono
// eyebrow → large bold title (max 48px) → medium-weight dark lede → small muted facts.
export const heroClasses = {
  section: 'border-b border-line bg-white pt-8 pb-12 sm:pt-12 lg:pt-16 lg:pb-20',
  breadcrumb: 'mb-8 lg:mb-10',
  title:
    'mt-3 font-display text-[2.25rem] leading-[1.05] font-bold tracking-[-0.03em] text-balance sm:text-[2.75rem] lg:text-[3rem] text-heading',
  lede: 'mt-5 max-w-[42rem] text-lg leading-snug font-medium text-ink sm:text-[1.375rem]',
  meta: 'mt-6 text-[0.9375rem] text-ink-muted',
} as const;
