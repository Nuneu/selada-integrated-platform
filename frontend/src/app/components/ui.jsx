// Komponen UI bersama untuk modul Operations.
// Saat design system tim disepakati, pindahkan ke paket/folder shared.

export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Badge({ map, value }) {
  const [label, color] = map[value] ?? [value, 'gray'];
  return <span className={`badge ${color}`}>{label}</span>;
}

export function StatCard({ label, value, hint }) {
  return (
    <div className="card stat">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      {hint && <div className="hint">{hint}</div>}
    </div>
  );
}

export function Progress({ value }) {
  return (
    <div className="row" style={{ gap: 8 }}>
      <div className="progress" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
        <span style={{ width: `${value}%` }} />
      </div>
      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{value}%</span>
    </div>
  );
}

// Penanda halaman dummy. HAPUS pemakaiannya saat halaman asli selesai.
export function DummyNotice({ module, owner }) {
  return (
    <div className="dummy-notice">
      Halaman dummy · modul {module} (milik {owner}). Ganti dengan versi asli.
    </div>
  );
}

// Menangani loading / error / empty state secara konsisten
export function AsyncState({ loading, error, empty, onRetry, children }) {
  if (loading) return <div className="card state">Memuat data…</div>;
  if (error)
    return (
      <div className="card state">
        <p style={{ color: 'var(--danger)', marginBottom: 12 }}>{error}</p>
        {onRetry && <button className="btn" onClick={onRetry}>Coba lagi</button>}
      </div>
    );
  if (empty) return <div className="card state">Belum ada data.</div>;
  return children;
}
