import { motion } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import { Icon } from '../components/ui/icons';
import { PageHeader, Reveal, RevealGroup, RevealItem } from '../components/ui/primitives';
import { Seo } from '../components/ui/Seo';
import { links, site } from '../config/site';
import { services } from '../data/catalog';
import { format, useI18n } from '../i18n/useI18n';
import { isOpenAt, nowInTimezone } from '../lib/hours';

const inputClass =
  'w-full rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 text-white placeholder:text-slate-600 transition focus:border-volt-400/60 focus:outline-none focus:ring-2 focus:ring-volt-400/30';

/** Builds a ready-to-send WhatsApp message — no backend needed. */
function RequestComposer() {
  const { t } = useI18n();
  const c = t.contact.composer;
  const [form, setForm] = useState({ name: '', car: '', service: '', message: '' });

  const update = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const serviceTitle = form.service
      ? (t.services.items[form.service as keyof typeof t.services.items]?.title ?? c.notSure)
      : c.notSure;
    const text = format(c.template, {
      name: form.name.trim() || '—',
      car: form.car.trim() || '—',
      service: serviceTitle,
      message: form.message.trim(),
    }).trim();
    window.open(links.whatsapp(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6 md:p-8">
      <div>
        <h2 className="text-2xl font-semibold">{c.title}</h2>
        <p className="mt-1 text-sm text-slate-400">{c.subtitle}</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-300">{c.name}</span>
          <input
            className={inputClass}
            value={form.name}
            onChange={(e) => update('name')(e.target.value)}
            autoComplete="name"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-300">{c.car}</span>
          <input
            className={inputClass}
            value={form.car}
            onChange={(e) => update('car')(e.target.value)}
            placeholder={c.carPlaceholder}
            required
          />
        </label>
      </div>
      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-300">{c.service}</span>
        <select
          className={inputClass}
          value={form.service}
          onChange={(e) => update('service')(e.target.value)}
        >
          <option value="">{c.servicePlaceholder}</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {t.services.items[s.id].title}
            </option>
          ))}
        </select>
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-300">{c.message}</span>
        <textarea
          className={`${inputClass} min-h-[110px] resize-y`}
          value={form.message}
          onChange={(e) => update('message')(e.target.value)}
        />
      </label>
      <button type="submit" className="btn-whatsapp w-full !py-3.5">
        <Icon.whatsapp className="h-5 w-5" />
        {c.submit}
        <Icon.send className="h-4 w-4" />
      </button>
    </form>
  );
}

function OpeningHours() {
  const { t } = useI18n();
  const open = isOpenAt();
  const today = nowInTimezone().day;
  // Show Monday first.
  const order = [1, 2, 3, 4, 5, 6, 0];

  return (
    <div className="card p-6 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-3 text-xl font-semibold">
          <Icon.clock className="h-5 w-5 text-volt-300" />
          {t.contact.hoursTitle}
        </h2>
        <span
          className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
            open ? 'bg-emerald-400/10 text-emerald-300' : 'bg-rose-400/10 text-rose-300'
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${open ? 'bg-emerald-400' : 'bg-rose-400'}`} />
          {open ? t.contact.openNow : t.contact.closedNow}
        </span>
      </div>
      <dl className="mt-6 divide-y divide-white/5 text-sm">
        {order.map((day) => {
          const hours = site.hours[day];
          const isToday = day === today;
          return (
            <div
              key={day}
              className={`flex justify-between py-2.5 ${isToday ? 'font-semibold text-white' : 'text-slate-400'}`}
            >
              <dt>{t.contact.days[day]}</dt>
              <dd className="font-mono">
                {hours ? `${hours.open} – ${hours.close}` : t.contact.closed}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

export default function Contact() {
  const { t } = useI18n();
  const contact = t.contact;

  const methods = [
    {
      key: 'whatsapp',
      href: links.whatsapp(t.common.whatsappHello),
      external: true,
      icon: Icon.whatsapp,
      color: 'bg-whatsapp text-ink-950',
      glow: 'group-hover:shadow-[0_0_60px_-10px_rgba(37,211,102,0.6)]',
      ...contact.methods.whatsapp,
    },
    {
      key: 'viber',
      href: links.viber,
      external: false,
      icon: Icon.viber,
      color: 'bg-viber text-white',
      glow: 'group-hover:shadow-[0_0_60px_-10px_rgba(115,96,242,0.6)]',
      ...contact.methods.viber,
    },
    {
      key: 'phone',
      href: links.tel,
      external: false,
      icon: Icon.phone,
      color: 'bg-volt-400 text-ink-950',
      glow: 'group-hover:shadow-glow-lg',
      ...contact.methods.phone,
    },
  ];

  return (
    <>
      <Seo title={contact.seoTitle} description={contact.seoDescription} />
      <PageHeader eyebrow={contact.eyebrow} title={contact.title} subtitle={contact.subtitle} />

      <section className="pb-12">
        <div className="container-page">
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {methods.map((m) => (
              <RevealItem key={m.key}>
                <motion.a
                  href={m.href}
                  target={m.external ? '_blank' : undefined}
                  rel={m.external ? 'noopener noreferrer' : undefined}
                  whileHover={{ y: -4 }}
                  className={`card group flex h-full items-center gap-5 p-6 transition-shadow ${m.glow}`}
                >
                  <span
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${m.color}`}
                  >
                    <m.icon className="h-6 w-6" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-lg font-semibold text-white">
                      {m.title}
                    </span>
                    <span className="block font-mono text-sm text-slate-300">
                      {site.phone.display}
                    </span>
                    <span className="block text-xs text-slate-500">{m.body}</span>
                  </span>
                  <Icon.arrowUpRight className="h-5 w-5 text-slate-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </motion.a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section !pt-8">
        <div className="container-page grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <RequestComposer />
          </Reveal>
          <div className="space-y-6">
            <Reveal delay={0.1}>
              <OpeningHours />
            </Reveal>
            <Reveal delay={0.2}>
              <div className="card p-6 md:p-8">
                <h2 className="flex items-center gap-3 text-xl font-semibold">
                  <Icon.mapPin className="h-5 w-5 text-volt-300" />
                  {contact.locationsTitle}
                </h2>
                <ul className="mt-4 space-y-2">
                  {t.locations.map((location) => (
                    <li key={location.city}>
                      <a
                        href={links.maps(location.query)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-white/5"
                      >
                        <span>
                          <span className="block font-medium text-white">{location.city}</span>
                          <span className="text-xs text-slate-500">{location.country}</span>
                        </span>
                        <span className="flex items-center gap-1 text-xs text-volt-300 opacity-70 group-hover:opacity-100">
                          {contact.openInMaps}
                          <Icon.arrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="card relative overflow-hidden p-6 md:p-8">
                <div
                  aria-hidden
                  className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-fuchsia-500/30 via-orange-400/20 to-transparent blur-2xl"
                />
                <h2 className="relative text-xl font-semibold">{contact.followTitle}</h2>
                <p className="relative mt-2 text-sm text-slate-400">{contact.followBody}</p>
                <div className="relative mt-5 flex gap-3">
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost !px-4 !py-2"
                  >
                    <Icon.instagram className="h-4 w-4" />
                    Instagram
                  </a>
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost !px-4 !py-2"
                  >
                    <Icon.facebook className="h-4 w-4" />
                    Facebook
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
