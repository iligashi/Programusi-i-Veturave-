import { useId } from 'react';

/** Gauge-style logo mark. Matches public/favicon.svg. */
export function LogoMark({ className = 'h-10 w-10' }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={`logo-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7dd3fc" />
          <stop offset="0.55" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="#0a0d12" />
      <rect
        x="0.75"
        y="0.75"
        width="62.5"
        height="62.5"
        rx="15.25"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.1"
        strokeWidth="1.5"
      />
      <path
        d="M17.15 46.85 A21 21 0 1 1 46.85 46.85"
        fill="none"
        stroke={`url(#logo-${id})`}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M32 32 L44.5 21"
        stroke="#fff"
        strokeWidth="4"
        strokeLinecap="round"
        className="origin-[32px_32px] transition-transform duration-500 group-hover:rotate-[60deg]"
      />
      <circle cx="32" cy="32" r="4.5" fill="#fff" />
      <circle cx="32" cy="32" r="1.8" fill="#0a0d12" />
    </svg>
  );
}

export function Logo({ tagline }: { tagline: string }) {
  return (
    <span className="group flex items-center gap-3">
      <LogoMark />
      <span className="flex flex-col leading-tight">
        <span className="font-display text-base font-semibold text-white sm:text-lg">
          Programuesi <span className="text-gradient">i Veturave</span>
        </span>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 sm:block">
          {tagline}
        </span>
      </span>
    </span>
  );
}
