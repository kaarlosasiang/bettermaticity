import { Mail, Phone, Clock } from 'lucide-react';
import { m, fadeUp } from '@/components/motion';
import { officialInitials } from '@/lib/utils';
import type { Official } from '@/lib/govData';

/**
 * Homepage-idiom person card: hairline-ring card, tinted-navy initials avatar,
 * navy name, royal title, optional contact block. Shared by the Government
 * overview and the Elected Officials subpage. Must render inside a <LazyMotion>.
 *
 * Photos are intentionally rendered as initials — the officials dataset has no
 * real photo files yet. When verified photos land, swap the avatar for an <img>.
 */
export function OfficialCard({ official, role }: { official: Official; role: string }) {
  return (
    <m.div
      variants={fadeUp}
      className="rounded-card bg-white p-6 text-center border border-line"
      style={{ borderTop: '3px solid #2b62ee' }}
    >
      <div
        className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-royal-tint font-display text-xl font-extrabold text-royal"
        aria-hidden="true"
      >
        {officialInitials(official.name)}
      </div>
      <h3 className="font-display text-base font-bold text-heading">{official.name}</h3>
      <p className="mt-0.5 text-sm font-semibold text-royal">{official.title || role}</p>
      {(official.email || official.phone || official.hours) && (
        <div className="mt-3 flex flex-col items-center gap-1 text-sm text-ink-muted">
          {official.email && (
            <a
              href={`mailto:${official.email}`}
              className="inline-flex items-center gap-1.5 hover:text-royal"
            >
              <Mail className="size-3.5" aria-hidden="true" /> {official.email}
            </a>
          )}
          {official.phone && (
            <a
              href={`tel:${official.tel ?? official.phone}`}
              className="inline-flex items-center gap-1.5 hover:text-royal"
            >
              <Phone className="size-3.5" aria-hidden="true" /> {official.phone}
            </a>
          )}
          {official.hours && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden="true" /> {official.hours}
            </span>
          )}
        </div>
      )}
    </m.div>
  );
}
