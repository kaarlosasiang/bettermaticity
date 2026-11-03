import { describe, expect, it } from 'vitest';
import { formatNewsDate, safeNewsUrl } from './useNews';

describe('safeNewsUrl', () => {
  it('accepts absolute http/https URLs', () => {
    expect(safeNewsUrl('https://facebook.com/posts/123')).toBe('https://facebook.com/posts/123');
    expect(safeNewsUrl('http://example.com')).toBe('http://example.com');
  });

  it('accepts site-relative and hash URLs', () => {
    expect(safeNewsUrl('/transparency/finance')).toBe('/transparency/finance');
    expect(safeNewsUrl('#section')).toBe('#section');
  });

  it('rejects javascript: and other schemes', () => {
    expect(safeNewsUrl('javascript:alert(1)')).toBe('');
    expect(safeNewsUrl('data:text/html,<script>alert(1)</script>')).toBe('');
  });

  it('rejects protocol-relative URLs that point at another host', () => {
    expect(safeNewsUrl('//evil.example.com/phish')).toBe('');
  });

  it('rejects relative-looking URLs that a browser resolves to another host', () => {
    // Browsers treat "\" as "/" and drop tabs and newlines, so these all mean "//host".
    expect(safeNewsUrl('/\\evil.example.com/phish')).toBe('');
    expect(safeNewsUrl('/\t/evil.example.com/phish')).toBe('');
    expect(safeNewsUrl('/\n/evil.example.com')).toBe('');
    expect(safeNewsUrl('/news?from=feed')).toBe('/news?from=feed');
  });

  it('returns empty for blank input', () => {
    expect(safeNewsUrl(null)).toBe('');
    expect(safeNewsUrl(undefined)).toBe('');
    expect(safeNewsUrl('')).toBe('');
    expect(safeNewsUrl('   ')).toBe('');
  });
});

describe('formatNewsDate', () => {
  it('formats ISO dates', () => {
    expect(formatNewsDate('2026-06-10')).toBe('Jun 10, 2026');
  });

  it('returns the input unchanged when unparseable', () => {
    expect(formatNewsDate('not-a-date')).toBe('not-a-date');
  });
});
