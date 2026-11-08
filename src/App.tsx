import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Providers } from './Providers';
import { routerFuture, routes } from './routes';

const router = createBrowserRouter(routes, { future: routerFuture });

export default function App() {
  return (
    <Providers>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </Providers>
  );
}
