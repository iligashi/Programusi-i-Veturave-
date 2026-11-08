import { Link } from 'react-router-dom';
import { navItems } from '../../config/navigation';
import { links, site } from '../../config/site';
import { useI18n } from '../../i18n/useI18n';
import { Icon } from '../ui/icons';
import { Logo } from '../ui/Logo';

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  const socials = [
    { href: site.social.instagram, label: t.common.followInstagram, icon: Icon.instagram },
    { href: site.social.facebook, label: t.common.followFacebook, icon: Icon.facebook },
    {
      href: links.whatsapp(t.common.whatsappHello),
      label: t.common.chatWhatsapp,
      icon: Icon.whatsapp,
    },
    { href: links.viber, label: t.common.chatViber, icon: Icon.viber },
  ];

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/[0.06] bg-ink-950">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-volt-400/60 to-transparent"
      />
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link to="/" aria-label={site.name} className="inline-block rounded-xl">
            <Logo tagline={t.common.brandTagline} />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">{t.footer.about}</p>
          <ul className="mt-6 flex gap-2">
            {socials.map(({ href, label, icon: SocialIcon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
                >
                  <SocialIcon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label={t.footer.explore} className="md:col-span-2">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
            {t.footer.explore}
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-slate-300 transition-colors hover:text-white">
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
            {t.footer.contact}
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={links.tel}
                className="flex items-center gap-2 text-slate-300 transition-colors hover:text-white"
              >
                <Icon.phone className="h-4 w-4 text-volt-400" />
                {site.phone.display}
              </a>
            </li>
            <li>
              <a
                href={links.whatsapp(t.common.whatsappHello)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 transition-colors hover:text-white"
              >
                <Icon.whatsapp className="h-4 w-4 text-whatsapp" />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={links.viber}
                className="flex items-center gap-2 text-slate-300 transition-colors hover:text-white"
              >
                <Icon.viber className="h-4 w-4 text-viber" />
                Viber
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
            {t.footer.locations}
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {t.locations.map((location) => (
              <li key={location.city}>
                <a
                  href={links.maps(location.query)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 transition-colors hover:text-white"
                >
                  <Icon.mapPin className="h-4 w-4 text-volt-400" />
                  {location.city}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-slate-500 sm:flex-row">
          <p>
            © {year} {site.name}. {t.footer.rights}
          </p>
          <p>
            Made by{' '}
            <a
              href="https://github.com/iligashi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white"
            >
              Ilaz Gashi · Nexora Agency
            </a>
          </p>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden pb-2 text-center font-display text-[18vw] font-bold leading-none text-white/[0.03]"
      >
        PROGRAMUESI
      </div>
    </footer>
  );
}
