import { Link, NavLink, Outlet } from 'react-router-dom';

// Kerangka dashboard (sidebar + topbar).
// Menu dirakit dari `dashboardNav` tiap modul: { title, items: [{ to, label, end? }] }.
// Nanti menu dirender berdasarkan permission user (GET /api/auth/me).
export default function DashboardLayout({ sections }) {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">SIP</div>
          <div className="brand-text">
            <strong>Dashboard</strong>
            <small>IT SOLUTION</small>
          </div>
        </div>
        <nav className="nav" aria-label="Menu dashboard">
          {sections.map((s) => (
            <div key={s.title}>
              <div className="nav-label">{s.title.toUpperCase()}</div>
              {s.items.map((i) => (
                <NavLink key={i.to} to={i.to} end={i.end}>{i.label}</NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <div className="main">
        <header className="topbar">
          <Link to="/" className="role">← Kembali ke website</Link>
          <div className="avatar" title="Pengguna">G</div>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
