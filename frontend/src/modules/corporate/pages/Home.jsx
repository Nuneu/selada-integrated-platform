import { Link } from 'react-router-dom';
import { DummyNotice } from '@/app/components/ui.jsx';

const HIGHLIGHTS = [
  { title: 'Pengembangan Web & Aplikasi', text: 'Website dan aplikasi sesuai kebutuhan bisnis.' },
  { title: 'Jaringan & Infrastruktur', text: 'Instalasi dan konfigurasi jaringan kantor.' },
  { title: 'Solusi IoT', text: 'Perangkat dan sistem monitoring berbasis IoT.' },
];

export default function Home() {
  return (
    <>
      <DummyNotice module="Corporate & Content" owner="Devina" />

      <section className="hero">
        <span className="badge yellow">PT SELADA INDONESIA PRODUKTIF</span>
        <h1>Solusi IT terintegrasi untuk bisnismu</h1>
        <p>
          Selada Integrated Platform menyatukan profil perusahaan, portal pengguna,
          manajemen proyek, dan katalog produk dalam satu tempat.
        </p>
        <div className="row">
          <Link className="btn btn-accent" to="/layanan">Lihat Layanan</Link>
          <Link className="btn" to="/kontak">Hubungi Kami</Link>
        </div>
      </section>

      <section className="section">
        <h2>Layanan Kami</h2>
        <div className="grid-cards">
          {HIGHLIGHTS.map((h) => (
            <div key={h.title} className="card">
              <h3 style={{ fontSize: 15, marginBottom: 8 }}>{h.title}</h3>
              <p style={{ color: 'var(--muted)' }}>{h.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
