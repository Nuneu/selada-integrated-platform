// Modul Business Operations — pemilik: Gisel
// Route berada di bawah /app (dashboard). Tambah halaman baru di sini.
import OperationsOverview from './pages/OperationsOverview.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Documents from './pages/Documents.jsx';
import Products from './pages/Products.jsx';
import Cart from './pages/Cart.jsx';
import Orders from './pages/Orders.jsx';
import Reports from './pages/Reports.jsx';

export const dashboardRoutes = [
  { path: 'operations', element: <OperationsOverview /> },
  { path: 'projects', element: <Projects /> },
  { path: 'projects/:id', element: <ProjectDetail /> },
  { path: 'documents', element: <Documents /> },
  { path: 'products', element: <Products /> },
  { path: 'cart', element: <Cart /> },
  { path: 'orders', element: <Orders /> },
  { path: 'reports', element: <Reports /> },
];

export const dashboardNav = {
  title: 'Business Operations',
  items: [
    { to: '/app/operations', label: 'Ringkasan Operasi' },
    { to: '/app/projects', label: 'Proyek' },
    { to: '/app/documents', label: 'Dokumen' },
    { to: '/app/products', label: 'Katalog Produk' },
    { to: '/app/cart', label: 'Keranjang' },
    { to: '/app/orders', label: 'Pesanan' },
    { to: '/app/reports', label: 'Laporan' },
  ],
};
