/**
 * Structural data (ids, categories, brands, artwork variants).
 * All human-readable text lives in src/i18n so it can be translated.
 */

export const brandIds = ['bmw', 'audi', 'vw', 'skoda', 'seat', 'lamborghini'] as const;
export type BrandId = (typeof brandIds)[number];

export const categoryIds = ['display', 'driving', 'comfort'] as const;
export type CategoryId = (typeof categoryIds)[number];

export type CarVariant = 'sedan' | 'hatch' | 'super';

export interface BrandMeta {
  id: BrandId;
  name: string;
  variant: CarVariant;
  /** Paint colour for the illustration: [highlight, base] */
  paint: [string, string];
}

export const brands: BrandMeta[] = [
  { id: 'bmw', name: 'BMW', variant: 'sedan', paint: ['#60a5fa', '#1e3a8a'] },
  { id: 'audi', name: 'Audi', variant: 'sedan', paint: ['#cbd5e1', '#475569'] },
  { id: 'vw', name: 'Volkswagen', variant: 'hatch', paint: ['#f87171', '#991b1b'] },
  { id: 'skoda', name: 'Škoda', variant: 'sedan', paint: ['#6ee7b7', '#065f46'] },
  { id: 'seat', name: 'SEAT', variant: 'hatch', paint: ['#fdba74', '#c2410c'] },
  { id: 'lamborghini', name: 'Lamborghini', variant: 'super', paint: ['#fde047', '#a16207'] },
];

export const serviceIds = [
  'videoInMotion',
  'wirelessCarplay',
  'mDisplay',
  'rsDisplay',
  'startupLogo',
  'virtualCockpit',
  'laneAssist',
  'parkingDisplay',
  'corneringFog',
  'startStopMemory',
  'mirrorFold',
  'mirrorTilt',
  'ambientColors',
  'needleSweep',
  'drl',
  'rView',
  'remoteTrunk',
] as const;
export type ServiceId = (typeof serviceIds)[number];

export interface ServiceMeta {
  id: ServiceId;
  category: CategoryId;
  brands: BrandId[];
  featured?: boolean;
}

const VAG: BrandId[] = ['audi', 'vw', 'skoda', 'seat'];

export const services: ServiceMeta[] = [
  { id: 'videoInMotion', category: 'display', brands: ['bmw', ...VAG], featured: true },
  { id: 'wirelessCarplay', category: 'display', brands: ['bmw', ...VAG], featured: true },
  { id: 'mDisplay', category: 'display', brands: ['bmw'], featured: true },
  { id: 'rsDisplay', category: 'display', brands: ['audi'] },
  { id: 'startupLogo', category: 'display', brands: ['bmw', 'audi'] },
  { id: 'virtualCockpit', category: 'display', brands: VAG },
  { id: 'laneAssist', category: 'driving', brands: ['bmw', ...VAG], featured: true },
  { id: 'parkingDisplay', category: 'driving', brands: ['bmw', ...VAG] },
  { id: 'corneringFog', category: 'driving', brands: ['bmw', ...VAG] },
  { id: 'startStopMemory', category: 'driving', brands: ['bmw', ...VAG] },
  { id: 'mirrorFold', category: 'driving', brands: ['bmw', ...VAG] },
  { id: 'mirrorTilt', category: 'driving', brands: ['bmw', ...VAG] },
  { id: 'ambientColors', category: 'comfort', brands: ['bmw', ...VAG], featured: true },
  {
    id: 'needleSweep',
    category: 'comfort',
    brands: ['bmw', ...VAG, 'lamborghini'],
    featured: true,
  },
  { id: 'drl', category: 'comfort', brands: ['bmw', ...VAG] },
  { id: 'rView', category: 'comfort', brands: ['vw', 'audi'] },
  { id: 'remoteTrunk', category: 'comfort', brands: ['bmw', ...VAG] },
];
