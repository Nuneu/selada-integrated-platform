// Modul User & Partner — pemilik: Nuneu
// Login (di luar dashboard) + halaman akun di bawah /app.
import Login from './pages/Login.jsx';
import Overview from './pages/Overview.jsx';
import Users from './pages/Users.jsx';
import Profile from './pages/Profile.jsx';

export const authRoutes = [
  { path: '/login', element: <Login /> },
];

export const dashboardRoutes = [
  { index: true, element: <Overview /> },
  { path: 'users', element: <Users /> },
  { path: 'profile', element: <Profile /> },
];

export const dashboardNav = {
  title: 'Akun & Pengguna',
  items: [
    { to: '/app', label: 'Ringkasan', end: true },
    { to: '/app/users', label: 'Pengguna' },
    { to: '/app/profile', label: 'Profil' },
  ],
};
