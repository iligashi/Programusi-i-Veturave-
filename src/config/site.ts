/**
 * Single source of truth for business details.
 * Change a phone number or link here and it updates everywhere on the site.
 */
export const site = {
  name: 'Programuesi i Veturave',
  shortName: 'Programuesi',
  url: 'https://programuesiiveturave.netlify.app',
  phone: {
    /** E.164 format, used for tel: / WhatsApp / Viber links */
    e164: '+38349599931',
    display: '+383 49 599 931',
  },
  social: {
    instagram: 'https://www.instagram.com/programues_i_veturave/',
    facebook: 'https://www.facebook.com/Programuesiveturave',
  },
  /** Opening hours in local time (Europe/Belgrade covers both Kosovo and Albania). */
  timezone: 'Europe/Belgrade',
  hours: {
    // 0 = Sunday … 6 = Saturday. null = closed.
    0: null,
    1: { open: '09:00', close: '18:00' },
    2: { open: '09:00', close: '18:00' },
    3: { open: '09:00', close: '18:00' },
    4: { open: '09:00', close: '18:00' },
    5: { open: '09:00', close: '18:00' },
    6: { open: '09:00', close: '18:00' },
  } as Record<number, { open: string; close: string } | null>,
} as const;

export const links = {
  tel: `tel:${site.phone.e164}`,
  whatsapp: (message?: string) =>
    `https://wa.me/${site.phone.e164.replace('+', '')}${
      message ? `?text=${encodeURIComponent(message)}` : ''
    }`,
  viber: `viber://chat?number=${encodeURIComponent(site.phone.e164)}`,
  maps: (query: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
};
