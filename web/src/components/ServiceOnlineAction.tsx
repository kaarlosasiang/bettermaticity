import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { serviceReferences } from '@/lib/serviceReferences';
import { serviceOnlineActions, type OnlineActionId } from '@/lib/serviceOnlineActions';

export function ServiceOnlineAction({
  id,
  compact = false,
}: {
  id: OnlineActionId;
  compact?: boolean;
}) {
  const { t } = useLanguage();
  const action = serviceOnlineActions[id];
  const source = serviceReferences[action.sourceId];
  return (
    <div className={compact ? 'contents' : 'mt-3'}>
      <a
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs font-medium text-primary underline underline-offset-4 hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {t(action.labelKey)}
        <ExternalLink className="size-3 shrink-0" aria-hidden="true" />
        <span className="sr-only"> ({t('service-new-tab')})</span>
      </a>
      {compact ? (
        <details className="order-last w-full text-xs text-muted-foreground">
          <summary className="w-fit cursor-pointer hover:text-primary">
            {t('service-link-details')}
          </summary>
          <p className="mt-2 leading-relaxed">{t(action.noteKey)}</p>
          <a href={source.url} className="text-primary underline underline-offset-4">
            {t('service-link-source')}: {source.title}
          </a>
        </details>
      ) : (
        <>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t(action.noteKey)}</p>
          <a href={source.url} className="text-xs text-primary underline underline-offset-4">
            {t('service-link-source')}: {source.title}
          </a>
        </>
      )}
    </div>
  );
}
