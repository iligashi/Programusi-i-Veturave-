import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { site } from '../../config/site';
import { useI18n } from '../../i18n/useI18n';

interface Props {
  title: string;
  description: string;
  /** Set for pages that should not be indexed (e.g. 404). */
  noIndex?: boolean;
}

/** Per-page <title>, description, canonical URL and social tags. */
export function Seo({ title, description, noIndex = false }: Props) {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const fullTitle = `${title} | ${site.name}`;
  const url = `${site.url}${pathname === '/' ? '/' : pathname}`;

  return (
    <Helmet>
      <html lang={t.meta.htmlLang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={t.meta.locale} />
      {noIndex && <meta name="robots" content="noindex" />}
    </Helmet>
  );
}
