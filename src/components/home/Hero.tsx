import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { links } from '../../config/site';
import { useI18n } from '../../i18n/useI18n';
import { Cockpit } from '../graphics/Cockpit';
import { Icon } from '../ui/icons';
import { fadeUp, stagger } from '../ui/motion';
import { Backdrop } from '../ui/primitives';

export function Hero() {
  const { t } = useI18n();
  const hero = t.home.hero;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const cockpitY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40 lg:min-h-[100svh]"
    >
      <Backdrop />
      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <motion.div style={{ y: textY, opacity: fade }}>
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.span variants={fadeUp} className="eyebrow">
              <Icon.mapPin className="h-3.5 w-3.5" />
              {hero.eyebrow}
            </motion.span>
            <h1
              id="hero-title"
              className="mt-6 text-balance text-[2.6rem] font-semibold leading-[1.02] sm:text-6xl lg:text-7xl"
            >
              <motion.span variants={fadeUp} className="block">
                {hero.titleA}
              </motion.span>
              <motion.span
                variants={fadeUp}
                className="text-gradient block animate-shimmer bg-[length:200%_auto]"
              >
                {hero.titleB}
              </motion.span>
            </h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-slate-400"
            >
              {hero.subtitle}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={links.whatsapp(t.common.whatsappHello)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group !py-3.5"
              >
                <Icon.whatsapp className="h-5 w-5" />
                {hero.ctaPrimary}
                <Icon.arrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link to="/services" className="btn-ghost !py-3.5">
                {hero.ctaSecondary}
              </Link>
            </motion.div>
            <motion.dl
              variants={fadeUp}
              className="mt-12 grid max-w-md grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-6"
            >
              {hero.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse px-4 first:pl-0">
                  <dt className="mt-1 text-xs text-slate-500">{stat.label}</dt>
                  <dd className="font-display text-3xl font-semibold text-white">{stat.value}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: cockpitY }}
          initial={{ opacity: 0, scale: 0.92, rotateX: 12 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="mx-auto w-full max-w-md [perspective:1000px]"
        >
          <Cockpit />
        </motion.div>
      </div>
    </section>
  );
}
