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
      className="rounded-xl bg-white p-6 text-center shadow-[0_0_0_1px_rgba(18,60,122,0.07)]"
      style={{ borderTop: '3px solid #2b62ee' }}
    >
      <div
        className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-[#eef4fe] font-display text-xl font-extrabold text-[#2b62ee]"
        aria-hidden="true"
      >
        {officialInitials(official.name)}
      </div>
      <h3 className="font-display text-base font-bold text-[#123c7a]">{official.name}</h3>
      <p className="mt-0.5 text-sm font-semibold text-[#2b62ee]">{official.title || role}</p>
      {(official.email || official.phone || official.hours) && (
        <div className="mt-3 flex flex-col items-center gap-1 text-sm text-[#4c5c78]">
          {official.email && (
            <a
              href={`mailto:${official.email}`}
              className="inline-flex items-center gap-1.5 hover:text-[#2b62ee]"
            >
              <Mail className="size-3.5" aria-hidden="true" /> {official.email}
            </a>
          )}
          {official.phone && (
            <a
              href={`tel:${official.tel ?? official.phone}`}
              className="inline-flex items-center gap-1.5 hover:text-[#2b62ee]"
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
