import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import QuranPage from './pages/QuranPage';
import CalendarPage from './pages/CalendarPage';
import PrayerTimesPage from './pages/PrayerTimesPage';

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const quranRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/quran',
  component: QuranPage,
});

const calendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/calendar',
  component: CalendarPage,
});

const prayerTimesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/prayer-times',
  component: PrayerTimesPage,
});

const routeTree = rootRoute.addChildren([indexRoute, quranRoute, calendarRoute, prayerTimesRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
