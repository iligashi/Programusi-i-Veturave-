import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Providers } from '../Providers';
import { routerFuture, routes } from '../routes';
import { links } from '../config/site';
import { services } from '../data/catalog';
import { en } from '../i18n/en';
import type { Language } from '../i18n/context';
import { sq } from '../i18n/sq';
import { isOpenAt } from '../lib/hours';

function renderAt(path: string, language: Language = 'sq') {
  const router = createMemoryRouter(routes, { initialEntries: [path], future: routerFuture });
  render(
    <Providers initialLanguage={language}>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </Providers>,
  );
  return router;
}

describe('routing', () => {
  it('renders the home page hero in Albanian by default', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(sq.home.hero.titleA);
  });

  it.each([
    ['/services', sq.services.title],
    ['/about', sq.about.title],
    ['/contact', sq.contact.title],
    ['/this-page-does-not-exist', sq.notFound.title],
  ])('renders %s', async (path, heading) => {
    renderAt(path);
    expect(await screen.findByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
  });
});

describe('language switch', () => {
  it('switches the whole page to English and remembers the choice', async () => {
    const user = userEvent.setup();
    renderAt('/services');
    await screen.findByRole('heading', { level: 1, name: sq.services.title });

    const nav = screen.getByRole('navigation', { name: 'Main' });
    await user.click(within(nav).getByRole('button', { name: 'en' }));

    expect(
      await screen.findByRole('heading', { level: 1, name: en.services.title }),
    ).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('en');
    expect(window.localStorage.getItem('pv.language')).toBe('en');
  });
});

describe('services filters', () => {
  it('filters by brand from the URL', async () => {
    renderAt('/services?brand=lamborghini');
    const expected = services.filter((s) => s.brands.includes('lamborghini')).length;
    expect(
      await screen.findByText(sq.services.count.replace('{n}', String(expected))),
    ).toBeInTheDocument();
  });

  it('every service links to WhatsApp with a prefilled message', async () => {
    renderAt('/services');
    const asks = await screen.findAllByRole('link', { name: sq.services.ask });
    expect(asks).toHaveLength(services.length);
    asks.forEach((a) =>
      expect(a.getAttribute('href')).toMatch(/^https:\/\/wa\.me\/38349599931\?text=/),
    );
  });
});

describe('content', () => {
  it('has a title and description for every service in both languages', () => {
    for (const { id } of services) {
      for (const dict of [en, sq]) {
        expect(dict.services.items[id].title.length).toBeGreaterThan(0);
        expect(dict.services.items[id].body.length).toBeGreaterThan(0);
      }
    }
  });

  it('builds contact links from one phone number', () => {
    expect(links.tel).toBe('tel:+38349599931');
    expect(links.whatsapp()).toBe('https://wa.me/38349599931');
    expect(links.whatsapp('Hi & bye')).toBe('https://wa.me/38349599931?text=Hi%20%26%20bye');
  });
});

describe('opening hours', () => {
  // Europe/Belgrade is UTC+1 in winter.
  it('is open on a weekday at noon', () => {
    expect(isOpenAt(new Date('2025-01-15T11:00:00Z'))).toBe(true);
  });
  it('is closed at night', () => {
    expect(isOpenAt(new Date('2025-01-15T20:00:00Z'))).toBe(false);
  });
  it('is closed on Sunday', () => {
    expect(isOpenAt(new Date('2025-01-19T11:00:00Z'))).toBe(false);
  });
});
