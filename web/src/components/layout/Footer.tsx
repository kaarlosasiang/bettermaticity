import { useState, useEffect } from 'react';
import { Boxes, Mail } from 'lucide-react';
import { FaFacebookF, FaLinkedinIn, FaDiscord, FaGithub } from 'react-icons/fa6';
import { useLanguage } from '@/hooks/useLanguage';
import { Container } from '@/components/primitives';
import { AppLink } from '@/components/AppLink';

const social = [
  { Icon: FaFacebookF, href: 'https://www.facebook.com/bettermati.org', label: 'Facebook' },
  { Icon: FaLinkedinIn, href: 'https://www.linkedin.com/company/bettermati/', label: 'LinkedIn' },
  { Icon: FaDiscord, href: 'https://discord.com/invite/qeSu7RJkjQ', label: 'Discord' },
];

// [href, i18n key, external?]
const quickLinks: [string, string, boolean][] = [
  ['https://quiz.bettermati.org/', 'footer-mati-quiz', true],
  ['/sitemap', 'footer-sitemap', false],
  [
    'https://mati.gov.ph/wp-content/uploads/2025/10/As-of-October-21-2025-2.pdf',
    'footer-citizens-charter',
    true,
  ],
  ['/terms', 'footer-terms', false],
  ['/privacy', 'footer-privacy', false],
  ['/accessibility', 'footer-accessibility', false],
  ['/faq', 'footer-faq', false],
];

const resources: [string, string][] = [
  ['https://data.gov.ph', 'footer-open-data'],
  ['https://www.foi.gov.ph/', 'footer-foi'],
  ['https://mati.gov.ph/', 'footer-lgu-portal'],
  ['https://sangguniangbayan.mati.gov.ph/', 'footer-sb'],
  ['https://www.facebook.com/OfficialLguMatiFanpage/', 'footer-lgu-facebook'],
  ['https://blgf.gov.ph/', 'footer-blgf'],
  ['https://cmci.dti.gov.ph/', 'footer-cmci'],
];

const partners = [
  {
    href: 'https://abakada.org',
    src: '/assets/images/logo/abakada-footer.svg',
    alt: 'Abakada.org',
  },
  {
    href: 'https://hivcareph.org/',
    src: '/assets/images/logo/hiv-care-logo-footer.svg',
    alt: 'HIV Care Philippines',
  },
  {
    href: 'https://bettergov.ph',
    src: '/assets/images/logo/bettergov-footer.svg',
    alt: 'BetterGov.ph',
  },
];

const linkClass = 'block text-[0.8125rem] text-white/80 transition-colors hover:text-white';
const headingClass = 'mb-5 text-[0.8125rem] font-semibold tracking-[0.5px] text-white/50 uppercase';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const [version, setVersion] = useState('');

  useEffect(() => {
    fetch('/version.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.version) setVersion(data.version);
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-[linear-gradient(180deg,#1a1a1a_0%,#111111_100%)] text-white">
      <Container>
        <div className="grid gap-8 border-b border-white/10 pt-[60px] pb-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
          {/* Brand */}
          <div className="max-w-[320px]">
            <img
              src="/assets/images/logo/better-mati-logo-white.png"
              alt="Better Mati logo"
              className="mb-4 h-13 w-auto"
            />
            <p className="mb-6 text-sm/[1.6] text-white/70">{t('footer-tagline')}</p>
            <div className="flex gap-3">
              {social.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-[10px] bg-white/8 text-lg text-white/70 transition hover:-translate-y-0.5 hover:bg-primary hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className={headingClass}>{t('footer-quick-links')}</h4>
            <ul className="space-y-2">
              {quickLinks.map(([href, key, external]) => (
                <li key={key}>
                  {external ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {t(key)}
                    </a>
                  ) : (
                    <AppLink to={href} className={linkClass}>
                      {t(key)}
                    </AppLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className={headingClass}>{t('footer-resources')}</h4>
            <ul className="space-y-2">
              {resources.map(([href, key]) => (
                <li key={key}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cost + contribute + partners */}
          <div>
            <div
              className="inline-flex items-center gap-1.5 rounded-md bg-[rgba(6,167,125,0.08)] px-3 py-1.5 text-xs whitespace-nowrap text-white/80"
              role="status"
              aria-label="Cost to the People of Mati: Zero Pesos"
            >
              {t('footer-cost')} <span className="font-bold text-brand-success">₱0</span>
            </div>
            <a
              href="mailto:volunteer@bettermati.org"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-[0.8125rem] text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <Mail className="size-4" /> {t('footer-volunteer')}
            </a>
            <a
              href="https://github.com/BetterMati/bettermati"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-[0.8125rem] text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <FaGithub className="size-4" /> {t('footer-contribute')}
            </a>
            <div className="mt-4 flex items-center gap-5">
              {partners.map((p) => (
                <a
                  key={p.alt}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={p.alt}
                  className="inline-flex items-center opacity-60 transition-opacity hover:opacity-100"
                >
                  <img src={p.src} alt={p.alt} className="h-[54px] w-auto" loading="lazy" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center gap-1.5 py-6 text-[0.8125rem] text-white/50">
          <span className="text-white/60">
            &copy; {currentYear} {t('footer-copyright-text')}
          </span>
          <span className="text-white/45">MIT | CC BY 4.0</span>
          <span className="text-white/40">{t('footer-copyright-disclaimer')}</span>
          <span className="ml-auto inline-flex items-center gap-1.5 whitespace-nowrap">
            <Boxes className="size-3.5" /> {version ? `Ver. ${version}` : ''}
          </span>
        </div>
      </Container>
    </footer>
  );
}
