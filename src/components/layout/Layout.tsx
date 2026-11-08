import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { links } from '../../config/site';
import { useI18n } from '../../i18n/useI18n';
import { Icon } from '../ui/icons';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

/** Thin progress bar at the top of the page showing scroll position. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-volt-300 via-volt-400 to-signal-400"
      style={{ scaleX }}
    />
  );
}

/** Floating WhatsApp button + back-to-top, shown after the user scrolls a bit. */
function FloatingActions() {
  const { t } = useI18n();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > 400));

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {visible && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={t.common.backToTop}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-ink-800/80 text-slate-300 backdrop-blur transition hover:text-white"
          >
            <Icon.arrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
      <motion.a
        href={links.whatsapp(t.common.whatsappHello)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.common.chatWhatsapp}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-ink-950 shadow-[0_10px_40px_-10px_rgba(37,211,102,0.8)]"
      >
        <span
          aria-hidden
          className="absolute inset-0 animate-pulse-ring rounded-full bg-whatsapp"
        />
        <Icon.whatsapp className="relative h-7 w-7" />
      </motion.a>
    </div>
  );
}

export function Layout() {
  const location = useLocation();

  // Every navigation starts at the top of the new page.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <Navbar />
      <motion.main
        id="main"
        key={location.pathname}
        tabIndex={-1}
        className="flex-1 outline-none"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Outlet />
      </motion.main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
