// Data contoh — bentuknya mengikuti kolom di database/01_operations_schema.sql
const wait = (data, ms = 250) => new Promise((r) => setTimeout(() => r(structuredClone(data)), ms));

const projects = [
  { id: 1, code: 'PRJ-2026-001', name: 'Website Company Profile', status: 'active', priority: 'high', progress: 60, start_date: '2026-10-01', due_date: '2026-12-15', members: ['Staf Developer'], clients: ['Klien Contoh'] },
  { id: 2, code: 'PRJ-2026-002', name: 'Aplikasi Absensi Karyawan', status: 'active', priority: 'medium', progress: 35, start_date: '2026-10-20', due_date: '2027-01-30', members: ['Staf Developer'], clients: [] },
  { id: 3, code: 'PRJ-2026-003', name: 'Instalasi Jaringan Kantor', status: 'completed', priority: 'low', progress: 100, start_date: '2026-08-01', due_date: '2026-09-15', members: [], clients: [] },
];

const projectUpdates = {
  1: [
    { id: 2, progress: 60, note: 'Halaman layanan dan kontak sudah live.', created_at: '2026-11-10', updated_by: 'Staf Developer' },
    { id: 1, progress: 30, note: 'Desain halaman utama selesai.', created_at: '2026-10-22', updated_by: 'Staf Developer' },
  ],
  2: [{ id: 3, progress: 35, note: 'Modul autentikasi dan laporan dikerjakan.', created_at: '2026-11-12', updated_by: 'Staf Developer' }],
  3: [],
};

const documents = [
  { id: 1, title: 'Proposal Website Company Profile', project: 'PRJ-2026-001', file_name: 'proposal.pdf', file_size: 524288, visibility: 'shared', created_at: '2026-10-02' },
  { id: 2, title: 'Catatan Internal Meeting', project: 'PRJ-2026-001', file_name: 'meeting.pdf', file_size: 102400, visibility: 'internal', created_at: '2026-10-15' },
];

const products = [
  { id: 1, sku: 'SVC-WEB-001', name: 'Paket Website Basic', category: 'Layanan Digital', price: 3500000, stock: null, description: 'Website company profile sampai 5 halaman.' },
  { id: 2, sku: 'SVC-APP-001', name: 'Pembuatan Aplikasi Custom', category: 'Layanan Digital', price: 15000000, stock: null, description: 'Aplikasi web/mobile sesuai kebutuhan.' },
  { id: 3, sku: 'HW-RTR-001', name: 'Router Dual Band', category: 'Perangkat IT', price: 450000, stock: 25, description: 'Router Wi-Fi dual band untuk kantor kecil.' },
  { id: 4, sku: 'HW-IOT-001', name: 'Paket Sensor IoT Starter', category: 'Perangkat IT', price: 750000, stock: 12, description: 'Mikrokontroler dan sensor dasar.' },
];

let cart = [{ product_id: 3, quantity: 2 }];

const orders = [
  { id: 1, order_number: 'ORD-20261117-0001', customer_name: 'Pelanggan Satu', status: 'confirmed', total_amount: 5150000, created_at: '2026-11-17', items: 3 },
  { id: 2, order_number: 'ORD-20261116-0002', customer_name: 'Pelanggan Dua', status: 'pending', total_amount: 450000, created_at: '2026-11-16', items: 1 },
  { id: 3, order_number: 'ORD-20261110-0003', customer_name: 'Pelanggan Tiga', status: 'completed', total_amount: 15000000, created_at: '2026-11-10', items: 1 },
];

export const mockApi = {
  getProjects: () => wait(projects),
  getProject: (id) => wait({ ...projects.find((p) => p.id === Number(id)), updates: projectUpdates[id] ?? [] }),
  addProjectUpdate: () => wait({}),
  getDocuments: () => wait(documents),
  getProducts: () => wait(products),
  getCart: () => wait(cart),
  updateCart: (payload) => { cart = payload.items ?? cart; return wait(cart); },
  createOrder: () => wait({ order_number: 'ORD-DEMO-0001', status: 'pending' }),
  getOrders: () => wait(orders),
  updateOrderStatus: () => wait({}),
  getReportSummary: () =>
    wait({
      projects_total: projects.length,
      projects_active: projects.filter((p) => p.status === 'active').length,
      orders_total: orders.length,
      orders_pending: orders.filter((o) => o.status === 'pending').length,
      revenue: orders.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + o.total_amount, 0),
    }),
};
