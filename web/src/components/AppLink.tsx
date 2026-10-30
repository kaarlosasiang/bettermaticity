import type { ComponentProps } from 'react';
import { Link } from 'react-router-dom';
import { isMigratedRoute } from '@/lib/migratedRoutes';

type AppLinkProps = { to: string } & Omit<ComponentProps<'a'>, 'href'>;

/**
 * Internal navigation that is coexistence-safe: SPA `<Link>` for migrated routes,
 * plain `<a>` (full navigation) for legacy/un-migrated routes and external URLs.
 */
export function AppLink({ to, children, ...rest }: AppLinkProps) {
  if (isMigratedRoute(to)) {
    return (
      <Link to={to} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={to} {...rest}>
      {children}
    </a>
  );
}
