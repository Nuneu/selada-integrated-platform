import { useState } from 'react';
import { DummyNotice } from '@/app/components/ui.jsx';

export default function Contact() {
  const [sent, setSent] = useState(false);

  // TODO (Devina): kirim ke POST /api/contact
  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <DummyNotice module="Corporate & Content" owner="Devina" />
      <h1 style={{ marginBottom: 20 }}>Kontak</h1>
      <form className="card" style={{ maxWidth: 520 }} onSubmit={onSubmit}>
        {sent && <div className="success-box">Pesan terkirim (dummy, belum tersimpan).</div>}
        <div className="field">
          <label htmlFor="c-name">Nama</label>
          <input id="c-name" className="input" required />
        </div>
        <div className="field">
          <label htmlFor="c-email">Email</label>
          <input id="c-email" type="email" className="input" required />
        </div>
        <div className="field">
          <label htmlFor="c-subject">Subjek</label>
          <input id="c-subject" className="input" required />
        </div>
        <div className="field">
          <label htmlFor="c-message">Pesan</label>
          <textarea id="c-message" className="input" required />
        </div>
        <button className="btn btn-accent" type="submit">Kirim Pesan</button>
      </form>
    </>
  );
}
