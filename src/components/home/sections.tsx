import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { links } from '../../config/site';
import { brands, services, type BrandId } from '../../data/catalog';
import { format, useI18n } from '../../i18n/useI18n';
import { CarIllustration } from '../graphics/CarIllustration';
import { Icon, serviceIcon } from '../ui/icons';
import { Reveal, RevealGroup, RevealItem, SectionHeading, SpotlightCard } from '../ui/primitives';

/* ------------------------------------------------------------------ */
/* Brand marquee                                                       */
/* ------------------------------------------------------------------ */

export function BrandMarquee() {
  const { t } = useI18n();
  const row = [...brands, ...brands];
  return (
    <section
      aria-label={t.home.marquee}
      className="border-y border-white/[0.06] bg-ink-900/50 py-8"
    >
      <p className="mb-5 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500">
        {t.home.marquee}
      </p>
      <div className="mask-fade-x overflow-hidden">
        <ul className="flex w-max animate-marquee gap-14 pr-14 hover:[animation-play-state:paused]">
          {row.map((brand, i) => (
            <li
              key={`${brand.id}-${i}`}
              aria-hidden={i >= brands.length}
              className="font-display text-2xl font-semibold uppercase tracking-[0.15em] text-slate-600 transition-colors hover:text-white md:text-3xl"
            >
              {brand.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Why us                                                              */
/* ------------------------------------------------------------------ */

const whyIcons = [Icon.tools, Icon.revert, Icon.guarantee, Icon.location];

export function WhyUs() {
  const { t } = useI18n();
  const why = t.home.why;
  return (
    <section className="section" aria-labelledby="why-title">
      <div className="container-page">
        <SectionHeading
          id="why-title"
          eyebrow={why.eyebrow}
          title={why.title}
          subtitle={why.subtitle}
        />
        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {why.items.map((item, i) => {
            const ItemIcon = whyIcons[i] ?? Icon.sparkles;
            return (
              <RevealItem key={item.title}>
                <SpotlightCard className="h-full p-7">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-volt-400/20 bg-volt-400/10 text-volt-300 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                    <ItemIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.body}</p>
                </SpotlightCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

const stepIcons = [Icon.message, Icon.scan, Icon.car];

export function Process() {
  const { t } = useI18n();
  const process = t.home.process;
  return (
    <section className="section relative overflow-hidden" aria-labelledby="process-title">
      <div className="container-page">
        <SectionHeading id="process-title" eyebrow={process.eyebrow} title={process.title} />
        <div className="relative">
          {/* connecting line that draws itself */}
          <motion.div
            aria-hidden
            className="absolute left-[16.66%] right-[16.66%] top-8 hidden h-px origin-left bg-gradient-to-r from-volt-400 via-signal-400 to-volt-400 md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <RevealGroup as="ol" className="grid gap-10 md:grid-cols-3">
            {process.steps.map((step, i) => {
              const StepIcon = stepIcons[i] ?? Icon.check;
              return (
                <RevealItem as="li" key={step.title} className="relative text-center">
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-ink-800 text-volt-300 shadow-glow">
                    <StepIcon className="h-7 w-7" />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white font-mono text-xs font-bold text-ink-950">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-400">
                    {step.body}
                  </p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Popular services (bento grid)                                       */
/* ------------------------------------------------------------------ */

export function PopularServices() {
  const { t } = useI18n();
  const popular = t.home.popular;
  const featured = services.filter((s) => s.featured);

  return (
    <section className="section bg-ink-900/40" aria-labelledby="popular-title">
      <div className="container-page">
        <SectionHeading
          id="popular-title"
          eyebrow={popular.eyebrow}
          title={popular.title}
          subtitle={popular.subtitle}
        />
        <RevealGroup className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service, i) => {
            const copy = t.services.items[service.id];
            const ServiceIcon = serviceIcon[service.id];
            const wide = i === 0 || i === 5;
            return (
              <RevealItem key={service.id} className={wide ? 'lg:col-span-2' : ''}>
                <SpotlightCard className="flex h-full flex-col p-7">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-volt-400/20 to-signal-500/20 text-volt-300">
                      <ServiceIcon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs text-slate-600">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{copy.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{copy.body}</p>
                  <a
                    href={links.whatsapp(
                      format(t.common.whatsappInterested, { service: copy.title }),
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-volt-300 transition-colors hover:text-white"
                  >
                    {t.services.ask}
                    <Icon.arrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </SpotlightCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
        <Reveal className="mt-12 text-center">
          <Link to="/services" className="btn-ghost group">
            {t.common.viewServices}
            <Icon.arrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Brand explorer                                                      */
/* ------------------------------------------------------------------ */

export function BrandExplorer() {
  const { t } = useI18n();
  const explorer = t.home.explorer;
  const [selected, setSelected] = useState<BrandId>('bmw');
  const brand = brands.find((b) => b.id === selected) ?? brands[0]!;

  return (
    <section className="section overflow-hidden" aria-labelledby="explorer-title">
      <div className="container-page">
        <SectionHeading
          id="explorer-title"
          eyebrow={explorer.eyebrow}
          title={explorer.title}
          subtitle={explorer.subtitle}
        />

        <Reveal>
          <div
            role="tablist"
            aria-label={explorer.title}
            className="mx-auto mb-10 flex max-w-3xl flex-wrap justify-center gap-2"
          >
            {brands.map((b) => {
              const active = b.id === selected;
              return (
                <button
                  key={b.id}
                  type="button"
                  role="tab"
                  id={`brand-tab-${b.id}`}
                  aria-selected={active}
                  aria-controls="brand-panel"
                  onClick={() => setSelected(b.id)}
                  className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                    active ? 'text-ink-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="brand-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  {b.name}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          id="brand-panel"
          role="tabpanel"
          aria-labelledby={`brand-tab-${brand.id}`}
          className="card relative grid items-center gap-8 overflow-hidden p-6 md:grid-cols-[1.3fr_1fr] md:p-10"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-40 transition-colors duration-700"
            style={{
              background: `radial-gradient(600px circle at 30% 60%, ${brand.paint[0]}33, transparent 60%)`,
            }}
          />
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={brand.id}
                initial={{ x: -120, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 160, opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <CarIllustration
                  variant={brand.variant}
                  paint={brand.paint}
                  active
                  className="w-full drop-shadow-2xl"
                  title={brand.name}
                />
              </motion.div>
            </AnimatePresence>
            <div
              aria-hidden
              className="pointer-events-none absolute -top-6 left-0 right-0 -z-10 text-center font-display text-6xl font-bold uppercase tracking-widest text-white/[0.04] md:-top-10 md:text-8xl"
            >
              {brand.name}
            </div>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="font-display text-4xl font-semibold">{brand.name}</h3>
                <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                  {explorer.highlights}
                </p>
                <ul className="mt-4 space-y-3">
                  {t.brands[brand.id].highlights.map((h, i) => (
                    <motion.li
                      key={h}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-slate-200"
                    >
                      <Icon.checkCircle className="h-5 w-5 shrink-0 text-emerald-400" />
                      {h}
                    </motion.li>
                  ))}
                </ul>
                <Link
                  to={`/services?brand=${brand.id}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-volt-300 hover:text-white"
                >
                  {explorer.allServices}
                  <Icon.arrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export function Faq() {
  const { t } = useI18n();
  const faq = t.home.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section bg-ink-900/40" aria-labelledby="faq-title">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading id="faq-title" eyebrow={faq.eyebrow} title={faq.title} align="left" />
        <RevealGroup className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <RevealItem key={item.q}>
                <h3 className="text-base md:text-lg">
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-display font-medium text-white"
                  >
                    {item.q}
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10"
                    >
                      <Icon.chevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 leading-relaxed text-slate-400">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
