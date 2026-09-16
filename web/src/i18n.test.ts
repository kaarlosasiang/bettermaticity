import { describe, it, expect } from 'vitest';
import i18n from '@/i18n';

describe('i18n', () => {
  it('initializes with English and resolves chrome + page keys', () => {
    expect(i18n.language).toBe('en');
    expect(i18n.t('nav-home')).toBe('Home');
    expect(i18n.t('health-page-title')).toBe('Health Services');
    // react-app-sourced key merged in from the converter overlay:
    expect(i18n.t('footer-mati-quiz')).toBe('Mati Quiz');
  });

  it('falls back to the raw key when missing', () => {
    expect(i18n.t('this-key-does-not-exist')).toBe('this-key-does-not-exist');
  });
});
