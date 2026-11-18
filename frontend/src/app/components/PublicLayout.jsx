import { Link, NavLink, Outlet } from 'react-router-dom';

// Kerangka website publik (navbar + footer). Menu datang dari modul Corporate.
export default function PublicLayout({ nav }) {
  return (
    <div className="public">
      <header className="public-nav">
        <Link to="/" className="brand">
          <div className="brand-mark">SIP</div>
          <div className="brand-text">
            <strong>Selada Integrated Platform</strong>
            <small>IT SOLUTION</small>
          </div>
        </Link>
        <nav className="row" aria-label="Menu publik">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className="public-link">{n.label}</NavLink>
          ))}
          <Link to="/login" className="btn btn-primary">Masuk</Link>
        </nav>
      </header>

      <main className="public-content">
        <Outlet />
      </main>

      <footer className="public-footer">
        © 2026 PT Selada Indonesia Produktif · SIP 5.0
      </footer>
    </div>
  );
}
