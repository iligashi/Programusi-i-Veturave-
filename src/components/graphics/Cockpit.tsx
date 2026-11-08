import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { useEffect, useState } from 'react';
import { useI18n } from '../../i18n/useI18n';

const MAX_SPEED = 320;
const START_ANGLE = -225; // degrees, 0 = pointing right
const SWEEP = 270;
const CX = 160;
const CY = 160;
const R = 128;

function polar(angleDeg: number, radius: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CX + radius * Math.cos(a), y: CY + radius * Math.sin(a) };
}

function arcPath(radius: number, from: number, to: number) {
  const start = polar(from, radius);
  const end = polar(to, radius);
  const large = to - from > 180 ? 1 : 0;
  return `M${start.x},${start.y} A${radius},${radius} 0 ${large} 1 ${end.x},${end.y}`;
}

const ticks = Array.from({ length: MAX_SPEED / 20 + 1 }, (_, i) => i * 20);

/** A digital speedometer that performs a "needle sweep" — one of the features we activate. */
function Gauge() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const speed = useMotionValue(0);
  const angle = useTransform(speed, (v) => START_ANGLE + (v / MAX_SPEED) * SWEEP + 90);
  const progress = useTransform(speed, (v) => v / MAX_SPEED);
  // Hide the arc completely at 0, otherwise the round line caps leave a dot.
  const arcOpacity = useTransform(speed, [0, 4], [0, 1]);
  const [display, setDisplay] = useState(0);
  useMotionValueEvent(speed, 'change', (v) => setDisplay(Math.round(v)));

  useEffect(() => {
    if (reduce) {
      speed.set(0);
      return;
    }
    let cancelled = false;
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const run = async () => {
      await wait(600);
      while (!cancelled) {
        await animate(speed, MAX_SPEED, { duration: 1.1, ease: [0.3, 0, 0.2, 1] });
        if (cancelled) break;
        await animate(speed, 0, { duration: 1.1, ease: [0.3, 0, 0.2, 1] });
        if (cancelled) break;
        await wait(6000);
      }
    };
    void run();
    return () => {
      cancelled = true;
      speed.stop();
    };
  }, [reduce, speed]);

  return (
    <svg viewBox="0 0 320 300" className="w-full" aria-hidden>
      <defs>
        <linearGradient id="gauge-accent" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#38bdf8" />
          <stop offset="0.7" stopColor="#818cf8" />
          <stop offset="1" stopColor="#f43f5e" />
        </linearGradient>
        <radialGradient id="gauge-face">
          <stop offset="0" stopColor="#111827" />
          <stop offset="1" stopColor="#05070a" />
        </radialGradient>
      </defs>
      <circle cx={CX} cy={CY} r={R + 18} fill="url(#gauge-face)" />
      <path
        d={arcPath(R, START_ANGLE, START_ANGLE + SWEEP)}
        stroke="#1f2937"
        strokeWidth={10}
        strokeLinecap="round"
        fill="none"
      />
      <motion.path
        d={arcPath(R, START_ANGLE, START_ANGLE + SWEEP)}
        stroke="url(#gauge-accent)"
        strokeWidth={10}
        strokeLinecap="round"
        fill="none"
        style={{ pathLength: progress, opacity: arcOpacity }}
      />
      {ticks.map((value) => {
        const a = START_ANGLE + (value / MAX_SPEED) * SWEEP;
        const major = value % 40 === 0;
        const outer = polar(a, R - 12);
        const inner = polar(a, R - (major ? 26 : 19));
        const label = polar(a, R - 42);
        return (
          <g key={value}>
            <line
              x1={outer.x}
              y1={outer.y}
              x2={inner.x}
              y2={inner.y}
              stroke={value >= 260 ? '#f43f5e' : '#64748b'}
              strokeWidth={major ? 2.5 : 1.5}
              strokeLinecap="round"
            />
            {major && (
              <text
                x={label.x}
                y={label.y}
                fill="#94a3b8"
                fontSize={11}
                fontFamily="JetBrains Mono, monospace"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {value}
              </text>
            )}
          </g>
        );
      })}
      <motion.g style={{ rotate: angle, originX: `${CX}px`, originY: `${CY}px` }}>
        <path
          d={`M${CX - 3},${CY + 14} L${CX},${CY - R + 22} L${CX + 3},${CY + 14} Z`}
          fill="#f8fafc"
          style={{ filter: 'drop-shadow(0 0 6px rgba(56,189,248,0.9))' }}
        />
      </motion.g>
      <circle cx={CX} cy={CY} r={12} fill="#0f172a" stroke="#38bdf8" strokeWidth={2} />
      <text
        x={CX}
        y={CY + 62}
        fill="#fff"
        fontSize={34}
        fontWeight={700}
        fontFamily="Space Grotesk, sans-serif"
        textAnchor="middle"
      >
        {display}
      </text>
      <text
        x={CX}
        y={CY + 82}
        fill="#64748b"
        fontSize={11}
        fontFamily="JetBrains Mono, monospace"
        textAnchor="middle"
        letterSpacing={2}
      >
        {t.home.cockpit.speedUnit.toUpperCase()}
      </text>
    </svg>
  );
}

/** Coding log that "types" itself line by line, then loops. */
function CodingLog() {
  const { t, language } = useI18n();
  const reduce = useReducedMotion();
  const lines = t.home.cockpit.lines;
  const [visible, setVisible] = useState(reduce ? lines.length : 0);

  useEffect(() => {
    if (reduce) {
      setVisible(lines.length);
      return;
    }
    setVisible(0);
    let step = 0;
    const timer = window.setInterval(() => {
      step = step >= lines.length + 4 ? 0 : step + 1;
      setVisible(Math.min(step, lines.length));
    }, 900);
    return () => window.clearInterval(timer);
  }, [lines.length, reduce, language]);

  return (
    <div className="font-mono text-[11px] leading-relaxed sm:text-xs">
      {lines.map((line, i) => {
        const done = i < visible;
        const last = i === lines.length - 1;
        return (
          <motion.div
            key={`${language}-${i}`}
            initial={false}
            animate={{ opacity: done ? 1 : 0.15, x: done ? 0 : -4 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between gap-3"
          >
            <span className={last ? 'text-volt-300' : 'text-slate-300'}>
              <span className="mr-2 text-slate-600" aria-hidden>
                &gt;
              </span>
              {line}
            </span>
            {!last && (
              <span className={done ? 'text-emerald-400' : 'text-transparent'}>
                {t.home.cockpit.ok}
              </span>
            )}
          </motion.div>
        );
      })}
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-volt-400 to-signal-400"
          initial={false}
          animate={{ width: `${(visible / lines.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}

export function Cockpit() {
  const { t } = useI18n();
  return (
    <div className="relative">
      <div className="absolute -inset-8 rounded-[3rem] bg-volt-500/20 blur-3xl" aria-hidden />
      <div className="card relative overflow-hidden p-5 shadow-glow-lg sm:p-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {t.home.cockpit.label}
          </span>
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </span>
        </div>
        <div className="mx-auto max-w-[300px]">
          <Gauge />
        </div>
        <div className="-mt-8 rounded-xl border border-white/5 bg-ink-950/80 p-4" aria-hidden>
          <CodingLog />
        </div>
      </div>
    </div>
  );
}
