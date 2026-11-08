import { CarIllustration } from '../components/graphics/CarIllustration';
import { CtaBand } from '../components/ui/CtaBand';
import { Icon } from '../components/ui/icons';
import {
  PageHeader,
  Reveal,
  RevealGroup,
  RevealItem,
  SectionHeading,
  SpotlightCard,
} from '../components/ui/primitives';
import { Seo } from '../components/ui/Seo';
import { links } from '../config/site';
import { brands } from '../data/catalog';
import { useI18n } from '../i18n/useI18n';

const valueIcons = [Icon.eye, Icon.shield, Icon.receipt, Icon.support];

export default function About() {
  const { t } = useI18n();
  const about = t.about;
  const showcase = brands.filter((b) => ['bmw', 'lamborghini', 'vw'].includes(b.id));

  return (
    <>
      <Seo title={about.seoTitle} description={about.seoDescription} />
      <PageHeader eyebrow={about.eyebrow} title={about.title} subtitle={about.subtitle} />

      <section className="section !pt-0">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-semibold md:text-4xl">{about.storyTitle}</h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate-400">
              {about.story.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15} className="relative">
            <div aria-hidden className="absolute inset-0 rounded-full bg-volt-500/10 blur-3xl" />
            <div className="relative space-y-2">
              {showcase.map((brand, i) => (
                <div
                  key={brand.id}
                  className={i === 1 ? 'translate-x-6 md:translate-x-12' : '-translate-x-2'}
                >
                  <CarIllustration
                    variant={brand.variant}
                    paint={brand.paint}
                    className="w-full max-w-md"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-ink-900/40" aria-labelledby="values-title">
        <div className="container-page">
          <SectionHeading id="values-title" eyebrow={about.eyebrow} title={about.valuesTitle} />
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((value, i) => {
              const ValueIcon = valueIcons[i] ?? Icon.check;
              return (
                <RevealItem key={value.title}>
                  <SpotlightCard className="h-full p-7">
                    <ValueIcon className="h-7 w-7 text-volt-300" />
                    <h3 className="mt-5 text-lg font-semibold">{value.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{value.body}</p>
                  </SpotlightCard>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <section className="section" aria-labelledby="where-title">
        <div className="container-page">
          <SectionHeading
            id="where-title"
            eyebrow={t.contact.locationsTitle}
            title={about.locationsTitle}
          />
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {t.locations.map((location) => (
              <RevealItem key={location.city}>
                <a
                  href={links.maps(location.query)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card group flex items-center justify-between p-7 transition hover:-translate-y-1 hover:border-white/15"
                >
                  <span>
                    <span className="block font-display text-2xl font-semibold text-white">
                      {location.city}
                    </span>
                    <span className="text-sm text-slate-500">{location.country}</span>
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-volt-300 transition group-hover:bg-volt-400 group-hover:text-ink-950">
                    <Icon.mapPin className="h-5 w-5" />
                  </span>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
