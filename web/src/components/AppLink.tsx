import type { ComponentProps } from 'react';
import { Link } from 'react-router-dom';
import migratedRoutes from '../../migrated-routes.json';

const MIGRATED = new Set(migratedRoutes as string[]);

function normalize(p: string): string {
  const path = p.split(/[?#]/)[0];
  if (path === '/') return '/';
  return path.replace(/\/+$/, '');
}

/**
 * True when `to` is a React-owned (migrated) route. During incremental migration
 * these are the only paths react-router can render client-side; everything else
 * must be a full page load so Apache/.htaccess serves the legacy page.
 */
export function isMigratedRoute(to: string): boolean {
  if (/^([a-z]+:)?\/\//i.test(to) || to.startsWith('mailto:') || to.startsWith('tel:')) {
    return false; // external / protocol links
  }
  const n = normalize(to);
  return MIGRATED.has(n) || MIGRATED.has(n + '/');
}

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
