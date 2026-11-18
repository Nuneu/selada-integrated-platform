import { Link } from 'react-router-dom';
import { DummyNotice, PageHeader, StatCard } from '@/app/components/ui.jsx';

// Ringkasan dashboard (shell per role). Angka di sini masih statis.
// Nanti datanya diambil dari API milik tiap modul.
export default function Overview() {
  return (
    <>
      <DummyNotice module="User & Partner" owner="Nuneu" />
      <PageHeader title="Selamat datang" subtitle="Ringkasan platform SIP." />
      <div className="grid-4">
        <StatCard label="Pengguna" value="24" hint="aktif" />
        <StatCard label="Proyek Berjalan" value="2" />
        <StatCard label="Pesanan Baru" value="1" />
        <StatCard label="Notifikasi" value="3" />
      </div>
      <div className="card">
        <h3 style={{ marginBottom: 12 }}>Pintasan</h3>
        <div className="row">
          <Link className="btn" to="/app/users">Kelola Pengguna</Link>
          <Link className="btn" to="/app/projects">Proyek</Link>
          <Link className="btn" to="/app/products">Katalog Produk</Link>
          <Link className="btn" to="/app/orders">Pesanan</Link>
        </div>
      </div>
    </>
  );
}
