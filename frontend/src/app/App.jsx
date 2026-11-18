import { Navigate, useRoutes } from 'react-router-dom';
import PublicLayout from './components/PublicLayout.jsx';
import DashboardLayout from './components/DashboardLayout.jsx';

// Setiap modul mengekspor route + menu miliknya sendiri.
// Tambah/ubah halaman cukup di folder modul masing-masing,
// file ini jarang perlu disentuh (ubah lewat Pull Request).
import { publicRoutes, publicNav } from '../modules/corporate/routes.jsx';
import { authRoutes, dashboardRoutes as identityRoutes, dashboardNav as identityNav } from '../modules/identity/routes.jsx';
import { dashboardRoutes as operationsRoutes, dashboardNav as operationsNav } from '../modules/operations/routes.jsx';

const dashboardSections = [identityNav, operationsNav /*, corporateNav (CMS) nanti */];

export default function App() {
  // TODO (Nuneu): bungkus /app dengan route guard setelah autentikasi siap.
  return useRoutes([
    { path: '/', element: <PublicLayout nav={publicNav} />, children: publicRoutes },
    ...authRoutes,
    {
      path: '/app',
      element: <DashboardLayout sections={dashboardSections} />,
      children: [...identityRoutes, ...operationsRoutes],
    },
    { path: '*', element: <Navigate to="/" replace /> },
  ]);
}
