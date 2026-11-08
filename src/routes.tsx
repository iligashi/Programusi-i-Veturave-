import { lazy, Suspense, type ReactNode } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';

// Home is part of the main bundle for the fastest first paint; other pages load on demand.
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const withSuspense = (element: ReactNode) => (
  <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>{element}</Suspense>
);

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: withSuspense(<Services />) },
      { path: 'about', element: withSuspense(<About />) },
      { path: 'contact', element: withSuspense(<Contact />) },
      { path: '*', element: withSuspense(<NotFound />) },
    ],
  },
];

/** Opt in to React Router v7 behaviour now, so the future upgrade is a no-op. */
export const routerFuture = {
  v7_relativeSplatPath: true,
  v7_fetcherPersist: true,
  v7_normalizeFormMethod: true,
  v7_partialHydration: true,
  v7_skipActionErrorRevalidation: true,
} as const;
