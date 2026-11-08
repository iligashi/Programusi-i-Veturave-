import { Hero } from '../components/home/Hero';
import {
  BrandExplorer,
  BrandMarquee,
  Faq,
  PopularServices,
  Process,
  WhyUs,
} from '../components/home/sections';
import { CtaBand } from '../components/ui/CtaBand';
import { Seo } from '../components/ui/Seo';
import { useI18n } from '../i18n/useI18n';

export default function Home() {
  const { t } = useI18n();
  return (
    <>
      <Seo title={t.home.seoTitle} description={t.home.seoDescription} />
      <Hero />
      <BrandMarquee />
      <WhyUs />
      <PopularServices />
      <BrandExplorer />
      <Process />
      <Faq />
      <CtaBand />
    </>
  );
}
