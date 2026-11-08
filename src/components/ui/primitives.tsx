import { motion, type HTMLMotionProps } from 'framer-motion';
import { useRef, type MouseEvent, type ReactNode } from 'react';
import { fadeUp, stagger } from './motion';

/** Fades its children in when they scroll into view (once). */
export function Reveal({
  children,
  delay = 0,
  className,
  ...rest
}: { children: ReactNode; delay?: number; className?: string } & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers `RevealItem` children as they enter the viewport. */
export function RevealGroup({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'ul' | 'ol';
}) {
  const Component = motion[as];
  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={stagger}
      className={className}
    >
      {children}
    </Component>
  );
}

export function RevealItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li';
}) {
  const Component = motion[as];
  return (
    <Component variants={fadeUp} className={className}>
      {children}
    </Component>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'center' | 'left';
  id?: string;
}) {
  const centered = align === 'center';
  return (
    <Reveal
      className={`mb-12 md:mb-16 ${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id} className="mt-5 text-3xl font-semibold md:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base text-slate-400 md:text-lg">{subtitle}</p>}
    </Reveal>
  );
}

/** Card with a soft light that follows the cursor. */
export function SpotlightCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--x', `${event.clientX - rect.left}px`);
    el.style.setProperty('--y', `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`card group relative overflow-hidden transition-colors duration-300 hover:border-white/15 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), rgba(56,189,248,0.12), transparent 60%)',
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/** Ambient glow + grid used behind hero areas. */
export function Backdrop({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="bg-grid mask-fade-b absolute inset-0" />
      <motion.div
        className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-volt-500/25 blur-[120px]"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 left-[-10%] h-[460px] w-[460px] rounded-full bg-signal-500/20 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 md:pb-20 md:pt-44">
      <Backdrop />
      <div className="container-page relative">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            {eyebrow}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] md:text-6xl"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-balance text-lg text-slate-400"
          >
            {subtitle}
          </motion.p>
          {children && <motion.div variants={fadeUp}>{children}</motion.div>}
        </motion.div>
      </div>
    </section>
  );
}
