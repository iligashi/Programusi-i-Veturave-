import type { BrandId, CategoryId, ServiceId } from '../data/catalog';

/**
 * English copy. This object defines the shape every other language must follow
 * (see `Messages` below), so a missing translation is a compile error.
 */
export const en = {
  meta: {
    htmlLang: 'en',
    locale: 'en_US',
  },
  common: {
    brandTagline: 'Car coding & feature activation',
    whatsappUs: 'Message us on WhatsApp',
    callUs: 'Call us',
    viewServices: 'View all services',
    getQuote: 'Get a free quote',
    learnMore: 'Learn more',
    skipToContent: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchLanguage: 'Ndrysho gjuhën në shqip',
    followInstagram: 'Follow us on Instagram',
    followFacebook: 'Follow us on Facebook',
    chatWhatsapp: 'Chat on WhatsApp',
    chatViber: 'Chat on Viber',
    backToTop: 'Back to top',
    whatsappHello: 'Hi! I would like to ask about car coding.',
    whatsappInterested: 'Hi! I am interested in: {service}. My car is: ',
  },
  nav: {
    home: 'Home',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
  },
  home: {
    seoTitle: 'Car coding & feature activation in Prishtinë, Tiranë, Durrës',
    seoDescription:
      'Unlock hidden features already built into your BMW, Audi, VW, Škoda, SEAT or Lamborghini: wireless CarPlay, ambient lighting, M/RS displays, lane assist and more.',
    hero: {
      eyebrow: 'Prishtinë · Tiranë · Durrës',
      titleA: 'Unlock what your car',
      titleB: 'already has.',
      subtitle:
        'Most modern cars ship with features that are switched off in software. We code them back on — cleanly, safely and fully reversible.',
      ctaPrimary: 'Message us on WhatsApp',
      ctaSecondary: 'Explore services',
      stats: [
        { value: '6', label: 'Car brands' },
        { value: '17+', label: 'Activations' },
        { value: '3', label: 'Cities' },
      ],
    },
    cockpit: {
      label: 'Live coding session',
      lines: [
        'Connecting to vehicle gateway…',
        'Reading infotainment module…',
        'Activate: wireless CarPlay',
        'Activate: video in motion',
        'Activate: ambient colours',
        'Coding complete — drive safe.',
      ],
      ok: 'OK',
      speedUnit: 'km/h',
    },
    marquee: 'Brands we code',
    why: {
      eyebrow: 'Why us',
      title: 'Factory features, done properly',
      subtitle:
        'No cheap add-on boxes, no cut wires. We work directly with your car’s own control modules.',
      items: [
        {
          title: 'Specialist tools',
          body: 'Professional diagnostic and coding equipment for BMW and VAG group vehicles.',
        },
        {
          title: 'Fully reversible',
          body: 'Every change is software-only and can be switched back at any time.',
        },
        {
          title: 'Guaranteed work',
          body: 'Every activation is tested on your car before you leave, with a satisfaction guarantee.',
        },
        {
          title: 'Three locations',
          body: 'Find us in Prishtinë, Tiranë and Durrës — book a slot that suits you.',
        },
      ],
    },
    process: {
      eyebrow: 'How it works',
      title: 'Three steps to a better car',
      steps: [
        {
          title: 'Tell us your car',
          body: 'Send us the model and year on WhatsApp or Viber, plus the features you want.',
        },
        {
          title: 'We check & quote',
          body: 'We confirm what your exact car supports and give you a clear price upfront.',
        },
        {
          title: 'Drive away upgraded',
          body: 'We code the features while you wait, then walk you through everything new.',
        },
      ],
    },
    popular: {
      eyebrow: 'Most requested',
      title: 'Popular activations',
      subtitle: 'A few of the upgrades our customers ask for most.',
    },
    explorer: {
      eyebrow: 'Supported brands',
      title: 'Pick your brand',
      subtitle: 'See some of the highlights we can activate on your car.',
      highlights: 'Highlights',
      allServices: 'All services for this brand',
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Questions, answered',
      items: [
        {
          q: 'Is coding safe for my car?',
          a: 'Yes. We only enable features your car’s hardware already supports, using the same settings the factory uses. Nothing is physically modified.',
        },
        {
          q: 'Can the changes be undone?',
          a: 'Always. Every activation is software-only and can be reverted, for example before selling the car or a dealer visit.',
        },
        {
          q: 'Will I lose my warranty?',
          a: 'Coding does not change any hardware. If you are worried about a dealer visit, we can revert the changes beforehand.',
        },
        {
          q: 'How do I know which features my car supports?',
          a: 'Send us your model and year on WhatsApp. We will tell you exactly what is possible before you book.',
        },
        {
          q: 'How long does it take?',
          a: 'Most activations are finished during a single visit. We will give you a time estimate together with the quote.',
        },
      ],
    },
    cta: {
      title: 'Ready to upgrade your car?',
      subtitle: 'Send us your model and the features you want. We reply quickly with a free quote.',
    },
  },
  services: {
    seoTitle: 'Services',
    seoDescription:
      'Full list of coding services: video in motion, wireless CarPlay, M/RS displays, lane assist, ambient lighting, needle sweep, mirror folding and more.',
    eyebrow: 'Services',
    title: 'Everything we can switch on',
    subtitle:
      'Filter by category or brand. Tap any service to ask about it on WhatsApp with one message.',
    all: 'All',
    filterCategory: 'Filter by category',
    filterBrand: 'Filter by brand',
    allBrands: 'All brands',
    ask: 'Ask about this',
    empty: 'No services match these filters yet — message us, it may still be possible.',
    count: '{n} services',
    note: 'Availability depends on your exact model, year and equipment. We always confirm before we start.',
    categories: {
      display: { title: 'Display & entertainment', short: 'Display' },
      driving: { title: 'Driving & safety', short: 'Driving' },
      comfort: { title: 'Comfort & style', short: 'Comfort' },
    } satisfies Record<CategoryId, { title: string; short: string }>,
    items: {
      videoInMotion: {
        title: 'Video in motion',
        body: 'Lets passengers keep watching video while the car is moving.',
      },
      wirelessCarplay: {
        title: 'Wireless CarPlay',
        body: 'Enable Apple CarPlay over Wi-Fi — no cable needed.',
      },
      mDisplay: {
        title: 'M / Alpina display',
        body: 'M or Alpina themed instrument cluster and start-up screens.',
      },
      rsDisplay: {
        title: 'S / RS display mode',
        body: 'Sportier S or RS cluster layout and RS light signature.',
      },
      startupLogo: {
        title: 'Start-up logo',
        body: 'Show the M or RS logo when the infotainment system boots.',
      },
      virtualCockpit: {
        title: 'Virtual cockpit views',
        body: 'Unlock extra layouts and sport views on the digital cluster.',
      },
      laneAssist: {
        title: 'Lane & traffic assist',
        body: 'Activate lane keeping assistance where the camera hardware is fitted.',
      },
      parkingDisplay: {
        title: 'Parking sensor display',
        body: 'Show the parking sensor graphics on the main screen.',
      },
      corneringFog: {
        title: 'Cornering fog lights',
        body: 'Fog lights switch on with the steering to light up corners.',
      },
      startStopMemory: {
        title: 'Start/Stop memory',
        body: 'The car remembers if you switched Start/Stop off.',
      },
      mirrorFold: {
        title: 'Fold mirrors on lock',
        body: 'Mirrors fold automatically every time you lock the car.',
      },
      mirrorTilt: {
        title: 'Mirror tilt in reverse',
        body: 'Passenger mirror dips down in reverse so you can see the kerb.',
      },
      ambientColors: {
        title: 'Ambient light colours',
        body: 'Unlock the full colour range for the interior ambient lighting.',
      },
      needleSweep: {
        title: 'Needle sweep',
        body: 'Gauge needles sweep to the end and back when you start the car.',
      },
      drl: {
        title: 'LED daytime lights',
        body: 'Configure daytime running lights brightness and behaviour.',
      },
      rView: {
        title: 'R view, 320 km/h',
        body: 'R-line cluster graphics with a 320 km/h speedometer scale.',
      },
      remoteTrunk: {
        title: 'Remote trunk opening',
        body: 'Open the boot with a long press on the key.',
      },
    } satisfies Record<ServiceId, { title: string; body: string }>,
  },
  brands: {
    bmw: { highlights: ['M / Alpina display', 'Ambient lighting', 'Video in motion'] },
    audi: { highlights: ['RS lights & display', 'Virtual cockpit views', 'Wireless CarPlay'] },
    vw: { highlights: ['R view, 320 km/h', 'Digital cockpit views', 'Lane assist'] },
    skoda: { highlights: ['Virtual cockpit', 'Fold mirrors on lock', 'Parking display'] },
    seat: { highlights: ['Digital cockpit', 'Ambient colours', 'Needle sweep'] },
    lamborghini: { highlights: ['Sport display', 'Dynamic mode', 'Needle sweep'] },
  } satisfies Record<BrandId, { highlights: string[] }>,
  about: {
    seoTitle: 'About us',
    seoDescription:
      'Programuesi i Veturave is a car coding specialist working across Kosovo and Albania.',
    eyebrow: 'About us',
    title: 'Car people who speak code',
    subtitle:
      'We started Programuesi i Veturave because we love cars — and we know how much of them is hidden behind software switches.',
    storyTitle: 'What we do',
    story: [
      'Modern cars are rolling computers. The same model is often sold with dozens of features that are installed but turned off in software, depending on the market or trim level.',
      'We connect to your car’s control modules with professional equipment and turn those features on, the same way the factory would. No extra hardware, no cut wires — just your car, working the way it can.',
    ],
    valuesTitle: 'How we work',
    values: [
      {
        title: 'Honest advice',
        body: 'We tell you upfront what your car supports — and what it does not.',
      },
      { title: 'Clean work', body: 'Software only, documented, and reversible whenever you want.' },
      { title: 'Clear prices', body: 'You know the price before we start. No surprises.' },
      { title: 'Real support', body: 'Questions after the visit? Just message us.' },
    ],
    locationsTitle: 'Where to find us',
  },
  contact: {
    seoTitle: 'Contact',
    seoDescription:
      'Call or message Programuesi i Veturave on WhatsApp or Viber. Locations in Prishtinë, Tiranë and Durrës.',
    eyebrow: 'Contact',
    title: 'Let’s talk about your car',
    subtitle: 'The fastest way to reach us is WhatsApp. We usually reply within the same day.',
    methods: {
      whatsapp: { title: 'WhatsApp', body: 'Fastest reply' },
      viber: { title: 'Viber', body: 'Chat with us' },
      phone: { title: 'Phone', body: 'Call during opening hours' },
    },
    composer: {
      title: 'Build your request',
      subtitle: 'Fill this in and we open WhatsApp with your message ready to send.',
      name: 'Your name',
      car: 'Car model & year',
      carPlaceholder: 'e.g. BMW 3 Series, 2020',
      service: 'What are you interested in?',
      servicePlaceholder: 'Choose a service (optional)',
      message: 'Anything else?',
      submit: 'Continue in WhatsApp',
      template: 'Hi! My name is {name}.\nCar: {car}\nInterested in: {service}\n{message}',
      notSure: 'Not sure yet',
    },
    locationsTitle: 'Locations',
    openInMaps: 'Open in Google Maps',
    hoursTitle: 'Opening hours',
    openNow: 'Open now',
    closedNow: 'Closed now',
    closed: 'Closed',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    followTitle: 'See our work',
    followBody: 'Before/after photos and videos of recent cars on Instagram and Facebook.',
  },
  locations: [
    { city: 'Prishtinë', country: 'Kosovo', query: 'Prishtinë, Kosovo' },
    { city: 'Tiranë', country: 'Albania', query: 'Tiranë, Albania' },
    { city: 'Durrës', country: 'Albania', query: 'Durrës, Albania' },
  ],
  notFound: {
    seoTitle: 'Page not found',
    code: '404',
    title: 'Wrong turn.',
    body: 'This page does not exist — but your car’s hidden features do.',
    home: 'Back to home',
  },
  footer: {
    about:
      'Professional car coding and factory feature activation for BMW, Audi, VW, Škoda, SEAT and Lamborghini.',
    explore: 'Explore',
    contact: 'Contact',
    locations: 'Locations',
    rights: 'All rights reserved.',
  },
};

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : T extends object
      ? { [K in keyof T]: Widen<T[K]> }
      : T;

export type Messages = Widen<typeof en>;
