import { Link, useNavigate } from 'react-router-dom';
import { DummyNotice } from '@/app/components/ui.jsx';

export default function Login() {
  const navigate = useNavigate();

  // TODO (Nuneu): POST /api/auth/login, simpan token, arahkan sesuai role
  const onSubmit = (e) => {
    e.preventDefault();
    navigate('/app');
  };

  return (
    <div className="auth-wrap">
      <form className="card auth-card" onSubmit={onSubmit}>
        <div className="brand-mark">SIP</div>
        <h1>Masuk</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 16 }}>Selada Integrated Platform</p>
        <DummyNotice module="User & Partner" owner="Nuneu" />
        <div className="field">
          <label htmlFor="l-email">Email</label>
          <input id="l-email" type="email" className="input" placeholder="nama@perusahaan.com" />
        </div>
        <div className="field">
          <label htmlFor="l-pass">Kata sandi</label>
          <input id="l-pass" type="password" className="input" />
        </div>
        <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>Masuk</button>
        <p style={{ marginTop: 16, textAlign: 'center' }}>
          <Link to="/" style={{ color: 'var(--muted)' }}>← Kembali ke website</Link>
        </p>
      </form>
    </div>
  );
}
