import { motion, useReducedMotion } from 'framer-motion';
import { useId } from 'react';
import type { CarVariant } from '../../data/catalog';

interface Shape {
  body: string;
  glass: string;
  pillar: [number, number, number, number];
  wheels: [number, number];
  headlight: string;
  taillight: string;
  beltline: string;
}

/**
 * Side-profile outlines, facing right, drawn on a 600×240 grid.
 * Wheel arches are cut with arcs so the tyres sit inside them.
 */
const shapes: Record<CarVariant, Shape> = {
  sedan: {
    body: 'M40,170 C40,150 55,140 80,136 L190,122 C215,100 250,78 300,74 L380,74 C420,76 450,96 480,120 L540,130 C562,134 572,148 572,165 L572,178 C572,186 566,190 558,190 L505,190 A50,50 0 0 0 405,190 L200,190 A50,50 0 0 0 100,190 L52,190 C44,190 40,184 40,176 Z',
    glass: 'M208,123 C232,104 260,89 300,87 L372,87 C404,89 428,104 449,121 Z',
    pillar: [334, 87, 330, 123],
    wheels: [150, 455],
    headlight: 'M546,138 L568,146 L566,155 L538,150 Z',
    taillight: 'M42,152 L62,148 L62,162 L42,166 Z',
    beltline: 'M70,150 C200,140 400,132 560,140',
  },
  hatch: {
    body: 'M50,176 L52,124 C54,96 70,80 102,78 L330,76 C372,78 402,96 432,118 L530,130 C552,134 564,148 564,164 L564,178 C564,186 558,190 550,190 L500,190 A50,50 0 0 0 400,190 L195,190 A50,50 0 0 0 95,190 L62,190 C55,190 50,185 50,178 Z',
    glass: 'M72,118 L74,100 C76,92 86,89 100,89 L326,88 C356,90 380,104 404,119 Z',
    pillar: [250, 89, 248, 119],
    wheels: [145, 450],
    headlight: 'M538,138 L560,146 L558,155 L530,150 Z',
    taillight: 'M52,120 L64,120 L64,146 L52,146 Z',
    beltline: 'M56,150 C200,142 400,134 552,140',
  },
  super: {
    body: 'M30,176 C30,160 40,152 60,150 L200,138 C250,110 300,94 360,92 C420,94 470,114 520,136 L560,146 C575,150 580,160 580,172 L580,180 C580,186 575,190 568,190 L510,190 A50,50 0 0 0 410,190 L205,190 A50,50 0 0 0 105,190 L45,190 C36,190 30,186 30,178 Z',
    glass: 'M228,135 C266,113 306,102 354,101 C398,103 432,116 462,133 Z',
    pillar: [300, 105, 296, 135],
    wheels: [155, 460],
    headlight: 'M540,146 L574,156 L572,162 L534,154 Z',
    taillight: 'M32,160 L70,154 L70,160 L32,166 Z',
    beltline: 'M50,162 C200,150 400,142 570,158',
  },
};

function Wheel({ cx, spin }: { cx: number; spin: boolean }) {
  const reduce = useReducedMotion();
  return (
    <g>
      <circle cx={cx} cy={190} r={42} fill="#07090d" />
      <circle cx={cx} cy={190} r={41} fill="none" stroke="#1f2937" strokeWidth={3} />
      <motion.g
        style={{ originX: `${cx}px`, originY: '190px' }}
        animate={spin && !reduce ? { rotate: 360 } : { rotate: 0 }}
        transition={spin ? { duration: 0.6, ease: 'linear', repeat: Infinity } : { duration: 0.8 }}
      >
        <circle cx={cx} cy={190} r={28} fill="#1e293b" stroke="#94a3b8" strokeWidth={2} />
        {[0, 72, 144, 216, 288].map((angle) => (
          <rect
            key={angle}
            x={cx - 3}
            y={164}
            width={6}
            height={24}
            rx={3}
            fill="#cbd5e1"
            transform={`rotate(${angle} ${cx} 190)`}
          />
        ))}
        <circle cx={cx} cy={190} r={7} fill="#e2e8f0" />
      </motion.g>
      <path
        d={`M${cx - 22},${190 - 34} A40,40 0 0 1 ${cx + 30},${190 - 26}`}
        stroke="#ef4444"
        strokeWidth={5}
        strokeLinecap="round"
        fill="none"
        opacity={0.85}
      />
    </g>
  );
}

interface Props {
  variant: CarVariant;
  paint: [string, string];
  /** Spins the wheels and turns the headlights on. */
  active?: boolean;
  className?: string;
  title?: string;
}

export function CarIllustration({ variant, paint, active = false, className, title }: Props) {
  const id = useId().replace(/:/g, '');
  const shape = shapes[variant];
  const [highlight, base] = paint;

  return (
    <svg
      viewBox="0 0 640 240"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id={`paint-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={highlight} />
          <stop offset="0.55" stopColor={base} />
          <stop offset="1" stopColor={base} stopOpacity={0.85} />
        </linearGradient>
        <linearGradient id={`glass-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1e293b" />
          <stop offset="0.5" stopColor="#0b1220" />
          <stop offset="1" stopColor="#334155" />
        </linearGradient>
        <linearGradient id={`beam-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e0f2fe" stopOpacity={0.55} />
          <stop offset="1" stopColor="#e0f2fe" stopOpacity={0} />
        </linearGradient>
        <radialGradient id={`shadow-${id}`}>
          <stop offset="0" stopColor="#000" stopOpacity={0.75} />
          <stop offset="1" stopColor="#000" stopOpacity={0} />
        </radialGradient>
      </defs>

      <ellipse cx={305} cy={228} rx={290} ry={14} fill={`url(#shadow-${id})`} />

      <motion.path
        d={`M${shape.headlight.split(' ')[0]!.slice(1)} L640,120 L640,200 Z`}
        fill={`url(#beam-${id})`}
        initial={false}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <path d={shape.body} fill={`url(#paint-${id})`} />
      <path d={shape.beltline} stroke="#ffffff" strokeOpacity={0.25} strokeWidth={2} fill="none" />
      <path d={shape.glass} fill={`url(#glass-${id})`} />
      <path d={shape.glass} fill="none" stroke="#ffffff" strokeOpacity={0.12} strokeWidth={1.5} />
      <line
        x1={shape.pillar[0]}
        y1={shape.pillar[1]}
        x2={shape.pillar[2]}
        y2={shape.pillar[3]}
        stroke={base}
        strokeWidth={7}
      />

      <motion.path
        d={shape.headlight}
        initial={false}
        animate={{ fill: active ? '#f0f9ff' : '#bae6fd' }}
        style={{ filter: active ? 'drop-shadow(0 0 6px #7dd3fc)' : 'none' }}
      />
      <path d={shape.taillight} fill="#ef4444" style={{ filter: 'drop-shadow(0 0 4px #ef4444)' }} />

      <Wheel cx={shape.wheels[0]} spin={active} />
      <Wheel cx={shape.wheels[1]} spin={active} />
    </svg>
  );
}
