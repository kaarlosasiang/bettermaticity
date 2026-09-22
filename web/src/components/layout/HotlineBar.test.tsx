import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HotlineBar from './HotlineBar';
import { nationalHotline, primaryNumber, priorityHotlines } from '@/lib/hotlines';

// The bar renders two variants from one item list — a static row (>=lg) and a
// marquee (<lg) — so every hotline is exposed twice. The marquee's duplicate copy
// is aria-hidden, so it is deliberately NOT counted by *ByRole queries.
const VARIANTS = 2;

const expected = [nationalHotline, ...priorityHotlines].map((h) => ({
  short: h.short,
  ...primaryNumber(h),
}));

const track = (container: HTMLElement) =>
  container.querySelector<HTMLElement>('[class*="animate-hotline-scroll"]');

// Unprefixed only — must not match the `hover:[animation-play-state:paused]` variant.
const PAUSED = /(^|\s)\[animation-play-state:paused\]/;

describe('HotlineBar', () => {
  it('renders 911 first, then the flagged offices in priority order', () => {
    render(<HotlineBar />);
    const order = screen
      .getAllByRole('link')
      .slice(0, expected.length)
      .map((a) => a.textContent);

    expect(order).toEqual(expected.map((e) => `${e.short}: ${e.display}`));
  });

  it('links every number as a dialable tel: URL from the JSON feed', () => {
    render(<HotlineBar />);
    for (const e of expected) {
      const links = screen.getAllByRole('link', { name: `${e.short}: ${e.display}` });
      expect(links).toHaveLength(VARIANTS);
      for (const link of links) expect(link).toHaveAttribute('href', `tel:${e.tel}`);
    }
  });

  it('keeps the marquee duplicates out of the a11y tree and the tab order', () => {
    const { container } = render(<HotlineBar />);
    expect(screen.getAllByRole('link')).toHaveLength(expected.length * VARIANTS);

    const clones = container.querySelectorAll('a[aria-hidden="true"]');
    expect(clones).toHaveLength(expected.length);
    for (const clone of clones) expect(clone).toHaveAttribute('tabindex', '-1');
  });

  // WCAG 2.2.2 — the marquee auto-starts and runs well past 5s, so it needs a
  // pause mechanism that works without a pointer.
  it('auto-scrolls by default and can be paused and resumed by button', async () => {
    const user = userEvent.setup();
    const { container } = render(<HotlineBar />);

    expect(track(container)?.className).not.toMatch(PAUSED);

    const pause = screen.getByRole('button', { name: /pause/i });
    expect(pause).toHaveAttribute('aria-pressed', 'false');
    await user.click(pause);

    expect(track(container)?.className).toMatch(PAUSED);

    const resume = screen.getByRole('button', { name: /resume/i });
    expect(resume).toHaveAttribute('aria-pressed', 'true');
    await user.click(resume);

    expect(track(container)?.className).not.toMatch(PAUSED);
  });

  it('drops the animation and the duplicates under prefers-reduced-motion', () => {
    const { container } = render(<HotlineBar />);
    expect(track(container)?.className).toMatch(/motion-reduce:animate-none/);

    // The manual scroll fallback and the now-pointless clones/button are all
    // switched by the same media query.
    for (const clone of container.querySelectorAll('a[aria-hidden="true"]')) {
      expect(clone.className).toMatch(/motion-reduce:hidden/);
    }
    expect(screen.getByRole('button').className).toMatch(/motion-reduce:hidden/);
    expect(screen.getByRole('region').className).toMatch(/motion-reduce:overflow-x-auto/);
  });

  it('labels the marquee region', () => {
    render(<HotlineBar />);
    expect(screen.getByRole('region', { name: /emergency/i })).toBeInTheDocument();
  });
});
