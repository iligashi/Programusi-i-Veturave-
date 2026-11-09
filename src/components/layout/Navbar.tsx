import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navItems } from '../../config/navigation';
import { links, site } from '../../config/site';
import { languages } from '../../i18n/context';
import { useI18n } from '../../i18n/useI18n';
import { Icon } from '../ui/icons';
import { Logo } from '../ui/Logo';

/**
 * `slide` animates the pill between languages with a shared layout animation. It must stay
 * off inside the mobile menu: a layout animation inside an exiting `AnimatePresence` tree
 * keeps the menu mounted (invisible, but covering the page and swallowing every tap).
 */
function LanguageSwitch({ className = '', slide = true }: { className?: string; slide?: boolean }) {
  const { language, setLanguage, t } = useI18n();
  return (
    <div
      role="group"
      aria-label={t.common.switchLanguage}
      className={`relative flex rounded-full border border-white/10 bg-white/[0.03] p-1 ${className}`}
    >
      {languages.map((lang) => {
        const active = lang === language;
        return (
          <button
            key={lang}
            type="button"
            onClick={() => setLanguage(lang)}
            aria-pressed={active}
            lang={lang}
            className={`relative z-10 rounded-full px-3 py-1 font-mono text-xs font-medium uppercase transition-colors ${
              active ? 'text-ink-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            {active && (
              <motion.span
                className="absolute inset-0 -z-10 rounded-full bg-white"
                {...(slide
                  ? {
                      layoutId: 'lang-pill',
                      transition: { type: 'spring', stiffness: 500, damping: 35 },
                    }
                  : { initial: { scale: 0.6, opacity: 0 }, animate: { scale: 1, opacity: 1 } })}
              />
            )}
            {lang}
          </button>
        );
      })}
    </div>
  );
}

export function Navbar() {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));

  // Close the mobile menu on navigation and with Escape; lock page scroll while it is open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink-950"
      >
        {t.common.skipToContent}
      </a>
      <div
        className={`relative z-50 transition-all duration-500 ${
          scrolled || open
            ? 'border-b border-white/[0.06] bg-ink-950/75 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <nav
          aria-label="Main"
          className={`container-page flex items-center justify-between transition-[height] duration-500 ${
            scrolled ? 'h-16' : 'h-20'
          }`}
        >
          <Link to="/" aria-label={site.name} className="rounded-xl">
            <Logo tagline={t.common.brandTagline} />
          </Link>

          <ul className="hidden items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] p-1 md:flex">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `relative block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-white/10"
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        />
                      )}
                      {t.nav[item.key]}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.common.followInstagram}
              className="rounded-full p-2 text-slate-400 transition-colors hover:text-white"
            >
              <Icon.instagram className="h-5 w-5" />
            </a>
            <LanguageSwitch />
            <a
              href={links.whatsapp(t.common.whatsappHello)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hidden !px-4 !py-2 lg:inline-flex"
            >
              <Icon.whatsapp className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          <button
            type="button"
            className="relative z-50 rounded-full border border-white/10 p-2.5 text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.common.closeMenu : t.common.openMenu}
          >
            {open ? <Icon.close className="h-5 w-5" /> : <Icon.menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 top-0 z-40 flex flex-col bg-ink-950/95 px-6 pb-10 pt-28 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.ul
              className="flex flex-col gap-2"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }}
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.to}
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between border-b border-white/5 py-4 font-display text-3xl font-semibold ${
                        isActive ? 'text-white' : 'text-slate-500'
                      }`
                    }
                  >
                    {t.nav[item.key]}
                    <Icon.arrowUpRight className="h-6 w-6 opacity-50" />
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-auto flex flex-col gap-4">
              <a
                href={links.whatsapp(t.common.whatsappHello)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full"
              >
                <Icon.whatsapp className="h-5 w-5" />
                {t.common.whatsappUs}
              </a>
              <div className="flex items-center justify-between">
                <LanguageSwitch slide={false} />
                <div className="flex gap-2">
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.common.followInstagram}
                    className="rounded-full border border-white/10 p-3 text-slate-300"
                  >
                    <Icon.instagram className="h-5 w-5" />
                  </a>
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.common.followFacebook}
                    className="rounded-full border border-white/10 p-3 text-slate-300"
                  >
                    <Icon.facebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
