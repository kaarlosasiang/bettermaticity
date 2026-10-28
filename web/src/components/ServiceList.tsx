import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, Clock, ReceiptText } from 'lucide-react';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { ServiceOnlineAction } from '@/components/ServiceOnlineAction';
import type { OnlineActionId } from '@/lib/serviceOnlineActions';

export interface CategoryService {
  Icon: LucideIcon;
  titleKey: string;
  descKey: string;
  /** Only use sourced local fees and times; otherwise the row asks the office. */
  fee?: string;
  time?: string;
  to?: string;
  onlineId?: OnlineActionId;
}

interface ServiceListProps {
  services: CategoryService[];
  title: ReactNode;
  lede?: ReactNode;
  headingId?: string;
  /** Shown instead of the rows when `services` is empty (e.g. a search with no matches). */
  emptyText?: ReactNode;
}

// One bordered list of services with hairline rows (BetterSanFernando category page):
// title, description and any online option on the left; time, fee and the guide link on
// the right.
export function ServiceList({
  services,
  title,
  lede,
  headingId = 'services-list-heading',
  emptyText,
}: ServiceListProps) {
  const { t } = useLanguage();
  return (
    <div>
      <div className="flex flex-col justify-between gap-4 border-t border-line pt-6 pb-5 md:flex-row md:items-end">
        <div>
          <h2
            id={headingId}
            className="font-display text-2xl font-bold tracking-[-0.02em] text-heading md:text-3xl"
          >
            {title}
          </h2>
          {lede ? <p className="mt-2 text-sm leading-6 text-ink-soft">{lede}</p> : null}
        </div>
        <p className="text-xs font-medium text-ink-faint" aria-live="polite">
          {t('services-count', { count: services.length })}
        </p>
      </div>

      {services.length === 0 ? (
        <p className="border border-line bg-white px-6 py-10 text-center text-sm text-ink-muted">
          {emptyText}
        </p>
      ) : (
        <div className="divide-y divide-line border border-line bg-white">
          {services.map(({ titleKey, descKey, fee, time, to, onlineId }) => (
            <article
              key={titleKey}
              className="px-4 py-6 transition-colors hover:bg-surface-subtle md:px-6"
            >
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-10">
                <div className="min-w-0">
                  <h3 className="text-lg leading-snug font-bold text-heading md:text-xl">
                    {to ? (
                      <AppLink to={to} className="hover:text-royal">
                        {t(titleKey)}
                      </AppLink>
                    ) : (
                      t(titleKey)
                    )}
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-muted">{t(descKey)}</p>
                  {onlineId ? (
                    <div className="mt-4 border-t border-line pt-3">
                      <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-ink-faint uppercase">
                        {t('service-online-label')}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2">
                        <ServiceOnlineAction id={onlineId} compact />
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="grid content-start gap-3 text-sm text-ink-soft sm:grid-cols-2 lg:grid-cols-1">
                  <p className="flex items-start gap-2">
                    <Clock className="mt-0.5 size-4 shrink-0 text-ink-faint" aria-hidden="true" />
                    <span>
                      <span className="font-semibold text-heading">
                        {t('label-processing-time')}
                      </span>{' '}
                      {time ?? t('service-confirm-office')}
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <ReceiptText
                      className="mt-0.5 size-4 shrink-0 text-ink-faint"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="font-semibold text-heading">{t('label-fee')}</span>{' '}
                      {fee ?? t('service-confirm-office')}
                    </span>
                  </p>
                  {to ? (
                    <AppLink
                      to={to}
                      className="inline-flex w-fit items-center gap-1.5 font-semibold text-royal hover:underline"
                    >
                      {t('service-local-guide')}
                      <span className="sr-only">: {t(titleKey)}</span>
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </AppLink>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
