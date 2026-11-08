import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CtaBand } from '../components/ui/CtaBand';
import { categoryIcon, Icon, serviceIcon } from '../components/ui/icons';
import { PageHeader, Reveal } from '../components/ui/primitives';
import { Seo } from '../components/ui/Seo';
import { links } from '../config/site';
import {
  brandIds,
  brands,
  categoryIds,
  services,
  type BrandId,
  type CategoryId,
} from '../data/catalog';
import { format, useI18n } from '../i18n/useI18n';

function parse<T extends string>(value: string | null, allowed: readonly T[]): T | null {
  return value && (allowed as readonly string[]).includes(value) ? (value as T) : null;
}

function FilterChip({
  active,
  onClick,
  children,
  group,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  group: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active ? 'text-ink-950' : 'text-slate-400 hover:text-white'
      }`}
    >
      {active && (
        <motion.span
          layoutId={`chip-${group}`}
          className="absolute inset-0 -z-10 rounded-full bg-white"
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
        />
      )}
      {children}
    </button>
  );
}

export default function Services() {
  const { t } = useI18n();
  const [params, setParams] = useSearchParams();
  // Filters live in the URL so a filtered view can be shared or bookmarked.
  const category = parse<CategoryId>(params.get('category'), categoryIds);
  const brand = parse<BrandId>(params.get('brand'), brandIds);

  const setFilter = (key: 'category' | 'brand', value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const visible = services.filter(
    (s) => (!category || s.category === category) && (!brand || s.brands.includes(brand)),
  );

  return (
    <>
      <Seo title={t.services.seoTitle} description={t.services.seoDescription} />
      <PageHeader
        eyebrow={t.services.eyebrow}
        title={t.services.title}
        subtitle={t.services.subtitle}
      />

      <section className="pb-20">
        <div className="container-page">
          <Reveal className="card sticky top-20 z-30 mb-10 flex flex-col gap-3 bg-ink-900/85 p-3 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
            <div
              role="group"
              aria-label={t.services.filterCategory}
              className="flex flex-wrap gap-1"
            >
              <FilterChip
                group="cat"
                active={!category}
                onClick={() => setFilter('category', null)}
              >
                {t.services.all}
              </FilterChip>
              {categoryIds.map((id) => {
                const CatIcon = categoryIcon[id];
                return (
                  <FilterChip
                    key={id}
                    group="cat"
                    active={category === id}
                    onClick={() => setFilter('category', id)}
                  >
                    <CatIcon className="h-4 w-4" />
                    {t.services.categories[id].short}
                  </FilterChip>
                );
              })}
            </div>
            <label className="flex items-center gap-3 text-sm text-slate-400">
              <span className="sr-only">{t.services.filterBrand}</span>
              <select
                value={brand ?? ''}
                onChange={(e) => setFilter('brand', e.target.value || null)}
                className="w-full rounded-full border border-white/10 bg-ink-800 px-4 py-2 text-sm text-white md:w-auto"
              >
                <option value="">{t.services.allBrands}</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </label>
          </Reveal>

          <p
            className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-slate-500"
            aria-live="polite"
          >
            {format(t.services.count, { n: visible.length })}
          </p>

          <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((service) => {
                const copy = t.services.items[service.id];
                const ServiceIcon = serviceIcon[service.id];
                return (
                  <motion.li
                    key={service.id}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="card group flex flex-col p-6 transition-colors hover:border-white/15"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-volt-400/20 to-signal-500/20 text-volt-300 transition-transform group-hover:scale-110">
                        <ServiceIcon className="h-5 w-5" />
                      </span>
                      <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                        {t.services.categories[service.category].short}
                      </span>
                    </div>
                    <h2 className="mt-5 text-lg font-semibold">{copy.title}</h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                      {copy.body}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {service.brands.map((id) => (
                        <li
                          key={id}
                          className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${
                            id === brand
                              ? 'bg-volt-400/20 text-volt-300'
                              : 'bg-white/5 text-slate-400'
                          }`}
                        >
                          {brands.find((b) => b.id === id)?.name}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={links.whatsapp(
                        format(t.common.whatsappInterested, { service: copy.title }),
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-whatsapp/30 bg-whatsapp/10 px-4 py-2.5 text-sm font-medium text-whatsapp transition hover:bg-whatsapp hover:text-ink-950"
                    >
                      <Icon.whatsapp className="h-4 w-4" />
                      {t.services.ask}
                    </a>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>

          {visible.length === 0 && (
            <p className="card p-10 text-center text-slate-400">{t.services.empty}</p>
          )}

          <p className="mt-10 flex items-start gap-3 text-sm text-slate-500">
            <Icon.shield className="mt-0.5 h-4 w-4 shrink-0 text-volt-400" />
            {t.services.note}
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
