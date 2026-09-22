import type { LucideIcon } from 'lucide-react';
import { Globe, ExternalLink, Building2 } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section } from '@/components/primitives';

export interface OnlineService {
  Icon: LucideIcon;
  href: string;
  titleKey: string;
  descKey: string;
  officeKey: string;
}

interface OnlineServicesProps {
  badgeKey: string;
  titleKey: string;
  subtitleKey: string;
  services: OnlineService[];
}

// Legacy .online-services-* block: external Filipizen portal transactions.
export function OnlineServices({ badgeKey, titleKey, subtitleKey, services }: OnlineServicesProps) {
  const { t } = useLanguage();

  return (
    <Section altBg>
      <Container>
        <div className="mb-6 text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-[0.8125rem] font-semibold text-primary">
            <Globe className="size-4" aria-hidden="true" />
            {t(badgeKey)}
          </span>
          <h2 className="m-0 mb-2 text-[1.375rem] font-semibold text-foreground">{t(titleKey)}</h2>
          <p className="m-0 text-sm text-muted-foreground">{t(subtitleKey)}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-[10px] bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-5 no-underline transition hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(43,98,238,0.35)]"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <s.Icon className="size-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="m-0 mb-1 text-sm font-semibold text-foreground">{t(s.titleKey)}</h4>
                <p className="m-0 mb-2 text-[0.8125rem] text-muted-foreground">{t(s.descKey)}</p>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Building2 className="size-3 text-primary" aria-hidden="true" />
                  {t(s.officeKey)}
                </span>
              </div>
              <ExternalLink
                className="size-4 shrink-0 text-muted-foreground transition group-hover:text-primary"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      </Container>
    </Section>
  );
}
