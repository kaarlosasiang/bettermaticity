// Shared look for the long-form legal pages (Terms, Privacy): one source of classes so
// both read as the same kind of document.
export const legal = {
  section: 'border-b border-line py-10 first:pt-0 last:border-b-0 last:pb-0',
  h2: 'mb-4 text-xl font-bold tracking-[-0.02em] text-heading sm:text-2xl',
  h3: 'mt-6 mb-3 text-base font-bold text-heading sm:text-lg',
  p: 'mb-4 text-[0.9375rem] leading-7 text-ink-soft last:mb-0',
  list: 'my-4 list-disc space-y-2 pl-5 marker:text-royal',
  listItem: 'text-[0.9375rem] leading-7 text-ink-soft',
  dotItem:
    "relative pl-5 text-[0.9375rem] leading-7 text-ink-soft before:absolute before:top-[0.7em] before:left-0 before:size-1.5 before:bg-royal before:content-['']",
  note: 'my-5 flex gap-3 border border-line bg-surface-subtle px-5 py-4',
  noteIcon: 'mt-0.5 shrink-0 text-royal',
  noteText: 'm-0 text-sm leading-6 text-ink-soft',
  callout: 'my-6 border border-line bg-white p-5',
  calloutTitle: 'mb-3 flex items-center gap-2 text-sm font-bold text-heading [&_svg]:text-royal',
  calloutItem:
    "relative mb-2 pl-5 text-sm leading-6 text-ink-soft last:mb-0 before:absolute before:left-0 before:text-royal before:content-['→']",
  highlight: 'my-5 flex items-center gap-3 border-l-4 border-royal bg-royal-tint px-5 py-4',
  highlightIcon: 'size-5 shrink-0 text-royal',
  highlightText: 'text-[0.9375rem] text-heading',
  strong: 'font-semibold text-heading',
  link: 'font-semibold text-royal underline-offset-2 hover:underline',
  contactButton:
    'inline-flex h-11 items-center gap-2 rounded-btn bg-royal px-5 text-sm font-semibold text-white transition-colors hover:bg-navy',
  footnote: 'mt-6 border-t border-line pt-6 text-sm text-ink-muted',
} as const;
