import type { ReactNode } from 'react';
import { Container, Eyebrow } from '@/components/primitives';

// Contents list on the left (sticky from lg; a wrapped row of links above the text on
// smaller screens), the document on the right.
export function LegalLayout({
  contentsLabel,
  toc,
  children,
}: {
  contentsLabel: string;
  toc: { href: string; label: string }[];
  children: ReactNode;
}) {
  return (
    <section className="bg-white py-10 sm:py-12 lg:py-16">
      <Container className="lg:grid lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-12">
        <nav
          aria-label={contentsLabel}
          className="mb-10 border-b border-line pb-6 lg:sticky lg:top-[calc(var(--sticky-offset)+1.5rem)] lg:mb-0 lg:max-h-[calc(100vh-var(--sticky-offset)-3rem)] lg:self-start lg:overflow-y-auto lg:border-b-0 lg:pb-0"
        >
          <Eyebrow>{contentsLabel}</Eyebrow>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 lg:flex-col lg:gap-0 lg:border-l lg:border-line">
            {toc.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm font-semibold text-royal hover:underline lg:-ml-px lg:block lg:border-l-2 lg:border-transparent lg:py-1.5 lg:pl-4 lg:font-medium lg:text-ink-soft lg:hover:border-royal lg:hover:text-royal lg:hover:no-underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <article className="max-w-3xl">{children}</article>
      </Container>
    </section>
  );
}
