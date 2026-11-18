// Modul Corporate & Content — pemilik: Devina
// Website publik. Route di bawah "/" (di dalam PublicLayout).
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Contact from './pages/Contact.jsx';

export const publicRoutes = [
  { index: true, element: <Home /> },
  { path: 'layanan', element: <Services /> },
  { path: 'kontak', element: <Contact /> },
];

export const publicNav = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/layanan', label: 'Layanan' },
  { to: '/kontak', label: 'Kontak' },
];
