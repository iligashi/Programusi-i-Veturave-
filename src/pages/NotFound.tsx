import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CarIllustration } from '../components/graphics/CarIllustration';
import { Icon } from '../components/ui/icons';
import { Backdrop } from '../components/ui/primitives';
import { Seo } from '../components/ui/Seo';
import { useI18n } from '../i18n/useI18n';

export default function NotFound() {
  const { t } = useI18n();
  const nf = t.notFound;
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden pt-28">
      <Seo title={nf.seoTitle} description={nf.body} noIndex />
      <Backdrop />
      <div className="container-page relative text-center">
        <p className="text-gradient font-display text-[7rem] font-bold leading-none md:text-[10rem]">
          {nf.code}
        </p>
        <h1 className="mt-2 text-3xl font-semibold md:text-5xl">{nf.title}</h1>
        <p className="mx-auto mt-4 max-w-md text-slate-400">{nf.body}</p>
        <motion.div
          className="mx-auto mt-8 max-w-sm"
          initial={{ x: '-60vw' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 60, damping: 14 }}
        >
          <CarIllustration
            variant="hatch"
            paint={['#7dd3fc', '#0369a1']}
            active
            className="w-full"
          />
        </motion.div>
        <Link to="/" className="btn-primary mt-8">
          <Icon.arrowRight className="h-4 w-4 rotate-180" />
          {nf.home}
        </Link>
      </div>
    </section>
  );
}
