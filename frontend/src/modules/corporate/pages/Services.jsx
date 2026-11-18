import { DummyNotice } from '@/app/components/ui.jsx';

const SERVICES = [
  { name: 'Web Development', desc: 'Company profile, sistem informasi, dan portal web.' },
  { name: 'Aplikasi Mobile', desc: 'Aplikasi Android/iOS untuk kebutuhan operasional.' },
  { name: 'Networking', desc: 'Perancangan, instalasi, dan perawatan jaringan.' },
  { name: 'IoT', desc: 'Sensor, mikrokontroler, dan dashboard monitoring.' },
];

export default function Services() {
  return (
    <>
      <DummyNotice module="Corporate & Content" owner="Devina" />
      <h1 style={{ marginBottom: 20 }}>Layanan</h1>
      <div className="grid-cards">
        {SERVICES.map((s) => (
          <div key={s.name} className="card">
            <h3 style={{ fontSize: 15, marginBottom: 8 }}>{s.name}</h3>
            <p style={{ color: 'var(--muted)' }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}
