import { links, site } from '../../config/site';
import { useI18n } from '../../i18n/useI18n';
import { Icon } from './icons';
import { Reveal } from './primitives';

/** Closing call-to-action used at the bottom of every page. */
export function CtaBand() {
  const { t } = useI18n();
  return (
    <section className="section">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-volt-600/30 via-ink-800 to-signal-500/20 px-6 py-16 text-center md:px-16 md:py-20">
            <div aria-hidden className="bg-grid mask-fade-b absolute inset-0 opacity-60" />
            <div
              aria-hidden
              className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-volt-400/30 blur-[100px]"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold md:text-5xl">
                {t.home.cta.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-balance text-slate-300">
                {t.home.cta.subtitle}
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={links.whatsapp(t.common.whatsappHello)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full !py-3.5 sm:w-auto"
                >
                  <Icon.whatsapp className="h-5 w-5" />
                  {t.common.whatsappUs}
                </a>
                <a href={links.tel} className="btn-ghost w-full !py-3.5 sm:w-auto">
                  <Icon.phone className="h-4 w-4" />
                  {site.phone.display}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
