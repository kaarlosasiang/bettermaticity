import { Head } from 'vite-react-ssg';

const SITE_NAME = 'BetterMati.org';
const BASE_URL = (import.meta.env.VITE_SITE_URL as string) || 'https://bettermati.org';
const DEFAULT_OG_IMAGE = `${BASE_URL}/assets/images/banners/opengraph.png`;

interface SeoProps {
  /** Page title; rendered as "<title> | BetterMati.org". Omit for the site default. */
  title?: string;
  description?: string;
  /** Absolute path (e.g. "/services/health") -> canonical + og:url. */
  canonicalPath?: string;
  image?: string;
  type?: 'website' | 'article';
  children?: React.ReactNode;
}

// Per-route <head> for SSG: title/description/canonical/OpenGraph/Twitter are
// serialized into the prerendered HTML so crawlers see them without JS.
export function Seo({
  title,
  description,
  canonicalPath,
  image,
  type = 'website',
  children,
}: SeoProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Official Portal`;
  const url = canonicalPath ? `${BASE_URL}${canonicalPath}` : undefined;
  const ogImage = image || DEFAULT_OG_IMAGE;

  return (
    <Head>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {url && <link rel="canonical" href={url} />}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      {children}
    </Head>
  );
}
