import type { LucideIcon } from 'lucide-react';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { ServiceOnlineAction } from '@/components/ServiceOnlineAction';
import type { OnlineActionId } from '@/lib/serviceOnlineActions';

export interface CategoryService {
  Icon: LucideIcon;
  titleKey: string;
  descKey: string;
  /** Only use sourced local fees and times; otherwise the card asks the office. */
  fee?: string;
  time?: string;
  to?: string;
  onlineId?: OnlineActionId;
}

export function ServiceCards({ services }: { services: CategoryService[] }) {
  const { t } = useLanguage();
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {services.map(({ Icon, titleKey, descKey, fee, time, to, onlineId }) => (
        <article
          key={titleKey}
          className="flex min-w-0 flex-col rounded-xl border border-border bg-card p-5"
        >
          <h3 className="mb-2 flex items-center gap-2 text-base font-bold text-foreground">
            <Icon className="size-5 shrink-0 text-primary" aria-hidden="true" />
            {to ? (
              <AppLink to={to} className="hover:text-primary hover:underline">
                {t(titleKey)}
              </AppLink>
            ) : (
              t(titleKey)
            )}
          </h3>
          <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{t(descKey)}</p>
          <dl className="flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-3 text-xs text-muted-foreground">
            <div>
              <dt className="inline font-semibold text-foreground">{t('label-fee')}</dt>{' '}
              <dd className="inline">{fee ?? t('service-confirm-office')}</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-foreground">{t('label-time')}</dt>{' '}
              <dd className="inline">{time ?? t('service-confirm-office')}</dd>
            </div>
          </dl>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            {onlineId && <ServiceOnlineAction id={onlineId} compact />}
            {to && (
              <AppLink
                to={to}
                className="text-xs font-medium text-primary underline underline-offset-4"
              >
                {t('service-local-guide')}
                <span className="sr-only">: {t(titleKey)}</span>
              </AppLink>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
