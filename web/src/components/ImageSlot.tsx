import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageSlotProps {
  /** When set, the photo is rendered cover-fit. Otherwise a labelled placeholder shows. */
  src?: string;
  alt?: string;
  /** Prompt shown in the empty placeholder — tells an editor what belongs here. */
  label?: string;
  className?: string;
}

// React counterpart of the design canvas's <image-slot>: a fillable image region.
// Filled slots render the photo; empty slots render an honest "photo pending" panel
// so the LGU can see exactly where a Dahican / coastline / map image belongs.
export function ImageSlot({ src, alt = '', label, className }: ImageSlotProps) {
  if (src) {
    return <img src={src} alt={alt} className={cn('size-full object-cover', className)} loading="lazy" />;
  }
  return (
    <div
      role="img"
      aria-label={label || 'Image placeholder'}
      className={cn(
        'flex size-full flex-col items-center justify-center gap-2 bg-[#eef4fe] p-6 text-center text-[#4c5c78]',
        className
      )}
    >
      <ImageIcon className="size-6 opacity-50" aria-hidden="true" />
      {label ? <span className="max-w-[240px] text-xs leading-snug opacity-70">{label}</span> : null}
    </div>
  );
}
