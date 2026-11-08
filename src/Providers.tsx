import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import type { Language } from './i18n/context';
import { I18nProvider } from './i18n/I18nProvider';

export function Providers({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage?: Language;
}) {
  return (
    <HelmetProvider>
      <I18nProvider initialLanguage={initialLanguage}>
        {/* Respect the OS "reduce motion" setting for every animation. */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </I18nProvider>
    </HelmetProvider>
  );
}
