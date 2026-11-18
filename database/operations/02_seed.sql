-- Data contoh untuk development (JANGAN dipakai di produksi)
-- Jalankan setelah 00_shared_stub.sql dan 01_operations_schema.sql

INSERT INTO roles (name) VALUES ('admin'), ('staff'), ('client'), ('customer');

INSERT INTO users (name, email, password) VALUES
  ('Admin SIP',       'admin@sip.test',    'dev-only-hash'),
  ('Staf Developer',  'staff@sip.test',    'dev-only-hash'),
  ('Klien Contoh',    'client@sip.test',   'dev-only-hash'),
  ('Pelanggan Satu',  'customer@sip.test', 'dev-only-hash');

INSERT INTO user_roles (user_id, role_id) VALUES (1,1), (2,2), (3,3), (4,4);

-- Proyek
INSERT INTO projects (code, name, description, status, priority, progress, start_date, due_date, created_by) VALUES
  ('PRJ-2026-001', 'Website Company Profile', 'Pembuatan website profil perusahaan klien.', 'active',    'high',   60, '2026-10-01', '2026-12-15', 1),
  ('PRJ-2026-002', 'Aplikasi Absensi Karyawan', 'Sistem absensi berbasis web dan mobile.',    'active',    'medium', 35, '2026-10-20', '2027-01-30', 1),
  ('PRJ-2026-003', 'Instalasi Jaringan Kantor', 'Instalasi dan konfigurasi jaringan LAN.',    'completed', 'low',   100, '2026-08-01', '2026-09-15', 1);

INSERT INTO project_members (project_id, user_id, role_label) VALUES (1,2,'developer'), (2,2,'developer');
INSERT INTO project_clients (project_id, client_id) VALUES (1,3);

INSERT INTO project_updates (project_id, updated_by, progress, status, note, visible_to_client) VALUES
  (1, 2, 30, 'active', 'Desain halaman utama selesai.',           TRUE),
  (1, 2, 60, 'active', 'Halaman layanan dan kontak sudah live.',  TRUE),
  (2, 2, 35, 'active', 'Modul autentikasi dan laporan dikerjakan.', FALSE);

-- Dokumen (metadata saja)
INSERT INTO documents (project_id, title, file_path, file_name, mime_type, file_size, visibility, uploaded_by) VALUES
  (1, 'Proposal Website Company Profile', 'documents/prj-001/proposal.pdf', 'proposal.pdf', 'application/pdf', 524288, 'shared',   1),
  (1, 'Catatan Internal Meeting',         'documents/prj-001/meeting.pdf',  'meeting.pdf',  'application/pdf', 102400, 'internal', 2);

INSERT INTO document_access (document_id, role_id, can_view, can_download)
SELECT 1, id, TRUE, TRUE FROM roles WHERE name = 'client';

-- Produk
INSERT INTO product_categories (name, slug) VALUES
  ('Layanan Digital', 'layanan-digital'),
  ('Perangkat IT',    'perangkat-it');

INSERT INTO products (category_id, sku, name, slug, description, price, stock, created_by) VALUES
  (1, 'SVC-WEB-001', 'Paket Website Basic',      'paket-website-basic',      'Website company profile sampai 5 halaman.', 3500000, NULL, 1),
  (1, 'SVC-APP-001', 'Pembuatan Aplikasi Custom','pembuatan-aplikasi-custom','Aplikasi web/mobile sesuai kebutuhan.',     15000000, NULL, 1),
  (2, 'HW-RTR-001',  'Router Dual Band',         'router-dual-band',         'Router Wi-Fi dual band untuk kantor kecil.',  450000,   25, 1),
  (2, 'HW-IOT-001',  'Paket Sensor IoT Starter', 'paket-sensor-iot-starter', 'Mikrokontroler dan sensor dasar.',            750000,   12, 1);

-- Keranjang & pesanan
INSERT INTO carts (user_id) VALUES (4);
INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (1, 3, 2);

INSERT INTO orders (order_number, customer_id, status, total_amount, customer_name, customer_phone, shipping_address) VALUES
  ('ORD-20261117-0001', 4, 'confirmed', 5150000, 'Pelanggan Satu', '081234567890', 'Jl. Contoh No. 1, Cimahi');

INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity) VALUES
  (1, 1, 'Paket Website Basic', 3500000, 1),
  (1, 3, 'Router Dual Band',     450000, 2),
  (1, 4, 'Paket Sensor IoT Starter', 750000, 1) ;

INSERT INTO order_status_logs (order_id, status, changed_by, note) VALUES
  (1, 'pending',   4, 'Pesanan dibuat'),
  (1, 'confirmed', 1, 'Pesanan dikonfirmasi admin');

INSERT INTO transactions (order_id, type, status, amount, method, paid_at, recorded_by) VALUES
  (1, 'payment', 'paid', 5150000, 'transfer', now(), 1);
